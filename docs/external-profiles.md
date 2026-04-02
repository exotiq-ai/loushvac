# External Profile URLs — Lou's Heating & Cooling

Generated: 2026-04-02

All URLs were provided in the project spec (CLAUDE.md). Status reflects spec-confirmed availability; direct verification was not attempted for platforms that block automated crawlers.

---

## Verified Profile URLs

| Platform | URL | Status | Notes |
|----------|-----|--------|-------|
| Yelp | https://www.yelp.com/biz/lou-s-heating-and-cooling-denver | Confirmed in spec | Open in new tab |
| BBB | https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743 | Confirmed in spec | A+ rated since July 2024 |
| HomeAdvisor | https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html | Confirmed in spec | Primary review source |
| Angi | https://www.angi.com/companylist/us/co/denver/lous-heating-and-cooling-llc-reviews-1.htm | Confirmed in spec | Open in new tab |
| Facebook | https://www.facebook.com/profile.php?id=61565629501334 | Confirmed in spec | Open in new tab |
| Instagram | https://www.instagram.com/loushvac/ | Confirmed in spec | Handle: @loushvac |
| Google Business | [PENDING — see instructions below] | NOT YET CONFIRMED | See flag in flags.md |

---

## How to Confirm the Google Business Profile URL

1. Open Google Maps in a browser: maps.google.com
2. Search for: `Lou's Heating and Cooling Denver CO 80227`
3. Click the business listing in the results
4. Click "Share" in the listing panel
5. Click "Copy link"
6. The URL will look like: `https://maps.app.goo.gl/XXXXXXXXX` or `https://www.google.com/maps/place/...`
7. Paste the URL here and update `src/content/externalProfiles.ts`

**Alternative method:** In Google Search, search for "Lou's Heating and Cooling Denver" and look for the Knowledge Panel on the right side. The Google Maps link in the Knowledge Panel is the GBP URL.

---

## Usage in Site

These URLs appear in:
- **Footer:** All platforms listed with icons, open in new tab
- **Contact page:** Full list with brief descriptions
- **Reviews page:** Platform badges linking to each profile
- **About page:** Trust signals section (BBB, HomeAdvisor specifically)

All external links use `target="_blank" rel="noopener noreferrer"` to open in a new tab safely.

---

## Future: Direct Review Link for Customers

Once the Google Business Profile URL is confirmed, create a direct review link using this format:

`https://search.google.com/local/writereview?placeid=PLACE_ID_HERE`

This link can be included in:
- Post-service follow-up emails/texts to customers
- The Reviews page ("Leave us a review")
- QR code on business cards or invoices
