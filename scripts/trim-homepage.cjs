/**
 * Trim homepage legacy content to fix keyword cannibalization.
 * 
 * Removes full H2 sections for topics that have dedicated subpages,
 * replacing them with a consolidated "Related Calculators" hub section.
 * Also removes duplicate/near-duplicate content sections.
 * 
 * Run: node scripts/trim-homepage.cjs
 */
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'legacy-pages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const home = data['__home__'];
let body = home.body;

// ─── STEP 1: Identify cannibalizing H2 sections (have dedicated pages) ───
const cannibalHeadings = [
  'Watts to Amps Calculator',
  'kVA to Watts Calculator',
  'Amps to kW Calculator',
  'MegaWatts to Amps Calculator',
  'Solar Watts to Amps Calculator',
  'LED Watts to Amps Calculator',
  'Speaker Amp Power Calculator',
  'Amp Power Consumption Calculator',
  'Voltage Amps Watts Calculator',
];

// ─── STEP 2: Identify duplicate/near-duplicate sections ───
// These repeat the core "amps to watts" topic already covered in sections 1-7
const duplicateHeadings = [
  // Section 8: "Amps to Watts Conversion" — repeats section 1+5
  'Amps to Watts Conversion',
  // Section 9: "Amps to Watts Formula" — repeats section 3
  'Amps to Watts Formula',
  // Section 10: "Amps to Watts Equation" — repeats section 3+9
  'Amps to Watts Equation',
  // Section 11: "What Is the Amps to Watts Conversion" — repeats section 8
  'What Is the Amps to Watts Conversion',
  // Section 12: "How to Convert Amps to Watts" — repeats section 5
  'How to Convert Amps to Watts',
  // Section 13: "How Calculate Amps to Watts" — repeats section 12
  'How Calculate Amps to Watts',
];

// ─── STEP 3: Remove sections by finding their wrapper elements ───
function removeSection(html, headingText) {
  // Find the H2 with this exact text
  const h2Regex = new RegExp(`<h2[^>]*>\\s*${headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</h2>`, 'i');
  const h2Match = h2Regex.exec(html);
  if (!h2Match) {
    console.log(`  ⚠ Could not find H2: "${headingText}"`);
    return html;
  }

  const h2Pos = h2Match.index;

  // Walk backwards to find the opening <section that wraps this H2
  // Look for the nearest <section before the H2
  let sectionStart = -1;
  let searchPos = h2Pos;
  while (searchPos > 0) {
    const prevSection = html.lastIndexOf('<section', searchPos - 1);
    if (prevSection < 0) break;
    // Check there's no </section> between prevSection and h2Pos
    const betweenText = html.substring(prevSection, h2Pos);
    if (!betweenText.includes('</section>')) {
      sectionStart = prevSection;
      break;
    }
    searchPos = prevSection - 1;
  }

  if (sectionStart < 0) {
    // Fallback: try <div that wraps the H2
    let divStart = html.lastIndexOf('<div', h2Pos);
    if (divStart >= 0) {
      const between = html.substring(divStart, h2Pos);
      if (!between.includes('</div>')) {
        sectionStart = divStart;
      }
    }
  }

  if (sectionStart < 0) {
    console.log(`  ⚠ Could not find wrapper for: "${headingText}"`);
    return html;
  }

  // Find the tag name at sectionStart
  const tagMatch = html.substring(sectionStart).match(/^<(\w+)/);
  const tagName = tagMatch ? tagMatch[1] : 'section';

  // Find the matching close tag
  const closePattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  closePattern.lastIndex = sectionStart + tagMatch[0].length;
  let depth = 1;
  let closeEnd = -1;
  let cm;
  while ((cm = closePattern.exec(html))) {
    if (cm[0].startsWith('</')) {
      depth--;
      if (depth === 0) {
        closeEnd = closePattern.lastIndex;
        break;
      }
    } else if (!cm[0].endsWith('/>')) {
      depth++;
    }
  }

  if (closeEnd < 0) {
    console.log(`  ⚠ Could not find closing tag for: "${headingText}"`);
    return html;
  }

  // Remove any trailing whitespace/newlines after the section
  let trimEnd = closeEnd;
  while (trimEnd < html.length && (html[trimEnd] === '\r' || html[trimEnd] === '\n' || html[trimEnd] === ' ')) {
    trimEnd++;
  }

  console.log(`  ✓ Removed "${headingText}" (${trimEnd - sectionStart} chars)`);
  return html.substring(0, sectionStart) + html.substring(trimEnd);
}

