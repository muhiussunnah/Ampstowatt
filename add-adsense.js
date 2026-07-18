const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dist = path.join(root, 'dist');

// IMPORTANT: Replace this with your actual Publisher ID (e.g., ca-pub-xxxxxxxxxxxxxxxx)
const PUBLISHER_ID = 'ca-pub-3874532304392402';

const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}" crossorigin="anonymous"></script>`;

function updateFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      updateFiles(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Don't add if it's already there or if we still have the placeholder
      if (content.includes('pagead2.googlesyndication.com') || PUBLISHER_ID === 'ca-pub-REPLACE_WITH_YOUR_ID') {
        continue;
      }

      // Insert right before </head>
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${adsenseScript}\n</head>`);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${path.relative(root, fullPath)}`);
      }
    }
  }
}

if (PUBLISHER_ID === 'ca-pub-REPLACE_WITH_YOUR_ID') {
    console.log("ERROR: You must edit this script and replace 'ca-pub-REPLACE_WITH_YOUR_ID' with your actual Google AdSense Publisher ID before running.");
    process.exit(1);
}

console.log('Injecting Google AdSense code...');
updateFiles(dist);
console.log('Finished updating all HTML files.');
