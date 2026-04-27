# CLAUDE.md -- Lou's Heating & Cooling Website Rebuild

## Project Overview

You are rebuilding the website for **Lou's Heating & Cooling**, a family-owned HVAC company in Denver, Colorado. The current site (https://www.loushvac303.com/) is a thin, single-page Squarespace site with generic copy, broken CTAs, and zero local SEO structure. Your job is to scrape all usable assets from the existing site and third-party profiles, audit what needs fixing, and build a completely new website that generates leads, inspires trust, and converts visitors into booked service calls.

**Owner:** Louis Hernandez Jr.
**Phone:** (303) 949-8584
**Email:** lousheatingcooling@icloud.com
**Address:** 1880 S Pierce St #5, Lakewood, CO 80232
**Instagram:** @loushvac
**Business Hours:** 24/7 (emergency services available)
**BBB Accredited:** Yes, A+ rating (since July 2024)
**Authorized Carrier Dealer:** Yes
**Warranty:** 10-year extended warranty on new equipment, 5-year workmanship warranty
**Service Area:** Westminster, Denver, Indian Hills, Golden, Cherry Hills, Idledale, Aurora, Evergreen, Thornton, Louviers, Englewood, Commerce City, Arvada, Littleton, Morrison, Lakewood, Kittredge, Wheat Ridge, Centennial
**Founded:** 2014 (Lou has been in the HVAC business since 2014; the current LLC was incorporated August 26, 2022)
**Team Members:** Louis (Lou) Hernandez Jr. (Owner), Nester (Technician/Partner, mentioned by name in reviews)
**Key Differentiators (from review analysis):** Honesty/no-upsell, speed/responsiveness, clear communication/education, fair pricing, family-owned personal touch
**Payments Accepted:** Credit Card
**Offers:** Free project estimates, free in-home estimates, free consultation, military discount available
**Facebook:** https://www.facebook.com/profile.php?id=61565629501334

### Known Issues to Resolve (Do NOT Carry These Forward)

1. **Founding date RESOLVED:** Owner confirms Lou has been serving Denver since 2014. The LLC was incorporated in 2022. Use "Serving Denver Since 2014" on the site.
2. **Dead CTA:** The current "GET IN TOUCH" button links to `mailto:email@example.com` -- a placeholder that was never updated. Every CTA on the new site must point to a real action (phone call, contact form, or the real email).
3. **Duplicated service copy:** AC Repair and Furnace Repair currently share identical bullet points. Each service page must have unique, specific content.
4. **No trust signals:** No Google Business link, no Yelp link, no BBB badge, no license numbers, no insurance mention. The new site must include all of these.

---

## PRE-SCRAPED DATA (OpenClaw: Use this data directly. Do NOT re-scrape unless checking for updates.)

### Curated Review Database (Best 20+ reviews across all platforms)

Use these reviews throughout the site. Attribute each to the correct platform. These are real reviews from real customers. Use them verbatim on the Reviews page and as pull-quotes on service pages.

**TIER 1: Hero Reviews (Use on homepage and key landing pages)**

1. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"IF I COULD WOULD GIVE AT LEAST 10 STARS. I HAVE A BREEZAIR SYSTEM THAT IS STARTING TO SHOW ITS AGE. I HAD READ REVIEWS FROM OTHERS ABOUT NIGHTMARES WITH THE ELECTRONICS GOING OUT ON THEM. I WAS PREPARED TO FACE AN ENORMOUS BILL BASED ON WHAT I SEEN. LOU AND HIS PARTNER CAME OUT, DID A THOROUGH CLEANING OF THE UNIT AND HAD IT UP AND RUNNING IN NO TIME. I ASKED WHAT THE ISSUE WAS WITH THE UNIT AND WAS INFORMED IT WAS JUST A LOOSE CONNECTION. WHAT A REFRESHING RELIEF TO FIND SOMEONE SO HONEST. STUCK TO THE ORIGINAL QUOTED PRICE. VERY FRIENDLY ALSO. I CAN IMAGINE IF I HAD CALLED ONE OF THE LARGER 'SERVICE PROVIDER' COMPANIES, I WOULD HAVE BEEN INFORMED I NEED A NEW UNIT. WOULD RECOMMEND THIS COMPANY FOR ANY OF YOUR HVAC NEEDS. THANKS AGAIN FOR YOUR HONESTY."
*Why this is a hero review: It directly contrasts Lou with larger companies who upsell. It's the single best proof point for the "honest" differentiator.*

2. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Lou was among the most pleasant and professional tradesman and individual I have ever hired. He did exactly what he said he would do and when he said he would do it, even going above and beyond expectations, which is a high bar. I give Lou my highest recommendation."
*Why: Superlative personal endorsement. Short, quotable, powerful.*

3. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Not only was Lou prompt and meticulous, but he also educated me on how the AC system works and the best way going forward to get the most out of my system. A+"
*Why: Highlights the "educator" angle -- Lou teaches customers, doesn't just fix and leave.*

**TIER 2: Service-Specific Reviews (Use on matching service pages)**

4. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: AC Repair**
"Lou was excellent! He patiently explained what was happening with our AC System and suggested the best path to get our AC up and running. He showed up first thing knowing that we were in for another 95 degree day. Very reasonable rate! I am glad to say we have found the right HVAC contractor for our home!"

5. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: AC Repair**
"Honest, arrived on time and explained my issue with my AC unit in detail and his fees were very reasonable. I will always refer him to others."

6. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: Swamp Cooler**
"Lou did an efficient job of starting up my swamp cooler for the season. The water pump needed replacing and it was done quickly. The price was quite reasonable for the work done."

7. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: Swamp Cooler**
"We needed evaporative cooler repaired. After being ignored by several companies, Angie's List referred us to Lou. Contacted us right away, set up an appointment, was timely and was outstanding at communication both digitally and in-person. Our problem was diagnosed, repaired and for a reasonable price. We will certainly use Lou in the future."
*Why: "After being ignored by several companies" -- powerful contrast.*

8. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: Furnace**
"Lou was great - very patient and explained everything to me several times, got a new furnace installed quickly and was available to ask questions even on a Saturday night. Highly recommend!"

9. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars | Service: Furnace**
"Lou called me as soon as I submitted the request and got our furnace up and running!"

10. **Source: Angi | Reviewer: Anonymous | 5 stars | Service: General Repair**
"Crew was on time, courteous, knowledgeable, and professional. Louis and Nester were fantastic! Quickly diagnosed the issue and had everything running in no time. Would definitely hire them again."

**TIER 3: Trust & Character Reviews (Use in About page and trust sections)**

11. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Very direct, open and honest about cost, time and labor. He was on time and managed to repair our unit that had previously been repaired. We are very impressed with the quality of work, and effort he gave us. I would highly recommend his services."

12. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Explained everything in detail. Great teaching."

13. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Lou was very prompt and very professional and courteous!! Everything done very fast and perfectly."

14. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Had called another pro prior to Lou who was of little help. Can't speak highly enough of Lou and am very thankful he was able to help. Will be calling him in the future!"

15. **Source: HomeAdvisor | Reviewer: Gregorio M. | 5 stars**
"Louis, es muy responsable en su trabajo. Y es una persona muy honesta."
*Note: Include this review in both Spanish and with English translation. Denver has a significant Spanish-speaking population. This is a trust signal.*

16. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"Louis was Great! Would recommend him to all my family and friends!"

17. **Source: HomeAdvisor | Reviewer: Anonymous | 5 stars**
"On time and explained things well. Did the job and got it done. Swamp cooler which wasn't working is now working!"

**TIER 4: Reviews from current website (already on loushvac303.com)**

18. **Source: Website | Reviewer: Lindsey Lombardi**
"We had an emergency with our air conditioner breaking down during a heatwave. Lou's HVAC responded quickly and had it fixed in no time. Great service and friendly technicians."

19. **Source: Website | Reviewer: Trevor Powell**
"Lou's HVAC did a fantastic job replacing our old furnace. The team was professional, efficient, and left everything clean. Our home is now warm and comfortable. Highly recommend!"

20. **Source: Website | Reviewer: Janice Sanchez**
"I had Lou's HVAC install a new energy-efficient AC unit. The consultation process was smooth, and the installation was quick. I've noticed a drop in my energy bills already!"

21. **Source: Website | Reviewer: Emily Nguyen**
"Lou's HVAC provided excellent furnace repair services. The technician was knowledgeable and explained everything clearly. Our furnace is working better than ever. Will definitely use them again."

22. **Source: Website | Reviewer: Michael Sandoval**
"Lou's was both easy to communicate with & highly flexible. I really appreciated Lou's quick work, he had my air conditioning restored within an hour. Really Appreciate His straightforward approach to his work. Thank you Lou!"

### Business Highlights (from Networx profile)

- 24/7 Emergency Service
- Extended Warranty
- Family-owned & Operated
- Flat Rate Pricing
- Free Consultation
- Free In-home Estimate
- Full Warranty
- Guaranteed Repairs
- Locally-owned & Operated
- Military Discount Available
- Parts & Labor Guarantee

### Services Offered (compiled from all sources)

- Air Conditioning Repair
- Air Conditioning Replacement/Installation
- Furnace Repair
- Furnace Replacement/Installation
- Swamp Cooler (Evaporative Cooler) Repair/Replacement
- HVAC System Maintenance/Tune-Ups
- Heating System Repair
- 24/7 Emergency HVAC Service
- AC Deep Cleaning
- Refrigerant Service
- Water Heater Replacement (listed on some profiles)
- Heat Pump Installation (listed on Yelp)
- Furnace Cleaning (listed on Yelp)

### Photo & Media Inventory

**Available from existing site:**
- Logo: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/420227e8-98ac-49fa-9082-a32b26a165f1/looos.png?format=1500w` (PNG, needs renaming from "looos.png")
- Photo of Lou #1: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/bebec65d-3993-4867-881d-af41495ccc9e/2024-07-27.jpg` (appears to be Lou at work or a casual photo)
- Photo of Lou #2: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/b2da144c-a049-4130-a350-82888f6076ba/2024-07-28.jpg` (second photo, likely of Lou or the team)
- Instagram photo #1 (message app screenshot): referenced but low quality for web use
- Instagram photo #2 (message app screenshot): referenced but low quality for web use
- Instagram photo #3 (message app screenshot): referenced but low quality for web use
- Service icon - Fan: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/ed46b445-7c6c-4280-ad83-dba992ec5042/FAN+.png`
- Service icon - Water: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/e18a3751-9732-4774-9780-9222212c3ed8/WATER.png`
- Service icon - Snowflake: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/4f8579a9-7816-451d-b81f-27276d2f75fe/SNOWFLAKE.png`
- Service icon - Fire: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/ad0c9a8c-5e60-408b-82a5-6aa3b0c60210/FIRE.png`
- Instagram link photo: `https://images.squarespace-cdn.com/content/v1/66942b4f6168e67817089513/6cea1c3e-31f3-4de8-8c5e-7e911eaeff5d/IMG_5852.jpeg` (appears to be a photo of Lou or job site -- linked to Instagram)

**Available from Networx:**
- Profile photo: `https://cdn.networx.com/media/clp_666255130f714.jpeg` (larger, potentially better quality)
- Thumbnail: `https://cdn.networx.com/media/max/140x140/clp_666254f7e5edd.jpeg`

**Available from Yelp:** 10 photos on the Yelp listing (cannot scrape directly due to robots.txt, but they exist)

**Available from Instagram (@loushvac):** Content exists but blocked by robots.txt. HUMAN ACTION NEEDED: Manually export or screenshot the best Instagram photos showing Lou at work, completed installations, before/after shots, team photos, van/truck branding, etc.

