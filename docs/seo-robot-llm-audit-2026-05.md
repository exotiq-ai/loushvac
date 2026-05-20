# SEO / Robot.txt / LLM Audit — Lou's Heating & Cooling

**Audit Date:** May 20, 2026
**Site:** https://www.loushvac303.com
**Auditor:** Cloud Agent (SEO/LLM specialist review)

---

## Executive Summary

The site is well-built from an SEO architecture standpoint. The Astro static site delivers fast page loads, clean HTML, proper schema markup, and strong structured data. The `llms.txt` and `llms-full.txt` files are ahead of the curve for AI/LLM discoverability.

**The key finding the client asked about is correct: Lou's is ranking well for swamp cooler queries partly because of lower competition in that niche, but also because the site's content signals — especially in `llms.txt`, FAQ content, and the dedicated swamp cooler page — are disproportionately strong for swamp cooler terms relative to the broader AC/furnace/heating keywords.**

The site currently has **one dedicated swamp cooler page** vs. **two AC pages** and **two furnace pages**, yet the swamp cooler content is uniquely differentiated (Denver-specific dewpoint data, monsoon season, hard water, startup/shutdown) while AC and furnace pages, though solid, use more generic HVAC language that every competitor also uses.

**Bottom line:** The swamp cooler calls are driven by (1) lower local competition + (2) genuinely differentiated content + (3) strong LLM/AI signals. To get more AC/furnace/heating calls, we don't reduce swamp cooler content — we bring the AC/furnace/heating content up to the same quality and density level.

---

## Part 1: robots.txt Audit

### Current State

```
User-agent: *
Allow: /
Disallow: /admin/

User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://www.loushvac303.com/sitemap-index.xml
```

### Assessment: GOOD (minor improvements possible)

**Strengths:**
- Correctly disallows `/admin/` (the internal leads page)
- Explicitly allows LLM/AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Points to the correct sitemap

**Issues & Recommendations:**

