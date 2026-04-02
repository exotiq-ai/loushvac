// src/content/externalProfiles.ts

export interface ExternalProfile {
  name: string;
  url: string;
  verified: boolean;
  note?: string;
}

export const externalProfiles: ExternalProfile[] = [
  {
    name: 'Yelp',
    url: 'https://www.yelp.com/biz/lou-s-heating-and-cooling-denver',
    verified: true,
  },
  {
    name: 'BBB',
    url: 'https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743',
    verified: true,
  },
  {
    name: 'HomeAdvisor',
    url: 'https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html',
    verified: true,
  },
  {
    name: 'Angi',
    url: 'https://www.angi.com/companylist/us/co/denver/lous-heating-and-cooling-llc-reviews-1.htm',
    verified: true,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61565629501334',
    verified: true,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/loushvac/',
    verified: true,
  },
  {
    name: 'Google Business',
    url: 'https://maps.google.com/?cid=GOOGLE_BUSINESS_PROFILE_CID',
    verified: false,
    note: 'FLAG: URL not confirmed. Replace CID with actual Google Business Profile share URL.',
  },
];
