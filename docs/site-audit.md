# Site Audit — Lou's Heating & Cooling (loushvac303.com)

Generated: 2026-04-02
Current site: https://www.loushvac303.com/

---

## Executive Summary

The current site is a single-page Squarespace build that fails at its core job: converting a homeowner with a broken HVAC system into a booked service call. Every major lead generation mechanism is either missing or broken. The site has zero SEO structure, generic copy that could belong to any HVAC company in America, and a broken call-to-action that literally points to a placeholder email. The rebuild addresses all of these issues systematically.

---

## Lead Generation Failures (Current Site)

| Issue | Severity | Resolution in New Site |
|-------|----------|----------------------|
| No contact form anywhere on site | Critical | Full Formspree contact form on homepage, contact page, and every service page |
| "GET IN TOUCH" CTA links to `mailto:email@example.com` (placeholder) | Critical | All CTAs point to `tel:(303)949-8584` or the real Formspree form |
| Phone number buried inside service card buttons, not in header | High | Phone number in sticky header on every page; large, click-to-call in hero |
| No click-to-call optimization for mobile | High | All phone instances use `<a href="tel:+13039498584">` |
| No emergency service callout above the fold | High | Emergency CTA sticky bar on mobile; "24/7 Emergency" in hero subheadline |
| No scheduling or booking integration | Medium | Formspree contact form with preferred date/time field; handoff doc covers adding Calendly or Housecall Pro |
| No free estimate CTA | Medium | "Get Your Free Estimate" CTA on every page and in the hero |

---

## Trust Signal Gaps (Current Site)

| Missing Element | Resolution in New Site |
|-----------------|----------------------|
| No Google/Yelp review scores displayed | TrustBar shows "5.0 Stars" with platform logos; reviews page shows all curated reviews with platform badges |
| No BBB badge or accreditation mention | BBB A+ badge in TrustBar, footer, and About page (official embed code needed — see flags.md) |
| No license number displayed | Footer and About page show license number once Lou provides it (see flags.md) |
| No insurance/bonding mention | About page: "Licensed and insured in Colorado" (confirm with Lou — see flags.md) |
| No American Standard dealer badge | About page and TrustBar (official badge needed from dealer portal — see flags.md) |
| No warranty details prominently shown | TrustBar: "10-Year Warranty"; every service page includes warranty callout box |
| No "years in business" or job count stats | "Serving Denver Since 2014" consistent across all pages; homepage stats section |
| No photos of Lou or team at work | Lou headshots downloaded (review quality); Instagram photos needed (see flags.md) |

---

## SEO Deficiencies (Current Site)

| Issue | Resolution in New Site |
|-------|----------------------|
| Single page — no URL structure | 15-page sitemap, each with a dedicated URL targeting specific keywords |
| No service-specific pages (cannot rank for "furnace repair Denver" etc.) | Dedicated page for each service with unique H1, content, and schema |
| No schema markup (LocalBusiness, Service, Review, FAQPage) | JSON-LD schema on every page; LocalBusiness in BaseLayout, Service on service pages, FAQPage on FAQ, Review on reviews page |
| No meta descriptions | Unique, 150-160 char meta description on every page |
| No alt text on images | All images get descriptive alt text — never keyword-stuffed |
| No sitemap | `@astrojs/sitemap` generates sitemap.xml automatically at build |
| No Google Search Console integration guidance | Handoff doc covers GSC setup and sitemap submission |
| No blog or content strategy | Handoff doc recommends seasonal blog posts as next step |

---

## Content Weaknesses (Current Site)

| Issue | Resolution in New Site |
|-------|----------------------|
| AC Repair and Furnace Repair share identical bullet points | Unique, specific content on every service page — no copy shared across pages |
| Copy is generic boilerplate ("quality service," "top-notch") | All copy written in Lou's voice with Denver-specific details; banned phrases list enforced |
| No FAQ section | 35+ FAQ questions across 3 tiers with FAQPage schema markup |
| No mention of specific Denver metro service area | Dedicated /service-area/ page with individual city paragraphs for local SEO |
| No seasonal content | Winter/furnace and summer/AC framing on relevant service pages; seasonal CTAs |
| About section is bland and generic | First-person narrative about Lou's background, values, and Nester; specific differentiators called out |
| No mention of Spanish-language service | "Se habla Español" note on About page; Spanish review by Gregorio M. displayed with translation |

---

## Design Issues (Current Site)

