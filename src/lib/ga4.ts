// Optional GA4 uses the existing Google runtime; never a second unconditional loader.
let configured = false;
export function ga4Destination(): string {
  const id = document.querySelector<HTMLMetaElement>('meta[name="lous-ga4-id"]')?.content || '';
  return /^G-[A-Z0-9]+$/.test(id) ? id : '';
}
export function configureGA4(): void {
  const id = ga4Destination();
  if (!id || configured || !window.gtag) return;
  window.gtag('config', id, { send_page_view: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  configured = true;
}
/** Caller MUST enforce current measurement permission. Send only known event fields. */
export function sendGA4Event(event: Record<string, string>): void {
  const id = ga4Destination();
  if (!configured || !id) return;
  if (event.event === 'generate_lead') {
    window.gtag?.('event', 'generate_lead', { form_type: 'contact', service: event.service, send_to: id });
  } else if (event.event === 'phone_tap') {
    window.gtag?.('event', 'phone_tap', { location: event.location, send_to: id });
  }
}
