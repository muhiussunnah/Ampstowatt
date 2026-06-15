const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'index.astro');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Rename Conversion Table H2 to "Conversion Tables & Values"
  content = content.replace('<h2>Amps to Watts Conversion Table</h2>', '<h2>Conversion Tables & Values</h2>');

  // 2. Demote Power Factor Table H2 to H3
  content = content.replace('<h2>Power Factor Values by Device Type</h2>', '<h3>Power Factor Values by Device Type</h3>');

  // 3. Demote Appliance Chart H2 to H3
  content = content.replace('<h2>Common Appliance Amps and Watts Chart</h2>', '<h3>Common Appliance Amps and Watts Chart</h3>');

  // 4. Rename Power Formula H2 to "The Power Formulas"
  content = content.replace('<h2>Amps to Watts Formula — Explained in Full</h2>', '<h2>The Power Formulas</h2>');

  // 5. Rename Step-by-Step H2 to "Step-by-Step Guide"
  content = content.replace('<h2>How to Convert Amps to Watts — Step by Step</h2>', '<h2>Step-by-Step Guide</h2>');

  // 6. Demote Worked Examples H2 to H3 (since it's not in the 8 H2s list, it should probably be an H3 under Breaker Safety or Step-by-Step, or just an H3)
  content = content.replace('<h2>Amps to Watts Worked Examples</h2>', '<h3>Amps to Watts Worked Examples</h3>');

  // 7. Rename DC vs AC H2 to "DC vs AC Systems"
  content = content.replace('<h2>DC vs AC: When to Use Each Formula</h2>', '<h2>DC vs AC Systems</h2>');

  // 8. Demote Watts to Amps H2 to H3 (Combine with DC vs AC)
  content = content.replace('<h2>Watts to Amps: The Reverse Conversion</h2>', '<h3>Watts to Amps: The Reverse Conversion</h3>');

  // 9. Rename Premium Difference H2
  content = content.replace('<h2 id="premium-difference">What Makes This Amps to Watts Calculator Different</h2>', '<h2 id="premium-difference">Why Choose Our Calculators</h2>');

  // 10. Rename Related Calculators H2
  content = content.replace('<h2 id="related-calculators-heading">Related Amps to Watts Calculators</h2>', '<h2 id="related-calculators-heading">Specialized Calculators Directory</h2>');

  // 11. Demote the 3 hub titles at the bottom to H3s
  content = content.replace('<h2 id="hub-voltage" class="group-title" data-i18n="dir.voltage">Voltage-Specific Calculators</h2>', '<h3 id="hub-voltage" class="group-title" data-i18n="dir.voltage">Voltage-Specific Calculators</h3>');
  content = content.replace('<h2 id="hub-acdc" class="group-title" data-i18n="dir.acdc">AC/DC Power Calculators</h2>', '<h3 id="hub-acdc" class="group-title" data-i18n="dir.acdc">AC/DC Power Calculators</h3>');
  content = content.replace('<h2 id="hub-components" class="group-title" data-i18n="dir.components">Specialized Electrical Calculators</h2>', '<h3 id="hub-components" class="group-title" data-i18n="dir.components">Specialized Electrical Calculators</h3>');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("Successfully updated index.astro headings");
  } else {
    console.log("No replacements made in index.astro.");
  }

} catch (e) {
  console.error("Error updating index.astro:", e);
}
