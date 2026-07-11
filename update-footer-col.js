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
    if (content.includes('>CONTACT US</p>')) {
        return;
    }

    const targetRegex = /<\/nav>\s*<\/div>\s*<\/div>\s*<div class="footer-bottom copyright">/;
    
    const svgMail = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    const svgPhone = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;

    if (targetRegex.test(content)) {
        const replacement = `</nav> </div> <div> <p class="footer-title footer-col-title" style="text-transform: uppercase;">CONTACT US</p> <nav class="footer-links" aria-label="Contact us"> <a href="mailto:ampstowatt@gmail.com" style="display:flex; align-items:center; gap:8px;">${svgMail} ampstowatt@gmail.com</a> <a href="tel:+15187632159" style="display:flex; align-items:center; gap:8px;">${svgPhone} +1 (518) 763-2159</a> </nav> </div> </div> <div class="footer-bottom copyright">`;
        content = content.replace(targetRegex, replacement);
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log('Added footer column in', count, 'files.');
