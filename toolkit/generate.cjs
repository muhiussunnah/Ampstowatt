'use strict';
// Renders every tool spec into dist/<slug>/index.html and refreshes the sitemap.
const fs = require('node:fs');
const path = require('node:path');
const { renderPage, contentWords } = require('./lib/render.cjs');
const tools = require('./tools/index.cjs');
const seo = require('./seo.cjs');

// Apply CTR-optimized title/meta-description overrides (keeps SERP tags consistent).
for (const spec of tools) {
  const o = seo[spec.slug];
  if (o) { if (o.title) spec.title = o.title; if (o.metaDesc) spec.metaDesc = o.metaDesc; }
}

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

let ok = 0;
const written = [];
for (const spec of tools) {
  const html = renderPage(spec);
  const words = contentWords(spec);
  const outDir = path.join(dist, spec.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  written.push({ slug: spec.slug, words });
  ok++;
}

// ----- Sitemap regeneration (merge generated tool URLs with existing pages) -----
function rebuildSitemap() {
  const smPath = path.join(dist, 'sitemap-0.xml');
  if (!fs.existsSync(smPath)) return;
  let xml = fs.readFileSync(smPath, 'utf8');
  const today = '2026-09-05T00:00:00.000Z';
  for (const { slug } of written) {
    const loc = `https://ampstowatt.com/${slug}/`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    const entry = `<url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>`;
    xml = xml.replace('</urlset>', entry + '</urlset>');
  }
  fs.writeFileSync(smPath, xml);
}
rebuildSitemap();

console.log(`Generated ${ok} tool page(s).`);
for (const w of written) {
  const flag = w.words < 2000 ? ' ⚠ under 2000' : '';
  console.log(`  /${w.slug}/  — ${w.words} words${flag}`);
}
