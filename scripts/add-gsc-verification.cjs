const fs = require('node:fs');
const path = require('node:path');

// Adds the site owner's Google Search Console verification meta tag across the
// prebuilt dist HTML. Additive: it is inserted alongside any existing
// google-site-verification tag rather than replacing it.
const NEW_CONTENT = '36n5IaJGMo9LzLsxec75dBS2rLiFtfvhHPPCY5pi3sw';
const NEW_TAG = `<meta name="google-site-verification" content="${NEW_CONTENT}">`;
const distDir = path.join(process.cwd(), 'dist');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(distDir);
let injected = 0;
let skipped = 0;
let noHead = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(NEW_CONTENT)) {
    skipped++;
    continue;
  }

  const existing = html.match(/<meta\s+name="google-site-verification"\s+content="[^"]*"\s*\/?>/i);
  if (existing) {
    const idx = existing.index + existing[0].length;
    html = html.slice(0, idx) + NEW_TAG + html.slice(idx);
  } else {
    const headMatch = html.match(/<head[^>]*>/i);
    if (!headMatch) {
      noHead++;
      continue;
    }
    const idx = headMatch.index + headMatch[0].length;
    html = html.slice(0, idx) + NEW_TAG + html.slice(idx);
  }
  fs.writeFileSync(file, html);
  injected++;
}

console.log(`GSC verification tag: injected ${injected}, skipped(already present) ${skipped}, no <head> ${noHead}, total ${files.length}`);
