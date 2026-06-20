import type { Tool } from "@/data/tools";

export type FaqItem = {
  q: string;
  a: string;
  icon: string;
};

/**
 * Generate FAQ questions for a given tool, or default homepage questions.
 * Each tool category gets unique, hand-written questions based on real
 * "People Also Ask" queries to avoid Google detecting templated patterns.
 */
export function getFaqQuestions(tool?: Tool): FaqItem[] {
  if (tool) {
    // Route to category-specific FAQ sets instead of templated questions
    if (tool.slug.includes("solar")) return solarFaq(tool);
    if (tool.slug.includes("led")) return ledFaq(tool);
    if (tool.slug.includes("speaker")) return speakerFaq(tool);
    if (tool.kind === "voltage-drop") return voltageDropFaq();
    if (tool.kind === "wire-gauge") return wireGaugeFaq();
    if (tool.kind === "amp-hours") return batteryFaq(tool);
    if (
      tool.kind === "power-factor" ||
      tool.kind === "kva-to-watts" ||
      tool.kind === "volt-amps"
    )
      return powerQualityFaq(tool);
    if (tool.kind === "amps-to-kw") return ampsToKwFaq();
    if (tool.slug.includes("megawatts")) return megawattFaq();
    if (tool.defaultPhase === "ac3" || tool.slug.includes("3-phase"))
      return threePhaseFaq();
    if (
      tool.defaultPhase === "dc" ||
      tool.slug.includes("dc") ||
      tool.slug.includes("12v")
    )
      return dcFaq(tool);
    if (tool.slug.includes("120v")) return voltage120Faq();
    if (tool.slug.includes("220v")) return voltage220Faq();
    if (tool.slug.includes("230v")) return voltage230Faq();
    if (tool.slug.includes("240v")) return voltage240Faq();
    return acGeneralFaq(tool);
  }

  return homeFaq();
}

function homeFaq(): FaqItem[] {
  return [
    {
      q: "How do I convert amps to watts?",
      a: "Multiply amps by volts to get watts. For example, 10 amps at 120 volts equals 1,200 watts (10 × 120 = 1,200). For AC circuits with motors or compressors, also multiply by the power factor from the equipment nameplate.",
      icon: "W",
    },
    {
      q: "What is the formula for amps to watts?",
      a: "There are three formulas depending on the circuit type. DC: Watts = Amps × Volts. AC single-phase: Watts = Amps × Volts × Power Factor. AC three-phase (line-to-line): Watts = 1.732 × Amps × Volts × Power Factor. For three-phase line-to-neutral: Watts = 3 × Amps × Volts × Power Factor.",
      icon: "AC",
    },
    {
      q: "How many watts are in 1 amp?",
      a: "1 amp equals a different number of watts depending on the voltage. At 12V, 1 amp = 12 watts. At 120V, 1 amp = 120 watts. At 240V, 1 amp = 240 watts. This assumes power factor of 1.00. For AC motor loads with lower power factor, the real watts will be lower.",
      icon: "1A",
    },
    {
      q: "Do I need voltage to convert amps to watts?",
      a: "Yes — you cannot convert amps to watts without knowing the voltage. Amps measure current flow, and watts measure power. The relationship is Watts = Amps × Volts. Without voltage, there is no way to determine how much power the current represents. A 10-amp load could be 120 watts (at 12V) or 2,400 watts (at 240V).",
      icon: "V",
    },
    {
      q: "Why does AC amps to watts need power factor?",
      a: "Power factor (PF) measures how efficiently a device uses current. Resistive loads like heaters use all the current for real work (PF = 1.0). Motors and compressors draw extra current due to inductance, so their power factor is lower (0.70–0.95). Without accounting for PF, you would overestimate watts by 10–40% for these loads.",
      icon: "PF",
    },
    {
      q: "What is the difference between amps and watts?",
      a: "Amps (amperes) measure the flow rate of electric current — how much charge passes a point per second. Watts measure electric power — the rate at which electrical energy is used or converted to heat, light, or motion. You need both amps and volts to calculate watts: Watts = Amps × Volts.",
      icon: "VS",
    },
    {
      q: "How do I convert three-phase amps to watts?",
      a: "For three-phase with line-to-line voltage: Watts = √3 × Amps × Volts × Power Factor (√3 ≈ 1.732). For line-to-neutral voltage: Watts = 3 × Amps × Volts × PF. Example: 10A at 480V with PF 0.90 using line-to-line voltage = 1.732 × 10 × 480 × 0.90 = 7,478 watts.",
      icon: "3P",
    },
    {
      q: "Is watts the same as watt-hours?",
      a: "No. Watts (W) measure instantaneous power — how fast energy is being used right now. Watt-hours (Wh) measure total energy consumed over time. A 100-watt light bulb running for 3 hours uses 300 watt-hours (0.3 kWh). Your electricity bill charges per kilowatt-hour, not per watt.",
      icon: "Wh",
    },
    {
      q: "Can I use this calculator for appliances?",
      a: "Yes. Enter the amperage from the appliance nameplate, the outlet voltage (120V or 240V in the US), and power factor if listed. For resistive appliances (heaters, toasters, hair dryers), use PF = 1.0. For motor-driven appliances (refrigerators, AC units, washing machines), use the nameplate PF or estimate 0.85.",
      icon: "APP",
    },
    {
      q: "Can I use this calculator for breaker or wire sizing?",
      a: "You can use the result for load planning, but not for final breaker or wire sizing. The NEC requires that continuous loads (3+ hours) stay at or below 80% of the breaker rating. Final sizing must account for wire gauge, ambient temperature, conduit fill, voltage drop, and local code. Always consult a licensed electrician for safety-critical work.",
      icon: "SA",
    },
  ];
}


