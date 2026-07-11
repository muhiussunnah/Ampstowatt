const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const distDir = path.join('d:/Git/ampstowatts/Ampstowatt/Ampstowatt/dist');
const files = walk(distDir);

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if we already updated it
    if (content.includes('ampstowatt@gmail.com</a> | <a href="tel:+15187632159"')) {
        return;
    }

    const regex = /(only;\s*verify\s*safety-critical\s*work\s*with\s*a\s*licensed\s*professional\.\s*<\/p>)/;
    if (regex.test(content)) {
        const replacement = `$1 <p class="footer-disclaimer" style="margin-top: 12px;"><strong>Contact:</strong> <a href="mailto:ampstowatt@gmail.com">ampstowatt@gmail.com</a> | <a href="tel:+15187632159">+1 (518) 763-2159</a></p>`;
        content = content.replace(regex, replacement);
        fs.writeFileSync(file, content, 'utf8');
        count++;
    } else {
        console.log('Regex not matched in:', file);
    }
});
console.log('Updated', count, 'files.');
