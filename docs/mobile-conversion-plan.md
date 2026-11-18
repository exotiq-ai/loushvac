# Mobile first-impression and conversion release

Approved by Gregory: implement and deploy the mobile conversion pass. The selected team photo has already shipped separately in PR #7.

## Reference lock
- Primary: the actual Lou's mobile screenshot supplied by Gregory and the established navy/orange/white brand.
- Media: Gregory's exact owner-selected team photo. Keep the whole group; no generated substitutes or heavy crops.
- Evidence: existing source-linked 5.0 Google / 400+ review claim, exact preserved testimonials, approved business facts.
- Craft references: refero-design craft-details and anti-ai-slop; prefer meaningful hierarchy, readable type, real photography, semantic controls, explicit image dimensions, no unnecessary card framing/blur.
- Preserve desktop split hero where it works; never shrink type or hide overflow to fake responsive correctness.

## Release scope
1. Opening mobile view: compact header, local identity, readable headline, linked Google proof, actual team photograph, short service explanation and a clear request route. Persistent call action remains available.
2. Service choice before long sales copy: surface repair/replacement/maintenance pages earlier; retain descriptive destinations and existing SEO content.
3. Compact evidence: mobile credential list becomes readable two-column rows instead of ten large stacked boxes. Reviews stay attributed and unchanged.
4. Shared mobile usability: navigation state/focus/Escape and short landscape reachability; form-first contact page; accessible status/error focus and native validation; retain required email and backend contract.
5. Performance: AVIF/WebP/JPEG responsive hero, correct sizes/intrinsics, no new font/widget/framework; reduce mobile blur/decorative effects, reduced-motion handling and touch/focus/scroll clearance.
6. Regression gate: build, SEO, business claims/review archive, mobile hero/CTA matrix, menu/form fixture tests and existing analytics/consent tests. No real enquiries or ad conversions in automated fixture QA.
7. Staging and production: verified Netlify source/commit, separate publication evidence, live route/asset/browser checks.

## Boundaries
No changes to Google Ads, call-forwarding configuration, HCP, tracking consent policy, required field database schema, discount terms or replacement pricing. Do not promise perfect compatibility, a Lighthouse score, live enquiry receipt or improved conversion rate without corresponding evidence. Browser lab timings are not field Core Web Vitals.

## Acceptance
- At normal text size the team image and linked rating are visible early on standard phone portrait screens; no oversized text card hides the team below the opening view.
- All people remain in the full 3:2 photo; zero horizontal overflow across tested widths; sticky call links remain usable and footer/inputs clear them.
- Contact form is the first substantive mobile contact-page section; validation/status is understandable and keyboard accessible; exactly-once successful-submit tracking remains intact.
- Public content/source records are preserved and performance findings are reported honestly.

## Final local evidence
- Build, SEO (24 HTML pages / 23 sitemap URLs), launch content and review archive tests pass.
- Chromium and Firefox: hero 8 widths; first-impression/contact/menu 6 widths; persistent CTA 6 sizes × 3 pages × 3 scroll positions including enlarged text. No real lead submissions.
- All 23 sitemap pages at 320, 390 and 768px: 69 route/width checks, no overflow or broken eager images. Axe 4.10.3 WCAG A/AA checks on home, contact, emergency, furnace repair and FAQ at 390px: no violations in the automated run. This is not a full accessibility certification.
- Analytics and consent lifecycle fixture suites pass in Chromium/Firefox; no account changes or third-party conversion ingestion in these tests.
- Astro check: 0 errors, 0 warnings, 5 existing hints.
- Synthetic page-only Chromium lab, 390×720 at 2× DPR, 4× CPU slowdown, 150ms latency, 200,000 B/s download, cold cache, three runs: median LCP 1,684ms, maximum CLS 0. Third-party analytics blocked; not Lighthouse or field Core Web Vitals.
- 1024px hero: 153,914-byte WebP → 122,187-byte AVIF. Logo: 190,150-byte PNG → 34,578-byte WebP with empty margins trimmed. Four decorative service icons reduced from large 1000px PNGs to 112px WebP with original fallbacks.
- Safari/WebKit/physical device and actual field conversion lift are not claimed. Production evidence is recorded separately after release.