function dcFaq(tool: Tool): FaqItem[] {
  const v = tool.defaultVoltage ?? 12;
  return [
    {
      q: `How do I convert ${v}V amps to watts?`,
      a: `Multiply the current in amps by ${v} volts. For example, 5 amps at ${v}V equals ${5 * v} watts (5 × ${v} = ${5 * v}). DC conversions do not require a power factor because current and voltage are always in phase.`,
      icon: "W",
    },
    {
      q: `How many watts can a ${v}V battery deliver?`,
      a: `A ${v}V battery's power output depends on current draw. At 10A, it delivers ${10 * v}W. At 20A, it delivers ${20 * v}W. The maximum safe current depends on the battery's internal resistance, terminal rating, and fuse protection. Always check the battery data sheet for maximum discharge rate.`,
      icon: "BAT",
    },
    {
      q: "Why is DC conversion simpler than AC?",
      a: `DC circuits have no power factor because current and voltage don't alternate. The formula is simply Watts = Amps × Volts. AC circuits have reactive power from inductors and capacitors that requires a power factor correction, making the formula Watts = Amps × Volts × PF.`,
      icon: "DC",
    },
    {
      q: `What wire gauge do I need for ${v}V DC?`,
      a: `Wire gauge for ${v}V DC depends on current, distance, and acceptable voltage drop. Low-voltage DC circuits are especially sensitive to voltage drop because a 0.5V loss is a larger percentage of ${v}V than of 120V. Use the wire gauge calculator with one-way distance and ${v}V to find the right conductor size.`,
      icon: "AWG",
    },
    {
      q: "Can I use this calculator for solar panel circuits?",
      a: `Yes, but use the correct voltage point. Solar panels operate at Vmp (maximum power voltage), not the battery voltage. A 12V-nominal panel may have Vmp of 17–18V. For battery-side current, use the battery voltage. For panel-side wiring, use the panel Vmp.`,
      icon: "PV",
    },
    {
      q: `How do I calculate battery runtime from watts at ${v}V?`,
      a: `First convert amps to watts (A × ${v}V). Then convert battery capacity: Watt-hours = Amp-hours × ${v}V. Divide Wh by the load watts to estimate runtime in hours. Account for inverter efficiency (typically 85–92%) if converting DC to AC. Use the amp-hours to watt-hours calculator for detailed estimates.`,
      icon: "RUN",
    },
  ];
}

function voltage120Faq(): FaqItem[] {
  return [
    {
      q: "How many watts is 15 amps at 120V?",
      a: "15 amps at 120V equals 1,800 watts (15 × 120 = 1,800). This is the maximum capacity of a standard 15A household circuit. For continuous loads, the NEC 80% rule limits you to 1,440 watts on this circuit.",
      icon: "15A",
    },
    {
      q: "How many watts is 20 amps at 120V?",
      a: "20 amps at 120V equals 2,400 watts. Kitchen and bathroom outlets are typically on 20A circuits. The continuous load limit is 1,920 watts (80% of 2,400).",
      icon: "20A",
    },
    {
      q: "What is the maximum wattage for a 120V outlet?",
      a: "A standard 120V, 15A outlet can handle 1,800 watts maximum (15 × 120). A 120V, 20A outlet handles 2,400 watts. However, for devices running more than 3 hours continuously, stay below the 80% threshold: 1,440W on a 15A circuit, 1,920W on a 20A circuit.",
      icon: "MAX",
    },
    {
      q: "Why do some appliances need 240V instead of 120V?",
      a: "High-power appliances like dryers (5,500W), EV chargers (7,680W), and central AC (3,600W) need more watts than a 120V circuit can safely deliver. At 120V, a 5,500W dryer would draw 46 amps — far exceeding standard circuit limits. At 240V, it draws only 23 amps, which fits a 30A circuit safely.",
      icon: "240",
    },
    {
      q: "Do I need power factor for 120V household calculations?",
      a: "For most household loads (lights, heaters, toasters, hair dryers), power factor is 1.00 or very close, so the simple formula Watts = Amps × 120 is sufficient. Use power factor only for motor-driven appliances like refrigerators (PF 0.80–0.90), window AC units (PF 0.85), and large workshop tools.",
      icon: "PF",
    },
    {
      q: "How many 120V outlets can I put on one circuit?",
      a: "The NEC does not set a fixed number of outlets per circuit, but the total load must stay within the breaker rating. A 15A/120V circuit handles 1,800W max. Add up the wattage of everything plugged in. In practice, 8–10 general-purpose outlets on a 15A circuit is common when not all are loaded simultaneously.",
      icon: "OUT",
    },
  ];
}