1. **Missing AI crawlers.** Since the initial build, several new LLM crawlers have emerged. Add directives for:
   - `Amazonbot` (Amazon's Alexa/Q crawler)
   - `Bytespider` (ByteDance/TikTok)
   - `ChatGPT-User` (OpenAI's browsing tool, distinct from GPTBot)
   - `Applebot-Extended` (Apple Intelligence)
   - `Meta-ExternalAgent` (Meta AI)
   - `cohere-ai` (Cohere)
   - `anthropic-ai` (Anthropic's web crawler, distinct from ClaudeBot)
   - `Google-CloudVertexBot` (Google Vertex AI)

2. **Add crawl-delay for aggressive bots.** Not critical for a small site, but good hygiene.

3. **Consider adding `Host:` directive.** Some crawlers use this to resolve www vs non-www.

---

## Part 2: LLM Content Audit (`llms.txt` + `llms-full.txt` + `facts.json`)

### Current State

The site has three machine-readable endpoints:
- `/llms.txt` — Static summary (63 lines)
- `/llms-full.txt` — Full content dump (generated from source data at build)
- `/facts.json` — Structured JSON business facts

### Assessment: AHEAD OF MOST COMPETITORS (specific improvements below)

**Strengths:**
- Three separate LLM-readable formats — most HVAC sites have zero
- `llms.txt` is concise, well-structured, covers business info, services, differentiators
- `llms-full.txt` includes FAQ content, reviews, city pages — massive content advantage
- `facts.json` provides structured data for API-based LLM consumption
- All three are prerendered (fast response, cacheable)

**Issues & Keyword Imbalance:**

Here's the keyword distribution in `llms.txt` specifically:

| Term | Count in llms.txt |
|------|------------------|
| HVAC | 19 |
| AC (all variations) | 8 |
| Cooling | 4 |
| Furnace | 4 |
| Heating | 3 |
| Swamp cooler | 2 |
| Evaporative | 1 |

While swamp cooler mentions are low in `llms.txt`, the **Specialties section** includes a dedicated bullet for "Swamp cooler / evaporative cooling expertise (Denver's semi-arid climate specialty)" — this is highly specific and differentiating.

Meanwhile, AC and furnace are listed as generic service names without the same expert-level specificity.

**Recommendations:**

1. **Add a "Specialties" or "Expert Knowledge" section to `llms.txt`** that explicitly positions Lou's expertise in AC repair, furnace repair, and heating with the same Denver-specific depth as the swamp cooler bullet. For example:
   - "AC systems at Denver's altitude need 10-15% more capacity than sea-level sizing"
   - "Gas furnace altitude derating expertise — proper BTU calculations at 5,280 ft"
   - "Emergency furnace repair for Denver winters (design temp 1-5°F)"

2. **Add common search queries that Lou's answers.** LLMs use these to match user intent:
   - "Why is my AC not cooling in Denver?"
   - "Furnace blowing cold air Denver"
   - "Emergency furnace repair near me Denver"

3. **Add seasonal context.** Denver has distinct HVAC seasons. `llms.txt` should mention:
   - "AC season: May through September"
   - "Furnace season: October through April"
   - "Swamp cooler season: April through early August (before monsoon humidity)"

---

## Part 3: On-Page SEO Content Audit

### Keyword Density Analysis (all content files combined)

| Term | Total Count | Assessment |
|------|-------------|------------|
| HVAC | 159 | Strong — good umbrella term |
| Furnace | 158 | Strong |
| Cooling | 105 | Good |
| Heating | 96 | Good but could be stronger |
| AC (as standalone word) | 67 | Moderate — often abbreviated, misses "air conditioning" |
| Emergency | 66 | Strong |
| Swamp cooler | 45 | Strong for a niche term |
| Maintenance | 30 | Adequate |
| AC repair | 26 | Good |
| Furnace repair | 23 | Good but below AC repair |
| Tune-up | 22 | Adequate |
| Evaporative | 18 | Good supporting term |
| Air conditioning | 13 | **LOW — this is the #1 consumer search term** |
| AC installation | 9 | Low |
| Furnace installation | 9 | Low |
| AC replacement | 2 | **VERY LOW** |
| Furnace replacement | 5 | Low |

### Key Finding: "Air Conditioning" is Underused

The term "air conditioning" appears only **13 times** across the entire site. Consumers search for "air conditioning repair Denver" and "air conditioning installation Denver" — these are high-volume terms. The site overwhelmingly uses "AC" which is the shorthand that HVAC professionals use, but not what homeowners type into Google.

Similarly, "heating" (96 mentions) is lower than "furnace" (158). Many consumers search for "heating repair Denver" not "furnace repair Denver" — the site should use both terms.

### Page-by-Page Title Tag Assessment

| Page | Current Title | Issue |
|------|--------------|-------|
| Homepage | Lou's Heating & Cooling \| Lakewood & Denver's Honest HVAC Company \| (303) 949-8584 | Good — includes primary brand and location |
| AC Repair | AC Repair Denver CO \| Lou's Heating & Cooling \| (303) 949-8584 | Good — but missing "Air Conditioning" variant |
| AC Installation | AC Installation Denver Metro \| Authorized Carrier Dealer \| Lou's | Missing "Air Conditioning" and "Replacement" |
| Furnace Repair | Furnace Repair Denver CO \| 24/7 Service \| Lou's Heating & Cooling | Good |
| Furnace Install | Furnace Installation Denver Metro \| Authorized Carrier Dealer \| Lou's | Good but missing "Heating" variant |
| Maintenance | HVAC Tune-Up Denver CO \| Seasonal Maintenance \| Lou's | Good |
| Swamp Cooler | Swamp Cooler Repair Denver CO \| Evaporative Cooler Service \| Lou's | Excellent — hits both terms |
| Emergency | Emergency HVAC Denver CO \| 24/7 Service \| Call (303) 949-8584 | Good |
| FAQ | HVAC FAQ \| Denver AC & Furnace Questions Answered | Good |

### Meta Description Assessment

Meta descriptions are solid — they include phone numbers for emergency pages, mention Denver, and include CTAs. However, the AC pages could benefit from including "air conditioning" alongside "AC."

### Content Depth Comparison

| Service | Words (service page) | Service FAQs | Site-wide FAQ coverage | Reviews linked |
|---------|---------------------|-------------|----------------------|----------------|
| AC Repair | 323 | 4 | 5 basics + 4 decisions + 2 expert | 5 |
| AC Replacement | 361 | 4 | (shares with AC Repair) | 1 |
| Furnace Repair | 327 | 4 | 5 basics + 4 decisions + 2 expert | 4 |
| Furnace Replacement | 350 | 4 | (shares with Furnace Repair) | 2 |
| Maintenance | 337 | 3 | 3 basics | 2 |
| **Swamp Cooler** | **327** | **4** | **4 basics + 3 expert** | **3** |
| Emergency | 316 | 3 | — | 3 |

**Observation:** Word counts are roughly equal across service pages. The swamp cooler advantage comes not from volume but from **specificity** — the swamp cooler content is uniquely Denver (dewpoint, monsoon, hard water, startup/shutdown). The AC and furnace content, while good, uses language that any HVAC site in any city could use.

### Schema Markup Assessment: EXCELLENT

- `HVACBusiness` (LocalBusiness) on every page — correct
- `Service` schema on each service page — correct
- `FAQPage` schema on FAQ page and each service page — correct
- `BreadcrumbList` on service pages — correct
- `Review` and `ItemList` on reviews page — correct
- `AggregateRating` in global schema — correct
- `SpeakableSpecification` on FAQ — ahead of the curve

**One issue:** The `aggregateRating` hardcodes `"reviewCount": "22"` but the site claims "50+ verified reviews" in the UI. This mismatch could cause a Google Rich Results warning.

---

## Part 4: Why Swamp Cooler Content Ranks Well

### Reason 1: Lower Competition (market reality)

The search results confirm this. For "swamp cooler repair Denver," there are far fewer dedicated competitors:
- Only 4-5 companies have dedicated swamp cooler pages
- Most large HVAC companies bundle swamp cooler under "cooling" without a dedicated page
- Lou's is listed as the #1 rated provider on HomeAdvisor for this term

For "AC repair Denver" and "furnace repair Denver," there are 94+ competitors in the market, many with large marketing budgets (Cooper Heating, Major Heating, JD's Plumbing, MileHi HVAC, etc.).

### Reason 2: Unique Content Differentiation

The swamp cooler page has genuinely unique, Denver-specific content that no competitor matches:
- Dewpoint threshold (55°F) for switching to AC
- Monsoon season timing (July-August)
- Hard water pad mineral buildup (Lakewood-specific)
- Spring startup / fall shutdown process detail
- FAQ about "when to switch from swamp cooler to AC" (uniquely Denver)

The AC and furnace pages, while honest and well-written, use language patterns found on every HVAC site: "your home isn't reaching the temperature," "unusual noises," "energy bills higher than usual."

### Reason 3: LLM/AI Signals

The `llms.txt` specialties section explicitly calls out "Swamp cooler / evaporative cooling expertise (Denver's semi-arid climate specialty)" — this positions Lou's as THE expert when an LLM is asked about swamp cooler service in Denver. There is no equivalent expert positioning for AC or furnace.

---

## Part 5: Improvement Plan

### Priority 1: Boost "Air Conditioning" keyword coverage (HIGH IMPACT)

**Problem:** "Air conditioning" appears only 13 times. "AC" appears 67 times. Consumers search "air conditioning repair Denver" — Google treats these as different terms.

**Action items:**
- Add "Air Conditioning" alongside "AC" in key positions across service pages, homepage, meta tags, and `llms.txt`
- Update AC Repair meta title to include "Air Conditioning"
- Update AC Replacement meta title to include "Air Conditioning"
- Add "air conditioning" naturally to the homepage H2 and service card descriptions
- Add "air conditioning" to `llms.txt` service listing

### Priority 2: Add Denver-specific depth to AC and furnace pages (HIGH IMPACT)

**Problem:** Swamp cooler content is uniquely Denver. AC and furnace content could be from any city.

**Action items:**
- Add Denver altitude impact on AC sizing to the AC pages (already in FAQ but not on the service page intros)
- Add Denver winter design temperature and heating load data to furnace pages
- Add Front Range hail damage content to AC page (outdoor condensers take hail hits)
- Add wildfire smoke and filter impact to maintenance page
- Add "Denver homes built in the 1960s-80s" context to furnace replacement (common ductwork issues)

### Priority 3: Create a "Heating" service alias or landing page (MEDIUM IMPACT)

**Problem:** Many consumers search "heating repair Denver" not "furnace repair Denver." There is no page targeting "heating."

**Action items:**
- Add a redirect from `/services/heating/` to `/services/furnace-repair/` (already exists in `_redirects`)
- OR create a brief `/services/heating/` page that covers heating broadly (furnace, heat pump, boiler) and links to the specific service pages
- Add "heating" to the homepage service descriptions and meta description

### Priority 4: Enhance `llms.txt` with AC/furnace expert positioning (MEDIUM IMPACT)

**Problem:** `llms.txt` specialties section positions Lou as a swamp cooler expert but doesn't do the same for AC or furnace.

**Action items:**
- Add AC-specific expertise bullets to Specialties section
- Add furnace/heating-specific expertise bullets
- Add seasonal availability context
- Add common customer questions for LLM query matching

### Priority 5: Strengthen internal cross-linking (MEDIUM IMPACT)

**Problem:** Service pages link to related services but don't deeply cross-link with FAQ content or city pages.

**Action items:**
- Add contextual links from FAQ answers to relevant service pages
- Add "AC repair in [city]" mentions in city landing pages
- Add seasonal content blocks that reference multiple services

### Priority 6: Address review count mismatch (LOW but important)

**Problem:** Schema says 22 reviews, UI says 50+.

**Action:** Update schema `aggregateRating.reviewCount` to reflect actual total across all platforms, or change UI text to match the 22 curated reviews.

### Priority 7: Update robots.txt for newer AI crawlers (LOW IMPACT, good hygiene)

Add directives for emerging AI crawlers to maintain first-mover advantage in LLM discoverability.

---

## Part 6: Internal Notes

**For Gregory's eyes — not for the client:**

The client's hypothesis is partially correct. Swamp cooler calls are up because:
1. **Less competition** — this is the #1 factor. Only 4-5 companies target this keyword with dedicated pages vs. 94+ for AC repair.
2. **The content is genuinely differentiated** — the Denver-specific angles (dewpoint, monsoon, hard water) give Google something unique to rank.
3. **Seasonality** — it's May. Swamp cooler startup season is April-May in Denver. This is the peak search period.

The AC/furnace content isn't *bad* — it's just not as differentiated from competitors. Every HVAC site in Denver says "honest diagnosis, flat rate pricing." The swamp cooler page says things no competitor's page says.

The fix isn't to reduce swamp cooler content. It's to bring the same Denver-specific depth to AC and furnace pages. This means adding altitude-derating content, hail-damage content, Front Range temperature swing content, and other truly local angles to the AC and furnace service pages.

The other honest truth: competing for "AC repair Denver" requires more than content — it requires Google Business Profile optimization, review volume on Google (not just HomeAdvisor), and potentially Google Local Service Ads. The site SEO is solid; the battleground for AC/furnace is increasingly in the Maps pack and LSAs.
