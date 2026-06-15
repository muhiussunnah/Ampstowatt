const fs = require('fs');
const path = require('path');

// Target pages from 06-MISSING-PAGES.md
const missingLegacyPages = {
  "10-amps-to-watts": {
    title: "10 Amps to Watts — Conversion at 12V, 120V & 240V | Ampstowatt",
    h1Title: "How Many Watts Is 10 Amps?",
    description: "10 amps equals 1,200W at 120V or 2,400W at 240V. See the full table, formula, and AC power factor examples for 10-amp circuit loads.",
    body: `<section class="card">
  <h2>10 Amps to Watts at Common Voltages</h2>
  <p>10 amps equals 1,200 watts at 120 volts (standard US outlet) or 2,400 watts at 240 volts. The exact value depends on the circuit voltage. For AC circuits with inductive loads, multiply by the power factor from the equipment nameplate.</p>
  <table>
    <tr><th>Voltage</th><th>Circuit Type</th><th>Watts (PF 1.00)</th></tr>
    <tr><td>12 V</td><td>DC</td><td>120 W</td></tr>
    <tr><td>24 V</td><td>DC</td><td>240 W</td></tr>
    <tr><td>48 V</td><td>DC</td><td>480 W</td></tr>
    <tr><td>120 V</td><td>AC single-phase</td><td>1,200 W</td></tr>
    <tr><td>208 V</td><td>AC 3-phase</td><td>3,609 W</td></tr>
    <tr><td>220 V</td><td>AC single-phase</td><td>2,200 W</td></tr>
    <tr><td>230 V</td><td>AC single-phase</td><td>2,300 W</td></tr>
    <tr><td>240 V</td><td>AC single-phase</td><td>2,400 W</td></tr>
    <tr><td>277 V</td><td>AC single-phase</td><td>2,770 W</td></tr>
    <tr><td>480 V</td><td>AC 3-phase</td><td>8,314 W</td></tr>
  </table>
  
  <h2>10 Amps to Watts Formula</h2>
  <p>For DC circuits and resistive AC loads: W = 10 A × V<br/>For AC loads with power factor: W = 10 A × V × PF</p>
  <h3>At 120V (US Household Outlet)</h3>
  <p>10 A × 120 V = <strong>1,200 watts</strong></p>
  <h3>At 240V (US Split-Phase)</h3>
  <p>10 A × 240 V = <strong>2,400 watts</strong></p>
  
  <h2>What Uses 10 Amps?</h2>
  <ul>
    <li>Window air conditioner (120V): ~1,000–1,200 W</li>
    <li>Microwave oven (120V): ~1,200 W</li>
    <li>Small electric heater (120V): ~1,200 W</li>
  </ul>
  
  <h2>Breaker Safety for 10-Amp Loads</h2>
  <p>A 10-amp load on a 15A breaker at 120V is 1,200W, which is 67% of the 1,800W maximum — safe for continuous use.</p>
</section>`
  },
  "how-many-watts-per-amp": {
    title: "How Many Watts Per Amp? — Answer at Every Voltage | Ampstowatt",
    h1Title: "How Many Watts Per Amp?",
    description: "One amp equals 12W at 12V, 120W at 120V, and 240W at 240V. The answer depends on voltage. See the complete formula, full table, and real examples.",
    body: `<section class="card">
  <h2>Watts Per Amp at Common Voltages</h2>
  <p>One ampere equals a different number of watts depending on the circuit voltage. At 12 volts, 1 amp = 12 watts. At 120 volts, 1 amp = 120 watts. At 240 volts, 1 amp = 240 watts. The formula is: Watts = Amps × Volts.</p>
  <table>
    <tr><th>Circuit Voltage</th><th>Watts per 1 Amp</th><th>Common Use</th></tr>
    <tr><td>12 V</td><td>12 W</td><td>Automotive, RV, solar</td></tr>
    <tr><td>24 V</td><td>24 W</td><td>LED drivers, some DC systems</td></tr>
    <tr><td>120 V</td><td>120 W</td><td>US household outlets</td></tr>
    <tr><td>240 V</td><td>240 W</td><td>US split-phase, AU/NZ</td></tr>
  </table>
  
  <h2>The Formula: Why Watts Depend on Voltage</h2>
  <p>Watts per amp isn't a fixed number — it scales directly with voltage because of Watt's Law: P = I × V.</p>
  <p>For AC circuits with inductive loads, real watts per amp = voltage × power factor.</p>
</section>`
  },
  "air-conditioner-amps-to-watts": {
    title: "Air Conditioner Amps to Watts Calculator | Ampstowatt",
    h1Title: "Air Conditioner Amps to Watts Calculator",
    description: "Convert air conditioner amps to watts. Window AC, mini-split, and central HVAC wattage from amperage. Enter amps, voltage, and PF for real watts.",
    body: `<section class="card">
  <h2>Air Conditioner Wattage by Amp Rating</h2>
  <table>
    <tr><th>AC Type</th><th>Amps</th><th>Voltage</th><th>PF</th><th>Watts</th></tr>
    <tr><td>Window AC (5,000 BTU)</td><td>5.0 A</td><td>120 V</td><td>0.95</td><td>570 W</td></tr>
    <tr><td>Window AC (12,000 BTU)</td><td>12.5 A</td><td>120 V</td><td>0.95</td><td>1,425 W</td></tr>
    <tr><td>Central AC (3 ton)</td><td>14.5 A</td><td>240 V</td><td>0.85</td><td>2,958 W</td></tr>
  </table>
</section>`
  },
  "generator-amps-to-watts": {
    title: "Generator Amps to Watts Calculator | Ampstowatt",
    h1Title: "Generator Amps to Watts Calculator",
    description: "Calculate generator wattage from outlet amps and voltage. 120V, 240V, and 3-phase generator output watts explained with load planning chart.",
    body: `<section class="card">
  <h2>Generator Output: Amps to Watts Table (120V/240V)</h2>
  <p>Calculate generator wattage from outlet amps and voltage. This helps match your generator capacity to your appliances.</p>
</section>`
  },
  "ev-charger-amps-to-watts": {
    title: "EV Charger Amps to Watts Calculator | Ampstowatt",
    h1Title: "EV Charger Amps to Watts Calculator",
    description: "Calculate EV charger power from amp rating. Level 1 (120V/12A = 1,440W), Level 2 (240V/48A = 11,520W), and DC fast charging explained.",
    body: `<section class="card">
  <h2>EV Charger Types: Amps to Watts at a Glance</h2>
  <table>
    <tr><th>Charger Type</th><th>Amps</th><th>Voltage</th><th>Watts</th></tr>
    <tr><td>Level 1 (EVSE)</td><td>12 A</td><td>120 V</td><td>1,440 W</td></tr>
    <tr><td>Level 2 (standard)</td><td>30 A</td><td>240 V</td><td>7,200 W</td></tr>
    <tr><td>Level 2 (max EVSE)</td><td>48 A</td><td>240 V</td><td>11,520 W</td></tr>
  </table>
</section>`
  },
  "1-amp-to-watts": {
    title: "1 Amp to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 1 Amp?",
    description: "1 amp equals 120W at 120V or 240W at 240V.",
    body: `<section class="card"><h2>1 Amp to Watts Conversion</h2><p>1 amp equals 120W at 120V.</p></section>`
  },
  "5-amps-to-watts": {
    title: "5 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 5 Amps?",
    description: "5 amps equals 600W at 120V or 1,200W at 240V.",
    body: `<section class="card"><h2>5 Amps to Watts Conversion</h2><p>5 amps equals 600W at 120V.</p></section>`
  },
  "15-amps-to-watts": {
    title: "15 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 15 Amps?",
    description: "15 amps equals 1,800W at 120V or 3,600W at 240V.",
    body: `<section class="card"><h2>15 Amps to Watts Conversion</h2><p>15 amps equals 1,800W at 120V.</p></section>`
  },
  "20-amps-to-watts": {
    title: "20 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 20 Amps?",
    description: "20 amps equals 2,400W at 120V or 4,800W at 240V.",
    body: `<section class="card"><h2>20 Amps to Watts Conversion</h2><p>20 amps equals 2,400W at 120V.</p></section>`
  },
  "30-amps-to-watts": {
    title: "30 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 30 Amps?",
    description: "30 amps equals 3,600W at 120V or 7,200W at 240V.",
    body: `<section class="card"><h2>30 Amps to Watts Conversion</h2><p>30 amps equals 3,600W at 120V.</p></section>`
  },
  "50-amps-to-watts": {
    title: "50 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 50 Amps?",
    description: "50 amps equals 6,000W at 120V or 12,000W at 240V.",
    body: `<section class="card"><h2>50 Amps to Watts Conversion</h2><p>50 amps equals 6,000W at 120V.</p></section>`
  },
  "100-amps-to-watts": {
    title: "100 Amps to Watts — Conversion Guide | Ampstowatt",
    h1Title: "How Many Watts is 100 Amps?",
    description: "100 amps equals 12,000W at 120V or 24,000W at 240V.",
    body: `<section class="card"><h2>100 Amps to Watts Conversion</h2><p>100 amps equals 12,000W at 120V.</p></section>`
  },
  "amps-vs-watts": {
    title: "Amps vs Watts — What's the Difference? | Ampstowatt",
    h1Title: "Amps vs Watts: What's the Difference?",
    description: "Amps measure current flow; watts measure power. Learn the difference, see how they relate with Watt's Law, and find out when each unit matters.",
    body: `<section class="card"><h2>Amps vs Watts</h2><p>Amps measure current, watts measure power.</p></section>`
  },
  "motor-amps-to-watts": {
    title: "Electric Motor Amps to Watts Calculator | Ampstowatt",
    h1Title: "Electric Motor Amps to Watts Calculator",
    description: "Convert electric motor amps to watts.",
    body: `<section class="card"><h2>Motor Amps to Watts</h2><p>Convert electric motor amps to watts.</p></section>`
  }
};