function voltage220Faq(): FaqItem[] {
  return [
    {
      q: "How do I convert amps to watts at 220V?",
      a: "Multiply amps by 220 volts. For resistive loads: Watts = Amps × 220. For AC motors and compressors: Watts = Amps × 220 × Power Factor. Example: 10 amps at 220V = 2,200 watts.",
      icon: "W",
    },
    {
      q: "Is 220V the same as 230V or 240V?",
      a: '220V, 230V, and 240V are different nominal voltages used in different regions. 220V is common in parts of Asia, Africa, and South America. 230V is the EU/UK standard (harmonized from 220V). 240V is US split-phase. The actual measured voltage can vary by ±10%, so a "220V" outlet may read 215V–225V.',
      icon: "VS",
    },
    {
      q: "What appliances run on 220V?",
      a: "In countries with 220V mains, virtually all household appliances run on 220V: air conditioners, washing machines, water heaters, ovens, irons, and refrigerators. In the US, 220V is less common but used for heavy appliances imported from international markets.",
      icon: "APP",
    },
    {
      q: "How many watts can a 220V, 15A circuit deliver?",
      a: "A 220V, 15A circuit can deliver 3,300 watts maximum (15 × 220). At 80% continuous load, the planning limit is 2,640 watts. This is significantly more than a 120V, 15A circuit (1,800W), which is why 220V systems can handle larger appliances on lighter circuits.",
      icon: "15A",
    },
    {
      q: "Do I need a different calculator for 220V vs 120V?",
      a: "The formula is identical — only the voltage value changes. However, the dedicated 220V calculator presets the voltage to 220, saving time and reducing input errors. It also includes 220V-specific guidance for international wiring standards and appliance ratings.",
      icon: "CAL",
    },
    {
      q: "Can I plug a 120V appliance into 220V?",
      a: 'No — plugging a 120V-rated appliance directly into 220V can destroy it and create a fire hazard. The appliance would draw roughly double its rated current, overheating internal components. Use a step-down transformer or a dual-voltage appliance (look for "100–240V" on the nameplate).',
      icon: "⚠",
    },
  ];
}

function voltage230Faq(): FaqItem[] {
  return [
    {
      q: "How do I convert amps to watts at 230V?",
      a: "Multiply amps by 230: Watts = Amps × 230 × PF. For a kettle drawing 13 amps at 230V with PF 1.0: 13 × 230 = 2,990 watts. The UK standard ring main circuit uses a 32A breaker, handling up to 7,360 watts.",
      icon: "W",
    },
    {
      q: "What is the maximum watts on a UK 13A socket?",
      a: "A UK BS 1363 socket with a 13A fused plug can deliver 2,990 watts maximum (13 × 230). In practice, this limits individual appliances to about 3 kW. For higher loads like electric showers (7–10.5 kW), a dedicated circuit with higher-rated MCB is required.",
      icon: "13A",
    },
    {
      q: "Is European voltage 220V or 230V?",
      a: "The EU harmonized to a nominal 230V ±10% in 2003 (EN 50160). Previously, most of continental Europe used 220V and the UK used 240V. The wide tolerance means actual voltage can range from 207V to 253V. Both old 220V and 240V equipment works safely within this range.",
      icon: "EU",
    },
    {
      q: "Do UK appliances use power factor?",
      a: "Resistive UK appliances (kettles, toasters, immersion heaters) have PF ≈ 1.00. Motor-driven appliances (washing machines, refrigerators, air conditioners) have PF ranging from 0.75 to 0.95. For load planning on a consumer unit, accounting for PF gives more accurate watt calculations.",
      icon: "PF",
    },
    {
      q: "How many amps does a UK electric shower use?",
      a: "A 9.5 kW electric shower at 230V draws 9,500 ÷ 230 = 41.3 amps. This requires a dedicated 45A MCB and 10mm² cable. Higher-powered showers (10.5 kW) draw about 45.7 amps. Always check the installation complies with BS 7671 wiring regulations.",
      icon: "SHW",
    },
    {
      q: "What MCB size do I need for my watt load at 230V?",
      a: "Divide your total watts by 230 to get amps, then select the next standard MCB size above. For example, 4,600W ÷ 230 = 20A, so a 20A Type B MCB would suit a resistive load. For motor loads, use a Type C MCB to handle startup inrush. Always have an electrician verify the circuit design.",
      icon: "MCB",
    },
  ];
}

function voltage240Faq(): FaqItem[] {
  return [
    {
      q: "How many watts is 30 amps at 240V?",
      a: "30 amps at 240V equals 7,200 watts (30 × 240 = 7,200). This is a common circuit for electric dryers and some EV chargers. The 80% continuous load limit is 5,760 watts.",
      icon: "30A",
    },
    {
      q: "What size breaker do I need for a 240V circuit?",
      a: "Divide the appliance wattage by 240 to find amps, then choose the next standard breaker size. A 5,500W dryer: 5,500 ÷ 240 = 22.9A → 30A breaker. A 7,680W EV charger: 7,680 ÷ 240 = 32A → 40A breaker (with 80% rule: 32A is 80% of 40A).",
      icon: "BRK",
    },
    {
      q: "Why is 240V used for large appliances in the US?",
      a: "The US electrical system provides both 120V and 240V from a split-phase transformer. 240V delivers twice the wattage at the same amperage, allowing smaller wire and breaker sizes for high-power loads. A 5,500W dryer on 120V would need 46A and thick cable; on 240V, it needs only 23A.",
      icon: "WHY",
    },
    {
      q: "Is US 240V single-phase or two-phase?",
      a: 'US residential 240V is technically single-phase, split into two 120V legs that are 180° out of phase. It is sometimes called "split-phase" but not "two-phase." True two-phase and three-phase systems use different transformer configurations and are found in commercial/industrial settings.',
      icon: "PH",
    },
    {
      q: "How do I calculate EV charger amps from watts at 240V?",
      a: "Divide charger watts by 240V. A Level 2 EV charger rated at 7,680W draws 7,680 ÷ 240 = 32 amps. For the 80% NEC continuous load rule, this needs a 40A breaker (32 ÷ 0.80 = 40) and 8 AWG copper wire for typical residential runs.",
      icon: "EV",
    },
    {
      q: "Can I convert a 120V outlet to 240V?",
      a: "Only if the circuit has the proper wiring. A 240V circuit needs two hot wires, a neutral (if 120V taps are needed), and a ground. A licensed electrician must install the correct breaker, receptacle, and verify the wire gauge is adequate for the planned load. Never attempt to combine two 120V circuits into 240V without proper rewiring.",
      icon: "⚠",
    },
  ];
}

