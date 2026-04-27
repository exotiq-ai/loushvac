import { Resend } from 'resend';

const apiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'leads@loushvac303.com';
const toEmail = import.meta.env.RESEND_TO_EMAIL || 'lousheatingcooling@icloud.com';

const resend = apiKey ? new Resend(apiKey) : null;

export interface LeadEmailPayload {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
  preferred_time?: string;
  source_page?: string;
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function sendLeadEmail(data: LeadEmailPayload): Promise<{ id?: string; error?: string }> {
  if (!resend) return { error: 'Resend not configured' };

  const subject = `New Lead: ${data.name} — ${data.service || 'HVAC inquiry'}`;
  const phoneDigits = data.phone.replace(/\D/g, '');

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222;">
  <h2 style="color: #1B4965; margin: 0 0 16px;">New lead from loushvac303.com</h2>
  <p style="font-size: 20px; margin: 0 0 24px;"><strong>${escape(data.name)}</strong></p>
  <p style="margin: 0 0 8px;"><strong>Phone:</strong> <a href="tel:${phoneDigits}" style="color: #1B4965; font-size: 20px; font-weight: 700;">${escape(data.phone)}</a></p>
  <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escape(data.email)}">${escape(data.email)}</a></p>
  ${data.service ? `<p style="margin: 0 0 8px;"><strong>Service:</strong> ${escape(data.service)}</p>` : ''}
  ${data.preferred_time ? `<p style="margin: 0 0 8px;"><strong>Preferred time:</strong> ${escape(data.preferred_time)}</p>` : ''}
  ${data.message ? `<div style="margin: 16px 0; padding: 16px; background: #F5F5F5; border-radius: 8px;"><strong>Message:</strong><br>${escape(data.message).replace(/\n/g, '<br>')}</div>` : ''}
  <p style="color: #888; font-size: 12px; margin-top: 24px;">Source: ${escape(data.source_page || 'unknown')}</p>
</body></html>`;

  const text = [
    `New lead from loushvac303.com`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    data.service ? `Service: ${data.service}` : '',
    data.preferred_time ? `Preferred time: ${data.preferred_time}` : '',
    data.message ? `\nMessage:\n${data.message}` : '',
    ``,
    `Source: ${data.source_page || 'unknown'}`,
  ].filter(Boolean).join('\n');

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
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
