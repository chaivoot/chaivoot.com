// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://chaivoot.com',
  trailingSlash: 'ignore',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), react()],
});