console.log('=== Removing cannibalizing calculator sections ===');
for (const heading of cannibalHeadings) {
  body = removeSection(body, heading);
}

console.log('\n=== Removing duplicate/near-duplicate sections ===');
for (const heading of duplicateHeadings) {
  body = removeSection(body, heading);
}

// Also remove the duplicate "Amps to Watts Formula" (section 32, the second occurrence)
// The first one was already removed as section 9, so now there should be one left
const formulaOccurrences = [...body.matchAll(/<h2[^>]*>\s*Amps to Watts Formula\s*<\/h2>/gi)];
if (formulaOccurrences.length > 0) {
  console.log('\n=== Removing remaining duplicate "Amps to Watts Formula" ===');
  body = removeSection(body, 'Amps to Watts Formula');
}

// ─── STEP 4: Insert a consolidated "Related Calculators" hub section ───
// Find where the last core content section ends (after "Amps to Watts Conversion Chart")
const chartIdx = body.indexOf('<h2>Amps to Watts Conversion Chart</h2>');
if (chartIdx > 0) {
  // Find the end of the chart section
  const chartSectionStart = body.lastIndexOf('<section', chartIdx);
  if (chartSectionStart > 0) {
    const tagM = body.substring(chartSectionStart).match(/^<(\w+)/);
    const tag = tagM ? tagM[1] : 'section';
    const cp = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    cp.lastIndex = chartSectionStart + tagM[0].length;
    let d2 = 1;
    let ce = -1;
    let mm;
    while ((mm = cp.exec(body))) {
      if (mm[0].startsWith('</')) { d2--; if (d2 === 0) { ce = cp.lastIndex; break; } }
      else if (!mm[0].endsWith('/>')) { d2++; }
    }

    if (ce > 0) {
      // Insert the consolidated hub after the chart section
      const hubHtml = `

        <section class="content-section">
          <div class="section-divider">
            <div class="icon-circle" aria-hidden="true">Hub</div>
            <h2>Related Electrical Calculators</h2>
            <div class="line" aria-hidden="true"></div>
          </div>
          <div class="content-card">
            <p class="content-p">Use these specialized calculators for specific electrical conversions. Each tool includes dedicated formulas, worked examples, and reference tables.</p>
            <div class="topic-mini-card-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:0.9rem">
              <span><b><a href="/solar-watts-to-amps-calculator/">Solar Watts to Amps</a></b><small>PV panel and charge controller current</small></span>
              <span><b><a href="/led-watts-to-amps-calculator/">LED Watts to Amps</a></b><small>LED strip and driver current draw</small></span>
              <span><b><a href="/speaker-amp-power-calculator/">Speaker Amp Power</a></b><small>Audio amplifier current and fuse planning</small></span>
              <span><b><a href="/kva-to-watts-calculator/">kVA to Watts</a></b><small>Apparent power to real power conversion</small></span>
              <span><b><a href="/amps-to-kw-calculator/">Amps to kW</a></b><small>Current to kilowatt conversion</small></span>
              <span><b><a href="/megawatts-to-amps-calculator/">Megawatts to Amps</a></b><small>Utility-scale power to current</small></span>
              <span><b><a href="/amp-power-consumption-calculator/">Power Consumption</a></b><small>Energy use and cost from current draw</small></span>
              <span><b><a href="/voltage-amps-watts-calculator/">Voltage Amps Watts</a></b><small>Solve any value from the other two</small></span>
              <span><b><a href="/amp-hours-to-watt-hours/">Amp Hours to Watt Hours</a></b><small>Battery energy capacity conversion</small></span>
            </div>
          </div>
        </section>
`;
      body = body.substring(0, ce) + hubHtml + body.substring(ce);
      console.log('\n✓ Inserted consolidated "Related Electrical Calculators" hub section');
    }
  }
}

// ─── STEP 5: Write back ───
const originalSize = home.body.length;
home.body = body;
data['__home__'] = home;

fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');

console.log(`\n=== RESULT ===`);
console.log(`Original body: ${originalSize} chars`);
console.log(`New body:      ${body.length} chars`);
console.log(`Removed:       ${originalSize - body.length} chars (${Math.round((originalSize - body.length) / originalSize * 100)}%)`);

// Count remaining H2s
const remaining = [...body.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
console.log(`H2 headings:   ${remaining.length} (was 33)`);
remaining.forEach((m, i) => console.log(`  ${i + 1}. ${m[1].replace(/<[^>]+>/g, '').trim()}`));
