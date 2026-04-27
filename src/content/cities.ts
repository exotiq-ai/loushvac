// src/content/cities.ts
// Priority city landing pages. Each has unique copy for local SEO.

export interface CityPage {
  slug: string;
  name: string;
  population: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  neighborhoods: string[];
  housingNote: string;
  localAngle: string;
  specialty: string;
  relatedReviewIds: number[];
  mapEmbedQuery: string;
  isHQ?: boolean;
}

export const cityPages: CityPage[] = [
  {
    slug: 'lakewood',
    name: 'Lakewood',
    population: '~155,000',
    metaTitle: "HVAC Repair & Installation in Lakewood, CO | Lou's Heating & Cooling",
    metaDescription:
      "Local HVAC service in Lakewood, CO. Based at 1880 S Pierce St. AC repair, furnace repair, swamp cooler service. Honest, flat-rate pricing. Call (303) 949-8584.",
    h1: 'HVAC Repair & Installation in Lakewood, CO',
    intro:
      "Lou's Heating & Cooling is based right here in Lakewood. Our shop is at 1880 S Pierce St #5, just south of Mississippi, which means we're across town in minutes for most Lakewood addresses. We've been serving Lakewood homes since 2014, and many of our customers are repeat business or referrals from neighbors. Local matters when your AC fails on a 95-degree afternoon.",
    neighborhoods: ['Belmar', 'Green Mountain', 'Glennon Heights', 'Eiber', 'Two Creeks', 'Applewood', 'Lakewood Country Club', 'Bear Creek'],
    housingNote:
      "A lot of Lakewood was built between 1955 and 1985, which means we see a lot of original-era furnaces hitting end of life and original ductwork that was sized for smaller, less efficient equipment. We do honest evaluations: if your 25-year-old furnace has another five years in it with a $200 repair, that's what we'll tell you.",
    localAngle:
      "Lakewood's water is on the harder side, which accelerates mineral buildup on swamp cooler pads and water pumps. We see it every spring during startup season. We replace pads and clean reservoirs as part of every spring startup so you're getting the cooling you paid for.",
    specialty: 'Local HQ — fastest response times in Lakewood',
    relatedReviewIds: [1, 4, 6],
    mapEmbedQuery: 'Lakewood+CO',
    isHQ: true,
  },
  {
    slug: 'denver',
    name: 'Denver',
    population: '~715,000',
    metaTitle: "HVAC Repair & Installation in Denver, CO | Lou's Heating & Cooling",
    metaDescription:
      "HVAC service across Denver: AC repair, furnace repair, swamp cooler service, 24/7 emergency. Honest diagnosis, flat-rate pricing. Call (303) 949-8584.",
    h1: 'HVAC Repair & Installation in Denver, CO',
    intro:
      "Denver is a big, diverse city, and the HVAC needs vary block by block. A 1900s Victorian in Capitol Hill has very different requirements from a modern infill in RiNo. We've worked across most of Denver since 2014, and we know what to expect in each neighborhood — original radiator systems in older homes, swamp coolers retrofitted into mid-century houses, and high-efficiency installs going into new construction in Stapleton and Lowry.",
    neighborhoods: ['Capitol Hill', 'Highlands', 'Park Hill', 'Wash Park', 'RiNo', 'Cherry Creek', 'Stapleton / Central Park', 'Five Points', 'Sloans Lake', 'Berkeley'],
    housingNote:
      "Denver's housing stock is some of the most varied in the metro: from 120-year-old Victorians with steam radiators to brand-new condos with high-efficiency heat pumps. We size every system for the actual home — not a generic square-footage rule — and we account for Denver's altitude in every calculation.",
    localAngle:
      "Many Denver homes still have working swamp coolers (a great fit for our dry climate), but they need annual startup and shutdown. We handle both, plus the seasonal switch over to AC during monsoon weeks in July and August. If your home has both systems, we keep them both running smoothly.",
    specialty: 'Largest service area — full Denver metro coverage',
    relatedReviewIds: [2, 3, 8],
    mapEmbedQuery: 'Denver+CO',
  },
  {
    slug: 'wheat-ridge',
    name: 'Wheat Ridge',
    population: '~32,000',
    metaTitle: "HVAC Repair & Installation in Wheat Ridge, CO | Lou's Heating & Cooling",
    metaDescription:
      "HVAC repair and installation in Wheat Ridge. Mid-century home specialists. Honest diagnosis, flat-rate pricing, free installation estimates. Call (303) 949-8584.",
    h1: 'HVAC Repair & Installation in Wheat Ridge, CO',
    intro:
      "Wheat Ridge has some of the best mid-century housing stock on the Front Range, and a lot of those homes still have HVAC equipment from the 1970s or 1980s. We've worked on more Wheat Ridge furnaces than we can count. The good news: a well-built older furnace with proper maintenance can deliver another decade of reliable service. The honest news: when one is genuinely at end of life, we'll tell you straight.",
    neighborhoods: ['Applewood', 'Lakeside', 'Wheat Ridge Greenbelt', 'Hillside', 'Paramount Heights', 'Crown Hill'],
    housingNote:
      "Most of Wheat Ridge's residential building boom happened between 1955 and 1975. Original ductwork in those homes was often sized for less efficient equipment, and original outdoor AC units (where they exist) are typically undersized for modern comfort expectations. We look at the whole system, not just the symptom in front of us.",
    localAngle:
      "Wheat Ridge is close enough to our Lakewood shop that we can usually be there same day for service calls. We're regulars in Applewood and the Greenbelt-adjacent neighborhoods.",
    specialty: 'Mid-century home expertise — original equipment evaluations',
    relatedReviewIds: [11, 13],
    mapEmbedQuery: 'Wheat+Ridge+CO',
  },
  {
    slug: 'arvada',
    name: 'Arvada',
    population: '~125,000',
    metaTitle: "HVAC Repair & Installation in Arvada, CO | Lou's Heating & Cooling",
    metaDescription:
      "HVAC service in Arvada from Olde Town to Candelas. AC, furnace, swamp cooler, 24/7 emergency. Honest diagnosis, flat-rate pricing. Call (303) 949-8584.",
    h1: 'HVAC Repair & Installation in Arvada, CO',
    intro:
      "Arvada is a tale of two cities, HVAC-wise: Olde Town and the older neighborhoods around it have a lot of mid-century homes with aging equipment, while newer developments like Candelas and the areas off Indiana have newer high-efficiency systems. We work both ends comfortably — we'll do an honest repair-vs-replace evaluation in an older Arvada home, and we'll size and install a new high-efficiency system properly in a newer one.",
    neighborhoods: ['Olde Town Arvada', 'Candelas', 'Lake Arbor', 'Standley Lake', 'Whisper Creek', 'West Woods'],
    housingNote:
      "Older parts of Arvada (north and east of Olde Town) often have homes from the 1950s-70s with original ductwork. Newer subdivisions to the west and northwest typically have homes from 2000+ with appropriately sized ducting. The right approach depends on the era.",
    localAngle:
      "Arvada is a quick drive from our Lakewood shop, so emergency response times are good. We've seen the full range of HVAC scenarios across the city.",
    specialty: 'Old + new Arvada — honest evaluations across housing eras',
    relatedReviewIds: [7, 12],
    mapEmbedQuery: 'Arvada+CO',
  },
  {
    slug: 'golden',
    name: 'Golden',
    population: '~21,000',
    metaTitle: "HVAC Repair & Installation in Golden, CO | Lou's Heating & Cooling",
    metaDescription:
      "HVAC in Golden, CO. Foothills altitude expertise, hail-prone outdoor units, older near-campus homes. Honest, flat-rate. Call (303) 949-8584.",
    h1: 'HVAC Repair & Installation in Golden, CO',
    intro:
      "Golden sits right at the foot of the mountains, and that location creates a few HVAC challenges that flatter parts of the metro don't see as much: more dramatic temperature swings, more wind, more hail on outdoor AC units, and slightly higher altitude than Denver itself (5,675 ft versus 5,280 ft). All of that matters when sizing equipment and diagnosing performance issues. We've worked in Golden for years and know what to look for.",
    neighborhoods: ['Downtown Golden', 'North Table Mountain', 'Pleasant View', 'South Golden', 'Mines campus area'],
    housingNote:
      "Many older homes near downtown Golden and the Mines campus were built between 1900 and 1950, and they have idiosyncratic heating systems — old gravity furnaces, retrofitted forced-air, original radiators. We treat each system on its own terms, not a one-size approach.",
    localAngle:
      "Hail is a real factor in Golden. Outdoor AC condenser coils take a beating in spring and summer hail storms. We assess hail damage during service calls and can recommend coil straightening (often) or replacement (sometimes) — straight talk on what's actually needed.",
    specialty: 'Foothills altitude expertise + hail-damage assessments',
    relatedReviewIds: [9, 14],
    mapEmbedQuery: 'Golden+CO',
  },
];

export const getCityBySlug = (slug: string) => cityPages.find(c => c.slug === slug);
