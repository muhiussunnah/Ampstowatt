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
  h1Title?: string;
  shortTitle: string;
  description: string;
  kind: ToolKind;
  defaultVoltage?: number;
  defaultPhase?: 'dc' | 'ac1' | 'ac3';
  defaultMode?: 'amps-to-watts' | 'watts-to-amps';
  defaultInput?: number;
  defaultUnit?: 'a' | 'ma' | 'w' | 'kw' | 'kva' | 'va' | 'ah';
  eyebrow: string;
  formula: string;
  highlights: string[];
};

export const tools: Tool[] = [
  { slug: '12v-amps-to-watts', title: '12V Amps to Watts Calculator — DC Battery & Solar | Ampstowatt', h1Title: '12V Amps to Watts Calculator', shortTitle: '12V Calculator', description: 'Convert 12V amps to watts instantly. Formula: W = A × 12V. For batteries, RV solar, and automotive loads. Includes DC wiring table.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Low-voltage DC', formula: 'Watts = Amps x 12V', highlights: ['Battery and vehicle systems', 'DC mode by default', 'Instant wattage and kW output'] },
  { slug: '120v-amps-to-watts', title: '120V Amps to Watts Calculator — US Household Circuits | Ampstowatt', h1Title: '120V Amps to Watts Calculator', shortTitle: '120V Calculator', description: 'Convert 120V amps to watts for US household outlets. W = A × 120. Includes 15A, 20A, and 30A breaker planning limits.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'North American circuits', formula: 'Watts = Amps x 120V x PF', highlights: ['15A and 20A planning', 'Power factor support', 'Continuous-load guidance'] },
  { slug: '220v-amps-to-watts', title: '220V Amps to Watts Calculator — Appliances & Mains | Ampstowatt', h1Title: '220V Amps to Watts Calculator', shortTitle: '220V Calculator', description: 'Convert 220V amps to watts for appliances and international mains. W = A × 220. Includes AC single-phase and load planning.', kind: 'amps-to-watts', defaultVoltage: 220, defaultPhase: 'ac1', eyebrow: 'High-voltage appliances', formula: 'Watts = Amps x 220V x PF', highlights: ['Appliance load planning', 'AC power factor option', 'kW conversion included'] },
  { slug: '230v-amps-to-watts', title: '230V Amps to Watts Calculator — UK & EU Mains | Ampstowatt', h1Title: '230V Amps to Watts Calculator', shortTitle: '230V Calculator', description: 'Convert 230V amps to watts for UK and EU circuits. W = A × 230 × PF. Includes BS 7671 and IEC load planning examples.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'UK and EU mains', formula: 'Watts = Amps x 230V x PF', highlights: ['230V preset', 'Single-phase AC mode', 'Professional result summary'] },
  { slug: '240v-amps-to-watts', title: '240V Amps to Watts Calculator — Dryers, EVs & HVAC | Ampstowatt', h1Title: '240V Amps to Watts Calculator', shortTitle: '240V Calculator', description: 'Convert 240V amps to watts for dryers, EV chargers, and HVAC. W = A × 240. Includes NEC 80% continuous load safety limits.', kind: 'amps-to-watts', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: '240V residential loads', formula: 'Watts = Amps x 240V x PF', highlights: ['EV and HVAC friendly', '80% continuous-load note', 'Watts and kW output'] },
  { slug: 'ac-amps-to-watts-calculator', title: 'AC Amps to Watts Calculator — Single & 3 Phase | Ampstowatt', h1Title: 'AC Amps to Watts Calculator', shortTitle: 'AC Calculator', description: 'Convert AC amps to watts with voltage and power factor. Single-phase: W = A × V × PF. Three-phase: W = 1.732 × A × V × PF. Free tool.', kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'ac1', eyebrow: 'Alternating current', formula: 'Single phase: W = A x V x PF. Three phase: W = 1.732 x A x V x PF', highlights: ['Single and three-phase', 'Power factor correction', 'RMS voltage workflow'] },
  { slug: 'dc-amps-to-watts-calculator', title: 'DC Amps to Watts Calculator — Battery & Solar | Ampstowatt', h1Title: 'DC Amps to Watts Calculator', shortTitle: 'DC Calculator', description: 'Convert DC amps to watts instantly. No power factor needed. Formula: W = A × V. Perfect for batteries, solar, and automotive.', kind: 'amps-to-watts', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Direct current', formula: 'Watts = Amps x Volts', highlights: ['No power factor needed', 'Battery system presets', 'Clean DC formula'] },
  { slug: 'single-phase-amps-to-watts', title: 'Single-Phase Amps to Watts Calculator | Ampstowatt', h1Title: 'Single-Phase Amps to Watts Calculator', shortTitle: 'Single Phase', description: 'Calculate single-phase AC watts from amps, voltage, and power factor. Formula: W = A × V × PF. For 120V, 240V, and 230V circuits.', kind: 'amps-to-watts', defaultVoltage: 230, defaultPhase: 'ac1', eyebrow: 'Single-phase AC', formula: 'Watts = Amps x Volts x PF', highlights: ['Residential and light commercial', 'PF-aware', 'kW result included'] },
  { slug: '3-phase-amps-to-watts-calculator', title: '3-Phase Amps to Watts Calculator — Industrial Power | Ampstowatt', h1Title: '3-Phase Amps to Watts Calculator', shortTitle: '3 Phase', description: 'Convert 3-phase amps to watts with W = 1.732 × A × V × PF. Enter amps, line voltage, and power factor. Includes load chart.', kind: 'amps-to-watts', defaultVoltage: 400, defaultPhase: 'ac3', eyebrow: 'Three-phase systems', formula: 'Watts = 1.732 x Amps x Volts x PF', highlights: ['Line-to-line voltage model', 'Motor and industrial loads', 'Real power and kW output'] },
  { slug: 'amp-hours-to-watt-hours', title: 'Amp Hours to Watt Hours Calculator — Battery Sizing | Ampstowatt', h1Title: 'Amp Hours to Watt Hours Calculator', shortTitle: 'Ah to Wh', description: 'Convert Ah to Wh and kWh for battery sizing. Formula: Wh = Ah × V. Works for 12V, 24V, and 48V battery banks and solar storage.', kind: 'amp-hours', eyebrow: 'Battery energy', formula: 'Wh = Ah x Volts x Efficiency', highlights: ['Battery bank sizing', 'Efficiency input', 'Wh and kWh results'] },
  { slug: 'amps-to-volt-amps', title: 'Amps to Volt-Amps (VA) Calculator', shortTitle: 'Amps to VA', description: 'Convert amps to volt-amps (VA) and kVA for UPS sizing, transformer rating, and apparent power calculations. Formula: VA = Amps × Volts.', kind: 'volt-amps', eyebrow: 'Apparent power', formula: 'VA = Amps x Volts', highlights: ['UPS and transformer sizing', 'VA and kVA output', 'Single-phase apparent power'] },
  { slug: 'voltage-drop-calculator', title: 'Voltage Drop Calculator — Wire Length & Gauge | Ampstowatt', h1Title: 'Voltage Drop Calculator', shortTitle: 'Voltage Drop', description: 'Calculate voltage drop for any wire run. Enter current, distance, and conductor size to check compliance with 3% and 5% limits.', kind: 'voltage-drop', eyebrow: 'Wire planning', formula: 'Voltage drop = 2 x K x I x D / circular mils', highlights: ['Copper and aluminum', 'Distance-aware', 'Percent drop result'] },
  { slug: 'wire-gauge-calculator', title: 'Wire Gauge Calculator — AWG & Ampacity Chart | Ampstowatt', h1Title: 'Wire Gauge Calculator', shortTitle: 'Wire Gauge', description: 'Find the correct wire gauge (AWG) for your current and circuit length. Includes NEC ampacity table and voltage drop planning.', kind: 'wire-gauge', eyebrow: 'Conductor sizing', formula: 'Select smallest ampacity that keeps voltage drop below target', highlights: ['Ampacity reference', 'Voltage-drop check', 'Copper and aluminum options'] },
  { slug: 'power-factor', title: 'Power Factor Calculator — Real, Apparent & Reactive Power | Ampstowatt', h1Title: 'Power Factor Calculator', shortTitle: 'Power Factor', description: 'Calculate power factor from watts and VA. Find kVAR for capacitor sizing. Supports single-phase and 3-phase AC power calculations.', kind: 'power-factor', eyebrow: 'Power quality', formula: 'PF = Watts / VA', highlights: ['Real vs apparent power', 'Current estimate', 'PF quality band'] },
  { slug: 'kva-to-watts-calculator', title: 'kVA to Watts Calculator — Apparent to Real Power | Ampstowatt', h1Title: 'kVA to Watts Calculator', shortTitle: 'kVA to Watts', description: 'Convert kVA to watts using power factor. Enter kVA and PF to get real watts. Includes single-phase and 3-phase formulas.', kind: 'kva-to-watts', eyebrow: 'Generator and UPS sizing', formula: 'Watts = kVA x 1000 x PF', highlights: ['Generator planning', 'UPS load estimates', 'PF-adjusted watts'] },
  { slug: 'amps-to-kw-calculator', title: 'Amps to kW Calculator — Current to Kilowatts | Ampstowatt', h1Title: 'Amps to kW Calculator', shortTitle: 'Amps to kW', description: 'Convert amps to kilowatts for load planning. DC: kW = A × V ÷ 1000. AC: kW = A × V × PF ÷ 1000. Includes 3-phase formula.', kind: 'amps-to-kw', defaultVoltage: 240, defaultPhase: 'ac1', eyebrow: 'Kilowatt planning', formula: 'kW = Watts / 1000', highlights: ['Fast kW conversion', 'AC and DC support', 'Load planning result'] },
  { slug: 'watts-to-amps-calculator', title: 'Voltage Amps Watts Calculator — Watt\'s Law', shortTitle: 'V A W', description: "Solve voltage, current, and wattage relationships using Watt's Law (P = V × I) and Ohm's Law. Enter any two values to calculate the third.", kind: 'amps-to-watts', defaultVoltage: 120, defaultPhase: 'dc', eyebrow: "Watt's law suite", formula: 'P = V x I', highlights: ['Find watts from V and A', 'Clear formula context', 'General electrical planning'] },
  { slug: 'solar-watts-to-amps-calculator', title: 'Solar Panel Amps to Watts Calculator — PV System Sizing | Ampstowatt', h1Title: 'Solar Panel Amps to Watts Calculator', shortTitle: 'Solar W to A', description: 'Calculate solar panel watts from current and voltage. Convert Vmp and Imp to panel watts. Includes DC and battery-side amp planning.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Solar charge current', formula: 'Amps = Watts / Volts', highlights: ['12V, 24V, 48V systems', 'Charge controller estimates', 'Efficiency support'] },
  { slug: 'led-watts-to-amps-calculator', title: 'LED Watts to Amps Calculator — Driver & Strip Lighting | Ampstowatt', h1Title: 'LED Watts to Amps Calculator', shortTitle: 'LED W to A', description: 'Find LED current draw from wattage and voltage. Supports 12V, 24V, and 120V LED strips, bulbs, and drivers. Wire sizing included.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'LED driver sizing', formula: 'Amps = Watts / Volts', highlights: ['LED strips and drivers', 'Low-voltage DC', 'Current draw output'] },
  { slug: 'speaker-amp-power-calculator', title: 'Speaker Amp Power Calculator — Amplifier Sizing | Ampstowatt', h1Title: 'Speaker Amplifier Power Calculator', shortTitle: 'Speaker Power', description: 'Calculate amplifier current draw and speaker power from watts and impedance. For home audio, car audio, and PA system planning.', kind: 'watts-to-amps', defaultVoltage: 12, defaultPhase: 'dc', eyebrow: 'Audio systems', formula: 'Amps = Watts / (Volts x Efficiency)', highlights: ['Car audio friendly', 'Efficiency input', 'Fuse planning context'] },
  { slug: 'amp-power-consumption-calculator', title: 'Amp Power Consumption Calculator — Energy Use', shortTitle: 'Power Consumption', description: 'Estimate watts, kWh, and daily energy use from amp draw, voltage, and runtime hours. Plan electricity costs and battery runtime.', kind: 'amp-hours', eyebrow: 'Runtime and energy', formula: 'Wh = Amps x Volts x Hours', highlights: ['Runtime estimates', 'Energy consumption', 'Battery and appliance use'] },
  { slug: 'megawatts-to-amps-calculator', title: 'Megawatts to Amps Calculator — MW to A', shortTitle: 'MW to Amps', description: 'Convert megawatts to amps for high-voltage three-phase power systems. Calculate utility-scale current at 4.16kV, 11kV, 13.8kV, and higher voltages.', kind: 'watts-to-amps', defaultVoltage: 11000, defaultPhase: 'ac3', eyebrow: 'Utility-scale current', formula: 'Amps = Watts / (1.732 x Volts x PF)', highlights: ['MW-scale systems', 'Three-phase support', 'High-voltage planning'] },
  { slug: 'other-voltages-calculator', title: 'Custom Voltage Amps to Watts Calculator', shortTitle: 'Custom Voltage', description: 'Convert amps to watts at any voltage. Enter a custom voltage for AC, DC, or three-phase circuits not covered by the standard voltage calculators.', kind: 'amps-to-watts', defaultVoltage: 48, defaultPhase: 'dc', eyebrow: 'Custom voltage', formula: 'Watts = Amps x Volts x phase factor x PF', highlights: ['Any voltage', 'AC/DC/3-phase modes', 'Flexible calculator'] }
,
  { slug: '480v-amps-to-watts-calculator', title: '480V Amps to Watts Calculator — Industrial 3-Phase | Ampstowatt', h1Title: '480V Amps to Watts Calculator', shortTitle: '480V Calculator', description: 'Convert 480V 3-phase amps to watts for industrial equipment. W = 1.732 × A × 480V × PF. Includes motor and HVAC examples.', kind: 'amps-to-watts', defaultVoltage: 480, defaultPhase: 'ac3', eyebrow: 'Industrial 480V systems', formula: 'Watts = 1.732 x Amps x 480V x PF', highlights: ['Three-phase power', 'Industrial HVAC and motors', 'kW output included'] }
];

export const aliases: Record<string, string> = {
  'amps-to-watts-calculator': '',
  '12v-amps-to-watts-calculator': '12v-amps-to-watts',
  '120v-amps-to-watts-calculator': '120v-amps-to-watts',
  '220v-amps-to-watts-calculator': '220v-amps-to-watts',
  '230v-amps-to-watts-calculator': '230v-amps-to-watts',
  '240v-amps-to-watts-calculator': '240v-amps-to-watts',
  'single-phase-amps-to-watts-calculator': 'single-phase-amps-to-watts',
  '230v-calculator': '230v-amps-to-watts',
  'voltage-amps-watts-calculator': 'watts-to-amps-calculator',
  '12v-calculator': '12v-amps-to-watts',
  '120v-calculator': '120v-amps-to-watts',
  '220v-calculator': '220v-amps-to-watts',
  '240v-calculator': '240v-amps-to-watts',
  'ac-calculator': 'ac-amps-to-watts-calculator',
  'dc-calculator': 'dc-amps-to-watts-calculator',
  'single-phase-calculator': 'single-phase-amps-to-watts',
  '3-phase-calculator': '3-phase-amps-to-watts-calculator',
  'amps-to-watts-120v-calculator': '120v-amps-to-watts',
  'amps-to-watts-220v-calculator': '220v-amps-to-watts',
  'amps-to-watts-230v-calculator': '230v-amps-to-watts',
  'amps-to-watts-240v-calculator': '240v-amps-to-watts',
  'amps-to-watts-ac-calculator': 'ac-amps-to-watts-calculator',
  'amps-to-watts-dc-calculator': 'dc-amps-to-watts-calculator',
  'amps-to-watts-3-phase-calculator': '3-phase-amps-to-watts-calculator'
};

export const pages = [
  { slug: '10-amps-to-watts', title: '10 Amps to Watts — Conversion at 12V, 120V & 240V | Ampstowatt', h1Title: 'How Many Watts Is 10 Amps?', description: '10 amps equals 1,200W at 120V or 2,400W at 240V. See the full table, formula, and AC power factor examples for 10-amp circuit loads.' },
  { slug: 'how-many-watts-per-amp', title: 'How Many Watts Per Amp? — Answer at Every Voltage | Ampstowatt', h1Title: 'How Many Watts Per Amp?', description: 'One amp equals 12W at 12V, 120W at 120V, and 240W at 240V. The answer depends on voltage. See the complete formula, full table, and real examples.' },
  { slug: 'air-conditioner-amps-to-watts', title: 'Air Conditioner Amps to Watts Calculator | Ampstowatt', h1Title: 'Air Conditioner Amps to Watts Calculator', description: 'Convert air conditioner amps to watts. Window AC, mini-split, and central HVAC wattage from amperage. Enter amps, voltage, and PF for real watts.' },
  { slug: 'generator-amps-to-watts', title: 'Generator Amps to Watts Calculator | Ampstowatt', h1Title: 'Generator Amps to Watts Calculator', description: 'Calculate generator wattage from outlet amps and voltage. 120V, 240V, and 3-phase generator output watts explained with load planning chart.' },
  { slug: 'ev-charger-amps-to-watts', title: 'EV Charger Amps to Watts Calculator | Ampstowatt', h1Title: 'EV Charger Amps to Watts Calculator', description: 'Calculate EV charger power from amp rating. Level 1 (120V/12A = 1,440W), Level 2 (240V/48A = 11,520W), and DC fast charging explained.' },
  { slug: '1-amp-to-watts', title: '1 Amp to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 1 Amp?', description: '1 amp equals 120W at 120V or 240W at 240V.' },
  { slug: '5-amps-to-watts', title: '5 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 5 Amps?', description: '5 amps equals 600W at 120V or 1,200W at 240V.' },
  { slug: '15-amps-to-watts', title: '15 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 15 Amps?', description: '15 amps equals 1,800W at 120V or 3,600W at 240V.' },
  { slug: '20-amps-to-watts', title: '20 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 20 Amps?', description: '20 amps equals 2,400W at 120V or 4,800W at 240V.' },
  { slug: '30-amps-to-watts', title: '30 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 30 Amps?', description: '30 amps equals 3,600W at 120V or 7,200W at 240V.' },
  { slug: '50-amps-to-watts', title: '50 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 50 Amps?', description: '50 amps equals 6,000W at 120V or 12,000W at 240V.' },
  { slug: '100-amps-to-watts', title: '100 Amps to Watts — Conversion Guide | Ampstowatt', h1Title: 'How Many Watts is 100 Amps?', description: '100 amps equals 12,000W at 120V or 24,000W at 240V.' },
  { slug: 'amps-vs-watts', title: "Amps vs Watts — What's the Difference? | Ampstowatt", h1Title: "Amps vs Watts: What's the Difference?", description: "Amps measure current flow; watts measure power. Learn the difference, see how they relate with Watt's Law, and find out when each unit matters." },
  { slug: 'motor-amps-to-watts', title: 'Electric Motor Amps to Watts Calculator | Ampstowatt', h1Title: 'Electric Motor Amps to Watts Calculator', description: 'Convert motor amps to watts for single-phase and three-phase loads with voltage, power factor, and kW planning context.' },
  { slug: 'amps-to-watts-formula', title: 'Amps to Watts Formula — DC, AC, and 3-Phase Explained | Ampstowatt', description: 'The amps to watts formula is W = A × V for DC. For AC: W = A × V × PF. For 3-phase: W = 1.732 × A × V × PF. See worked examples for each.' },
  { slug: 'conversion-charts', title: 'Amps to Watts Conversion Chart — All Voltages | Ampstowatt', description: 'Complete amps to watts reference tables for 12V, 120V, 240V, and 480V circuits. DC, AC single-phase, and 3-phase values included.' },
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
  { slug: '40-amps-to-watts', title: '40 Amps to Watts Calculator', h1Title: '40 Amps to Watts Calculator', description: 'Convert 40 amps to watts.' },
  { slug: '60-amps-to-watts', title: '60 Amps to Watts at 120V and 240V', h1Title: '60 Amps to Watts at 120V and 240V', description: 'Convert 60 amps to watts.' },
  { slug: 'kw-to-amps-calculator', title: 'kW to Amps Calculator — DC, AC Single-Phase & Three-Phase', h1Title: 'kW to Amps Calculator: Convert Kilowatts to Amperes', description: 'Convert kW to Amps.' },
  { slug: 'electric-motor-amps-to-watts', title: 'Motor Amps to Watts Calculator — HP, kW, and Efficiency', h1Title: 'Motor Amps to Watts Calculator — HP, kW, and Efficiency', description: 'Estimate electric motor watts, kW, horsepower, and efficiency from amperage with AC power factor guidance.' },
  { slug: 'kwh-explained', title: 'What Is a kWh? Kilowatt Hours Explained Simply', h1Title: 'What Is a kWh? Kilowatt Hours Explained Simply', description: 'What is a kWh?' },
  { slug: 'watts-law-explained', title: 'Watt\'s Law Explained — Formula, Examples, and Uses', h1Title: 'Watt\'s Law Explained — Formula, Examples, and Uses', description: 'Watt\'s Law Explained.' },
  { slug: 'power-factor-explained', title: 'What Is Power Factor? A Plain-English Guide', h1Title: 'What Is Power Factor? A Plain-English Guide', description: 'What is Power Factor?' },
  { slug: 'watts-to-amps-120v', title: 'Watts to Amps at 120V — US Standard Circuit', h1Title: 'Watts to Amps at 120V — US Standard Circuit', description: 'Convert watts to amps at 120V.' },
  { slug: 'watts-to-amps-12v', title: 'Watts to Amps at 12V — DC Battery Systems', h1Title: 'Watts to Amps at 12V — DC Battery Systems', description: 'Convert watts to amps at 12V.' },
  { slug: 'watts-to-amps-240v', title: 'Watts to Amps at 240V — Dryers, EVs, and High Power', h1Title: 'Watts to Amps at 240V — Dryers, EVs, and High Power', description: 'Convert watts to amps at 240V.' },
  { slug: '24v-amps-to-watts', title: '24V Amps to Watts Calculator — Telecom and Solar', h1Title: '24V Amps to Watts Calculator — Telecom and Solar', description: 'Convert 24V amps to watts.' },
  { slug: 'refrigerator-amps-to-watts', title: 'Refrigerator Amps to Watts — Running and Startup Watts', h1Title: 'Refrigerator Amps to Watts — Running and Startup Watts', description: 'Refrigerator Amps to Watts.' },
  { slug: 'microwave-amps-to-watts', title: 'Microwave Amps to Watts — 700W to 1800W Models', h1Title: 'Microwave Amps to Watts — 700W to 1800W Models', description: 'Microwave Amps to Watts.' },
  { slug: 'dryer-amps-to-watts', title: 'Dryer Amps to Watts — Electric and Gas Dryer Circuits', h1Title: 'Dryer Amps to Watts — Electric and Gas Dryer Circuits', description: 'Dryer Amps to Watts.' },
  { slug: 'pool-pump-amps-to-watts', title: 'Pool Pump Amps to Watts — Variable Speed and Single Speed', h1Title: 'Pool Pump Amps to Watts — Variable Speed and Single Speed', description: 'Pool Pump Amps to Watts.' },
  { slug: 'understanding-power-factor', title: 'Understanding Power Factor — PF Explained for AC', description: 'Learn what power factor is, why it matters for AC circuits, the power triangle, typical PF values, correction methods, and how PF affects your electricity bill.' },
];

export const educationalSlugs = new Set([
  'amps-to-watts-formula',
  'conversion-charts',
  'amps-vs-watts',
  'how-many-watts-per-amp',
  'what-are-amps',
  'what-are-watts',
  'ohms-law-explained',
  'watts-law-explained',
  'kwh-explained',
  'power-factor',
  'power-factor-explained',
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

