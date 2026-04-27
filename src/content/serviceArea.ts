// src/content/serviceArea.ts

export interface ServiceAreaCity {
  name: string;
  slug: string;
  description: string;
}

export const serviceAreaCities: ServiceAreaCity[] = [
  {
    name: 'Denver',
    slug: 'denver',
    description:
      "Lou's Heating & Cooling is based in Denver and serves the entire city, from Capitol Hill to Green Valley Ranch. Whether you're in a 1950s ranch home or a new construction property, we know Denver HVAC inside and out.",
  },
  {
    name: 'Lakewood',
    slug: 'lakewood',
    description:
      "Lakewood is one of our busiest service areas. Many Lakewood homes were built in the 1960s-1980s and have aging HVAC equipment that benefits from honest evaluation: repair when possible, replace when necessary.",
  },
  {
    name: 'Arvada',
    slug: 'arvada',
    description:
      "We serve Arvada homeowners for furnace repair, AC service, and swamp cooler maintenance. Arvada's mix of older homes and newer developments means we handle everything from vintage systems to modern high-efficiency installs.",
  },
  {
    name: 'Westminster',
    slug: 'westminster',
    description:
      "Westminster is fully within our service area. From Standley Lake to the Promenade, we respond to Westminster calls for emergency HVAC, tune-ups, and full system replacements.",
  },
  {
    name: 'Littleton',
    slug: 'littleton',
    description:
      "Littleton homeowners call us for furnace repair, AC installation, and seasonal swamp cooler service. We know the neighborhoods: Ken Caryl, Columbine, Highlands Ranch. We respond quickly.",
  },
  {
    name: 'Englewood',
    slug: 'englewood',
    description:
      "Englewood is a core part of our Denver metro service area. We handle HVAC emergencies, seasonal maintenance, and full system replacements for Englewood residents.",
  },
  {
    name: 'Aurora',
    slug: 'aurora',
    description:
      "Aurora is a large and growing city, and we serve it across its full length, from the urban areas near Denver to the newer neighborhoods in the east. Call us for any HVAC need in Aurora.",
  },
  {
    name: 'Thornton',
    slug: 'thornton',
    description:
      "Thornton homeowners trust Lou's for honest HVAC service. We cover the entire Thornton area for furnace repair, AC service, and emergency calls.",
  },
  {
    name: 'Commerce City',
    slug: 'commerce-city',
    description:
      "We serve Commerce City for all HVAC needs. Whether it's a heating emergency in January or a swamp cooler startup in May, we respond promptly.",
  },
  {
    name: 'Wheat Ridge',
    slug: 'wheat-ridge',
    description:
      "Wheat Ridge has a lot of mid-century homes with HVAC systems that need expert attention. We know these systems and we don't recommend replacements unless they're actually needed.",
  },
  {
    name: 'Golden',
    slug: 'golden',
    description:
      "Golden sits at the foot of the mountains and experiences the full range of Front Range weather extremes. We serve Golden homeowners for heating, cooling, and emergency HVAC service.",
  },
  {
    name: 'Centennial',
    slug: 'centennial',
    description:
      "Centennial is well within our service area. We handle furnace and AC service for Centennial's residential neighborhoods and respond to emergency calls throughout the city.",
  },
  {
    name: 'Evergreen',
    slug: 'evergreen',
    description:
      "Evergreen is in the mountains at 7,000+ feet, higher than Denver, which means HVAC altitude considerations are even more significant. We know mountain HVAC and serve Evergreen homeowners.",
  },
  {
    name: 'Morrison',
    slug: 'morrison',
    description:
      "Morrison and the surrounding foothill areas are within our service territory. Foothills homes often have unique HVAC challenges. We handle them.",
  },
  {
    name: 'Kittredge',
    slug: 'kittredge',
    description:
      "Kittredge sits in the mountains west of Denver. We serve Kittredge for heating service, emergency repairs, and system replacements.",
  },
  {
    name: 'Indian Hills',
    slug: 'indian-hills',
    description:
      "Indian Hills is a mountain community where a working furnace isn't optional. Temperatures can drop below zero in winter. We respond to Indian Hills emergency calls.",
  },
  {
    name: 'Idledale',
    slug: 'idledale',
    description:
      "Idledale and the Bear Creek Canyon area are within our service territory for HVAC repairs and emergency calls.",
  },
  {
    name: 'Cherry Hills Village',
    slug: 'cherry-hills',
    description:
      "We serve Cherry Hills Village for HVAC installation, service, and emergency repairs.",
  },
  {
    name: 'Louviers',
    slug: 'louviers',
    description:
      "Louviers is at the southern edge of our service area, south of Littleton. We serve Louviers for heating and cooling needs.",
  },
];

export const serviceAreaNames = serviceAreaCities.map(c => c.name);
