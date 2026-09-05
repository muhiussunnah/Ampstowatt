'use strict';
// Aggregates every category module into one flat list of tool specs.
const fs = require('node:fs');
const path = require('node:path');

const dir = __dirname;
const files = fs.readdirSync(dir)
  .filter(f => /^\d+.*\.cjs$/.test(f))
  .sort();

const tools = [];
for (const f of files) {
  const mod = require(path.join(dir, f));
  const arr = Array.isArray(mod) ? mod : (mod.default || []);
  for (const t of arr) tools.push(t);
}

// guard against duplicate slugs
const seen = new Set();
for (const t of tools) {
  if (seen.has(t.slug)) throw new Error('Duplicate tool slug: ' + t.slug);
  seen.add(t.slug);
}

module.exports = tools;
