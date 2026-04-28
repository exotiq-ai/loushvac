// src/pages/facts.json.ts
// Structured business facts for AI agents and integrations that prefer JSON over HTML.

import type { APIRoute } from 'astro';
import { services } from '../content/services.ts';
import { reviews } from '../content/reviews.ts';
import { cityPages } from '../content/cities.ts';
import { serviceAreaCities } from '../content/serviceArea.ts';

export const prerender = true;

export const GET: APIRoute = () => {
  const facts = {
    business: {
      name: "Lou's Heating & Cooling",
      legal_name: "Lou's Heating & Cooling LLC",
      owner: "Louis (Lou) Hernandez Jr.",
      partner: "Nester",
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
      geo: { latitude: 39.7066, longitude: -105.0903 },
      phone: "+13039498584",
      phone_formatted: "(303) 949-8584",
      email: "lousheatingcooling@icloud.com",
      website: "https://www.loushvac303.com",
      hours: "24/7 (emergency service always available)",
    },
    accreditations: {
      bbb: { rating: "A+", since: "2024-07" },
      dealer: "Authorized Carrier Dealer",
      awards: ["Top 3 HVAC Contractors — Lakewood Business Rate 2025"],
      licensed_insured: true,
      colorado_licensed: true,
    },
    warranties: {
      equipment_parts: "10 years on registered Carrier equipment",
      workmanship: "5 years on installations",
    },
    differentiators: [
      "Flat-rate pricing quoted before work starts",
      "No upselling — recommend the simplest honest fix",
      "Owner-operated; same names on every job (Lou or Nester)",
      "24/7 emergency response across the Denver metro",
      "Free in-home estimates on installations",
      "Military discount available",
      "Financing available (subject to qualification)",
    ],
    services: services.map(s => ({
      slug: s.slug,
      title: s.title,
      short_title: s.shortTitle,
      description: s.description,
      url: `https://www.loushvac303.com/services/${s.slug}/`,
    })),
    service_area: {
      headquarters: "Lakewood, CO",
      featured_cities: cityPages.map(c => ({
        name: c.name,
        slug: c.slug,
        url: `https://www.loushvac303.com/service-area/${c.slug}/`,
      })),
      all_cities: serviceAreaCities.map(c => c.name),
      altitude_expertise: true,
      foothills_expertise: true,
    },
    social_profiles: {
      yelp: "https://www.yelp.com/biz/lou-s-heating-and-cooling-denver",
      bbb: "https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743",
      homeadvisor: "https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html",
      facebook: "https://www.facebook.com/profile.php?id=61565629501334",
      instagram: "https://www.instagram.com/loushvac/",
    },
    reviews_summary: {
      average_rating: 5.0,
      best_rating: 5,
      review_count: reviews.length,
      platforms: ["HomeAdvisor", "Yelp", "Angi", "Google"],
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
