# Analytics launch wiring

## Release boundary

This change supplies the website's PII-free event contract and an explicitly gated production GTM loader. It does **not** claim Google Ads measurement is active. `GTM_ENABLED` is unset/false in production until the activation checklist below is complete. No Ads account settings, GA4, enhanced conversions, attribution cookies, optional-email behavior or unrelated website copy are changed.

- Container: `GTM-W7R427MZ`
- Ads destination supplied by Gregory: `AW-16533482745`
- Public events: `generate_lead` (`form_type: contact`, allowlisted `service`) and `phone_tap` (`location: header|sticky|body|footer`).
- `generate_lead` fires after the contact API returns both HTTP success and `ok: true`. It does not fire on generic submit or a thank-you-page view. Duplicate in-flight form submission is blocked. Analytics exceptions cannot change an accepted enquiry into an apparent form failure.
- No name, email, phone, free-text message, raw URL or click ID is copied into these events.
- Build-context and browser-host guards exclude development/previews. Admin/API paths, sensitive query keys and Global Privacy Control exclude the loader/events. The admin page uses the shared layout and must remain excluded.

## Actual blockers discovered

The published GTM resource retrieved on 2026-11-17 has automatic email/phone/address detection enabled (`__ogt_1p_data_v2`). Its published rules do not include the requested `generate_lead` conversion tag or website-call conversion configuration. Existing OAuth has no Tag Manager scopes (API 403) and the browser requires sign-in. Conversion labels and GA4 ID have not been supplied.

The current privacy page says no advertising cookies/third-party trackers. Do not enable the loader while that disclosure is inaccurate. This release preserves that copy rather than publishing an unapproved policy rewrite. The loader queues denied consent defaults and disables enhanced-conversion/personalization settings as defense in depth; these settings are not a substitute for correct container configuration, approved disclosure and a verified consent implementation.

## Activation checklist — not completed by this PR

1. Obtain scoped GTM access or have Gregory publish the configuration. Do not modify Google Ads account 236-561-3207; Gregory owns conversion-action creation there.
2. Disable automatic user-provided-data collection and leave enhanced conversions off until separately approved. Audit other automatic tag behavior and do not map generic form-submit events as leads.
3. Obtain the form-lead and website-call conversion labels. The account ID alone is insufficient. Configure the explicit custom `generate_lead` trigger, count One/primary in Ads as Gregory specifies, and website-call tracking. Keep `phone_tap` observational.
4. Approve accurate Google measurement privacy disclosure and consent behavior, including any no-JS tag fallback. Do not blindly override the denied consent defaults to make a test pass.
5. Set `GTM_ENABLED=true` only for the intended Netlify production build context and rebuild from reviewed main. Verify the exact new published deploy. Never activate previews/admin pages.
6. In Tag Assistant/Preview, prove one accepted labeled test lead produces one event and one intended Ads tag firing, and that failures/refreshes do not.
7. Verify Google forwarding-number assignment through a supported diagnostic or genuine eligible ad journey. `gclid=test123` is not a valid ad click and cannot prove a real forwarding-number allocation. Verify actual number text and every `tel:` target, including the sticky link; do not install a fake forwarding number.
8. Confirm test enquiry receipt/persistence and retain real evidence. A browser dataLayer event, loader fixture or ingestion request alone does not prove Ads storage or inbox delivery.

## No-JavaScript correction to the handoff

A browser with JavaScript disabled cannot execute a dataLayer push. The existing HTML POST/303 thank-you workflow remains available, but this release deliberately does not fire a conversion on an unauthenticated/direct/reloaded thank-you page. No-JS conversion attribution would require a separately designed server/offline path. A blanket thank-you-page conversion would reintroduce false positives and double counting. The optional GTM noscript iframe is a container fallback, not proof that the requested custom event fires without JavaScript.

## Reproducible checks

Install dependencies with `npm ci`; provision Playwright browsers separately with approval if absent. No real lead or telephone call is sent by the automated fixture suite.

Start a loopback-only static server for `dist` (for example `python3 -m http.server 4329 --bind 127.0.0.1 --directory dist`). Then:

```sh
CONTEXT=production GTM_ENABLED=false npm run build
npm run test:seo
npm run test:analytics
./node_modules/.bin/astro check
```

The browser suite proxies local content under the production hostname and blocks external requests; the contact API and optional GTM loader are explicit fixtures. It verifies actual rendered application handlers, **not provider ingestion**.

Additional environment cases:

```sh
CONTEXT=production GTM_ENABLED=true npm run build
EXPECT_GTM=true npm run test:analytics
CONTEXT=deploy-preview GTM_ENABLED=true npm run build
EXPECT_ANALYTICS=preview EXPECT_GTM=false npm run test:analytics
```

Chromium and Firefox passed all three cases. WebKit could not launch because system libraries were missing; no new system packages were installed and Safari compatibility is not certified. Restore a production-disabled build for the reviewed pre-activation state. Existing Astro/Zod hints and dependency audit advisories are reported separately; they were not silently “fixed” through broad package upgrades.
