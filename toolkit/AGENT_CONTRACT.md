# Tool Module Authoring Contract (AmpsToWatt.com)

You are authoring ONE CommonJS module that exports an array of **tool spec objects**. A deterministic generator (`toolkit/generate.cjs`) turns each spec into a full SEO page with a working inline calculator. **Study the reference implementation `toolkit/tools/01-battery.cjs` first — copy its structure and quality exactly.**

## Hard rules (a failing tool breaks the build)
1. `module.exports = [ spec1, spec2, ... ];`
2. Every `calc.compute` MUST be a **named function declaration** `function compute(v){ ... }` — self-contained, pure, no DOM, no closure variables, no external references. It receives an object of input id → value (numbers for number inputs, strings for select inputs — call `parseFloat()` on select values that are numeric). It MUST return `{ primary:{label,value,unit,precision}, secondary:[{label,value,unit,precision}], formula:'...', note:'...' }`.
3. For EVERY entry in the `secondary` array returned by compute, add a matching `{label,unit}` object to `calc.secondary` (top-level, same order) — otherwise the outputs won't render.
4. Provide `calc.tests`: 2–3 cases `{name, in:{...inputs}, expect:<number>, tol:0.01}` where `expect` is the primary value you computed by hand. These are asserted by the test harness.
5. Content MUST total **2000+ words** (lead + all section `html` + faq). Write genuinely useful, unique, entity-rich prose — real formulas, worked numeric examples, reference tables, NEC/industry terms. NOT filler, NOT repetition.
6. `faq`: 6–7 real Q&A. `related`: 6 links.
7. Do NOT invent slugs that already exist (see forbidden list). Use exactly the slugs assigned to you.
8. Escaping: content `html` is injected raw (write valid HTML). In JS strings use straight quotes; avoid unescaped `</script>`.

## Spec shape (all fields required unless marked optional)
```js
{
  slug: 'exact-assigned-slug',
  category: 'Category Name',              // breadcrumb + schema
  kicker: 'Short eyebrow text',
  h1: 'H1 Heading',
  title: '55-60 char SEO title | Ampstowatt',
  metaDesc: '150-160 char meta description with primary keyword.',
  keywords: ['primary kw','secondary kw', ...],   // from assignment
  formulaPill: 'Short formula shown under H1',
  lead: 'One paragraph of HTML with <strong> primary keyword</strong>, ~40-60 words.',
  reviewed: 'September 5, 2026',
  featureList: ['feature', 'feature', 'feature', 'feature'],   // for schema
  methodology: 'One paragraph: how the calculator derives results + standards used.',
  calc: {
    id: 'kebab-id',                       // unique, becomes DOM id tool-<id>
    title: 'Calculator Title',
    subtitle: 'One line under title.',
    primaryLabel: 'Result Label',
    primaryUnit: 'unit',
    formulaText: 'Formula = a × b',
    note: 'short helper under formula',
    secondary: [ {label:'X', unit:'u'}, ... ],   // MUST match compute return order
    inputs: [
      { id:'x', label:'Label', unit:'W', type:'number', value:100, min:0 },       // number
      { id:'y', label:'Mode', unit:'', type:'select', value:'12',
        options:[ {v:'12',t:'12 V'}, {v:'24',t:'24 V'} ] },                        // select
      // optional: step, max, hint
    ],
    compute: function compute(v){
      var out = v.x * parseFloat(v.y);
      return {
        primary:{ label:'Result Label', value: out, unit:'u', precision:2 },
        secondary:[ {label:'X', value: out/1000, unit:'u', precision:2} ],
        formula:'Result = '+v.x+' × '+v.y,
        note:'short dynamic note'
      };
    },
    tests: [ {name:'case', in:{x:100,y:'12'}, expect:1200, tol:0.01} ],
  },
  content: [
    // 7-9 sections. Each: { type:'section', id:'kebab', icon:'⚡', heading:'H2 text', html:'<p class="content-p">...</p><ul><li>..</li></ul>', table?:{caption,columns:[],rows:[[]]} }
    // Recommended sections: Quick Answer, Formula Explained (+table), Worked Examples (3-4 numeric),
    //   a domain-specific deep section (+table), How To Use (ol), Common Mistakes (ul), Applications.
    // Link internally: <a href="/other-slug/">anchor</a>.
  ],
  faq: [ { q:'Question?', a:'Answer with <strong>numbers</strong> and specifics.' }, ... ],  // 6-7
  related: [ { href:'/slug/', badge:'Ah', title:'Tool Name', desc:'short' }, ... ],          // 6
}
```

## Quality bar for content (to actually rank)
- Lead with the answer (featured-snippet style) in the Quick Answer section.
- Include at least TWO data tables with real, correct numbers (`table` on a section).
- Include 3+ fully worked numeric examples with the arithmetic shown.
- Use domain entities/terms naturally (e.g., NEC, ampacity, power factor, LiFePO4, kWh, THD, duty cycle, derating, Peukert).
- Vary sentence structure; write like an expert electrician/engineer, not a template.

## Forbidden slugs (already exist — never output these)
amp-hours-to-watt-hours, amps-to-kw-calculator, kw-to-amps-calculator, kva-to-watts-calculator, amps-to-volt-amps, amp-power-consumption-calculator, voltage-drop-calculator, wire-gauge-calculator, solar-watts-to-amps-calculator, led-watts-to-amps-calculator, speaker-amp-power-calculator, ohms-law-explained, power-factor, kwh-explained, watts-to-amps-calculator, ac-amps-to-watts-calculator, dc-amps-to-watts-calculator, refrigerator-amps-to-watts, air-conditioner-amps-to-watts, dryer-amps-to-watts, microwave-amps-to-watts, generator-amps-to-watts, ev-charger-amps-to-watts, motor-amps-to-watts, pool-pump-amps-to-watts, battery-runtime-calculator

## Self-check before finishing (run this; every tool must print a finite number)
```
node -e "const t=require('./toolkit/tools/NN-YOURFILE.cjs');t.forEach(x=>{const d={};x.calc.inputs.forEach(i=>d[i.id]=(i.type==='select'||i.type==='text')?i.value:parseFloat(i.value));const r=x.calc.compute(d);if(!isFinite(r.primary.value))throw new Error('bad '+x.slug);(x.calc.tests||[]).forEach(tc=>{const g=x.calc.compute(tc.in).primary.value;if(Math.abs(g-tc.expect)>tc.tol*Math.max(1,Math.abs(tc.expect)))throw new Error('TEST FAIL '+x.slug+' got '+g+' want '+tc.expect)});console.log('OK',x.slug,r.primary.value)})"
```
Fix every error until all tools print `OK`.
