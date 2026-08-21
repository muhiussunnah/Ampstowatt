const fs = require('node:fs');
const path = require('node:path');

// One-off migration:
//  1. Canonicalize on the apex domain: https://www.ampstowatt.com -> https://ampstowatt.com
//     across all HTML/XML/TXT (canonical, og:url, JSON-LD, sitemaps, robots).
//  2. Remove the previous owner's Google Search Console verification meta tag.
//  3. Add the current owner's Google Analytics (gtag.js) snippet to every page head.
const distDir = path.join(process.cwd(), 'dist');
const OLD_WWW = 'https://www.ampstowatt.com';
const NEW_APEX = 'https://ampstowatt.com';
const OLD_GSC = 'J08lQRurbjNvR9mj7ufDcG3f7ErT-jhPPuOLeGX5WOE';
const GA_ID = 'G-9CY53TGWKX';
const GA_SNIPPET =
  '<!-- Google tag (gtag.js) -->' +
  '<script async src="https://www.googletagmanager.com/gtag/js?id=' + GA_ID + '"></script>' +
  '<script>window.dataLayer = window.dataLayer || [];' +
  'function gtag(){dataLayer.push(arguments);}' +
  "gtag('js', new Date());" +
  "gtag('config', '" + GA_ID + "');</script>";

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile()) out.push(full);
  }
  return out;
}

let wwwReplaced = 0;
let gscRemoved = 0;
let gaAdded = 0;

for (const file of walk(distDir)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.html', '.xml', '.txt'].includes(ext)) continue;

  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // 1. www -> apex
  if (html.includes(OLD_WWW)) {
    html = html.split(OLD_WWW).join(NEW_APEX);
    wwwReplaced++;
  }

  if (ext === '.html') {
    // 2. remove previous owner's verification meta
    const gscRe = new RegExp('<meta\\s+name="google-site-verification"\\s+content="' + OLD_GSC + '"\\s*/?>', 'i');
    if (gscRe.test(html)) {
      html = html.replace(gscRe, '');
      gscRemoved++;
    }
    // 3. add Google Analytics right after <meta charset> (keep charset first), else after <head>
    if (!html.includes(GA_ID)) {
      const charsetMatch = html.match(/<meta[^>]*charset[^>]*>/i);
      const headMatch = html.match(/<head[^>]*>/i);
      let idx = null;
      if (charsetMatch) idx = charsetMatch.index + charsetMatch[0].length;
      else if (headMatch) idx = headMatch.index + headMatch[0].length;
      if (idx !== null) {
        html = html.slice(0, idx) + GA_SNIPPET + html.slice(idx);
        gaAdded++;
      }
    }
  }

  if (html !== before) fs.writeFileSync(file, html);
}

console.log('www->apex files: ' + wwwReplaced + ', old GSC removed: ' + gscRemoved + ', GA added: ' + gaAdded);
