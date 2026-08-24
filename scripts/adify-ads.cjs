/**
 * adify-ads.cjs — sitewide Adsterra ad injection (INLINE).
 *
 * NOTE: Adsterra's ad servers refuse to fill inside a nested <iframe>
 * (anti-fraud: they check window.top). An earlier isolated-iframe version
 * therefore rendered only empty boxes. The units are placed INLINE instead,
 * as plain (non-async) script pairs in document order — each invoke.js reads
 * its own `atOptions` before the next one is set, so there is no clash and
 * every unit fills.
 *
 * Placements (single-column site):
 *   728x90  header leaderboard   — desktop only, after </header>
 *   300x250 in-content rectangle — all devices, before the first content block
 *   468x60  end-of-content       — desktop only, before </main>
 *   160x300 half-page            — desktop only, before </main>
 *   320x50  mobile anchor        — mobile only, fixed sticky bottom, dismissible
 */
const fs = require('node:fs');
const path = require('node:path');

const distDir = path.join(process.cwd(), 'dist');
const AD_HOST = 'https://beseechpositiverightful.com';

const UNITS = {
  leaderboard: { key: 'f769a44ce8ef911c76aaa3eef71bd928', w: 728, h: 90 },
  rectangle:   { key: '5cad4f7c34a517b992d0de318018ad91', w: 300, h: 250 },
  banner:      { key: 'd30c845f187222d0b324c0ab06fbc9b5', w: 468, h: 60 },
  halfpage:    { key: '86a7966bd6d875c6c593a02656477a70', w: 160, h: 300 },
  mobile:      { key: 'bbd43505fc1f1f3bb11ff80c2af2c863', w: 320, h: 50 },
};

// Inline Adsterra snippet (verbatim), wrapped in a size-reserved box (no CLS).
function slot(u) {
  return `<div class="adify-ad" style="width:${u.w}px;height:${u.h}px;max-width:100%;margin:0 auto;overflow:hidden">` +
    `<script type="text/javascript">atOptions = {'key' : '${u.key}','format' : 'iframe','height' : ${u.h},'width' : ${u.w},'params' : {}};</script>` +
    `<script type="text/javascript" src="${AD_HOST}/${u.key}/invoke.js"></script>` +
    `</div>`;
}
const LABEL = '<div class="adify-label">Advertisement</div>';

const CSS = `<style id="adify-css">.adify-zone{display:flex;flex-direction:column;align-items:center;gap:6px;margin:22px auto;width:100%;overflow-anchor:none;clear:both}.adify-label{font-size:10px;line-height:1;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;text-align:center;opacity:.7}.adify-cluster{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;align-items:flex-start}.adify-cluster>div{display:flex;flex-direction:column;align-items:center;gap:6px}.adify-desktop-only{display:flex}.adify-sticky{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:none;justify-content:center;align-items:flex-end;pointer-events:none}.adify-sticky-inner{position:relative;pointer-events:auto;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-top:1px solid rgba(15,23,42,.08);box-shadow:0 -4px 20px rgba(15,23,42,.1);padding:6px 10px;border-top-left-radius:12px;border-top-right-radius:12px;max-width:100%}.adify-sticky-close{position:absolute;top:-12px;right:6px;width:24px;height:24px;border-radius:9999px;border:1px solid rgba(15,23,42,.12);background:#fff;color:#475569;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,.15);font-size:15px;line-height:1;padding:0}@media(max-width:767px){.adify-desktop-only{display:none!important}.adify-sticky{display:flex}}</style>`;

const STICKY_JS = `<script id="adify-js">(function(){function h(){var s=document.querySelector('.adify-sticky');if(s)s.style.display='none';}try{if(sessionStorage.getItem('adify:sticky:dismissed')==='1')h();}catch(e){}var b=document.querySelector('.adify-sticky-close');if(b)b.addEventListener('click',function(){h();try{sessionStorage.setItem('adify:sticky:dismissed','1');}catch(e){}});})();</script>`;

const zoneTop = `<div class="adify-zone adify-desktop-only">${LABEL}${slot(UNITS.leaderboard)}</div>`;
const zoneMid = `<div class="adify-zone">${LABEL}${slot(UNITS.rectangle)}</div>`;
const zoneEnd = `<div class="adify-zone adify-desktop-only"><div class="adify-cluster"><div>${LABEL}${slot(UNITS.banner)}</div><div>${LABEL}${slot(UNITS.halfpage)}</div></div></div>`;
const zoneSticky = `<div class="adify-sticky"><div class="adify-sticky-inner"><button class="adify-sticky-close" aria-label="Close ad" type="button">&times;</button>${slot(UNITS.mobile)}</div></div>`;

const MID_ANCHORS = [
  '<section class="home-section',
  '<section class="premium-content-showcase',
  '<section class="content-section',
  '<section class="card',
  '<article class="article-content',
  '<section class="blog-related-tools',
];
function firstAnchorIndex(html) {
  let best = -1;
  for (const a of MID_ANCHORS) {
    const i = html.indexOf(a);
    if (i !== -1 && (best === -1 || i < best)) best = i;
  }
  return best;
}

// Remove any previous adify injection (iframe OR inline) so this is re-runnable.
function stripAdify(html) {
  html = html.replace(/<style id="adify-css">[\s\S]*?<\/style>/g, '');
  html = html.replace(/<script id="adify-js">[\s\S]*?<\/script>/g, '');
  const startRe = /<div class="adify-(?:zone|sticky)[^"]*"[^>]*>/;
  let guard = 0;
  while (guard++ < 50) {
    const m = startRe.exec(html);
    if (!m) break;
    const start = m.index;
    const scan = /<div\b|<\/div>/g;
    scan.lastIndex = start;
    let depth = 0, end = -1, mm;
    while ((mm = scan.exec(html)) !== null) {
      if (mm[0] === '</div>') { depth--; if (depth === 0) { end = mm.index + 6; break; } }
      else depth++;
    }
    if (end === -1) break;
    html = html.slice(0, start) + html.slice(end);
  }
  return html;
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'ads') out.push(...walk(full)); }
    else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Clean up leftovers from the old iframe approach.
fs.rmSync(path.join(distDir, 'ads'), { recursive: true, force: true });
fs.rmSync(path.join(distDir, 'adtest.html'), { force: true });

let injected = 0, notContent = 0;
for (const file of walk(distDir)) {
  let html = fs.readFileSync(file, 'utf8');
  const hadHeader = html.includes('</header>') && html.includes('</main>');
  html = stripAdify(html);
  if (!hadHeader) { fs.writeFileSync(file, html); notContent++; continue; }

  html = html.replace('</head>', () => CSS + '</head>');
  html = html.replace('</header>', () => '</header>' + zoneTop);
  const idx = firstAnchorIndex(html);
  let endBlock = zoneEnd;
  if (idx !== -1) html = html.slice(0, idx) + zoneMid + html.slice(idx);
  else endBlock = zoneMid + zoneEnd;
  html = html.replace('</main>', () => endBlock + '</main>');
  html = html.replace('</body>', () => zoneSticky + STICKY_JS + '</body>');

  fs.writeFileSync(file, html);
  injected++;
}

console.log(`Adify inline: injected ${injected} pages, cleaned ${notContent} others`);
