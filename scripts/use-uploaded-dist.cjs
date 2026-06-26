const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredFiles = [
  'index.html',
  '_astro/BaseLayout.C5i8PAsk.css',
  'crystal-premium.v20260626.css',
  '_astro/BaseLayout.astro_astro_type_script_index_0_lang.DXJDJ2NP.js',
  '_astro/page.vzY--OHv.js',
  'sitemap.xml',
  'robots.txt'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(dist, file)));

if (missing.length > 0) {
  console.error('Uploaded dist is incomplete. Missing files:');
  for (const file of missing) {
    console.error(`- dist/${file}`);
  }
  process.exit(1);
}

fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.writeFileSync(path.join(dist, 'CNAME'), 'www.ampstowatt.com');

console.log('Using uploaded dist folder as the production website.');
console.log('Astro source was not rebuilt, so uploaded files remain unchanged.');
