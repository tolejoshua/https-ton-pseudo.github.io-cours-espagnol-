// Configuration Astro du site.
// L'URL publique (SITE_URL) sert aux balises canoniques, au sitemap et à Open Graph.
// À définir dans Netlify : Site configuration > Environment variables > SITE_URL
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import frenchTypography from './src/lib/french-typography.mjs';

const SITE_URL = process.env.SITE_URL || 'https://www.votre-domaine.fr';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    frenchTypography(),
    sitemap({
      // Les pages techniques ne doivent pas être indexées
      filter: (page) => !/\/(merci|404)\/?$/.test(page),
      i18n: undefined,
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
