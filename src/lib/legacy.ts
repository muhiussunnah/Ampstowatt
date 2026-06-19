import legacyPages from "@/data/legacy-pages.json";

export type LegacyPage = {
  title: string;
  description: string;
  keywords: string;
  body: string;
  schema: string;
};

const svgPattern = /<svg\b[\s\S]*?<\/svg>/gi;
const duplicateHeroPattern =
  /<section\b[^>]*class="[^"]*(?:brand-header|pro-hero|tool-page-hero|home-hero-compact)[^"]*"[^>]*>[\s\S]*?<\/section>\s*/gi;
const visualClassPattern =
  /\b(?:premium-visual-section|premium-visual-grid|premium-visual-card|technical-visual-card|content-visual-grid|unit-visual-grid|formula-visual-grid|pf-visual-grid|seo-guideline-circuit|mini-svg-diagram|mini-circuit|topic-mini-diagram|section-flow-visual|seo-chart-visual|tool-page-visual|circuit-visual-panel|visual-panel|sub-calculator-section|sub-calculator-grid|tool-page-grid|lx-tool)\b/;
const emptyContentPattern =
  /<(div|section|figure|article)\b[^>]*>\s*<\/\1>\s*/gi;
const inlineStylePattern = /\sstyle="[^"]*"/gi;
const tableHeaderPattern = /<th(?![^>]*\bscope=)([^>]*)>/gi;
const deviceGridCardPattern = /<div class="device-grid-card"(?![^>]*\brole=)/gi;

function decodeMetadata(value: string | undefined) {
  if (!value) return "";
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function findTagClose(html: string, openEnd: number, tag: string) {
  const tagPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi");
  tagPattern.lastIndex = openEnd;
  let depth = 1;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(html))) {
    if (match[0].startsWith("</")) {
      depth -= 1;
      if (depth === 0) return tagPattern.lastIndex;
    } else if (!match[0].endsWith("/>")) {
      depth += 1;
    }
  }

  return -1;
}

function removeVisualBlocks(html: string) {
  let output = html;
  let changed = true;

  while (changed) {
    changed = false;
    const openTagPattern =
      /<(div|section|figure|article)\b[^>]*class="([^"]*)"[^>]*>/gi;
    let match: RegExpExecArray | null;

    while ((match = openTagPattern.exec(output))) {
      if (!visualClassPattern.test(match[2])) continue;

      const tag = match[1];
      const start = match.index;
      const end = findTagClose(output, openTagPattern.lastIndex, tag);
      if (end < 0) continue;

      output = output.slice(0, start) + output.slice(end);
      changed = true;
      break;
    }
  }

  return output;
}

export function prepareLegacyBody(page: LegacyPage) {
  return removeVisualBlocks(page.body)
    .replace(duplicateHeroPattern, "")
    .replace(svgPattern, "")
    .replace(inlineStylePattern, "")
    .replace(tableHeaderPattern, '<th scope="col"$1>')
    .replace(
      deviceGridCardPattern,
      '<div class="device-grid-card" role="listitem"',
    )
    .replace(emptyContentPattern, "");
}

export function getLegacyPage(slug = ""): LegacyPage | null {
  const page = (legacyPages as Record<string, LegacyPage>)[slug || "__home__"];
  if (!page) return null;
  return {
    ...page,
    title: decodeMetadata(page.title),
    description: decodeMetadata(page.description),
    keywords: decodeMetadata(page.keywords),
    body: prepareLegacyBody(page),
  };
}
