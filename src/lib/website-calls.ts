// Google-supported callback: https://support.google.com/google-ads/answer/6095883
const BUSINESS = /(?:\+?1[ .-]?)?\(?303\)?[ .-]*949[ .-]*8584(?!\d)/g;
const matchesBusiness = (value: string) => new RegExp(BUSINESS.source).test(value);
type Replacement = { node: Node; attribute?: string; original: string; applied: string };
let replacements: Replacement[] = [];
let configured = false;
let generation = 0;
declare global {
  interface Window {
    _googWcmAk?: string;
    _googWcmImpl?: (...args: unknown[]) => void;
  }
}
let library: Promise<boolean> | undefined;
function loadCallLibrary(): Promise<boolean> {
  if (typeof window._googWcmImpl === 'function') return Promise.resolve(true);
  if (library) return library;
  window._googWcmAk = '16533482745';
  library = new Promise(resolve => {
    const script = document.createElement('script');
    script.id = 'lous-google-call-library';
    script.async = true;
    script.src = 'https://www.gstatic.com/wcm/loader.js';
    const start = Date.now();
    let finished = false;
    const finish = (ready: boolean) => { if (!finished) { finished = true; resolve(ready); } };
    const check = () => {
      if (finished) return;
      if (typeof window._googWcmImpl === 'function') return finish(true);
      if (Date.now() - start >= 5000) return finish(false);
      window.setTimeout(check, 50);
    };
    script.onerror = () => finish(false);
    document.head.append(script);
    check();
  });
  return library;
}
function digits(value: string): string | undefined {
  if (!/^[+\d ().-]+$/.test(value)) return;
  const result = value.replace(/\D/g, '');
  if (result.length === 10) return '1' + result;
  if (result.length === 11 && result.startsWith('1')) return result;
}
function read(item: Replacement): string {
  return item.attribute ? (item.node as Element).getAttribute(item.attribute) || '' : item.node.nodeValue || '';
}
function write(item: Replacement, value: string): void {
  if (item.attribute) (item.node as Element).setAttribute(item.attribute, value);
  else item.node.nodeValue = value;
}
function remember(node: Node, attribute?: string): void {
  if (replacements.some(item => item.node === node && item.attribute === attribute)) return;
  const original = attribute ? (node as Element).getAttribute(attribute) || '' : node.nodeValue || '';
  replacements.push({ node, attribute, original, applied: original });
}
function replaceNumbers(formatted: string, mobile: string): void {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('script,style,noscript,input,textarea,select,[contenteditable="true"]')) continue;
    if (matchesBusiness(node.nodeValue || '')) remember(node);
  }
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach(link => {
    if (digits(link.getAttribute('href')!.slice(4)) === '13039498584') remember(link, 'href');
  });
  document.querySelectorAll('[aria-label],[title]').forEach(element => {
    if (element.closest('input,textarea,select,[contenteditable="true"]')) return;
    for (const attribute of ['aria-label', 'title']) {
      if (matchesBusiness(element.getAttribute(attribute) || '')) remember(element, attribute);
    }
  });
  for (const item of replacements) {
    if (!item.node.isConnected || read(item) !== item.applied) continue;
    item.applied = item.attribute === 'href' ? `tel:+${mobile}` : item.original.replace(BUSINESS, formatted);
    write(item, item.applied);
  }
}
export function restoreWebsiteNumbers(): void {
  generation++;
  for (const item of replacements) {
    // Don't overwrite an unrelated UI change made after our callback.
    if (item.node.isConnected && read(item) === item.applied) write(item, item.original);
  }
  replacements = [];
  configured = false;
}
export function configureWebsiteCalls(sendTo: string, allowed: () => boolean): void {
  if (!/^AW-16533482745\/[A-Za-z0-9_-]+$/.test(sendTo)
    || sendTo === 'AW-16533482745/TanbCMOlpbodEPnZ48s9'
    || configured || !allowed()) return;
  configured = true;
  const currentGeneration = ++generation;
  // The combined container doesn't initialize WCC from gtag('config'). Use Google's
  // dedicated call library, not a second GA4/Google tag. No queued request after Off.
  void loadCallLibrary().then(ready => {
    if (!ready || !configured || generation !== currentGeneration || !allowed()) return;
    const callback = (formatted: unknown, mobile: unknown) => {
        if (!allowed() || !configured || generation !== currentGeneration) return;
        if (typeof formatted !== 'string' || typeof mobile !== 'string' || formatted.length > 30) return;
        const normalized = digits(mobile);
        if (!normalized || digits(formatted) !== normalized) return;
        replaceNumbers(formatted, normalized);
    };
    // Signature verified against Google's current wcm/loader.js -> call-tracking SDK.
    try {
      window._googWcmImpl?.(2, callback, { ak: '16533482745', cl: sendTo.split('/')[1] },
        '(303) 949-8584', null, new Date(), { timeout: 5000, cache: false });
    } catch { configured = false; }
  }).catch(() => { configured = false; });
}
