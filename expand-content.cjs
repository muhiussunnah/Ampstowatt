const fs = require('fs');
const path = require('path');

const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));

  // 1. Expand /amps-to-watts-formula/
  if (json['amps-to-watts-formula']) {
    json['amps-to-watts-formula'].body = `<section class="card">
  <h2>The Core Amps to Watts Formula</h2>
  <p>To convert amps to watts, you must use the correct formula based on the type of electrical circuit. The fundamental relationship is defined by Watt's Law, which states that power (watts) equals current (amps) multiplied by voltage (volts). However, this only applies perfectly to Direct Current (DC) circuits and resistive AC loads. For alternating current (AC) with inductive or capacitive loads, the power factor must be included.</p>
  
  <h3>DC Circuit Formula (Direct Current)</h3>
  <p>For battery systems, solar panels, automotive wiring, and most electronics, the formula is simple:</p>
  <div class="formula-display"><strong>Watts = Amps × Volts</strong> (W = A × V)</div>
  <p>In DC circuits, the voltage and current are constant, so there is no phase angle to consider. A 10 amp load on a 12V battery will draw exactly 120 watts.</p>
  
  <h3>AC Single Phase Formula</h3>
  <p>For standard household outlets (120V in the US, 230V in Europe), the current alternates direction. When driving motors, compressors, or fluorescent ballasts, the current and voltage waveforms fall out of sync. This requires the power factor (PF):</p>
  <div class="formula-display"><strong>Watts = Amps × Volts × Power Factor</strong> (W = A × V × PF)</div>
  <p>The power factor is a number between 0 and 1. Resistive heaters have a PF of 1.0, while a typical AC motor might have a PF of 0.85.</p>
  
  <h3>AC Three Phase Formula</h3>
  <p>For industrial systems and large commercial buildings using 3-phase power (like 480V or 400V), the calculation accounts for three separate alternating currents working together. When using the line-to-line voltage, multiply by the square root of 3 (approximately 1.732):</p>
  <div class="formula-display"><strong>Watts = 1.732 × Amps × Volts × Power Factor</strong></div>
  
  <h2>Why Voltage Matters</h2>
  <p>Amps measure the flow rate of electrons, while volts measure the electrical pressure. You cannot convert amps to watts without knowing the voltage. A single amp at 12V is only 12 watts, but at 240V, that same amp delivers 240 watts of power.</p>
</section>`;
  }

  // 2. Expand /conversion-charts/
  if (json['conversion-charts']) {
    json['conversion-charts'].body = `<section class="card">
  <h2>Comprehensive Amps to Watts Conversion Charts</h2>
  <p>Use these quick reference tables to convert amps to watts across the most common electrical voltages used worldwide. These charts assume a power factor of 1.0 (resistive load). For inductive loads, remember to multiply the chart wattage by the equipment's power factor.</p>

  <h3>12V DC (Automotive, RV, Solar)</h3>
  <p>12-volt systems are standard for cars, boats, and small off-grid setups.</p>
  <table>
    <tr><th>Current (Amps)</th><th>Power (Watts)</th><th>Common Application</th></tr>
    <tr><td>1A</td><td>12W</td><td>LED dome light</td></tr>
    <tr><td>5A</td><td>60W</td><td>Small water pump</td></tr>
    <tr><td>10A</td><td>120W</td><td>12V refrigerator</td></tr>
    <tr><td>15A</td><td>180W</td><td>Standard accessory outlet</td></tr>
    <tr><td>20A</td><td>240W</td><td>Light bar</td></tr>
    <tr><td>30A</td><td>360W</td><td>Small power inverter</td></tr>
    <tr><td>50A</td><td>600W</td><td>Winch or large inverter</td></tr>
  </table>

  <h3>120V AC (Standard US Household)</h3>
  <p>120-volt circuits are used for standard wall outlets in North America.</p>
  <table>
    <tr><th>Current (Amps)</th><th>Power (Watts)</th><th>Common Application</th></tr>
    <tr><td>1A</td><td>120W</td><td>Television</td></tr>
    <tr><td>5A</td><td>600W</td><td>Small blender</td></tr>
    <tr><td>10A</td><td>1200W</td><td>Microwave or small heater</td></tr>
    <tr><td>12A</td><td>1440W</td><td>Max continuous load on 15A breaker</td></tr>
    <tr><td>15A</td><td>1800W</td><td>Max peak load on 15A breaker</td></tr>
    <tr><td>16A</td><td>1920W</td><td>Max continuous load on 20A breaker</td></tr>
    <tr><td>20A</td><td>2400W</td><td>Max peak load on 20A breaker</td></tr>
  </table>

  <h3>240V AC (US Heavy Appliances & Global Standard)</h3>
  <p>240-volt circuits power heavy US appliances (dryers, EV chargers, HVAC) and are the standard wall outlet voltage in many countries.</p>
  <table>
    <tr><th>Current (Amps)</th><th>Power (Watts)</th><th>Common Application</th></tr>
    <tr><td>10A</td><td>2400W</td><td>Baseboard heater</td></tr>
    <tr><td>16A</td><td>3840W</td><td>Level 2 EV Charger (Standard)</td></tr>
    <tr><td>20A</td><td>4800W</td><td>Water heater</td></tr>
    <tr><td>30A</td><td>7200W</td><td>Clothes dryer</td></tr>
    <tr><td>40A</td><td>9600W</td><td>Electric range / oven</td></tr>
    <tr><td>50A</td><td>12000W</td><td>Large central air conditioner</td></tr>
  </table>

  <h3>480V AC Three-Phase (Industrial)</h3>
  <p>480-volt 3-phase power is standard in US manufacturing and commercial facilities. (Calculated with line-to-line formula, PF 1.0)</p>
  <table>
    <tr><th>Current (Amps)</th><th>Power (Watts)</th><th>Kilowatts (kW)</th></tr>
    <tr><td>10A</td><td>8,314W</td><td>8.3 kW</td></tr>
    <tr><td>20A</td><td>16,627W</td><td>16.6 kW</td></tr>
    <tr><td>50A</td><td>41,568W</td><td>41.5 kW</td></tr>
    <tr><td>100A</td><td>83,138W</td><td>83.1 kW</td></tr>
  </table>
</section>`;
  }

  // 3. Add Internal Links contextually
  let linkCount = 0;
  for (const [slug, data] of Object.entries(json)) {
    if (data.body) {
      let body = data.body;
      let addedLinks = new Set();

      const addLink = (pattern, url, className = "") => {
        // Simple string replace for the slash
        const targetSlug = url.split('/').join('');
        if (!addedLinks.has(url) && slug !== targetSlug) {
          const regex = new RegExp("(?<!<[^>]*)\\\\b(" + pattern + ")\\\\b(?![^<]*>)", 'i');
          const match = body.match(regex);
          if (match) {
            body = body.replace(regex, '<a href="' + url + '">' + match[1] + '</a>');
            addedLinks.add(url);
            linkCount++;
          }
        }
      };

      addLink('DC circuit|DC circuits|direct current', '/dc-amps-to-watts-calculator/');
      addLink('AC single phase|single phase|single-phase', '/single-phase-amps-to-watts-calculator/');
      addLink('AC circuits|alternating current', '/ac-amps-to-watts-calculator/');
      addLink('three phase|3-phase|3 phase', '/3-phase-amps-to-watts-calculator/');
      addLink('power factor|PF', '/power-factor/');
      addLink('circuit breaker|breaker', '/wire-gauge-calculator/');
      addLink('amps to watts formula', '/amps-to-watts-formula/');
      addLink('conversion table|conversion chart', '/conversion-charts/');
      addLink('120V', '/120v-amps-to-watts-calculator/');
      addLink('240V', '/240v-amps-to-watts-calculator/');

      data.body = body;
    }
  }

  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log('Updated legacy-pages.json: Expanded thin pages and added ' + linkCount + ' internal links.');
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}
