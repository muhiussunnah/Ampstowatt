'use strict';
const { GTAG, ADIFY_CSS, adZone, AD_LEADER, AD_RECT, AD_MOBILE, HEADER, FOOTER } = require('./chrome.cjs');

const SITE = 'https://ampstowatt.com';
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escAttr = (s) => esc(s);
// strip tags for word counting / meta
const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const wc = (s) => strip(s).split(' ').filter(Boolean).length;

// ---------- CALCULATOR ----------
function renderInput(inp) {
  const label = `<div class="soft-calc__field-head"><span class="soft-calc__label">${esc(inp.label)}</span>${inp.unit ? `<span class="soft-calc__unit-pill">${esc(inp.unit)}</span>` : ''}</div>`;
  let control;
  if (inp.type === 'select') {
    const opts = inp.options.map(o => `<option value="${escAttr(o.v)}"${String(o.v) === String(inp.value) ? ' selected' : ''}>${esc(o.t)}</option>`).join('');
    control = `<select class="calc-input soft-calc__input" data-input="${inp.id}" aria-label="${escAttr(inp.label)}">${opts}</select>`;
  } else {
    const attrs = [`type="number"`, `data-input="${inp.id}"`, `value="${escAttr(inp.value)}"`, `step="${escAttr(inp.step || 'any')}"`];
    if (inp.min != null) attrs.push(`min="${escAttr(inp.min)}"`);
    if (inp.max != null) attrs.push(`max="${escAttr(inp.max)}"`);
    control = `<span class="calc-input-wrap soft-calc__input-wrap"><input class="calc-input soft-calc__input" ${attrs.join(' ')}>${inp.unit ? `<span class="calc-unit soft-calc__field-unit">${esc(inp.unit)}</span>` : ''}</span>`;
  }
  return `<label class="calc-field soft-calc__field">${label}${control}${inp.hint ? `<span class="soft-calc__footnote">${esc(inp.hint)}</span>` : ''}</label>`;
}

function renderSecondaryPlaceholders(calc) {
  const sec = calc.secondary || [];
  if (!sec.length) return '';
  return `<div class="tool2-secondary">${sec.map((s, i) => `<div class="tool2-secondary__item"><span class="tool2-secondary__label">${esc(s.label)}</span><strong><span data-out="sec-${i}">—</span> <span class="tool2-secondary__unit">${esc(s.unit || '')}</span></strong></div>`).join('')}</div>`;
}

