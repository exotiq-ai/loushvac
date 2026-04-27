import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://www.loushvac303.com',
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      serialize(item) {
        const url = new URL(item.url);
        const pathname = url.pathname;
        if (pathname === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (pathname.startsWith('/services/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (pathname.startsWith('/service-area/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (pathname === '/contact/') {
          item.priority = 0.5;
          item.changefreq = 'yearly';
        } else if (pathname === '/privacy/' || pathname === '/terms/') {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  output: 'static',
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
