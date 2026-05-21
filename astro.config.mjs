// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://wrangleapp.dev',
  integrations: [sitemap({
    filter: (page) => !page.includes('/feedback'),
  })],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
  output: 'static',
});
