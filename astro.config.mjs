import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const aliasPaths = new Set([
  '/amps-to-watts-calculator/',
  '/calculators/',
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
  site: 'https://ampstowatt.com',
  output: 'static',
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !aliasPaths.has(new URL(page).pathname)
    })
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
