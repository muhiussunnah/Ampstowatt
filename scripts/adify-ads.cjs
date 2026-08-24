/**
 * adify-ads.cjs — sitewide Adsterra ad system (Adify-style, static port).
 *
 * Technique (matches the mushroomidentifiers Adify system):
 *   Each unit renders in its own <iframe> whose document is injected via
 *   `srcdoc` (NOT src=) — this is the key detail: Adsterra fills a srcdoc
 *   iframe but NOT a src=URL iframe, and NOT a bare nested frame. The iframe
 *   is sandboxed WITHOUT allow-top-navigation, so an aggressive ad can never
 *   redirect the site (a real click still opens the advertiser via
 *   allow-popups). Frames are lazy-loaded (IntersectionObserver) for speed,
 *   and each frame has its own window so multiple Adsterra `atOptions` tags
 *   never clash — the same unit can therefore be reused many times.
 *
 * Placements (single-column site; revenue-optimised):
 *   728x90  top leaderboard      — desktop, after </header>
 *   300x250 in-content rectangle — all devices, after every 3rd paragraph
 *                                  inside <main> (max 10 — the main earner)
 *   468x60 + 160x300 end cluster — desktop, before </main>
 *   728x90 (desktop) / 300x250 (mobile) footer — after </main>
 *   320x50  mobile anchor        — mobile, fixed sticky bottom, dismissible
 */
const fs = require('node:fs');
const path = require('node:path');

const distDir = path.join(process.cwd(), 'dist');
const AD_HOST = 'https://beseechpositiverightful.com';
const INTERVAL = 3;   // in-content ad after every N paragraphs
const MAX_INCONTENT = 10;

const U = {
  leaderboard: { key: 'f769a44ce8ef911c76aaa3eef71bd928', w: 728, h: 90 },
  rectangle:   { key: '5cad4f7c34a517b992d0de318018ad91', w: 300, h: 250 },
  banner:      { key: 'd30c845f187222d0b324c0ab06fbc9b5', w: 468, h: 60 },
  halfpage:    { key: '86a7966bd6d875c6c593a02656477a70', w: 160, h: 300 },
  mobile:      { key: 'bbd43505fc1f1f3bb11ff80c2af2c863', w: 320, h: 50 },
};

const LABEL = '<div class="adify-label">Advertisement</div>';
// Lazy, sandboxed, srcdoc-driven frame (srcdoc is set by adify JS on scroll).
function frame(u) {
  return `<iframe class="adify-frame" title="Advertisement" data-key="${u.key}" data-w="${u.w}" data-h="${u.h}" width="${u.w}" height="${u.h}" scrolling="no" referrerpolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" style="border:0;display:block;max-width:100%;overflow:hidden;background:transparent"></iframe>`;
}
const slot        = (u) => `<div class="adify-zone">${LABEL}${frame(u)}</div>`;
const slotDesktop = (u) => `<div class="adify-zone adify-desktop-only">${LABEL}${frame(u)}</div>`;
const slotMobile  = (u) => `<div class="adify-zone adify-mobile-only">${LABEL}${frame(u)}</div>`;

const zoneTop = slotDesktop(U.leaderboard);
const inContent = slot(U.rectangle);
const zoneEnd = `<div class="adify-zone adify-desktop-only"><div class="adify-cluster"><div>${LABEL}${frame(U.banner)}</div><div>${LABEL}${frame(U.halfpage)}</div></div></div>`;
const zoneFooter = slotDesktop(U.leaderboard) + slotMobile(U.rectangle);
const zoneSticky = `<div class="adify-sticky"><div class="adify-sticky-inner"><button class="adify-sticky-close" aria-label="Close ad" type="button">&times;</button>${frame(U.mobile)}</div></div>`;

const CSS = `<style id="adify-css">.adify-zone{display:flex;flex-direction:column;align-items:center;gap:6px;margin:22px auto;width:100%;overflow-anchor:none;clear:both}.adify-label{font-size:10px;line-height:1;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;text-align:center;opacity:.7}.adify-cluster{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;align-items:flex-start}.adify-cluster>div{display:flex;flex-direction:column;align-items:center;gap:6px}.adify-desktop-only{display:flex}.adify-mobile-only{display:none}.adify-sticky{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:none;justify-content:center;align-items:flex-end;pointer-events:none}.adify-sticky-inner{position:relative;pointer-events:auto;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-top:1px solid rgba(15,23,42,.08);box-shadow:0 -4px 20px rgba(15,23,42,.1);padding:6px 10px;border-top-left-radius:12px;border-top-right-radius:12px;max-width:100%}.adify-sticky-close{position:absolute;top:-12px;right:6px;width:24px;height:24px;border-radius:9999px;border:1px solid rgba(15,23,42,.12);background:#fff;color:#475569;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,.15);font-size:15px;line-height:1;padding:0}@media(max-width:767px){.adify-desktop-only{display:none!important}.adify-mobile-only{display:flex}.adify-sticky{display:flex}}</style>`;

