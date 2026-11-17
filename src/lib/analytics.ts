declare global {
  interface Window {
    dataLayer?: unknown[];
    __lousPhoneTrackingBound?: boolean;
  }
}

const services = new Set([
  '', 'ac-repair', 'ac-replacement', 'furnace-repair', 'furnace-replacement',
  'swamp-cooler', 'maintenance', 'emergency', 'other',
]);

/** Events stay local until an approved, enabled production GTM container consumes them. */
export function canMeasure(): boolean {
  if (typeof window === 'undefined') return false;
  const url = new URL(window.location.href);
  const sensitiveKeys = /^(?:p|token|access_token|refresh_token|password|passcode|secret|email|phone|name)$/i;
  return document.documentElement.dataset.analyticsProduction === 'true'
    && url.protocol === 'https:'
    && url.hostname === 'loushvac303.com'
    && !/^\/(?:admin|api)(?:\/|$)/i.test(url.pathname)
    && !Array.from(url.searchParams.keys()).some(key => sensitiveKeys.test(key))
    && !/@|%40/i.test(url.search)
    && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

function pushEvent(event: Record<string, string>): void {
  if (!canMeasure()) return;
  // Tracking failures must never change a successful enquiry into an apparent form failure.
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  } catch {
    // Measurement is best-effort; the lead has already been handled by the server.
  }
}

export function trackAcceptedLead(service: string): void {
  pushEvent({
    event: 'generate_lead',
    form_type: 'contact',
    service: services.has(service) ? service : 'other',
  });
}

export function initializePhoneTracking(): void {
  if (!canMeasure() || window.__lousPhoneTrackingBound) return;
  window.__lousPhoneTrackingBound = true;
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || event.button > 0) return;
    const link = event.target.closest('a[href^="tel:"]');
    if (!link) return;
    const location = link.closest('.emergency-cta') ? 'sticky'
      : link.closest('.site-header') ? 'header'
      : link.closest('.site-footer') ? 'footer' : 'body';
    pushEvent({ event: 'phone_tap', location });
    // Leave the browser's native telephone navigation untouched.
  });
}
