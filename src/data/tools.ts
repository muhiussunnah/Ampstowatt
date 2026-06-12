export type ToolKind =
  | 'amps-to-watts'
  | 'watts-to-amps'
  | 'amp-hours'
  | 'volt-amps'
  | 'voltage-drop'
  | 'wire-gauge'
  | 'power-factor'
  | 'kva-to-watts'
  | 'amps-to-kw';

export type Tool = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  kind: ToolKind;
  defaultVoltage?: number;
  defaultPhase?: 'dc' | 'ac1' | 'ac3';
  eyebrow: string;
  formula: string;
  highlights: string[];
};

export const tools: Tool[] = [
  { slug: '12v-amps-to-watts-calculator', title: '12V Amps to Watts Calculator — 12V DC Power', shortTitle: '12V Calculator', description: 'Convert 12V amps to watts instantly. Calculate power for batteries, LED strips, solar panels, and automotive DC loads using Watts = Amps × 12V.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Low-voltage DC', formula: 'Watts = Amps x 12V', highlights: ['Battery and vehicle systems', 'DC mode by default', 'Instant wattage and kW output'] },
  { slug: '120v-amps-to-watts-calculator', title: '120V Amps to Watts Calculator — US Outlets', shortTitle: '120V Calculator', description: 'Convert 120V amps to watts for US household outlets, appliances, and branch circuits. Includes 15A/20A breaker limits and power factor support.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'North American circuits', formula: 'Watts = Amps x 120V x PF', highlights: ['15A and 20A planning', 'Power factor support', 'Continuous-load guidance'] },
  { slug: '220v-amps-to-watts-calculator', title: '220V Amps to Watts Calculator — 220V Power', shortTitle: '220V Calculator', description: 'Convert 220V amps to watts for international appliances, workshop equipment, and mains circuits. Supports power factor for motor loads.', kind: 'amps-to-watts', defaultVoltage: 220, defaultPhase: 'ac1', eyebrow: 'High-voltage appliances', formula: 'Watts = Amps x 220V x PF', highlights: ['Appliance load planning', 'AC power factor option', 'kW conversion included'] },
  { slug: '230v-calculator', title: '230V Amps to Watts Calculator — UK/EU Mains', shortTitle: '230V Calculator', description: 'Convert 230V amps to watts for UK and EU mains circuits. Calculate kW, plan MCB sizing, and check ring main capacity at 230 volts.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'UK and EU mains', formula: 'Watts = Amps x 230V x PF', highlights: ['230V preset', 'Single-phase AC mode', 'Professional result summary'] },
  { slug: '240v-amps-to-watts-calculator', title: '240V Amps to Watts Calculator — Split Phase', shortTitle: '240V Calculator', description: 'Convert 240V amps to watts for dryers, EV chargers, HVAC, and split-phase circuits. Includes NEC 80% continuous load guidance.', kind: 'amps-to-watts', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: '240V residential loads', formula: 'Watts = Amps x 240V x PF', highlights: ['EV and HVAC friendly', '80% continuous-load note', 'Watts and kW output'] },
  { slug: 'ac-amps-to-watts-calculator', title: 'AC Amps to Watts Calculator — Single & 3 Phase', shortTitle: 'AC Calculator', description: 'Convert AC amps to watts with power factor for single-phase and three-phase circuits. Real power calculation using RMS voltage and current.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'Alternating current', formula: 'Single phase: W = A x V x PF. Three phase: W = 1.732 x A x V x PF', highlights: ['Single and three-phase', 'Power factor correction', 'RMS voltage workflow'] },
  { slug: 'dc-amps-to-watts-calculator', title: 'DC Amps to Watts Calculator — Battery & Solar', shortTitle: 'DC Calculator', description: 'Convert DC amps to watts for batteries, solar charge controllers, LED drivers, and electronics. Simple formula: Watts = Amps × Volts.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Direct current', formula: 'Watts = Amps x Volts', highlights: ['No power factor needed', 'Battery system presets', 'Clean DC formula'] },
  { slug: 'single-phase-amps-to-watts-calculator', title: 'Single Phase Amps to Watts Calculator', shortTitle: 'Single Phase', description: 'Calculate single-phase AC real power from amps, voltage, and power factor. Covers 120V, 220V, 230V, and 240V residential and commercial loads.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'Single-phase AC', formula: 'Watts = Amps x Volts x PF', highlights: ['Residential and light commercial', 'PF-aware', 'kW result included'] },
  { slug: '3-phase-amps-to-watts-calculator', title: '3 Phase Amps to Watts Calculator — Industrial', shortTitle: '3 Phase', description: 'Calculate three-phase watts from line-to-line voltage, current, and power factor. Formula: W = √3 × A × V × PF for motors and industrial loads.', kind: 'amps-to-watts', defaultVoltage: 400, defaultPhase: 'ac3', eyebrow: 'Three-phase systems', formula: 'Watts = 1.732 x Amps x Volts x PF', highlights: ['Line-to-line voltage model', 'Motor and industrial loads', 'Real power and kW output'] },
  { slug: 'amp-hours-to-watt-hours', title: 'Amp Hours to Watt Hours Calculator (Ah to Wh)', shortTitle: 'Ah to Wh', description: 'Convert battery amp-hours to watt-hours and kWh. Calculate battery energy for 12V, 24V, and 48V systems with efficiency adjustment.', kind: 'amp-hours', eyebrow: 'Battery energy', formula: 'Wh = Ah x Volts x Efficiency', highlights: ['Battery bank sizing', 'Efficiency input', 'Wh and kWh results'] },
  { slug: 'amps-to-volt-amps', title: 'Amps to Volt-Amps (VA) Calculator', shortTitle: 'Amps to VA', description: 'Convert amps to volt-amps (VA) and kVA for UPS sizing, transformer rating, and apparent power calculations. Formula: VA = Amps × Volts.', kind: 'volt-amps', eyebrow: 'Apparent power', formula: 'VA = Amps x Volts', highlights: ['UPS and transformer sizing', 'VA and kVA output', 'Single-phase apparent power'] },
  { slug: 'voltage-drop-calculator', title: 'Voltage Drop Calculator — Wire Run Planning', shortTitle: 'Voltage Drop', description: 'Calculate voltage drop across copper or aluminum wire from amps, distance, and gauge. Check NEC 3% and 5% voltage drop recommendations.', kind: 'voltage-drop', eyebrow: 'Wire planning', formula: 'Voltage drop = 2 x K x I x D / circular mils', highlights: ['Copper and aluminum', 'Distance-aware', 'Percent drop result'] },
  { slug: 'wire-gauge-calculator', title: 'Wire Gauge Calculator — AWG Sizing Tool', shortTitle: 'Wire Gauge', description: 'Choose the right wire gauge (AWG) by current, distance, voltage, and material. Checks both ampacity and voltage drop for safe conductor sizing.', kind: 'wire-gauge', eyebrow: 'Conductor sizing', formula: 'Select smallest ampacity that keeps voltage drop below target', highlights: ['Ampacity reference', 'Voltage-drop check', 'Copper and aluminum options'] },
  { slug: 'power-factor', title: 'Power Factor Calculator — PF, kVAR, Watts', shortTitle: 'Power Factor', description: 'Calculate power factor from real watts and apparent VA. Find current draw, kVAR, and power quality for motors, generators, and AC equipment.', kind: 'power-factor', eyebrow: 'Power quality', formula: 'PF = Watts / VA', highlights: ['Real vs apparent power', 'Current estimate', 'PF quality band'] },
  { slug: 'kva-to-watts-calculator', title: 'kVA to Watts Calculator — Generator Sizing', shortTitle: 'kVA to Watts', description: 'Convert kVA to watts and kilowatts using power factor. Size generators, UPS units, and transformers accurately. Formula: Watts = kVA × 1000 × PF.', kind: 'kva-to-watts', eyebrow: 'Generator and UPS sizing', formula: 'Watts = kVA x 1000 x PF', highlights: ['Generator planning', 'UPS load estimates', 'PF-adjusted watts'] },
  { slug: 'amps-to-kw-calculator', title: 'Amps to kW Calculator — Kilowatt Conversion', shortTitle: 'Amps to kW', description: 'Convert amps to kilowatts for DC, single-phase AC, and three-phase AC systems. Fast kW result for load planning, generator sizing, and energy cost estimates.', kind: 'amps-to-kw', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: 'Kilowatt planning', formula: 'kW = Watts / 1000', highlights: ['Fast kW conversion', 'AC and DC support', 'Load planning result'] },
  { slug: 'voltage-amps-watts-calculator', title: 'Voltage Amps Watts Calculator — Watt\'s Law', shortTitle: 'V A W', description: "Solve voltage, current, and wattage relationships using Watt's Law (P = V × I) and Ohm's Law. Enter any two values to calculate the third.", kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'dc', eyebrow: "Watt's law suite", formula: 'P = V x I', highlights: ['Find watts from V and A', 'Clear formula context', 'General electrical planning'] },
  { slug: 'solar-watts-to-amps-calculator', title: 'Solar Watts to Amps Calculator — Panel Current', shortTitle: 'Solar W to A', description: 'Convert solar panel watts to charging amps for 12V, 24V, and 48V battery systems. Includes MPPT and PWM efficiency adjustment.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Solar charge current', formula: 'Amps = Watts / Volts', highlights: ['12V, 24V, 48V systems', 'Charge controller estimates', 'Efficiency support'] },
  { slug: 'led-watts-to-amps-calculator', title: 'LED Watts to Amps Calculator — Driver Sizing', shortTitle: 'LED W to A', description: 'Calculate LED strip and driver current draw from total watts and supply voltage. Size drivers, fuses, and low-voltage DC wiring for LED installations.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'LED driver sizing', formula: 'Amps = Watts / Volts', highlights: ['LED strips and drivers', 'Low-voltage DC', 'Current draw output'] },
  { slug: 'speaker-amp-power-calculator', title: 'Speaker Amp Power Calculator — Audio Current', shortTitle: 'Speaker Power', description: 'Calculate car audio amplifier current draw from RMS watts, supply voltage, and amp efficiency. Size fuses and power cables for Class AB and Class D amps.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Audio systems', formula: 'Amps = Watts / (Volts x Efficiency)', highlights: ['Car audio friendly', 'Efficiency input', 'Fuse planning context'] },
  { slug: 'amp-power-consumption-calculator', title: 'Amp Power Consumption Calculator — Energy Use', shortTitle: 'Power Consumption', description: 'Estimate watts, kWh, and daily energy use from amp draw, voltage, and runtime hours. Plan electricity costs and battery runtime.', kind: 'amp-hours', eyebrow: 'Runtime and energy', formula: 'Wh = Amps x Volts x Hours', highlights: ['Runtime estimates', 'Energy consumption', 'Battery and appliance use'] },
  { slug: 'megawatts-to-amps-calculator', title: 'Megawatts to Amps Calculator — MW to A', shortTitle: 'MW to Amps', description: 'Convert megawatts to amps for high-voltage three-phase power systems. Calculate utility-scale current at 4.16kV, 11kV, 13.8kV, and higher voltages.', kind: 'watts-to-amps', defaultVoltage: 11000, defaultPhase: 'ac3', eyebrow: 'Utility-scale current', formula: 'Amps = Watts / (1.732 x Volts x PF)', highlights: ['MW-scale systems', 'Three-phase support', 'High-voltage planning'] },
  { slug: 'other-voltages-calculator', title: 'Custom Voltage Amps to Watts Calculator', shortTitle: 'Custom Voltage', description: 'Convert amps to watts at any voltage. Enter a custom voltage for AC, DC, or three-phase circuits not covered by the standard voltage calculators.', kind: 'amps-to-watts', defaultVoltage: 48, defaultPhase: 'dc', eyebrow: 'Custom voltage', formula: 'Watts = Amps x Volts x phase factor x PF', highlights: ['Any voltage', 'AC/DC/3-phase modes', 'Flexible calculator'] }
];

export const aliases: Record<string, string> = {
  '12v-calculator': '12v-amps-to-watts-calculator',
  '120v-calculator': '120v-amps-to-watts-calculator',
  '220v-calculator': '220v-amps-to-watts-calculator',
  '240v-calculator': '240v-amps-to-watts-calculator',
  'ac-calculator': 'ac-amps-to-watts-calculator',
  'dc-calculator': 'dc-amps-to-watts-calculator',
  'single-phase-calculator': 'single-phase-amps-to-watts-calculator',
  '3-phase-calculator': '3-phase-amps-to-watts-calculator',
  'amps-to-watts-120v-calculator': '120v-amps-to-watts-calculator',
  'amps-to-watts-220v-calculator': '220v-amps-to-watts-calculator',
  'amps-to-watts-230v-calculator': '230v-calculator',
  'amps-to-watts-240v-calculator': '240v-amps-to-watts-calculator',
  'amps-to-watts-ac-calculator': 'ac-amps-to-watts-calculator',
  'amps-to-watts-dc-calculator': 'dc-amps-to-watts-calculator',
  'amps-to-watts-3-phase-calculator': '3-phase-amps-to-watts-calculator'
};

export const pages = [
  { slug: 'about-us', title: 'About Amps To Watts Calculator', description: 'Learn about the educational electrical calculator suite built for clear power planning.' },
  { slug: 'contact-us', title: 'Contact Us', description: 'Contact the Amps To Watts Calculator team with corrections, suggestions, or partnership questions.' },
  { slug: 'privacy-policy', title: 'Privacy Policy', description: 'Privacy information for visitors using Amps To Watts Calculator.' },
  { slug: 'terms-conditions', title: 'Terms and Conditions', description: 'Terms of use for Amps To Watts Calculator.' },
  { slug: 'disclaimer', title: 'Disclaimer', description: 'Important safety and educational-use disclaimer for electrical calculations.' },
  { slug: 'cookie-policy', title: 'Cookie Policy', description: 'Cookie information for Amps To Watts Calculator.' },
  { slug: 'cookie-preferences', title: 'Cookie Preferences', description: 'Manage cookie preferences for Amps To Watts Calculator.' },
  { slug: 'site-map', title: 'Site Map', description: 'A complete map of calculators and resources on Amps To Watts Calculator.' },
  { slug: 'what-are-amps', title: 'What Are Amps? — Amperes Explained Simply', description: 'Learn what amps (amperes) are, how electric current works, SI definition, real-world examples, and how amps relate to volts, watts, and ohms.' },
  { slug: 'what-are-watts', title: 'What Are Watts? — Electrical Power Explained', description: 'Learn what watts are, how electrical power is measured, the watt formula, real-world examples, and how watts connect to amps, volts, and energy.' },
  { slug: 'ohms-law-explained', title: "Ohm's Law Explained — Formula, Examples, Calculator", description: "Understand Ohm's Law (V = I × R), how voltage, current, and resistance relate, the power wheel, worked examples, and when Ohm's Law does not apply." },
  { slug: 'understanding-power-factor', title: 'Understanding Power Factor — PF Explained for AC', description: 'Learn what power factor is, why it matters for AC circuits, the power triangle, typical PF values, correction methods, and how PF affects your electricity bill.' },
];

export const educationalSlugs = new Set([
  'what-are-amps',
  'what-are-watts',
  'ohms-law-explained',
  'understanding-power-factor',
]);

export const allRouteSlugs = [...tools.map((tool) => tool.slug), ...Object.keys(aliases), ...pages.map((page) => page.slug)];

export function getToolBySlug(slug: string) {
  const canonicalSlug = aliases[slug] ?? slug;
  return tools.find((tool) => tool.slug === canonicalSlug);
}

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function isEducationalPage(slug: string) {
  return educationalSlugs.has(slug);
}