**[FLAG: PHOTOS ARE THE WEAKEST ASSET]**
The current site uses message-app screenshots in the hero carousel. This is unprofessional. The Networx profile has slightly better imagery. But for a truly professional site, we need:

1. **Professional headshot or candid of Lou** -- the existing site photos (2024-07-27.jpg and 2024-07-28.jpg) may work. Download and evaluate quality.
2. **Job site photos** -- completed installations, Lou and Nester working on a unit, before/after shots. Check Instagram for these.
3. **Van/truck branding** -- if Lou has a branded vehicle, this is a strong trust signal.
4. **Stock photography needed for:**
   - Hero background (Denver skyline or residential neighborhood, NOT a generic stock HVAC photo)
   - Service page headers (realistic HVAC work, not staged stock photos)
   - Seasonal imagery (snow-covered Denver homes for furnace pages, summer Denver for AC pages)

**[FLAG: AI-GENERATED IMAGE OPPORTUNITIES]**
Consider generating with Cling, Midjourney, or similar:
- Custom service icons (replace the current basic PNG icons with a cohesive icon set)
- Stylized Denver skyline illustration for the service area page
- Seasonal banner graphics (winter/summer)
- Trust badge/seal graphics ("Serving Denver Since 2014", "BBB A+ Rated", etc.)
**IMPORTANT: Flag every AI-generated image in `/docs/flags.md` so Gregory can review quality before publishing.**

### Denver-Specific HVAC Technical Facts (for FAQ content)

Use these facts to write expert-level FAQ answers that demonstrate Lou's deep knowledge of Colorado HVAC:

**Altitude Impact on HVAC:**
- Denver sits at 5,280 feet. Air density decreases approximately 3% per 1,000 feet of elevation.
- At Denver's altitude, air is roughly 15-16% less dense than at sea level.
- Gas furnaces lose approximately 4% of input BTU capacity per 1,000 feet above sea level. A 100,000 BTU furnace in Denver effectively delivers around 80,000 BTU input.
- After altitude derating AND efficiency (e.g., 96% AFUE), a 100,000 BTU furnace may only output ~76,800 BTU of usable heat.
- AC units also lose capacity at altitude because fans move less air mass and heat transfer is reduced.
- Standard "500 sq ft per ton" AC sizing rules from sea-level calculators do not work in Colorado. Systems typically need to be upsized 10-15%.
- Ductwork often needs to be sized 15% larger than sea-level calculations to compensate for reduced air density.
- Colorado homes typically need 25-40 BTU per square foot for heating (vs. 20-25 in mild-climate states).
- Denver's winter design temperature is approximately 1 to 5 degrees F.

**Denver Climate Specifics:**
- Denver experiences 40+ degree temperature swings in a single day (hot days, cold nights on the Front Range).
- Denver's dry climate (20-30% humidity) means AC units don't work as hard to control humidity as in Gulf Coast states.
- Low humidity makes evaporative (swamp) coolers viable -- a Denver-specific advantage. Many Denver homes use swamp coolers instead of or alongside AC.
- The "swamp cooler vs. AC" question is uniquely Denver/Colorado. When dewpoint is below ~55F, swamp coolers are effective and much cheaper to run. When humidity rises (monsoon season, typically July-August), they become less effective.
- Whole-home humidifiers are commonly recommended in Denver because winter air is extremely dry (can drop below 10% RH indoors).
- Filter changes should be 25-50% more frequent at altitude due to mountain dust, wildfire smoke seasons, and particulate.

**Refrigerant Transition Facts:**
- R-22 (Freon) was phased out of production January 1, 2020. Systems still using R-22 will become increasingly expensive to service.
- R-410A has been the standard replacement but is being phased down under the AIM Act.
- R-454B (marketed as "Puron Advance" by Carrier) is the next-generation refrigerant, with a significantly lower global warming potential.
- New equipment manufactured after January 1, 2025 in the US must use lower-GWP refrigerants.

**Xcel Energy / Colorado Rebates (verify current amounts before publishing):**
- Xcel Energy offers rebates for high-efficiency HVAC equipment.
- Colorado HEAR (High Efficiency Arkansas River) program may offer additional incentives.
- State tax credits may be available for qualifying heat pump installations.
- Xcel's Quality Installation (QI) requirements mandate Manual J load calculations for heat pump rebates.

### External Profile URLs (Verified)

```
Yelp: https://www.yelp.com/biz/lou-s-heating-and-cooling-denver
BBB: https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743
HomeAdvisor: https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html
Angi: https://www.angi.com/companylist/us/co/denver/lous-heating-and-cooling-llc-reviews-1.htm
Facebook: https://www.facebook.com/profile.php?id=61565629501334
Instagram: https://www.instagram.com/loushvac/
Google Business Profile: [NEEDS TO BE FOUND -- search Google Maps for "Lou's Heating and Cooling Lakewood CO 80232" and get the direct GBP link]
```

Build this site with **Astro** (static site generator). Rationale:

- HVAC sites need to load fast on mobile (homeowners searching during emergencies). Astro ships zero JS by default.
- Static HTML is ideal for local SEO. Google crawls it cleanly.
- No backend needed. Forms can use Formspree, Netlify Forms, or similar.
- Easy to deploy on Netlify, Vercel, or Cloudflare Pages.
- Future-proof: Astro supports React/Svelte islands if interactive components are needed later.

If Astro is not available in your environment, fall back to **Next.js with static export** (`output: 'export'`). If neither is available, build with **plain HTML/CSS/JS** using a clean component structure.

---

## Execution Stages

Work through these stages sequentially. Complete each stage fully before moving to the next. If you encounter a blocker at any stage, document it clearly and proceed to the next stage where possible, returning to resolve the blocker later.

---

### STAGE 1: Asset Collection & Setup

**Goal:** Download all images from the pre-scraped URL list above into a local `/assets` directory, set up the project structure, and verify all data.

