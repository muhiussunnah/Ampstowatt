'use strict';
// Injects (idempotently) a "Complete Calculator Toolkit" hub section into dist/index.html
// linking every generated tool, grouped by category. Improves crawl depth + internal linking.
const fs = require('node:fs');
const path = require('node:path');
const tools = require('./tools/index.cjs');

const dist = path.resolve(__dirname, '..', 'dist');
const idx = path.join(dist, 'index.html');
let html = fs.readFileSync(idx, 'utf8');

// group by category, preserving category order of first appearance
const groups = new Map();
for (const t of tools) {
  if (!groups.has(t.category)) groups.set(t.category, []);
  groups.get(t.category).push(t);
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let inner = '';
for (const [cat, list] of groups) {
  const links = list.map(t => `<a href="/${t.slug}/">${esc(t.h1)}</a>`).join('');
  inner += `<div class="toolkit-col"><p class="footer-title footer-col-title">${esc(cat)}</p><nav class="footer-links" aria-label="${esc(cat)}">${links}</nav></div>`;
}

const section = `<!--NEWTOOLSHUB--><div class="legacy-shell"><div class="legacy-content legacy-content--flush"><section class="content-section" id="tools" aria-label="Complete calculator toolkit"><div class="section-divider"><div class="icon-circle" aria-hidden="true">All</div><h2>Complete Electrical Calculator Toolkit</h2><div class="line" aria-hidden="true"></div></div><p class="content-p">Beyond amps-to-watts conversion, Ampstowatt offers a full suite of free interactive calculators for batteries, solar, EV charging, electricity cost, wire sizing, breakers, generators, inverters, and appliance power. Every tool gives an instant, formula-backed result you can rely on for planning.</p><div class="toolkit-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;margin-top:18px">${inner}</div></section></div></div><!--/NEWTOOLSHUB-->`;

const START = '<!--NEWTOOLSHUB-->', END = '<!--/NEWTOOLSHUB-->';
if (html.includes(START) && html.includes(END)) {
  html = html.replace(new RegExp(START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), section);
} else {
  const anchor = '<div class="footer-wrapper">';
  if (!html.includes(anchor)) throw new Error('footer anchor not found in index.html');
  html = html.replace(anchor, section + ' ' + anchor);
}
fs.writeFileSync(idx, html);
console.log(`Injected homepage toolkit hub with ${tools.length} tools across ${groups.size} categories.`);
