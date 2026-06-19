export type InputType = 'current' | 'voltage' | 'powerFactor' | 'frequency' | 'power' | 'efficiency' | 'hours' | 'cost' | 'voltageType' | 'phaseType' | 'wireLength' | 'wireMaterial' | 'wireSize' | 'allowableDrop' | 'ampHours' | 'kva' | 'megawatts' | 'kilowatts';

export type InputConfig = {
  id: InputType;
  label: string;
  unit?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  helperText?: string;
};

export type OutputConfig = {
  id: string; // e.g. 'watts', 'kilowatts', 'amps', 'va', 'wh'
  label: string;
  unit: string;
};

export type CalculatorConfig = {
  id: string; // Matches the slug
  slug: string;
  title: string;
  shortDescription: string;
  calculatorType: string; // Guides JS engine on which logic to run
  modes?: ('dc' | 'ac1' | 'ac3')[]; // If missing, single mode
  defaultMode?: 'dc' | 'ac1' | 'ac3';
  fixedValues?: Record<string, number | string>;
  inputs: InputConfig[];
  outputs: OutputConfig[];
  formulaLabel: string; // The generic formula or a map of formulas if multi-mode
  formulas?: Record<string, string>; // If mode-dependent formulas are needed
  example: string;
  helperText: string;
  resultInterpretation: string;
  safetyNote: string;
};

type CalculatorConfigDraft = Omit<CalculatorConfig, 'slug' | 'shortDescription' | 'resultInterpretation' | 'safetyNote'> &
  Partial<Pick<CalculatorConfig, 'slug' | 'shortDescription' | 'resultInterpretation' | 'safetyNote'>>;

const DEFAULT_SAFETY_NOTE = 'This calculator is an educational planning estimate. Verify safety-critical work with equipment nameplate data, local electrical code, and a qualified professional.';

function withConfigDefaults(slug: string, config: CalculatorConfigDraft): CalculatorConfig {
  const primary = config.outputs[0];
  return {
    ...config,
    slug: config.slug ?? (slug || '/'),
    shortDescription: config.shortDescription ?? config.helperText,
    resultInterpretation: config.resultInterpretation ?? `The primary result is shown in ${primary?.unit ?? 'the selected output unit'} using the formula displayed above.`,
    safetyNote: config.safetyNote ?? DEFAULT_SAFETY_NOTE
  };
}

