import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from 'playwright';
const base = 'https://loushvac303.com';
const local = process.env.TEST_SERVER || 'http://127.0.0.1:4330';
const output = process.env.QA_DIR || '/tmp/lous-full-launch-consent';
const disabledBuild = process.env.EXPECT_DISABLED === 'true';
await mkdir(output, { recursive: true });
const results = [];

for (const name of (process.env.BROWSERS || 'chromium,firefox').split(',')) {
  const browser = await ({ chromium, firefox }[name]).launch({ headless: true });
  async function setup({ defaultOn = true, gpc = false, choice = null, delayedTag = false } = {}) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const capture = { tags: 0, policy: 0, mutations: 0, errors: [], releaseTag: null };
    await context.addInitScript(({ gpc, choice }) => {
      if (gpc) Object.defineProperty(navigator, 'globalPrivacyControl', { get: () => true });
      if (location.hostname !== 'loushvac303.com' && !location.hostname.endsWith('.netlify.app')) return;
      if (choice !== null) localStorage.setItem('lous.measurement.v1', JSON.stringify({ v: 1, allowed: choice }));
      window.__choiceWrites = 0;
      const set = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) { if (key === 'lous.measurement.v1') window.__choiceWrites++; return set.call(this, key, value); };
    }, { gpc, choice });
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtm.js') {
        capture.tags++;
        if (delayedTag) await new Promise(resolve => { capture.releaseTag = resolve; });
        return route.fulfill({ contentType: 'application/javascript', body: 'window.__googleLoaderFixture = true;' });
      }
      if (url.hostname !== 'loushvac303.com' && !url.hostname.endsWith('.netlify.app')) return route.abort();
      if (url.pathname === '/api/measurement-policy') {
        capture.policy++;
        return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ defaultOn }) });
      }
      if (url.pathname === '/api/contact') {
        capture.mutations++;
        return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, message: 'LOCAL FIXTURE ACCEPTED' }) });
      }
      const path = url.pathname.startsWith('/admin/') ? '/contact/' : url.pathname;
      const response = await route.fetch({ url: local + path + url.search });
      return route.fulfill({ response });
    });
    const page = await context.newPage();
    page.on('pageerror', error => capture.errors.push(error.message));
    await page.goto(base + '/contact/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__lousMeasurementState?.ready === true);
    return { context, page, capture };
  }
  async function close(fixture) {
    assert.deepEqual(fixture.capture.errors, [], `${name}: browser errors`);
    await fixture.context.unrouteAll({ behavior: 'ignoreErrors' });
    await fixture.context.close();
  }
  if (disabledBuild) {
    const item = await setup();
    assert.equal(await item.page.evaluate(() => window.__lousMeasurementState.allowed), false);
    assert.equal(item.capture.tags, 0);
    assert.equal(item.capture.policy, 0);
    await close(item);
  } else {
    const us = await setup();
    assert.equal(await us.page.evaluate(() => window.__lousMeasurementState.allowed), true);
    await us.page.waitForFunction(() => window.__googleLoaderFixture === true);
    assert.equal(us.capture.tags, 1);
    assert.equal(await us.page.locator('.measurement-settings').getAttribute('open'), null, 'no automatic panel/popup');
    const defaults = await us.page.evaluate(() => window.dataLayer.filter(item => item?.[0] === 'consent' && item?.[1] === 'default').map(item => item[2]));
    assert.equal(defaults.length, 1);
    assert.equal(defaults[0].ad_storage, 'granted');
    assert.equal(defaults[0].ad_user_data, 'granted');
    assert.equal(defaults[0].ad_personalization, 'denied');
    await us.page.locator('#name').fill('LOCAL FIXTURE');
    await us.page.locator('#phone').fill('3035550147');
    await us.page.locator('#email').fill('fixture@example.invalid');
    await us.page.locator('#service').selectOption('furnace-repair');
    await us.page.locator('.form-submit').click();
    await us.page.locator('.form-status--success').waitFor();
    assert.equal(await us.page.evaluate(() => window.dataLayer.filter(item => item?.event === 'generate_lead').length), 1);

    await us.page.locator('.measurement-settings summary').click();
    await us.page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const controlState = await us.page.locator('.measurement-actions').evaluate(element => {
      const bar = document.querySelector('.emergency-cta')?.getBoundingClientRect();
      const header = document.querySelector('.site-header')?.getBoundingClientRect();
      return [...element.querySelectorAll('button,a')].map(control => { const r=control.getBoundingClientRect(); const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2); return { visible:r.top>=(header?.bottom||0)&&r.bottom<=(bar?.top||innerHeight), hit:control.contains(hit) }; });
    });
    assert.ok(controlState.every(control => control.visible && control.hit), `${name}: opened settings controls must clear header/call bar`);
    const panel = await us.page.locator('.measurement-settings').boundingBox();
    assert.ok(panel && panel.height < 400, `${name}: compact inline settings`);
    await us.page.screenshot({ path: `${output}/${name}-settings.png` });
    await us.page.locator('[data-measurement-choice="off"]').click();
    assert.equal(await us.page.evaluate(() => window.__lousMeasurementState.allowed), false);
    assert.equal(await us.page.evaluate(() => JSON.parse(localStorage.getItem('lous.measurement.v1')).allowed), false);
    await us.page.reload({ waitUntil: 'networkidle' });
    await us.page.waitForFunction(() => window.__lousMeasurementState?.ready);
    assert.equal(us.capture.tags, 1, 'saved opt-out prevents a new loader');
    assert.equal(await us.page.evaluate(() => window.__lousMeasurementState.allowed), false);
    await close(us);

    for (const settings of [{ defaultOn: false }, { gpc: true, choice: true }]) {
      const item = await setup(settings);
      assert.equal(await item.page.evaluate(() => window.__lousMeasurementState.allowed), false);
      assert.equal(item.capture.tags, 0);
      await item.page.locator('.measurement-settings summary').click();
      if (settings.gpc) {
        assert.equal(await item.page.locator('[data-measurement-choice="on"]').isDisabled(), true);
      } else {
        await item.page.locator('[data-measurement-choice="on"]').click();
        await item.page.waitForFunction(() => window.__googleLoaderFixture === true);
        assert.equal(item.capture.tags, 1);
        assert.equal(await item.page.evaluate(() => window.__lousMeasurementState.allowed), true);
      }
      await close(item);
    }

    const tabs = await setup();
    const second = await tabs.context.newPage();
    await second.goto(base + '/contact/', { waitUntil: 'networkidle' });
    await second.waitForFunction(() => window.__lousMeasurementState?.ready);
    await tabs.page.locator('.measurement-settings summary').click();
    await tabs.page.locator('[data-measurement-choice="off"]').click();
    await second.waitForFunction(() => window.__lousMeasurementState.allowed === false);
    assert.equal(await tabs.page.evaluate(() => window.__choiceWrites), 1);
    assert.equal(await second.evaluate(() => window.__choiceWrites), 0, 'no cross-tab writeback loop');
    await close(tabs);

    const late = await setup({ delayedTag: true });
    await late.page.waitForFunction(() => !!document.querySelector('#lous-google-tag'));
    await late.page.evaluate(() => window.dataLayer.push({ event: 'generate_lead', form_type: 'contact', service: 'other' }));
    await late.page.evaluate(() => window.gtag('event', 'conversion', { send_to: 'AW-16533482745/TanbCMOlpbodEPnZ48s9', transaction_id: 'local-pending-fixture' }));
    await late.page.locator('.measurement-settings summary').click();
    await late.page.locator('[data-measurement-choice="off"]').click();
    assert.equal(await late.page.evaluate(() => window.dataLayer.filter(item => item?.event === 'generate_lead').length), 0);
    assert.equal(await late.page.evaluate(() => window.dataLayer.filter(item => item?.[0] === 'event' && item?.[1] === 'conversion').length), 0);
    const lateDefault = await late.page.evaluate(() => window.dataLayer.find(item => item?.[0] === 'consent' && item?.[1] === 'default')[2]);
    assert.equal(lateDefault.ad_storage, 'denied');
    assert.equal(lateDefault.ad_user_data, 'denied');
    while (!late.capture.releaseTag) await new Promise(resolve => setTimeout(resolve, 10));
    late.capture.releaseTag();
    await late.page.waitForFunction(() => window.__googleLoaderFixture === true);
    assert.equal(await late.page.evaluate(() => window.__lousMeasurementState.allowed), false);
    await close(late);

    const excluded = await setup();
    await excluded.page.waitForFunction(() => window.__googleLoaderFixture === true);
    for (const url of [base + '/admin/leads/', base + '/contact/?email=test%40example.invalid', 'https://preview--loushvac303.netlify.app/contact/']) {
      const before = excluded.capture.tags;
      await excluded.page.goto(url, { waitUntil: 'networkidle' });
      await excluded.page.waitForFunction(() => window.__lousMeasurementState?.ready);
      assert.equal(await excluded.page.evaluate(() => window.__lousMeasurementState.allowed), false);
      assert.equal(excluded.capture.tags, before);
    }
    await close(excluded);
  }
  results.push({ browser: name, build: disabledBuild ? 'disabled/preview' : 'production-enabled', status: 'PASS', realGoogleIngestion: false, realLeadsSent: 0 });
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(`PASS ${name}: ${disabledBuild ? 'disabled' : 'consent lifecycle'}`);
  await browser.close();
}
console.log(JSON.stringify(results, null, 2));
