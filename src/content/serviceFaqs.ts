// src/content/serviceFaqs.ts
// Per-service FAQs surfaced on each /services/[slug]/ page and emitted as FAQPage schema.

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export const serviceFaqs: Record<string, ServiceFAQ[]> = {
  'ac-repair': [
    {
      question: 'How fast can you respond when my AC stops cooling?',
      answer: 'Call us for current service availability. For emergencies, we discuss your location and situation and provide an estimated arrival time before scheduling.',
    },
    {
      question: "Will I need a new AC unit if it's blowing warm air?",
      answer: 'Probably not. The most common causes are low refrigerant, a failed capacitor, or a frozen coil from a dirty filter — all repairs, not replacements. We diagnose first and only recommend replacement when the math actually supports it.',
    },
    {
      question: 'How much does AC repair typically cost in Denver?',
      answer: 'The diagnostic call-out is $129. Repair pricing depends on the issue and the work required; we explain the findings and quote the repair before work begins.',
    },
    {
      question: 'Do you charge a service call fee?',
      answer: 'Yes. The diagnostic call-out is $129. Ask the team about the fee and any applicable offer when scheduling; replacement estimates are free.',
    },
  ],
  'ac-replacement': [
    {
      question: 'How do I know if I need a new AC vs. just a repair?',
      answer: 'The 50% rule: if a repair costs more than half what a new unit would cost, replacement usually wins. Age matters too — units 12+ years old needing major repairs are typically better replaced than fixed.',
    },
    {
      question: 'How long does AC installation take?',
      answer: 'We provide an estimated installation schedule with your written quote based on the equipment, access and agreed work. Lou’s does not provide ductwork services.',
    },
    {
      question: 'What size AC do I need for my home?',
      answer: "Proper sizing depends on more than square footage. A Manual J load calculation accounts for insulation, windows, ceiling height, and Denver's altitude (which derates capacity ~15%). Anyone sizing only by square footage is doing it wrong.",
    },
    {
      question: 'Are there rebates for high-efficiency AC units in Colorado?',
      answer: 'Programs and eligibility change. Check current utility and government guidance for your equipment and installation date before relying on a rebate or tax incentive.',
    },
  ],
  'furnace-repair': [
    {
      question: 'Why is my furnace blowing cold air?',
      answer: 'Most often a tripped high-limit switch from overheating (commonly caused by a clogged filter). Other causes: pilot or igniter failure, a faulty flame sensor, or a thermostat issue. Change the filter first; if cold air persists, call us at (303) 949-8584.',
    },
    {
      question: 'Are you available 24/7 for furnace emergencies?',
      answer: 'Call our emergency line any time. The team will discuss the situation, confirm availability and provide an estimated arrival time.',
    },
    {
      question: 'How much does furnace repair typically cost?',
      answer: 'The diagnostic call-out is $129. We explain the problem and provide a repair quote before work starts. Replacement estimates are free.',
    },
    {
      question: 'Will you check carbon monoxide as part of the diagnosis?',
      answer: 'Yes — every furnace service includes combustion safety checks: heat exchanger inspection, CO measurement at registers, and gas pressure verification. Safety always comes before performance diagnosis.',
    },
  ],
  'furnace-replacement': [
    {
      question: 'How long does a furnace last in Denver?',
      answer: '15-20 years is the typical range for a gas furnace. Well-maintained units can run 25+, neglected ones fail at 10. At the 15-year mark an evaluation is worth it so you\'re not facing emergency replacement in January.',
    },
    {
      question: "What's the cost range for a new furnace install in Denver?",
      answer: 'We provide a free, job-specific replacement estimate for Carrier and American Standard furnace options. Your equipment and agreed installation scope determine the written quote.',
    },
    {
      question: 'Do you handle permits and inspections?',
      answer: "Yes. All furnace installations in Colorado require permits, and our installations include permit work and final inspections. You don't have to chase paperwork or coordinate with the city.",
    },
    {
      question: 'What efficiency level should I get?',
      answer: 'For most Denver homes, a 96% AFUE two-stage or variable-speed furnace is the sweet spot — efficient enough to qualify for Xcel rebates, durable, and well-suited to our long heating season. Single-stage 80% AFUE units are budget options for milder use cases.',
    },
  ],
  maintenance: [
    {
      question: 'How often should I tune up my HVAC?',
      answer: 'Once per year for each system: furnace tune-up in fall (September-October), AC tune-up in spring (April-May). Annual service is also required by most manufacturers to keep parts warranties valid.',
    },
    {
      question: "What's included in a tune-up?",
      answer: 'Furnace: burner cleaning, igniter/flame-sensor check, blower test, gas pressure measurement, flue inspection, full cycle test. AC: refrigerant pressure check, coil inspection and cleaning, capacitor and contactor test, blower check, performance test. Detailed report at the end.',
    },
    {
      question: 'Do I really need annual maintenance?',
      answer: "Yes — emergency repairs cost 2-4× what a tune-up costs, and most breakdowns we see were preventable. In Denver's climate where systems run hard in both heating and cooling seasons, the math always favors maintenance.",
    },
  ],
  'swamp-cooler': [
    {
      question: 'When should I switch from my swamp cooler to AC?',
      answer: 'When the outdoor dewpoint hits 55°F or higher (any weather app shows it). In Denver that\'s typically mid-July through August during monsoon weeks. Spring, early summer, and fall are reliable swamp-cooler season.',
    },
    {
      question: 'How much does swamp cooler startup cost?',
      answer: 'Call for a quote based on your cooler and the seasonal work needed. The team will explain the scope and pricing before scheduling.',
    },
    {
      question: 'Why is my swamp cooler not cooling well?',
      answer: "Usually one of: old or mineralized pads (Denver's hard water accelerates this), a failed water pump, a clogged float valve, or low water flow. We diagnose and fix on the spot in most cases — most parts are stocked.",
    },
    {
      question: 'Can you replace my swamp cooler?',
      answer: 'We can discuss a swamp-cooler replacement and confirm the equipment and installation scope. Lou’s does not offer ductwork services.',
    },
  ],
  emergency: [
    {
      question: 'What counts as an HVAC emergency?',
      answer: 'No heat in freezing temperatures, no AC during a heat event, gas smell near the furnace, CO alarm activation, or a system that won\'t power on at all. For gas smells, leave the house and call your gas company first. For CO alarms, evacuate and call 911.',
    },
    {
      question: 'How fast can you get to me at night?',
      answer: 'Call us to discuss the emergency. Arrival estimates depend on your location, the situation and current availability; we confirm the next step with you.',
    },
    {
      question: 'Will I pay extra for emergency service?',
      answer: "Emergency calls carry a modest after-hours premium over our normal service rates — we tell you exact pricing on the phone before we head out. No mystery surcharges added afterward.",
    },
  ],
};

export const getFaqsForService = (slug: string): ServiceFAQ[] => serviceFaqs[slug] || [];