function renderCalculator(calc) {
  const inputsHtml = calc.inputs.map(renderInput).join('');
  const cfg = {
    id: calc.id,
    inputs: calc.inputs.map(i => ({ id: i.id, type: i.type || 'number', value: i.value })),
    primaryUnit: calc.primaryUnit || '',
    primaryLabel: calc.primaryLabel || 'Result',
    secondary: (calc.secondary || []).map(s => ({ label: s.label, unit: s.unit || '' })),
  };
  const computeSrc = calc.compute.toString();
  const runtime = `(function(){var cfg=${JSON.stringify(cfg)};var compute=${computeSrc};var root=document.getElementById('tool-${calc.id}');if(!root)return;function readAll(){var o={};cfg.inputs.forEach(function(i){var el=root.querySelector('[data-input="'+i.id+'"]');var raw=el?el.value:i.value;o[i.id]=(i.type==='select'||i.type==='text')?raw:parseFloat(raw);});return o;}function fmt(n,p){if(n==null||!isFinite(n))return '—';p=(p==null?2:p);return Number(n).toLocaleString('en-US',{maximumFractionDigits:p,minimumFractionDigits:0});}function render(){var v=readAll();var r;try{r=compute(v);}catch(e){r=null;}if(!r||!r.primary){return;}var pe=root.querySelector('[data-out="primary"]');if(pe)pe.textContent=(typeof r.primary.value==='number')?fmt(r.primary.value,r.primary.precision):String(r.primary.value);var pu=root.querySelector('[data-out="primary-unit"]');if(pu&&r.primary.unit)pu.textContent=r.primary.unit;var pl=root.querySelector('[data-out="primary-label"]');if(pl&&r.primary.label)pl.textContent=r.primary.label;(r.secondary||[]).forEach(function(s,i){var el=root.querySelector('[data-out="sec-'+i+'"]');if(el)el.textContent=(typeof s.value==='number')?fmt(s.value,s.precision):String(s.value);var un=el&&el.parentNode?el.parentNode.querySelector('.tool2-secondary__unit'):null;if(un&&s.unit!=null)un.textContent=s.unit;});var fe=root.querySelector('[data-out="formula"]');if(fe&&r.formula)fe.textContent=r.formula;var ne=root.querySelector('[data-out="note"]');if(ne&&r.note!=null)ne.textContent=r.note;}root.addEventListener('input',render);root.addEventListener('change',render);var cp=root.querySelector('.lx-action-copy');if(cp)cp.addEventListener('click',function(){var t=root.querySelector('[data-out="primary"]');var u=root.querySelector('[data-out="primary-unit"]');var txt=(t?t.textContent:'')+' '+(u?u.textContent:'');try{navigator.clipboard.writeText(txt.trim());cp.textContent='Copied!';setTimeout(function(){cp.textContent='Copy Result';},1500);}catch(e){}});var rs=root.querySelector('.lx-action-reset');if(rs)rs.addEventListener('click',function(){cfg.inputs.forEach(function(i){var el=root.querySelector('[data-input="'+i.id+'"]');if(el)el.value=i.value;});render();});render();})();`;

  return `<div class="lux-calculator-stage" id="calculator"> <div class="lux-calculator-frame"> <div class="lux-calculator-visual" aria-hidden="true"> <span class="lux-visual-ring lux-visual-ring--1"></span> <span class="lux-visual-ring lux-visual-ring--2"></span> <span class="lux-visual-spark"></span> </div> <div class="lx-tool premium-calculator soft-calc" id="tool-${calc.id}" data-tool-id="${calc.id}"> <div class="calc-header soft-calc__sr-header"> <div> <h2 class="calc-title">${esc(calc.title)}</h2> <p class="calc-subtitle">${esc(calc.subtitle || '')}</p> </div> <span class="calc-badge"><span class="calc-badge__dot" aria-hidden="true"></span>Live Result</span> </div> <div class="soft-calc__trust"> <span class="soft-calc__trust-icon" aria-hidden="true">✓</span> Formula-backed — instant professional result </div> <div class="soft-calc__shell"> <div class="soft-calc__inputs"> <section class="calc-section soft-calc__section">${inputsHtml}</section> </div> <div class="soft-calc__results"> <div class="calc-result-panel soft-calc__result-panel" aria-live="polite" aria-atomic="true"> <div class="calc-result-main soft-calc__result-primary"> <span class="calc-result-label soft-calc__result-label" data-out="primary-label">${esc(calc.primaryLabel || 'Result')}</span> <div class="soft-calc__result-value-row"> <span class="calc-result-value soft-calc__result-value"><span data-out="primary">0</span></span> <span class="calc-result-unit soft-calc__result-unit" data-out="primary-unit">${esc(calc.primaryUnit || '')}</span> </div> ${renderSecondaryPlaceholders(calc)} </div> <div class="calc-formula-box soft-calc__formula-foot"> <span class="calc-formula-label soft-calc__formula-label">Formula used</span> <span class="calc-formula-value soft-calc__formula-value" data-out="formula">${esc(calc.formulaText || '')}</span> <span class="calc-note soft-calc__footnote" data-out="note">${esc(calc.note || '')}</span> </div> </div> </div> </div> <div class="calc-action-row soft-calc__actions"> <div class="calc-actions"> <button type="button" class="calc-btn soft-calc__btn lx-action-copy">Copy Result</button> <button type="button" class="calc-btn soft-calc__btn soft-calc__btn--ghost lx-action-reset">Reset</button> </div> <p class="calc-note soft-calc__safety">This calculator is an educational planning estimate. Verify safety-critical work with equipment nameplate data, local electrical code, and a qualified professional.</p>${AD_RECT} </div> </div> </div> </div> <script>${runtime}</script>`;
}

