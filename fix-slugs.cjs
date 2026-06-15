const fs = require('fs');
const path = require('path');

// 1. Rename slugs in legacy-pages.json
const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  
  if (json['230v-calculator']) {
    json['230v-amps-to-watts-calculator'] = json['230v-calculator'];
    delete json['230v-calculator'];
  }
  
  // also what about voltage-amps-watts-calculator? The audit mentions /watts-to-amps-calculator/
  if (json['voltage-amps-watts-calculator']) {
    json['watts-to-amps-calculator'] = json['voltage-amps-watts-calculator'];
    delete json['voltage-amps-watts-calculator'];
  }

  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log("Updated legacy-pages.json slugs");
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}

// 2. Rename slugs in tools.ts
const toolsPath = path.join(__dirname, 'src', 'data', 'tools.ts');
try {
  let toolsContent = fs.readFileSync(toolsPath, 'utf8');
  
  toolsContent = toolsContent.replace(/slug: '230v-calculator'/g, "slug: '230v-amps-to-watts-calculator'");
  toolsContent = toolsContent.replace(/slug: 'voltage-amps-watts-calculator'/g, "slug: 'watts-to-amps-calculator'");
  
  // Update aliases to point to new slugs
  toolsContent = toolsContent.replace(/'230v-calculator': '230v-amps-to-watts-calculator',/g, ""); // Remove circular/bad
  toolsContent = toolsContent.replace(/'amps-to-watts-230v-calculator': '230v-calculator'/g, "'amps-to-watts-230v-calculator': '230v-amps-to-watts-calculator'");
  
  // Also add 230v-calculator to aliases
  toolsContent = toolsContent.replace(/export const aliases: Record<string, string> = {/g, "export const aliases: Record<string, string> = {\n  '230v-calculator': '230v-amps-to-watts-calculator',\n  'voltage-amps-watts-calculator': 'watts-to-amps-calculator',");

  fs.writeFileSync(toolsPath, toolsContent);
  console.log("Updated tools.ts slugs and aliases");
} catch (e) {
  console.error("Error updating tools.ts:", e);
}

// 3. Update astro.config.mjs with redirects
const astroConfigPath = path.join(__dirname, 'astro.config.mjs');
try {
  let astroContent = fs.readFileSync(astroConfigPath, 'utf8');
  
  const redirects = `  redirects: {
    '/12v-calculator/': '/12v-amps-to-watts-calculator/',
    '/120v-calculator/': '/120v-amps-to-watts-calculator/',
    '/220v-calculator/': '/220v-amps-to-watts-calculator/',
    '/230v-calculator/': '/230v-amps-to-watts-calculator/',
    '/240v-calculator/': '/240v-amps-to-watts-calculator/',
    '/ac-calculator/': '/ac-amps-to-watts-calculator/',
    '/dc-calculator/': '/dc-amps-to-watts-calculator/',
    '/single-phase-calculator/': '/single-phase-amps-to-watts-calculator/',
    '/3-phase-calculator/': '/3-phase-amps-to-watts-calculator/',
    '/amps-to-watts-120v-calculator/': '/120v-amps-to-watts-calculator/',
    '/amps-to-watts-220v-calculator/': '/220v-amps-to-watts-calculator/',
    '/amps-to-watts-230v-calculator/': '/230v-amps-to-watts-calculator/',
    '/amps-to-watts-240v-calculator/': '/240v-amps-to-watts-calculator/',
    '/amps-to-watts-ac-calculator/': '/ac-amps-to-watts-calculator/',
    '/amps-to-watts-dc-calculator/': '/dc-amps-to-watts-calculator/',
    '/amps-to-watts-3-phase-calculator/': '/3-phase-amps-to-watts-calculator/',
    '/amps-to-watts-calculator/': '/',
    '/calculators/': '/'
  },`;

  if (!astroContent.includes('redirects: {')) {
    astroContent = astroContent.replace(/export default defineConfig\({/, `export default defineConfig({\n${redirects}`);
    fs.writeFileSync(astroConfigPath, astroContent);
    console.log("Added redirects to astro.config.mjs");
  }
} catch (e) {
  console.error("Error updating astro.config.mjs:", e);
}