#### 1.1 Download images from existing site

Download all images listed in the "Photo & Media Inventory" section above. Save to `/assets/images/original/`. Rename files descriptively (e.g., `lous-hvac-logo.png`, `lou-headshot-1.jpg`, `service-icon-fan.png`).

#### 1.2 Evaluate image quality

For each downloaded image, assess:
- Resolution (minimum 800px wide for hero use, 400px for thumbnails)
- Quality (is it a screenshot? blurry? poorly lit?)
- Suitability for web use

Create `/docs/image-audit.md` documenting each image and its recommended use. Flag any that are too low quality with `[NEEDS REPLACEMENT]`.

#### 1.3 Prepare stock photography list

Based on the image audit, create `/docs/stock-photo-needs.md` listing:
- What's needed (e.g., "Hero background: Denver residential neighborhood in summer")
- Suggested search terms for open-license stock sites (Unsplash, Pexels)
- Which images should be AI-generated (icons, badges, stylized graphics)
- Mark every AI-generated asset recommendation with `[AI-GENERATED: NEEDS REVIEW]`

#### 1.4 Set up project structure

Initialize the project with the chosen tech stack and create the full directory structure as specified in Stage 8.

#### 1.5 Verify external profile links

Visit each URL in the "External Profile URLs" section and confirm they're live. Find the Google Business Profile URL (search Google Maps for "Lou's Heating and Cooling Lakewood CO 80232"). Save all verified URLs to `/content/external-profiles.md`.

---

### STAGE 2: Site Audit & Improvement Plan

**Goal:** Produce a written audit document that flags every problem with the current site and specifies what the new site must do differently.

Create `/docs/site-audit.md` with the following sections:

#### 2.1 Current Site Problems (flag all of these)

**Lead Generation Failures:**
- No contact form anywhere on the site
- "GET IN TOUCH" CTA links to a fake placeholder email
- Phone number is buried inside service card buttons, not in the header
- No click-to-call behavior optimized for mobile
- No emergency service callout above the fold
- No scheduling or booking integration
- No free estimate CTA

**Trust Signal Gaps:**
- No Google/Yelp review scores displayed
- No BBB badge or accreditation mention
- No license number displayed
- No insurance/bonding mention
- No American Standard dealer badge
- No warranty details prominently shown
- No "years in business" or job count stats
- No photos of Lou or the team at work (current photos are just message app screenshots)

**SEO Deficiencies:**
- Single page site with no defined URL structure
- No service-specific pages (cannot rank for "furnace repair Denver" etc.)
- No schema markup (LocalBusiness, Service, Review)
- No meta descriptions
- No alt text on images
- No sitemap
- No Google Search Console integration guidance
- No blog or content strategy

**Content Weaknesses:**
- Service descriptions are duplicated across AC and furnace sections
- Copy is generic HVAC boilerplate that could belong to any company
- No FAQ section
- No mention of the specific Denver metro service area
- No seasonal content (Denver has extreme seasons -- this is a missed opportunity)
- About section is bland and doesn't leverage Lou's actual differentiator (honesty, no-upsell, clear explanations)

**Design Issues:**
- Mobile experience is poor (Squarespace default responsive, not mobile-first)
- No clear visual hierarchy
- No urgency indicators (emergency availability, same-day service)
- Image carousel is just screenshots from a phone messages app

#### 2.2 Competitive Advantages to Highlight

Based on review analysis, Lou's real differentiators are:

1. **Honesty:** Multiple reviews specifically call out that Lou diagnoses honestly and does not upsell. One reviewer explicitly contrasted this with larger companies who would have pushed a full replacement.
2. **Speed and responsiveness:** Reviews mention same-day service, showing up first thing, being the first to respond when other companies ignored the customer.
3. **Clear communication:** Customers love that Lou explains what's wrong, teaches them about their system, and is transparent about costs.
4. **Fair pricing:** Repeatedly described as "reasonable," "fair," and "stuck to the original quoted price."
5. **Family-owned personal touch:** Not a faceless corporation. Lou shows up himself.
6. **American Standard dealer** with strong warranty program.
7. **BBB A+ accredited.**
8. **24/7 emergency service.**

The new site must lead with these differentiators, not generic "quality service" language.

---

### STAGE 3: Information Architecture & Sitemap

**Goal:** Define the full page structure for the new site.

Create the following pages:

```
/                           -- Home (hero + service overview + trust signals + reviews + CTA)
/services/                  -- Services overview page
/services/ac-repair/        -- AC Repair (dedicated page)
/services/ac-replacement/   -- AC Replacement / Installation
/services/furnace-repair/   -- Furnace Repair
/services/furnace-replacement/ -- Furnace Replacement / Installation
/services/maintenance/      -- Seasonal Maintenance & Tune-Ups
/services/swamp-cooler/     -- Evaporative Cooler Service (Denver-specific, shows up in reviews)
/services/emergency/        -- 24/7 Emergency HVAC Service
/about/                     -- About Lou's (story, team, values, certifications)
/reviews/                   -- Reviews & Testimonials (curated from all platforms)
/faq/                       -- Comprehensive FAQ (see Stage 5)
/service-area/              -- Denver Metro Service Area (with city/neighborhood list)
/contact/                   -- Contact page (form, phone, map, hours)
```

Each service page must include:
- H1 with service name + "Denver" or "Denver Metro"
- Unique descriptive content (NOT duplicated across pages)
- Common symptoms / "when to call" section
- What to expect (process description)
- Pricing transparency note (e.g., "free estimates," "flat rate pricing," "no hidden fees")
- Relevant customer review pulled from the curated list
- Clear CTA (phone + form)
- LocalBusiness + Service schema markup

---

### STAGE 4: Design System & Brand Refresh

**Goal:** Create a modern, trust-building design system that feels premium but approachable.

#### 4.1 Design principles

