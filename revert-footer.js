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
    
    const target = ' <p class="footer-disclaimer" style="margin-top: 12px;"><strong>Contact:</strong> <a href="mailto:ampstowatt@gmail.com">ampstowatt@gmail.com</a> | <a href="tel:+15187632159">+1 (518) 763-2159</a></p>';
    if (content.includes(target)) {
        content = content.replace(target, '');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log('Reverted', count, 'files.');