function threePhaseFaq(): FaqItem[] {
  return [
    {
      q: "What is the three-phase amps to watts formula?",
      a: "For balanced three-phase loads using line-to-line voltage: Watts = √3 × Amps × Volts × Power Factor (√3 ≈ 1.732). For line-to-neutral voltage: Watts = 3 × Amps × Volts × PF. The √3 factor accounts for the 120° phase offset between the three power lines.",
      icon: "3P",
    },
    {
      q: "What does √3 (1.732) mean in three-phase power?",
      a: "The √3 factor is a mathematical constant that relates line-to-line voltage to phase voltage in a balanced three-phase system. Line-to-line voltage is √3 times higher than line-to-neutral voltage. When calculating power from line-to-line measurements, √3 corrects the formula to give the total power across all three phases.",
      icon: "√3",
    },
    {
      q: "How do I find the power factor of a three-phase motor?",
      a: "Check the motor nameplate — it typically lists PF or cos(φ) at full load. Common values: small motors (1–5 HP) = 0.75–0.85, medium motors (5–50 HP) = 0.82–0.90, large motors (50+ HP) = 0.85–0.92. At partial load, PF drops significantly. You can also measure PF with a three-phase power analyzer.",
      icon: "PF",
    },
    {
      q: "What is the difference between line-to-line and line-to-neutral voltage?",
      a: "Line-to-line (L-L) voltage is measured between any two of the three phase conductors. Line-to-neutral (L-N) is measured from one phase to the neutral or star point. Common L-L values: 208V, 400V, 480V. L-N is L-L ÷ √3: 120V, 230V, 277V respectively. Most three-phase motors and industrial equipment use L-L voltage.",
      icon: "V",
    },
    {
      q: "How many amps does a 10 HP three-phase motor draw?",
      a: "A 10 HP three-phase motor at 480V with PF 0.85 and 90% efficiency draws approximately 10.3 amps per phase. Formula: 10 HP × 746W/HP = 7,460W. Amps = 7,460 ÷ (1.732 × 480 × 0.85) = 10.6A. NEC Table 430.250 lists 14A for 460V, 10 HP motors as a conservative reference.",
      icon: "HP",
    },
    {
      q: "Can I use this calculator for unbalanced three-phase loads?",
      a: "This calculator assumes balanced three-phase loads (equal current on all three phases). For unbalanced loads, calculate each phase separately as a single-phase circuit and sum the results. Severely unbalanced loads can cause neutral current issues and require individual phase analysis.",
      icon: "UNB",
    },
  ];
}

function acGeneralFaq(tool: Tool): FaqItem[] {
  const v = tool.defaultVoltage ?? 120;
  return [
    {
      q: `How do I convert AC amps to watts at ${v}V?`,
      a: `For single-phase AC: Watts = Amps × ${v} × Power Factor. For pure resistive loads (PF = 1.0), it simplifies to Watts = Amps × ${v}. Example: 10A at ${v}V with PF 0.90 = ${Math.round(10 * v * 0.9)} watts real power.`,
      icon: "W",
    },
    {
      q: "What is the difference between real watts and apparent power (VA)?",
      a: "Real watts (W) represent usable power that does actual work — heat, light, motion. Apparent power (VA) is the total current × voltage drawn from the supply, including reactive current that does no useful work. The ratio is power factor: Watts = VA × PF. A 1,000 VA UPS at PF 0.80 delivers only 800W of real power.",
      icon: "VA",
    },
    {
      q: "Why are my AC watts lower than amps × volts?",
      a: "Because inductive loads (motors, compressors, transformers) draw reactive current that oscillates between the source and load without doing useful work. This lowers the power factor below 1.00, so real watts are less than the simple amps × volts product. Only resistive loads (heaters, incandescent lamps) give watts equal to amps × volts.",
      icon: "PF",
    },
    {
      q: "How do I measure power factor?",
      a: "You can measure PF with a power quality meter or clamp meter that reads both watts and VA simultaneously. PF = Watts ÷ VA. Alternatively, check the equipment nameplate — most motors, compressors, and industrial equipment list PF at rated load. If unknown, 0.85 is a conservative estimate for motor loads.",
      icon: "MTR",
    },
    {
      q: "Can I just ignore power factor for household circuits?",
      a: "For most residential calculations, yes. Household resistive loads (lights, heaters, toasters) have PF very close to 1.00. But for whole-house load calculations that include HVAC compressors, well pumps, and refrigerators, ignoring PF will overestimate real power by 10–20%. For generator sizing, always account for PF.",
      icon: "HOME",
    },
    {
      q: `Does this calculator work for both ${v}V and other voltages?`,
      a: `Yes — you can change the voltage field to any value. The calculator applies the correct formula for DC, AC single-phase, or AC three-phase regardless of voltage. This page defaults to ${v}V for convenience, but the formula works for 12V, 24V, 48V, 208V, 480V, or any other voltage.`,
      icon: "CAL",
    },
  ];
}