- **Mobile-first:** 70%+ of emergency HVAC searches happen on phones
- **Speed:** No unnecessary animations, lazy-load images, minimal JS
- **Trust-forward:** Reviews, credentials, and guarantees should be visible without scrolling
- **Urgency-aware:** Emergency CTA (phone number) should be sticky/fixed on mobile
- **Clean, not flashy:** Avoid the "techy startup" look. This is a local trade business. Customers want to feel safe, not impressed.

#### 4.2 Color palette

Derive from the existing logo but modernize. The current logo uses a blue/teal tone. Suggested palette:

```css
:root {
  --color-primary: #1B4965;      /* Deep navy -- trust, professionalism */
  --color-primary-light: #5FA8D3; /* Lighter blue -- accents, links */
  --color-accent: #F28C28;        /* Warm orange -- CTAs, urgency, warmth */
  --color-bg: #FAFAFA;            /* Off-white -- clean background */
  --color-bg-alt: #F0F4F8;        /* Light blue-gray -- section alternation */
  --color-text: #1A1A2E;          /* Near-black -- body text */
  --color-text-muted: #6B7280;    /* Gray -- secondary text */
  --color-success: #10B981;       /* Green -- trust badges, checkmarks */
  --color-white: #FFFFFF;
}
```

Adjust these based on what you extract from the actual logo colors in Stage 1.

#### 4.3 Typography

```css
/* Headings: Strong, modern sans-serif */
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

/* Body: Readable, clean */
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

/* Use weight variation for hierarchy, not multiple font families */
/* H1: 700, H2: 600, H3: 600, Body: 400, Small: 400 */
```

#### 4.4 Component library

Build reusable components for:

- `Header` -- Logo, nav, phone number (click-to-call), "Schedule Service" button
- `MobileHeader` -- Sticky header with phone icon + hamburger menu
- `Hero` -- Full-width hero with headline, subheadline, dual CTA (Call Now + Schedule Online)
- `ServiceCard` -- Icon, title, brief description, link to detail page
- `ReviewCard` -- Star rating, quote, reviewer name, platform badge (Google/Yelp/HomeAdvisor)
- `TrustBar` -- Horizontal strip of trust badges (BBB A+, American Standard, warranty icons, years in business)
- `CTABanner` -- Full-width call-to-action section with phone + form link
- `FAQAccordion` -- Expandable Q&A items with schema markup
- `ServiceAreaMap` -- List of served cities/neighborhoods (optionally with an embedded Google Map)
- `ContactForm` -- Name, phone, email, service type dropdown, message, preferred time
- `EmergencyCTA` -- Sticky mobile bar: "HVAC Emergency? Call Now" with phone link
- `Footer` -- Contact info, nav links, social links, external profile links, license info

---

### STAGE 5: FAQ Content Generation

**Goal:** Build a comprehensive, genuinely useful FAQ that demonstrates deep HVAC expertise and serves as an SEO content engine.

Create `/content/faq.md` with questions organized into tiers:

#### Tier 1: Entry-Level / Homeowner Basics (15-20 questions)

These answer the questions a homeowner who knows nothing about HVAC would ask. Write answers in plain, jargon-free language. Examples:

- How often should I change my air filter?
- What temperature should I set my thermostat to in winter/summer?
- Why is my furnace blowing cold air?
- Why is my AC running but not cooling?
- What does it mean when my thermostat says "auxiliary heat"?
- How long does a furnace typically last?
- How long does an AC unit typically last?
- What's the difference between a furnace and a heat pump?
- Should I close vents in rooms I don't use?
- Why does my AC freeze up?
- What's a SEER rating and why does it matter?
- How do I know if my ductwork is leaking?
- Is it normal for my furnace to smell when I first turn it on in fall?
- What's the difference between a swamp cooler and an AC unit?
- When should I switch from my swamp cooler to AC in Denver?
- What size AC/furnace do I need for my home?
- Do I really need annual HVAC maintenance?
- What's included in an HVAC tune-up?
- Why is my energy bill suddenly so high?
- What's that banging/clicking/whistling noise from my HVAC?

#### Tier 2: Intermediate / Decision-Making (10-15 questions)

These help homeowners who are comparing options or about to make a purchase decision:

- Should I repair or replace my AC unit?
- Should I repair or replace my furnace?
- What brands do you recommend and why? (American Standard dealer angle)
- What's the difference between a single-stage and two-stage furnace?
- What's a variable-speed blower and is it worth the cost?
- What SEER rating should I look for in a new AC?
- How much does a new furnace cost in Denver? (give ranges, not exact)
- How much does a new AC unit cost in Denver? (give ranges, not exact)
- What rebates or tax credits are available for new HVAC equipment?
- How long does an AC/furnace installation take?
- Do you offer financing?
- What does your warranty cover?
- What's the difference between your warranty and the manufacturer warranty?
- Should I get a heat pump instead of a traditional furnace?
- What's a mini-split and is it right for my home?

#### Tier 3: Advanced / Expert-Level (10-15 questions)

These demonstrate that Lou genuinely knows his trade at a level the big corporate outfits can't match. These are the questions that make a savvy homeowner think "this guy really knows his stuff":

- How does Denver's altitude affect HVAC performance and sizing?
- Why do HVAC systems in Colorado need different BTU calculations than sea-level states?
- What's the impact of Denver's dry climate on evaporative coolers vs. refrigerated AC?
- How does the Front Range's temperature swing (hot days, cold nights) affect system cycling?
- When does it make sense to run a swamp cooler vs. AC in Denver's semi-arid climate?
- What are the pros and cons of high-efficiency condensing furnaces in Colorado's climate?
- How do I know if my home's ductwork was designed for the current HVAC load?
- What's the relationship between home insulation, air sealing, and HVAC sizing?
- Why do some Denver homes have uneven heating/cooling between floors?
- What should I know about refrigerant changes (R-22 to R-410A to R-454B)?
- How does a zoning system work and when is it worth the investment?
- What are the signs of a cracked heat exchanger and why is it dangerous?
- How do smart thermostats interact with two-stage or variable-speed systems?
- What's the real ROI on a high-SEER system vs. a standard-efficiency system in Colorado?
- Why is manual J load calculation important and how do you do it?

