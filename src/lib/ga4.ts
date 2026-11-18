// The combined Google tag owns GA4 configuration and page_view. Route events only.
export function ga4Destination(): string {
  const id = document.querySelector<HTMLMetaElement>('meta[name="lous-ga4-id"]')?.content || '';
  return /^G-[A-Z0-9]+$/.test(id) ? id : '';
}

/** Caller MUST enforce current measurement permission. Send only known event fields. */
export function sendGA4Event(event: Record<string, string>): void {
  const id = ga4Destination();
  if (!id) return;
  if (event.event === 'generate_lead') {
    window.gtag?.('event', 'generate_lead', { form_type: 'contact', service: event.service, send_to: id });
  } else if (event.event === 'phone_tap') {
    window.gtag?.('event', 'phone_tap', { location: event.location, send_to: id });
  }
}