// ---------- CONTENT ----------
function renderTable(t) {
  const head = `<tr>${t.columns.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr>`;
  const body = t.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
  return `<div class="tool2-tablewrap"><table class="tool2-table">${t.caption ? `<caption>${esc(t.caption)}</caption>` : ''}<thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}

function renderContent(spec) {
  let out = '';
  let adCount = 0;
  spec.content.forEach((s, idx) => {
    if (s.type === 'section') {
      const ad = (idx > 0 && idx % 3 === 0 && adCount < 3) ? (adCount++, AD_RECT) : '';
      out += `<section class="content-section" aria-label="${escAttr(s.heading)}"><div class="section-divider"><div class="icon-circle" aria-hidden="true">${esc(s.icon || 'i')}</div><h2 id="${escAttr(s.id)}">${esc(s.heading)}</h2><div class="line" aria-hidden="true"></div></div><article class="card content-card">${s.html}${s.table ? renderTable(s.table) : ''}${ad}</article></section>`;
    }
  });
  return out;
}

function renderRelated(spec) {
  if (!spec.related || !spec.related.length) return '';
  const links = spec.related.map(r => `<a href="${escAttr(r.href)}"><span class="semantic-link-title"><span class="semantic-link-badge">${esc(r.badge || '→')}</span><strong>${esc(r.title)}</strong></span><span class="semantic-link-desc">${esc(r.desc || '')}</span></a>`).join('');
  return `<section class="content-section semantic-link-map" aria-label="Related tools"><div class="section-divider"><div class="icon-circle" aria-hidden="true">Hub</div><h2>Related Calculators &amp; Tools</h2><div class="line" aria-hidden="true"></div></div><div class="semantic-link-map-grid semantic-link-map-grid--single"><section class="semantic-link-cluster semantic-link-cluster--plain"><div class="semantic-hub-callout"><strong>Explore the full toolkit</strong><p>Continue with related power, battery, solar, and load-planning calculators.<a href="/">Amps to Watts Calculator</a></p></div><nav class="semantic-link-list" aria-label="Related tools">${links}</nav></section></div></section>`;
}

function renderFaqSection(spec) {
  if (!spec.faq || !spec.faq.length) return '';
  const items = spec.faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary><span class="faq-summary-inner"><span class="faq-badge">Q${i + 1}</span> ${esc(f.q)}</span></summary><p>${f.a}</p></details>`).join('');
  return `<div class="legacy-shell"> <div class="legacy-content legacy-content--flush"> <section class="premium-faq-section" id="faq" aria-label="${escAttr(spec.h1)} FAQ"> <div class="premium-faq-heading"> <p class="premium-kicker">FAQ</p> <h2>${esc(spec.h1)} — FAQ</h2> <p>Fast answers before you rely on the calculator.</p> </div> <div class="premium-faq-list">${items}</div> </section> </div> </div>`;
}

function methodology(spec) {
  return `<div class="legacy-shell"> <div class="legacy-content legacy-content--flush"> <section class="content-section authority-methodology" aria-labelledby="authority-methodology-title"> <article class="content-card authority-card"> <div class="section-divider"> <div class="icon-circle" aria-hidden="true">REF</div> <h2 id="authority-methodology-title">Methodology, Review Notes, and Sources</h2> <div class="line" aria-hidden="true"></div> </div> <div class="authority-grid"> <section class="authority-panel"> <h3>How this calculator works</h3> <p>${spec.methodology || 'This tool applies standard electrical engineering formulas and industry-accepted planning factors. Every result is derived transparently from the inputs you enter and the formula shown beneath the result.'}</p></section> <section class="authority-panel"> <h3>Editorial review</h3> <p><strong>Last reviewed:</strong> ${spec.reviewed || 'September 5, 2026'}. Maintained by the Ampstowatt editorial team and checked for formula consistency, unit labels, calculator behavior, and safety wording. This page is an educational planning reference, not a licensed electrical design or inspection service.</p> </section> <section class="authority-panel"> <h3>Reference sources</h3> <ul> <li><a href="https://www.nist.gov/pml/weights-and-measures/si-units-ampere">NIST SI unit guidance for ampere, volt, and watt</a></li> <li><a href="https://www.cdc.gov/niosh/electrical-safety/index.html">CDC/NIOSH electrical safety guidance</a></li> <li><a href="https://www.osha.gov/etools/subpart-s">OSHA electrical standards</a></li> </ul> </section> </div> </article> </section> </div> </div>`;
}

