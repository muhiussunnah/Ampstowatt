const fs = require('fs');
const path = require('path');

const metaData = {
  // Core pages
  "watts-to-amps-calculator": {
    title: "Watts to Amps Calculator — Convert Watts to Amps | Ampstowatt",
    h1: "Watts to Amps Calculator",
    meta: "Convert watts to amps instantly. Enter watts and volts to find current. DC, AC single-phase, and 3-phase formulas included."
  },
  "kva-to-watts-calculator": {
    title: "kVA to Watts Calculator — Apparent to Real Power | Ampstowatt",
    h1: "kVA to Watts Calculator",
    meta: "Convert kVA to watts using power factor. Enter kVA and PF to get real watts. Includes single-phase and 3-phase formulas."
  },

  // Circuit Type Pages
  "ac-amps-to-watts-calculator": {
    title: "AC Amps to Watts Calculator — Single & 3 Phase | Ampstowatt",
    h1: "AC Amps to Watts Calculator",
    meta: "Convert AC amps to watts with voltage and power factor. Single-phase: W = A × V × PF. Three-phase: W = 1.732 × A × V × PF. Free tool."
  },
  "dc-amps-to-watts-calculator": {
    title: "DC Amps to Watts Calculator — Battery & Solar | Ampstowatt",
    h1: "DC Amps to Watts Calculator",
    meta: "Convert DC amps to watts instantly. No power factor needed. Formula: W = A × V. Perfect for batteries, solar, and automotive."
  },
  "3-phase-amps-to-watts-calculator": {
    title: "3-Phase Amps to Watts Calculator — Industrial Power | Ampstowatt",
    h1: "3-Phase Amps to Watts Calculator",
    meta: "Convert 3-phase amps to watts with W = 1.732 × A × V × PF. Enter amps, line voltage, and power factor. Includes load chart."
  },
  "single-phase-amps-to-watts-calculator": { // mapped from single-phase-amps-to-watts
    title: "Single-Phase Amps to Watts Calculator | Ampstowatt",
    h1: "Single-Phase Amps to Watts Calculator",
    meta: "Calculate single-phase AC watts from amps, voltage, and power factor. Formula: W = A × V × PF. For 120V, 240V, and 230V circuits."
  },

  // Voltage Pages
  "12v-amps-to-watts-calculator": { // mapped from 12v-amps-to-watts
    title: "12V Amps to Watts Calculator — DC Battery & Solar | Ampstowatt",
    h1: "12V Amps to Watts Calculator",
    meta: "Convert 12V amps to watts instantly. Formula: W = A × 12V. For batteries, RV solar, and automotive loads. Includes DC wiring table."
  },
  "120v-amps-to-watts-calculator": {
    title: "120V Amps to Watts Calculator — US Household Circuits | Ampstowatt",
    h1: "120V Amps to Watts Calculator",
    meta: "Convert 120V amps to watts for US household outlets. W = A × 120. Includes 15A, 20A, and 30A breaker planning limits."
  },
  "220v-amps-to-watts-calculator": {
    title: "220V Amps to Watts Calculator — Appliances & Mains | Ampstowatt",
    h1: "220V Amps to Watts Calculator",
    meta: "Convert 220V amps to watts for appliances and international mains. W = A × 220. Includes AC single-phase and load planning."
  },
  "230v-calculator": { // mapped from 230v-amps-to-watts
    title: "230V Amps to Watts Calculator — UK & EU Mains | Ampstowatt",
    h1: "230V Amps to Watts Calculator",
    meta: "Convert 230V amps to watts for UK and EU circuits. W = A × 230 × PF. Includes BS 7671 and IEC load planning examples."
  },
  "240v-amps-to-watts-calculator": {
    title: "240V Amps to Watts Calculator — Dryers, EVs & HVAC | Ampstowatt",
    h1: "240V Amps to Watts Calculator",
    meta: "Convert 240V amps to watts for dryers, EV chargers, and HVAC. W = A × 240. Includes NEC 80% continuous load safety limits."
  },
  "480v-amps-to-watts-calculator": { // Wait, 480v isn't created yet but let's add it
    title: "480V Amps to Watts Calculator — Industrial 3-Phase | Ampstowatt",
    h1: "480V Amps to Watts Calculator",
    meta: "Convert 480V 3-phase amps to watts for industrial equipment. W = 1.732 × A × 480V × PF. Includes motor and HVAC examples."
  },

  // Educational
  "how-many-watts-per-amp": {
    title: "How Many Watts Is 1 Amp? — Formula & Tables | Ampstowatt",
    h1: "How Many Watts Per Amp?",
    meta: "One amp equals different watts depending on voltage: 12W at 12V, 120W at 120V, 240W at 240V. See the complete formula, table, and examples."
  },
  "amps-to-watts-formula": {
    title: "Amps to Watts Formula — DC, AC, and 3-Phase Explained | Ampstowatt",
    h1: "Amps to Watts Formula",
    meta: "The amps to watts formula is W = A × V for DC. For AC: W = A × V × PF. For 3-phase: W = 1.732 × A × V × PF. See worked examples for each."
  },
  "amps-vs-watts": {
    title: "Amps vs Watts — What's the Difference? | Ampstowatt",
    h1: "Amps vs Watts: What's the Difference?",
    meta: "Amps measure current flow; watts measure power. Learn the difference, see how they relate with Watt's Law, and find out when each unit matters."
  },
  "watts-law-explained": {
    title: "Watt's Law Explained — P = I × V Formula Guide | Ampstowatt",
    h1: "Watt's Law Explained",
    meta: "Watt's Law states that power (W) equals current (A) multiplied by voltage (V). Learn how to use P = I × V to solve any electrical conversion."
  },
  "power-factor": { // was power-factor-calculator / power-factor-explained
    title: "Power Factor Calculator — Real, Apparent & Reactive Power | Ampstowatt",
    h1: "Power Factor Calculator",
    meta: "Calculate power factor from watts and VA. Find kVAR for capacitor sizing. Supports single-phase and 3-phase AC power calculations."
  },
  "conversion-charts": {
    title: "Amps to Watts Conversion Chart — All Voltages | Ampstowatt",
    h1: "Amps to Watts Conversion Chart",
    meta: "Complete amps to watts reference tables for 12V, 120V, 240V, and 480V circuits. DC, AC single-phase, and 3-phase values included."
  },

  // Specialized tools
  "solar-watts-to-amps-calculator": { // in tools.ts
    title: "Solar Panel Amps to Watts Calculator — PV System Sizing | Ampstowatt",
    h1: "Solar Panel Amps to Watts Calculator",
    meta: "Calculate solar panel watts from current and voltage. Convert Vmp and Imp to panel watts. Includes DC and battery-side amp planning."
  },
  "led-watts-to-amps-calculator": { // in tools.ts
    title: "LED Watts to Amps Calculator — Driver & Strip Lighting | Ampstowatt",
    h1: "LED Watts to Amps Calculator",
    meta: "Find LED current draw from wattage and voltage. Supports 12V, 24V, and 120V LED strips, bulbs, and drivers. Wire sizing included."
  },
  "speaker-amp-power-calculator": { // in tools.ts
    title: "Speaker Amp Power Calculator — Amplifier Sizing | Ampstowatt",
    h1: "Speaker Amplifier Power Calculator",
    meta: "Calculate amplifier current draw and speaker power from watts and impedance. For home audio, car audio, and PA system planning."
  },
  "amp-hours-to-watt-hours": {
    title: "Amp Hours to Watt Hours Calculator — Battery Sizing | Ampstowatt",
    h1: "Amp Hours to Watt Hours Calculator",
    meta: "Convert Ah to Wh and kWh for battery sizing. Formula: Wh = Ah × V. Works for 12V, 24V, and 48V battery banks and solar storage."
  },
  "voltage-drop-calculator": {
    title: "Voltage Drop Calculator — Wire Length & Gauge | Ampstowatt",
    h1: "Voltage Drop Calculator",
    meta: "Calculate voltage drop for any wire run. Enter current, distance, and conductor size to check compliance with 3% and 5% limits."
  },
  "wire-gauge-calculator": {
    title: "Wire Gauge Calculator — AWG & Ampacity Chart | Ampstowatt",
    h1: "Wire Gauge Calculator",
    meta: "Find the correct wire gauge (AWG) for your current and circuit length. Includes NEC ampacity table and voltage drop planning."
  },
  "amps-to-kw-calculator": {
    title: "Amps to kW Calculator — Current to Kilowatts | Ampstowatt",
    h1: "Amps to kW Calculator",
    meta: "Convert amps to kilowatts for load planning. DC: kW = A × V ÷ 1000. AC: kW = A × V × PF ÷ 1000. Includes 3-phase formula."
  }
};

