// src/content/externalProfiles.ts

export interface ExternalProfile {
  name: string;
  label: string;
  icon: string;
  url: string;
  verified: boolean;
  note?: string;
}

export const externalProfiles: ExternalProfile[] = [
  {
    name: 'Yelp',
    label: 'Yelp Reviews',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    url: 'https://www.yelp.com/biz/lou-s-heating-and-cooling-denver',
    verified: true,
  },
  {
    name: 'BBB',
    label: 'BBB A+ Profile',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    url: 'https://www.bbb.org/us/co/denver/profile/heating-and-air-conditioning/lous-heating-and-cooling-1296-1000170743',
    verified: true,
  },
  {
    name: 'HomeAdvisor',
    label: 'HomeAdvisor',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    url: 'https://www.homeadvisor.com/rated.LousHeatingandCooling.141784599.html',
    verified: true,
  },
  {
    name: 'Angi',
    label: 'Angi Reviews',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    url: 'https://www.angi.com/companylist/us/co/denver/lous-heating-and-cooling-llc-reviews-1.htm',
    verified: true,
  },
  {
    name: 'Facebook',
    label: 'Facebook Page',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
    url: 'https://www.facebook.com/profile.php?id=61565629501334',
    verified: true,
  },
  {
    name: 'Instagram',
    label: '@loushvac',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    url: 'https://www.instagram.com/loushvac/',
    verified: true,
  },
  // TODO: Add Google Business Profile link once Gregory provides it
  // {
  //   name: 'Google Business',
  //   label: 'Google Business',
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  //   url: '',
  //   verified: false,
  // },
];
