# Stock Photo Needs — Lou's Heating & Cooling

Generated: 2026-04-02

All stock photos should be sourced from Unsplash (unsplash.com) or Pexels (pexels.com) under free commercial use licenses. Download the largest available size and compress to web-appropriate dimensions before adding to `public/images/`.

---

## Priority 1: Hero Background

**Needed for:** Homepage hero section
**Description:** Denver residential neighborhood in summer — tree-lined street, well-maintained homes. NOT a generic stock HVAC unit photo. The goal is to make Denver homeowners feel at home, not feel like they're looking at an HVAC catalog.
**Target dimensions:** 1920 x 1080 px minimum, compressed to under 300 KB
**License:** Free commercial use
**Search terms:**
- Unsplash: "Denver neighborhood" / "Colorado home exterior summer" / "residential street Colorado"
- Pexels: "Denver houses" / "Colorado neighborhood summer"
**File name when saved:** `public/images/hero-bg-denver-neighborhood.jpg`
**Current fallback:** CSS gradient (deep navy to medium blue)

---

## Priority 2: About Page Header

**Needed for:** About page hero/banner
**Description:** Denver skyline or Front Range mountains in good weather. Warm, inviting tone. Not corporate.
**Target dimensions:** 1440 x 600 px, under 200 KB
**Search terms:**
- Unsplash: "Denver skyline" / "Front Range Colorado mountains" / "Colorado blue sky"
- Pexels: "Denver Colorado" / "Rocky Mountains skyline"
**File name when saved:** `public/images/about-hero-denver.jpg`

---

## Priority 3: Service Page Headers

Each service page needs a header image that is realistic and relatable — NOT overly staged stock photos. Real-looking HVAC work.

| Service | Description | File Name |
|---------|-------------|-----------|
| AC Repair | Technician inspecting or working on an outdoor AC condenser unit | `public/images/service-ac-repair-header.jpg` |
| AC Replacement | New AC unit being installed or a pristine new condenser | `public/images/service-ac-replacement-header.jpg` |
| Furnace Repair | Technician working on a furnace in a residential utility room | `public/images/service-furnace-repair-header.jpg` |
| Furnace Replacement | New high-efficiency furnace installed | `public/images/service-furnace-replacement-header.jpg` |
| Maintenance | HVAC technician performing inspection/tune-up | `public/images/service-maintenance-header.jpg` |
| Swamp Cooler | Evaporative cooler on a rooftop or home exterior (Denver-style) | `public/images/service-swamp-cooler-header.jpg` |
| Emergency | Home at night with lights on — conveys urgency and being helped | `public/images/service-emergency-header.jpg` |

**Search terms for all service pages:**
- Unsplash: "HVAC technician" / "air conditioner repair" / "furnace repair" / "heating cooling"
- Pexels: "HVAC repair" / "air conditioning technician" / "furnace installation"

**Target dimensions for all service headers:** 1440 x 480 px, under 150 KB each

---

## Priority 4: Seasonal / Supporting Images

| Asset | Description | File Name |
|-------|-------------|-----------|
| Winter Denver home | Snow-covered residential home, warm lights inside — for furnace pages | `public/images/denver-home-winter.jpg` |
| Summer Denver | Hot sunny day, residential neighborhood — for AC pages | `public/images/denver-summer.jpg` |
| Service area map background | Subtle Colorado/Denver map or aerial view | `public/images/service-area-bg.jpg` |

---

## AI-Generated Asset Opportunities

The following assets are good candidates for AI generation rather than stock photography. Every AI-generated image must be flagged in `docs/flags.md` before use.

| Asset | Description | Tool Suggestion | Flag |
|-------|-------------|-----------------|------|
| Cohesive SVG icon set | Replace existing PNG service icons (fan, water, snowflake, fire) with a matching SVG set. Should match brand colors (#1B4965 navy, #F28C28 orange). | Midjourney / custom SVG in Figma | [AI-GENERATED: NEEDS REVIEW] |
| "Serving Denver Since 2014" badge | Custom trust badge/seal graphic | Midjourney / Canva | [AI-GENERATED: NEEDS REVIEW] |
| Denver skyline illustration | Stylized (not photographic) Denver skyline for service area page | Midjourney | [AI-GENERATED: NEEDS REVIEW] |
| Seasonal banner graphics | Winter/summer illustrated banners for homepage | Midjourney | [AI-GENERATED: NEEDS REVIEW] |

**Note:** All AI-generated images must be reviewed by Gregory before publishing. Add each to `docs/flags.md` with the `[AI-GENERATED: NEEDS REVIEW]` tag, the asset name, and the file path once created.
