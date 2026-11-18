// Google-supported callback: https://support.google.com/google-ads/answer/6095883
const BUSINESS = /(?:\+?1[ .-]?)?\(?303\)?[ .-]*949[ .-]*8584(?!\d)/g;
const matchesBusiness = (value: string) => new RegExp(BUSINESS.source).test(value);
type Replacement = { node: Node; attribute?: string; original: string; applied: string };
let replacements: Replacement[] = [];
let configured = false;
let generation = 0;
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
    || configured || !allowed() || typeof window.gtag !== 'function') return;
  configured = true;
  const currentGeneration = ++generation;
  try {
    window.gtag('config', sendTo, {
      phone_conversion_number: '(303) 949-8584',
      phone_conversion_options: { timeout: 5000, cache: false },
      phone_conversion_callback: (formatted: unknown, mobile: unknown) => {
        if (!allowed() || !configured || generation !== currentGeneration) return;
        if (typeof formatted !== 'string' || typeof mobile !== 'string' || formatted.length > 30) return;
        const normalized = digits(mobile);
        if (!normalized || digits(formatted) !== normalized) return;
        replaceNumbers(formatted, normalized);
      },
    });
  } catch { configured = false; }
}
