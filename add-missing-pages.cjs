const fs = require('fs');
const path = require('path');

// 1. Add to tools.ts
const toolsPath = path.join(__dirname, 'src', 'data', 'tools.ts');
try {
  let content = fs.readFileSync(toolsPath, 'utf8');
  
  if (!content.includes("'amps-to-watts-formula'")) {
    const pagesIndex = content.indexOf('export const pages = [');
    const insertString = `
  { slug: 'amps-to-watts-formula', title: 'Amps to Watts Formula — DC, AC, and 3-Phase Explained | Ampstowatt', description: 'The amps to watts formula is W = A × V for DC. For AC: W = A × V × PF. For 3-phase: W = 1.732 × A × V × PF. See worked examples for each.' },
  { slug: 'conversion-charts', title: 'Amps to Watts Conversion Chart — All Voltages | Ampstowatt', description: 'Complete amps to watts reference tables for 12V, 120V, 240V, and 480V circuits. DC, AC single-phase, and 3-phase values included.' },`;
    content = content.slice(0, pagesIndex + 22) + insertString + content.slice(pagesIndex + 22);
    
    // Add to educationalSlugs
    const eduIndex = content.indexOf('export const educationalSlugs = new Set([');
    const eduInsert = `
  'amps-to-watts-formula',
  'conversion-charts',`;
    content = content.slice(0, eduIndex + 41) + eduInsert + content.slice(eduIndex + 41);

    fs.writeFileSync(toolsPath, content);
    console.log("Added missing pages to tools.ts");
  }
} catch (e) {
  console.error("Error updating tools.ts:", e);
}

// 2. Add to legacy-pages.json
const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  
  if (!json['amps-to-watts-formula']) {
    json['amps-to-watts-formula'] = {
      title: "Amps to Watts Formula — DC, AC, and 3-Phase Explained | Ampstowatt",
      h1Title: "Amps to Watts Formula",
      description: "The amps to watts formula is W = A × V for DC. For AC: W = A × V × PF. For 3-phase: W = 1.732 × A × V × PF. See worked examples for each.",
      body: `<section class="card">
  <h2>The Amps to Watts Formula</h2>
  <p>The amps to watts formula is W = A × V for DC. For AC: W = A × V × PF. For 3-phase: W = 1.732 × A × V × PF.</p>
  <h3>DC Formula</h3>
  <p>Watts = Amps × Volts</p>
  <h3>AC Single Phase Formula</h3>
  <p>Watts = Amps × Volts × Power Factor (PF)</p>
  <h3>AC Three Phase Formula</h3>
  <p>Watts = 1.732 × Amps × Volts × Power Factor (PF)</p>
</section>`
    };
  }

  if (!json['conversion-charts']) {
    json['conversion-charts'] = {
      title: "Amps to Watts Conversion Chart — All Voltages | Ampstowatt",
      h1Title: "Amps to Watts Conversion Chart",
      description: "Complete amps to watts reference tables for 12V, 120V, 240V, and 480V circuits. DC, AC single-phase, and 3-phase values included.",
      body: `<section class="card">
  <h2>Amps to Watts Conversion Charts</h2>
  <p>Complete amps to watts reference tables for 12V, 120V, 240V, and 480V circuits.</p>
  <h3>120V Conversion Chart</h3>
  <table>
    <tr><th>Amps</th><th>Watts</th></tr>
    <tr><td>5A</td><td>600W</td></tr>
    <tr><td>10A</td><td>1200W</td></tr>
    <tr><td>15A</td><td>1800W</td></tr>
  </table>
</section>`
    };
  }

  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log("Added missing pages to legacy-pages.json");
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}