function solarFaq(tool: Tool): FaqItem[] {
  return [
    {
      q: "How do I convert solar panel watts to charging amps?",
      a: "Divide the panel wattage by the system voltage: Amps = Watts ÷ Volts. A 400W panel charging a 12V battery bank produces approximately 400 ÷ 12 = 33.3 amps at the battery side. However, the actual charging current depends on the charge controller type (MPPT vs PWM), cable losses, and battery state of charge.",
      icon: "PV",
    },
    {
      q: "What is the difference between panel amps and battery charging amps?",
      a: "Solar panels produce current at their Vmp (maximum power voltage), which is typically 17–40V per panel. An MPPT charge controller converts this higher-voltage, lower-current panel output into lower-voltage, higher-current battery charging. Panel-side amps and battery-side amps are different — always specify which you are calculating.",
      icon: "VS",
    },
    {
      q: "How do I size a charge controller from panel watts?",
      a: "Divide total panel watts by battery voltage to get maximum charge current, then add a 25% safety margin. For 800W of panels on a 24V system: 800 ÷ 24 = 33.3A → choose a 40A or 50A controller. MPPT controllers should be sized for both maximum input voltage (panel Voc × temperature correction) and output current.",
      icon: "MPPT",
    },
    {
      q: "Should I use panel Vmp or Voc for wiring calculations?",
      a: "Use Voc (open-circuit voltage) × temperature correction factor for wire insulation ratings, breaker sizing, and charge controller maximum input voltage. Use Vmp for current and power calculations during normal operation. Voc can be 10–20% higher than Vmp.",
      icon: "VOC",
    },
    {
      q: "How do I account for MPPT efficiency in solar amps calculation?",
      a: "MPPT controllers are typically 95–99% efficient. Multiply the theoretical battery-side current by the efficiency: Actual amps = (Panel watts ÷ Battery voltage) × Efficiency. For 400W panels on 12V with 97% MPPT efficiency: (400 ÷ 12) × 0.97 = 32.3A actual charging current.",
      icon: "EFF",
    },
    {
      q: "What wire gauge do I need for solar panel connections?",
      a: "Size wire for the maximum short-circuit current (Isc) × 1.56 safety factor per NEC 690.8. For a panel string with Isc of 10A: 10 × 1.56 = 15.6A minimum wire ampacity. Use the voltage drop calculator to check that the run length does not cause excessive loss, especially on long roof-to-controller runs.",
      icon: "AWG",
    },
  ];
}

function ledFaq(tool: Tool): FaqItem[] {
  return [
    {
      q: "How do I calculate LED strip current draw?",
      a: "Divide total LED strip wattage by the supply voltage: Amps = Watts ÷ Volts. A 5-meter strip rated at 14.4 watts per meter on 12V draws (14.4 × 5) ÷ 12 = 6 amps. Always total all connected strip lengths before sizing the driver.",
      icon: "LED",
    },
    {
      q: "What size LED driver do I need?",
      a: "Calculate total LED watts, then choose a driver rated 15–20% above. For 72W of LED strips, use an 85–90W driver. Running a driver at full capacity reduces its lifespan and can cause flickering. Also match the driver output voltage (constant voltage 12V or 24V) to the LED strip requirements.",
      icon: "DRV",
    },
    {
      q: "Why do long LED strips dim at the far end?",
      a: "Voltage drop across the copper traces inside the strip reduces voltage at the far end, causing dimmer LEDs. At 12V, even a 0.5V drop is a 4% loss. Solutions: run power from both ends, use 24V strips instead of 12V, use heavier gauge feed wires, or add injection points every 5 meters.",
      icon: "DIM",
    },
    {
      q: "12V vs 24V LED strips — which should I use?",
      a: "24V strips are better for long runs because the same wattage draws half the current, reducing voltage drop by 75%. A 72W installation at 12V draws 6A; at 24V, only 3A. Use 12V only for short runs under 3 meters or when compatibility with 12V automotive or battery systems is needed.",
      icon: "VS",
    },
    {
      q: "How do I wire multiple LED strips to one driver?",
      a: "Connect strips in parallel to a constant-voltage driver. Each strip draws its own current, and the driver must supply the total. Three 24W strips = 72W total → need a 72W+ driver. Use adequately sized wire from the driver to each strip branch, and ensure each run is fused appropriately.",
      icon: "WIR",
    },
    {
      q: "What fuse size do I need for LED strip power?",
      a: "Calculate the total current: Amps = Total watts ÷ Volts. Add 20% for fuse headroom. For 72W at 12V: 72 ÷ 12 = 6A → use a 7.5A or 8A fuse. The fuse protects the wiring, not the LEDs. Ensure the fuse rating matches the wire gauge ampacity.",
      icon: "FUSE",
    },
  ];
}

