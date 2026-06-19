/* ================================================================
   AMPS TO WATTS - PREMIUM CLIENT SCRIPT
   Calculator logic and interactions
   ================================================================ */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));
  const number = (field, fallback = 0) => {
    const value = Number(field && field.value);
    return Number.isFinite(value) ? value : fallback;
  };
  const format = (value, decimals = 2) => {
    if (!Number.isFinite(value)) return "-";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(0, Math.min(8, decimals)),
    });
  };
  const setSelectOptions = (select, options) => {
    if (!select) return;
    const current = select.value;
    select.replaceChildren(
      ...options.map(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        return option;
      }),
    );
    if (options.some(([value]) => value === current)) {
      select.value = current;
    }
  };

  /* ----------------------------------------------------------------
     CALCULATOR ENGINE
     ---------------------------------------------------------------- */
  function phaseFactor(type, pf, voltageType) {
    if (type === "ac3") return (voltageType === "vln" ? 3 : 1.732) * pf;
    if (type === "ac1") return pf;
    return 1;
  }

  function toolField(tool, prefix) {
    return $(`[id^="${prefix}"]`, tool);
  }

  function getDecimals(tool) {
    return Math.max(0, Math.min(8, number(toolField(tool, "lx-dec"), 4)));
  }

  function getMode(tool) {
    if (tool.dataset.mode) return tool.dataset.mode;
    const powerLabel = (
      toolField(tool, "lbl-power")?.textContent || ""
    ).toLowerCase();
    const unit = toolField(tool, "lx-power-unit")?.value || "";
    if (powerLabel.includes("current") || unit === "a" || unit === "ma")
      return "amps-to-watts";
    if (powerLabel.includes("power") || unit === "kw" || unit === "w")
      return "watts-to-amps";
    const modeText = (
      toolField(tool, "lx-mode-text")?.textContent || ""
    ).toLowerCase();
    const buttonText = (
      toolField(tool, "lx-mode-btn")?.textContent || ""
    ).toLowerCase();
    if (modeText.includes("amps to watts")) return "amps-to-watts";
    if (modeText.includes("watts to amps")) return "watts-to-amps";
    if (buttonText.includes("watts to amps")) return "amps-to-watts";
    return "watts-to-amps";
  }

  function setMode(tool, mode) {
    const isAmpsToWatts = mode === "amps-to-watts";
    const modeText = toolField(tool, "lx-mode-text");
    const modeBtn = toolField(tool, "lx-mode-btn");
    const powerLabel = toolField(tool, "lbl-power");
    const unit = toolField(tool, "lx-power-unit");
    const resOneInput = toolField(tool, "res-kw");
    const resTwoInput = toolField(tool, "res-watts");
    const resOneLabel = toolField(tool, "lbl-res1");
    const resTwoLabel = toolField(tool, "lbl-res2");
    const resOneUnit = toolField(tool, "lbl-unit1");
    const resTwoUnit = toolField(tool, "lbl-unit2");
    const resOneBox = toolField(tool, "res-amps-box");
    const resTwoBox = toolField(tool, "res-ma-box");
    const firstLabel = resOneLabel || resOneBox?.querySelector("label");
    const secondLabel = resTwoLabel || resTwoBox?.querySelector("label");
    const firstUnit = resOneUnit || resOneBox?.querySelector(".lx-unit-label");
    const secondUnit = resTwoUnit || resTwoBox?.querySelector(".lx-unit-label");
    if (modeText) {
      modeText.dataset.i18n = isAmpsToWatts ? "calc.mode.atw" : "calc.mode.wta";
      modeText.textContent = isAmpsToWatts ? "AMPS TO WATTS" : "WATTS TO AMPS";
    }
    if (modeBtn) {
      modeBtn.dataset.i18n = isAmpsToWatts
        ? "calc.switch.toWta"
        : "calc.switch.toAtw";
      modeBtn.textContent = isAmpsToWatts
        ? "Switch to Watts to Amps"
        : "Switch to Amps to Watts";
      modeBtn.setAttribute("aria-pressed", isAmpsToWatts ? "false" : "true");
    }
    if (powerLabel) {
      powerLabel.dataset.i18n = isAmpsToWatts ? "calc.current" : "calc.power";
      powerLabel.textContent = isAmpsToWatts ? "Current" : "Power";
    }
    if (firstLabel) {
      firstLabel.dataset.i18n = isAmpsToWatts ? "calc.kw" : "calc.amps";
      firstLabel.textContent = isAmpsToWatts ? "Power (kW)" : "Current (amps)";
    }
    if (secondLabel) {
      secondLabel.dataset.i18n = isAmpsToWatts
        ? "calc.watts"
        : "calc.milliamps";
      secondLabel.textContent = isAmpsToWatts
        ? "Power (W)"
        : "Current (milliamps)";
    }
    if (firstUnit) firstUnit.textContent = isAmpsToWatts ? "kW" : "A";
    if (secondUnit) secondUnit.textContent = isAmpsToWatts ? "W" : "mA";
    if (unit) {
      unit.setAttribute(
        "aria-label",
        isAmpsToWatts ? "Current unit" : "Power unit",
      );
      setSelectOptions(
        unit,
        isAmpsToWatts
          ? [
              ["a", "A"],
              ["ma", "mA"],
            ]
          : [
              ["kw", "kW"],
              ["w", "W"],
            ],
      );
      if (tool.dataset.defaultMode === mode && tool.dataset.defaultUnit) {
        unit.value = tool.dataset.defaultUnit;
      }
    }
    if (resOneInput) {
      resOneInput.setAttribute(
        "aria-label",
        isAmpsToWatts ? "Power in kilowatts" : "Current in amps",
      );
    }
    if (resTwoInput) {
      resTwoInput.setAttribute(
        "aria-label",
        isAmpsToWatts ? "Power in watts" : "Current in milliamps",
      );
    }
    tool.dataset.mode = mode;
    window.dispatchEvent(new CustomEvent("aw:calculator-mode-change"));
  }

  function setFieldHidden(field, hidden) {
    const wrapper = field?.closest(".lx-field");
    if (wrapper) wrapper.classList.toggle("is-hidden", hidden);
  }

  function setFieldLabel(field, text) {
    const label = field
      ?.closest(".lx-field")
      ?.querySelector("label:not(.sr-only)");
    if (label) text ? (label.textContent = text) : null;
  }

  function configureToolKind(tool) {
    const kind = tool.dataset.kind || "amps-to-watts";
    const type = toolField(tool, "lx-type");
    const volts = toolField(tool, "lx-volts");
    const pf = toolField(tool, "lx-pf-container");
    const unit = toolField(tool, "lx-power-unit");
    const modeBtn = toolField(tool, "lx-mode-btn");
    const powerLabel = toolField(tool, "lbl-power");
    const resOneLabel =
      toolField(tool, "lbl-res1") ||
      toolField(tool, "res-amps-box")?.querySelector("label");
    const resTwoLabel =
      toolField(tool, "lbl-res2") ||
      toolField(tool, "res-ma-box")?.querySelector("label");
    const resOneUnit =
      toolField(tool, "lbl-unit1") ||
      toolField(tool, "res-amps-box")?.querySelector(".lx-unit-label");
    const resTwoUnit =
      toolField(tool, "lbl-unit2") ||
      toolField(tool, "res-ma-box")?.querySelector(".lx-unit-label");
    const powerHelp = toolField(tool, "lx-power-help");
    const voltsHelp = toolField(tool, "lx-volts-help");
    const specialKind = [
      "kva-to-watts",
      "volt-amps",
      "amp-hours",
      "power-factor",
      "voltage-drop",
      "wire-gauge",
    ].includes(kind);

    setFieldHidden(type, specialKind);
    if (modeBtn) modeBtn.classList.toggle("is-hidden", specialKind);

    if (kind === "kva-to-watts") {
      if (powerLabel) powerLabel.textContent = "Apparent Power";
      setSelectOptions(unit, [
        ["kva", "kVA"],
        ["va", "VA"],
      ]);
      setFieldHidden(volts, true);
      if (pf) pf.classList.remove("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Power (kW)";
      if (resTwoLabel) resTwoLabel.textContent = "Power (W)";
      if (resOneUnit) resOneUnit.textContent = "kW";
      if (resTwoUnit) resTwoUnit.textContent = "W";
      if (powerHelp)
        powerHelp.textContent =
          "Enter apparent power from the generator, UPS, or transformer rating.";
    } else if (kind === "volt-amps") {
      if (powerLabel) powerLabel.textContent = "Current";
      setSelectOptions(unit, [
        ["a", "A"],
        ["ma", "mA"],
      ]);
      setFieldHidden(volts, false);
      setFieldLabel(volts, "Voltage (V)");
      if (pf) pf.classList.add("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Apparent Power (kVA)";
      if (resTwoLabel) resTwoLabel.textContent = "Apparent Power (VA)";
      if (resOneUnit) resOneUnit.textContent = "kVA";
      if (resTwoUnit) resTwoUnit.textContent = "VA";
    } else if (kind === "amp-hours") {
      if (powerLabel) powerLabel.textContent = "Capacity";
      setSelectOptions(unit, [["ah", "Ah"]]);
      setFieldHidden(volts, false);
      setFieldLabel(volts, "Voltage (V)");
      if (pf) pf.classList.add("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Energy (kWh)";
      if (resTwoLabel) resTwoLabel.textContent = "Energy (Wh)";
      if (resOneUnit) resOneUnit.textContent = "kWh";
      if (resTwoUnit) resTwoUnit.textContent = "Wh";
      if (powerHelp)
        powerHelp.textContent = "Enter battery capacity in amp-hours.";
    } else if (kind === "power-factor") {
      if (powerLabel) powerLabel.textContent = "Real Power";
      setSelectOptions(unit, [
        ["w", "W"],
        ["kw", "kW"],
      ]);
      setFieldHidden(volts, false);
      setFieldLabel(volts, "Apparent Power (VA)");
      if (pf) pf.classList.add("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Power Factor";
      if (resTwoLabel) resTwoLabel.textContent = "Real Power Share";
      if (resOneUnit) resOneUnit.textContent = "PF";
      if (resTwoUnit) resTwoUnit.textContent = "%";
      if (voltsHelp)
        voltsHelp.textContent = "Enter apparent power in volt-amps (VA).";
    } else if (kind === "voltage-drop") {
      if (powerLabel) powerLabel.textContent = "Current";
      setSelectOptions(unit, [["a", "A"]]);
      setFieldHidden(volts, false);
      setFieldLabel(volts, "One-way Distance (ft)");
      if (pf) pf.classList.add("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Estimated Drop (V)";
      if (resTwoLabel) resTwoLabel.textContent = "Approx. Drop at 120V";
      if (resOneUnit) resOneUnit.textContent = "V";
      if (resTwoUnit) resTwoUnit.textContent = "%";
      if (voltsHelp)
        voltsHelp.textContent =
          "Planning estimate uses a 12 AWG copper reference. Verify final sizing by code.";
    } else if (kind === "wire-gauge") {
      if (powerLabel) powerLabel.textContent = "Current";
      setSelectOptions(unit, [["a", "A"]]);
      setFieldHidden(volts, false);
      setFieldLabel(volts, "One-way Distance (ft)");
      if (pf) pf.classList.add("is-hidden");
      if (resOneLabel) resOneLabel.textContent = "Planning Gauge";
      if (resTwoLabel) resTwoLabel.textContent = "Voltage Drop Check";
      if (resOneUnit) resOneUnit.textContent = "AWG";
      if (resTwoUnit) resTwoUnit.textContent = "ref";
      if (voltsHelp)
        voltsHelp.textContent =
          "Use this as a planning reference only; final wire size depends on code and installation conditions.";
    }
  }

  function updateVisibility(tool) {
    const type = toolField(tool, "lx-type")?.value || "dc";
    const vtype = toolField(tool, "lx-vtype-container");
    const pf = toolField(tool, "lx-pf-container");
    if (vtype) vtype.classList.toggle("is-hidden", type !== "ac3");
    if (pf) pf.classList.toggle("is-hidden", type === "dc");
    /* Update home-calc-tab buttons */
    $$(".home-calc-tab", tool).forEach((tab) => {
      const active = tab.dataset.homePhase === type;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    /* Update new calc-mode-btn buttons */
    $$(".calc-mode-btn", tool).forEach((btn) => {
      const active = btn.dataset.calcPhase === type;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    /* Update formula display */
    updateFormulaDisplay(tool, type);
  }

  function updateFormulaDisplay(tool, type) {
    const formulaEl = tool.querySelector("#calc-formula-display");
    const helperEl = tool.querySelector("#calc-result-helper");
    const voltageType = toolField(tool, "lx-vtype")?.value || "vll";
    const mode = tool.dataset.mode || "amps-to-watts";
    const isAtW = mode === "amps-to-watts";
    if (formulaEl) {
      if (type === "dc") {
        formulaEl.textContent = isAtW ? "W = A × V" : "A = W ÷ V";
      } else if (type === "ac1") {
        formulaEl.textContent = isAtW ? "W = A × V × PF" : "A = W ÷ (V × PF)";
      } else if (type === "ac3") {
        if (voltageType === "vln") {
          formulaEl.textContent = isAtW
            ? "W = 3 × A × V × PF"
            : "A = W ÷ (3 × V × PF)";
        } else {
          formulaEl.textContent = isAtW
            ? "W = √3 × A × V × PF"
            : "A = W ÷ (√3 × V × PF)";
        }
      }
    }
    if (helperEl) {
      const amps = number(toolField(tool, "lx-power"), 0);
      const volts = number(toolField(tool, "lx-volts"), 0);
      if (amps > 0 && volts > 0) {
        helperEl.textContent = "Result calculated with current values.";
      } else {
        helperEl.textContent = "Enter values to calculate power.";
      }
    }
  }

  function validateInput(field, min = 0, max = Infinity) {
    if (!field) return;
    const val = Number(field.value);
    const invalid =
      field.value !== "" && (!Number.isFinite(val) || val < min || val > max);
    if (invalid) {
      field.classList.add("has-error");
      const error = document.getElementById(`${field.id}-error`);
      if (error)
        error.textContent =
          max < Infinity
            ? `Enter a value from ${min} to ${max}.`
            : `Enter a value of ${min} or greater.`;
    } else {
      field.classList.remove("has-error");
      const error = document.getElementById(`${field.id}-error`);
      if (error) error.textContent = "";
    }
  }

  function updateCalculator(tool) {
    configureToolKind(tool);
    updateVisibility(tool);
    configureToolKind(tool);
    const decimals = getDecimals(tool);
    const mode = tool.dataset.mode || getMode(tool);
    const kind = tool.dataset.kind || "amps-to-watts";
    const type = toolField(tool, "lx-type")?.value || "dc";
    const powerField = toolField(tool, "lx-power");
    const voltsField = toolField(tool, "lx-volts");
    const unitField = toolField(tool, "lx-power-unit");
    const pfSlider = toolField(tool, "lx-pf-slider");
    const pfInput = toolField(tool, "lx-pf-input");
    const voltageType = toolField(tool, "lx-vtype")?.value || "vll";
    const rawPf = number(pfInput || pfSlider, 1);
    const pf =
      type === "dc" && !["kva-to-watts"].includes(kind)
        ? 1
        : Math.max(0.01, Math.min(1, rawPf));
    const volts = Math.max(0.000001, number(voltsField, 0));
    const raw = number(powerField, 0);
    const unit = unitField?.value || (mode === "amps-to-watts" ? "a" : "kw");
    const safeRaw = Math.max(0, raw);
    const input =
      unit === "kw"
        ? safeRaw * 1000
        : unit === "ma"
          ? safeRaw / 1000
          : unit === "va"
            ? safeRaw
            : safeRaw;
    const divisor = volts * phaseFactor(type, pf, voltageType);

    /* Validate inputs */
    validateInput(powerField);
    validateInput(voltsField);
    validateInput(pfInput, 0.01, 1);

    let amps = 0;
    let watts = 0;
    let firstResult = "";
    let secondResult = "";
    let mirrorText = "";

    if (kind === "kva-to-watts") {
      watts = (unit === "va" ? input : safeRaw * 1000) * pf;
      firstResult = format(watts / 1000, decimals);
      secondResult = format(watts, decimals);
      mirrorText = `${format(watts, decimals)} W`;
    } else if (kind === "volt-amps") {
      amps = input;
      const va = amps * volts;
      firstResult = format(va / 1000, decimals);
      secondResult = format(va, decimals);
      mirrorText = `${format(va, decimals)} VA`;
    } else if (kind === "amp-hours") {
      const wh = safeRaw * volts;
      firstResult = format(wh / 1000, decimals);
      secondResult = format(wh, decimals);
      mirrorText = `${format(wh, decimals)} Wh`;
    } else if (kind === "power-factor") {
      watts = input;
      const apparent = volts;
      const calculatedPf = apparent > 0 ? Math.min(1, watts / apparent) : 0;
      firstResult = format(calculatedPf, decimals);
      secondResult = format(calculatedPf * 100, decimals);
      mirrorText = `${format(calculatedPf, decimals)} PF`;
    } else if (kind === "voltage-drop") {
      amps = input;
      const distance = volts;
      const drop = (2 * distance * amps * 1.588) / 1000;
      firstResult = format(drop, decimals);
      secondResult = format((drop / 120) * 100, decimals);
      mirrorText = `${format(drop, decimals)} V drop`;
    } else if (kind === "wire-gauge") {
      amps = input;
      firstResult =
        amps <= 15
          ? "14"
          : amps <= 20
            ? "12"
            : amps <= 30
              ? "10"
              : amps <= 40
                ? "8"
                : amps <= 55
                  ? "6"
                  : amps <= 70
                    ? "4"
                    : "Eng";
      secondResult = "Verify";
      mirrorText =
        firstResult === "Eng" ? "Engineer review" : `${firstResult} AWG`;
    } else if (mode === "amps-to-watts") {
      amps = input;
      watts = amps * divisor;
      firstResult = format(watts / 1000, decimals);
      secondResult = format(watts, decimals);
      mirrorText = `${format(watts, decimals)} W`;
    } else {
      watts = input;
      amps = watts / Math.max(0.000001, divisor);
      firstResult = format(amps, decimals);
      secondResult = format(amps * 1000, decimals);
      mirrorText = `${format(amps, decimals)} A`;
    }

    const resAmps = toolField(tool, "res-amps");
    const resMa = toolField(tool, "res-ma");
    const resKw = toolField(tool, "res-kw");
    const resWatts = toolField(tool, "res-watts");
    const mirror = toolField(tool, "lx-mirror-val");

    if (resAmps) resAmps.value = firstResult;
    if (resMa) resMa.value = secondResult;
    if (resKw) resKw.value = firstResult;
    if (resWatts) resWatts.value = secondResult;
    if (mirror) {
      mirror.textContent = mirrorText;
    }

    /* Store last result for copy/export */
    tool.dataset.lastResult =
      mode === "amps-to-watts"
        ? `${format(watts, decimals)} W (${format(watts / 1000, decimals)} kW)`
        : `${format(amps, decimals)} A (${format(amps * 1000, decimals)} mA)`;
    tool.dataset.lastInput = `${raw} ${unit.toUpperCase()} @ ${format(volts, 1)}V, PF=${format(pf, 2)}, ${type.toUpperCase()}`;
  }

  const AWG_TABLE = [
    {
      awg: "14",
      value: 14,
      copperOhms: 2.525,
      aluminumOhms: 4.17,
      ampacity: 15,
    },
    {
      awg: "12",
      value: 12,
      copperOhms: 1.588,
      aluminumOhms: 2.62,
      ampacity: 20,
    },
    {
      awg: "10",
      value: 10,
      copperOhms: 0.999,
      aluminumOhms: 1.64,
      ampacity: 30,
    },
    {
      awg: "8",
      value: 8,
      copperOhms: 0.6282,
      aluminumOhms: 1.03,
      ampacity: 40,
    },
    {
      awg: "6",
      value: 6,
      copperOhms: 0.3951,
      aluminumOhms: 0.65,
      ampacity: 55,
    },
    {
      awg: "4",
      value: 4,
      copperOhms: 0.2485,
      aluminumOhms: 0.41,
      ampacity: 70,
    },
    {
      awg: "2",
      value: 2,
      copperOhms: 0.1563,
      aluminumOhms: 0.26,
      ampacity: 95,
    },
    {
      awg: "1",
      value: 1,
      copperOhms: 0.1239,
      aluminumOhms: 0.2,
      ampacity: 110,
    },
    {
      awg: "1/0",
      value: 0,
      copperOhms: 0.0983,
      aluminumOhms: 0.16,
      ampacity: 125,
    },
    {
      awg: "2/0",
      value: -1,
      copperOhms: 0.0779,
      aluminumOhms: 0.13,
      ampacity: 145,
    },
    {
      awg: "3/0",
      value: -2,
      copperOhms: 0.0618,
      aluminumOhms: 0.1,
      ampacity: 165,
    },
    {
      awg: "4/0",
      value: -3,
      copperOhms: 0.049,
      aluminumOhms: 0.08,
      ampacity: 195,
    },
  ];

  function configInput(tool, id) {
    return tool.querySelector(`#input-${id}`);
  }

  function configValue(tool, id, fallback = 0) {
    const field = configInput(tool, id);
    if (!field) return fallback;
    if (field.tagName === "SELECT") return field.value || fallback;
    return number(field, fallback);
  }

  function validateConfigInputs(tool) {
    let valid = true;
    tool.querySelectorAll('[id^="input-"]').forEach((field) => {
      const error = tool.querySelector(
        `#error-${field.id.replace(/^input-/, "")}`,
      );
      if (field.tagName === "SELECT") {
        field.classList.remove("has-error");
        if (error) error.textContent = "";
        return;
      }

      const value = Number(field.value);
      const min = field.min === "" ? -Infinity : Number(field.min);
      const max = field.max === "" ? Infinity : Number(field.max);
      const required =
        field.closest(".calc-field")?.querySelector(".calc-label") &&
        field.hasAttribute("value");
      const invalid =
        (required && field.value === "") ||
        (field.value !== "" &&
          (!Number.isFinite(value) || value < min || value > max));

      field.classList.toggle("has-error", invalid);
      if (error) {
        if (invalid && Number.isFinite(min) && Number.isFinite(max)) {
          error.textContent = `Enter a value from ${min} to ${max}.`;
        } else if (invalid && Number.isFinite(min)) {
          error.textContent = `Enter a value of ${min} or greater.`;
        } else {
          error.textContent = "";
        }
      }
      valid = valid && !invalid;
    });
    return valid;
  }

  function setConfigOutput(tool, id, value, decimals = 2) {
    const output = tool.querySelector(`#output-${id}`);
    if (!output) return;
    output.textContent =
      typeof value === "string" ? value : format(value, decimals);
  }

  function getConfigPhase(tool) {
    return toolField(tool, "lx-type")?.value || tool.dataset.calcMode || "ac1";
  }

  function getConfigVoltageType(tool) {
    return String(configValue(tool, "voltageType", "vll"));
  }

  function configPhaseFactor(tool, phase, pf) {
    if (phase === "ac3")
      return (
        (getConfigVoltageType(tool) === "vln" ? 3 : 1.7320508075688772) * pf
      );
    if (phase === "ac1") return pf;
    return 1;
  }

  function getConfigFormula(tool, phase) {
    const formulaEl = tool.querySelector("#calc-formula-display");
    if (!formulaEl) return "";
    let formulas = {};
    try {
      formulas = JSON.parse(formulaEl.dataset.formulas || "{}");
    } catch {
      formulas = {};
    }
    const voltageType = getConfigVoltageType(tool);
    const key = phase === "ac3" ? `${phase}-${voltageType}` : phase;
    return formulas[key] || formulaEl.textContent.trim();
  }

  function setConfigFormula(tool, phase) {
    const formulaEl = tool.querySelector("#calc-formula-display");
    if (!formulaEl) return;
    formulaEl.textContent = getConfigFormula(tool, phase);
  }

  function resistanceForGauge(material, wireSize) {
    const selected =
      AWG_TABLE.find((row) => String(row.value) === String(wireSize)) ||
      AWG_TABLE[1];
    return material === "aluminum"
      ? selected.aluminumOhms
      : selected.copperOhms;
  }

  function voltageDropValue(current, length, phase, material, wireSize) {
    const multiplier = phase === "ac3" ? 1.7320508075688772 : 2;
    return (
      (multiplier * length * current * resistanceForGauge(material, wireSize)) /
      1000
    );
  }

  function updateConfigCalculator(tool) {
    validateConfigInputs(tool);
    const type = tool.dataset.calcType;
    const phase = getConfigPhase(tool);
    const current = Math.max(0, configValue(tool, "current", 0));
    const fixedVoltage = number({ value: tool.dataset.fixedVoltage }, 0);
    const voltage = Math.max(
      0.000001,
      fixedVoltage || configValue(tool, "voltage", 0),
    );
    const rawPf = tool.dataset.fixedPowerFactor
      ? Number(tool.dataset.fixedPowerFactor)
      : configValue(tool, "powerFactor", 1);
    const pf =
      phase === "dc" && type !== "kva-to-watts"
        ? 1
        : Math.max(0.01, Math.min(1, Number(rawPf) || 1));
    const factor = configPhaseFactor(tool, phase, pf);
    const hours = Math.max(0, configValue(tool, "hours", 0));
    const cost = Math.max(0, configValue(tool, "cost", 0));
    const efficiency =
      Math.max(0, Math.min(100, configValue(tool, "efficiency", 100))) / 100;
    const decimals = 2;
    let watts = 0;
    let amps = 0;
    let primaryCopy = "";
    let interpretation = "";

    tool.querySelectorAll(".calc-mode-btn").forEach((btn) => {
      const active = btn.dataset.calcPhase === phase;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    const voltageTypeContainer = tool.querySelector("#container-voltageType");
    if (voltageTypeContainer && toolField(tool, "lx-type")) {
      voltageTypeContainer.classList.toggle("is-hidden", phase !== "ac3");
    }

    setConfigFormula(tool, phase);

    if (type === "watts-to-amps" || type === "fixed-voltage-watts-to-amps") {
      watts = Math.max(0, configValue(tool, "power", 0));
      amps = watts / Math.max(0.000001, voltage * factor);
      setConfigOutput(tool, "amps", amps, 4);
      setConfigOutput(tool, "milliamps", amps * 1000, 2);
      primaryCopy = `${format(amps, 4)} A`;
      interpretation = `At ${format(voltage, 2)}V, ${format(watts, 2)}W draws ${format(amps, 4)} amps.`;
    } else if (type === "kw-to-amps") {
      watts = Math.max(0, configValue(tool, "kilowatts", 0)) * 1000;
      amps = watts / Math.max(0.000001, voltage * factor);
      setConfigOutput(tool, "amps", amps, 4);
      primaryCopy = `${format(amps, 4)} A`;
      interpretation = `${format(watts / 1000, 4)} kW equals ${format(amps, 4)} amps with the selected system type.`;
    } else if (type === "mw-to-amps") {
      watts = Math.max(0, configValue(tool, "megawatts", 0)) * 1000000;
      amps = watts / Math.max(0.000001, voltage * factor);
      setConfigOutput(tool, "amps", amps, 2);
      primaryCopy = `${format(amps, 2)} A`;
      interpretation = `${format(watts, 0)} watts converts to ${format(amps, 2)} amps.`;
    } else if (type === "amps-to-kw") {
      watts = current * voltage * factor;
      setConfigOutput(tool, "kilowatts", watts / 1000, 4);
      setConfigOutput(tool, "watts", watts, 2);
      primaryCopy = `${format(watts / 1000, 4)} kW`;
      interpretation = `${format(current, 2)}A produces ${format(watts / 1000, 4)} kW at the selected settings.`;
    } else if (type === "amps-to-va") {
      const va = current * voltage;
      setConfigOutput(tool, "va", va, 2);
      setConfigOutput(tool, "kva", va / 1000, 4);
      primaryCopy = `${format(va, 2)} VA`;
      interpretation = `${format(current, 2)}A at ${format(voltage, 2)}V is ${format(va, 2)} VA apparent power.`;
    } else if (type === "kva-to-watts") {
      watts = Math.max(0, configValue(tool, "kva", 0)) * 1000 * pf;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "kilowatts", watts / 1000, 4);
      primaryCopy = `${format(watts, 2)} W`;
      interpretation = `With PF ${format(pf, 2)}, the real power is ${format(watts, 2)} watts.`;
    } else if (type === "power-factor") {
      watts = Math.max(0, configValue(tool, "power", 0));
      const apparentPower = Math.max(0, configValue(tool, "apparentPower", 0));
      const calculatedPf =
        apparentPower > 0 ? Math.min(1, watts / apparentPower) : 0;
      setConfigOutput(tool, "powerFactor", calculatedPf, 4);
      setConfigOutput(tool, "percent", calculatedPf * 100, 2);
      primaryCopy = `${format(calculatedPf, 4)} PF`;
      interpretation = `${format(calculatedPf * 100, 2)}% of apparent power is real power.`;
    } else if (type === "ah-to-wh") {
      const wh = Math.max(0, configValue(tool, "ampHours", 0)) * voltage;
      setConfigOutput(tool, "wh", wh, 2);
      setConfigOutput(tool, "kwh", wh / 1000, 4);
      primaryCopy = `${format(wh, 2)} Wh`;
      interpretation = `This battery stores about ${format(wh, 2)} watt-hours.`;
    } else if (type === "amp-power-consumption") {
      watts = current * voltage * pf;
      const kwh = (watts * hours) / 1000;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "kwh", kwh, 4);
      setConfigOutput(tool, "totalCost", kwh * cost, 2);
      primaryCopy = `${format(kwh, 4)} kWh`;
      interpretation = `${format(hours, 2)} hours of use consumes about ${format(kwh, 4)} kWh.`;
    } else if (type === "ev-amps-to-watts") {
      watts = current * voltage;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "kwh", hours > 0 ? (watts * hours) / 1000 : 0, 4);
      primaryCopy = `${format(watts, 2)} W`;
      interpretation =
        hours > 0
          ? `Charging for ${format(hours, 2)} hours uses about ${format((watts * hours) / 1000, 4)} kWh.`
          : `The charger delivers ${format(watts, 2)} watts.`;
    } else if (type === "motor-amps-to-watts") {
      watts = current * voltage * factor;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "outWatts", watts * efficiency, 2);
      primaryCopy = `${format(watts, 2)} W input`;
      interpretation = `Estimated output is ${format(watts * efficiency, 2)} watts at ${format(efficiency * 100, 0)}% efficiency.`;
    } else if (type === "appliance-hours-to-watts") {
      watts = current * voltage * pf;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "kwh", hours > 0 ? (watts * hours) / 1000 : 0, 4);
      primaryCopy = `${format(watts, 2)} W`;
      interpretation =
        hours > 0
          ? `Daily energy is about ${format((watts * hours) / 1000, 4)} kWh.`
          : `Running power is about ${format(watts, 2)} watts.`;
    } else if (type === "voltage-drop") {
      const length = Math.max(0, configValue(tool, "wireLength", 0));
      const material = String(configValue(tool, "wireMaterial", "copper"));
      const wireSize = configValue(tool, "wireSize", 12);
      const vdrop = voltageDropValue(
        current,
        length,
        phase,
        material,
        wireSize,
      );
      setConfigOutput(tool, "vdrop", vdrop, 3);
      setConfigOutput(
        tool,
        "vdropPercent",
        voltage > 0 ? (vdrop / voltage) * 100 : 0,
        2,
      );
      setConfigOutput(tool, "endVoltage", voltage - vdrop, 2);
      primaryCopy = `${format(vdrop, 3)} V drop`;
      interpretation = `Estimated end voltage is ${format(voltage - vdrop, 2)}V.`;
    } else if (type === "wire-gauge") {
      const length = Math.max(0, configValue(tool, "wireLength", 0));
      const material = String(configValue(tool, "wireMaterial", "copper"));
      const allowed = Math.max(0.1, configValue(tool, "allowableDrop", 3));
      const selected =
        AWG_TABLE.find((row) => {
          const vdrop = voltageDropValue(
            current,
            length,
            phase,
            material,
            row.value,
          );
          return (
            row.ampacity >= current &&
            voltage > 0 &&
            (vdrop / voltage) * 100 <= allowed
          );
        }) || AWG_TABLE[AWG_TABLE.length - 1];
      const vdrop = voltageDropValue(
        current,
        length,
        phase,
        material,
        selected.value,
      );
      setConfigOutput(tool, "awg", selected.awg, 0);
      setConfigOutput(tool, "vdrop", vdrop, 3);
      primaryCopy = `${selected.awg} AWG`;
      interpretation = `Estimated drop is ${format(vdrop, 3)}V with ${selected.awg} AWG.`;
    } else {
      watts = current * voltage * factor;
      setConfigOutput(tool, "watts", watts, 2);
      setConfigOutput(tool, "kilowatts", watts / 1000, 4);
      primaryCopy = `${format(watts, 2)} W`;
      interpretation = `At ${format(voltage, 2)}V and ${format(current, 2)}A, the load uses ${format(watts, 2)} watts.`;
    }

    const helper = tool.querySelector("#calc-result-helper");
    if (helper)
      helper.textContent =
        interpretation ||
        tool.dataset.resultInterpretation ||
        helper.textContent;
    tool.dataset.lastResult = primaryCopy;
    tool.dataset.lastInput = `Type: ${type}; phase=${phase}; voltage=${format(voltage, 2)}V; PF=${format(pf, 2)}`;
  }

  function resetConfigCalculator(tool) {
    tool.querySelectorAll('[id^="input-"]').forEach((field) => {
      if (field.tagName === "SELECT") {
        const selected = field.querySelector("option[selected]");
        field.value = selected ? selected.value : field.options[0]?.value;
      } else {
        field.value = field.getAttribute("value") || "";
      }
    });
    const type = toolField(tool, "lx-type");
    if (type) type.value = tool.dataset.calcMode || "ac1";
    updateConfigCalculator(tool);
  }

  function initConfigCalculator(tool) {
    tool.querySelectorAll(".calc-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = toolField(tool, "lx-type");
        if (type && btn.dataset.calcPhase) type.value = btn.dataset.calcPhase;
        updateConfigCalculator(tool);
      });
    });
    tool.querySelectorAll("input, select").forEach((control) => {
      control.addEventListener("input", () => updateConfigCalculator(tool));
      control.addEventListener("change", () => updateConfigCalculator(tool));
    });
    tool.querySelectorAll('[class*="reset"]').forEach((button) => {
      button.addEventListener("click", () => resetConfigCalculator(tool));
    });
    tool.querySelectorAll(".lx-action-copy").forEach((button) => {
      button.addEventListener("click", () => copyResult(tool));
    });
    updateConfigCalculator(tool);
  }

  /* ----------------------------------------------------------------
     COPY & EXPORT
     ---------------------------------------------------------------- */
  function showToast(message) {
    let toast = $(".aw-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "aw-toast";
      const icon = document.createElement("span");
      icon.className = "aw-toast-icon";
      icon.textContent = "OK";
      const text = document.createElement("span");
      text.className = "aw-toast-text";
      toast.append(icon, text);
      document.body.appendChild(toast);
    }
    toast.querySelector(".aw-toast-text").textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function copyResult(tool) {
    const result = tool.dataset.lastResult || "No result";
    const input = tool.dataset.lastInput || "";
    const text = `${result}\nInput: ${input}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast("Result copied to clipboard"));
    } else {
      /* Fallback for older browsers */
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.cssText = "position:fixed;left:-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      showToast("Result copied to clipboard");
    }
  }

  function exportResult(tool) {
    const result = tool.dataset.lastResult || "No result";
    const input = tool.dataset.lastInput || "";
    const heading =
      document.querySelector("h1")?.textContent || "Amps To Watts Calculator";
    const text = [
      heading,
      "=".repeat(heading.length),
      "",
      `Result: ${result}`,
      `Input:  ${input}`,
      "",
      `Generated: ${new Date().toLocaleString()}`,
      `Source:  ${window.location.href}`,
      "",
      "Disclaimer: This result is for educational planning only.",
      "Verify safety-critical work with a licensed professional.",
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calculation-result.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Result exported");
  }

  function injectCopyExportButtons(tool) {
    const actions = tool.querySelector(".lx-actions");
    if (!actions || actions.querySelector(".lx-action-copy")) return;

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "lx-action-copy";
    copyBtn.textContent = "Copy";
    copyBtn.title = "Copy result to clipboard";
    copyBtn.addEventListener("click", () => copyResult(tool));

    const exportBtn = document.createElement("button");
    exportBtn.type = "button";
    exportBtn.className = "lx-action-export";
    exportBtn.textContent = "Export";
    exportBtn.title = "Download result as text file";
    exportBtn.addEventListener("click", () => exportResult(tool));

    actions.appendChild(copyBtn);
    actions.appendChild(exportBtn);
  }

  /* ----------------------------------------------------------------
     CALCULATION HISTORY
     ---------------------------------------------------------------- */
  const MAX_HISTORY = 5;

  function addToHistory(tool) {
    const result = tool.dataset.lastResult;
    const input = tool.dataset.lastInput;
    if (!result || result === "No result") return;

    const historyPanel = document.getElementById("calc-history");
    const historyList = document.getElementById("calc-history-list");
    if (!historyPanel || !historyList) return;

    historyPanel.classList.remove("is-hidden");

    const item = document.createElement("div");
    item.className = "calc-history-item";
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const resultEl = document.createElement("span");
    resultEl.className = "hist-result";
    resultEl.textContent = result.split(" (")[0];
    const inputEl = document.createElement("span");
    inputEl.className = "hist-input";
    inputEl.textContent = input;
    const timeEl = document.createElement("span");
    timeEl.className = "hist-time";
    timeEl.textContent = timeStr;
    item.append(resultEl, inputEl, timeEl);

    historyList.insertBefore(item, historyList.firstChild);

    // Keep max items
    while (historyList.children.length > MAX_HISTORY) {
      historyList.removeChild(historyList.lastChild);
    }
  }

  /* ----------------------------------------------------------------
     DEVICE PRESETS
     ---------------------------------------------------------------- */
  function initDevicePresets() {
    // Legacy presets
    $$("[data-watts]").forEach((card) => {
      card.addEventListener("click", () => {
        const tool = $(".lx-tool");
        const field = tool && toolField(tool, "lx-power");
        const unit = tool && toolField(tool, "lx-power-unit");
        if (!tool || !field) return;
        setMode(tool, "watts-to-amps");
        field.value = card.dataset.watts || "0";
        if (unit) unit.value = "w";
        updateCalculator(tool);
        tool.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    // New preset buttons
    $$("[data-preset-watts]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tool = btn.closest(".lx-tool") || $(".lx-tool");
        if (!tool) return;
        const powerField = toolField(tool, "lx-power");
        const voltsField = toolField(tool, "lx-volts");
        const unitField = toolField(tool, "lx-power-unit");

        setMode(tool, "watts-to-amps");
        if (powerField) powerField.value = btn.dataset.presetWatts;
        if (voltsField && btn.dataset.presetVolts)
          voltsField.value = btn.dataset.presetVolts;
        if (unitField) unitField.value = "w";
        updateCalculator(tool);
        addToHistory(tool);

        // Visual feedback
        btn.style.borderColor = "rgba(22, 217, 244, 0.5)";
        btn.style.background = "rgba(22, 217, 244, 0.08)";
        setTimeout(() => {
          btn.style.borderColor = "";
          btn.style.background = "";
        }, 600);
      });
    });
  }

  /* ----------------------------------------------------------------
     CALCULATOR INIT
     ---------------------------------------------------------------- */
  let calcDebounce = null;
  function initCalculators() {
    $$(".lx-tool").forEach((tool) => {
      if (tool.dataset.ready === "true") return;
      tool.dataset.ready = "true";
      if (
        tool.dataset.calcType ||
        tool.dataset.calculatorConfig ||
        tool.dataset.toolId
      ) {
        initConfigCalculator(tool);
        return;
      }
      setMode(tool, getMode(tool));
      /* Home-calc-tab buttons (legacy + new dual-class) */
      $$(".home-calc-tab", tool).forEach((tab) => {
        tab.addEventListener("click", () => {
          const type = toolField(tool, "lx-type");
          if (type && tab.dataset.homePhase) {
            type.value = tab.dataset.homePhase;
            updateCalculator(tool);
          }
        });
        tab.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            return;
          const tabs = $$(".home-calc-tab", tool);
          const current = tabs.indexOf(tab);
          let next = current;
          if (event.key === "ArrowLeft")
            next = current <= 0 ? tabs.length - 1 : current - 1;
          if (event.key === "ArrowRight")
            next = current >= tabs.length - 1 ? 0 : current + 1;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          event.preventDefault();
          tabs[next]?.focus();
          tabs[next]?.click();
        });
      });
      /* New premium calc-mode-btn tabs (inner pages) */
      $$(".calc-mode-btn:not(.home-calc-tab)", tool).forEach((btn) => {
        btn.addEventListener("click", () => {
          const type = toolField(tool, "lx-type");
          if (type && btn.dataset.calcPhase) {
            type.value = btn.dataset.calcPhase;
            updateCalculator(tool);
          }
        });
        btn.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            return;
          const tabs = $$(".calc-mode-btn:not(.home-calc-tab)", tool);
          const current = tabs.indexOf(btn);
          let next = current;
          if (event.key === "ArrowLeft")
            next = current <= 0 ? tabs.length - 1 : current - 1;
          if (event.key === "ArrowRight")
            next = current >= tabs.length - 1 ? 0 : current + 1;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          event.preventDefault();
          tabs[next]?.focus();
          tabs[next]?.click();
        });
      });
      $$("input, select, button", tool).forEach((control) => {
        control.addEventListener("input", () => {
          updateCalculator(tool);
          clearTimeout(calcDebounce);
          calcDebounce = setTimeout(() => addToHistory(tool), 1500);
        });
        control.addEventListener("change", () => {
          updateCalculator(tool);
          clearTimeout(calcDebounce);
          calcDebounce = setTimeout(() => addToHistory(tool), 1500);
        });
      });
      $$('[id^="lx-pf-slider"]', tool).forEach((slider) => {
        slider.addEventListener("input", () => {
          const pfInput = toolField(tool, "lx-pf-input");
          if (pfInput) pfInput.value = slider.value;
        });
      });
      $$('[id^="lx-pf-input"]', tool).forEach((input) => {
        input.addEventListener("input", () => {
          const slider = toolField(tool, "lx-pf-slider");
          if (slider) slider.value = input.value;
        });
      });
      $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((button) => {
        button.addEventListener("click", () => {
          $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((btn) =>
            btn.classList.remove("active"),
          );
          button.classList.add("active");
          const hidden = toolField(tool, "lx-vtype");
          if (hidden) hidden.value = button.id.includes("vln") ? "vln" : "vll";
          updateCalculator(tool);
        });
      });
      const modeBtn = toolField(tool, "lx-mode-btn");
      if (modeBtn) {
        modeBtn.addEventListener("click", () => {
          const next =
            (tool.dataset.mode || getMode(tool)) === "amps-to-watts"
              ? "watts-to-amps"
              : "amps-to-watts";
          setMode(tool, next);
          updateCalculator(tool);
        });
      }
      $$('[class*="reset"]', tool).forEach((button) => {
        button.addEventListener("click", () => {
          const power = toolField(tool, "lx-power");
          const volts = toolField(tool, "lx-volts");
          const type = toolField(tool, "lx-type");
          const pf = toolField(tool, "lx-pf-input");
          const slider = toolField(tool, "lx-pf-slider");
          const voltageType = toolField(tool, "lx-vtype");
          const defaultMode = tool.dataset.defaultMode || "amps-to-watts";
          const defaultVoltage = tool.dataset.defaultVoltage || "120";
          const defaultPhase = tool.dataset.defaultPhase || "ac1";
          const defaultInput = tool.dataset.defaultInput || "10";
          const defaultUnit = tool.dataset.defaultUnit;
          setMode(tool, defaultMode);
          if (power) power.value = defaultInput;
          if (volts) volts.value = defaultVoltage;
          if (type) type.value = defaultPhase;
          const unit = toolField(tool, "lx-power-unit");
          if (unit && defaultUnit) unit.value = defaultUnit;
          if (pf) pf.value = "1";
          if (slider) slider.value = "1";
          if (voltageType) voltageType.value = "vll";
          $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((btn) => {
            btn.classList.toggle("active", btn.id.includes("vll"));
          });
          /* Clear validation */
          $$(".has-error", tool).forEach((el) =>
            el.classList.remove("has-error"),
          );
          updateCalculator(tool);
        });
      });

      /* Inject copy/export buttons */
      injectCopyExportButtons(tool);

      updateCalculator(tool);
    });
  }

  /* ----------------------------------------------------------------
     NAVIGATION
     ---------------------------------------------------------------- */
  function initNavigation() {
    const toggle = $(".nav-toggle");
    const nav = $(".site-nav");
    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav?.classList.toggle("is-open", !open);
    });

    /* Close nav on outside click */
    document.addEventListener("click", (e) => {
      if (
        nav?.classList.contains("is-open") &&
        !e.target.closest(".site-header")
      ) {
        toggle?.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    /* Close details on outside click */
    document.addEventListener("click", (e) => {
      $$(".site-nav details[open]").forEach((d) => {
        if (!d.contains(e.target)) d.removeAttribute("open");
      });
    });
  }

  /* ----------------------------------------------------------------
     BACK TO TOP
     ---------------------------------------------------------------- */
  function initBackToTop() {
    const btn = $(".back-to-top");
    if (!btn) return;

    function toggleVisibility() {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggleVisibility();
  }

  /* ----------------------------------------------------------------
     SCROLL PROGRESS BAR
     ---------------------------------------------------------------- */
  function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------------
     CALCULATOR SEARCH
     ---------------------------------------------------------------- */
  function initCalculatorSearch() {
    const input = $("#calc-search");
    if (!input) return;

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      const cards = $$("[data-search-card]");
      const groups = $$("[data-group]");

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = !query || text.includes(query) ? "" : "none";
      });

      /* Hide empty groups */
      groups.forEach((group) => {
        const visibleCards = $$("[data-search-card]", group).filter(
          (c) => c.style.display !== "none",
        );
        group.style.display = visibleCards.length > 0 ? "" : "none";
      });
    });
  }

  /* ----------------------------------------------------------------
     KEYBOARD SHORTCUTS
     ---------------------------------------------------------------- */
  function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      /* Escape to reset calculator */
      if (e.key === "Escape") {
        const tool = $(".lx-tool");
        if (tool) {
          const resetBtn = tool.querySelector('[class*="reset"]');
          if (resetBtn) resetBtn.click();
        }
      }
    });
  }

  /* ----------------------------------------------------------------
     INIT
     ---------------------------------------------------------------- */
  function init() {
    initNavigation();
    initBackToTop();
    initScrollProgress();
    // Keep the site fast: no scroll reveal or animated counter work.

    // Only init calculator logic if present
    if (document.querySelector(".lx-tool")) {
      initCalculators();
      initDevicePresets();
      initCalculatorSearch();
      initKeyboardShortcuts();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ==========================================================
   AMPSTOWATT.COM PREMIUM UI THEME SCRIPT
   Interface only: mobile nav, page visuals, animations, FAQ UX.
   ========================================================== */
(function () {
  const html = document.documentElement;

  function initMobileNavigation() {
    const toggles = document.querySelectorAll(
      "[data-mobile-menu-toggle], .mobile-menu-button, .menu-toggle",
    );

    toggles.forEach((toggle) => {
      const explicitTarget = toggle.getAttribute("data-target");
      const menu =
        (explicitTarget && document.querySelector(explicitTarget)) ||
        document.querySelector("[data-mobile-menu]") ||
        document.querySelector(".mobile-nav");

      if (!menu) return;

      toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        html.classList.toggle("mobile-nav-open", isOpen);
      });

      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          html.classList.remove("mobile-nav-open");
        });
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        html.classList.remove("mobile-nav-open");
      });
    });
  }

  function setPageVisualTheme() {
    const path = window.location.pathname;

    const rules = [
      {
        key: "battery",
        match: ["12v", "24v", "amp-hours", "watt-hours", "dc-amps"],
      },
      {
        key: "solar",
        match: ["solar"],
      },
      {
        key: "home-power",
        match: [
          "120v",
          "220v",
          "230v",
          "240v",
          "refrigerator",
          "microwave",
          "dryer",
        ],
      },
      {
        key: "industrial",
        match: ["480v", "3-phase", "three-phase", "generator"],
      },
      {
        key: "ev",
        match: ["ev-charger"],
      },
      {
        key: "motor",
        match: ["motor", "electric-motor", "pool-pump"],
      },
      {
        key: "safety",
        match: ["voltage-drop", "wire-gauge", "power-factor"],
      },
    ];

    const found = rules.find((rule) =>
      rule.match.some((token) => path.includes(token)),
    );

    if (found) {
      html.dataset.pageVisual = found.key;
    }
  }

  function enhanceTables() {
    document.querySelectorAll("table").forEach((table) => {
      if (table.closest(".table-wrap")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "table-wrap";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      table.classList.add("premium-table");
    });
  }

  function enhanceContentSections() {
    document
      .querySelectorAll("main article, .article-content, .content, .page-content")
      .forEach((section) => {
        if (
          section.classList.contains("article-card") ||
          section.classList.contains("content-card") ||
          section.classList.contains("blog-card") ||
          section.classList.contains("home-guide-card") ||
          section.closest(".article-card") ||
          section.closest(".premium-calculator")
        ) {
          return;
        }

        section.classList.add("article-card");
      });
  }

  function addAnimationHooks() {
    const targets = document.querySelectorAll(
      ".premium-card, .article-card, .content-card, .calculator-card, .premium-calculator, .formula-card, .table-card, .related-card, .guide-card, .blog-card, .faq-card, .page-hero-card, .premium-hero-copy",
    );

    targets.forEach((target) => {
      target.setAttribute("data-animate", "");
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.1,
      },
    );

    targets.forEach((target) => observer.observe(target));
  }

  function initFaqEnhancements() {
    document.querySelectorAll("details").forEach((details) => {
      if (details.classList.contains("nav-dropdown")) return;

      details.addEventListener("toggle", () => {
        if (!details.open) return;

        const parent = details.parentElement;
        if (!parent) return;

        parent.querySelectorAll("details[open]").forEach((other) => {
          if (other !== details && parent.classList.contains("faq-accordion")) {
            other.open = false;
          }
        });
      });
    });
  }

  function initCopyButtonsVisualFeedback() {
    document
      .querySelectorAll("[data-copy-result], .lx-action-copy")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const oldText = button.textContent;
          button.textContent = "Copied";
          button.classList.add("is-copied");

          window.setTimeout(() => {
            button.textContent = oldText || "Copy Result";
            button.classList.remove("is-copied");
          }, 1400);
        });
      });
  }

  function initResultFlash() {
    const results = document.querySelectorAll(
      "[data-result], [data-primary-result], .calc-result-value, .calculator-result__value",
    );

    results.forEach((result) => {
      const observer = new MutationObserver(() => {
        result.classList.remove("is-updated");
        void result.offsetWidth;
        result.classList.add("is-updated");
      });

      observer.observe(result, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  }

  function initThemeUI() {
    initMobileNavigation();
    setPageVisualTheme();
    enhanceTables();
    enhanceContentSections();
    initFaqEnhancements();
    initCopyButtonsVisualFeedback();
    initResultFlash();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimationHooks();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeUI);
  } else {
    initThemeUI();
  }
})();
