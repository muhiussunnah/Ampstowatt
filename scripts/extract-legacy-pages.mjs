import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'src', 'data');
const outFile = join(outDir, 'legacy-pages.json');

const htmlFiles = [
  { slug: '', file: join(root, 'index.html') },
  ...readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !['node_modules', 'dist', 'src', 'public'].includes(entry.name))
    .map((entry) => ({ slug: entry.name, file: join(root, entry.name, 'index.html') }))
    .filter((entry) => existsSync(entry.file))
];

function matchContent(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function cleanBody(body) {
  return body
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/\s+onclick=(["']).*?\1/gi, '')
    .trim();
}

const pages = {};

for (const { slug, file } of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const body =
    matchContent(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) ||
    matchContent(html, /<body\b[^>]*>([\s\S]*?)<\/body>/i);

  pages[slug || '__home__'] = {
    slug,
    title: matchContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || 'Amps To Watts Calculator',
    description:
      matchContent(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i) ||
      'Premium amps to watts calculator and electrical conversion tools.',
    keywords: matchContent(html, /<meta\s+name=["']keywords["']\s+content=["']([^"']*)["'][^>]*>/i),
    schema: Array.from(html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))
      .map((match) => match[1].trim())
      .filter(Boolean)
      .join('\n'),
    body: cleanBody(body)
  };
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(pages, null, 2)}\n`, 'utf-8');
console.log(`Extracted ${Object.keys(pages).length} legacy pages to ${outFile}`);
