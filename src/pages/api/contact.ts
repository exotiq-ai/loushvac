import type { APIRoute } from 'astro';
import { ContactFormSchema } from '../../lib/validation.ts';
import { sendLeadEmail, sendCustomerConfirmation } from '../../lib/resend.ts';
import { insertLead } from '../../lib/supabase.ts';


export const prerender = false;

const recent = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function redirectHtml(url: string): string {
  return `<!doctype html><html><head><meta http-equiv="refresh" content="0;url=${url}"></head><body><p>Redirecting… <a href="${url}">Click here</a>.</p></body></html>`;
}

function getIp(req: Request): string {
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + '::lous-salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('').slice(0, 16);
}

export const POST: APIRoute = async ({ request }) => {
  const ip = getIp(request);
  const last = recent.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many requests, please wait a moment.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ct = request.headers.get('content-type') || '';
  const isJson = ct.includes('application/json');

  let payload: unknown;
  try {
    if (isJson) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = ContactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Please check the form and try again.',
      issues: parsed.error.flatten().fieldErrors,
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, phone, email, service, message, preferred_time, source_page } = parsed.data;
  const attribution = parsed.data.measurement_allowed === true && request.headers.get('Sec-GPC') !== '1'
    ? parsed.data.attribution : undefined;
  const enquiry_reference = crypto.randomUUID();
  const received_at = new Date(now).toISOString();
  const userAgent = request.headers.get('user-agent') || '';
  const ip_hash = await hashIp(ip);

  const emailRes = await sendLeadEmail({ name, phone, email, service, message, preferred_time, source_page, attribution, enquiry_reference, received_at });

  const dbRes = await insertLead({
    name, phone, email: email ?? null, service, message, preferred_time, source_page,
    attribution, enquiry_reference, received_at,
    user_agent: userAgent,
    ip_hash,
    email_sent: Boolean(emailRes.id) && !emailRes.error,
    notes: emailRes.error || undefined,
  });

  recent.set(ip, now);

  const leadCaptured = Boolean(dbRes.id) || (Boolean(emailRes.id) && !emailRes.error);

  if (!leadCaptured) {
    if (!isJson) {
      return new Response(redirectHtml('/contact/?form=error'), {
        status: 303,
        headers: { 'Content-Type': 'text/html', 'Location': '/contact/?form=error' },
      });
    }
    return new Response(JSON.stringify({
      ok: false,
      error: "We couldn't deliver your message. Please call (303) 949-8584 directly.",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (email) await sendCustomerConfirmation({ name, email, service }).catch(() => {});

  if (!isJson) {
    return new Response(redirectHtml('/contact/thank-you/'), {
      status: 303,
      headers: { 'Content-Type': 'text/html', 'Location': '/contact/thank-you/' },
    });
  }

  return new Response(JSON.stringify({
    ok: true,
    leadId: dbRes.id,
    enquiryReference: enquiry_reference,
    message: 'Thanks — Lou’s team has received your request.',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
