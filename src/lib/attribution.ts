import { measurementIsAllowed } from './measurement';
import { attributionFromSearch, mergeAttribution, normalizeAttribution, type Attribution } from './attribution-policy';

export const ATTRIBUTION_STORAGE_KEY = 'lous.attribution.v1';
let initialized = false;
let current: Attribution | undefined;
function forget(): void {
  current = undefined;
  try { localStorage.removeItem(ATTRIBUTION_STORAGE_KEY); } catch { /* Storage may be blocked. */ }
}
function refresh(): Attribution | undefined {
  if (!measurementIsAllowed()) { forget(); return; }
  let persisted: Attribution | undefined;
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    try { persisted = normalizeAttribution(JSON.parse(raw || 'null')); }
    catch { persisted = undefined; }
  } catch { persisted = current; /* Memory fallback only when storage access fails, never after deletion. */ }
  current = mergeAttribution(persisted, attributionFromSearch(location.search));
  try {
    if (current) localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));
    else localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch { /* Same-page capture can continue after an explicit choice; never required for a lead. */ }
  return current;
}
/** Called immediately before POST; never exposes metadata through the Google dataLayer. */
export function attributionForSubmission(): Attribution | undefined {
  return refresh();
}
export function initializeAttribution(): void {
  if (initialized) return;
  initialized = true;
  window.addEventListener('lous:measurement-change', () => {
    if (!window.__lousMeasurementState?.ready) return;
    refresh();
  });
  window.addEventListener('storage', event => {
    if (event.key === ATTRIBUTION_STORAGE_KEY || event.key === null) {
      // Do not resurrect deleted values through a stale in-memory cache in another tab.
      current = undefined;
    }
  });
  if (window.__lousMeasurementState?.ready) refresh();
}
