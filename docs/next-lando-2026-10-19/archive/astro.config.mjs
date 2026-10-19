// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  ...(process.env.SITE_URL ? { site: process.env.SITE_URL } : {}),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: process.env.SITE_URL ? [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/estudo')
  })] : []
});
