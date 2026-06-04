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
  { slug: '12v-amps-to-watts-calculator', title: '12V Amps To Watts Calculator', shortTitle: '12V Calculator', description: 'Calculate watts from amps for 12 volt batteries, LED strips, solar accessories, and automotive DC loads.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Low-voltage DC', formula: 'Watts = Amps x 12V', highlights: ['Battery and vehicle systems', 'DC mode by default', 'Instant wattage and kW output'] },
  { slug: '120v-amps-to-watts-calculator', title: '120V Amps To Watts Calculator', shortTitle: '120V Calculator', description: 'Convert amps to watts for 120V North American outlets, appliances, tools, and branch circuits.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'North American circuits', formula: 'Watts = Amps x 120V x PF', highlights: ['15A and 20A planning', 'Power factor support', 'Continuous-load guidance'] },
  { slug: '220v-amps-to-watts-calculator', title: '220V Amps To Watts Calculator', shortTitle: '220V Calculator', description: 'Estimate watts from amps on 220 volt appliance, workshop, and international mains circuits.', kind: 'amps-to-watts', defaultVoltage: 220, defaultPhase: 'ac1', eyebrow: 'High-voltage appliances', formula: 'Watts = Amps x 220V x PF', highlights: ['Appliance load planning', 'AC power factor option', 'kW conversion included'] },
  { slug: '230v-calculator', title: '230V Amps To Watts Calculator', shortTitle: '230V Calculator', description: 'Calculate watts, kilowatts, and circuit load for 230V UK, EU, and international mains systems.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'UK and EU mains', formula: 'Watts = Amps x 230V x PF', highlights: ['230V preset', 'Single-phase AC mode', 'Professional result summary'] },
  { slug: '240v-amps-to-watts-calculator', title: '240V Amps To Watts Calculator', shortTitle: '240V Calculator', description: 'Convert 240 volt current draw into watts for dryers, EV chargers, HVAC units, and large residential circuits.', kind: 'amps-to-watts', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: '240V residential loads', formula: 'Watts = Amps x 240V x PF', highlights: ['EV and HVAC friendly', '80% continuous-load note', 'Watts and kW output'] },
  { slug: 'ac-amps-to-watts-calculator', title: 'AC Amps To Watts Calculator', shortTitle: 'AC Calculator', description: 'Convert AC amps to watts with power factor for single-phase and three-phase systems.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'Alternating current', formula: 'Single phase: W = A x V x PF. Three phase: W = 1.732 x A x V x PF', highlights: ['Single and three-phase', 'Power factor correction', 'RMS voltage workflow'] },
  { slug: 'dc-amps-to-watts-calculator', title: 'DC Amps To Watts Calculator', shortTitle: 'DC Calculator', description: 'Convert DC amps to watts for batteries, solar charge controllers, LED drivers, and electronics.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Direct current', formula: 'Watts = Amps x Volts', highlights: ['No power factor needed', 'Battery system presets', 'Clean DC formula'] },
  { slug: 'single-phase-amps-to-watts-calculator', title: 'Single Phase Amps To Watts Calculator', shortTitle: 'Single Phase', description: 'Calculate single-phase real power from amps, voltage, and power factor.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'Single-phase AC', formula: 'Watts = Amps x Volts x PF', highlights: ['Residential and light commercial', 'PF-aware', 'kW result included'] },
  { slug: '3-phase-amps-to-watts-calculator', title: '3 Phase Amps To Watts Calculator', shortTitle: '3 Phase', description: 'Calculate three-phase watts from line-to-line voltage, current, and power factor.', kind: 'amps-to-watts', defaultVoltage: 400, defaultPhase: 'ac3', eyebrow: 'Three-phase systems', formula: 'Watts = 1.732 x Amps x Volts x PF', highlights: ['Line-to-line voltage model', 'Motor and industrial loads', 'Real power and kW output'] },
  { slug: 'amp-hours-to-watt-hours', title: 'Amp Hours To Watt Hours Calculator', shortTitle: 'Ah to Wh', description: 'Convert battery amp-hours to watt-hours and kilowatt-hours using nominal voltage and efficiency.', kind: 'amp-hours', eyebrow: 'Battery energy', formula: 'Wh = Ah x Volts x Efficiency', highlights: ['Battery bank sizing', 'Efficiency input', 'Wh and kWh results'] },
  { slug: 'amps-to-volt-amps', title: 'Amps To Volt-Amps Calculator', shortTitle: 'Amps to VA', description: 'Find apparent power in VA and kVA from current and voltage.', kind: 'volt-amps', eyebrow: 'Apparent power', formula: 'VA = Amps x Volts', highlights: ['UPS and transformer sizing', 'VA and kVA output', 'Single-phase apparent power'] },
  { slug: 'voltage-drop-calculator', title: 'Voltage Drop Calculator', shortTitle: 'Voltage Drop', description: 'Estimate voltage drop across copper or aluminum conductors from current, distance, voltage, and wire size.', kind: 'voltage-drop', eyebrow: 'Wire planning', formula: 'Voltage drop = 2 x K x I x D / circular mils', highlights: ['Copper and aluminum', 'Distance-aware', 'Percent drop result'] },
  { slug: 'wire-gauge-calculator', title: 'Wire Gauge Calculator', shortTitle: 'Wire Gauge', description: 'Choose a practical wire gauge by current, distance, voltage, material, and allowed voltage drop.', kind: 'wire-gauge', eyebrow: 'Conductor sizing', formula: 'Select smallest ampacity that keeps voltage drop below target', highlights: ['Ampacity reference', 'Voltage-drop check', 'Copper and aluminum options'] },
  { slug: 'power-factor', title: 'Power Factor Calculator', shortTitle: 'Power Factor', description: 'Calculate power factor from real power and apparent power, plus current at the selected voltage.', kind: 'power-factor', eyebrow: 'Power quality', formula: 'PF = Watts / VA', highlights: ['Real vs apparent power', 'Current estimate', 'PF quality band'] },
  { slug: 'kva-to-watts-calculator', title: 'kVA To Watts Calculator', shortTitle: 'kVA to Watts', description: 'Convert apparent power in kVA to real power in watts and kilowatts using power factor.', kind: 'kva-to-watts', eyebrow: 'Generator and UPS sizing', formula: 'Watts = kVA x 1000 x PF', highlights: ['Generator planning', 'UPS load estimates', 'PF-adjusted watts'] },
  { slug: 'amps-to-kw-calculator', title: 'Amps To kW Calculator', shortTitle: 'Amps to kW', description: 'Convert amps to kilowatts for DC, AC single-phase, and AC three-phase electrical systems.', kind: 'amps-to-kw', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: 'Kilowatt planning', formula: 'kW = Watts / 1000', highlights: ['Fast kW conversion', 'AC and DC support', 'Load planning result'] },
  { slug: 'voltage-amps-watts-calculator', title: 'Voltage Amps Watts Calculator', shortTitle: 'V A W', description: 'Solve common voltage, current, and wattage relationships using Watt’s law.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'dc', eyebrow: 'Watt’s law suite', formula: 'P = V x I', highlights: ['Find watts from V and A', 'Clear formula context', 'General electrical planning'] },
  { slug: 'solar-watts-to-amps-calculator', title: 'Solar Watts To Amps Calculator', shortTitle: 'Solar W to A', description: 'Convert solar panel wattage to charging amps using system voltage and efficiency.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Solar charge current', formula: 'Amps = Watts / Volts', highlights: ['12V, 24V, 48V systems', 'Charge controller estimates', 'Efficiency support'] },
  { slug: 'led-watts-to-amps-calculator', title: 'LED Watts To Amps Calculator', shortTitle: 'LED W to A', description: 'Calculate LED driver current draw from watts and voltage.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'LED driver sizing', formula: 'Amps = Watts / Volts', highlights: ['LED strips and drivers', 'Low-voltage DC', 'Current draw output'] },
  { slug: 'speaker-amp-power-calculator', title: 'Speaker Amp Power Calculator', shortTitle: 'Speaker Power', description: 'Estimate amplifier current draw from output watts, voltage, and efficiency.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Audio systems', formula: 'Amps = Watts / (Volts x Efficiency)', highlights: ['Car audio friendly', 'Efficiency input', 'Fuse planning context'] },
  { slug: 'amp-power-consumption-calculator', title: 'Amp Power Consumption Calculator', shortTitle: 'Power Consumption', description: 'Estimate watts, kilowatts, and energy use from current draw, voltage, and runtime.', kind: 'amp-hours', eyebrow: 'Runtime and energy', formula: 'Wh = Amps x Volts x Hours', highlights: ['Runtime estimates', 'Energy consumption', 'Battery and appliance use'] },
  { slug: 'megawatts-to-amps-calculator', title: 'Megawatts To Amps Calculator', shortTitle: 'MW to Amps', description: 'Convert large power values to current for high-voltage single-phase and three-phase systems.', kind: 'watts-to-amps', defaultVoltage: 11000, defaultPhase: 'ac3', eyebrow: 'Utility-scale current', formula: 'Amps = Watts / (1.732 x Volts x PF)', highlights: ['MW-scale systems', 'Three-phase support', 'High-voltage planning'] },
  { slug: 'other-voltages-calculator', title: 'Other Voltages Amps To Watts Calculator', shortTitle: 'Custom Voltage', description: 'Use any custom voltage to convert amps to watts for AC, DC, and three-phase circuits.', kind: 'amps-to-watts', defaultVoltage: 48, defaultPhase: 'dc', eyebrow: 'Custom voltage', formula: 'Watts = Amps x Volts x phase factor x PF', highlights: ['Any voltage', 'AC/DC/3-phase modes', 'Flexible calculator'] }
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
  { slug: 'site-map', title: 'Site Map', description: 'A complete map of calculators and resources on Amps To Watts Calculator.' }
];

export const allRouteSlugs = [...tools.map((tool) => tool.slug), ...Object.keys(aliases), ...pages.map((page) => page.slug)];

export function getToolBySlug(slug: string) {
  const canonicalSlug = aliases[slug] ?? slug;
  return tools.find((tool) => tool.slug === canonicalSlug);
}

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}
