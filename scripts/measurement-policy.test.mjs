import test from 'node:test';
import assert from 'node:assert/strict';
import { effectiveMeasurement, parseChoice, publicMeasurementPage } from '../src/lib/measurement-policy.ts';
import policyHandler from '../netlify/edge-functions/measurement-policy.ts';

test('ordinary US visit defaults on; all other/unknown regions require a choice', () => {
  assert.equal(effectiveMeasurement({ defaultOn: true, choice: null, gpc: false, storageAvailable: true }), true);
  assert.equal(effectiveMeasurement({ defaultOn: false, choice: null, gpc: false, storageAvailable: true }), false);
});
test('saved explicit choices and GPC override the regional default', () => {
  assert.equal(effectiveMeasurement({ defaultOn: true, choice: false, gpc: false, storageAvailable: true }), false);
  assert.equal(effectiveMeasurement({ defaultOn: false, choice: true, gpc: false, storageAvailable: true }), true);
  assert.equal(effectiveMeasurement({ defaultOn: true, choice: true, gpc: true, storageAvailable: true }), false);
});
test('storage failure does not silently reenable measurement', () => {
  assert.equal(effectiveMeasurement({ defaultOn: true, choice: null, gpc: false, storageAvailable: false }), false);
});
test('only versioned boolean preferences are accepted', () => {
  assert.equal(parseChoice('{"v":1,"allowed":false}'), false);
  assert.equal(parseChoice('{"v":1,"allowed":true}'), true);
  for (const value of [null, '', '{}', '{"v":2,"allowed":true}', '{"v":1,"allowed":"true"}', 'broken']) assert.equal(parseChoice(value), null);
});
test('private pages, preview hosts and sensitive URLs are excluded', () => {
  assert.equal(publicMeasurementPage('https://loushvac303.com/contact/?gclid=example-click'), true);
  for (const url of ['http://loushvac303.com/', 'https://preview--loushvac303.netlify.app/', 'https://loushvac303.com/admin/leads/?p=x', 'https://loushvac303.com/api/contact', 'https://loushvac303.com/?token=x', 'https://loushvac303.com/?email=x%40example.com']) assert.equal(publicMeasurementPage(url), false);
});
test('edge policy uses trusted country context, not visitor query/header overrides', async () => {
  const req = new Request('https://loushvac303.com/api/measurement-policy?country=US', { headers: { 'x-country': 'US' } });
  const response = await policyHandler(req, { geo: { country: { code: 'DE' } } });
  assert.deepEqual(await response.json(), { defaultOn: false });
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.deepEqual(await (await policyHandler(req, { geo: { country: { code: 'US' } } })).json(), { defaultOn: true });
  assert.deepEqual(await (await policyHandler(req, {})).json(), { defaultOn: false });
});
