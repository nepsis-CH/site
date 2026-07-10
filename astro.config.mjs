// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ch.nepsis.org',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'fr', 'en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro', fr: 'fr', en: 'en', de: 'de' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
