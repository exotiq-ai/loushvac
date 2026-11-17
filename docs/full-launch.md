# Full-launch website release

This document supersedes the pre-activation behavior described in `analytics-launch.md`.

## Website scope

- Eligible-US default-on measurement; explicit preferences, browser/HTTP GPC, non-US/unknown defaults and private/environment exclusions take precedence.
- Compact footer details control, no automatic popup/banner. Opening controls scrolls their action row clear of the fixed header/call bar.
- Google ad_user_data and ad_personalization are denied and enhanced matching disabled in the website initialization. A real-SDK intercepted-transport test validates these runtime states and checks raw/SHA-256 fixture contact values are absent.
- Opt-out suppresses application events, clears selected first-party measurement cookies and prevents future tag loading. Already-loaded Google code may send limited cookieless signals until navigation/refresh; the UI and policy disclose this.
- Netlify edge endpoint `/api/measurement-policy` uses trusted `context.geo`, accepts `Sec-GPC: 1` as an opt-out, returns only policy booleans, and is private/no-store.
- No unconditional noscript tag iframe bypasses choices. HTML form fallback remains, but does not fabricate a JavaScript conversion on thank-you visits.
- Mobile call bar uses an E.164 link, safe areas, coarse-pointer support and measured document clearance. Desktop non-touch layout preserves the original behavior.
- Google testimonials retain the original 22-review archive and add four approved dated/source-linked excerpts. Google aggregate 5.0/402 was checked 2026-11-17; curated count is separate.
- Updated public copy and facts: American Standard plus Carrier; commercial enquiry page; no ductwork or walk-in retail claims; no public replacement-price ranges; $129 diagnostic versus free replacement estimate distinction; current parts/labor warranty with prior agreements preserved; offers presented without invented caps/stacking terms.
- Removed unsupported award/superlative and personal-attendance/deadline claims. Google Maps is user-initiated through links rather than automatically loaded iframe content.

## Verification completed before release

- Production build, Astro check (zero errors/warnings, five existing hints), SEO/canonical/JSON-LD checks.
- Seven pure policy/edge tests including HTTP GPC.
- Generated-copy regression across 30 text assets; 24 HTML pages and 23 sitemap URLs; 18 retained service areas with no Aurora.
- Original-review equality plus exact Google record/source/date validation.
- Chromium and Firefox: accepted/error/honeypot/duplicate form behavior, phone-location events, consent defaults/choices/GPC/multi-tab/pending SDK/private routes.
- Production-enabled, production-disabled and deploy-preview builds.
- Mobile matrix: 320/390/430 portrait, 844 landscape, 1024/1366 touch; three routes, top/middle/bottom; enlarged text and ordinary desktop hiding.
- Actual Google CDN SDK executed with measurement transports intercepted: correct container initialized, ad_storage true for permitted US, ad_user_data/personalization false, withdrawal update denied, no new loader after saved opt-out.

Fixtures are not Google ingestion or mailbox proof. Native Safari/iOS testing was not performed; WebKit host libraries are unavailable. Prior labeled email receipt was confirmed by Gregory; no repeated live enquiry was sent during this release.

## Account-side acceptance still separate

Known form destination: `AW-16533482745/TanbCMOlpbodEPnZ48s9`. The website now dispatches that supplied conversion call after successful server acceptance through the existing Google tag, with a per-submission transaction identifier. The real-SDK intercepted test observed exactly one matching-label request while user-data and personalization consent remained denied. This is transport verification, not an attributed Ads report. Do not add a parallel native GTM form tag: the website is the single dispatcher. The website-call label is not supplied, so real forwarding-number assignment remains unverified. An authorized Google operator must supply/configure website calls and verify the Ads action goals/count settings.

Housecall Pro has no API access; use the existing tracker and exports/manual updates. No HCP upgrade, Ads campaign/budget changes, enhanced-conversion contact upload or replacement-price advertising is included.

## Activation and rollback

Publish reviewed source through main, verify exact Netlify deployment, then enable `GTM_ENABLED=true` in the production build scope and perform a fresh Git-linked build. Verify the actual policy endpoint, loader request/runtime, consent states and private/preview exclusions. Missing conversion labels do not block base-tag detection.

Rollback: set the production activation flag false and rebuild the reviewed main if measurement behavior is wrong. Do not restore the rejected worker branches. For a full source rollback, use the known prior production commit recorded in the PR and a normal reviewed revert.

## Maintenance risk

The inherited dependency graph is not a clean security scan. `npm audit --omit=dev` reported 62 advisories including critical findings in Astro and tar. No dependency versions were introduced or upgraded in this release. `tar` is reached through Netlify build/dev bundling dependencies; the site adds no archive-upload path. The new pages use local ordinary image assets and no user-supplied image optimization, MDX, hydrated islands or spread-attribute content. This is limited source triage—not proof that every inherited advisory is unreachable. A coordinated framework/adapter/runtime security update remains required maintenance; do not run a blind force-upgrade or claim the whole site security-audited. Registry metadata during review listed Astro 7.4.12 requiring Node >=22.23.4, while the local runtime was 22.22.3.