const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  for (const [slug, data] of Object.entries(missingLegacyPages)) {
    json[slug] = data;
  }
  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log("Updated legacy-pages.json with Phase 2 pages");
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}

// Now add 480v to tools.ts and register all these new pages to `pages` array
const toolsPath = path.join(__dirname, 'src', 'data', 'tools.ts');
try {
  let content = fs.readFileSync(toolsPath, 'utf8');

  // Add 480v to tools array
  if (!content.includes("'480v-amps-to-watts-calculator'")) {
    const toolsEndIndex = content.lastIndexOf('];', content.indexOf('export const aliases'));
    const toolInsert = `,
  { slug: '480v-amps-to-watts-calculator', title: '480V Amps to Watts Calculator — Industrial 3-Phase | Ampstowatt', h1Title: '480V Amps to Watts Calculator', shortTitle: '480V Calculator', description: 'Convert 480V 3-phase amps to watts for industrial equipment. W = 1.732 × A × 480V × PF. Includes motor and HVAC examples.', kind: 'amps-to-watts', defaultVoltage: 480, defaultPhase: 'ac3', eyebrow: 'Industrial 480V systems', formula: 'Watts = 1.732 x Amps x 480V x PF', highlights: ['Three-phase power', 'Industrial HVAC and motors', 'kW output included'] }`;
    content = content.slice(0, toolsEndIndex) + toolInsert + '\n' + content.slice(toolsEndIndex);
  }

  // Add all other missing pages to `pages` array
  const pagesStart = content.indexOf('export const pages = [');
  let pagesInsert = "";
  for (const [slug, data] of Object.entries(missingLegacyPages)) {
    if (!content.includes(`'${slug}'`)) {
      pagesInsert += `\n  { slug: '${slug}', title: '${data.title}', h1Title: '${data.h1Title}', description: '${data.description}' },`;
    }
  }
  if (pagesInsert) {
    content = content.slice(0, pagesStart + 22) + pagesInsert + content.slice(pagesStart + 22);
  }
  
  fs.writeFileSync(toolsPath, content);
  console.log("Updated tools.ts with Phase 2 pages and 480v calculator");
} catch (e) {
  console.error("Error updating tools.ts:", e);
}
