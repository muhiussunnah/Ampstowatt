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

      const addLink = (pattern, url) => {
        const targetSlug = url.split('/').join('');
        if (!addedLinks.has(url) && slug !== targetSlug) {
          const regex = new RegExp("\\\\b(" + pattern + ")\\\\b", "i");
          
          let match;
          let tempBody = body;
          let offset = 0;
          while ((match = tempBody.match(regex)) !== null) {
            const matchIndex = match.index + offset;
            const beforeMatch = body.substring(0, matchIndex);
            
            const openTags = (beforeMatch.match(/<a\\b/g) || []).length;
            const closeTags = (beforeMatch.match(new RegExp("</a>", "g")) || []).length;
            
            if (openTags === closeTags) {
              body = body.substring(0, matchIndex) + 
                     '<a href="' + url + '">' + match[1] + '</a>' + 
                     body.substring(matchIndex + match[1].length);
              addedLinks.add(url);
              linkCount++;
              break;
            } else {
              offset += match.index + match[1].length;
              tempBody = tempBody.substring(match.index + match[1].length);
            }
          }
        }
      };

      addLink('DC circuit|DC circuits|direct current', '/dc-amps-to-watts-calculator/');
      addLink('AC single phase|single phase|single-phase', '/single-phase-amps-to-watts-calculator/');
      addLink('AC circuits|alternating current', '/ac-amps-to-watts-calculator/');
      addLink('three phase|3-phase|3 phase', '/3-phase-amps-to-watts-calculator/');
      addLink('power factor', '/power-factor/');
      addLink('circuit breaker|breaker', '/wire-gauge-calculator/');
      addLink('amps to watts formula', '/amps-to-watts-formula/');
      addLink('conversion table|conversion chart', '/conversion-charts/');
      addLink('120V', '/120v-amps-to-watts-calculator/');
      addLink('240V', '/240v-amps-to-watts-calculator/');

      data.body = body;
    }
  }

  fs.writeFileSync(legacyPath, JSON.stringify(json, null, 2));
  console.log('Updated legacy-pages.json with ' + linkCount + ' internal links.');
} catch (e) {
  console.error("Error updating legacy-pages.json:", e);
}
