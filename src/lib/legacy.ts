import legacyPages from '@/data/legacy-pages.json';

export type LegacyPage = {
  title: string;
  description: string;
  keywords: string;
  body: string;
  schema: string;
};

const svgPattern = /<svg\b[\s\S]*?<\/svg>/gi;
const duplicateHeroPattern = /<section\b[^>]*class="[^"]*(?:brand-header|pro-hero|tool-page-hero|home-hero-compact)[^"]*"[^>]*>[\s\S]*?<\/section>\s*/gi;
const emptyVisualCardPattern = /<figure\b[^>]*class="[^"]*(?:premium-visual-card|technical-visual-card)[^"]*"[^>]*>\s*(?:<figcaption>[\s\S]*?<\/figcaption>)?\s*(?:<p>[\s\S]*?<\/p>)?\s*<\/figure>/gi;
const emptyGuidelinePattern = /<div\b[^>]*class="[^"]*(?:seo-guideline-circuit|mini-svg-diagram)[^"]*"[^>]*>\s*<\/div>/gi;

function visualKind(slug: string, title: string, index: number) {
  const key = `${slug} ${title}`.toLowerCase();
  if (key.includes('3-phase') || key.includes('three phase') || key.includes('three-phase')) return 'three';
  if (key.includes('single-phase') || key.includes('single phase') || key.includes('ac')) return 'ac';
  if (key.includes('dc') || key.includes('12v') || key.includes('battery') || key.includes('solar')) return 'dc';
  if (key.includes('wire') || key.includes('voltage drop')) return 'wire';
  return ['core', 'ac', 'three', 'dc'][index % 4];
}

function visualFormula(kind: string) {
  if (kind === 'three') return 'P = 1.732 x A x V x PF';
  if (kind === 'ac') return 'P = A x V x PF';
  if (kind === 'dc') return 'P = A x V';
  if (kind === 'wire') return 'Voltage drop + load path';
  return 'W = A x V x PF';
}

function buildVisual(slug: string, title: string, index: number) {
  const kind = visualKind(slug, title, index);
  const label = title.replace(/"/g, '&quot;');
  return `
<div class="aw-electric-visual aw-electric-visual--${kind}" role="img" aria-label="${label} electrical conversion visual">
  <div class="aw-visual-topline">
    <span>Electrical conversion model</span>
    <strong>${visualFormula(kind)}</strong>
  </div>
  <div class="aw-circuit-stage" aria-hidden="true">
    <div class="aw-port aw-port-input">
      <small>Input</small>
      <b>${kind === 'dc' ? 'DC' : kind === 'three' ? '3P' : 'AC'}</b>
    </div>
    <div class="aw-flow aw-flow-one"><i></i><i></i><i></i></div>
    <div class="aw-meter">
      <span>A</span>
      <span>V</span>
      <span>PF</span>
    </div>
    <div class="aw-flow aw-flow-two"><i></i><i></i><i></i></div>
    <div class="aw-port aw-port-output">
      <small>Result</small>
      <b>W</b>
    </div>
  </div>
  <div class="aw-phase-strip" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>
</div>`;
}

export function prepareLegacyBody(page: LegacyPage, slug = '') {
  let visualIndex = 0;
  return page.body
    .replace(duplicateHeroPattern, '')
    .replace(svgPattern, () => buildVisual(slug, page.title, visualIndex++))
    .replace(emptyVisualCardPattern, '')
    .replace(emptyGuidelinePattern, '');
}

export function getLegacyPage(slug = ''): LegacyPage | null {
  const page = (legacyPages as Record<string, LegacyPage>)[slug || '__home__'];
  if (!page) return null;
  return {
    ...page,
    body: prepareLegacyBody(page, slug)
  };
}
