'use strict';
// Validates every tool: calculator math (via test cases), spec integrity, and word count.
const { renderPage, wc, strip, contentWords } = require('./lib/render.cjs');
const tools = require('./tools/index.cjs');

let failures = 0;
let passes = 0;
const approx = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 0.01 : tol) * Math.max(1, Math.abs(b));

for (const spec of tools) {
  const label = spec.slug;
  // 1. required fields
  for (const field of ['slug', 'h1', 'title', 'metaDesc', 'calc', 'content', 'faq']) {
    if (!spec[field]) { console.error(`✗ ${label}: missing "${field}"`); failures++; }
  }
  if (!spec.calc || typeof spec.calc.compute !== 'function') { console.error(`✗ ${label}: calc.compute not a function`); failures++; continue; }

  // 2. compute runs on defaults without throwing and returns a finite primary
  const defaults = {};
  spec.calc.inputs.forEach(i => { defaults[i.id] = (i.type === 'select' || i.type === 'text') ? i.value : parseFloat(i.value); });
  let r;
  try { r = spec.calc.compute(defaults); } catch (e) { console.error(`✗ ${label}: compute threw on defaults — ${e.message}`); failures++; continue; }
  if (!r || !r.primary || (typeof r.primary.value === 'number' && !isFinite(r.primary.value))) {
    console.error(`✗ ${label}: compute returned invalid primary on defaults`); failures++;
  } else { passes++; }

  // 3. author-provided test cases
  if (Array.isArray(spec.calc.tests)) {
    for (const tc of spec.calc.tests) {
      let out;
      try { out = spec.calc.compute(tc.in); } catch (e) { console.error(`✗ ${label}: test threw — ${e.message}`); failures++; continue; }
      const got = out && out.primary ? out.primary.value : NaN;
      if (typeof tc.expect === 'number') {
        if (approx(got, tc.expect, tc.tol)) { passes++; }
        else { console.error(`✗ ${label}: expected ~${tc.expect}, got ${got} (${tc.name || ''})`); failures++; }
      }
    }
  }

  // 4. word count >= 2000 (rendered on-page content incl. tables)
  const words = contentWords(spec);
  if (words < 2000) { console.error(`✗ ${label}: only ${words} words (need 2000+)`); failures++; } else { passes++; }

  // 5. page renders and contains the calculator root + schema + h1
  let html;
  try { html = renderPage(spec); } catch (e) { console.error(`✗ ${label}: renderPage threw — ${e.message}`); failures++; continue; }
  for (const needle of [`id="tool-${spec.calc.id}"`, 'application/ld+json', `<h1`, 'data-out="primary"']) {
    if (!html.includes(needle)) { console.error(`✗ ${label}: rendered HTML missing ${needle}`); failures++; }
  }
  if (html.includes('undefined') && /value">undefined|>undefined<\/(span|strong|p|h1|h2)/.test(html)) {
    console.error(`✗ ${label}: rendered HTML contains stray "undefined"`); failures++;
  }
}

console.log(`\n${passes} checks passed, ${failures} failed, across ${tools.length} tool(s).`);
process.exit(failures ? 1 : 0);
