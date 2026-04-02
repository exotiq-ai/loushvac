# Handoff Documentation — Lou's Heating & Cooling Website

Built: 2026-04-02
Tech Stack: Astro 4.x (static), CSS custom properties, Formspree
Build Command: `npm run build`
Output Directory: `dist/`

---

## 1. Deployment Instructions

### Recommended: Netlify (easiest)

1. Create a free account at netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository (GitHub, GitLab, or Bitbucket)
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. In Site Settings → Domain management → Add custom domain: `loushvac303.com`
7. Follow Netlify's DNS instructions to point your domain

### Alternative: Vercel

1. Create account at vercel.com
2. Import project from Git
3. Framework preset: Astro (auto-detected)
4. Deploy

### Alternative: Cloudflare Pages

1. Connect Git repo in Cloudflare dashboard
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 2. Contact Form Setup (REQUIRED before launch)

The contact form uses Formspree. Before the site goes live:

1. Go to formspree.io and create a free account
2. Create a new form — use `lousheatingcooling@icloud.com` as the destination email
3. Copy your form endpoint URL (format: `https://formspree.io/f/xxxxxxxx`)
4. Open `src/components/ContactForm.astro`
5. Replace `FORMSPREE_ENDPOINT_HERE` with your endpoint URL
6. Rebuild and redeploy

**Alternative: Netlify Forms (if deploying to Netlify)**
1. Add `data-netlify="true"` attribute to the `<form>` tag in ContactForm.astro
2. Remove the `action` and `method` attributes
3. Netlify will automatically intercept form submissions

---

## 3. How to Update Content

### Update business information (phone, address, hours)
- `src/layouts/BaseLayout.astro` — JSON-LD schema (phone, address, etc.)
- `src/components/Header.astro` — phone number in header
- `src/components/Footer.astro` — contact details and address
- `src/components/EmergencyCTA.astro` — phone number in sticky mobile bar

### Add or edit reviews
- File: `src/content/reviews.ts`
- Add a new review object to the `reviews` array following the existing format
- Assign an `id` (increment from current highest), `platform`, `reviewer`, `stars`, `tier`, `text`

### Edit FAQ answers
- File: `src/content/faq.ts`
- Each FAQ item has `id`, `question`, `answer`, `tier`
- Edit the `answer` string directly

### Edit service descriptions
- File: `src/content/services.ts`
- Each service has `intro`, `symptoms`, `process` — edit these directly

### Replace the hero background image
- Place new image at: `public/images/hero-bg-denver-neighborhood.jpg`
- Edit `src/pages/index.astro` — find `.hero-bg` style and add `background-image: url('/images/hero-bg-denver-neighborhood.jpg')`

---

## 4. Google Search Console Setup

1. Go to search.google.com/search-console
2. Add property → URL prefix → `https://www.loushvac303.com`
3. Verify ownership using the HTML tag method:
   - Copy the verification meta tag
   - Add it to `src/layouts/BaseLayout.astro` inside the `<head>` section
   - Rebuild and deploy
4. After verifying, submit your sitemap: `sitemap-index.xml`

---

## 5. Google Business Profile Optimization

1. Add all service categories: HVAC contractor, Air conditioning contractor, Heating contractor
2. Add all services listed on the website
3. Update business hours: 24/7
4. Add website URL: `https://www.loushvac303.com`
5. Upload at least 10 quality photos (Lou at work, completed installations, team)
6. Respond to every review within 24 hours
7. Post seasonal updates regularly

---

## 6. Recommended Next Steps (Priority Order)

### Immediate (before launch)
- [ ] Set up Formspree endpoint (see Section 2)
- [ ] Add Google Business Profile URL to `src/content/externalProfiles.ts`
- [ ] Get Colorado contractor license number and add to Footer.astro and about.astro
- [ ] Verify BBB badge embed code and add to about.astro
- [ ] Test contact form submission end-to-end

### Shortly after launch
- [ ] Set up Google Search Console and submit sitemap
- [ ] Set up Google Analytics 4 (add GA tag to BaseLayout.astro)
- [ ] Verify all external profile links work
- [ ] Take 10+ quality photos for Google Business Profile
- [ ] Request reviews from recent satisfied customers

### Within 1 month
- [ ] Start a blog with seasonal HVAC tips (great for local SEO):
  - "How Denver's altitude affects your furnace size"
  - "When to switch from swamp cooler to AC in Denver"
  - "Fall furnace tune-up checklist for Colorado homeowners"
- [ ] Consider Google Local Service Ads (pay-per-lead, verified by Google)
- [ ] Add online scheduling (Calendly, Housecall Pro, or ServiceTitan)

### Ongoing
- [ ] Respond to all new reviews within 24 hours
- [ ] Update Xcel Energy rebate amounts in FAQ answers each spring
- [ ] Add photos of new installations to the site and GBP

---

## 7. Known Items Requiring Human Decision

See `docs/flags.md` for the complete list. Key items:

1. **Formspree endpoint** — Must be set up before any form can receive submissions
2. **Google Business Profile URL** — Find and update in `src/content/externalProfiles.ts`
3. **Contractor license number** — Add to Footer.astro and about.astro
4. **BBB badge** — Get official embed code from BBB account
5. **American Standard dealer badge** — Get from dealer portal, save to `public/images/`
6. **Instagram photos** — Manually export quality photos from @loushvac Instagram
7. **Hero background photo** — Replace CSS gradient with real Denver neighborhood photo

---

## 8. Site Architecture Reference

```
Pages:                            Meta Title
/                                 Lou's Heating & Cooling | Denver's Honest HVAC Company | (303) 949-8584
/about/                           About Lou's Heating & Cooling | Family-Owned Denver HVAC Since 2014
/contact/                         Contact Lou's Heating & Cooling | Denver HVAC | (303) 949-8584
/faq/                             HVAC FAQ | Denver AC & Furnace Questions | Lou's Heating & Cooling
/reviews/                         Customer Reviews | Lou's Heating & Cooling Denver | 5-Star HVAC
/service-area/                    HVAC Service Area — Denver Metro, CO | Lou's Heating & Cooling
/services/                        HVAC Services in Denver, CO | Lou's Heating & Cooling
/services/ac-repair/              AC Repair Denver CO | Lou's Heating & Cooling | (303) 949-8584
/services/ac-replacement/         AC Installation Denver CO | American Standard Dealer | Lou's
/services/furnace-repair/         Furnace Repair Denver CO | 24/7 Service | Lou's Heating & Cooling
/services/furnace-replacement/    Furnace Installation Denver CO | American Standard Dealer
/services/maintenance/            HVAC Tune-Up Denver CO | Seasonal Maintenance | Lou's
/services/swamp-cooler/           Swamp Cooler Repair Denver CO | Evaporative Cooler Service
/services/emergency/              Emergency HVAC Denver CO | 24/7 Service | Call (303) 949-8584
```