function speakerFaq(tool: Tool): FaqItem[] {
  return [
    {
      q: "How many amps does a car amplifier draw?",
      a: "Divide the amplifier RMS output power by (supply voltage × efficiency). A 500W RMS Class AB amp at 13.8V with 50% efficiency draws 500 ÷ (13.8 × 0.50) = 72.5 amps. Class D amps are more efficient (75–90%), drawing significantly less: 500 ÷ (13.8 × 0.85) = 42.6 amps.",
      icon: "AMP",
    },
    {
      q: "What fuse size do I need for my car audio amplifier?",
      a: "Calculate maximum current draw from the amplifier total power consumption (not output power). A 500W RMS amp at 50% efficiency consumes 1,000W total. At 13.8V: 1,000 ÷ 13.8 = 72.5A. Add 20% headroom → 87A fuse. Most car audio fuse blocks use ANL or mini-ANL fuses in standard sizes (60A, 80A, 100A).",
      icon: "FUSE",
    },
    {
      q: "Why does my amplifier draw more amps than the output watts suggest?",
      a: "Because amplifier efficiency is never 100%. Class AB amps are typically 50–65% efficient, meaning they consume roughly double the audio output power as total electrical power. The remainder becomes heat. Class D amps are 75–90% efficient, wasting less power as heat.",
      icon: "EFF",
    },
    {
      q: "What wire gauge do I need for a car amplifier power cable?",
      a: "Match wire gauge to the total current draw and cable length. For 80A at 15 feet (one way), 1/0 AWG or 2 AWG copper is typical. For 40A at 10 feet, 4 AWG is usually adequate. Always include a fuse within 18 inches of the battery terminal. Check voltage drop — car audio is sensitive to voltage sag under load.",
      icon: "AWG",
    },
    {
      q: "How do I convert speaker impedance into amplifier current?",
      a: "At full power output: Amps = √(Watts ÷ Impedance). A 100W channel into 4 ohms: √(100 ÷ 4) = 5A RMS per channel at the speaker terminals. Supply-side current is higher due to efficiency losses. Note: this is speaker-terminal current, not power supply current.",
      icon: "Ω",
    },
    {
      q: "Peak watts vs RMS watts — which should I use for calculations?",
      a: 'Always use RMS (continuous) watts for current draw and fuse calculations. Peak watts are a marketing figure representing momentary maximum output and are typically 2× RMS. A "1,000W peak" amplifier likely produces 500W RMS. Use the RMS value to avoid undersizing fuses and wiring.',
      icon: "RMS",
    },
  ];
}

function batteryFaq(tool: Tool): FaqItem[] {
  return [
    {
      q: "How do I convert amp-hours to watt-hours?",
      a: "Multiply amp-hours by the battery nominal voltage: Wh = Ah × V. A 100Ah battery at 12V stores 1,200 Wh (1.2 kWh). At 24V, the same 100Ah stores 2,400 Wh. This makes comparing batteries at different voltages straightforward.",
      icon: "Wh",
    },
    {
      q: "What is the difference between amp-hours and watt-hours?",
      a: "Amp-hours (Ah) measure charge capacity — how much current a battery can deliver over time. Watt-hours (Wh) measure energy capacity — how much work the stored energy can do. Wh is more useful for comparing batteries because it accounts for voltage. A 50Ah/24V battery (1,200 Wh) stores the same energy as a 100Ah/12V battery (1,200 Wh).",
      icon: "VS",
    },
    {
      q: "How do I estimate battery runtime from watt-hours?",
      a: "Divide usable watt-hours by the load in watts: Runtime (hours) = Wh ÷ Watts. A 1,200 Wh battery powering a 100W load lasts approximately 12 hours. For AC loads through an inverter, divide by inverter efficiency (typically 85–92%): 1,200 × 0.90 ÷ 100 = 10.8 hours.",
      icon: "RUN",
    },
    {
      q: "Why can I not use 100% of a battery capacity?",
      a: "Lead-acid batteries should not be discharged below 50% (only 50% usable). LiFePO4 batteries can safely use 80–90% of rated capacity. AGM batteries are typically limited to 50–60%. Discharging below these limits dramatically shortens battery life. Factor usable capacity into runtime calculations.",
      icon: "DOD",
    },
    {
      q: "How do I calculate charging time from amp-hours?",
      a: "Divide the amp-hours to replenish by the charging current: Time (hours) = Ah ÷ Charging Amps. A 100Ah battery at 50% SOC needs 50Ah. At 10A charging: 50 ÷ 10 = 5 hours. In practice, add 10–20% for charging efficiency losses, and note that bulk charging slows to absorption/float near full charge.",
      icon: "CHG",
    },
    {
      q: "Can I compare batteries with different voltages using Ah?",
      a: "No — amp-hours alone do not indicate energy. A 200Ah/6V battery stores 1,200 Wh, while a 50Ah/24V battery also stores 1,200 Wh — identical energy despite very different Ah ratings. Always convert to watt-hours for meaningful comparisons.",
      icon: "CMP",
    },
  ];
}