| Issue | Resolution in New Site |
|-------|----------------------|
| Mobile experience is Squarespace default (not mobile-first) | Mobile-first CSS; tested at 375px first |
| No clear visual hierarchy | Strong H1 → subheadline → CTAs → trust bar structure on every page |
| No urgency indicators | Emergency CTA sticky bar on mobile; "24/7 Emergency" in header and hero |
| Image carousel shows phone message screenshots | Real photos of Lou used; CSS gradient fallback until better hero photo is sourced |
| No sticky header on mobile | Sticky header with click-to-call phone number on all viewports |

---

## Competitive Advantages to Lead With

Based on analysis of all curated reviews, Lou's genuine differentiators — in priority order:

### 1. Honesty / No-Upsell (Primary Differentiator)
Multiple reviews explicitly call out that Lou diagnoses honestly and does not push unnecessary repairs or replacements. One reviewer directly contrasted Lou with larger companies who "would have informed me I need a new unit." This is the single most powerful and specific differentiator. The homepage headline leads with this angle.

**How it's used:** Homepage headline "Denver's Most Honest HVAC Company"; dedicated "Why Denver Homeowners Choose Lou's" section with the Breezair 10-star review; About page narrative centers on honesty as a core value.

### 2. Speed & Responsiveness
Reviews mention same-day service, showing up first thing in the morning for a hot day, and being the first to respond when other companies had ignored the customer ("After being ignored by several companies, Angi's List referred us to Lou"). Response time is a critical differentiator in emergency HVAC situations.

**How it's used:** "We show up fast" block in homepage differentiators section; emergency page headline; the swamp cooler page uses the "after being ignored" review.

### 3. Clear Communication / Education
Lou explains what's wrong, teaches customers how their systems work, and is transparent throughout the process. Customers specifically use words like "educated," "explained everything," "great teaching," "explained things well." This sets Lou apart from technicians who show up, fix it silently, and leave.

**How it's used:** "We explain everything" block in differentiators; service page "What to Expect" sections emphasize Lou's communication process; About page narrative.

### 4. Fair Pricing / No Hidden Fees
Customers describe pricing as "very reasonable," "quite reasonable," and note that Lou "stuck to the original quoted price." Flat rate pricing is a trust signal that reduces one of the biggest homeowner fears: getting a bill that's much higher than the quote.

**How it's used:** "Flat rate pricing. No hidden fees. Ever." block in homepage differentiators; flat rate callout on every service page; TrustBar.

### 5. Family-Owned / Personal Touch
Lou and Nester show up themselves. Customers build a personal relationship with the actual owner, not a dispatcher or rotating technicians. This is a strong contrast to large HVAC franchises.

**How it's used:** "Family-owned, not a faceless corporation" block in homepage differentiators; About page story; "Meet Lou" section.

### 6. American Standard Dealer with Strong Warranty
10-year extended warranty on new equipment, 5-year workmanship warranty. These are specific, verifiable claims that larger box stores and franchise companies often cannot match.

**How it's used:** TrustBar; every service page "Our Commitment" callout; About page certifications.

### 7. BBB A+ Accredited
Accredited since July 2024. A+ rating. Strong trust signal for older homeowners who use BBB to vet contractors.

**How it's used:** TrustBar; About page; footer; schema markup.

### 8. 24/7 Emergency Service
Confirmed from multiple sources. Critical differentiator for after-hours HVAC failures.

**How it's used:** Sticky mobile emergency CTA bar; dedicated /services/emergency/ page; hero subheadline; footer.

---

## What the New Site Must NOT Do

- Use any of these phrases: "top-notch," "world-class," "committed to excellence," "dedicated to providing," "your satisfaction is our priority," "state-of-the-art," "look no further," "one-stop shop," "we go above and beyond"
- Link any CTA to a placeholder email address
- Duplicate content across service pages
- Use phone message screenshots as photography
- Leave any page without a visible phone number and at least one CTA
- Reference `email@example.com` anywhere
- Use generic HVAC boilerplate that could appear on any competitor's site

---

## Conversion Priority Hierarchy (Applied to Every Page)

1. Phone number visible in header (click-to-call, tel: link)
2. Primary CTA above the fold (before scrolling)
3. Trust signal within first viewport (TrustBar or badge)
4. Social proof (real review) within first two scrolls
5. Secondary CTA at bottom of main content
6. Emergency CTA always accessible (sticky mobile bar)
