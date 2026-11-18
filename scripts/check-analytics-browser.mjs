import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, webkit, firefox } from 'playwright';

const base = 'https://loushvac303.com';
const local = process.env.TEST_SERVER || 'http://127.0.0.1:4330';
const expectedEnvironment = process.env.EXPECT_ANALYTICS || 'production';
const expectedGtm = process.env.EXPECT_GTM !== 'false';
const expectEvents = expectedEnvironment === 'production' && expectedGtm;
const artifactDir = process.env.QA_DIR || '/tmp/loushvac-analytics-qa';
const engines = (process.env.BROWSERS || 'chromium,firefox').split(',');
await mkdir(artifactDir, { recursive: true });
const report = [];

for (const engine of engines) {
  const browser = await ({ chromium, webkit, firefox }[engine]).launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  let apiStatus = 200;
  let apiResponse = { ok: true, leadId: 'local-fixture-only', message: 'Test accepted' };
  let apiDelay = 0;
  let apiCalls = 0;
  let gtmRequests = 0;
  const external = [];
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtm.js') {
      gtmRequests++;
      // Loader-only fixture: NOT proof of a published GTM conversion tag or Ads ingestion.
      return route.fulfill({ contentType: 'application/javascript', body: 'window.__gtmFixtureLoaded = true;' });
    }
    if (url.hostname !== 'loushvac303.com' && !url.hostname.endsWith('.netlify.app')) {
      external.push(url.origin + url.pathname);
      return route.abort();
    }
    if (url.pathname === '/api/measurement-policy') {
      return route.fulfill({ contentType: 'application/json', body: '{"defaultOn":true}' });
    }
    if (url.pathname === '/api/contact') {
      apiCalls++;
      await new Promise(resolve => setTimeout(resolve, apiDelay));
      return route.fulfill({ status: apiStatus, contentType: 'application/json', body: JSON.stringify(apiResponse) });
    }
    // Firefox supplies the original Host header; update it with the proxy target.
    // Otherwise a remote Netlify preview can accidentally serve production HTML.
    const response = await route.fetch({ url: local + url.pathname + url.search,
      headers: { ...route.request().headers(), host: new URL(local).host } });
    return route.fulfill({ response });
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const events = () => page.evaluate(() => (window.dataLayer || []).filter(item => item && (item.event === 'generate_lead' || item.event === 'phone_tap')));
  const clearEvents = () => page.evaluate(() => { window.dataLayer = []; });
  async function fillForm(service = 'furnace-repair') {
    await page.locator('#name').fill('LOCAL TEST ONLY');
    await page.locator('#phone').fill('3035550147');
    await page.locator('#email').fill('local-test@example.invalid');
    await page.locator('#service').selectOption(service);
  }
  await page.goto(base + '/contact/', { waitUntil: 'networkidle' });
  await fillForm();
  await page.locator('.form-submit').click();
  await page.locator('.form-status--success').waitFor();
  const successEvents = await events();
  if (expectEvents) {
    assert.deepEqual(successEvents, [{ event: 'generate_lead', form_type: 'contact', service: 'furnace-repair' }], `${engine}: exactly one PII-free accepted-lead event`);
    const conversionCalls = await page.evaluate(() => (window.dataLayer || []).filter(item => item?.[0] === 'event' && item?.[1] === 'conversion').map(item => item[2]));
    assert.equal(conversionCalls.length, 1, `${engine}: one Google form-conversion dispatch`);
    assert.equal(conversionCalls[0].send_to, 'AW-16533482745/TanbCMOlpbodEPnZ48s9');
    assert.ok(typeof conversionCalls[0].transaction_id === 'string' && conversionCalls[0].transaction_id.length > 10);
  } else {
    assert.deepEqual(successEvents, [], `${engine}: no events in preview/development build`);
  }
  assert.equal(gtmRequests, expectedGtm ? 1 : 0, `${engine}: expected GTM loader state`);

  if (expectEvents) {
    for (const fixture of [
      { status: 400, response: { ok: false, error: 'Validation rejected' } },
      { status: 400, response: { ok: false, error: 'Honeypot rejected' }, honeypot: true },
      { status: 500, response: { ok: false, error: 'Server rejected' } },
      { status: 200, response: { ok: false, error: 'Not accepted' } },
      { status: 200, response: { message: 'Missing success flag' } },
    ]) {
      await clearEvents(); apiStatus = fixture.status; apiResponse = fixture.response;
      await fillForm();
      await page.locator('[name="_gotcha"]').evaluate((element, value) => { element.value = value; }, fixture.honeypot ? 'bot' : '');
      await page.locator('.form-submit').click();
      await page.locator('.form-status--error').waitFor();
      assert.deepEqual(await events(), [], `${engine}: rejected submission must not convert`);
      assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(item => item?.[0] === 'event' && item?.[1] === 'conversion').length), 0);
    }
    apiStatus = 200; apiResponse = { ok: true, message: 'Test accepted' }; apiDelay = 150;
    await clearEvents(); await fillForm();
    await page.locator('[name="_gotcha"]').evaluate(element => { element.value = ''; });
    const before = apiCalls;
    await page.locator('form.contact-form').evaluate(form => {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await page.locator('.form-status--success').waitFor();
    assert.equal(apiCalls - before, 1, `${engine}: duplicate in-flight submit guard`);
    assert.equal((await events()).length, 1, `${engine}: one event for one accepted request`);
    assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(item => item?.[0] === 'event' && item?.[1] === 'conversion').length), 1, `${engine}: one conversion for duplicate in-flight submits`);
    apiDelay = 0;

    await clearEvents(); await fillForm();
    await page.locator('#service').evaluate(select => {
      const option = document.createElement('option');
      option.value = 'sensitive@example.invalid'; option.textContent = option.value;
      select.append(option);
    });
    await page.locator('#service').selectOption('sensitive@example.invalid');
    await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.deepEqual(await events(), [{ event: 'generate_lead', form_type: 'contact', service: 'other' }], `${engine}: allowlisted service dimension`);

    await clearEvents(); await fillForm();
    await page.locator('[name="_gotcha"]').evaluate(element => { element.value = 'bot'; });
    await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.deepEqual(await events(), [], `${engine}: honeypot cannot convert even with a simulated success response`);

    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await clearEvents();
    await page.evaluate(() => document.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('a[href^="tel:"]')) event.preventDefault();
    }, true));
    for (const [selector, location] of [
      ['.site-header a[href^="tel:"]', 'header'],
      ['.emergency-cta a[href^="tel:"]', 'sticky'],
      ['main a[href^="tel:"]', 'body'],
      ['.site-footer a[href^="tel:"]', 'footer'],
    ]) {
      await page.locator(selector).first().evaluate(element => {
        if (!(element instanceof HTMLElement)) throw new Error('Expected a telephone anchor');
        element.click();
      });
      const captured = await events();
      assert.deepEqual(captured.at(-1), { event: 'phone_tap', location }, `${engine}: telephone classification`);
    }
    assert.equal((await events()).length, 4);
    await page.screenshot({ path: `${artifactDir}/${engine}-mobile.png` });

    await page.goto(base + '/contact/thank-you/', { waitUntil: 'networkidle' });
    assert.deepEqual(await events(), [], `${engine}: direct thank-you visit must not fabricate a lead`);
    await page.reload({ waitUntil: 'networkidle' });
    assert.deepEqual(await events(), [], `${engine}: thank-you refresh must not convert`);

    const privateStart = gtmRequests;
    await page.goto(base + '/contact/?email=sensitive%40example.invalid', { waitUntil: 'networkidle' });
    await fillForm(); await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.deepEqual(await events(), [], `${engine}: sensitive query guard`);
    assert.equal(gtmRequests, privateStart);

    const previewStart = gtmRequests;
    await page.goto('https://preview--loushvac303.netlify.app/contact/', { waitUntil: 'networkidle' });
    await fillForm(); await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.deepEqual(await events(), [], `${engine}: wrong-host guard`);
    assert.equal(gtmRequests, previewStart);

    const privatePathStart = gtmRequests;
    await page.route('**/admin/leads/**', async route => {
      // Public HTML fixture at a private path exercises the independent runtime denylist.
      const response = await route.fetch({ url: local + '/contact/' });
      await route.fulfill({ response });
    });
    await page.goto(base + '/admin/leads/', { waitUntil: 'networkidle' });
    await fillForm(); await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.deepEqual(await events(), [], `${engine}: private-path runtime guard`);
    assert.equal(gtmRequests, privatePathStart);

    const gpcPage = await context.newPage();
    await gpcPage.addInitScript(() => Object.defineProperty(navigator, 'globalPrivacyControl', { get: () => true }));
    const gpcStart = gtmRequests;
    await gpcPage.goto(base + '/', { waitUntil: 'networkidle' });
    assert.equal(gtmRequests, gpcStart, `${engine}: no GTM with Global Privacy Control`);
    assert.equal(await gpcPage.evaluate(() => (window.dataLayer || []).length), 0);
    await gpcPage.close();

    await page.goto(base + '/contact/', { waitUntil: 'networkidle' });
    await page.evaluate(() => { window.dataLayer = { push() { throw new Error('Test blocked analytics'); } }; });
    await fillForm(); await page.locator('.form-submit').click();
    await page.locator('.form-status--success').waitFor();
    assert.equal(await page.locator('#name').inputValue(), '', `${engine}: analytics failure cannot break a captured lead`);
  }
  assert.deepEqual(pageErrors, [], `${engine}: no uncaught browser errors`);
  report.push({ engine, environment: expectedEnvironment, gtm_loader_fixture: expectedGtm, status: 'PASS', real_provider_ingestion: false, real_leads_sent: 0 });
  await writeFile(`${artifactDir}/browser-results.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`PASS ${engine}: ${expectedEnvironment}, GTM loader ${expectedGtm ? 'fixture' : 'disabled'}`);
  await context.unrouteAll({ behavior: 'ignoreErrors' });
  await browser.close();
}
await writeFile(`${artifactDir}/browser-results.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
