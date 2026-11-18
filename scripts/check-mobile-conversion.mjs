import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from 'playwright';
const base = process.env.MOBILE_BASE || 'http://127.0.0.1:4330';
const output = process.env.MOBILE_QA_DIR || '/tmp/lous-mobile-conversion';
const baseline = process.env.BASELINE === 'true';
await mkdir(output, { recursive: true });
const rows = [];
for (const name of (process.env.BROWSERS || 'chromium,firefox').split(',')) {
  const browser = await ({ chromium, firefox }[name]).launch({ headless: true });
  try {
    for (const [width, height] of [[320,640],[390,720],[430,800],[768,1024],[900,700],[1440,900]]) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1100 });
      const page = await context.newPage();
      const errors = [];
      let submits = 0;
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        window.__visualMetrics = { lcp: 0, cls: 0 };
        try {
          new PerformanceObserver(list => { for (const e of list.getEntries()) window.__visualMetrics.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__visualMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
        } catch { /* Firefox may not expose these Chromium performance entries. */ }
      });
      await page.route('**/*', route => {
        const request = route.request(), url = new URL(request.url());
        if (url.origin !== new URL(base).origin) return route.abort();
        if (url.pathname === '/api/contact') { submits++; return route.fulfill({ contentType:'application/json', body:'{"ok":true,"message":"LOCAL QA ONLY"}' }); }
        return request.method() === 'GET' ? route.continue() : route.abort();
      });
      await page.goto(base, { waitUntil:'networkidle' });
      await page.locator('.hero-media img').evaluate(img => img.decode());
      const first = await page.evaluate(() => ({
        width: innerWidth, height: innerHeight, overflow: document.documentElement.scrollWidth > innerWidth + 1,
        headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
        photo: document.querySelector('.hero-media').getBoundingClientRect().toJSON(),
        bar: document.querySelector('.emergency-cta').getBoundingClientRect().toJSON(),
        rating: document.querySelector('.hero-rating')?.getBoundingClientRect().toJSON() || null,
        metrics: window.__visualMetrics,
        resources: performance.getEntriesByType('resource').map(e => ({name:new URL(e.name).pathname, bytes:e.encodedBodySize}))
      }));
      rows.push({browser:name, ...first});
      if (width === 390 || width === 1440) await page.screenshot({ path:`${output}/${name}-${width}-first-view.png` });
      if (!baseline) {
        assert.ok(!first.overflow, `${name} ${width}: no page overflow`);
        if (width <= 430) {
          assert.ok(first.headerHeight <= 72, 'compact header');
          assert.ok(first.rating && first.rating.bottom < first.photo.top, 'Google proof precedes real team photo');
          assert.ok(first.photo.bottom <= first.bar.top + 1, `${name} ${width}: entire team photo in first viewport above persistent call bar`);
          assert.ok(first.photo.height >= 160, 'team photo is substantive, not a tiny thumbnail');
        }
        assert.ok(first.metrics.cls < .1, `${name} ${width}: no excessive initial layout shift`);
        await page.goto(base + '/contact/?service=furnace-repair', { waitUntil:'networkidle' });
        assert.equal(await page.locator('#service').inputValue(), 'furnace-repair');
        if (width < 768) {
          const order = await page.evaluate(() => ({form:document.querySelector('.contact-form-wrapper').getBoundingClientRect().top, info:document.querySelector('.contact-info').getBoundingClientRect().top}));
          assert.ok(order.form < order.info, 'form precedes long business info on mobile');
        }
        if (width === 390) {
          await page.locator('.form-submit').click();
          assert.equal(submits, 0, 'invalid empty form never reaches API');
          await page.locator('#name').fill('LOCAL QA ONLY');
          await page.locator('#phone').fill('3035550147');
          await page.locator('#email').fill('qa@example.invalid');
          await page.locator('.form-submit').click();
          await page.locator('.form-status--success').waitFor();
          assert.equal(submits, 1, 'one successful fixture request');
          assert.equal(await page.locator('[data-status]').getAttribute('role'), 'status');
          assert.ok(await page.locator('[data-status]').evaluate(el => document.activeElement === el), 'success gets keyboard focus');
          await page.screenshot({ path:`${output}/${name}-form-success.png` });
          await page.setViewportSize({width:844,height:390});
          const menu = page.locator('#mobile-menu-btn');
          await menu.click();
          assert.equal(await menu.getAttribute('aria-expanded'), 'true');
          await page.locator('.mobile-nav-cta').scrollIntoViewIfNeeded();
          const reachable = await page.locator('.mobile-nav-cta').evaluate(el => {const r=el.getBoundingClientRect(); return r.top>=0 && r.bottom<=innerHeight;});
          assert.ok(reachable, 'menu request CTA reachable in phone landscape');
          await page.keyboard.press('Escape');
          assert.equal(await menu.getAttribute('aria-expanded'), 'false');
          assert.ok(await menu.evaluate(el => el===document.activeElement), 'Escape restores menu-button focus');
        }
        assert.deepEqual(errors, [], 'no JavaScript errors');
      }
      await context.close();
    }
    console.log(`${baseline?'BASELINE':'PASS'} ${name}: mobile first impression, contact flow and menu checks`);
  } finally { await browser.close(); }
}
await writeFile(`${output}/results.json`, JSON.stringify(rows,null,2));
console.log(`Evidence: ${output}`);
