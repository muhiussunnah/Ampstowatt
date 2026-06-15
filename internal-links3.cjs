const fs = require('fs');
const path = require('path');

const legacyPath = path.join(__dirname, 'src', 'data', 'legacy-pages.json');
try {
  let json = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));

  let linkCount = 0;
  for (const [slug, data] of Object.entries(json)) {
    if (data.body) {
      let body = data.body;
      let addedLinks = new Set();

      const terms = [
        { regex: /\\b(DC circuit)\\b/i, url: '/dc-amps-to-watts-calculator/' },
        { regex: /\\b(direct current)\\b/i, url: '/dc-amps-to-watts-calculator/' },
        { regex: /\\b(AC single phase)\\b/i, url: '/single-phase-amps-to-watts-calculator/' },
        { regex: /\\b(single phase)\\b/i, url: '/single-phase-amps-to-watts-calculator/' },
        { regex: /\\b(alternating current)\\b/i, url: '/ac-amps-to-watts-calculator/' },
        { regex: /\\b(three phase)\\b/i, url: '/3-phase-amps-to-watts-calculator/' },
        { regex: /\\b(power factor)\\b/i, url: '/power-factor/' },
        { regex: /\\b(circuit breaker)\\b/i, url: '/wire-gauge-calculator/' },
        { regex: /\\b(amps to watts formula)\\b/i, url: '/amps-to-watts-formula/' }
      ];

      for (const term of terms) {
        const targetSlug = term.url.split('/').join('');
        if (slug !== targetSlug && !addedLinks.has(term.url)) {
          if (term.regex.test(body)) {
            // Note: we might accidentally replace inside an existing <a> tag 
            // but these exact terms shouldn't be in hrefs.
            body = body.replace(term.regex, '<a href="' + term.url + '">$1</a>');
            addedLinks.add(term.url);
            linkCount++;
          }
        }
      }

      data.body = body;
    }
  }

  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log('Updated legacy-pages.json with ' + linkCount + ' internal links.');
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}
