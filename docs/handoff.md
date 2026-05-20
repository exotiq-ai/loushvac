# Handoff Documentation — Lou's Heating & Cooling Website

Built: 2026-04-02
Tech Stack: Astro 6.x (hybrid static + serverless), Netlify adapter, Resend, Supabase, Housecall Pro
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

The contact form uses a custom API route (`/api/contact`) powered by three services:

1. **Resend** — Sends an email notification to Lou when a lead comes in
2. **Supabase** — Stores leads in a database (viewable at `/admin/leads/`)
3. **Housecall Pro** — Creates a customer and lead in Lou's job management system

### Required Environment Variables (set in Netlify → Site Settings → Environment Variables)

```bash
# Resend (transactional email — sends lead notifications to Lou)
RESEND_API_KEY=re_xxxxxxxxxxxx         # Get from resend.com/api-keys
RESEND_FROM_EMAIL=leads@loushvac.com  # Must be a verified domain in Resend
RESEND_TO_EMAIL=admin@loushvac.com  # Lou's inbox

# Supabase (lead history — optional but recommended)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Housecall Pro (CRM integration — optional)
HCP_API_BASE=https://api.housecallpro.com
HCP_CLIENT_ID=
HCP_CLIENT_SECRET=
HCP_ACCOUNT_TOKEN=
HCP_API_VERSION=2024-01-01

# Admin panel passcode (protects /admin/leads/ page)
ADMIN_PASSCODE=choose-a-strong-passcode
```

### Minimum Setup (email only)

At minimum, you need `RESEND_API_KEY` configured. Without it, the form cannot deliver messages to Lou's email. Steps:

1. Sign up at [resend.com](https://resend.com)
2. Verify the domain `loushvac303.com` (or use Resend's free testing domain for initial testing)
3. Create an API key
4. Add `RESEND_API_KEY` to Netlify environment variables
5. Deploy

### Graceful Degradation

The form pipeline is designed to degrade gracefully:
- If Resend fails but Supabase captures the lead → User sees success (Lou checks `/admin/leads/`)
- If Resend fails but HCP captures the lead → User sees success (Lou sees it in HCP inbox)
- If ALL services fail → User sees error with a prompt to call (303) 949-8584
- If JavaScript is disabled → Form submits via standard HTML POST to the same API

### Netlify Forms Backup

The form also includes `data-netlify="true"` which means Netlify will capture submissions as a backup even if the serverless function has issues. Check Netlify → Forms for any captured submissions.

**Alternative: Netlify Forms only (simplest possible setup)**
If you don't want to configure Resend/Supabase/HCP:
1. Remove `action="/api/contact"` from `src/components/ContactForm.astro`
2. Netlify Forms will automatically intercept submissions
3. Configure email notifications in Netlify → Forms → Notifications → admin@loushvac.com

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
- [ ] Set up Resend API key and verify domain (see Section 2)
- [ ] Optionally set up Supabase for lead history (see Section 2)
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

1. **Resend API key** — Must be configured in Netlify environment variables before forms can deliver email
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
/contact/thank-you/               Message Received | Lou's Heating & Cooling
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
