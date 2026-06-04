const fs = require('fs');

const file = 'src/data/legacy-pages.json';
let raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);

let count = 0;

for (let k in data) {
  if (data[k].body) {
    let oldBody = data[k].body;
    let newBody = oldBody;

    // 1. Remove section-flow-visual
    newBody = newBody.replace(/<div class="topic-equation-strip section-flow-visual">[\s\S]*?<\/div>/g, '');

    // 2. Remove tool-page-visual
    newBody = newBody.replace(/<aside class="card visual-panel circuit-visual-panel tool-page-visual"[\s\S]*?<\/aside>/g, '');

    // 3. Remove seo-chart-visual
    newBody = newBody.replace(/<section class="seo-chart-visual"[\s\S]*?<\/section>/g, '');

    if (oldBody !== newBody) {
      data[k].body = newBody;
      count++;
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log(`Cleaned visuals from ${count} pages`);