const JS = `<script id="adify-js">(function(){function sd(k,w,h){return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;align-items:center;justify-content:center;width:100%;height:100%}</style></head><body><scr'+'ipt>atOptions={"key":"'+k+'","format":"iframe","height":'+h+',"width":'+w+',"params":{}};</scr'+'ipt><scr'+'ipt src="${AD_HOST}/'+k+'/invoke.js"></scr'+'ipt></body></html>';}function load(f){if(f.getAttribute('data-loaded'))return;f.setAttribute('data-loaded','1');f.srcdoc=sd(f.getAttribute('data-key'),f.getAttribute('data-w'),f.getAttribute('data-h'));}var fr=[].slice.call(document.querySelectorAll('iframe.adify-frame[data-key]'));if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){load(e.target);io.unobserve(e.target);}});},{rootMargin:'600px 0px'});fr.forEach(function(f){io.observe(f);});}else{fr.forEach(load);}function h(){var s=document.querySelector('.adify-sticky');if(s)s.style.display='none';}try{if(sessionStorage.getItem('adify:sticky:dismissed')==='1')h();}catch(e){}var b=document.querySelector('.adify-sticky-close');if(b)b.addEventListener('click',function(){h();try{sessionStorage.setItem('adify:sticky:dismissed','1');}catch(e){}});})();</script>`;

// Split HTML into chunks of N paragraphs (top-level </p> boundaries).
function splitEveryNParagraphs(html, n) {
  if (n <= 0) return [html];
  const parts = [];
  const re = /<\/p>/gi;
  let count = 0, last = 0, m;
  while ((m = re.exec(html)) !== null) {
    count++;
    if (count % n === 0) { const idx = m.index + m[0].length; parts.push(html.slice(last, idx)); last = idx; }
  }
  if (last < html.length) parts.push(html.slice(last));
  return parts.length ? parts : [html];
}

// Inject in-content ads inside <main> + the end cluster before </main>.
function injectMain(html) {
  const open = html.match(/<main[^>]*>/i);
  if (!open) return html;
  const start = open.index + open[0].length;
  const end = html.lastIndexOf('</main>');
  if (end === -1 || end < start) return html;
  const inner = html.slice(start, end);
  const chunks = splitEveryNParagraphs(inner, INTERVAL);
  let out = '', ads = 0;
  for (let i = 0; i < chunks.length; i++) {
    out += chunks[i];
    if (i < chunks.length - 1 && ads < MAX_INCONTENT) { out += inContent; ads++; }
  }
  out += zoneEnd;
  return html.slice(0, start) + out + html.slice(end);
}

// Remove any previous adify injection so this is re-runnable.
function stripAdify(html) {
  html = html.replace(/<style id="adify-css">[\s\S]*?<\/style>/g, '');
  html = html.replace(/<script id="adify-js">[\s\S]*?<\/script>/g, '');
  const startRe = /<div class="adify-(?:zone|sticky)[^"]*"[^>]*>/;
  let guard = 0;
  while (guard++ < 200) {
    const m = startRe.exec(html);
    if (!m) break;
    const s = m.index;
    const scan = /<div\b|<\/div>/g; scan.lastIndex = s;
    let depth = 0, e = -1, mm;
    while ((mm = scan.exec(html)) !== null) {
      if (mm[0] === '</div>') { depth--; if (depth === 0) { e = mm.index + 6; break; } } else depth++;
    }
    if (e === -1) break;
    html = html.slice(0, s) + html.slice(e);
  }
  return html;
}

function walk(dir) {
  const out = [];
  for (const en of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, en.name);
    if (en.isDirectory()) out.push(...walk(full));
    else if (en.isFile() && en.name.endsWith('.html')) out.push(full);
  }
  return out;
}

fs.rmSync(path.join(distDir, 'ads'), { recursive: true, force: true });
fs.rmSync(path.join(distDir, 'adtest.html'), { force: true });

let injected = 0, cleaned = 0, totalIn = 0;
for (const file of walk(distDir)) {
  let html = stripAdify(fs.readFileSync(file, 'utf8'));
  const isContent = html.includes('</header>') && html.includes('</main>');
  if (!isContent) { fs.writeFileSync(file, html); cleaned++; continue; }

  html = html.replace('</head>', () => CSS + '</head>');
  html = html.replace('</header>', () => '</header>' + zoneTop);
  html = injectMain(html);
  html = html.replace('</main>', () => '</main>' + zoneFooter);
  html = html.replace('</body>', () => zoneSticky + JS + '</body>');

  totalIn += (html.match(/data-key="5cad4f7c34a517b992d0de318018ad91"/g) || []).length;
  fs.writeFileSync(file, html);
  injected++;
}
console.log(`Adify srcdoc: injected ${injected} pages, cleaned ${cleaned}; rectangle slots total ${totalIn}`);
