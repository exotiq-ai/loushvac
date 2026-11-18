import { Resend } from 'resend';
import { ATTRIBUTION_KEYS, type Attribution } from './attribution-policy.ts';

const apiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'leads@loushvac.com';
const toEmail = import.meta.env.RESEND_TO_EMAIL || 'admin@loushvac.com';

const resend = apiKey ? new Resend(apiKey) : null;

export interface LeadEmailPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  preferred_time?: string;
  source_page?: string;
  enquiry_reference?: string;
  received_at?: string;
  attribution?: Attribution;
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function sendLeadEmail(data: LeadEmailPayload): Promise<{ id?: string; error?: string }> {
  if (!resend) return { error: 'Resend not configured' };

  const subject = `New Lead: ${data.name} — ${data.service || 'HVAC inquiry'}`;
  const attributionLines = data.attribution
    ? [...ATTRIBUTION_KEYS.filter(key => data.attribution?.[key]).map(key => `${key}: ${data.attribution![key]}`), `captured_at: ${data.attribution.captured_at}`] : [];

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222;">
  <h2 style="color: #1B4965; margin: 0 0 16px;">New lead from loushvac303.com</h2>
  ${data.enquiry_reference ? `<p><strong>Enquiry reference:</strong> ${escape(data.enquiry_reference)}<br><strong>Received (UTC):</strong> ${escape(data.received_at || '')}</p>` : ''}
  <p style="font-size: 20px; margin: 0 0 24px;"><strong>${escape(data.name)}</strong></p>
  <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escape(data.phone)}</p>
  <p style="margin: 0 0 8px;"><strong>Email:</strong> ${data.email ? escape(data.email) : 'Not provided — please use the phone number above.'}</p>
  ${data.service ? `<p style="margin: 0 0 8px;"><strong>Service:</strong> ${escape(data.service)}</p>` : ''}
  ${data.preferred_time ? `<p style="margin: 0 0 8px;"><strong>Preferred time:</strong> ${escape(data.preferred_time)}</p>` : ''}
  ${data.message ? `<div style="margin: 16px 0; padding: 16px; background: #F5F5F5; border-radius: 8px;"><strong>Message:</strong><br>${escape(data.message).replace(/\n/g, '<br>')}</div>` : ''}
  <p style="color: #888; font-size: 12px; margin-top: 24px;">Source: ${escape(data.source_page || 'unknown')}</p>
  <h3>Campaign attribution — unverified browser metadata</h3>
  <p>${attributionLines.length ? attributionLines.map(escape).join('<br>') : 'No permitted campaign attribution supplied. This does not establish an organic/direct source.'}</p>
  <p>Source labels are not proof of a qualified lead, booking or sale. Match this enquiry reference to the existing tracker/HCP job manually; no HCP API connection is active.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 12px;" />
  <p style="color: #aaa; font-size: 11px;">Lou's Heating &amp; Cooling lead system</p>
</body></html>`;

  const text = [
    `New lead from loushvac303.com`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || 'Not provided — please use the phone number above.'}`,
    data.service ? `Service: ${data.service}` : '',
    data.preferred_time ? `Preferred time: ${data.preferred_time}` : '',
    data.message ? `\nMessage:\n${data.message}` : '',
    ``,
    `Source: ${data.source_page || 'unknown'}`,
    `Enquiry reference: ${data.enquiry_reference || 'not supplied'}`,
    `Received (UTC): ${data.received_at || 'not supplied'}`,
    'Campaign attribution — unverified browser metadata:',
    ...attributionLines,
    attributionLines.length ? '' : 'No permitted campaign attribution supplied; do not assume organic/direct.',
    'Source labels are not proof of a qualified lead, booking or sale. Match this enquiry reference to the tracker/HCP job manually; no HCP API connection is active.',
  ].filter(Boolean).join('\n');

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      ...(data.email ? { replyTo: data.email } : {}),
      subject,
      html,
      text,
    });
    if (result.error) return { error: String(result.error.message || result.error) };
    return { id: result.data?.id };
  } catch (err: any) {
    return { error: err?.message || 'Resend send failed' };
  }
}

export async function sendCustomerConfirmation(data: { name: string; email?: string; service?: string }): Promise<{ id?: string; error?: string; skipped?: boolean }> {
  if (!data.email) return { skipped: true };
  if (!resend) return { error: 'Resend not configured' };

  const firstName = data.name.trim().split(/\s+/)[0];

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #1B4965; font-size: 22px; margin: 0;">Lou's Heating &amp; Cooling</h1>
    <p style="color: #6B7280; font-size: 13px; margin: 4px 0 0;">Serving the Denver Metro Since 2014</p>
  </div>
  <hr style="border: none; border-top: 2px solid #1B4965; margin: 0 0 24px;" />
  <p style="font-size: 16px;">Hi ${escape(firstName)},</p>
  <p>Thank you for reaching out to Lou's Heating &amp; Cooling. I genuinely appreciate your trust.</p>
  ${data.service ? `<p>We received your inquiry about <strong>${escape(data.service.replace(/-/g, ' '))}</strong> and a member of our team will get back to you as soon as possible.</p>` : `<p>We received your message and a member of our team will get back to you as soon as possible.</p>`}
  <div style="background: #FFF7ED; border-left: 4px solid #F28C28; padding: 16px; margin: 24px 0; border-radius: 4px;">
    <p style="margin: 0; font-weight: 600; color: #1A1A2E;">HVAC emergency? Don't wait.</p>
    <p style="margin: 8px 0 0; font-size: 20px; font-weight: 800; color: #1B4965;">(303) 949-8584</p>
    <p style="margin: 4px 0 0; color: #6B7280; font-size: 13px;">Available 24/7 for emergencies</p>
  </div>
  <p>— Lou Hernandez<br><span style="color: #6B7280;">Owner, Lou's Heating &amp; Cooling</span></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
  <p style="color: #aaa; font-size: 11px; text-align: center;">
    Lou's Heating &amp; Cooling · 1880 S Pierce St #5, Lakewood, CO 80232<br>
    BBB A+ Accredited · Authorized Carrier Dealer · Licensed &amp; Insured
  </p>
</body></html>`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thank you for reaching out to Lou's Heating & Cooling. I genuinely appreciate your trust.`,
    ``,
    data.service
      ? `We received your inquiry about ${data.service.replace(/-/g, ' ')} and a member of our team will get back to you as soon as possible.`
      : `We received your message and a member of our team will get back to you as soon as possible.`,
    ``,
    `HVAC emergency? Don't wait — call (303) 949-8584. Available 24/7.`,
    ``,
    `— Lou Hernandez`,
    `Owner, Lou's Heating & Cooling`,
    ``,
    `---`,
    `Lou's Heating & Cooling · 1880 S Pierce St #5, Lakewood, CO 80232`,
    `BBB A+ Accredited · Authorized Carrier Dealer · Licensed & Insured`,
  ].join('\n');

  try {
    const result = await resend.emails.send({
      from: `Lou's Heating & Cooling <${fromEmail}>`,
      to: data.email,
      replyTo: toEmail,
      subject: `Thanks for contacting Lou's Heating & Cooling`,
      html,
      text,
    });
    if (result.error) return { error: String(result.error.message || result.error) };
    return { id: result.data?.id };
  } catch (err: any) {
    return { error: err?.message || 'Resend confirmation send failed' };
  }
}
