const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let json = JSON.parse(content);
  let updated = false;

  const makeRegex = (str) => {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const flexSpace = escaped.replace(/\s+/g, '\\s+');
    return new RegExp(flexSpace, 'g');
  };

  for (const key of Object.keys(json)) {
    if (json[key] && typeof json[key].body === 'string') {
      let str = json[key].body;
      let original = str;

      str = str.replace(makeRegex("Household AC appliance calculations include fans, refrigerators, microwaves, window air conditioners, heaters, and chargers. Solar shopping labels such as Top solar contractors, American Made Solar Panels, RV Solar Panels, Residential Solar Panels, Bifacial Solar Panels, Wholesale Solar By The Pallet, Clearance, Wholesale, Commercial, Meyer Burger, Meyer Burger 375W Solar Panel, 120 Cell HJT All-Black, MB_B120AyB_375, Hyperion (Runergy), Hyperion (Runergy) 405W Solar Panel, 108 Cells PERC Bifacial, HY-DH108P8B-405, Meyer Burger 385W Solar Panel, MB_B120AyB_385, and Riverton, NJ are product context; the power formula still uses amps, volts, and PF."), 
      "Common household AC loads include window air conditioners (5–10 A at 120V), refrigerators (1.5–3 A at 120V), microwave ovens (8–15 A at 120V), and electric dryers (20–25 A at 240V). For each, real watts equal amps × volts × power factor from the nameplate.");

      str = str.replace(makeRegex("Solar shopping labels such as Top solar contractors, American Made Solar Panels, RV Solar Panels, Residential Solar Panels, Bifacial Solar Panels, Wholesale Solar By The Pallet, Clearance, Wholesale, Commercial, Meyer Burger, Meyer Burger 375W Solar Panel, 120 Cell HJT All-Black, MB_B120AyB_375, Hyperion (Runergy), Hyperion (Runergy) 405W Solar Panel, 108 Cells PERC Bifacial, HY-DH108P8B-405, Meyer Burger 385W Solar Panel, MB_B120AyB_385, and Riverton, NJ are product context; the power formula still uses amps, volts, and PF."), 
      "Common household AC loads include window air conditioners (5–10 A at 120V), refrigerators (1.5–3 A at 120V), microwave ovens (8–15 A at 120V), and electric dryers (20–25 A at 240V). For each, real watts equal amps × volts × power factor from the nameplate.");

      str = str.replace(makeRegex("Reference authors and institutions in electrical calculation content include Joe Sexton, Aditya Dua, Kevin Weekly, Inch Calculator, Stanford University, University of California Berkeley, and University of Texas."), 
      "For installation safety, verify all wire gauge, fuse sizing, and connector ratings against the maximum continuous current. Consult your vehicle or RV manufacturer's electrical specifications for system-level planning.");

      str = str.replace(makeRegex("Reference labels such as ChatGPT, Google AI, Perplexity, Claude, Grok, X, Facebook, Pinterest, and Telegram are sharing options, not calculation inputs."), "");

      str = str.replace(makeRegex("Use the calculator from Home, Calculators, or All calculators style pages when a load label gives Current (A) and Voltage (V). Reference labels such as ChatGPT, Google AI, Perplexity, Claude, Grok, X, Facebook, Pinterest, and Telegram are sharing options, not calculation inputs."), "");

      // H3s fix
      const newAcSection = `<h2>AC Amps to Watts — Quick Reference Examples</h2>
<p>The table below shows real watt values for common AC loads at 120V and 240V. All examples assume power factor from the equipment nameplate.</p>
<table>
<thead>
<tr><th>Load</th><th>Amps</th><th>Voltage</th><th>PF</th><th>Watts</th></tr>
</thead>
<tbody>
<tr><td>Ceiling fan</td><td>0.5 A</td><td>120 V</td><td>0.85</td><td>51 W</td></tr>
<tr><td>Refrigerator</td><td>2.0 A</td><td>120 V</td><td>0.80</td><td>192 W</td></tr>
<tr><td>Window AC</td><td>7.5 A</td><td>120 V</td><td>0.90</td><td>810 W</td></tr>
<tr><td>Microwave oven</td><td>12.0 A</td><td>120 V</td><td>1.00</td><td>1,440 W</td></tr>
<tr><td>Electric dryer</td><td>24.0 A</td><td>240 V</td><td>1.00</td><td>5,760 W</td></tr>
<tr><td>EV charger (Level 2)</td><td>32.0 A</td><td>240 V</td><td>1.00</td><td>7,680 W</td></tr>
<tr><td>3-phase motor (small)</td><td>10.0 A</td><td>208 V</td><td>0.85</td><td>3,055 W</td></tr>
</tbody>
</table>`;
      
      const h3RegexFallback = /<h3[^>]*>AC Amps to Watts<\/h3>\s*<h3[^>]*>Convert AC Amps Into Watts<\/h3>\s*<h3[^>]*>Voltage Current Watt Relationship<\/h3>\s*<h3[^>]*>AC Electrical Power Calculations<\/h3>\s*<h3[^>]*>Appliance Current Conversion Examples<\/h3>\s*<h3[^>]*>AC Power Consumption Examples<\/h3>/g;
      str = str.replace(h3RegexFallback, newAcSection);
      
      const h3RegexFallback2 = /<h3[^>]*>Residential and Commercial AC Load Calculations P=V x I x PF<\/h3>\s*<h3[^>]*>AC Amps to Watts<\/h3>\s*<h3[^>]*>Convert AC Amps Into Watts<\/h3>\s*<h3[^>]*>Voltage Current Watt Relationship<\/h3>\s*<h3[^>]*>AC Electrical Power Calculations<\/h3>\s*<h3[^>]*>Appliance Current Conversion Examples<\/h3>\s*<h3[^>]*>AC Power Consumption Examples<\/h3>/g;
      str = str.replace(h3RegexFallback2, newAcSection);

      if (str !== original) {
        json[key].body = str;
        updated = true;
        console.log(`Updated content for key: ${key}`);
      }
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log("Successfully updated legacy-pages.json");
  } else {
    console.log("No replacements made.");
  }

} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}
