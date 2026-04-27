import type { APIRoute } from 'astro';
import { ContactFormSchema } from '../../lib/validation.ts';
import { sendLeadEmail } from '../../lib/resend.ts';
import { insertLead } from '../../lib/supabase.ts';
import { findOrCreateCustomerAndLead } from '../../lib/housecallpro.ts';

export const prerender = false;

const recent = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

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

  let payload: unknown;
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
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
  const userAgent = request.headers.get('user-agent') || '';
  const ip_hash = await hashIp(ip);

  const [emailRes, hcpRes] = await Promise.all([
    sendLeadEmail({ name, phone, email, service, message, preferred_time, source_page }),
    findOrCreateCustomerAndLead({ name, phone, email, service, message, source: source_page }),
  ]);

  const dbRes = await insertLead({
    name, phone, email, service, message, preferred_time, source_page,
    user_agent: userAgent,
    ip_hash,
    email_sent: !emailRes.error,
    hcp_customer_id: hcpRes.customerId,
    hcp_lead_id: hcpRes.leadId,
    notes: [emailRes.error, hcpRes.error].filter(Boolean).join(' | ') || undefined,
  });

  recent.set(ip, now);

  if (emailRes.error) {
    return new Response(JSON.stringify({
      ok: false,
      error: "We couldn't deliver your message. Please call (303) 949-8584 directly.",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    ok: true,
    leadId: dbRes.id,
    message: 'Got it — Lou will be in touch within 2 hours.',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