// ---------- SCHEMA ----------
function schema(spec) {
  const url = `${SITE}/${spec.slug}/`;
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE}/#website`, name: 'Amps to Watts Calculator', alternateName: 'AmpsTo⚡Watt.com', url: `${SITE}/`, publisher: { '@id': `${SITE}/#organization` } },
    { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Amps to Watts Calculator', alternateName: 'AmpsTo⚡Watt.com', url: `${SITE}/`, description: 'Free electrical, solar, battery, EV, and load-planning calculators.', foundingDate: '2024', logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` }, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: `${SITE}/contact-us/` } },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: spec.title, description: spec.metaDesc, isPartOf: { '@id': `${SITE}/#website` }, author: { '@id': `${SITE}/#organization` }, publisher: { '@id': `${SITE}/#organization` }, about: { '@id': `${url}#application` }, inLanguage: 'en-US', datePublished: '2026-09-05', dateModified: '2026-09-05', primaryImageOfPage: { '@id': `${url}#primaryimage` } },
    { '@type': 'ImageObject', '@id': `${url}#primaryimage`, url: `${SITE}/og-image.jpg`, width: 1200, height: 630 },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: spec.category, item: `${SITE}/#tools` },
      { '@type': 'ListItem', position: 3, name: spec.h1, item: url },
    ] },
    { '@type': 'WebApplication', '@id': `${url}#application`, name: spec.title, url, applicationCategory: 'UtilitiesApplication', applicationSubCategory: 'Calculator', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: spec.metaDesc, featureList: spec.featureList || ['Instant live calculation', 'Formula-backed results', 'Free and accessible'], isAccessibleForFree: true, publisher: { '@id': `${SITE}/#organization` } },
  ];
  if (spec.faq && spec.faq.length) {
    graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: spec.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) });
  }
  graph.push({ '@type': 'TechArticle', '@id': `${url}#article`, headline: spec.title, description: spec.metaDesc, author: { '@id': `${SITE}/#organization` }, publisher: { '@id': `${SITE}/#organization` }, datePublished: '2026-09-05', dateModified: '2026-09-05', mainEntityOfPage: { '@id': `${url}#webpage` }, inLanguage: 'en-US', about: { '@type': 'Thing', name: spec.h1, description: spec.metaDesc } });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

// ---------- CUSTOM CSS for new tools ----------
const TOOL_CSS = `<style id="tool2-css">.tool2-secondary{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.tool2-secondary__item{background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.06);border-radius:12px;padding:8px 12px;display:flex;flex-direction:column;gap:2px;min-width:120px}.tool2-secondary__label{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#64748b}.tool2-secondary__item strong{font-size:17px;color:#0f172a}.tool2-secondary__unit{font-size:12px;color:#64748b;font-weight:600}.tool2-tablewrap{overflow-x:auto;margin:18px 0}.tool2-table{width:100%;border-collapse:collapse;font-size:14px;min-width:420px}.tool2-table caption{caption-side:top;text-align:left;font-weight:600;color:#334155;margin-bottom:8px}.tool2-table th,.tool2-table td{border:1px solid rgba(15,23,42,.1);padding:9px 12px;text-align:left}.tool2-table thead th{background:rgba(37,99,235,.08);color:#1e3a8a;font-weight:700}.tool2-table tbody th{background:rgba(15,23,42,.03);font-weight:600}.content-card ul,.content-card ol{margin:10px 0 10px 20px;line-height:1.7}.content-card li{margin:5px 0}.content-p,.content-card p{line-height:1.75}</style>`;

