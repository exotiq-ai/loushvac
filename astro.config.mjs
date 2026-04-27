import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.loushvac303.com',
  integrations: [sitemap()],
  output: 'static',
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
