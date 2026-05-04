// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chaivoot.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
