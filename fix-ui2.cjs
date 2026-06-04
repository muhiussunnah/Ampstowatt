const fs = require('fs');

// 1. Fix CSS
const css = `
/* Semantic SEO Hub Grid */
.premium-directory-grid {
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
}
@media (min-width: 768px) {
  .premium-directory-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.premium-directory-group {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.75rem;
}
.group-icon {
  font-size: 1.5rem;
  color: var(--primary);
  background: rgba(22, 217, 244, 0.1);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}
.group-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}
.group-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.group-links a {
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.02);
}
.group-links a:hover, .group-links a:focus {
  color: var(--primary);
  background: rgba(22, 217, 244, 0.08);
  padding-left: 1rem;
}
`;
fs.appendFileSync('src/styles/site.css', css);
console.log('Added CSS');

// 2. Fix Homepage link map
const file = 'src/data/legacy-pages.json';
let raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);
let b = data['__home__'].body;
if (b.includes('<section class="semantic-link-map"')) {
  data['__home__'].body = b.split('<section class="semantic-link-map"')[0];
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Fixed homepage link map');
}
