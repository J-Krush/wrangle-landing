// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  output: 'static',
  redirects: {
    // Update this URL once your LemonSqueezy store + product is created
    '/buy': 'https://jkrush.lemonsqueezy.com/checkout/buy/866499',
  },
});
