/** Optional marketing metadata only. Never pass form values or a full URL here. */
export const ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
export type AttributionKey = typeof ATTRIBUTION_KEYS[number];
export type Attribution = Partial<Record<AttributionKey, string>> & { captured_at: string };
export const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

function cleanValue(key: AttributionKey, input: unknown): string | undefined {
  if (typeof input !== 'string') return;
  const value = input.trim();
  if (!value || value.length > (key.startsWith('utm_') ? 200 : 256)) return;
  if (!key.startsWith('utm_')) return /^[A-Za-z0-9._~-]+$/.test(value) ? value : undefined;
  // Defense in depth; campaign authors must never put contact details in UTMs.
  if (/@|%40|:\/\/|[<>\x00-\x1f\x7f]/i.test(value)) return;
  if (/(?:\+\d{1,3}[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/.test(value)) return;
  return /^[\p{L}\p{N} _.,()|:~+-]+$/u.test(value) ? value : undefined;
}

export function normalizeAttribution(input: unknown, now = Date.now()): Attribution | undefined {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return;
  const raw = input as Record<string, unknown>;
  if (typeof raw.captured_at !== 'string') return;
  const timestamp = Date.parse(raw.captured_at);
  if (!Number.isFinite(timestamp) || timestamp > now + 5 * 60 * 1000 || now - timestamp >= ATTRIBUTION_TTL_MS) return;
  const values: Partial<Record<AttributionKey, string>> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = cleanValue(key, raw[key]);
    if (value) values[key] = value;
  }
  return Object.keys(values).length ? { ...values, captured_at: new Date(timestamp).toISOString() } : undefined;
}

export function attributionFromSearch(search: string, now = Date.now()): Attribution | undefined {
  const params = new URLSearchParams(search);
  const raw: Record<string, unknown> = { captured_at: new Date(now).toISOString() };
  for (const key of ATTRIBUTION_KEYS) raw[key] = params.get(key);
  return normalizeAttribution(raw, now);
}

/** First nonempty value wins within one fixed 90-day window; never sliding expiry. */
export function mergeAttribution(previous: unknown, incoming: unknown, now = Date.now()): Attribution | undefined {
  const old = normalizeAttribution(previous, now);
  const next = normalizeAttribution(incoming, now);
  if (!old) return next;
  if (!next) return old;
  return { ...next, ...old };
}