function voltageDropFaq(): FaqItem[] {
  return [
    {
      q: "What is acceptable voltage drop?",
      a: "The NEC recommends a maximum of 3% voltage drop for branch circuits and 5% total (feeder + branch combined) per informational note to NEC 210.19. For sensitive electronics and LED lighting, aim for 2% or less. Low-voltage DC systems (12V, 24V) are especially sensitive — even 0.5V drop is significant.",
      icon: "%",
    },
    {
      q: "How do I calculate voltage drop for a wire run?",
      a: "Voltage drop = (2 × K × I × D) ÷ CM, where K is the resistivity constant (10.75 for copper, 17.7 for aluminum), I is current in amps, D is one-way distance in feet, and CM is the circular mil area of the conductor. The calculator automates this for standard AWG sizes.",
      icon: "CALC",
    },
    {
      q: "Does voltage drop differ for DC and AC circuits?",
      a: "The basic resistance-based voltage drop formula is the same. However, AC circuits can have additional impedance from inductance in conduit or cable geometry, especially at higher frequencies or in large conductors. For standard residential and commercial wiring, the DC formula is accurate enough for planning.",
      icon: "AC",
    },
    {
      q: "Why is voltage drop worse at low voltage?",
      a: "A 1V drop on a 12V circuit is an 8.3% loss, but on a 120V circuit it is only 0.8%. The same wire, same current, same distance produces the same absolute voltage drop, but the percentage impact is 10× worse at 12V. This is why low-voltage DC installations require significantly larger wire.",
      icon: "12V",
    },
    {
      q: "How does wire length affect voltage drop?",
      a: "Voltage drop increases linearly with distance. Doubling the wire length doubles the drop. The formula uses one-way distance and multiplies by 2 to account for the return conductor. For DC circuits, this is literal. For AC, the return is through the neutral or other phase.",
      icon: "DIST",
    },
    {
      q: "Copper vs aluminum — how does material affect voltage drop?",
      a: "Aluminum has about 1.6× the resistivity of copper, so it drops more voltage for the same gauge. To match copper performance, use aluminum wire two AWG sizes larger (e.g., 2 AWG aluminum instead of 4 AWG copper). Aluminum is cheaper per foot but requires larger conduit and specific connectors rated for aluminum.",
      icon: "CU",
    },
  ];
}

function wireGaugeFaq(): FaqItem[] {
  return [
    {
      q: "How do I choose the right wire gauge?",
      a: "Wire gauge selection must satisfy two independent requirements: ampacity (the wire must carry the load current without overheating) and voltage drop (the wire must deliver adequate voltage at the load). Check both, and use the larger wire if the two requirements disagree. The calculator checks both simultaneously.",
      icon: "AWG",
    },
    {
      q: "What is the difference between wire gauge and wire size?",
      a: "In the American Wire Gauge (AWG) system, gauge and size are inversely related — a lower gauge number means a larger wire. 14 AWG is smaller than 10 AWG. Outside North America, wire is sized by cross-sectional area in mm². 14 AWG ≈ 2.08 mm², 10 AWG ≈ 5.26 mm².",
      icon: "SIZE",
    },
    {
      q: "What gauge wire for 20 amps?",
      a: "Per NEC Table 310.16, 12 AWG copper wire (rated 20A at 60°C) is the minimum for a 20A circuit. For runs longer than 50 feet at 120V, voltage drop may require 10 AWG. At 240V, 12 AWG is usually sufficient for longer runs. Always verify with local code and installation conditions.",
      icon: "20A",
    },
    {
      q: "What gauge wire for 30 amps?",
      a: "10 AWG copper is rated for 30A at 60°C per NEC Table 310.16. For dryer circuits, the NEC specifies a minimum of 10 AWG. For long runs to outbuildings or sub-panels, 8 AWG may be needed to limit voltage drop. Aluminum requires 8 AWG minimum for 30A.",
      icon: "30A",
    },
    {
      q: "Does ambient temperature affect wire gauge selection?",
      a: "Yes. NEC Table 310.15(B)(1) provides derating factors for ambient temperatures above 30°C (86°F). At 40°C, 60°C-rated wire must be derated to 82% of its table ampacity. At 50°C, it drops to 58%. In hot attics, conduit in sun, or industrial environments, you may need to upsize the wire by one or two gauges.",
      icon: "TEMP",
    },
    {
      q: "How does conduit fill affect wire ampacity?",
      a: "Running multiple current-carrying conductors in the same conduit generates heat. NEC 310.15(C)(1) requires derating when more than 3 conductors share a conduit: 4–6 conductors = 80%, 7–9 = 70%, 10–20 = 50%. This can require larger wire than a single-circuit installation.",
      icon: "FILL",
    },
  ];
}

function powerQualityFaq(tool: Tool): FaqItem[] {
  return [
    {
      q: "What is the difference between kVA and kW?",
      a: "kVA (kilovolt-amps) is apparent power — the total current × voltage product. kW (kilowatts) is real power — the portion that does useful work. The relationship is kW = kVA × Power Factor. A 10 kVA generator at PF 0.80 can deliver only 8 kW of real power. Always check whether equipment is rated in kVA or kW.",
      icon: "kVA",
    },
    {
      q: "How do I size a generator using kVA and power factor?",
      a: "Calculate total real power (kW) needed, then divide by the generator power factor to get the required kVA rating: kVA = kW ÷ PF. For 12 kW of load with PF 0.80: kVA = 12 ÷ 0.80 = 15 kVA minimum generator. Add 20–25% for startup surges from motors and compressors.",
      icon: "GEN",
    },
    {
      q: "What is a good power factor?",
      a: "A power factor above 0.95 is excellent. 0.85–0.95 is acceptable for most installations. Below 0.85, utilities may charge power factor penalties. Below 0.70 indicates significant reactive power waste. Power factor correction capacitors can improve PF to 0.95+ by compensating for inductive loads.",
      icon: "GOOD",
    },
    {
      q: "How do I convert VA to watts?",
      a: "Multiply VA by the power factor: Watts = VA × PF. A 1,500 VA UPS at PF 0.70 delivers 1,050 watts of real power. Modern UPS units often list both VA and watt ratings. If only VA is listed, assume PF 0.60–0.70 for older units and PF 0.90+ for newer models.",
      icon: "VA",
    },
    {
      q: "Why do utilities charge for low power factor?",
      a: "Low power factor means the utility must supply extra current that does no useful work, heating transformers and transmission lines without generating revenue. Industrial customers with PF below 0.85–0.90 may face penalty surcharges of 1–2% per 0.01 PF below the threshold. Correction capacitors pay for themselves quickly.",
      icon: "$",
    },
    {
      q: "What is reactive power (kVAR)?",
      a: "kVAR (kilovolt-amp reactive) is the reactive component of power — energy that oscillates between the source and inductive/capacitive loads without doing useful work. It combines with real power (kW) to form apparent power (kVA): kVA² = kW² + kVAR². Reducing kVAR through capacitor banks improves power factor.",
      icon: "VAR",
    },
  ];
}

