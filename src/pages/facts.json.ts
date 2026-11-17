// src/pages/facts.json.ts
// Structured business facts for AI agents and integrations that prefer JSON over HTML.

import type { APIRoute } from 'astro';
import { services } from '../content/services.ts';
import { reviews } from '../content/reviews.ts';
import { cityPages } from '../content/cities.ts';
import { serviceAreaCities } from '../content/serviceArea.ts';
import { business } from '../content/business';
import { googleReviewSummary } from '../content/googleReviewSummary';

export const prerender = true;

export const GET: APIRoute = () => {
  const facts = {
    business: {
      name: "Lou's Heating & Cooling",
      legal_name: "Lou's Heating & Cooling LLC",
      owner: "Louis (Lou) Hernandez Jr.",
      founded: 2014,
      llc_incorporated: "2022-08-26",
      slogan: "Honest HVAC Service. Fair Prices. Every Time.",
      values: ["Christian", "Family-owned", "Owner-operated"],
    },
    contact: {
      address: {
        street: "1880 S Pierce St #5",
        city: "Lakewood",
        region: "CO",
        postal_code: "80232",
        country: "US",
      },
      geo: { latitude: 39.6833491, longitude: -105.0710394 },
      phone: "+13039498584",
      phone_formatted: "(303) 949-8584",
      email: "admin@loushvac.com",
      website: "https://loushvac303.com",
      hours: "24/7 (emergency service always available)",
    },
    accreditations: {
      bbb: { rating: "A+", since: "2024-07" },
      dealer: "Authorized Carrier Dealer",
      equipment_brands: business.brands,
      licensed_insured: true,

    },
    warranties: {
      equipment_parts: "10 years on qualifying registered Carrier and American Standard equipment",
      labor: "2 years on new installations; written terms apply",
    },
    differentiators: [
      "Flat-rate pricing quoted before work starts",
      "No upselling — recommend the simplest honest fix",
      "Family-owned service from Lou and his team",
      "24/7 emergency response across the Denver metro",
      "Free replacement estimates; $129 diagnostic call-out",
      ...business.offers,
      "Financing available (subject to qualification)",
    ],
    service_scope: { ductwork: false, walk_in_retail_store: false, furnace_sales: true, commercial_enquiries: true },
    offers: { headlines: business.offers, details: business.offerNote },
    services: services.map(s => ({
      slug: s.slug,
      title: s.title,
      short_title: s.shortTitle,
      description: s.description,
      url: `https://loushvac303.com/services/${s.slug}/`,
    })).concat({ slug: business.commercial.slug, title: business.commercial.title, short_title: 'Commercial HVAC', description: business.commercial.description, url: business.commercial.url }),
    service_area: {
      headquarters: "Lakewood, CO",
      featured_cities: cityPages.map(c => ({
        name: c.name,
        slug: c.slug,
        url: `https://loushvac303.com/service-area/${c.slug}/`,
      })),
      all_cities: serviceAreaCities.map(c => c.name),
      altitude_expertise: true,
      foothills_expertise: true,
    },
    social_profiles: {
      google: googleReviewSummary.profileUrl,
      yelp: "https://www.yelp.com/biz/lou-s-heating-and-cooling-denver",
      bbb: "https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743",
      homeadvisor: "https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html",
      facebook: "https://www.facebook.com/profile.php?id=61565629501334",
      instagram: "https://www.instagram.com/loushvac/",
    },
    reviews_summary: {
      source: 'Google',
      average_rating: googleReviewSummary.rating,
      best_rating: 5,
      review_count: googleReviewSummary.reviewCount,
      checked_at: googleReviewSummary.checkedAt,
      source_url: googleReviewSummary.profileUrl,
      curated_testimonial_count: reviews.length,
      curated_testimonial_sources: Array.from(new Set(reviews.map(review => review.platform))),
    },
    payments: {
      accepts: ["Credit Card"],
      currency: "USD",
      price_range: "$$",
    },
    last_updated: new Date().toISOString().slice(0, 10),
  };

  return new Response(JSON.stringify(facts, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
