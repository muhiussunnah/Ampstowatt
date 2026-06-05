import type { Tool } from '@/data/tools';

export type FaqItem = {
  q: string;
  a: string;
  icon: string;
};

/**
 * Generate FAQ questions for a given tool, or default homepage questions.
 * Shared between BaseLayout (schema) and PremiumFAQ (UI).
 */
export function getFaqQuestions(tool?: Tool): FaqItem[] {
  if (tool) {
    const name = tool.shortTitle;
    const formula = tool.formula;
    const mode = tool.defaultPhase === 'dc' ? 'DC' : tool.defaultPhase === 'ac3' ? 'three-phase' : 'AC/DC';
    return [
      {
        q: `How does the ${name} calculator work?`,
        a: `Enter the known electrical values, then the calculator applies ${formula} to return a planning result instantly.`,
        icon: 'W'
      },
      {
        q: `What inputs do I need for the ${name} calculator?`,
        a: `Most calculations need current, voltage, and the correct circuit type. ${mode !== 'DC' ? 'For AC systems, use a realistic power factor from the equipment nameplate when available.' : 'For DC systems, power factor is not required.'}`,
        icon: 'IN'
      },
      {
        q: `Can I use this result for real wiring or breaker sizing?`,
        a: 'Use the result for planning and comparison. Final wiring, breaker, conductor, voltage-drop, derating, and code decisions should be verified by a qualified electrician or engineer.',
        icon: 'SA'
      },
      {
        q: 'Why do AC and three-phase results differ from DC?',
        a: 'DC uses a direct volts x amps relationship. AC can include power factor, and three-phase systems use a phase multiplier or line-to-neutral formula.',
        icon: 'AC'
      }
    ];
  }

  return [
    {
      q: 'Which calculator should I use first?',
      a: 'Use Amps to Watts when you know current and voltage. Use Watts to Amps when you know load power and need current draw.',
      icon: 'A'
    },
    {
      q: 'Do the calculators support AC, DC, and three-phase systems?',
      a: 'Yes. The suite includes DC, single-phase AC, three-phase AC, power factor, battery energy, wire gauge, and voltage-drop workflows.',
      icon: 'AC'
    },
    {
      q: 'Are the calculators suitable for safety-critical electrical design?',
      a: 'They are educational planning tools. Verify final electrical work with equipment data, applicable code, and a licensed professional.',
      icon: 'SA'
    }
  ];
}
