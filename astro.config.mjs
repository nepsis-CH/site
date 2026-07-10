// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ch.nepsis.org',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // CSS-ul e mic; inliniat în HTML economisește un request blocant la randare.
    inlineStylesheets: 'always',
  },
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
