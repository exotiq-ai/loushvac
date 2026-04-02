// src/content/faq.ts

export type FAQTier = 'basics' | 'decisions' | 'expert';

export interface FAQItem {
  id: string;
  tier: FAQTier;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  // ---------------------------------------------------------------------------
  // TIER 1: basics — Homeowner basics (20 questions)
  // ---------------------------------------------------------------------------
  {
    id: 'filter-change-frequency',
    tier: 'basics',
    question: 'How often should I change my air filter?',
    answer: `Standard advice says every 90 days, but in Denver, I'd say every 60 days is more accurate — and every 30-45 days if you have pets or during wildfire smoke season. At 5,280 feet, our air carries more fine particulate than lower-elevation cities, and summer wildfire smoke clogs filters fast. A dirty filter makes your system work harder, raises energy bills, and can cause the system to overheat and shut down. Check your filter monthly. If you hold it up to a light and can't see through it, change it.`,
  },
  {
    id: 'thermostat-settings',
    tier: 'basics',
    question: 'What temperature should I set my thermostat in winter and summer?',
    answer: `In Denver winters, most families are comfortable at 68-70°F while home and 62-65°F while away or sleeping. That said, Denver's dry air at altitude means 68°F here can feel warmer than 68°F in a humid city — your body loses heat more slowly in dry air. In summer, 74-76°F is comfortable for most people, though Denver's low humidity means you'll feel cooler than that setting suggests. Every home is different. The key thing: don't set big temperature swings thinking you'll save money — dropping to 55°F overnight and heating back to 70°F in the morning actually uses more energy than holding a stable 65°F.`,
  },
  {
    id: 'furnace-blowing-cold-air',
    tier: 'basics',
    question: 'Why is my furnace blowing cold air?',
    answer: `A few different things cause this. The most common is a tripped high-limit switch — your furnace overheated (often from a clogged filter) and shut off the burners as a safety measure, but the blower keeps running to cool things down. Change the filter and see if it clears up. Other causes: pilot light or igniter failure, a faulty flame sensor that keeps shutting off the gas, or a broken thermostat. If the cold air continues after a filter change, give us a call at (303) 949-8584 and we'll figure it out.`,
  },
  {
    id: 'ac-not-cooling',
    tier: 'basics',
    question: 'Why is my AC running but not cooling?',
    answer: `The most common culprits: low refrigerant (usually means a leak somewhere in the system), a dirty air filter restricting airflow, frozen evaporator coils (often caused by low airflow or low refrigerant), a failing capacitor or contactor, or simply an undersized system struggling on a 95°F day. Denver's altitude means AC systems are already working against lower air density — a system that was borderline adequate at sea level is definitely undersized here. Turn the system off and let the coils thaw if you see ice, then check the filter. If it still won't cool, call us.`,
  },
  {
    id: 'auxiliary-heat',
    tier: 'basics',
    question: "What does it mean when my thermostat says 'auxiliary heat'?",
    answer: `If you have a heat pump, auxiliary heat (or 'aux heat') kicks in when the heat pump can't meet the heating demand on its own. This happens in very cold weather (below about 35-40°F) or when the thermostat is set significantly higher than the current indoor temperature. Aux heat is typically electric resistance heating — expensive to run. A little aux heat on a -5°F Denver morning is normal. If it's running constantly even when temperatures aren't extreme, your heat pump may be undersized or have a problem. Worth having it checked.`,
  },
  {
    id: 'furnace-lifespan',
    tier: 'basics',
    question: 'How long does a furnace typically last?',
    answer: `15 to 20 years is the standard range for a gas furnace, but I've seen well-maintained furnaces run 25 years and neglected ones fail at 10. The biggest factor is maintenance — annual tune-ups catch the small problems before they become big ones. In Denver, we see slightly more wear because systems run longer heating seasons. When a furnace hits 15 years, it's worth having it evaluated even if it's running fine, so you're not facing an emergency replacement in January.`,
  },
  {
    id: 'ac-lifespan',
    tier: 'basics',
    question: 'How long does an AC unit typically last?',
    answer: `10 to 15 years is typical for a central AC system in Denver. The outdoor unit takes a beating from UV, hail (a real issue on the Front Range), and temperature swings. Well-maintained systems with annual tune-ups regularly hit 15+ years. When your AC hits 10 years and starts needing repairs, do the math: if a repair costs more than 50% of what a new unit would cost, replacement usually makes more financial sense.`,
  },
  {
    id: 'furnace-vs-heat-pump',
    tier: 'basics',
    question: "What's the difference between a furnace and a heat pump?",
    answer: `A furnace generates heat by burning gas (or propane). A heat pump moves heat — it extracts heat from outside air and brings it inside in winter, and reverses in summer to act as an AC. Heat pumps are very efficient down to about 35-40°F, but struggle in extreme cold. In Denver, with temperatures that can hit -10°F, a heat pump alone isn't always enough — most installations pair a heat pump with a backup furnace (a 'dual fuel' system). The efficiency math is changing with better cold-climate heat pumps, and Colorado's Xcel Energy offers rebates for heat pump installations. Worth discussing if you're replacing both systems.`,
  },
  {
    id: 'close-vents',
    tier: 'basics',
    question: "Should I close vents in rooms I don't use?",
    answer: `No — this is a persistent myth that actually damages your system. Your HVAC was designed to push a certain volume of air. When you close vents, you're increasing static pressure in the ductwork. This makes the blower work harder, increases energy use, can cause the heat exchanger to overheat, and stresses the whole system. If certain rooms are always too hot or cold, the real fix is duct balancing or a zoning system — not closed vents.`,
  },
  {
    id: 'ac-freezes-up',
    tier: 'basics',
    question: 'Why does my AC freeze up?',
    answer: `Two main causes: restricted airflow or low refrigerant. When air can't flow freely over the evaporator coil (dirty filter, blocked return vent, or very cold night), the coil drops below freezing and ice forms. Low refrigerant has the same effect — the coil gets too cold without enough refrigerant absorbing heat. If you see ice: turn the system to 'fan only' mode (not off, not cooling) and let the ice thaw for 2-4 hours. Change the filter. Then try cooling again. If it freezes again, you need a service call — there's likely a leak.`,
  },
  {
    id: 'seer-rating',
    tier: 'basics',
    question: "What's a SEER rating and why does it matter?",
    answer: `SEER (Seasonal Energy Efficiency Ratio) measures how efficiently an AC uses electricity. Higher SEER = less electricity to produce the same cooling. In Colorado, the minimum SEER for new equipment is 14 (recently updated to 15 SEER2 in some regions). A 16 SEER unit uses roughly 12% less electricity than a 14 SEER unit. Whether a higher SEER pays off depends on how much you run your AC and your electricity rate. Denver's mild summers (compared to Texas or Florida) mean AC run-hours are lower — a 16 SEER unit makes more economic sense in Phoenix than in Denver. That said, Xcel Energy offers rebates for high-efficiency equipment that can offset the cost difference.`,
  },
  {
    id: 'ductwork-leaking',
    tier: 'basics',
    question: "How do I know if my ductwork is leaking?",
    answer: `Signs of duct leaks: rooms that never quite reach the right temperature despite the system running, high energy bills, dusty rooms (leaks suck in attic or crawl space air), or visible damage to ductwork if you can access it. A proper duct leakage test (blower door test) can quantify it. In older Denver homes — especially those built before the 1990s — duct leakage of 20-30% isn't uncommon. We can inspect accessible ductwork during a maintenance visit and recommend duct sealing if needed.`,
  },
  {
    id: 'furnace-smell-fall',
    tier: 'basics',
    question: 'Is it normal for my furnace to smell when I first turn it on in fall?',
    answer: `A brief burning smell for 15-30 minutes when you fire up the furnace for the first time in fall is normal — you're burning off the dust that settled on the heat exchanger over summer. It should clear up quickly. What's NOT normal: a smell that persists beyond the first hour, a sulfur/rotten egg smell (potential gas leak — leave the house immediately and call your gas company), a burning plastic or electrical smell (potential wiring issue), or any smell that keeps coming back every time the furnace runs.`,
  },
  {
    id: 'swamp-cooler-vs-ac',
    tier: 'basics',
    question: "What's the difference between a swamp cooler and an AC unit?",
    answer: `A swamp cooler (evaporative cooler) works by evaporating water — hot dry air passes through wet pads, evaporation cools the air, and that cool air blows into your home. It's very energy-efficient but only works when humidity is low — which is why it's a Denver/Colorado thing. A refrigerated AC system uses a refrigerant cycle (compressor, condenser, evaporator) to extract heat from indoor air regardless of outdoor humidity. Denver's semi-arid climate makes swamp coolers effective for most of the cooling season. The exception is monsoon season (July-August), when humidity rises and swamp coolers lose effectiveness. Many Denver homeowners have both.`,
  },
  {
    id: 'swamp-cooler-switch',
    tier: 'basics',
    question: 'When should I switch from my swamp cooler to AC in Denver?',
    answer: `The rule of thumb: when the outdoor dewpoint hits 55°F or higher, a swamp cooler loses its effectiveness. You can check the dewpoint on any weather app. In Denver, this typically happens during the monsoon season (mid-July through August). During those weeks, switch to AC if you have it. In spring, early summer, and fall, stick with the swamp cooler — it's cheaper to run and works great in our dry climate. Some weeks in July are borderline — run whichever keeps you comfortable.`,
  },
  {
    id: 'hvac-sizing',
    tier: 'basics',
    question: 'What size AC/furnace do I need for my home?',
    answer: `The honest answer: it depends on a lot more than square footage. A proper sizing calculation (called Manual J load calculation) accounts for: square footage, ceiling height, insulation levels, window area and orientation, number of occupants, local climate data, and crucially for Denver — altitude. At 5,280 feet, air is about 15-16% less dense than at sea level. Gas furnaces lose ~4% BTU capacity per 1,000 feet of altitude, so a 100,000 BTU furnace here actually delivers about 80,000 BTU. AC systems also need to be upsized 10-15% compared to sea-level sizing rules. Anyone who quotes you a system size based only on square footage is doing it wrong.`,
  },
  {
    id: 'annual-maintenance',
    tier: 'basics',
    question: 'Do I really need annual HVAC maintenance?',
    answer: `Yes, and here's the practical reason: emergency repair calls are expensive and inconvenient. An annual tune-up catches failing capacitors, dirty flame sensors, refrigerant levels that are slightly off, and other small issues before they cause a breakdown. It's the difference between a $150 maintenance visit and a $600 emergency repair call at 9pm. Most manufacturer warranties also require documented annual maintenance to remain valid. In Denver's climate — with serious heating AND cooling seasons — annual service on both systems is worth it.`,
  },
  {
    id: 'tuneup-includes',
    tier: 'basics',
    question: "What's included in an HVAC tune-up?",
    answer: `At Lou's, a furnace tune-up includes: inspection and cleaning of the burners and heat exchanger, checking the igniter and flame sensor, testing the blower motor and belt, checking electrical connections, measuring gas pressure, inspecting the flue and venting, checking the filter, and a full system test cycle. An AC tune-up includes: checking refrigerant levels and pressures, inspecting and cleaning the condenser and evaporator coils, testing capacitors and contactors, checking the blower and airflow, inspecting electrical connections, and a system performance test. We tell you what we found — every component, every issue, what's fine and what needs attention.`,
  },
  {
    id: 'high-energy-bill',
    tier: 'basics',
    question: "Why is my energy bill suddenly so high?",
    answer: `For heating: a failing heat exchanger, dirty burners, a bad igniter causing multiple ignition attempts, or a blower running at the wrong speed can all cause efficiency drops. A stuck-open damper letting cold air in will also spike bills. For cooling: low refrigerant (system runs longer to hit setpoint), dirty condenser coils (common in Denver's dusty environment), a failing capacitor causing reduced motor efficiency, or a leak in the duct system. If the bill jumped suddenly — not gradually — that usually points to a component failure rather than general aging. Worth getting it checked.`,
  },
  {
    id: 'hvac-noises',
    tier: 'basics',
    question: "What's that banging/clicking/whistling noise from my HVAC?",
    answer: `Banging or clanking when the system starts: often a loose component in the blower wheel or a broken part. Clicking at startup/shutdown: normal — that's thermal expansion of the ducts. Continuous clicking: failed igniter trying to light repeatedly. Whistling or high-pitched squealing: airflow restriction (dirty filter or blocked vent) or a worn blower belt. Rattling: loose panel, debris in the unit, or a failing motor bearing. Rumbling: burner issues on a furnace. Any unusual noise that persists is worth having checked — small mechanical issues become big ones if ignored.`,
  },

