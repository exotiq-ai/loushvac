import { effectiveMeasurement, parseChoice, publicMeasurementPage, FORM_CONVERSION_SEND_TO, type MeasurementChoice } from './measurement-policy';

export const CHOICE_KEY = 'lous.measurement.v1';
interface MeasurementState {
  ready: boolean; allowed: boolean; defaultOn: boolean; choice: MeasurementChoice;
  gpc: boolean; storageAvailable: boolean; eligible: boolean;
}
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __lousMeasurementState?: MeasurementState;
  }
}
let state: MeasurementState = { ready: false, allowed: false, defaultOn: false, choice: null, gpc: false, storageAvailable: true, eligible: false };
let initialized = false;
let tagStarted = false;
let preferenceStorage: Storage | null = null;
let initialGoogleConsent: Record<string, string> | null = null;

export function measurementIsAllowed(): boolean {
  return state.ready && state.allowed && publicMeasurementPage(window.location.href)
    && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}
function googleConsent(allowed: boolean): Record<string, string> {
  return { ad_storage: allowed ? 'granted' : 'denied', analytics_storage: allowed ? 'granted' : 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
}
function clearMeasurementCookies(): void {
  for (const entry of document.cookie.split(';')) {
    const name = entry.split('=')[0].trim();
    if (!/^(?:_ga(?:_|$)|_gid$|_gcl_|_gac_)/.test(name)) continue;
    for (const domain of ['', '; domain=loushvac303.com', '; domain=.loushvac303.com']) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain}`;
    }
  }
}
function discardQueuedEvents(): void {
  // An asynchronously loading SDK must not deliver website events after withdrawal.
  if (!Array.isArray(window.dataLayer)) return;
  for (let index = window.dataLayer.length - 1; index >= 0; index--) {
    const item = window.dataLayer[index] as { event?: string; [key: number]: unknown } | undefined;
    const ownConversion = item?.[0] === 'event' && item?.[1] === 'conversion'
      && (item?.[2] as { send_to?: string } | undefined)?.send_to === FORM_CONVERSION_SEND_TO;
    if (item && (['generate_lead', 'phone_tap'].includes(item.event || '') || ownConversion)) window.dataLayer.splice(index, 1);
  }
}
function startGoogleTag(): void {
  if (tagStarted || !measurementIsAllowed()) return;
  tagStarted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer?.push(arguments); };
  initialGoogleConsent = googleConsent(true);
  window.gtag('consent', 'default', initialGoogleConsent);
  window.gtag('set', 'allow_enhanced_conversions', false);
  window.gtag('set', 'allow_ad_personalization_signals', false);
  window.gtag('set', 'ads_data_redaction', true);
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'lous-google-tag';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-W7R427MZ';
  document.head.append(script);
}
function publishState(): void {
  window.__lousMeasurementState = { ...state };
  document.querySelectorAll<HTMLElement>('[data-measurement-ui]').forEach(element => { element.hidden = !state.eligible; });
  let message = state.allowed ? 'On' : 'Off';
  if (!state.ready) message = 'Checking settings…';
  else if (state.gpc) message = 'Off — your browser’s Global Privacy Control is enabled.';
  else if (!state.storageAvailable) message += ' for this page — your browser could not save this preference.';
  else if (state.choice === null && !state.defaultOn) message = 'Off until you choose to allow measurement.';
  document.querySelectorAll<HTMLElement>('[data-measurement-status]').forEach(element => { element.textContent = message; });
  document.querySelectorAll<HTMLButtonElement>('[data-measurement-choice]').forEach(button => {
    const value = button.dataset.measurementChoice === 'on';
    button.disabled = !state.ready || (value && state.gpc);
    button.setAttribute('aria-pressed', String(state.ready && value === state.allowed));
  });
  window.dispatchEvent(new CustomEvent('lous:measurement-change', { detail: { ...state } }));
}
function applyState(): void {
  const wasAllowed = state.allowed;
  state.allowed = state.ready && state.eligible && effectiveMeasurement(state);
  if (!state.allowed) {
    if (initialGoogleConsent) Object.assign(initialGoogleConsent, googleConsent(false));
    discardQueuedEvents();
    clearMeasurementCookies();
    if (wasAllowed && tagStarted) window.gtag?.('consent', 'update', googleConsent(false));
  } else if (tagStarted && !wasAllowed) {
    window.gtag?.('consent', 'update', googleConsent(true));
  }
  publishState();
  if (state.allowed) startGoogleTag();
}
function chooseMeasurement(allowed: boolean): void {
  state.choice = allowed;
  try {
    preferenceStorage = window.localStorage;
    preferenceStorage.setItem(CHOICE_KEY, JSON.stringify({ v: 1, allowed }));
    state.storageAvailable = true;
  } catch { state.storageAvailable = false; }
  applyState();
}
export async function initializeMeasurement(): Promise<void> {
  if (initialized) return;
  initialized = true;
  state.eligible = document.documentElement.dataset.analyticsProduction === 'true'
    && document.querySelector<HTMLMetaElement>('meta[name="lous-measurement-enabled"]')?.content === 'true'
    && publicMeasurementPage(window.location.href);
  state.gpc = Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
  if (!state.eligible) { state.ready = true; publishState(); return; }
  try { preferenceStorage = window.localStorage; state.choice = parseChoice(preferenceStorage.getItem(CHOICE_KEY)); }
  catch { state.storageAvailable = false; }
  document.querySelectorAll<HTMLButtonElement>('[data-measurement-choice]').forEach(button => {
    button.addEventListener('click', () => chooseMeasurement(button.dataset.measurementChoice === 'on'));
  });
  document.querySelectorAll<HTMLDetailsElement>('.measurement-settings').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      requestAnimationFrame(() => {
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        details.querySelector('.measurement-actions')?.scrollIntoView({ block: 'center', behavior: 'auto' });
        document.documentElement.style.scrollBehavior = previous;
      });
    });
  });
  window.addEventListener('storage', event => {
    if (!preferenceStorage || event.storageArea !== preferenceStorage || (event.key !== CHOICE_KEY && event.key !== null)) return;
    // Apply external choices only; never write back or create a cross-tab loop.
    state.choice = parseChoice(event.newValue);
    applyState();
  });
  publishState();
  if (!state.gpc) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch('/api/measurement-policy', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal });
      const result = response.ok ? await response.json() : null;
      state.defaultOn = result?.defaultOn === true;
      state.gpc = state.gpc || result?.gpc === true;
    } catch { state.defaultOn = false; }
    finally { window.clearTimeout(timeout); }
  }
  state.ready = true;
  applyState();
}
