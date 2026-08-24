/**
 * adify-ads.cjs — static-site port of the "Adify" ad system.
 *
 * Each Adsterra unit is served from its own tiny HTML file under /ads/ and
 * embedded through an isolated, sandboxed, lazy <iframe>. Because every ad
 * lives in its own document:
 *   - the global `atOptions` of multiple Adsterra tags never clash,
 *   - the sandbox (no allow-top-navigation) means an ad can never redirect
 *     the site, while a real click still opens the advertiser in a new tab,
 *   - lazy-loading keeps page speed / Core Web Vitals healthy,
 *   - the fixed width/height box avoids layout shift.
 *
 * Placements (single-column site, matches the Adify "optimal" seed):
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

// ── 1. Write one isolated ad document per unit under dist/ads/ ──────────────
function adDoc(u) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;align-items:center;justify-content:center;width:100%;height:100%}</style></head><body>
<script type="text/javascript">
	atOptions = {
		'key' : '${u.key}',
		'format' : 'iframe',
		'height' : ${u.h},
		'width' : ${u.w},
		'params' : {}
	};
</script>
<script type="text/javascript" src="${AD_HOST}/${u.key}/invoke.js"></script>
</body></html>`;
}

function writeAdFiles() {
  const adsDir = path.join(distDir, 'ads');
  fs.mkdirSync(adsDir, { recursive: true });
  for (const u of Object.values(UNITS)) {
    fs.writeFileSync(path.join(adsDir, `${u.w}x${u.h}.html`), adDoc(u));
  }
}

// ── 2. Building blocks for the page injections ─────────────────────────────
function frame(u, lazy) {
  return `<iframe title="Advertisement" src="/ads/${u.w}x${u.h}" width="${u.w}" height="${u.h}" scrolling="no" loading="${lazy ? 'lazy' : 'eager'}" referrerpolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" style="border:0;display:block;max-width:100%;overflow:hidden"></iframe>`;
}
const LABEL = '<div class="adify-label">Advertisement</div>';

const CSS = `<style id="adify-css">.adify-zone{display:flex;flex-direction:column;align-items:center;gap:6px;margin:22px auto;width:100%;overflow-anchor:none;clear:both}.adify-label{font-size:10px;line-height:1;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;text-align:center;opacity:.7}.adify-cluster{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;align-items:flex-start}.adify-cluster>div{display:flex;flex-direction:column;align-items:center;gap:6px}.adify-desktop-only{display:flex}.adify-sticky{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:none;justify-content:center;align-items:flex-end;pointer-events:none}.adify-sticky-inner{position:relative;pointer-events:auto;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-top:1px solid rgba(15,23,42,.08);box-shadow:0 -4px 20px rgba(15,23,42,.1);padding:6px 10px;border-top-left-radius:12px;border-top-right-radius:12px;max-width:100%}.adify-sticky-close{position:absolute;top:-12px;right:6px;width:24px;height:24px;border-radius:9999px;border:1px solid rgba(15,23,42,.12);background:#fff;color:#475569;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,.15);font-size:15px;line-height:1;padding:0}@media(max-width:767px){.adify-desktop-only{display:none!important}.adify-sticky{display:flex}}</style>`;

const STICKY_JS = `<script id="adify-js">(function(){function h(){var s=document.querySelector('.adify-sticky');if(s)s.style.display='none';}try{if(sessionStorage.getItem('adify:sticky:dismissed')==='1')h();}catch(e){}var b=document.querySelector('.adify-sticky-close');if(b)b.addEventListener('click',function(){h();try{sessionStorage.setItem('adify:sticky:dismissed','1');}catch(e){}});})();</script>`;

const zoneTop = `<div class="adify-zone adify-desktop-only">${LABEL}${frame(UNITS.leaderboard, true)}</div>`;
const zoneMid = `<div class="adify-zone">${LABEL}${frame(UNITS.rectangle, true)}</div>`;
const zoneEnd = `<div class="adify-zone adify-desktop-only"><div class="adify-cluster"><div>${LABEL}${frame(UNITS.banner, true)}</div><div>${LABEL}${frame(UNITS.halfpage, true)}</div></div></div>`;
const zoneSticky = `<div class="adify-sticky"><div class="adify-sticky-inner"><button class="adify-sticky-close" aria-label="Close ad" type="button">&times;</button>${frame(UNITS.mobile, false)}</div></div>`;

// In-content anchor: inject the rectangle right before the first real content
// block (i.e. after the hero / calculator), whichever appears first.
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

// ── 3. Inject into every real content page ─────────────────────────────────
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'ads') out.push(...walk(full)); }
    else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

writeAdFiles();

let injected = 0, skipped = 0, notContent = 0;
for (const file of walk(distDir)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="adify-css"')) { skipped++; continue; }
  if (!html.includes('</header>') || !html.includes('</main>')) { notContent++; continue; }

  // head CSS
  html = html.replace('</head>', () => CSS + '</head>');
  // top leaderboard after header
  html = html.replace('</header>', () => '</header>' + zoneTop);
  // in-content rectangle before first content block (fallback: with end zone)
  const idx = firstAnchorIndex(html);
  let endBlock = zoneEnd;
  if (idx !== -1) {
    html = html.slice(0, idx) + zoneMid + html.slice(idx);
  } else {
    endBlock = zoneMid + zoneEnd;
  }
  // end-of-content cluster before </main>
  html = html.replace('</main>', () => endBlock + '</main>');
  // mobile sticky + dismiss script before </body>
  html = html.replace('</body>', () => zoneSticky + STICKY_JS + '</body>');

  fs.writeFileSync(file, html);
  injected++;
}

console.log(`Adify: injected ${injected} pages, skipped(already) ${skipped}, non-content ${notContent}`);