#### FAQ Writing Guidelines

- Every answer must be written in Lou's voice: knowledgeable, direct, no BS, explains things clearly like he's talking to you in your living room
- Answers should be 100-300 words. Long enough to be genuinely helpful, short enough to scan
- Include Denver/Colorado-specific details wherever relevant (altitude, climate, seasonal patterns)
- Do NOT use generic HVAC content farm language. Every answer should feel like it came from someone who's actually worked on systems in Denver homes
- End 2-3 answers per tier with a soft CTA: "If you're seeing this, give us a call at (303) 949-8584 and we'll take a look"
- Each Q&A pair must be wrapped in FAQ schema markup on the page

---

### STAGE 6: Page Content & Copywriting

**Goal:** Write all page content. Every word should serve one of three purposes: build trust, answer a question, or drive a lead action.

#### GLOBAL COPYWRITING RULES (apply to every page)

**Voice:** Lou's voice. Direct, knowledgeable, warm but not salesy. Think: a neighbor who happens to be an HVAC expert, giving you straight advice over the fence. Not corporate. Not marketing-speak. Not boilerplate.

**Banned phrases (never use these anywhere on the site):**
- "top-notch" / "top-quality" / "world-class" / "best-in-class"
- "committed to excellence" / "dedicated to providing"
- "your satisfaction is our priority"
- "state-of-the-art" / "cutting-edge"
- "look no further" / "search no more"
- "one-stop shop"
- "we go above and beyond"
- Any phrase that could appear on literally any HVAC website in America

**Required patterns (use these instead):**
- Be specific: Instead of "quality parts," say "we use American Standard equipment with a 10-year warranty"
- Use customer language: Instead of "HVAC system malfunction," say "when your furnace stops working in the middle of the night"
- Address fear directly: Homeowners calling HVAC companies are worried about being ripped off. Acknowledge this. "You've probably heard horror stories about HVAC companies charging thousands for repairs you didn't need. That's not how we work."
- Include Denver details: Reference altitude, dry climate, seasonal swings, specific neighborhoods. This is local SEO AND it builds trust.
- End with action: Every major content section should conclude with a path to contact (phone number or form link)

**Conversion hierarchy on every page:**
1. Phone number visible (header, sticky mobile bar)
2. Primary CTA above the fold
3. Trust signal within first viewport
4. Social proof (review) within first two scrolls
5. Secondary CTA at bottom of content
6. Emergency CTA always accessible

#### 6.1 Homepage (Conversion-Optimized)

**CRITICAL: The homepage has ONE job -- get the visitor to call or fill out the form. Every element should reduce friction and increase trust.**

**Above the fold must include (all visible without scrolling on mobile):**
- **Headline:** "Denver's Most Honest HVAC Company" or "The HVAC Company Denver Trusts" -- test variations, but lead with the honesty angle. This is Lou's #1 differentiator based on review analysis. Do NOT use generic headlines like "Denver's Climate Comfort" or "Quality HVAC Solutions."
- **Subheadline:** "Family-owned. Flat rate pricing. No upselling. Serving the Denver metro since 2014."
- **Phone number:** LARGE. Minimum 24px on mobile. Click-to-call. Format: (303) 949-8584
- **Two CTAs side by side:** "Call Now -- (303) 949-8584" (primary, orange/accent color, filled button) + "Schedule a Free Estimate" (secondary, outlined button, links to contact form)
- **Trust bar immediately below CTAs:** BBB A+ | American Standard Dealer | 5.0 Stars | 24/7 Emergency | Serving Denver Since 2014
- **Background:** Denver-relevant imagery. NOT a generic stock photo of an HVAC unit. A Denver residential neighborhood, a warm well-lit home, or a subtle Denver skyline. If using stock, use Unsplash/Pexels. If generating, flag as AI.

**Conversion copy principles for ALL homepage sections:**
- Never say "quality service" or "top-notch" or "committed to excellence" -- these are empty words every HVAC site uses
- Instead, be specific: "We'll tell you what's actually wrong, give you a flat-rate price, and fix it. No surprises."
- Use the second person ("you/your") not third person
- Every section ends with a path to action (call or form)
- Social proof should be woven throughout, not gated in a single testimonials section

**Section: "Why Denver Homeowners Choose Lou's" (immediately after hero)**

Build this around the 4 differentiators proven by reviews. Each gets a short block:

1. **"We'll never sell you something you don't need"**
   Pull-quote from the Breezair "10 stars" review about honesty. 2-3 sentences about how Lou diagnoses honestly. Contrast with "big box HVAC companies."

2. **"We show up fast -- and we explain everything"**
   Pull-quote from the "showed up first thing knowing it was 95 degrees" review. 2-3 sentences about responsiveness and Lou's habit of educating customers.

3. **"Flat rate pricing. No hidden fees. Ever."**
   Pull-quote from "stuck to the original quoted price" review. Reference the free estimate, the flat rate model, and the military discount.

4. **"Family-owned, not a faceless corporation"**
   Pull-quote from "most pleasant and professional tradesman I've ever hired" review. 2-3 sentences about Lou and Nester, personal service, relationships.

**Section: Service Cards (6 cards linking to detail pages)**
- AC Repair | AC Installation | Furnace Repair | Furnace Installation | Swamp Cooler Service | Emergency HVAC
- Each card: icon + service name + one-sentence description + "Learn More" link
- Below the cards, add: "Not sure what you need? Call us at (303) 949-8584 and we'll help you figure it out."

