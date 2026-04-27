// src/content/services.ts

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  symptoms: string[];
  process: { step: string; detail: string }[];
  reviewIds: number[];
  relatedSlugs: string[];
}

export const services: Service[] = [
  {
    slug: 'ac-repair',
    title: 'Air Conditioning Repair',
    shortTitle: 'AC Repair',
    icon: '/images/service-icon-snowflake.png',
    description: 'Fast diagnosis and honest repair for any AC system in the Denver metro.',
    h1: 'Air Conditioning Repair in Denver, CO',
    metaTitle: "AC Repair Denver CO | Lou's Heating & Cooling | (303) 949-8584",
    metaDescription:
      "Same-day AC repair in Denver. Honest diagnosis, flat rate pricing, no upselling. Call Lou's Heating & Cooling at (303) 949-8584.",
    intro: `When your AC stops cooling in the middle of a Denver summer, you need someone who shows up fast, tells you exactly what's wrong, and fixes it for a fair price. That's what Lou's Heating & Cooling does. We've been repairing air conditioning systems across the Denver metro since 2014. No surprise charges, no pushing you toward a replacement you don't need.`,
    symptoms: [
      "Your home isn't reaching the temperature on the thermostat",
      'AC is running constantly but the house stays warm',
      'Warm or room-temperature air blowing from vents',
      'Unusual noises: banging, clicking, grinding, or hissing',
      'Ice forming on the outdoor unit or refrigerant lines',
      'Water pooling around the indoor air handler',
      'Energy bills suddenly higher than usual',
      "AC won't turn on at all",
    ],
    process: [
      {
        step: 'Call or schedule',
        detail:
          "Call (303) 949-8584 and we'll get you on the schedule. Same day when possible.",
      },
      {
        step: 'Diagnosis',
        detail:
          "Lou (or Nester) arrives and does a full diagnostic. We check refrigerant levels, electrical components, capacitors, contactors, and coils. We tell you what we find. No mystery charges.",
      },
      {
        step: 'Flat-rate quote',
        detail:
          "Before we touch anything, you get a flat-rate price. What we quote is what you pay. No surprises.",
      },
      {
        step: 'Repair',
        detail:
          'We fix it on the spot when parts are available. Most repairs are completed same visit.',
      },
      {
        step: 'Test and explain',
        detail:
          "We run the system, confirm it's cooling properly, and explain what we did and how to prevent the issue in the future.",
      },
    ],
    reviewIds: [3, 4, 5, 18, 22],
    relatedSlugs: ['ac-replacement', 'maintenance', 'emergency'],
  },
  {
    slug: 'ac-replacement',
    title: 'Air Conditioning Replacement & Installation',
    shortTitle: 'AC Installation',
    icon: '/images/service-icon-snowflake.png',
    description: 'New AC installation from an Authorized Carrier Dealer with a 10-year warranty.',
    h1: 'Air Conditioning Replacement & Installation in the Denver Metro',
    metaTitle:
      "AC Installation Denver Metro | Authorized Carrier Dealer | Lou's Heating & Cooling",
    metaDescription:
      "New AC installation across the Denver metro from an Authorized Carrier Dealer. 10-year warranty, free in-home estimate. Call (303) 949-8584.",
    intro: `Replacing an AC unit is one of the bigger investments a Denver-metro homeowner makes. You deserve straight talk about what you actually need, not what generates the biggest commission. Lou's Heating & Cooling is an Authorized Carrier Dealer, which means we install one of the most established and reliable HVAC brands on the market and back it with a 10-year extended warranty. We size every system correctly for Denver's altitude and climate, something cookie-cutter quotes often get wrong.`,
    symptoms: [
      'Your AC system is 15+ years old',
      'Repair costs are approaching or exceeding 50% of replacement cost',
      'The system uses R-22 refrigerant (phased out in 2020, now expensive to service)',
      'Your home has persistent hot and cold spots even after repairs',
      'Energy bills keep climbing year over year',
      'The system needs frequent repairs (more than once per season)',
      "Humidity control is poor (Denver's dry climate can mask this)",
    ],
    process: [
      {
        step: 'Free in-home estimate',
        detail:
          "We visit your home, measure the space, evaluate your ductwork, and do a proper load calculation, not just a guess based on square footage. Denver's altitude changes sizing requirements.",
      },
      {
        step: 'Equipment recommendation',
        detail:
          'We recommend the right size and efficiency level for your home and budget. As an Authorized Carrier Dealer, we can access a full range of equipment with competitive warranties.',
      },
      {
        step: 'Installation day',
        detail:
          'Most single-system replacements are completed in one day. We remove the old equipment, install the new system, and test everything before we leave.',
      },
      {
        step: 'Walkthrough',
        detail:
          'We show you how the new system works, go over the thermostat settings, and answer all your questions.',
      },
      {
        step: 'Warranty registration',
        detail:
          "We register your 10-year extended warranty so you're protected from day one.",
      },
    ],
    reviewIds: [20],
    relatedSlugs: ['ac-repair', 'maintenance'],
  },
  {
    slug: 'furnace-repair',
    title: 'Furnace Repair',
    shortTitle: 'Furnace Repair',
    icon: '/images/service-icon-fire.png',
    description:
      'Furnace not heating? We diagnose honestly and fix fast. 24/7 service available.',
    h1: 'Furnace Repair in Denver, CO',
    metaTitle: "Furnace Repair Denver CO | 24/7 Service | Lou's Heating & Cooling",
    metaDescription:
      "Furnace repair in Denver, available 24/7. Honest diagnosis, flat rate pricing. Call Lou's Heating & Cooling at (303) 949-8584.",
    intro: `A furnace that quits in a Denver winter isn't just uncomfortable; it's a genuine emergency. Denver's winter design temperature sits around 1-5°F, and temperatures can swing 40+ degrees in a single day. When your furnace stops working, you need someone who picks up the phone, shows up fast, and tells you exactly what's wrong. Lou's Heating & Cooling has been handling furnace repairs across the Denver metro since 2014. We answer calls 24/7 because we know furnaces don't care what time it is.`,
    symptoms: [
      "Furnace won't turn on",
      'Blowing cold or lukewarm air instead of heat',
      'Furnace cycles on and off frequently (short-cycling)',
      'Unusual smells: burning, musty, or gas-like odors',
      'Strange noises: banging, rattling, squealing, or rumbling',
      "Pilot light or igniter issues (won't stay lit)",
      'Yellow or orange pilot flame instead of blue',
      'Carbon monoxide detector alarming near the furnace',
      'Dramatically higher gas bills without usage change',
    ],
    process: [
      {
        step: 'Call us, 24/7',
        detail:
          'Call (303) 949-8584 any time. We answer emergency calls around the clock.',
      },
      {
        step: 'Safety check first',
        detail:
          'We check for carbon monoxide, gas leaks, and combustion safety before diagnosing the performance issue. Safety always comes first.',
      },
      {
        step: 'Full diagnosis',
        detail:
          "We inspect the heat exchanger, burners, igniter, flame sensor, blower motor, and controls. We tell you what we found in plain language.",
      },
      {
        step: 'Flat-rate quote',
        detail: 'You get a price before we start any work. No hourly surprises.',
      },
      {
        step: 'Repair and test',
        detail:
          'We fix it and run the system through a full heating cycle to confirm everything is working correctly and safely.',
      },
    ],
    reviewIds: [8, 9, 19, 21],
    relatedSlugs: ['furnace-replacement', 'maintenance', 'emergency'],
  },
  {
    slug: 'furnace-replacement',
    title: 'Furnace Replacement & Installation',
    shortTitle: 'Furnace Installation',
    icon: '/images/service-icon-fire.png',
    description:
      "New furnace installation sized correctly for Denver's altitude and climate.",
    h1: 'Furnace Replacement & Installation in the Denver Metro',
    metaTitle:
      "Furnace Installation Denver Metro | Authorized Carrier Dealer | Lou's Heating & Cooling",
    metaDescription:
      "New furnace installation across the Denver metro. Properly sized for Colorado altitude. Authorized Carrier Dealer. Free estimate: (303) 949-8584.",
    intro: `Installing a furnace in Denver isn't the same as installing one in Dallas or Atlanta. Denver sits at 5,280 feet, and altitude derating means gas furnaces deliver roughly 80% of their rated BTU output compared to sea level. If a company sizes your furnace without accounting for altitude, you'll end up with an undersized system that runs constantly and can't keep up on the coldest days. Lou's Heating & Cooling does it right. We calculate the actual heating load for your home, account for Denver's altitude, and install equipment that will keep you comfortable through a Colorado winter.`,
    symptoms: [
      'Furnace is 15-20+ years old (average furnace lifespan is 15-20 years)',
      'Repair costs exceed 50% of replacement cost',
      "The system struggles to maintain temperature on very cold days",
      "Multiple zone temperature differences that repairs haven't resolved",
      'Cracked heat exchanger (a safety issue requiring immediate replacement)',
      'Your system was improperly sized when originally installed',
    ],
    process: [
      {
        step: 'Free in-home estimate',
        detail:
          "We visit your home and perform a proper load calculation using Manual J methodology, accounting for Denver's altitude, your home's insulation, and square footage.",
      },
      {
        step: 'Recommendation',
        detail:
          "We recommend the right furnace for your home, not the most expensive one. As an Authorized Carrier Dealer, we offer a full range of efficiency levels and configurations.",
      },
      {
        step: 'Installation',
        detail:
          'Most furnace replacements are completed in a single day. We handle the old unit removal, new installation, and all connections.',
      },
      {
        step: 'Combustion testing',
        detail:
          'Every new furnace installation includes a combustion safety test and CO measurement before we consider the job done.',
      },
      {
        step: 'Warranty registration',
        detail:
          'We register your 10-year extended equipment warranty and explain your 5-year workmanship warranty.',
      },
    ],
    reviewIds: [8, 19],
    relatedSlugs: ['furnace-repair', 'maintenance'],
  },
  {
    slug: 'maintenance',
    title: 'HVAC Maintenance & Tune-Ups',
    shortTitle: 'Maintenance',
    icon: '/images/service-icon-fan.png',
    description: 'Seasonal tune-ups that prevent breakdowns and extend equipment life.',
    h1: 'HVAC Maintenance & Tune-Ups in the Denver Metro',
    metaTitle:
      "HVAC Tune-Up Denver CO | Seasonal Maintenance | Lou's Heating & Cooling",
    metaDescription:
      "HVAC maintenance and seasonal tune-ups in Denver. Prevent breakdowns, extend equipment life. Schedule at (303) 949-8584.",
    intro: `The most expensive HVAC repair is the emergency one at 2am in January. Most of those calls could have been prevented with a proper seasonal tune-up. At Lou's Heating & Cooling, a maintenance visit isn't a box-checking exercise. It's a real inspection by someone who knows what to look for. We check the things that fail, not just the things that are easy to test. At Denver's altitude, filters clog faster due to particulate, mountain dust, and wildfire smoke. We adjust our recommendations for Colorado conditions.`,
    symptoms: [
      "It's been over a year since your last HVAC service",
      'Energy bills are creeping up without usage changes',
      'Your system is making new or louder sounds than before',
      "You're approaching the start of heating or cooling season",
      'Your equipment warranty requires annual maintenance to remain valid',
    ],
    process: [
      {
        step: 'Schedule before the season',
        detail:
          'Book your furnace tune-up in fall (September-October) and AC tune-up in spring (April-May) before the rush.',
      },
      {
        step: 'Full system inspection',
        detail:
          'We check every major component: heat exchanger, burners, igniter, capacitors, contactors, refrigerant charge, coil condition, blower motor, and filter status.',
      },
      {
        step: 'Cleaning',
        detail:
          'We clean burners, flame sensors, drain lines, and coils as needed. Clean components run more efficiently and last longer.',
      },
      {
        step: 'Report',
        detail:
          "We tell you what we found, what's in good shape, and what to watch. No upselling. If something needs attention, we'll tell you why.",
      },
      {
        step: 'Filter recommendation',
        detail:
          "Denver's air quality (altitude, wildfire smoke seasons) means filters here should be changed every 60-90 days instead of the standard 90-120.",
      },
    ],
    reviewIds: [3, 11],
    relatedSlugs: ['ac-repair', 'furnace-repair'],
  },
  {
    slug: 'swamp-cooler',
    title: 'Swamp Cooler (Evaporative Cooler) Service',
    shortTitle: 'Swamp Cooler',
    icon: '/images/service-icon-water.png',
    description:
      "Swamp cooler startup, shutdown, repair, and replacement. Denver's evaporative cooling specialist.",
    h1: 'Swamp Cooler Service in Denver, CO',
    metaTitle:
      "Swamp Cooler Repair Denver CO | Evaporative Cooler Service | Lou's Heating & Cooling",
    metaDescription:
      "Swamp cooler repair, startup, and replacement in Denver. Evaporative cooling experts since 2014. Call (303) 949-8584.",
    intro: `Swamp coolers are a Denver thing. In most of the country, evaporative cooling isn't practical, too humid. But Denver's semi-arid climate (average humidity 30-40% in summer, lower in spring and fall) makes evaporative coolers an efficient, low-cost alternative to central AC. When the dewpoint is below 55°F, a properly maintained swamp cooler can cool your home for a fraction of the electricity cost of a refrigerated AC system. Lou's Heating & Cooling knows swamp coolers: startups, shutdowns, repairs, and full replacements.`,
    symptoms: [
      "Cooler runs but doesn't noticeably lower temperature",
      "Water pump not working (water not flowing to pads)",
      "Pads are old, stiff, or mineralized (Denver's hard water accelerates this)",
      'Motor making grinding or squealing noises',
      'Water leaking from the unit',
      'Musty or mineral smell when cooler is running',
      "Cooler hasn't been started up or shut down for the season properly",
    ],
    process: [
      {
        step: 'Spring startup',
        detail:
          'We install fresh pads, check the water pump and float valve, inspect the motor and belt, clean the reservoir, and run a test cycle. Most startup visits take 45-60 minutes.',
      },
      {
        step: 'Fall shutdown',
        detail:
          'We drain the water lines (critical to prevent freeze damage in Colorado), winterize the unit, and cover or close off the duct to prevent cold air infiltration.',
      },
      {
        step: 'Repair',
        detail:
          'From a failed pump to a burned-out motor, we diagnose and repair on-site. Most parts are available same-day.',
      },
      {
        step: 'Replacement',
        detail:
          'If your unit is beyond repair or you want to upgrade capacity, we handle full swamp cooler replacements.',
      },
    ],
    reviewIds: [6, 7, 17],
    relatedSlugs: ['ac-repair', 'maintenance'],
  },
  {
    slug: 'emergency',
    title: '24/7 Emergency HVAC Service',
    shortTitle: 'Emergency',
    icon: '/images/service-icon-fire.png',
    description:
      "HVAC emergencies happen any time. Lou's answers the phone 24/7 across the Denver metro.",
    h1: '24/7 Emergency HVAC Service in Denver, CO',
    metaTitle: "Emergency HVAC Denver CO | 24/7 Service | Call (303) 949-8584",
    metaDescription:
      "Emergency HVAC service in Denver, available 24/7. No heat or AC? Call Lou's Heating & Cooling right now: (303) 949-8584.",
    intro: `HVAC systems don't fail on weekdays at 10am. They fail at midnight on the coldest night of the year, or during a 100°F heat wave on a Saturday. Lou's Heating & Cooling is available 24 hours a day, 7 days a week, including holidays. We understand that a furnace failure at 11pm with a family in the house is a real emergency, not a "leave a message and we'll call you Monday" situation.`,
    symptoms: [
      'No heat in freezing temperatures',
      'No cooling during a heat event',
      'Gas smell near furnace or HVAC equipment (call gas company first, then us)',
      'Carbon monoxide alarm going off near furnace',
      "Complete system failure, won't power on",
      'Flooding from condensate or water heater near HVAC equipment',
    ],
    process: [
      {
        step: 'Call us now',
        detail:
          "Call (303) 949-8584. A real person answers or calls you back immediately. We don't use an answering service that schedules you for next week.",
      },
      {
        step: 'Safety first',
        detail:
          'For gas smells: leave the building and call your gas company (Xcel Energy: 1-800-895-2999) before calling us. For CO alarms: evacuate and call 911 first.',
      },
      {
        step: 'Rapid response',
        detail:
          'We aim to reach you within 2-4 hours for emergency calls in the Denver metro area, depending on location and time of night.',
      },
      {
        step: 'Honest diagnosis',
        detail:
          "Even at 2am, we give you the straight story. We tell you what's wrong, what it costs to fix, and whether a repair or temporary solution makes more sense.",
      },
    ],
    reviewIds: [1, 9, 18],
    relatedSlugs: ['furnace-repair', 'ac-repair'],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find(s => s.slug === slug);
