// src/pages/llms-full.txt.ts
// Full content dump for AI/LLM crawlers. Regenerated on every build from the source
// content files so it stays in sync with the site.

import type { APIRoute } from 'astro';
import { services } from '../content/services.ts';
import { faqItems } from '../content/faq.ts';
import { reviews } from '../content/reviews.ts';
import { cityPages } from '../content/cities.ts';
import { serviceAreaCities } from '../content/serviceArea.ts';
import { serviceFaqs } from '../content/serviceFaqs.ts';

export const prerender = true;

export const GET: APIRoute = () => {
  const out: string[] = [];

  out.push("# Lou's Heating & Cooling — Full Site Content for AI Engines");
  out.push('');
  out.push('> Family-owned HVAC company based in Lakewood, CO serving the Denver metro and Front Range since 2014. Honest diagnosis, flat-rate pricing, no upselling, 24/7 emergency service.');
  out.push('');

  out.push('## Business Information');
  out.push('');
  out.push('- Name: Lou\'s Heating & Cooling');
  out.push('- Legal name: Lou\'s Heating & Cooling LLC');
  out.push('- Owner: Louis (Lou) Hernandez Jr.');
  out.push('- Partner / Technician: Nester');
  out.push('- Founded: 2014 (LLC incorporated August 26, 2022)');
  out.push('- Address: 1880 S Pierce St #5, Lakewood, CO 80232');
  out.push('- Phone: (303) 949-8584');
  out.push('- Email: lousheatingcooling@icloud.com');
  out.push('- Hours: 24 hours a day, 7 days a week (emergency service always available)');
  out.push('- License/Insurance: Licensed and insured in Colorado');
  out.push('- Accreditations: BBB A+ Accredited (since July 2024); Authorized Carrier Dealer; Top 3 HVAC Contractors — Lakewood Business Rate 2025');
  out.push('- Website: https://www.loushvac303.com');
  out.push('- Geo: Latitude 39.7066, Longitude -105.0903');
  out.push('');

  out.push('## Differentiators');
  out.push('');
  out.push('- Flat-rate pricing — quoted before any work begins');
  out.push('- No upselling — diagnose and recommend the simplest honest fix');
  out.push('- Owner-operated by Lou and his partner Nester (no rotating subcontractors)');
  out.push('- 24/7 emergency response across the Denver metro');
  out.push('- 10-year extended parts warranty on new Carrier equipment');
  out.push('- 5-year workmanship warranty on installations');
  out.push('- Free in-home estimates on installations');
  out.push('- Military discount available');
  out.push('- Financing available (subject to qualification)');
  out.push('- Christian, family-driven business values');
  out.push('- 5-star rated across HomeAdvisor, Yelp, Angi, and BBB');
  out.push('');

  out.push('## Services');
  out.push('');
  for (const s of services) {
    out.push(`### ${s.title}`);
    out.push('');
    out.push(`URL: https://www.loushvac303.com/services/${s.slug}/`);
    out.push('');
    out.push(s.intro);
    out.push('');
    out.push('Symptoms / signs you need this service:');
    for (const sym of s.symptoms) out.push(`- ${sym}`);
    out.push('');
    out.push('Process:');
    for (const p of s.process) out.push(`- **${p.step}**: ${p.detail}`);
    out.push('');

    const sfaqs = serviceFaqs[s.slug] || [];
    if (sfaqs.length) {
      out.push(`#### ${s.shortTitle} FAQs`);
      out.push('');
      for (const f of sfaqs) {
        out.push(`**Q: ${f.question}**`);
        out.push(`A: ${f.answer}`);
        out.push('');
      }
    }
  }

  out.push('## Service Area');
  out.push('');
  out.push('Headquartered in Lakewood, CO. Serves the Denver metro and Front Range.');
  out.push('');
  out.push('### Featured cities (with dedicated landing pages)');
  out.push('');
  for (const c of cityPages) {
    out.push(`#### ${c.name}, CO — population ${c.population}`);
    out.push('');
    out.push(`URL: https://www.loushvac303.com/service-area/${c.slug}/`);
    out.push('');
    out.push(c.intro);
    out.push('');
    out.push(`Neighborhoods served: ${c.neighborhoods.join(', ')}.`);
    out.push('');
    out.push(`Local context: ${c.housingNote} ${c.localAngle}`);
    out.push('');
  }

  out.push('### All cities served');
  out.push('');
  for (const c of serviceAreaCities) {
    out.push(`- **${c.name}, CO** — ${c.description}`);
  }
  out.push('');

  out.push('## Frequently Asked Questions (Site-Wide)');
  out.push('');
  const tiers: Array<['basics' | 'decisions' | 'expert', string]> = [
    ['basics', 'Homeowner basics'],
    ['decisions', 'Repair vs. replace and buying decisions'],
    ['expert', 'Advanced — Denver/Colorado specifics'],
  ];
  for (const [tier, label] of tiers) {
    out.push(`### ${label}`);
    out.push('');
    for (const f of faqItems.filter(i => i.tier === tier)) {
      out.push(`**Q: ${f.question}**`);
      out.push(`A: ${f.answer}`);
      out.push('');
    }
  }

  out.push('## Customer Reviews');
  out.push('');
  out.push(`5.0 stars across ${reviews.length} verified reviews on HomeAdvisor, Yelp, Angi, and the company website.`);
  out.push('');
  for (const r of reviews) {
    out.push(`- **${r.reviewer}** (${r.platform}, ${r.stars}★): "${r.text.replace(/\s+/g, ' ').trim()}"`);
  }
  out.push('');

  out.push('## Lou\'s Story (About)');
  out.push('');
  out.push('Lou Hernandez has been working on HVAC systems in the Denver metro since 2014. He started as a technician, learned the trade from the inside, and formally incorporated Lou\'s Heating & Cooling LLC in 2022. Lou\'s Christian faith and his family shape how the company operates day to day — honest answers, fair prices, treating customers like neighbors.');
  out.push('');
  out.push('Lou started his own company because he kept seeing homeowners get burned by upsell-driven service: a loose connection becoming a $3,000 "equipment failure," a dirty coil becoming a full system replacement quote. At Lou\'s, the job is to find the simplest honest solution. If a $150 repair will keep your furnace running reliably for several more years, that\'s what Lou recommends — not a new furnace.');
  out.push('');
  out.push('Lou doesn\'t work alone. Nester, his partner and technician, is the other half of the team. When you hire Lou\'s, you get the same names on the truck every time — no rotating subcontractors.');
  out.push('');

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
