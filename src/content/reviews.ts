// src/content/reviews.ts

export type ReviewTier = 'hero' | 'service' | 'trust' | 'website';
export type ReviewPlatform = 'HomeAdvisor' | 'Angi' | 'Website' | 'Yelp' | 'Google';
export type ServiceCategory = 'general' | 'ac' | 'furnace' | 'swamp-cooler' | 'emergency';

export interface Review {
  id: number;
  platform: ReviewPlatform;
  reviewer: string;
  stars: number;
  text: string;
  textEs?: string;
  tier: ReviewTier;
  service?: ServiceCategory;
  note?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'hero',
    service: 'general',
    note: 'Breezair/honesty review — best hero review, contrasts Lou with big companies',
    text: `IF I COULD WOULD GIVE AT LEAST 10 STARS. I HAVE A BREEZAIR SYSTEM THAT IS STARTING TO SHOW ITS AGE. I HAD READ REVIEWS FROM OTHERS ABOUT NIGHTMARES WITH THE ELECTRONICS GOING OUT ON THEM. I WAS PREPARED TO FACE AN ENORMOUS BILL BASED ON WHAT I SEEN. LOU AND HIS PARTNER CAME OUT, DID A THOROUGH CLEANING OF THE UNIT AND HAD IT UP AND RUNNING IN NO TIME. I ASKED WHAT THE ISSUE WAS WITH THE UNIT AND WAS INFORMED IT WAS JUST A LOOSE CONNECTION. WHAT A REFRESHING RELIEF TO FIND SOMEONE SO HONEST. STUCK TO THE ORIGINAL QUOTED PRICE. VERY FRIENDLY ALSO. I CAN IMAGINE IF I HAD CALLED ONE OF THE LARGER 'SERVICE PROVIDER' COMPANIES, I WOULD HAVE BEEN INFORMED I NEED A NEW UNIT. WOULD RECOMMEND THIS COMPANY FOR ANY OF YOUR HVAC NEEDS. THANKS AGAIN FOR YOUR HONESTY.`,
  },
  {
    id: 2,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'hero',
    service: 'general',
    note: 'Superlative personal endorsement',
    text: `Lou was among the most pleasant and professional tradesman and individual I have ever hired. He did exactly what he said he would do and when he said he would do it, even going above and beyond expectations, which is a high bar. I give Lou my highest recommendation.`,
  },
  {
    id: 3,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'hero',
    service: 'ac',
    note: 'Educator angle — Lou teaches customers',
    text: `Not only was Lou prompt and meticulous, but he also educated me on how the AC system works and the best way going forward to get the most out of my system. A+`,
  },
  {
    id: 4,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'ac',
    text: `Lou was excellent! He patiently explained what was happening with our AC System and suggested the best path to get our AC up and running. He showed up first thing knowing that we were in for another 95 degree day. Very reasonable rate! I am glad to say we have found the right HVAC contractor for our home!`,
  },
  {
    id: 5,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'ac',
    text: `Honest, arrived on time and explained my issue with my AC unit in detail and his fees were very reasonable. I will always refer him to others.`,
  },
  {
    id: 6,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'swamp-cooler',
    text: `Lou did an efficient job of starting up my swamp cooler for the season. The water pump needed replacing and it was done quickly. The price was quite reasonable for the work done.`,
  },
  {
    id: 7,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'swamp-cooler',
    note: 'After being ignored by several companies — powerful contrast',
    text: `We needed evaporative cooler repaired. After being ignored by several companies, Angie's List referred us to Lou. Contacted us right away, set up an appointment, was timely and was outstanding at communication both digitally and in-person. Our problem was diagnosed, repaired and for a reasonable price. We will certainly use Lou in the future.`,
  },
  {
    id: 8,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'furnace',
    text: `Lou was great - very patient and explained everything to me several times, got a new furnace installed quickly and was available to ask questions even on a Saturday night. Highly recommend!`,
  },
  {
    id: 9,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'furnace',
    text: `Lou called me as soon as I submitted the request and got our furnace up and running!`,
  },
  {
    id: 10,
    platform: 'Angi',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'service',
    service: 'general',
    note: 'Names both Lou and Nester',
    text: `Crew was on time, courteous, knowledgeable, and professional. Louis and Nester were fantastic! Quickly diagnosed the issue and had everything running in no time. Would definitely hire them again.`,
  },
  {
    id: 11,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    service: 'general',
    text: `Very direct, open and honest about cost, time and labor. He was on time and managed to repair our unit that had previously been repaired. We are very impressed with the quality of work, and effort he gave us. I would highly recommend his services.`,
  },
  {
    id: 12,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    text: `Explained everything in detail. Great teaching.`,
  },
  {
    id: 13,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    text: `Lou was very prompt and very professional and courteous!! Everything done very fast and perfectly.`,
  },
  {
    id: 14,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    note: 'Previous contractor was no help — contrast again',
    text: `Had called another pro prior to Lou who was of little help. Can't speak highly enough of Lou and am very thankful he was able to help. Will be calling him in the future!`,
  },
  {
    id: 15,
    platform: 'HomeAdvisor',
    reviewer: 'Gregorio M.',
    stars: 5,
    tier: 'trust',
    note: 'Spanish review — display both Spanish and English translation',
    text: `Louis is very responsible in his work. And he is a very honest person.`,
    textEs: `Louis, es muy responsable en su trabajo. Y es una persona muy honesta.`,
  },
  {
    id: 16,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    text: `Louis was Great! Would recommend him to all my family and friends!`,
  },
  {
    id: 17,
    platform: 'HomeAdvisor',
    reviewer: 'Anonymous',
    stars: 5,
    tier: 'trust',
    service: 'swamp-cooler',
    text: `On time and explained things well. Did the job and got it done. Swamp cooler which wasn't working is now working!`,
  },
  {
    id: 18,
    platform: 'Website',
    reviewer: 'Lindsey Lombardi',
    stars: 5,
    tier: 'website',
    service: 'emergency',
    text: `We had an emergency with our air conditioner breaking down during a heatwave. Lou's HVAC responded quickly and had it fixed in no time. Great service and friendly technicians.`,
  },
  {
    id: 19,
    platform: 'Website',
    reviewer: 'Trevor Powell',
    stars: 5,
    tier: 'website',
    service: 'furnace',
    text: `Lou's HVAC did a fantastic job replacing our old furnace. The team was professional, efficient, and left everything clean. Our home is now warm and comfortable. Highly recommend!`,
  },
  {
    id: 20,
    platform: 'Website',
    reviewer: 'Janice Sanchez',
    stars: 5,
    tier: 'website',
    service: 'ac',
    text: `I had Lou's HVAC install a new energy-efficient AC unit. The consultation process was smooth, and the installation was quick. I've noticed a drop in my energy bills already!`,
  },
  {
    id: 21,
    platform: 'Website',
    reviewer: 'Emily Nguyen',
    stars: 5,
    tier: 'website',
    service: 'furnace',
    text: `Lou's HVAC provided excellent furnace repair services. The technician was knowledgeable and explained everything clearly. Our furnace is working better than ever. Will definitely use them again.`,
  },
  {
    id: 22,
    platform: 'Website',
    reviewer: 'Michael Sandoval',
    stars: 5,
    tier: 'website',
    service: 'ac',
    text: `Lou's was both easy to communicate with & highly flexible. I really appreciated Lou's quick work, he had my air conditioning restored within an hour. Really Appreciate His straightforward approach to his work. Thank you Lou!`,
  },
];

export const heroReviews = reviews.filter(r => r.tier === 'hero');
export const getReviewsByService = (service: ServiceCategory) =>
  reviews.filter(r => r.service === service);
export const getReviewsByTier = (tier: ReviewTier) =>
  reviews.filter(r => r.tier === tier);
