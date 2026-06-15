const fs = require('fs');
const path = require('path');

const missingPages = [
  { slug: '40-amps-to-watts', title: '40 Amps to Watts Calculator', h1Title: '40 Amps to Watts Calculator', description: 'Convert 40 amps to watts.' },
  { slug: '60-amps-to-watts', title: '60 Amps to Watts at 120V and 240V', h1Title: '60 Amps to Watts at 120V and 240V', description: 'Convert 60 amps to watts.' },
  { slug: 'kw-to-amps-calculator', title: 'kW to Amps Calculator — DC, AC Single-Phase & Three-Phase', h1Title: 'kW to Amps Calculator: Convert Kilowatts to Amperes', description: 'Convert kW to Amps.' },
  { slug: 'electric-motor-amps-to-watts', title: 'Motor Amps to Watts Calculator — HP, kW, and Efficiency', h1Title: 'Motor Amps to Watts Calculator — HP, kW, and Efficiency', description: 'Convert electric motor amps to watts.' },
  { slug: 'kwh-explained', title: 'What Is a kWh? Kilowatt Hours Explained Simply', h1Title: 'What Is a kWh? Kilowatt Hours Explained Simply', description: 'What is a kWh?' },
  { slug: 'watts-law-explained', title: "Watt's Law Explained — Formula, Examples, and Uses", h1Title: "Watt's Law Explained — Formula, Examples, and Uses", description: "Watt's Law Explained." },
  { slug: 'power-factor-explained', title: 'What Is Power Factor? A Plain-English Guide', h1Title: 'What Is Power Factor? A Plain-English Guide', description: 'What is Power Factor?' },
  { slug: 'watts-to-amps-120v', title: 'Watts to Amps at 120V — US Standard Circuit', h1Title: 'Watts to Amps at 120V — US Standard Circuit', description: 'Convert watts to amps at 120V.' },
  { slug: 'watts-to-amps-12v', title: 'Watts to Amps at 12V — DC Battery Systems', h1Title: 'Watts to Amps at 12V — DC Battery Systems', description: 'Convert watts to amps at 12V.' },
  { slug: 'watts-to-amps-240v', title: 'Watts to Amps at 240V — Dryers, EVs, and High Power', h1Title: 'Watts to Amps at 240V — Dryers, EVs, and High Power', description: 'Convert watts to amps at 240V.' },
  { slug: '24v-amps-to-watts', title: '24V Amps to Watts Calculator — Telecom and Solar', h1Title: '24V Amps to Watts Calculator — Telecom and Solar', description: 'Convert 24V amps to watts.' },
  { slug: 'refrigerator-amps-to-watts', title: 'Refrigerator Amps to Watts — Running and Startup Watts', h1Title: 'Refrigerator Amps to Watts — Running and Startup Watts', description: 'Refrigerator Amps to Watts.' },
  { slug: 'microwave-amps-to-watts', title: 'Microwave Amps to Watts — 700W to 1800W Models', h1Title: 'Microwave Amps to Watts — 700W to 1800W Models', description: 'Microwave Amps to Watts.' },
  { slug: 'dryer-amps-to-watts', title: 'Dryer Amps to Watts — Electric and Gas Dryer Circuits', h1Title: 'Dryer Amps to Watts — Electric and Gas Dryer Circuits', description: 'Dryer Amps to Watts.' },
  { slug: 'pool-pump-amps-to-watts', title: 'Pool Pump Amps to Watts — Variable Speed and Single Speed', h1Title: 'Pool Pump Amps to Watts — Variable Speed and Single Speed', description: 'Pool Pump Amps to Watts.' }
];

const toolsPath = path.join(__dirname, 'src', 'data', 'tools.ts');
try {
  let toolsContent = fs.readFileSync(toolsPath, 'utf8');

  let newPagesString = '';
  for (const page of missingPages) {
    if (!toolsContent.includes("slug: '" + page.slug + "'")) {
      newPagesString += "  { slug: '" + page.slug + "', title: '" + page.title.replace(/'/g, "\\'") + "', h1Title: '" + page.h1Title.replace(/'/g, "\\'") + "', description: '" + page.description.replace(/'/g, "\\'") + "' },\n";
    }
  }

  if (newPagesString) {
    // Find the end of export const pages array
    const target = "  { slug: 'understanding-power-factor'";
    toolsContent = toolsContent.replace(target, newPagesString + target);
    fs.writeFileSync(toolsPath, toolsContent);
    console.log('Updated tools.ts with missing pages.');
  }
} catch(e) {
  console.error(e);
}
