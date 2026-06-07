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
      q: 'How do I convert amps to watts?',
      a: 'Multiply amps by volts. For example, 10 amps at 120 volts equals 1,200 watts. For AC inductive loads, multiply by power factor too.',
      icon: 'W'
    },
    {
      q: 'What is the amps to watts formula?',
      a: 'For DC and resistive loads, Watts = Amps x Volts. For single-phase AC, Watts = Amps x Volts x Power Factor. For three-phase AC, Watts = 1.732 x Amps x Volts x Power Factor when using line-to-line voltage.',
      icon: 'AC'
    },
    {
      q: 'How many watts is 1 amp?',
      a: 'One amp equals 12 watts at 12 volts, 120 watts at 120 volts, and 240 watts at 240 volts when power factor is 1.00.',
      icon: '1A'
    },
    {
      q: 'Can I use amps to watts for breaker sizing?',
      a: 'Use the result for planning only. Breaker sizing, continuous-load limits, wire gauge, voltage drop, and local code decisions should be verified by a qualified electrician or engineer.',
      icon: 'SA'
    }
  ];
}