  // ---------------------------------------------------------------------------
  // TIER 2: decisions — Intermediate / decision-making (15 questions)
  // ---------------------------------------------------------------------------
  {
    id: 'repair-vs-replace-ac',
    tier: 'decisions',
    question: 'Should I repair or replace my AC unit?',
    answer: `The 50% rule: if a repair costs more than 50% of what a new unit would cost, replacement usually makes more sense financially. Age matters too — if your AC is 12+ years old and needs a significant repair, you're paying for a few more years at best before the next failure. Refrigerant type is a key factor: if your system uses R-22 (Freon), which was phased out in 2020, refrigerant is increasingly expensive and hard to find. That's often the deciding factor for older systems. I'll always give you both options and my honest take on which makes more sense for your situation.`,
  },
  {
    id: 'repair-vs-replace-furnace',
    tier: 'decisions',
    question: 'Should I repair or replace my furnace?',
    answer: `Same 50% rule applies — if a repair exceeds half the cost of a new furnace, replacement is usually smarter. With furnaces, age and efficiency are key factors. An older 80% AFUE furnace versus a new 96% AFUE unit: you're losing 16 cents on every dollar of gas burned. Over a Denver heating season, that adds up. Safety is also a consideration — a cracked heat exchanger is a potential carbon monoxide hazard and always requires replacement. I'll diagnose what's wrong and give you honest numbers for both options.`,
  },
  {
    id: 'brand-recommendations',
    tier: 'decisions',
    question: 'What brands do you recommend and why?',
    answer: `Lou's Heating & Cooling is an American Standard Authorized Dealer, and I recommend them for a simple reason: reliability and warranty. American Standard equipment (same parent company as Trane) consistently ranks at the top for reliability surveys and backs their products with strong warranties — up to 10 years on parts for registered equipment. That said, most major brands — Carrier, Lennox, Bryant, Rheem — make solid equipment at their higher efficiency tiers. Where brands diverge is in the mid-range and budget tiers, and in dealer support. I'll tell you what I actually believe is right for your situation.`,
  },
  {
    id: 'single-vs-two-stage',
    tier: 'decisions',
    question: "What's the difference between a single-stage and two-stage furnace?",
    answer: `A single-stage furnace runs at 100% capacity every time it fires. A two-stage furnace runs at a lower capacity (typically 65-70%) most of the time, only ramping to 100% on the coldest days. The benefit of two-stage: quieter operation, more consistent temperatures, better humidity control, and usually lower energy bills. The trade-off: higher upfront cost. In Denver, where we have serious winter heating loads, a two-stage or variable-speed furnace is often worth the investment — you'll be running your furnace a lot, and running it efficiently matters.`,
  },
  {
    id: 'variable-speed-blower',
    tier: 'decisions',
    question: "What's a variable-speed blower and is it worth the cost?",
    answer: `A variable-speed blower motor adjusts its speed based on demand, rather than running at one or two fixed speeds. Benefits: dramatically quieter operation, more even temperature distribution, better air filtration (air moves through the filter more), improved humidity control, and lower electricity use (ECM motors use up to 75% less electricity than standard PSC motors). In Denver, where air filtration matters (wildfire smoke, dust), the improved filtration alone can be worth it for allergy sufferers. Variable-speed systems cost more upfront but typically pay back in 3-7 years through energy savings.`,
  },
  {
    id: 'what-seer-to-buy',
    tier: 'decisions',
    question: 'What SEER rating should I look for in a new AC?',
    answer: `In Colorado, I'd say 16-18 SEER is the sweet spot for most homeowners. You'll get the Xcel Energy rebate (usually kicks in at 16+ SEER), meaningful energy savings over a 15+ year lifespan, and you're not overpaying for ultra-high efficiency that takes decades to pay back. Going to 20+ SEER makes more sense in climates with very long, hot cooling seasons — Arizona, Texas, Florida. Denver's mild summers mean you won't run the system enough to recoup the premium on a 21+ SEER unit in a reasonable timeframe. I'll run the math for your specific situation.`,
  },
  {
    id: 'furnace-cost-denver',
    tier: 'decisions',
    question: 'How much does a new furnace cost in Denver?',
    answer: `Equipment and installation for a gas furnace in Denver typically ranges from $3,000 to $7,000, depending on efficiency, size, and installation complexity. An 80% AFUE single-stage unit is on the lower end; a 96% AFUE two-stage or variable-speed system with complex installation is on the higher end. Permits, ductwork modifications, and flue upgrades can add cost. Always get a written, itemized quote before committing. Lou's Heating & Cooling provides free in-home estimates — call (303) 949-8584 to schedule.`,
  },
  {
    id: 'ac-cost-denver',
    tier: 'decisions',
    question: 'How much does a new AC unit cost in Denver?',
    answer: `A new central AC installation in Denver typically runs $4,000 to $9,000 for equipment and installation. Factors: system size (tons), SEER rating, brand, whether existing ductwork needs modification, and accessibility of the installation site. High-efficiency 18+ SEER systems and complete coil/condenser replacements are at the higher end. Xcel Energy rebates for qualifying high-efficiency equipment can offset $200-$600 of that cost. Get a free in-home estimate to get an accurate number for your home: call (303) 949-8584.`,
  },
  {
    id: 'rebates-tax-credits',
    tier: 'decisions',
    question: 'What rebates or tax credits are available for new HVAC equipment?',
    answer: `Several programs apply in Colorado: Xcel Energy offers rebates for qualifying high-efficiency AC units, furnaces, and heat pumps — amounts vary and change annually, so verify current amounts at xcelenergy.com before making a decision. The federal Inflation Reduction Act (IRA) extended and expanded energy efficiency tax credits — you may be eligible for a 30% tax credit (up to $2,000) on qualifying heat pump installations. Colorado also has state-level incentives for heat pumps. These programs change frequently. I recommend checking xcelenergy.com and energystar.gov for current numbers before your purchase.`,
  },
  {
    id: 'installation-time',
    tier: 'decisions',
    question: 'How long does an AC/furnace installation take?',
    answer: `A standard furnace or AC replacement in a home with existing ductwork is usually completed in one day — typically 4-8 hours. More complex installations (new ductwork, difficult access, multi-zone systems) may require two days. A complete system replacement (both furnace and AC at the same time) is usually done in one day for a standard home. We'll give you a realistic timeframe when we provide your estimate.`,
  },
  {
    id: 'financing',
    tier: 'decisions',
    question: 'Do you offer financing?',
    answer: `We accept credit cards, which many customers use through their card's financing programs. For equipment financing, ask us about options when you schedule your estimate — we can discuss what makes sense for your situation. For a significant investment like a new furnace or AC, it's worth asking your bank or credit union about home improvement loans as well, which often have better rates than equipment financing.`,
  },
  {
    id: 'warranty-coverage',
    tier: 'decisions',
    question: "What does your warranty cover?",
    answer: `Lou's Heating & Cooling provides a 5-year workmanship warranty on all installed work. This covers labor and any issues that arise from our installation. On new equipment, we register your American Standard product warranty — up to 10 years on parts for registered equipment. The workmanship warranty and manufacturer warranty work together: if something fails due to a defective part, the manufacturer covers the part; if it fails due to installation, we cover the labor. No fine print runarounds.`,
  },
  {
    id: 'warranty-vs-manufacturer',
    tier: 'decisions',
    question: "What's the difference between your warranty and the manufacturer warranty?",
    answer: `Manufacturer warranty covers defective parts — if a compressor fails due to a manufacturing defect in year 4, American Standard covers the part cost. Our workmanship warranty covers labor for installation-related issues — if there's a refrigerant leak at a fitting we made, we cover the labor to fix it. Both are important. A manufacturer warranty without workmanship coverage means you'd pay labor costs even on installation defects. We provide both.`,
  },
  {
    id: 'heat-pump-vs-furnace',
    tier: 'decisions',
    question: 'Should I get a heat pump instead of a traditional furnace?',
    answer: `Heat pumps are increasingly viable in Denver, and with federal tax credits and Xcel rebates, the economics are improving. The honest assessment: Denver's cold winters (-5°F to -15°F possible) historically made heat pumps a tough choice — older heat pumps struggled below 30-35°F. Newer cold-climate heat pumps (rated to -13°F) have changed that. A dual-fuel system (heat pump + gas furnace backup) gives you heat pump efficiency down to ~35°F and reliable gas heat below that. If your gas furnace is aging and you're interested in heat pumps, it's worth getting a proper evaluation. I'll give you the actual numbers for your home.`,
  },
  {
    id: 'mini-split',
    tier: 'decisions',
    question: "What's a mini-split and is it right for my home?",
    answer: `A mini-split (ductless system) is a heat pump with no ductwork — the outdoor unit connects directly to one or more indoor air handlers via refrigerant lines. They're ideal for: additions or sunrooms without ductwork, garages, finished basements, or older homes where adding ducts is impractical. They're highly efficient and provide both heating and cooling. The downside: higher upfront cost per zone compared to ducted systems, and they don't solve whole-house HVAC issues. For a 1-3 zone application in a specific area of your home, a mini-split is often the right answer.`,
  },

