(function() {
  'use strict';

  function read(calc, selector, fallback) {
    const input = calc.querySelector(selector);
    const value = input ? parseFloat(input.value) : NaN;
    return Number.isFinite(value) ? value : fallback;
  }

  function positive(value, fallback) {
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function format(value, unit, decimals) {
    if (!Number.isFinite(value)) return '- ' + unit;
    const abs = Math.abs(value);
    const digits = typeof decimals === 'number' ? decimals : abs >= 1000 ? 0 : abs >= 100 ? 1 : abs >= 10 ? 2 : 3;
    return value.toLocaleString(undefined, { maximumFractionDigits: digits }) + ' ' + unit;
  }

  function formatWatts(watts) {
    if (!Number.isFinite(watts)) return '-';
    if (Math.abs(watts) >= 1000000) return format(watts / 1000000, 'MW', 3);
    if (Math.abs(watts) >= 1000) return format(watts / 1000, 'kW', 3);
    return format(watts, 'W', 2);
  }

  function wireGauge(amps) {
    if (amps <= 10) return '14 AWG';
    if (amps <= 15) return '12 AWG';
    if (amps <= 20) return '10 AWG';
    if (amps <= 30) return '8 AWG';
    if (amps <= 40) return '6 AWG';
    if (amps <= 55) return '4 AWG';
    if (amps <= 70) return '2 AWG';
    if (amps <= 85) return '1 AWG';
    if (amps <= 95) return '1/0 AWG';
    if (amps <= 110) return '2/0 AWG';
    if (amps <= 125) return '3/0 AWG';
    if (amps <= 145) return '4/0 AWG';
    return '250 kcmil+';
  }

  function setLabel(calc, selector, text) {
    const input = calc.querySelector(selector);
    if (input && input.parentElement && input.parentElement.firstChild) {
      input.parentElement.firstChild.nodeValue = text;
    }
  }

  function setDefault(calc, selector, value) {
    const input = calc.querySelector(selector);
    if (!input) return;
    input.value = String(value);
    input.defaultValue = String(value);
  }

  function pageMeta(calc) {
    const title = (document.title || '').toLowerCase();
    const mode = calc.dataset.mode || 'amps-to-watts';
    const phase = calc.dataset.phase === 'three' || title.includes('3 phase') || title.includes('three phase') ? 'three' : 'single';
    const dc = title.includes('dc') || title.includes('12v') || title.includes('solar') || title.includes('led') || mode === 'speaker';
    const multiplier = dc ? 1 : phase === 'three' ? 1.732 : 1;
    return {
      mode,
      phase,
      dc,
      multiplier,
      volts: positive(parseFloat(calc.dataset.defaultVolts), 120),
      circuit: dc ? 'DC' : phase === 'three' ? 'AC three phase' : 'AC single phase'
    };
  }

  function configure(calc) {
    const meta = pageMeta(calc);
    const title = (document.title || '').toLowerCase();

    if (meta.mode === 'speaker') {
      setDefault(calc, '.tool-watts', 500);
      setDefault(calc, '.tool-volts', 12);
      setDefault(calc, '.tool-pf', 0.85);
      setDefault(calc, '.tool-kva', 4);
      setDefault(calc, '.tool-mw', 100);
      setDefault(calc, '.tool-hours', 2);
      setLabel(calc, '.tool-watts', 'Amplifier RMS Watts');
      setLabel(calc, '.tool-volts', 'Supply Volts (V)');
      setLabel(calc, '.tool-pf', 'Efficiency (0-1)');
      setLabel(calc, '.tool-kva', 'Speakers');
      setLabel(calc, '.tool-mw', 'Speaker RMS Each');
      setLabel(calc, '.tool-hours', 'Play Hours');
    } else if (meta.mode === 'kva-to-watts') {
      setDefault(calc, '.tool-kva', 10);
      setDefault(calc, '.tool-pf', 0.8);
    } else if (meta.mode === 'mw-to-amps') {
      setDefault(calc, '.tool-mw', 1);
      setDefault(calc, '.tool-volts', meta.volts);
      setDefault(calc, '.tool-pf', 0.85);
    } else if (meta.mode === 'power-consumption') {
      setDefault(calc, '.tool-watts', 1500);
      setDefault(calc, '.tool-hours', 8);
      setLabel(calc, '.tool-hours', 'Hours Used');
    } else if (title.includes('solar')) {
      setDefault(calc, '.tool-watts', 400);
      setDefault(calc, '.tool-volts', meta.volts);
      setDefault(calc, '.tool-pf', 0.95);
      setDefault(calc, '.tool-hours', 5);
      setLabel(calc, '.tool-pf', 'Controller Efficiency');
    } else if (title.includes('led')) {
      setDefault(calc, '.tool-watts', 60);
      setDefault(calc, '.tool-volts', meta.volts);
      setDefault(calc, '.tool-pf', 0.9);
      setDefault(calc, '.tool-hours', 6);
      setLabel(calc, '.tool-pf', 'Driver Efficiency');
    }

    calc.querySelectorAll('input').forEach((input) => {
      input.dataset.initialValue = input.value;
    });
  }

  function inputs(calc) {
    const meta = pageMeta(calc);
    const rawFactor = read(calc, '.tool-pf', 1);
    const factor = meta.dc && meta.mode !== 'speaker' && !document.title.toLowerCase().includes('solar') && !document.title.toLowerCase().includes('led')
      ? 1
      : clamp(positive(rawFactor, 1), 0.01, 1);

    return {
      meta,
      amps: positive(read(calc, '.tool-amps', 10), 10),
      watts: positive(read(calc, '.tool-watts', 1200), 1200),
      volts: positive(read(calc, '.tool-volts', meta.volts), meta.volts),
      factor,
      kva: positive(read(calc, '.tool-kva', 10), 10),
      mw: positive(read(calc, '.tool-mw', 1), 1),
      hours: Math.max(read(calc, '.tool-hours', 1), 0),
      rate: Math.max(read(calc, '.tool-rate', 0.15), 0)
    };
  }

  function buildResult(calc) {
    const data = inputs(calc);
    const m = data.meta.multiplier;
    const title = (document.title || '').toLowerCase();
    const efficiencyDriven = title.includes('solar') || title.includes('led');
    let amps = data.amps;
    let watts = data.watts;
    let formula = '';
    let main = '';
    let feature = '';

    if (data.meta.mode === 'watts-to-amps') {
      amps = watts / Math.max(data.volts * data.factor * m, 0.000001);
      formula = data.meta.dc ? efficiencyDriven ? 'A = W / (V x efficiency)' : 'A = W / V' : data.meta.phase === 'three' ? 'A = W / (1.732 x V x PF)' : 'A = W / (V x PF)';
      main = format(amps, 'A', 3);
    } else if (data.meta.mode === 'kva-to-watts') {
      watts = data.kva * 1000 * data.factor;
      amps = (data.kva * 1000) / Math.max(data.volts * m, 0.000001);
      formula = 'W = kVA x 1000 x PF';
      main = formatWatts(watts);
      feature = 'Input apparent power: ' + format(data.kva, 'kVA', 3) + '.';
    } else if (data.meta.mode === 'amps-to-kw') {
      watts = amps * data.volts * data.factor * m;
      formula = data.meta.phase === 'three' ? 'kW = 1.732 x A x V x PF / 1000' : 'kW = A x V x PF / 1000';
      main = format(watts / 1000, 'kW', 4);
    } else if (data.meta.mode === 'mw-to-amps') {
      watts = data.mw * 1000000;
      amps = watts / Math.max(data.volts * data.factor * m, 0.000001);
      formula = data.meta.phase === 'three' ? 'A = MW x 1,000,000 / (1.732 x V x PF)' : 'A = MW x 1,000,000 / (V x PF)';
      main = format(amps, 'A', 3);
      feature = 'Input real power: ' + format(data.mw, 'MW', 3) + '.';
    } else if (data.meta.mode === 'power-consumption') {
      watts = data.watts;
      amps = watts / Math.max(data.volts * data.factor * m, 0.000001);
      formula = 'kWh = W x hours / 1000';
      main = format((watts / 1000) * data.hours, 'kWh', 4);
    } else if (data.meta.mode === 'voltage-amps-watts') {
      watts = amps * data.volts * data.factor * m;
      formula = data.meta.dc ? 'W = A x V' : data.meta.phase === 'three' ? 'W = 1.732 x A x V x PF' : 'W = A x V x PF';
      main = formatWatts(watts) + ' | ' + format(amps, 'A', 3);
      feature = 'Reverse current from entered watts: ' + format(data.watts / Math.max(data.volts * data.factor * m, 0.000001), 'A', 3) + '.';
    } else if (data.meta.mode === 'speaker') {
      const speakers = Math.max(Math.round(data.kva), 1);
      const speakerRms = positive(data.mw, watts / speakers);
      amps = watts / Math.max(data.volts * data.factor, 0.000001);
      formula = 'Supply A = amplifier W / (supply V x efficiency)';
      main = format(amps, 'A', 3);
      feature = 'Speaker plan: ' + speakers + ' speaker(s), ' + format(watts / speakers, 'W each', 1) + ', checked against ' + format(speakerRms, 'W RMS speaker rating', 1) + '.';
    } else {
      watts = amps * data.volts * data.factor * m;
      formula = data.meta.dc ? 'W = A x V' : data.meta.phase === 'three' ? 'W = 1.732 x A x V x PF' : 'W = A x V x PF';
      main = formatWatts(watts);
    }

    const apparentPower = amps * data.volts * m;
    const kva = apparentPower / 1000;
    const kw = watts / 1000;
    const kwh = kw * data.hours;
    const cost = kwh * data.rate;
    const breaker = Math.ceil(amps * 1.25);
    const hp = watts / 745.7;
    const btu = watts * 3.412141633;
    const reactive = Math.sqrt(Math.max(0, apparentPower * apparentPower - watts * watts));
    const load = amps < 16 ? 'light load' : amps < 40 ? 'medium load' : 'high load';

    return {
      main,
      detail: [
        '<strong>Formula:</strong> ' + formula,
        '<strong>Circuit:</strong> ' + data.meta.circuit + ' | factor: ' + format(data.factor, '', 3).trim(),
        feature ? '<strong>Page feature:</strong> ' + feature : '',
        '<strong>Electrical result:</strong> ' + formatWatts(watts) + ' | ' + format(amps, 'A', 3) + ' | ' + format(kva, 'kVA', 4),
        '<strong>Energy:</strong> ' + format(kwh, 'kWh', 4) + ' for ' + format(data.hours, 'h', 2) + ' | cost ' + format(cost, '', 2).trim(),
        '<strong>Planning:</strong> ' + load + ' | breaker estimate ' + breaker + ' A | wire estimate ' + wireGauge(amps),
        '<strong>Reference:</strong> ' + format(hp, 'hp', 3) + ' | ' + format(btu, 'BTU/hr', 1) + ' | reactive ' + format(reactive, 'VAR', 2)
      ].filter(Boolean).join('<br>')
    };
  }

  function calculate(calc) {
    const result = buildResult(calc);
    const main = calc.querySelector('.tool-result-main');
    const detail = calc.querySelector('.tool-result-detail');
    const shell = calc.querySelector('.tool-page-result');

    if (main) main.textContent = result.main;
    if (detail) detail.innerHTML = result.detail;
    if (shell) shell.classList.add('show');
  }

  function copyResult(calc, button) {
    const main = calc.querySelector('.tool-result-main');
    const detail = calc.querySelector('.tool-result-detail');
    const text = [
      main ? main.textContent.trim() : '',
      detail ? detail.textContent.replace(/\s+/g, ' ').trim() : ''
    ].filter(Boolean).join('\n');

    if (!text) return;

    const done = () => {
      const original = button.textContent;
      button.textContent = 'Copied';
      window.setTimeout(() => {
        button.textContent = original || 'Copy result';
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        button.textContent = 'Select result';
      });
    } else {
      button.textContent = 'Select result';
    }
  }

  function addActionButtons(calc) {
    const result = calc.querySelector('.tool-page-result');
    if (!result || calc.querySelector('.tool-copy-button')) return;
    const actions = document.createElement('div');
    actions.className = 'tool-page-actions';
    actions.innerHTML = '<button type="button" class="tool-copy-button">Copy result</button>';
    result.appendChild(actions);
    actions.querySelector('.tool-copy-button').addEventListener('click', (event) => copyResult(calc, event.currentTarget));
  }

  function reset(calc) {
    calc.querySelectorAll('input').forEach((input) => {
      input.value = input.dataset.initialValue || input.defaultValue || '';
    });
    calculate(calc);
  }

  function init() {
    document.querySelectorAll('.mini-tool-calculator').forEach((calc) => {
      configure(calc);
      addActionButtons(calc);
      calc.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => calculate(calc));
        input.addEventListener('change', () => calculate(calc));
      });
      const button = calc.querySelector('.tool-calc-button');
      const resetButton = calc.querySelector('.tool-reset-button');
      if (button) button.addEventListener('click', () => calculate(calc));
      if (resetButton) resetButton.addEventListener('click', () => reset(calc));
      calculate(calc);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
