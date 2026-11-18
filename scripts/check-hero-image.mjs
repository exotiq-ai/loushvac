import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from 'playwright';

const base = process.env.HERO_BASE || 'http://127.0.0.1:4330';
const output = process.env.HERO_QA_DIR || '/tmp/lous-hero-qa';
const prefix = '/images/lou-team-nov2026-';
const rows = [];
await mkdir(output, { recursive: true });
for (const name of (process.env.BROWSERS || 'chromium,firefox').split(',')) {
  const browser = await ({ chromium, firefox }[name]).launch({ headless: true });
  try {
    for (const width of [320, 390, 768, 899, 900, 1024, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, hasTouch: width < 1100 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      // Visual QA never submits forms or sends analytics to third parties.
      await page.route('**/*', route => {
        const request = route.request();
        return new URL(request.url()).origin === new URL(base).origin && request.method() === 'GET' ? route.continue() : route.abort();
      });
      await page.goto(base, { waitUntil: 'networkidle' });
      const image = page.locator('.hero-media img');
      await image.evaluate(img => img.decode());
      const state = await image.evaluate(img => {
        const rect = img.getBoundingClientRect();
        const frame = img.closest('.hero-photo-frame').getBoundingClientRect();
        const style = getComputedStyle(img);
        return { currentSrc: img.currentSrc, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, width: rect.width, height: rect.height, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, frame: frame.toJSON(), objectFit: style.objectFit, alt: img.alt, fetchpriority: img.getAttribute('fetchpriority'), loading: img.loading, pageWidth: document.documentElement.scrollWidth, innerWidth };
      });
      assert.ok(new URL(state.currentSrc).pathname.startsWith(prefix), 'hero uses the owner-selected November photo, not the old group portrait');
      assert.ok(state.naturalWidth > 0 && state.width > 0 && state.height > 0, 'hero image decoded and visible');
      assert.ok(Math.abs(state.naturalWidth / state.naturalHeight - 1.5) < 0.005, 'source proportions retained');
      assert.ok(Math.abs(state.width / state.height - 1.5) < 0.01, 'natural landscape frame; no narrow center-crop');
      assert.equal(state.objectFit, 'contain', 'all people and vehicles remain in the photograph');
      assert.ok(state.left >= state.frame.left && state.right <= state.frame.right + 1 && state.top >= state.frame.top && state.bottom <= state.frame.bottom + 1, 'photo is not clipped by its frame');
      if (state.pageWidth > state.innerWidth + 1) {
        console.log(JSON.stringify({ browser: name, width, state, overflowing: await page.locator('body').evaluate(body => Array.from(body.querySelectorAll('*')).filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).slice(0, 12).map(el => ({ tag: el.tagName, class: el.className, rect: el.getBoundingClientRect().toJSON() }))) }, null, 2));
      }
      assert.ok(state.pageWidth <= state.innerWidth + 1, `${name} ${width}: no horizontal page overflow`);
      assert.match(state.alt, /team.*service vehicles/i);
      assert.equal(state.fetchpriority, 'high');
      assert.notEqual(state.loading, 'lazy');
      assert.ok(await page.locator('.hero-cta-group a[href^="tel:"]').isVisible(), 'call CTA retained');
      assert.equal(await page.locator('.hero-cta-group a[href="/contact/"]').count(), 1, 'service CTA retained');
      assert.deepEqual(errors, [], 'no page JavaScript errors');
      if ([390, 900, 1440].includes(width)) {
        await page.locator('.hero').screenshot({ path: `${output}/${name}-${width}-hero.png` });
        await page.screenshot({ path: `${output}/${name}-${width}-viewport.png` });
        await image.evaluate(img => img.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await image.screenshot({ path: `${output}/${name}-${width}-photo.png` });
      }
      if (width === 390) {
        await image.evaluate(img => { img.closest('picture').querySelectorAll('source').forEach(source => source.remove()); img.removeAttribute('srcset'); });
        await image.evaluate(img => img.decode());
        const fallback = await image.evaluate(img => ({ src: img.currentSrc, width: img.naturalWidth }));
        assert.ok(fallback.src.endsWith('lou-team-nov2026-1600.jpg') && fallback.width > 0, 'JPEG fallback decodes');
      }
      rows.push({ browser: name, width, status: 'PASS', ...state });
      await context.close();
    }
    console.log(`PASS ${name}: 8 hero viewports, full-photo framing, image load, CTAs and JPEG fallback`);
  } finally { await browser.close(); }
}
await writeFile(`${output}/results.json`, JSON.stringify(rows, null, 2));
console.log(`Evidence: ${output}`);
