# Owner-selected homepage hero

## Source and scope

Gregory supplied and confirmed this exact photo on Lou's behalf:
https://photos.app.goo.gl/aFYCUMBhyWAun3tC7

Downloaded original: JPEG, 5310 × 3540, 18,355,340 bytes.
SHA-256: `3d30eda6b7bb3f9fa844e6af858f12b5c133637a092535736e82dcf42864bc2d`.
The original is archived outside the deployed tree at `/home/gbot/.hermes/work/loushvac-hero/lou-supplied-original.jpg`.

No people or scenery were generated, removed or retouched. The photo is resized without cropping; optimized variants strip embedded camera/GPS metadata. The wide group and service vehicles must remain visible, rather than forcing the image into the previous near-square crop. Existing brand colors, desktop split layout, headline, service copy and measurement logic remain unchanged in this first release.

## Reproduction

Run `node scripts/optimize-hero.mjs /path/to/original.jpg` with the checksum-matching original. Outputs: `public/images/lou-team-nov2026-{640,1024,1600,2400}.{webp,jpg}`. Distinct filenames prevent stale-cache reuse of the previous hero. The HTML keeps responsive source selection, intrinsic dimensions and high fetch priority.

## Verification

- `npm run build && npm run test:seo`
- Serve `dist` on loopback port 4330, then `npm run test:hero`.
- `HERO_BASE=https://loushvac303.com HERO_QA_DIR=/tmp/lous-hero-live npm run test:hero` after publication.
- Chromium and Firefox matrix: 320, 390 (2× DPR), 768, 899, 900, 1024, 1440 and 1920 CSS pixels; image decoding, full-photo ratio, containing frame, JPEG fallback, both CTAs, overflow and page errors. No form submissions or third-party analytics are sent by the suite.
- Real-device Safari testing is not implied by desktop browser tests.

## Separate next release

The larger mobile conversion redesign is separately authorized: reduce hero framing, bring real team and Google proof into the opening mobile view, streamline the route to service choice/contact, and verify navigation, touch targets, forms, accessibility and mobile performance without changing Ads configuration or inventing business claims. Do not hold this photo release for that backlog.