**Section: Review Carousel**
- Display 5-8 of the Tier 1 and Tier 2 reviews with platform badges (Google, HomeAdvisor, Yelp icons)
- Below carousel: "Read all reviews" link + direct links to Google, Yelp, HomeAdvisor profiles
- Include aggregate: "5.0 stars across [X]+ reviews"

**Section: About Preview**
- Photo of Lou (download from existing site, evaluate quality)
- "Meet Lou" headline
- 3 sentences max: Denver native. Started in HVAC in 2014. Believes every homeowner deserves an honest diagnosis and a fair price.
- "Read Our Story" link to /about/

**Section: Service Area**
- "Serving the Entire Denver Metro" headline
- Quick list of major cities served
- "See Full Service Area" link

**Section: Emergency CTA Banner (full width, high contrast)**
- "HVAC Emergency? We're Here 24/7."
- Large phone number
- "No overtime charges for emergency calls" (verify this claim with Lou before publishing; if not accurate, remove)

**Section: Contact Form**
- Embed the same form from /contact/ page
- Headline: "Schedule Your Free Estimate"
- Fields: Name, Phone (required), Email, Service Needed (dropdown), Message, Preferred Date/Time
- Submit button: "Get My Free Estimate"

#### 6.2 Service Pages (each one)

- H1: "[Service Name] in Denver, CO"
- Opening paragraph: What this service is, when you need it, why it matters
- "Signs You Need [Service]" section: 4-6 bullet points of symptoms
- "What to Expect" section: Step-by-step of Lou's process
- "Our Commitment" callout: Flat rate pricing, no hidden fees, warranty details
- Relevant review (1-2 from curated list)
- CTA section
- Related services links

#### 6.3 About Page (Conversion-Optimized)

**This page does one thing: convince the skeptical homeowner that Lou is the real deal.**

