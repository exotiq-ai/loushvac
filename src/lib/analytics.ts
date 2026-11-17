import { measurementIsAllowed } from './measurement';
import { publicMeasurementPage } from './measurement-policy';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __lousPhoneTrackingBound?: boolean;
  }
}

const services = new Set([
  '', 'ac-repair', 'ac-replacement', 'furnace-repair', 'furnace-replacement',
  'swamp-cooler', 'maintenance', 'emergency', 'commercial-hvac', 'other',
]);

/** Only currently permitted events enter the Google dataLayer; no pre-permission replay. */
export function canMeasure(): boolean {
  return typeof window !== 'undefined' && measurementIsAllowed();
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
  if (typeof window === 'undefined' || document.documentElement.dataset.analyticsProduction !== 'true'
    || !publicMeasurementPage(window.location.href) || window.__lousPhoneTrackingBound) return;
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
