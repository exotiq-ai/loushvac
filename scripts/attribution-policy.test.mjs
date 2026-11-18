import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeAttribution, mergeAttribution, attributionFromSearch, ATTRIBUTION_TTL_MS } from '../src/lib/attribution-policy.ts';
const now = Date.parse('2026-11-18T15:00:00Z');
const stamp = new Date(now).toISOString();
test('keeps only bounded marketing identifiers, not arbitrary contact fields', () => {
  assert.deepEqual(normalizeAttribution({ gclid: 'AbC_12-xyz', utm_source: 'google', captured_at: stamp, email: 'x@example.com' }, now), { gclid: 'AbC_12-xyz', utm_source: 'google', captured_at: stamp });
  assert.equal(normalizeAttribution({ gclid: 'a'.repeat(257), utm_source: 'x@example.com', captured_at: stamp }, now), undefined);
  assert.equal(normalizeAttribution({ utm_campaign: '<script>alert(1)</script>', captured_at: stamp }, now), undefined);
  assert.equal(normalizeAttribution({ utm_term: 'https://a.test/?email=x', captured_at: stamp }, now), undefined);
  assert.equal(normalizeAttribution({ utm_term: '(303) 555-0147', captured_at: stamp }, now), undefined);
});
test('expires at 90 days, rejects future/invalid timestamps, never slides expiry', () => {
  assert.equal(normalizeAttribution({gclid:'abc', captured_at: new Date(now-ATTRIBUTION_TTL_MS).toISOString()}, now), undefined);
  assert.equal(normalizeAttribution({gclid:'abc', captured_at:'yesterday'}, now), undefined);
  assert.equal(normalizeAttribution({gclid:'abc', captured_at: new Date(now+600001).toISOString()}, now), undefined);
  const old={gclid:'first',utm_source:'google',captured_at:new Date(now-1000).toISOString()};
  assert.deepEqual(mergeAttribution(old,{gclid:'second',utm_source:'bing',utm_campaign:'heat',captured_at:stamp}, now), {...old,utm_campaign:'heat'});
});
test('first nonempty ID is retained and later empty parameters do not erase it', () => {
  const first=attributionFromSearch('?gclid=one&utm_source=google&email=secret%40invalid.test', now);
  assert.deepEqual(first, { gclid:'one',utm_source:'google',captured_at:stamp });
  assert.deepEqual(mergeAttribution(first, attributionFromSearch('?gclid=&utm_source=', now),now),first);
  assert.equal(attributionFromSearch('?random=hello',now),undefined);
  assert.equal(normalizeAttribution(null,now),undefined);
  assert.equal(normalizeAttribution(['bad'],now),undefined);
});
