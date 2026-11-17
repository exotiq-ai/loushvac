import type { Review } from './reviews';

export const googleReviewSummary = {
  rating: 5.0,
  reviewCount: 402,
  checkedAt: '2026-11-17',
  profileUrl: 'https://www.google.com/maps/place/Lou%E2%80%99s+Heating+%26+Cooling/@39.6833491,-105.0710394,17z/data=!3m1!4b1!4m6!3m5!1s0x876b81d4a3c5ec75:0xd915ac8fce04ea14!8m2!3d39.6833491!4d-105.0710394!16s%2Fg%2F11vqsgfykh',
};

export const googleReviews: Review[] = [
  {
    id: 101, platform: 'Google', reviewer: 'Jack Whiskey', stars: 5, tier: 'google', service: 'general',
    text: "Fair prices, on time and they actually care about the customer. You're not gonna find any better company.",
    date: '2026-10-27', isExcerpt: false,
    sourceUrl: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xOa1NUbHFSMGxWWkROdWJucE9iWEp5V1c5aGNuYxAB!2m1!1s0x0:0xd915ac8fce04ea14!3m1!1s2@1:CAIQACodChtycF9oOlNkSTlqR0lVZDNubnpObXJyWW9hcnc%7C%7C?hl=en-US',
  },
  {
    id: 102, platform: 'Google', reviewer: 'Trevon Weaver', stars: 5, tier: 'google', service: 'furnace',
    text: 'They gave us estimates for repair and replacement so when we are ready we have the pricing.',
    date: '2026-11-07', isExcerpt: true,
    sourceUrl: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2paR1ZXdEhiazlqUmpKRlpUbGZUbTF4UmxkSWJuYxAB!2m1!1s0x0:0xd915ac8fce04ea14!3m1!1s2@1:CAIQACodChtycF9oOjZGVWtHbk9jRjJFZTlfTm1xRldIbnc%7C%7C?hl=en-US',
  },
  {
    id: 103, platform: 'Google', reviewer: 'Kayla Smith', stars: 5, tier: 'google', service: 'furnace',
    text: 'Josiah was fantastic - he came and figured out what the problem was super quickly and was able to replace the furnace and AC in one day.',
    date: '2026-10-30', isExcerpt: true,
    sourceUrl: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2pGSFJEZElXalF0WW5wMFIwTXdkVXRSVTNndFIyYxAB!2m1!1s0x0:0xd915ac8fce04ea14!3m1!1s2@1:CAIQACodChtycF9oOjFHRDdIWjQtYnp0R0MwdUtRU3gtR2c%7C%7C?hl=en-US',
  },
  {
    id: 104, platform: 'Google', reviewer: 'Linda MB', stars: 5, tier: 'google', service: 'furnace',
    text: 'I appreciate all the information I received from Jordan, his low key approach to upgrading my furnace and his honesty about the situation.',
    date: '2026-11-13', isExcerpt: true,
    sourceUrl: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25kblltTldjMFJsYlc5TWFrZExiRUU0VVMxbGFYYxAB!2m1!1s0x0:0xd915ac8fce04ea14!3m1!1s2@1:CAIQACodChtycF9oOndnYmNWc0RlbW9MakdLbEE4US1laXc%7C%7C?hl=en-US',
  },
];
export const googleHomepageReviews = googleReviews.filter(review => [101, 102, 103].includes(review.id));
