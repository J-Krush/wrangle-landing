// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wrangleapp.dev',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  output: 'static',
  redirects: {
    // Update this URL once your LemonSqueezy store + product is created
    '/buy': 'https://jkrush.lemonsqueezy.com/checkout/buy/8860d1f0-c122-4ab6-8528-ee727d3065e3',
  },
});