  // ---------------------------------------------------------------------------
  // TIER 3: expert — Advanced / expert-level (13 questions)
  // ---------------------------------------------------------------------------
  {
    id: 'denver-altitude-hvac',
    tier: 'expert',
    question: "How does Denver's altitude affect HVAC performance and sizing?",
    answer: `This is something most HVAC companies in Denver handle wrong, and homeowners pay for it in comfort and energy bills. Denver sits at 5,280 feet. At that altitude, air is about 15-16% less dense than at sea level. For gas furnaces: capacity derates approximately 4% per 1,000 feet of elevation. A furnace rated at 100,000 BTU input in Denver effectively delivers about 80,000 BTU input — and after a 96% efficiency rating, you're getting around 76,800 BTU of actual heat. For AC: fans move less air mass, and heat transfer is reduced. Systems that are 'correctly sized' per sea-level calculators are typically 10-15% undersized in Denver. Ductwork also needs to be about 15% larger than sea-level calculations to compensate for lower air density.`,
  },
  {
    id: 'colorado-btu-calculations',
    tier: 'expert',
    question: "Why do HVAC systems in Colorado need different BTU calculations than sea-level states?",
    answer: `The physics: BTU capacity depends on moving a certain mass of air through the system. Air mass decreases at altitude. Less mass = less heat transfer. This affects both furnaces (combustion efficiency changes) and AC systems (compressor performance, fan airflow). The practical result: Colorado homes need 25-40 BTU per square foot for heating, versus 20-25 BTU in mild-climate states. A Manual J load calculation done by software calibrated for sea level will produce an undersized result for Denver. Every system we size is calculated with altitude as a primary input.`,
  },
  {
    id: 'evaporative-vs-refrigerated',
    tier: 'expert',
    question: "What's the impact of Denver's dry climate on evaporative coolers vs. refrigerated AC?",
    answer: `Evaporative cooling works by exploiting the energy required to evaporate water — it's highly effective when humidity is low. Denver's average summer humidity runs 20-40% RH, which is ideal for evaporative cooling. At low humidity, the evaporative process can drop air temperature 20-30°F below ambient. Compare that to humid cities (Houston: 70-80% RH) where the same physics produces almost no cooling. The efficiency advantage is significant: a swamp cooler uses 75-80% less electricity than refrigerated AC. The caveat: Denver monsoon season (July-August) brings humidity spikes. A savvy Denver homeowner watches the dewpoint and switches systems accordingly.`,
  },
  {
    id: 'front-range-temperature-swings',
    tier: 'expert',
    question: "How does the Front Range's temperature swing (hot days, cold nights) affect system cycling?",
    answer: `Denver can see a 40-50°F swing in a single day — 90°F at 2pm, 50°F by 10pm. For HVAC systems, this means: frequent transitions between heating and cooling modes, which stresses equipment more than a stable climate. Refrigerant lines and connections that expand and contract repeatedly are more prone to developing leaks. Equipment that handles this well is worth the investment. It also means 'heating season' and 'cooling season' overlap more than in other climates — there are days in May and October where you need both. A programmable or smart thermostat helps manage the transitions efficiently.`,
  },
  {
    id: 'swamp-vs-ac-when',
    tier: 'expert',
    question: "When does it make sense to run a swamp cooler vs. AC in Denver's semi-arid climate?",
    answer: `The practical rule: check the outdoor dewpoint. Below 55°F dewpoint, run the swamp cooler. Above 60°F dewpoint, run the AC. Between 55-60°F, it depends on your comfort preference. Denver's dewpoint is typically in the 30-45°F range in spring and early summer — excellent swamp cooler territory. Mid-July through August, monsoon moisture pushes dewpoint to 50-60°F, sometimes higher. Those are the weeks to run the AC. The transition matters too: on swamp cooler days, leave windows slightly open — evaporative cooling requires air exchange. On AC days, close up the house and let refrigerated cooling work.`,
  },
  {
    id: 'high-efficiency-condensing-furnace',
    tier: 'expert',
    question: "What are the pros and cons of high-efficiency condensing furnaces in Colorado's climate?",
    answer: `High-efficiency condensing furnaces (90%+ AFUE) extract so much heat from combustion gases that the exhaust actually condenses — it exits as water vapor rather than hot gas. They vent through PVC pipes rather than metal flues, which is simpler for new installations. In Colorado, there are specific considerations: the condensate can freeze in extreme cold if the drain line runs through an unheated space. Also, at Denver's altitude, even high-efficiency furnaces are derated — a 96% AFUE furnace here is delivering its efficiency at lower actual BTU output than the nameplate suggests. That said, the fuel savings are real, and the longer equipment lifespan of quality high-efficiency furnaces makes them worth it in most cases.`,
  },
  {
    id: 'ductwork-design',
    tier: 'expert',
    question: "How do I know if my home's ductwork was designed for the current HVAC load?",
    answer: `Signs of undersized or poorly designed ductwork: rooms that never reach setpoint temperature, high static pressure readings during service (we check this), the system running almost continuously without reaching setpoint, or excessive noise from the supply registers. Many Denver homes built in the 1970s-1990s have ductwork designed for smaller, less efficient systems. When we upsize a furnace or add AC to a home that only had a swamp cooler, the existing ductwork often needs evaluation. A proper duct sizing calculation (Manual D) should be part of any system replacement, not an afterthought.`,
  },
  {
    id: 'insulation-and-hvac',
    tier: 'expert',
    question: "What's the relationship between home insulation, air sealing, and HVAC sizing?",
    answer: `Your HVAC system and your building envelope are two halves of the same system. If your home is poorly insulated or leaky, you're trying to heat or cool the outside. The practical impact: a poorly sealed home in Denver might need a 100,000 BTU furnace where a well-sealed version of the same house needs 60,000 BTU. Before you replace HVAC equipment, it's worth considering whether air sealing or insulation improvements would let you install a smaller, cheaper, more efficient system. An energy audit can identify the biggest improvement opportunities. Blower door testing measures actual air leakage.`,
  },
  {
    id: 'uneven-heating-cooling',
    tier: 'expert',
    question: "Why do some Denver homes have uneven heating/cooling between floors?",
    answer: `Several causes: Heat rises, so if your ductwork doesn't compensate, upper floors are typically warmer in summer and more comfortable in winter, while lower levels struggle with cooling in summer. Duct leakage — especially in attics and crawl spaces — can rob supply air before it reaches certain rooms. Return air imbalance is a common culprit: if rooms don't have adequate return air pathways, pressure buildup restricts airflow. Under-insulated walls or windows on certain exposures create heat gain/loss patterns. The solution depends on the root cause — it might be duct sealing, damper adjustment, adding return air capacity, or zoning.`,
  },
  {
    id: 'refrigerant-changes',
    tier: 'expert',
    question: "What should I know about refrigerant changes (R-22 to R-410A to R-454B)?",
    answer: `The refrigerant landscape is changing rapidly. R-22 (Freon): phased out of production January 1, 2020. Systems that still use it are expensive to service — R-22 now costs $100-$200/lb versus $5-$10/lb historically. If you have an R-22 system, you're on borrowed time. R-410A: the replacement for R-22, widely used in equipment built 2010-2024. It's now being phased down under the AIM Act due to high global warming potential. R-454B (marketed as Puron Advance): the next-generation refrigerant, required in new equipment manufactured after January 1, 2025. If you're buying new equipment, it will use R-454B or similar low-GWP refrigerant. Your existing R-410A system can still be serviced — the transition only affects new equipment manufacturing.`,
  },
  {
    id: 'zoning-system',
    tier: 'expert',
    question: "How does a zoning system work and when is it worth the investment?",
    answer: `A zoning system divides your home into separate temperature-controlled areas, each with its own thermostat. Motorized dampers in the ductwork control airflow to each zone. In Denver homes — often multi-story with significant east/west solar exposure — zoning can dramatically improve comfort and efficiency. Worth it when: you have a large home where different floors or wings have very different conditioning needs, a home office that needs to be comfortable while you're away, or additions and sunrooms with extreme solar loads. Not worth it for: small, single-floor homes where the temperature is already even. It requires proper duct design — a poorly designed zoning system creates more problems than it solves.`,
  },
  {
    id: 'heat-exchanger',
    tier: 'expert',
    question: "What are the signs of a cracked heat exchanger and why is it dangerous?",
    answer: `The heat exchanger is the metal barrier between combustion gases (which contain carbon monoxide) and the air blown into your home. A crack means CO can enter your living space. Signs: the CO detector going off near the furnace, visible cracks or corrosion in the heat exchanger (we check this during every furnace service), soot or burn marks near the furnace housing, the flame visibly flickering when the blower turns on (combustion gases being drawn through a crack). A cracked heat exchanger is not a repair — it requires furnace replacement. I know some companies use a cracked heat exchanger as an upsell tactic, which is why I recommend getting a second opinion. But when it's real, it's genuinely dangerous.`,
  },
  {
    id: 'smart-thermostats',
    tier: 'expert',
    question: "How do smart thermostats interact with two-stage or variable-speed systems?",
    answer: `Standard thermostats send a simple on/off signal. Two-stage and variable-speed systems have additional terminals (Y2 for second-stage cooling, W2 for second-stage heating) that need to be wired correctly for the system to use its full capability. A smart thermostat installed incorrectly — or without the right wiring — can result in a two-stage furnace that only runs in first stage, or a variable-speed system that doesn't modulate. When we install a new two-stage or variable-speed system, we verify the thermostat compatibility and wiring. If you're installing a smart thermostat yourself on a multi-stage system, check the wiring carefully against the furnace's terminal documentation.`,
  },
];

export const getFAQByTier = (tier: FAQTier) => faqItems.filter(f => f.tier === tier);
export const getFAQById = (id: string) => faqItems.find(f => f.id === id);
