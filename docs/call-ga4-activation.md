# Call/GA4 activation and final owner requests — 2026-11-18

## Exact configuration
- Container: GTM-W7R427MZ (existing combined Google tag).
- Form action: AW-16533482745/TanbCMOlpbodEPnZ48s9. Website remains sole dispatcher.
- Calls from website: AW-16533482745/A0LUCMalpbodEPnZ48s9. Owner reports primary/count One. Website callback updates number text and tel links together. Real forwarding allocation/routing requires separate evidence.
- GA4: G-SZRHKMDBTE. Combined tag owns GA4 config and page_view. Website only routes generate_lead and phone_tap with send_to; NO second config or loader. Owner reports Form interactions off, Google signals off, 14-month retention, linked Ads account with personalization off. These account settings were supplied by owner, not independently inspected.
- GOOGLE_ADS_WEBSITE_CALL_LABEL and GA4_MEASUREMENT_ID set/read back in Netlify production builds scope; no preview activation.

## Implemented changes
- All public business telephone links standardized to tel:+13039498584. Generated pages tested for all links, including previously malformed contact-page link. Admin customer phone links are not rewritten to the business number.
- Privacy call section discloses Google forwarding numbers, call time/duration/caller area code. Phone taps remain observational, not connected-call conversions.
- Email optional throughout form, validation, server types, email notifications and optional database types/migration. Missing/blank email => no reply-to or customer confirmation; null in optional DB, never a fake address. Name/phone still required. Production DB is unconfigured: nullable-email migration is supplied but not falsely claimed applied.
- ad_user_data granted only when measurement is allowed; GPC and saved Off suppress it. ad_personalization always denied. Enhanced matching of form contact values still disabled. Real SDK fixture verifies no raw/hashed test contact values in outgoing measurement payloads.
- Ads SDK may send one primary /conversion and one /1p-conversion companion when ad_user_data is granted. They share one transaction ID. Test logical dispatch and primary conversion count, not all matching network URLs as separate leads.

## Acceptance checks
- Build/type/SEO/claim checks; API blank/missing/null email + malformed email, required-name/phone, honeypot, capture/confirmation gates.
- Combined real SDK with intercepted transports: exactly one GA4 page_view on each of homepage, furnace repair, furnace replacement and contact; one generate_lead and one phone_tap. This is browser transport evidence, NOT signed-in DebugView/report inspection.
- Google #google-wcc-debug attempted after production activation. Record actual swap/error result, never treat callback fixture or fabricated gclid as real assignment.
- Mobile screenshot/geometry at 390x844 and 414x896, plus both at 720px high: full-ratio team photograph; main Call and sticky call controls visible at scrollY=0. Desktop emulation is not a physical-device Safari test.
- Requested PageSpeed mobile reports must come from actual PSI; API quota/frontend blockers must be reported instead of substituting made-up scores.

## Access boundaries
Google browser is signed out and available OAuth scopes cover Workspace, not GTM/Search Console/Analytics administration. Adding saul@asksaul.ai to GTM or Search Console and linking Search Console to GA4 requires a signed-in property/account owner. No such grant/link is claimed completed.

Netlify account is the ExotIQ team (gregory-ringler). Owner is team-wide and cannot be project-scoped; Developer can be limited to Lou's project. Account API lists member_monthly_dollar_price=20. Confirm scope and potential seat cost before inviting an additional member; do not silently expose unrelated projects or authorize a new recurring charge.

## Larisa's agreed light tracker
Reference | Date | Source | Booked | HCP job # | Invoice amount

Match by reference where possible; flag ambiguous matches. No HCP API or paid connector is needed. Add qualified/sold/collected detail later only if useful.
