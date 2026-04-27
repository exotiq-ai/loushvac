# Flags — Lou's Heating & Cooling Website

Running log of decisions, blockers, and items requiring human review.

---

## [FLAG: IMAGES — SERVICE ICONS — AI-GENERATED: NEEDS REVIEW]

The four service icons (fan, water, snowflake, fire) are PNG files from the original Squarespace site. They are usable at their current resolution (1000x1000 px) but are visually inconsistent with a professional redesign. They were retained as fallbacks.

**Decision made:** Keep existing PNGs for initial launch. Replace with a cohesive SVG icon set before final publish.

**Files affected:**
- `public/images/service-icon-fan.png`
- `public/images/service-icon-water.png`
- `public/images/service-icon-snowflake.png`
- `public/images/service-icon-fire.png`

**Human action:** Review these icons in context. If they look out of place, generate or source a matching SVG set in brand colors (#1B4965 navy, #F28C28 orange). Flag any replacements as [AI-GENERATED: NEEDS REVIEW].

---

## [FLAG: PHOTOS — QUALITY REQUIRES HUMAN REVIEW]

The following photos were downloaded successfully and are available, but human review is needed to assess whether they are professional enough for hero/about use:

- `public/images/lou-headshot-1.jpg` — 765x1020 px portrait. Good resolution for About page. Check lighting and professionalism.
- `public/images/lou-headshot-2.jpg` — 1290x722 px landscape. Good for wide-format sections. Check lighting and professionalism.
- `public/images/networx-profile.jpg` — 768x432 px, lower resolution. Likely same photo as one of the above. Compare and use the best.

**Human action:** Open these three photos and decide which to use for the About page and homepage "Meet Lou" section. If none are professional enough, a new headshot is strongly recommended.

---

## [FLAG: PHOTOS — INSTAGRAM LINK PHOTO — REVIEW BEFORE USE]

**File:** `public/images/original/instagram-link-photo.jpg`
**Dimensions:** 2500x3333 px (very large)
**Assessment:** Per CLAUDE.md, this photo from the Squarespace site was linked to Instagram and may be a screenshot from a messages app (which would be unprofessional). It was NOT copied to `public/images/` pending human review.

**Human action:** Open `public/images/original/instagram-link-photo.jpg`. If it is a genuine job site or team photo, crop appropriately, compress to under 200 KB, and save to `public/images/instagram-job-photo.jpg`. If it is a messages app screenshot, discard and see Instagram flag below.

---

## [FLAG: PHOTOS — INSTAGRAM BLOCKED]

Instagram photos from @loushvac are blocked by robots.txt. Cannot scrape programmatically.

**Human action needed:** Manually export or screenshot the best 5–10 Instagram photos from @loushvac showing:
- Lou or Nester at work on a job site
- Completed installations (before/after shots)
- Van/truck branding (if vehicle is branded)
- Team photos

Save to `public/images/` with descriptive names (e.g., `instagram-job-ac-installation.jpg`, `instagram-team-photo.jpg`) and add entries to `docs/image-audit.md`.

---

## [FLAG: HERO BACKGROUND IMAGE — NEEDS STOCK PHOTO]

No Denver-specific hero background image was available from the original site. The current site uses phone message screenshots in its carousel, which are not usable.

**Decision made:** Using a CSS gradient fallback (#1B4965 navy to #5FA8D3 light blue) in all hero sections until a real photo is sourced.

**Human action:** Source a high-quality photo of a Denver residential neighborhood (summer). See `docs/stock-photo-needs.md` for search terms. Save as `public/images/hero-bg-denver-neighborhood.jpg`. Update the Hero component to use this image.

---

## [FLAG: CONTACT FORM — FORMSPREE ENDPOINT NEEDED]

The contact form is built to submit to Formspree. The endpoint URL is a placeholder.

**Human action before publishing:**
1. Create a free account at formspree.io
2. Create a new form pointing to: lousheatingcooling@icloud.com
3. Copy the form endpoint (format: `https://formspree.io/f/XXXXXXXX`)
4. Replace `FORMSPREE_ENDPOINT_HERE` in `src/components/ContactForm.astro`

---

## [FLAG: GOOGLE BUSINESS PROFILE URL — PENDING]

The Google Business Profile URL for Lou's Heating and Cooling is not confirmed.

**Placeholder used:** `https://maps.google.com/?cid=GOOGLE_BUSINESS_PROFILE_CID`

**Human action:**
1. Search Google Maps for: "Lou's Heating and Cooling Lakewood CO 80232"
2. Click the listing
3. Click "Share" → "Copy link"
4. Update `src/content/externalProfiles.ts` with the real URL
5. Also update the footer and contact page

---

## [FLAG: BBB BADGE — EMBED CODE NEEDED]

The site references BBB A+ accreditation in the TrustBar and About page. The official BBB seal/badge embed code has not been retrieved.

**Human action:**
1. Log into the BBB business account for Lou's Heating and Cooling
2. Find the "Use the BBB Seal" or "Accreditation Seal" section
3. Retrieve the official embed code or download the official badge image
4. Save badge image as `public/images/bbb-badge.png` if downloading as image
5. Update TrustBar component to use real badge

---

## [FLAG: AMERICAN STANDARD DEALER BADGE — ASSET NEEDED]

The site references American Standard Authorized Dealer status. The official dealer badge has not been downloaded.

**Human action:**
1. Log into the American Standard dealer portal
2. Download the official "Authorized Dealer" badge/logo
3. Save as `public/images/american-standard-badge.png`
4. Update TrustBar and About page components

---

## [FLAG: LICENSE NUMBER — NOT CONFIRMED]

No Colorado HVAC contractor license number was found in available data sources.

**Human action:** Provide Lou's Colorado contractor license number so it can be added to:
- Footer (small text)
- About page (credentials section)
- Schema markup (LocalBusiness)

---

## [FLAG: INSURANCE — CONFIRM BEFORE PUBLISHING]

The site includes the phrase "Licensed and insured in Colorado" on the About page and in schema markup. This claim must be accurate.

**Human action:** Confirm with Lou that Lou's Heating & Cooling LLC carries general liability insurance. If yes, publish as-is. If no, remove this claim immediately.

---

## [FLAG: EMERGENCY CALL POLICY — OVERTIME CHARGES]

The CLAUDE.md spec suggested considering "No overtime charges for emergency calls" as a selling point. This claim was OMITTED from the site because it could not be verified.

**Human action:** Ask Lou: "Do you charge extra for emergency calls outside business hours?" If the answer is no, add this as a prominent trust signal. If yes, this claim must not appear on the site.

---

## [FLAG: REBATE AMOUNTS — VERIFY BEFORE PUBLISHING]

FAQ answers about Xcel Energy rebates and Colorado tax credits include general statements without specific dollar amounts, because these change frequently.

**Human action:** Before publishing the FAQ page, verify current rebate amounts at:
- Xcel Energy: xcelenergy.com/rebates
- Colorado HEAT program: colorado.gov (search for current HVAC incentives)
- Federal tax credits: irs.gov (Section 25C energy efficiency credits)

Update the relevant FAQ answers with current figures.

---

## [FLAG: PRICING — OMITTED BY DESIGN]

Specific pricing ranges (e.g., "a new furnace costs $X–$Y") were omitted from service pages per best practice for a local trade business (prices vary by equipment, home size, labor conditions). The site instead emphasizes free estimates.

**Human action:** If Lou wants to add ballpark pricing ranges to any service page to reduce friction for price-sensitive visitors, he can add this. Recommended format: "Most [service] projects in the Denver metro run between $X and $Y, depending on your system and home. We'll give you an exact quote — free — before any work begins."

---

## [FLAG: VAN/TRUCK BRANDING — UNKNOWN]

It is unknown whether Lou has a branded vehicle (van or truck with company logo/phone number).

**Human action:** If a branded vehicle exists, photograph it and add the image to `public/images/lous-hvac-truck.jpg`. A branded vehicle photo is a strong trust signal and should be added to the About page and homepage.