// ---------- PAGE ----------
function renderPage(spec) {
  const url = `${SITE}/${spec.slug}/`;
  const head = `<!DOCTYPE html><html lang="en"> <head><meta charset="UTF-8">${GTAG}<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(spec.title)}</title><meta name="description" content="${escAttr(spec.metaDesc)}"><meta name="keywords" content="${escAttr((spec.keywords || []).join(', '))}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"><meta name="author" content="AmpsTo⚡Watt.com"><link rel="canonical" href="${url}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="alternate icon" href="/favicon.ico"><link rel="manifest" href="/site.webmanifest"><link rel="sitemap" href="/sitemap.xml"><meta name="theme-color" content="#eefaff"><meta name="google-site-verification" content="36n5IaJGMo9LzLsxec75dBS2rLiFtfvhHPPCY5pi3sw"><meta property="og:type" content="website"><meta property="og:title" content="${escAttr(spec.title)}"><meta property="og:description" content="${escAttr(spec.metaDesc)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="AmpsTo⚡Watt.com"><meta property="og:image" content="${SITE}/og-image.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escAttr(spec.title)}"><meta name="twitter:description" content="${escAttr(spec.metaDesc)}"><meta name="twitter:image" content="${SITE}/og-image.jpg">${schema(spec)}<link rel="stylesheet" href="/_astro/BaseLayout.C5i8PAsk.css"><link rel="preload" href="/crystal-premium.v20260626.css" as="style"><link rel="stylesheet" href="/crystal-premium.v20260626.css"><script type="module" src="/_astro/page.vzY--OHv.js"></script> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3874532304392402" crossorigin="anonymous"></script>${TOOL_CSS}${ADIFY_CSS}</head> `;

  const breadcrumb = `<div class="breadcrumb-bar"> <nav aria-label="Breadcrumb"> <a href="/">Home</a><span class="breadcrumb-sep" aria-hidden="true">/</span><a href="/#tools">${esc(spec.category)}</a><span class="breadcrumb-sep" aria-hidden="true">/</span><span class="breadcrumb-current">${esc(spec.h1)}</span> </nav> </div>`;

  const hero = `<main id="main-content" class="legacy-shell"> <div class="legacy-content"> <section class="lux-page-top" aria-labelledby="page-title"> <div class="lux-title-strip"> <p class="premium-kicker lux-kicker">${esc(spec.kicker || spec.category)}</p> <h1 id="page-title">${esc(spec.h1)}</h1> <div class="premium-formula-pill lux-formula-pill">${esc(spec.formulaPill || '')}</div> </div> ${renderCalculator(spec.calc)} <p class="lux-page-lead">${spec.lead || esc(spec.metaDesc)}</p> </section> ${renderContent(spec)} ${renderRelated(spec)} </div> ${AD_LEADER}${AD_MOBILE}</main>`;

  const body = HEADER + AD_LEADER + breadcrumb + hero + methodology(spec) + renderFaqSection(spec) + FOOTER;
  return head + body;
}

// Authoritative on-page content word count: lead + section prose + table text + faq.
function contentWords(spec) {
  let s = strip(spec.lead || '') + ' ';
  for (const c of (spec.content || [])) {
    s += ' ' + strip(c.html || '');
    if (c.table) {
      s += ' ' + (c.table.caption || '') + ' ' + (c.table.columns || []).join(' ') + ' ' + (c.table.rows || []).map(r => r.join(' ')).join(' ');
    }
  }
  for (const f of (spec.faq || [])) s += ' ' + f.q + ' ' + strip(f.a);
  return wc(s);
}

module.exports = { renderPage, wc, strip, SITE, contentWords };