function getCalculatorConfigDraft(slug: string): CalculatorConfigDraft {
  // 1. Homepage Broad Calculator
  if (slug === '/' || slug === '' || slug === 'homepage') {
    return withConfigDefaults(slug, {
      id: "homepage",
      title: "Amps to Watts Calculator",
      calculatorType: "broad-amps-to-watts",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', placeholder: 'Example: 120', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor (PF)', placeholder: 'Example: 1.0', defaultValue: 1.0, min: 0.01, max: 1, step: 0.01 },
        { id: 'frequency', label: 'Frequency', unit: 'Hz', defaultValue: 60, helperText: 'Usually 50 or 60 Hz. Informational only.' },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: 'W = A × V',
      formulas: {
        'dc': 'W = A × V',
        'ac1': 'W = A × V × PF',
        'ac3-vll': 'W = √3 × A × V × PF',
        'ac3-vln': 'W = 3 × A × V × PF'
      },
      example: '10A × 120V × 1.0 = 1200W',
      helperText: 'Enter your values above to instantly calculate the electrical power.'
    });
  }

  // 2. Voltage-Specific Pages
  if (slug === '12v-amps-to-watts') {
    return withConfigDefaults(slug, {
      id: "12v-amps-to-watts",
      title: "12V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      defaultMode: 'dc',
      fixedValues: { voltage: 12 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 5', defaultValue: 5, required: true }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 12V",
      example: "5A × 12V = 60W",
      helperText: "Best for 12V batteries, cars, LED strips, solar systems, and low-voltage DC devices.",
      resultInterpretation: "At 12V and 5A, the load uses 60 watts.",
      safetyNote: "Use proper wire size and fuse protection for 12V DC circuits."
    });
  }

  if (slug === '24v-amps-to-watts') {
    return withConfigDefaults(slug, {
      id: "24v-amps-to-watts",
      title: "24V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      defaultMode: 'dc',
      fixedValues: { voltage: 24 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 5', defaultValue: 5, required: true }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 24V",
      example: "5A × 24V = 120W",
      helperText: "Best for 24V battery banks, trucks, solar inverters, and DC systems.",
      resultInterpretation: "At 24V and 5A, the load uses 120 watts.",
      safetyNote: "Check DC breaker, fuse, and wire ratings for 24V current draw."
    });
  }

  if (slug === '120v-amps-to-watts') {
    return {
      id: "120v-amps-to-watts",
      title: "120V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      fixedValues: { voltage: 120 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01, helperText: 'Optional. Leave at 1.0 for most household devices.' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 120V × PF",
      example: "10A × 120V × 1.0 = 1,200W",
      helperText: "Designed for US outlets, small appliances, home circuits, and North American devices."
    };
  }

  if (slug === '220v-amps-to-watts') {
    return {
      id: "220v-amps-to-watts",
      title: "220V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      fixedValues: { voltage: 220 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 220V × PF",
      example: "10A × 220V × 1.0 = 2,200W",
      helperText: "Use for AC units, motors, international appliances, and high-power home devices."
    };
  }

  if (slug === '230v-amps-to-watts') {
    return {
      id: "230v-amps-to-watts",
      title: "230V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      fixedValues: { voltage: 230 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 230V × PF",
      example: "10A × 230V × 1.0 = 2,300W",
      helperText: "Standard for UK, Europe, Pakistan, India, and household mains."
    };
  }

  if (slug === '240v-amps-to-watts') {
    return {
      id: "240v-amps-to-watts",
      title: "240V Amps to Watts Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      fixedValues: { voltage: 240 },
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = Amps × 240V × PF",
      example: "10A × 240V × 1.0 = 2,400W",
      helperText: "Perfect for dryers, EV chargers, HVAC, water heaters, and large appliances."
    };
  }

  if (slug === '480v-amps-to-watts-calculator') {
    return {
      id: "480v-amps-to-watts-calculator",
      title: "480V Industrial 3-Phase Calculator",
      calculatorType: "fixed-voltage-amps-to-watts",
      fixedValues: { voltage: 480 },
      defaultMode: 'ac3',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', placeholder: 'Example: 10', defaultValue: 10, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.9, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line (Default)'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = √3 × Amps × 480V × PF",
      example: "10A × 480V × 0.9 × 1.732 = 7,478W",
      helperText: "Calculates power for industrial systems, commercial motors, factory equipment, and three-phase loads."
    };
  }

  // 3. AC / DC / Phase Pages
  if (slug === 'ac-amps-to-watts-calculator') {
    return {
      id: "ac-amps-to-watts",
      title: "AC Amps to Watts Calculator",
      calculatorType: "ac-amps-to-watts",
      modes: ['ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type (For 3-Phase)', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "W = A × V × PF",
      formulas: {
        'ac1': 'W = A × V × PF',
        'ac3-vll': 'W = √3 × A × V × PF',
        'ac3-vln': 'W = 3 × A × V × PF'
      },
      example: "10A × 120V × 1.0 = 1200W",
      helperText: "Select Single-Phase or Three-Phase to calculate AC electrical power."
    };
  }

  if (slug === 'dc-amps-to-watts-calculator') {
    return {
      id: "dc-amps-to-watts",
      title: "DC Amps to Watts Calculator",
      calculatorType: "dc-amps-to-watts",
      defaultMode: 'dc',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 5, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 12, required: true }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "W = A × V",
      example: "5A × 12V = 60W",
      helperText: "Use for batteries, solar panels, DC motors, LED systems, and automotive circuits."
    };
  }

  if (slug === 'single-phase-amps-to-watts') {
    return {
      id: "single-phase-amps-to-watts",
      title: "Single Phase Amps to Watts Calculator",
      calculatorType: "single-phase-amps-to-watts",
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "W = A × V × PF",
      example: "10A × 120V × 1.0 = 1200W",
      helperText: "Calculates single-phase AC power."
    };
  }

  if (slug === '3-phase-amps-to-watts-calculator') {
    return {
      id: "3-phase-amps-to-watts",
      title: "3 Phase Amps to Watts Calculator",
      calculatorType: "3-phase-amps-to-watts",
      defaultMode: 'ac3',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 480, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.9, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "W = √3 × A × V × PF",
      formulas: {
        'ac3-vll': 'W = √3 × A × V × PF',
        'ac3-vln': 'W = 3 × A × V × PF'
      },
      example: "10A × 480V × 0.9 × 1.732 = 7478W",
      helperText: "Select Line-to-Line or Line-to-Neutral to calculate 3-phase power."
    };
  }

  // 4. Reverse Calculators (Watts to Amps)
  if (slug === 'watts-to-amps-calculator') {
    return {
      id: "watts-to-amps",
      title: "Watts to Amps Calculator",
      calculatorType: "watts-to-amps",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'power', label: 'Power', unit: 'W', defaultValue: 1200, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' },
        { id: 'milliamps', label: 'Calculated Current', unit: 'mA' }
      ],
      formulaLabel: "A = W ÷ V",
      formulas: {
        'dc': 'A = W ÷ V',
        'ac1': 'A = W ÷ (V × PF)',
        'ac3-vll': 'A = W ÷ (√3 × V × PF)',
        'ac3-vln': 'A = W ÷ (3 × V × PF)'
      },
      example: "1200W ÷ 120V = 10A",
      helperText: "Convert Watts back into Amperes."
    };
  }

  if (slug === 'watts-to-amps-12v') {
    return {
      id: "watts-to-amps-12v",
      title: "12V Watts to Amps Calculator",
      calculatorType: "fixed-voltage-watts-to-amps",
      fixedValues: { voltage: 12 },
      inputs: [
        { id: 'power', label: 'Power', unit: 'W', defaultValue: 120, required: true }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' }
      ],
      formulaLabel: "Amps = Watts ÷ 12V",
      example: "120W ÷ 12V = 10A",
      helperText: "Find the current draw for 12V systems."
    };
  }

  if (slug === 'watts-to-amps-120v') {
    return {
      id: "watts-to-amps-120v",
      title: "120V Watts to Amps Calculator",
      calculatorType: "fixed-voltage-watts-to-amps",
      fixedValues: { voltage: 120 },
      inputs: [
        { id: 'power', label: 'Power', unit: 'W', defaultValue: 1200, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01, helperText: 'Optional' }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' }
      ],
      formulaLabel: "Amps = Watts ÷ (120V × PF)",
      example: "1200W ÷ (120V × 1.0) = 10A",
      helperText: "Calculate amps from watts on a 120V circuit."
    };
  }

  if (slug === 'watts-to-amps-240v') {
    return {
      id: "watts-to-amps-240v",
      title: "240V Watts to Amps Calculator",
      calculatorType: "fixed-voltage-watts-to-amps",
      fixedValues: { voltage: 240 },
      inputs: [
        { id: 'power', label: 'Power', unit: 'W', defaultValue: 2400, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01, helperText: 'Optional' }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' }
      ],
      formulaLabel: "Amps = Watts ÷ (240V × PF)",
      example: "2400W ÷ (240V × 1.0) = 10A",
      helperText: "Calculate amps from watts on a 240V circuit."
    };
  }

  // 5. kW, kVA, VA, and Energy Pages
  if (slug === 'amps-to-kw-calculator') {
    return {
      id: "amps-to-kw",
      title: "Amps to Kilowatts Calculator",
      calculatorType: "amps-to-kw",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'kilowatts', label: 'Kilowatts', unit: 'kW' },
        { id: 'watts', label: 'Watts', unit: 'W' }
      ],
      formulaLabel: "kW = A × V × PF ÷ 1000",
      formulas: {
        'dc': 'kW = A × V ÷ 1000',
        'ac1': 'kW = A × V × PF ÷ 1000',
        'ac3-vll': 'kW = √3 × A × V × PF ÷ 1000',
        'ac3-vln': 'kW = 3 × A × V × PF ÷ 1000'
      },
      example: "10A × 120V × 1.0 ÷ 1000 = 1.2kW",
      helperText: "Convert current directly into kilowatts."
    };
  }

  if (slug === 'kw-to-amps-calculator') {
    return {
      id: "kw-to-amps",
      title: "Kilowatts to Amps Calculator",
      calculatorType: "kw-to-amps",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'kilowatts', label: 'Power', unit: 'kW', defaultValue: 1.2, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' }
      ],
      formulaLabel: "A = (kW × 1000) ÷ (V × PF)",
      formulas: {
        'dc': 'A = (kW × 1000) ÷ V',
        'ac1': 'A = (kW × 1000) ÷ (V × PF)',
        'ac3-vll': 'A = (kW × 1000) ÷ (√3 × V × PF)',
        'ac3-vln': 'A = (kW × 1000) ÷ (3 × V × PF)'
      },
      example: "(1.2kW × 1000) ÷ (120V × 1.0) = 10A",
      helperText: "Convert kilowatts back into amperes."
    };
  }

  if (slug === 'amps-to-volt-amps') {
    return {
      id: "amps-to-volt-amps",
      title: "Amps to Volt-Amps Calculator",
      calculatorType: "amps-to-va",
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true }
      ],
      outputs: [
        { id: 'va', label: 'Apparent Power', unit: 'VA' },
        { id: 'kva', label: 'Kilo-Volt-Amperes', unit: 'kVA' }
      ],
      formulaLabel: "VA = Amps × Volts",
      example: "10A × 120V = 1200VA",
      helperText: "Calculate apparent power (VA) without needing a power factor."
    };
  }

  if (slug === 'kva-to-watts-calculator') {
    return {
      id: "kva-to-watts",
      title: "kVA to Watts Calculator",
      calculatorType: "kva-to-watts",
      inputs: [
        { id: 'kva', label: 'Apparent Power', unit: 'kVA', defaultValue: 1.2, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01, required: true }
      ],
      outputs: [
        { id: 'watts', label: 'Real Power', unit: 'W' },
        { id: 'kilowatts', label: 'Real Power', unit: 'kW' }
      ],
      formulaLabel: "Watts = kVA × 1000 × PF",
      example: "1.2kVA × 1000 × 1.0 = 1200W",
      helperText: "Convert apparent power (kVA) to real power (Watts) using the power factor."
    };
  }

  if (slug === 'megawatts-to-amps-calculator') {
    return {
      id: "megawatts-to-amps",
      title: "Megawatts to Amps Calculator",
      calculatorType: "mw-to-amps",
      modes: ['ac3', 'ac1', 'dc'],
      defaultMode: 'ac3',
      inputs: [
        { id: 'megawatts', label: 'Power', unit: 'MW', defaultValue: 1, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 480, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.9, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}, {value: 'vln', label: 'Line-to-Neutral'}], defaultValue: 'vll' }
      ],
      outputs: [
        { id: 'amps', label: 'Calculated Current', unit: 'A' }
      ],
      formulaLabel: "Watts = MW × 1,000,000",
      example: "1MW = 1,000,000W; Amps = 1,000,000W ÷ (√3 × 480V × 0.9) = 1336A",
      helperText: "Convert megawatts to amps based on the system type."
    };
  }

  if (slug === 'amp-hours-to-watt-hours') {
    return {
      id: "ah-to-wh",
      title: "Amp-hours to Watt-hours Calculator",
      calculatorType: "ah-to-wh",
      inputs: [
        { id: 'ampHours', label: 'Capacity', unit: 'Ah', defaultValue: 100, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 12, required: true }
      ],
      outputs: [
        { id: 'wh', label: 'Energy Capacity', unit: 'Wh' },
        { id: 'kwh', label: 'Energy Capacity', unit: 'kWh' }
      ],
      formulaLabel: "Wh = Ah × V",
      example: "100Ah × 12V = 1200Wh",
      helperText: "Calculate battery energy capacity in Watt-hours."
    };
  }

  if (slug === 'amp-power-consumption-calculator') {
    return {
      id: "amp-power-consumption",
      title: "Amp Power Consumption Calculator",
      calculatorType: "amp-power-consumption",
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'hours', label: 'Hours Used', unit: 'hrs', defaultValue: 1, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01, helperText: 'Optional' },
        { id: 'cost', label: 'Cost per kWh', unit: '$', defaultValue: 0.15, helperText: 'Optional' }
      ],
      outputs: [
        { id: 'watts', label: 'Power', unit: 'W' },
        { id: 'kwh', label: 'Energy Used', unit: 'kWh' },
        { id: 'totalCost', label: 'Estimated Cost', unit: '$' }
      ],
      formulaLabel: "kWh = (A × V × PF × Hours) ÷ 1000",
      example: "10A × 120V × 1hr ÷ 1000 = 1.2kWh",
      helperText: "Estimate energy usage and cost based on runtime."
    };
  }

  // 6. Appliance Calculator Pages
  if (slug === 'air-conditioner-amps-to-watts') {
    return {
      id: "ac-appliance",
      title: "Air Conditioner Amps to Watts",
      calculatorType: "appliance-amps-to-watts",
      inputs: [
        { id: 'current', label: 'AC Current', unit: 'A', defaultValue: 15, required: true },
        { id: 'voltage', label: 'Voltage', options: [{value: 120, label: '120V'}, {value: 220, label: '220V'}, {value: 230, label: '230V'}, {value: 240, label: '240V'}], defaultValue: 120 },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.9, min: 0.1, max: 1, step: 0.01 }
      ],
      outputs: [
        { id: 'watts', label: 'Running Watts', unit: 'W' },
        { id: 'kilowatts', label: 'Estimated kW', unit: 'kW' }
      ],
      formulaLabel: "Watts = A × V × PF",
      example: "15A × 120V × 0.9 = 1620W",
      helperText: "Use nameplate current for best accuracy."
    };
  }

  if (slug === 'generator-amps-to-watts') {
    return {
      id: "generator-amps",
      title: "Generator Amps to Watts",
      calculatorType: "appliance-amps-to-watts",
      modes: ['ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Generator Current', unit: 'A', defaultValue: 30, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}], defaultValue: 'vll', helperText: 'Used only when three-phase is selected.' }
      ],
      outputs: [
        { id: 'watts', label: 'Generator Watts', unit: 'W' },
        { id: 'kilowatts', label: 'Generator kW', unit: 'kW' }
      ],
      formulaLabel: "Watts = A × V × PF",
      formulas: {
        'ac1': 'Watts = A × V × PF',
        'ac3-vll': 'Watts = √3 × A × V × PF'
      },
      example: "30A × 120V × 1.0 = 3600W",
      helperText: "Calculate your generator's total wattage output."
    };
  }

  if (slug === 'ev-charger-amps-to-watts') {
    return {
      id: "ev-charger",
      title: "EV Charger Amps to Watts",
      calculatorType: "ev-amps-to-watts",
      inputs: [
        { id: 'current', label: 'Charger Current', unit: 'A', defaultValue: 32, required: true },
        { id: 'voltage', label: 'Voltage', options: [{value: 120, label: '120V Level 1'}, {value: 240, label: '240V Level 2'}, {value: 480, label: '480V DC Fast'}], defaultValue: 240 },
        { id: 'hours', label: 'Charging Hours', unit: 'hrs', defaultValue: 1, helperText: 'Optional' }
      ],
      outputs: [
        { id: 'watts', label: 'Charging Power', unit: 'W' },
        { id: 'kwh', label: 'Estimated Energy', unit: 'kWh' }
      ],
      formulaLabel: "Watts = A × V",
      example: "32A × 240V = 7680W",
      helperText: "Calculate the charging power of your EV station."
    };
  }

  if (slug === 'motor-amps-to-watts') {
    return {
      id: "motor-amps",
      title: "Motor Amps to Watts Calculator",
      calculatorType: "motor-amps-to-watts",
      modes: ['ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Motor Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 240, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.85, min: 0.1, max: 1, step: 0.01 },
        { id: 'efficiency', label: 'Efficiency (%)', unit: '%', defaultValue: 90, min: 1, max: 100, step: 1, helperText: 'Optional output estimate.' },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}], defaultValue: 'vll', helperText: 'Used only for three-phase motors.' }
      ],
      outputs: [
        { id: 'watts', label: 'Input Watts', unit: 'W' },
        { id: 'outWatts', label: 'Output Watts', unit: 'W' }
      ],
      formulaLabel: "Input = A × V × PF; Output = Input × Efficiency",
      example: "10A × 240V × 0.85 = 2040W Input",
      helperText: "Estimate motor input watts and optional shaft-output watts from nameplate current."
    };
  }

  if (slug === 'electric-motor-amps-to-watts') {
    return {
      id: "electric-motor-amps",
      title: "Electric Motor Amps to Watts Calculator",
      calculatorType: "motor-amps-to-watts",
      modes: ['ac1', 'ac3'],
      defaultMode: 'ac3',
      inputs: [
        { id: 'current', label: 'Motor Line Current', unit: 'A', defaultValue: 12, required: true },
        { id: 'voltage', label: 'Motor Voltage', unit: 'V', defaultValue: 480, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.88, min: 0.1, max: 1, step: 0.01 },
        { id: 'efficiency', label: 'Efficiency', unit: '%', defaultValue: 92, min: 1, max: 100, step: 1, required: true },
        { id: 'voltageType', label: 'Voltage Type', options: [{value: 'vll', label: 'Line-to-Line'}], defaultValue: 'vll', helperText: 'Use line-to-line voltage for most three-phase motors.' }
      ],
      outputs: [
        { id: 'watts', label: 'Input Watts', unit: 'W' },
        { id: 'outWatts', label: 'Output Watts', unit: 'W' }
      ],
      formulaLabel: "Input = √3 × A × V × PF; Output = Input × Efficiency",
      formulas: {
        'ac1': 'Input = A × V × PF; Output = Input × Efficiency',
        'ac3-vll': 'Input = √3 × A × V × PF; Output = Input × Efficiency'
      },
      example: "12A × 480V × 0.88 × 1.732 = 8,781W input",
      helperText: "Use this for electric motor nameplates where power factor and efficiency are available."
    };
  }

  if (slug === 'refrigerator-amps-to-watts') {
    return {
      id: "refrigerator-amps",
      title: "Refrigerator Amps to Watts Calculator",
      calculatorType: "appliance-hours-to-watts",
      inputs: [
        { id: 'current', label: 'Running Current', unit: 'A', defaultValue: 2.5, required: true },
        { id: 'voltage', label: 'Outlet Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 0.9, min: 0.1, max: 1, step: 0.01, helperText: 'Optional. Leave near 0.9 if unknown.' },
        { id: 'hours', label: 'Compressor Hours per Day', unit: 'hrs', defaultValue: 8, helperText: 'Optional runtime estimate.' }
      ],
      outputs: [
        { id: 'watts', label: 'Running Watts', unit: 'W' },
        { id: 'kwh', label: 'Daily Energy', unit: 'kWh' }
      ],
      formulaLabel: "Watts = A × V × PF",
      example: "2.5A × 120V × 0.9 = 270W",
      helperText: "Estimate refrigerator running watts and daily kWh from measured or nameplate current."
    };
  }

  if (slug === 'pool-pump-amps-to-watts') {
    return {
      id: "pool-pump-amps",
      title: "Pool Pump Amps to Watts Calculator",
      calculatorType: "appliance-hours-to-watts",
      inputs: [
        { id: 'current', label: 'Pump Current', unit: 'A', defaultValue: 8, required: true },
        { id: 'voltage', label: 'Pump Voltage', unit: 'V', defaultValue: 240, required: true },
        { id: 'powerFactor', label: 'Motor Power Factor', defaultValue: 0.85, min: 0.1, max: 1, step: 0.01 },
        { id: 'hours', label: 'Pump Hours per Day', unit: 'hrs', defaultValue: 6, helperText: 'Optional daily runtime.' }
      ],
      outputs: [
        { id: 'watts', label: 'Running Watts', unit: 'W' },
        { id: 'kwh', label: 'Daily Energy', unit: 'kWh' }
      ],
      formulaLabel: "Watts = Pump Amps × Volts × PF",
      example: "8A × 240V × 0.85 = 1,632W",
      helperText: "Estimate pool pump running watts and daily energy for single-speed or variable-speed schedules."
    };
  }

  if (slug === 'microwave-amps-to-watts') {
    return {
      id: "microwave",
      title: "Microwave Amps to Watts",
      calculatorType: "appliance-amps-to-watts",
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Voltage', options: [{value: 120, label: '120V'}, {value: 230, label: '230V'}, {value: 240, label: '240V'}], defaultValue: 120 }
      ],
      outputs: [
        { id: 'watts', label: 'Approximate Watts', unit: 'W' }
      ],
      formulaLabel: "Watts = A × V",
      example: "10A × 120V = 1200W",
      helperText: "Estimate the power usage of your microwave."
    };
  }

  if (slug === 'dryer-amps-to-watts') {
    return {
      id: "dryer",
      title: "Dryer Amps to Watts",
      calculatorType: "appliance-amps-to-watts",
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 24, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 240, required: true }
      ],
      outputs: [
        { id: 'watts', label: 'Dryer Watts', unit: 'W' },
        { id: 'kilowatts', label: 'Dryer kW', unit: 'kW' }
      ],
      formulaLabel: "Watts = A × V",
      example: "24A × 240V = 5760W",
      helperText: "Calculate the total wattage of an electric dryer."
    };
  }

  if (slug === 'solar-watts-to-amps-calculator') {
    return {
      id: "solar-watts-to-amps",
      title: "Solar Watts to Amps Calculator",
      calculatorType: "watts-to-amps",
      modes: ['dc'],
      defaultMode: 'dc',
      inputs: [
        { id: 'power', label: 'Solar Array Power', unit: 'W', defaultValue: 400, required: true },
        { id: 'voltage', label: 'System Voltage', options: [
          { value: 12, label: '12V battery' },
          { value: 24, label: '24V battery' },
          { value: 48, label: '48V battery' }
        ], defaultValue: 24 }
      ],
      outputs: [
        { id: 'amps', label: 'Charge Current', unit: 'A' },
        { id: 'milliamps', label: 'Charge Current', unit: 'mA' }
      ],
      formulaLabel: "A = Solar Watts ÷ Battery Voltage",
      example: "400W ÷ 24V = 16.67A",
      helperText: "Estimate solar array current for common battery bank voltages.",
      resultInterpretation: "Use the result as a planning current before controller and wiring derating."
    };
  }

  if (slug === 'led-watts-to-amps-calculator') {
    return {
      id: "led-watts-to-amps",
      title: "LED Watts to Amps Calculator",
      calculatorType: "watts-to-amps",
      modes: ['dc'],
      defaultMode: 'dc',
      inputs: [
        { id: 'power', label: 'LED Load Power', unit: 'W', defaultValue: 60, required: true },
        { id: 'voltage', label: 'LED Supply Voltage', options: [
          { value: 5, label: '5V USB' },
          { value: 12, label: '12V LED strip' },
          { value: 24, label: '24V LED strip' }
        ], defaultValue: 12 }
      ],
      outputs: [
        { id: 'amps', label: 'Required Current', unit: 'A' },
        { id: 'milliamps', label: 'Required Current', unit: 'mA' }
      ],
      formulaLabel: "A = LED Watts ÷ Supply Voltage",
      example: "60W ÷ 12V = 5A",
      helperText: "Size LED power supplies and low-voltage wiring from total LED watts.",
      resultInterpretation: "Choose a power supply with current headroom above the calculated draw."
    };
  }

  if (slug === 'speaker-amp-power-calculator') {
    return {
      id: "speaker-amp-power",
      title: "Speaker Amp Power Calculator",
      calculatorType: "broad-amps-to-watts",
      modes: ['dc'],
      defaultMode: 'dc',
      inputs: [
        { id: 'current', label: 'Amplifier Current Draw', unit: 'A', defaultValue: 20, required: true },
        { id: 'voltage', label: 'Supply Voltage', options: [
          { value: 12, label: '12V car audio' },
          { value: 14.4, label: '14.4V charging system' },
          { value: 24, label: '24V system' }
        ], defaultValue: 14.4 }
      ],
      outputs: [
        { id: 'watts', label: 'Input Power', unit: 'W' },
        { id: 'kilowatts', label: 'Input Power', unit: 'kW' }
      ],
      formulaLabel: "Input Watts = A × V",
      example: "20A × 14.4V = 288W",
      helperText: "Estimate amplifier input power from current draw and supply voltage.",
      resultInterpretation: "Audio output watts are lower than input watts after amplifier efficiency losses."
    };
  }

  if (slug === 'other-voltages-calculator') {
    return {
      id: "other-voltages",
      title: "Other Voltages Amps to Watts Calculator",
      calculatorType: "broad-amps-to-watts",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'dc',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
        { id: 'voltage', label: 'Custom Voltage', unit: 'V', defaultValue: 48, required: true },
        { id: 'powerFactor', label: 'Power Factor', defaultValue: 1, min: 0.1, max: 1, step: 0.01 },
        { id: 'voltageType', label: 'Voltage Type', options: [{ value: 'vll', label: 'Line-to-Line' }, { value: 'vln', label: 'Line-to-Neutral' }], defaultValue: 'vll', helperText: 'Used only for three-phase AC.' }
      ],
      outputs: [
        { id: 'watts', label: 'Calculated Power', unit: 'W' },
        { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
      ],
      formulaLabel: "W = A × V × phase factor × PF",
      formulas: {
        dc: "W = A × V",
        ac1: "W = A × V × PF",
        'ac3-vll': "W = √3 × A × V × PF",
        'ac3-vln': "W = 3 × A × V × PF"
      },
      example: "10A × 48V = 480W",
      helperText: "Use any custom voltage for DC, single-phase AC, or three-phase AC calculations."
    };
  }

  if (slug === 'power-factor') {
    return {
      id: "power-factor",
      title: "Power Factor Calculator",
      calculatorType: "power-factor",
      inputs: [
        { id: 'power', label: 'Real Power', unit: 'W', defaultValue: 800, required: true },
        { id: 'apparentPower', label: 'Apparent Power', unit: 'VA', defaultValue: 1000, required: true }
      ],
      outputs: [
        { id: 'powerFactor', label: 'Power Factor', unit: 'PF' },
        { id: 'percent', label: 'Real Power Share', unit: '%' }
      ],
      formulaLabel: "PF = Watts ÷ Volt-Amps",
      example: "800W ÷ 1000VA = 0.80 PF",
      helperText: "Calculate power factor from real watts and apparent volt-amps.",
      resultInterpretation: "Power factor shows how much apparent power becomes usable real power."
    };
  }

  // 7. Safety Tool Pages
  if (slug === 'voltage-drop-calculator') {
    return {
      id: "voltage-drop",
      title: "Voltage Drop Calculator",
      calculatorType: "voltage-drop",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 15, required: true },
        { id: 'wireLength', label: 'Wire Length (one way)', unit: 'ft', defaultValue: 50, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'wireMaterial', label: 'Wire Material', options: [{value: 'copper', label: 'Copper'}, {value: 'aluminum', label: 'Aluminum'}], defaultValue: 'copper' },
        { id: 'wireSize', label: 'Wire Size (AWG)', options: [
          {value: 14, label: '14 AWG'}, {value: 12, label: '12 AWG'}, {value: 10, label: '10 AWG'}, {value: 8, label: '8 AWG'}, {value: 6, label: '6 AWG'}, {value: 4, label: '4 AWG'}, {value: 2, label: '2 AWG'}, {value: 1, label: '1 AWG'}, {value: 0, label: '1/0 AWG'}, {value: -1, label: '2/0 AWG'}, {value: -2, label: '3/0 AWG'}, {value: -3, label: '4/0 AWG'}
        ], defaultValue: 12 }
      ],
      outputs: [
        { id: 'vdrop', label: 'Voltage Drop', unit: 'V' },
        { id: 'vdropPercent', label: 'Drop Percentage', unit: '%' },
        { id: 'endVoltage', label: 'End Voltage', unit: 'V' }
      ],
      formulaLabel: "V_drop = 2 × L × R × I / 1000",
      example: "Calculates voltage drop based on NEC Chapter 9 Table 8.",
      helperText: "Determine the voltage drop for a wire run."
    };
  }

  if (slug === 'wire-gauge-calculator') {
    return {
      id: "wire-gauge",
      title: "Wire Gauge Calculator",
      calculatorType: "wire-gauge",
      modes: ['dc', 'ac1', 'ac3'],
      defaultMode: 'ac1',
      inputs: [
        { id: 'current', label: 'Current', unit: 'A', defaultValue: 15, required: true },
        { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
        { id: 'wireLength', label: 'Length (one way)', unit: 'ft', defaultValue: 50, required: true },
        { id: 'wireMaterial', label: 'Material', options: [{value: 'copper', label: 'Copper'}, {value: 'aluminum', label: 'Aluminum'}], defaultValue: 'copper' },
        { id: 'allowableDrop', label: 'Allowable Drop (%)', unit: '%', defaultValue: 3, required: true }
      ],
      outputs: [
        { id: 'awg', label: 'Recommended Gauge', unit: 'AWG' },
        { id: 'vdrop', label: 'Voltage Drop Estimate', unit: 'V' }
      ],
      formulaLabel: "Selects smallest AWG meeting ampacity and voltage drop requirements.",
      formulas: {
        'dc': 'Selects smallest AWG meeting ampacity and DC voltage drop limits.',
        'ac1': 'Selects smallest AWG meeting ampacity and single-phase voltage drop limits.',
        'ac3-vll': 'Selects smallest AWG meeting ampacity and three-phase voltage drop limits.'
      },
      example: "Finds the correct wire size for safety and efficiency.",
      helperText: "Find the recommended wire gauge for your circuit."
    };
  }

  // Fallback for any other standard amps to watts
  return {
    id: "generic-amps-to-watts",
    title: "Amps to Watts Calculator",
    calculatorType: "broad-amps-to-watts",
    inputs: [
      { id: 'current', label: 'Current', unit: 'A', defaultValue: 10, required: true },
      { id: 'voltage', label: 'Voltage', unit: 'V', defaultValue: 120, required: true },
      { id: 'powerFactor', label: 'Power Factor', defaultValue: 1.0, min: 0.1, max: 1, step: 0.01 }
    ],
    outputs: [
      { id: 'watts', label: 'Calculated Power', unit: 'W' },
      { id: 'kilowatts', label: 'Calculated Power', unit: 'kW' }
    ],
    formulaLabel: "W = A × V × PF",
    example: "10A × 120V × 1.0 = 1200W",
    helperText: "Convert amps and volts into watts."
  };
}

export function getCalculatorConfig(slug: string): CalculatorConfig {
  return withConfigDefaults(slug, getCalculatorConfigDraft(slug));
}
