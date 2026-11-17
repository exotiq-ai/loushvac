export type MeasurementChoice = boolean | null;

export function effectiveMeasurement(input: {
  defaultOn: boolean; choice: MeasurementChoice; gpc: boolean; storageAvailable: boolean;
}): boolean {
  if (input.gpc || input.choice === false) return false;
  if (input.choice === true) return true;
  return input.storageAvailable && input.defaultOn;
}

export function parseChoice(raw: string | null): MeasurementChoice {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value?.v === 1 && typeof value.allowed === 'boolean' ? value.allowed : null;
  } catch { return null; }
}

export function publicMeasurementPage(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && url.hostname === 'loushvac303.com'
      && !/^\/(?:admin|api)(?:\/|$)/i.test(url.pathname)
      && !Array.from(url.searchParams.keys()).some(key => /^(?:p|token|access_token|refresh_token|password|passcode|secret|email|phone|name)$/i.test(key))
      && !/@|%40/i.test(url.search);
  } catch { return false; }
}
