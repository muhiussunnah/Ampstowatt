import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const noindexPaths = new Set([
  '/1-amp-to-watts/',
  '/5-amps-to-watts/',
  '/10-amps-to-watts/',
  '/15-amps-to-watts/',
  '/20-amps-to-watts/',
  '/30-amps-to-watts/',
  '/40-amps-to-watts/',
  '/50-amps-to-watts/',
  '/60-amps-to-watts/',
  '/100-amps-to-watts/'
]);

const aliasPaths = new Set([
  '/amps-to-watts-calculator/',
  '/calculators/',
  '/12v-amps-to-watts-calculator/',
  '/120v-amps-to-watts-calculator/',
  '/220v-amps-to-watts-calculator/',
  '/230v-amps-to-watts-calculator/',
  '/240v-amps-to-watts-calculator/',
  '/single-phase-amps-to-watts-calculator/',
  '/12v-calculator/',
  '/120v-calculator/',
  '/220v-calculator/',
  '/240v-calculator/',
  '/ac-calculator/',
  '/dc-calculator/',
  '/single-phase-calculator/',
  '/3-phase-calculator/',
  '/amps-to-watts-120v-calculator/',
  '/amps-to-watts-220v-calculator/',
  '/amps-to-watts-230v-calculator/',
  '/amps-to-watts-240v-calculator/',
  '/amps-to-watts-ac-calculator/',
  '/amps-to-watts-dc-calculator/',
  '/amps-to-watts-3-phase-calculator/'
]);

export default defineConfig({
    redirects: {
    '/amps-to-watts-calculator/': '/',
    '/amps-to-watts-ac-calculator/': '/ac-amps-to-watts-calculator/',
    '/ac-calculator/': '/ac-amps-to-watts-calculator/',
    '/amps-to-watts-dc-calculator/': '/dc-amps-to-watts-calculator/',
    '/dc-calculator/': '/dc-amps-to-watts-calculator/',
    '/amps-to-watts-3-phase-calculator/': '/3-phase-amps-to-watts-calculator/',
    '/3-phase-calculator/': '/3-phase-amps-to-watts-calculator/',
    '/single-phase-amps-to-watts-calculator/': '/single-phase-amps-to-watts/',
    '/single-phase-calculator/': '/single-phase-amps-to-watts/',
    '/amps-to-watts-120v-calculator/': '/120v-amps-to-watts/',
    '/120v-calculator/': '/120v-amps-to-watts/',
    '/120v-amps-to-watts-calculator/': '/120v-amps-to-watts/',
    '/amps-to-watts-220v-calculator/': '/220v-amps-to-watts/',
    '/220v-calculator/': '/220v-amps-to-watts/',
    '/220v-amps-to-watts-calculator/': '/220v-amps-to-watts/',
    '/amps-to-watts-230v-calculator/': '/230v-amps-to-watts/',
    '/230v-calculator/': '/230v-amps-to-watts/',
    '/230v-amps-to-watts-calculator/': '/230v-amps-to-watts/',
    '/amps-to-watts-240v-calculator/': '/240v-amps-to-watts/',
    '/240v-calculator/': '/240v-amps-to-watts/',
    '/240v-amps-to-watts-calculator/': '/240v-amps-to-watts/',
    '/12v-calculator/': '/12v-amps-to-watts/',
    '/12v-amps-to-watts-calculator/': '/12v-amps-to-watts/',
    '/faq/': '/#faq',
    '/other-voltages/': '/',
    '/voltage-amps-watts-calculator/': '/'
  },
  site: 'https://www.ampstowatt.com',
  output: 'static',
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !aliasPaths.has(pathname) && !noindexPaths.has(pathname);
      },
      serialize: (item) => ({
        ...item,
        lastmod: '2026-06-12'
      })
    }),
    {
      name: 'sitemap-xml-alias',
      hooks: {
        'astro:build:done': async ({ dir, logger }) => {
          const outDir = fileURLToPath(dir);

          await copyFile(
            path.join(outDir, 'sitemap-index.xml'),
            path.join(outDir, 'sitemap.xml')
          );

          logger.info('`sitemap.xml` created as an alias of `sitemap-index.xml`');
        }
      }
    }
  ],
  trailingSlash: 'always',
  vite: {
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
});
