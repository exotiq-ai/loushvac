# Tracking completion — canonical implementation record

This supersedes the November 17 pre-installation handoff. Account settings and production acceptance evidence are separate from source implementation.

## Existing implementation retained

- One consent-controlled `GTM-W7R427MZ` loader on eligible public production pages. Preview/admin/private URLs excluded. Minimal inline footer control; saved opt-outs and GPC override defaults.
- Website is the **single form conversion dispatcher**: `AW-16533482745/TanbCMOlpbodEPnZ48s9` after HTTP success AND `ok:true`. Do not add another GTM conversion tag on `generate_lead` or a thank-you-page conversion.
- `generate_lead` only contains event/form_type/service. `phone_tap` only describes location; it is not a connected call or a primary conversion.
- Required email retained. Enhanced conversions, Google signals and advertising personalization remain off.
- Gregory has already confirmed test email receipt. HCP account has no API; do not request an API key or upgrade.

## This release

- Consent-aware first-party attribution: optional GCLID, GBRAID, WBRAID and five UTM fields. First nonempty value wins within a fixed 90-day window; expiry does not slide on revisits. Later campaign values do not replace the original values within that window. This is a first-known-source operational model, not Google's modeled attribution report.
- Only allowlisted, bounded values are accepted; no full landing URLs, referrers or arbitrary query data is stored. Campaign authors must never put contact data in UTMs. Malformed attribution is discarded without discarding a genuine service enquiry.
- No metadata capture before permission. Saved Off, GPC, excluded hosts/pages and withdrawal suppress/remove local attribution. It is sent only alongside an enquiry while allowed; never copied into the Google event payload.
- Server-generated opaque enquiry reference and UTC received timestamp link the accepted form, business email and optional future database. That reference is also the Google form transaction ID when available.
- Notification email carries reference, timestamp and normalized attribution for staff reconciliation. Customer confirmation does not contain campaign IDs.
- Optional database migration included, **not applied to a nonexistent/unconfigured production database**. Production's configured capture is transactional email; provider acceptance/delivery and human inbox confirmation are distinct. Do not describe Supabase/HCP as live storage.
- Removes the inactive speculative HCP request from the form path. Customer confirmation is sent only after successful business capture.
- Website-call callback adapter and GA4 event routing are dormant unless their real identifiers are supplied in production build settings. These helpers must pass local tests but local callback fixtures do not prove real forwarding allocation or GA4 ingestion.

## Account-dependent activation

### Website calls

Owner: Gregory in Ads account **236-561-3207**.

1. Create/open **Calls from website**, use Google forwarding-number measurement, minimum duration **60 seconds**, count **One**, primary. Provide the actual website-call conversion label (not the form label, not the GTM container snippet).
2. Avi sets `GOOGLE_ADS_WEBSITE_CALL_LABEL` for the Netlify **production build context only**, rebuilds, and verifies the active config. Destination is `AW-16533482745/<call label>`.
3. Website's supported `phone_conversion_callback` updates displayed numbers and `tel:` destinations without replacing button markup/icons. A saved opt-out restores original numbers and ignores stale callbacks. Never install a separate duplicate GTM website-call tag.
4. Test eligible Google forwarding-number assignment using Google's supported diagnostics or a genuine eligible ad journey; inspect header, body, footer, sticky links and text on each page template. `gclid=test123` is **not** proof. A controlled call/routing test requires an available receiver; a website deploy cannot certify routing or Ads call reports.
5. Calls from ads are separate: verify the call asset, Lou's destination, call reporting, 60-second threshold and primary action in Ads.

Official reference inspected: https://support.google.com/google-ads/answer/6095883?hl=en (supports `phone_conversion_callback(formatted_number, mobile_number)`).

### GA4