// 1. Update legacy-pages.json
const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  let updated = false;

  for (const [slug, data] of Object.entries(metaData)) {
    if (json[slug]) {
      json[slug].title = data.title;
      json[slug].h1Title = data.h1;
      json[slug].description = data.meta;
      updated = true;
      console.log(`Updated legacy page meta: ${slug}`);
    } else {
      // It might be stored under a different key but aliased in tools.ts.
      // E.g. ac-calculator -> ac-amps-to-watts-calculator
      // Let's check keys
    }
  }

  if (updated) {
    fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  }
} catch (e) {
  console.error(e);
}

// 2. Update tools.ts (It's a typescript file so we do string replacements carefully)
const toolsPath = path.join(__dirname, 'src', 'data', 'tools.ts');
try {
  let content = fs.readFileSync(toolsPath, 'utf8');
  let updatedContent = content;
  
  for (const [slug, data] of Object.entries(metaData)) {
    // We are looking for something like: { slug: '120v-amps-to-watts-calculator', title: '...', shortTitle: '...', description: '...'
    const regex = new RegExp(`{ slug: '${slug}', title: '[^']+', shortTitle: '([^']+)', description: '[^']+',`, 'g');
    updatedContent = updatedContent.replace(regex, `{ slug: '${slug}', title: '${data.title}', h1Title: '${data.h1}', shortTitle: '$1', description: '${data.meta}',`);
    
    // Fallback if shortTitle is after description or something
    if (content === updatedContent) {
      // Try a more relaxed approach for this slug
      const slugIndex = updatedContent.indexOf(`slug: '${slug}'`);
      if (slugIndex !== -1) {
         // replace title
         let block = updatedContent.substring(slugIndex, updatedContent.indexOf('}', slugIndex));
         block = block.replace(/title: '[^']+'/, `title: '${data.title}'`);
         block = block.replace(/description: '[^']+'/, `description: '${data.meta}'`);
         if (!block.includes('h1Title:')) {
           block = block.replace(/title: '[^']+',/, `title: '${data.title}', h1Title: '${data.h1}',`);
         }
         updatedContent = updatedContent.substring(0, slugIndex) + block + updatedContent.substring(updatedContent.indexOf('}', slugIndex));
         console.log(`Relaxed updated tools.ts for: ${slug}`);
      }
    } else {
      console.log(`Regex updated tools.ts for: ${slug}`);
    }
  }

  fs.writeFileSync(toolsPath, updatedContent);

} catch(e) {
  console.error(e);
}