- **Hero section:** Photo of Lou + "Meet Lou Hernandez" headline
- **Lou's story:** Write this in first person or close third person. Denver native. Has been working on HVAC systems since 2014. Started the company because he saw too many homeowners getting upsold by big companies. Believes every customer deserves an honest diagnosis and a price that's fair. Mention the LLC was formally incorporated in 2022 as a natural growth step.
- **Nester mention:** Lou doesn't work alone. Mention Nester (referenced in reviews as his partner/technician). This shows it's a real team, not a one-man show pretending to be bigger than it is.
- **Values section (NOT a bulleted list of generic values):** Write this as a narrative paragraph. The core values should come through in the writing, not be listed out. Themes: honesty above all (cite the Breezair review concept without quoting it), education (Lou teaches customers what's wrong, not just fixes and leaves), fair pricing (flat rate, no hidden fees), speed (24/7, same-day when possible).
- **"What Makes Us Different" section:** Position this as a direct comparison without naming competitors. Something like: "At a lot of HVAC companies, the technician's job is to find a reason to sell you new equipment. At Lou's, our job is to find the simplest, most honest solution to your problem. If a $150 repair keeps your system running for five more years, that's what we'll recommend. Period."
- **Certifications & Trust Signals:**
  - American Standard Authorized Dealer (with badge/logo)
  - BBB A+ Accredited (with badge)
  - Licensed and insured in Colorado
  - 10-year extended warranty on new equipment
  - 5-year workmanship warranty
  - Free in-home estimates
  - Military discount available
- **Bilingual note:** Lou's team serves Denver's Spanish-speaking community. Include the Gregorio M. review in Spanish with translation. Consider adding a small note: "Hablamos Espanol" or "Se habla Espanol" -- this is a conversion lever in the Denver market.

#### 6.4 Reviews Page

- Aggregate rating display (e.g., "5.0 stars across 50+ reviews on Google, Yelp, and HomeAdvisor")
- Curated reviews organized by service type
- Links to each external review platform
- CTA to leave a review

#### 6.5 Service Area Page

- List of all served cities/neighborhoods
- Brief paragraph for each major area (Denver, Lakewood, Arvada, Littleton, etc.) for local SEO
- Embedded Google Map (optional)

#### 6.6 Contact Page

- Phone number (large, click-to-call)
- Email
- Contact form (Name, Phone, Email, Service Needed dropdown, Message, Preferred Date/Time)
- Business hours
- Address with Google Maps embed
- "Emergency? Call us now" callout
- Links to all external profiles (Google, Yelp, BBB, Facebook, Instagram)

---

### STAGE 7: SEO & Schema Implementation

**Goal:** Make every page optimized for local HVAC search in Denver.

#### 7.1 On-page SEO

For each page, define:
- `<title>` tag (format: "[Service] Denver CO | Lou's Heating & Cooling")
- `<meta name="description">` (unique, 150-160 chars, include phone number for emergency pages)
- `<h1>` (one per page, keyword-rich)
- Image alt text (descriptive, not keyword-stuffed)
- Internal links between related service pages

#### 7.2 Schema markup

Implement the following JSON-LD schemas:

- **LocalBusiness** (on every page, in the site header):
  - name, address, phone, email, url, geo coordinates
  - openingHoursSpecification (24/7)
  - areaServed (list all cities)
  - priceRange: "$$"
  - aggregateRating (from review platforms)
  - sameAs: [all external profile URLs]

- **Service** (on each service page):
  - name, description, provider (reference LocalBusiness), areaServed

- **FAQPage** (on the FAQ page):
  - Each Q&A as a Question/Answer pair

- **Review** (on the reviews page):
  - Individual reviews with author, rating, body

#### 7.3 Technical SEO

- Generate `sitemap.xml`
- Generate `robots.txt`
- Ensure all pages have canonical URLs
- Add Open Graph and Twitter Card meta tags
- Ensure all images have alt text and are compressed
- Implement lazy loading for below-fold images

---

### STAGE 8: Build & Assembly

**Goal:** Assemble the actual site from all the work done in Stages 1-7.

#### 8.1 Project structure

```
lous-hvac-site/
  src/
    layouts/
      BaseLayout.astro       (or .html / .jsx depending on stack)
    components/
      Header
      Footer
      Hero
      ServiceCard
      ReviewCard
      TrustBar
      CTABanner
      FAQAccordion
      ContactForm
      EmergencyCTA
      ServiceAreaMap
    pages/
      index
      about
      reviews
      faq
      service-area
      contact
      services/
        index
        ac-repair
        ac-replacement
        furnace-repair
        furnace-replacement
        maintenance
        swamp-cooler
        emergency
    content/
      (all markdown content files)
    styles/
      global.css
      variables.css
  public/
    images/
    favicon
    sitemap.xml
    robots.txt
```

#### 8.2 Build priorities

1. Build the design system (CSS variables, typography, component shells) first
2. Build the homepage (this is the most important page for conversions)
3. Build the contact page and form
4. Build service pages (start with AC Repair as the template, then replicate)
5. Build the FAQ page
6. Build the About page
7. Build the Reviews page
8. Build the Service Area page
9. Add schema markup to all pages
10. Generate sitemap and robots.txt
11. Run a final quality check

#### 8.3 Quality checklist before delivery

- [ ] Every CTA links to a real action (phone, form, or real email: lousheatingcooling@icloud.com)
- [ ] Phone number (303) 949-8584 is clickable on mobile (tel: link) and visible in header on every page
- [ ] No placeholder text anywhere ("Lorem ipsum", "email@example.com", etc.)
- [ ] "Serving Denver Since 2014" is used consistently
- [ ] All images have alt text
- [ ] All pages have unique title tags and meta descriptions
- [ ] Schema markup validates (test with Google Rich Results Test)
- [ ] Site loads in under 3 seconds on mobile (no bloated JS)
- [ ] Contact form submits to a real endpoint (or has clear setup instructions)
- [ ] External profile links (Google, Yelp, BBB) all open in new tabs
- [ ] Emergency CTA is visible and functional on mobile (sticky bar)
- [ ] FAQ accordion works without JavaScript (progressive enhancement)
- [ ] No duplicated copy across service pages
- [ ] Every review displayed on the site is a real review from the curated database (no fabricated testimonials)
- [ ] AI-generated images are flagged in /docs/flags.md with `[AI-GENERATED: NEEDS REVIEW]`
- [ ] Stock photos are flagged with source attribution in /docs/flags.md
- [ ] Spanish-language review is displayed correctly with proper characters
- [ ] "Se habla Espanol" or equivalent is present somewhere visible
- [ ] All service pages have unique H1 tags including "Denver" or "Denver Metro"
- [ ] The site has no references to "email@example.com" anywhere

---

### STAGE 9: Handoff Documentation

**Goal:** Produce a handoff document so the site owner (or a developer) can deploy and maintain the site.

Create `/docs/handoff.md` with:

1. **Deployment instructions** (Netlify/Vercel/Cloudflare Pages)
2. **Form setup instructions** (whichever form provider was chosen)
3. **How to update content** (where each content file lives, how to edit)
4. **Google Search Console setup** (submit sitemap, verify ownership)
5. **Google Business Profile optimization tips** (add all service categories, respond to reviews, post updates)
6. **Recommended next steps:**
   - Set up Google Analytics / GA4
   - Connect Google Business Profile to the site
   - Start a blog (seasonal HVAC tips, Denver-specific content)
   - Add online scheduling (Calendly, Housecall Pro, or similar)
   - Get more Google reviews (provide a direct review link to customers)
   - Consider Google Local Service Ads
7. **Known items requiring human decision:**
   - Founding date (2014 vs. 2022 -- which is accurate?)
   - Whether to include specific pricing ranges on service pages
   - Contact form destination (what email should form submissions go to?)
   - Whether Lou wants to include a photo of himself / the team

---

## Behavioral Instructions for OpenClaw

### Autonomy Level

- **Work autonomously through Stages 1-8** without pausing for human approval at each stage
- **Pause for human input** only when you encounter a decision that could lead you significantly down the wrong path (e.g., the founding date discrepancy, a missing critical asset)
- **Document every flag** in a running `/docs/flags.md` file. Each flag should include: what the issue is, what decision you made (or why you're pausing), and what the human should verify

### Quality Standards

- No generic HVAC boilerplate. Every piece of copy should feel like it was written specifically for Lou's business in Denver.
- No placeholder content. If you cannot find a real piece of data, flag it and use a clear `[NEEDS: description]` marker rather than inventing something.
- No stock photo references. Only use images scraped from the existing site or instruct the owner to add specific photos.
- Test every link, every CTA, every form action before declaring a stage complete.

### When You Get Stuck

If a scraping target blocks you (robots.txt, CAPTCHA, etc.):
1. Note what you could not access in `/docs/flags.md`
2. Use whatever data you were able to get from web search snippets
3. Move on. Do not spend more than 2 attempts on any single blocked resource.

If you are unsure about a design or content decision:
1. Make the decision that best serves lead generation and trust-building
2. Document your reasoning in `/docs/flags.md`
3. Move on. The human can override later.

### File Organization

Save all work to the project directory. Use clear, descriptive filenames. Keep content files in markdown for easy editing. Keep code clean and commented.

---

## External Profile Links

See the "External Profile URLs (Verified)" section in the PRE-SCRAPED DATA above. Those links should appear in the footer of every page AND on the Contact page. All external links open in new tabs.

---

## Success Criteria

The finished site should:

1. **Generate leads:** A visitor with a broken furnace at 10pm on a Tuesday should be able to call Lou within 5 seconds of landing on the site
2. **Build trust:** A homeowner comparing 3 HVAC companies should read Lou's site and feel like "this is the honest one"
3. **Convert:** Every page should have a clear next action. No dead ends.
4. **Rank locally:** The site should be structurally optimized to rank for "HVAC repair Denver," "furnace repair Denver," "AC repair Denver," and similar local search terms
5. **Be maintainable:** A non-technical person should be able to update content by editing markdown files
