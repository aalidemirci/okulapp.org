// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Tamamen statik çıktı: SSR adapter'ı bilerek yok. Cloudflare Workers
// Static Assets dist/ içeriğini olduğu gibi sunar.
export default defineConfig({
  site: 'https://okulapp.org',
  output: 'static',
  integrations: [sitemap()],
});
