const fs = require('fs');

const file = 'src/data/legacy-pages.json';
let raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);
let b = data['__home__'].body;

// Split and remove the old topical hub section
if (b.includes('<section class="topical-hub-section"')) {
  let parts = b.split('<section class="topical-hub-section"');
  let before = parts[0];
  let after = parts[1].split('</section>')[1] || ''; // this might miss nested sections, let's use regex
  
  // Safer removal of the specific section we know ends before device-database
  data['__home__'].body = b.replace(/<section class="topical-hub-section"[\s\S]*?<\/section>\s*(?=<!-- ===== DEVICE DATABASE SECTION ===== -->)/, '');
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully stripped old unstyled topical hub from homepage!');
} else {
  console.log('topical-hub-section not found');
}