function ampsToKwFaq(): FaqItem[] {
  return [
    {
      q: "How do I convert amps to kilowatts?",
      a: "First convert amps to watts (Watts = Amps × Volts × PF), then divide by 1,000: kW = Watts ÷ 1,000. Example: 30A at 240V with PF 1.0 = 7,200W = 7.2 kW. The calculator does both steps automatically.",
      icon: "kW",
    },
    {
      q: "What is the difference between kW and kWh?",
      a: "kW is a rate of power (how fast energy is used). kWh is an amount of energy (total energy consumed over time). A 2 kW heater running for 3 hours uses 6 kWh. Your electricity bill charges per kWh. kW tells you the instantaneous load; kWh tells you the total consumption.",
      icon: "kWh",
    },
    {
      q: "How many amps is 1 kW at 240V?",
      a: "1 kW (1,000 watts) at 240V with PF 1.0 draws 1,000 ÷ 240 = 4.17 amps. With a motor load at PF 0.85: 1,000 ÷ (240 × 0.85) = 4.90 amps. The lower the power factor, the more current is needed for the same real power.",
      icon: "1kW",
    },
    {
      q: "Why is kW used more than watts in professional settings?",
      a: "Professional and industrial equipment commonly operates in the thousands of watts, making kilowatts more practical. Generator ratings (5 kW, 20 kW), motor power (1.5 kW, 7.5 kW), utility metering (kWh), and HVAC sizing all use kW. It is simply watts ÷ 1,000.",
      icon: "PRO",
    },
    {
      q: "How do I calculate electricity cost from amps?",
      a: "Convert amps to kW (kW = Amps × Volts × PF ÷ 1,000). Multiply by hours of use to get kWh. Multiply by your electricity rate ($/kWh). Example: 10A heater on 120V for 8 hours at $0.15/kWh: (10 × 120 ÷ 1,000) × 8 × 0.15 = $1.44 per day.",
      icon: "$",
    },
    {
      q: "What is the amps to kW formula for three-phase?",
      a: "kW = (√3 × Amps × Volts × PF) ÷ 1,000. For 20A at 480V three-phase with PF 0.88: kW = (1.732 × 20 × 480 × 0.88) ÷ 1,000 = 14.6 kW. This is the total real power across all three phases.",
      icon: "3P",
    },
  ];
}

function megawattFaq(): FaqItem[] {
  return [
    {
      q: "How do I convert megawatts to amps?",
      a: "For three-phase systems: Amps = MW × 1,000,000 ÷ (√3 × Volts × PF). For 5 MW at 11 kV with PF 0.90: Amps = 5,000,000 ÷ (1.732 × 11,000 × 0.90) = 291.6 amps per phase. This is used for utility-scale generators, substations, and industrial feeders.",
      icon: "MW",
    },
    {
      q: "What voltage levels use megawatt calculations?",
      a: "Megawatt calculations are used at medium and high voltage: 4.16 kV, 11 kV, 13.8 kV, 33 kV, 69 kV, 138 kV, and higher. Distribution substations typically handle 5–50 MW. Transmission lines carry 100+ MW. Power plants generate 50–1,000+ MW per unit.",
      icon: "HV",
    },
    {
      q: "How many homes can 1 MW power?",
      a: "In the US, the average home uses about 1.2 kW average power (10,500 kWh/year ÷ 8,760 hours). So 1 MW can serve approximately 833 average homes on a sustained basis. Peak demand is higher, so utilities plan for 400–500 homes per MW of generation capacity.",
      icon: "HOME",
    },
    {
      q: "What is the difference between MW and MVA?",
      a: "MW is real power (does work). MVA is apparent power (total voltage × current product). MVA = MW ÷ Power Factor. A 10 MVA transformer at PF 0.85 can deliver 8.5 MW of real power. Transformers and generators are rated in MVA because the apparent power determines conductor and core sizing.",
      icon: "MVA",
    },
    {
      q: "Why is three-phase used for megawatt-scale power?",
      a: "Three-phase transmission uses less conductor material than equivalent single-phase for the same power. The √3 factor means 3 wires carry 1.732× the power of 2 wires at the same voltage and current. Three-phase also provides constant instantaneous power (no pulsation) and is essential for large motors and generators.",
      icon: "3P",
    },
    {
      q: "How do I calculate cable size for megawatt loads?",
      a: "At megawatt scale, cable sizing involves detailed engineering: ampacity per NEC/IEC tables, thermal analysis of cable trays or ducts, short-circuit withstand rating, and impedance for relay coordination. This calculator gives the current value; final cable selection requires a power systems engineer.",
      icon: "CBL",
    },
  ];
}