1. Gregory creates/identifies a GA4 property owned by Lou and sends the web stream's **G- measurement ID**. No property is currently known to this release.
2. Avi sets `GA4_MEASUREMENT_ID` in the production build context and verifies the actual GA4 runtime/DebugView. The website config uses the existing Google runtime, disables Google signals/personalization, and routes safe `generate_lead` and `phone_tap` events specifically to the G- destination. Do not add duplicate GTM GA4 event tags.
3. Mark `generate_lead` as a GA4 key event and link the right Ads account. **Do not import that same form event as another primary Ads conversion**: the native Ads form action already measures it. If imported for comparison, keep it secondary.
4. Disable GA4 Enhanced Measurement's automatic form-interaction events if not needed; never use generic `form_submit` as the accepted-lead goal.

### Enhanced conversions

Not enabled in this release. The current privacy policy explicitly says contact matching is disabled. Activation needs account-side eligibility/customer-data terms, deliberate contact-data processing/disclosure and consent design, normalized customer phone/email (not Lou's business number), and tests proving exactly what is sent. Hashing does not make contact data anonymous. No raw or hashed form contact data should be sent in this setup.

### Ads-only checklist (not changed by Avi)

- Website form lead: correct action/label, count One, primary.
- Website calls and call assets: separate 60-second primary actions.
- Old Smart campaign conversions: secondary where appropriate; old Smart campaign remains paused. No budget/spend changes.
- Auto-tagging/call reporting and intended GBP link: owner to verify.
- Auto-apply recommendations: owner to review/disable as planned.

## HCP reconciliation without API

Use Larisa's existing tracker rather than creating a competing CRM. Add columns if absent: enquiry reference, received_at UTC/local date, source/medium/campaign, click ID (restricted access), contact match, qualified?, HCP job ID, booked date, sold?, invoice ID, invoiced and collected amounts, match confidence/notes. Copy the enquiry reference into an HCP job/customer note when staff create/match it.

Weekly: match reference first, otherwise contact details + date; flag ambiguous/multiple matches instead of auto-crediting an ad. Enquiry ≠ qualified lead ≠ booking ≠ sale ≠ collected revenue. Do not export/upload contact data or offline conversions automatically; retain access controls on the inbox/tracker.

## Test and release evidence

- `node --experimental-strip-types --test scripts/attribution-policy.test.mjs`
- `node scripts/check-attribution-api.mjs` (mock providers only)
- `node scripts/check-attribution-browser.mjs` (local site proxy and mocked HTTP)
- `node scripts/check-website-calls.mjs` (synthetic callback only)
- `node scripts/check-optional-destinations.mjs` (local metadata/Google fixtures only)
- Existing measurement, analytics, real-SDK-intercept, SEO/content/archive checks.
- Final evidence must distinguish local mocks, real SDK with intercepted beacons, actual production HTTP/Google transport, provider delivery, and Ads/GA4 report attribution.

A JavaScript-disabled browser cannot push a dataLayer event. The HTML POST/303 workflow is retained without an unsafe thank-you-page conversion. No unconditional noscript tracking iframe is installed because it would bypass the website's choices on static pages.

## Production result — November 18, 2026

PR #9 was merged and Netlify published the exact application commit `6d434c5a64196e28d42581f741d4838a7bb3c061`. Real Chromium and Firefox journeys passed cross-page attribution, saved opt-out, HTTP GPC and admin exclusions. One authorized test enquiry returned HTTP 200 / `ok:true` with an opaque server reference. Given the unconfigured DB and the success gate, this proves email-provider acceptance, not independent inbox inspection.

The form dispatched one logical conversion with that reference. The first verifier asserted before observing the network response; it now registers a response waiter before clicking rather than relying on a previously satisfied `networkidle` state. No second enquiry was submitted. A measurement-only retry of the accepted test, using the same transaction reference for deduplication, received HTTP 204 from Google's conversion endpoint. Ads-report attribution/deduplication remains account-side verification, not proven by HTTP 204.

Call and GA4 identifiers are still absent, so those destinations remain inactive. No full website-call launch clearance is claimed. No Ads campaigns, budgets or HCP account settings changed. Current email-provider secrets are masked in hosting API reads; delivery logs were not independently accessed. Gregory previously confirmed inbox receipt of the earlier test.
