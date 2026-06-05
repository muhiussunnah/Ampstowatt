/* ================================================================
   AMPS TO WATTS - PREMIUM CLIENT SCRIPT
   Calculator logic and interactions
   ================================================================ */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const number = (field, fallback = 0) => {
    const value = Number(field && field.value);
    return Number.isFinite(value) ? value : fallback;
  };
  const format = (value, decimals = 2) => {
    if (!Number.isFinite(value)) return '-';
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(0, Math.min(8, decimals))
    });
  };
  const setSelectOptions = (select, options) => {
    if (!select) return;
    select.replaceChildren(...options.map(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      return option;
    }));
  };

  /* ----------------------------------------------------------------
     CALCULATOR ENGINE
     ---------------------------------------------------------------- */
  function phaseFactor(type, pf, voltageType) {
    if (type === 'ac3') return (voltageType === 'vln' ? 3 : 1.732) * pf;
    if (type === 'ac1') return pf;
    return 1;
  }

  function toolField(tool, prefix) {
    return $(`[id^="${prefix}"]`, tool);
  }

  function getDecimals(tool) {
    return Math.max(0, Math.min(8, number(toolField(tool, 'lx-dec'), 4)));
  }

  function getMode(tool) {
    if (tool.dataset.mode) return tool.dataset.mode;
    const powerLabel = (toolField(tool, 'lbl-power')?.textContent || '').toLowerCase();
    const unit = toolField(tool, 'lx-power-unit')?.value || '';
    if (powerLabel.includes('current') || unit === 'a' || unit === 'ma') return 'amps-to-watts';
    if (powerLabel.includes('power') || unit === 'kw' || unit === 'w') return 'watts-to-amps';
    const modeText = (toolField(tool, 'lx-mode-text')?.textContent || '').toLowerCase();
    const buttonText = (toolField(tool, 'lx-mode-btn')?.textContent || '').toLowerCase();
    if (modeText.includes('amps to watts')) return 'amps-to-watts';
    if (modeText.includes('watts to amps')) return 'watts-to-amps';
    if (buttonText.includes('watts to amps')) return 'amps-to-watts';
    return 'watts-to-amps';
  }

  function setMode(tool, mode) {
    const isAmpsToWatts = mode === 'amps-to-watts';
    const modeText = toolField(tool, 'lx-mode-text');
    const modeBtn = toolField(tool, 'lx-mode-btn');
    const powerLabel = toolField(tool, 'lbl-power');
    const unit = toolField(tool, 'lx-power-unit');
    const resOneLabel = toolField(tool, 'lbl-res1');
    const resTwoLabel = toolField(tool, 'lbl-res2');
    const resOneUnit = toolField(tool, 'lbl-unit1');
    const resTwoUnit = toolField(tool, 'lbl-unit2');
    const resOneBox = toolField(tool, 'res-amps-box');
    const resTwoBox = toolField(tool, 'res-ma-box');
    const firstLabel = resOneLabel || resOneBox?.querySelector('label');
    const secondLabel = resTwoLabel || resTwoBox?.querySelector('label');
    const firstUnit = resOneUnit || resOneBox?.querySelector('.lx-unit-label');
    const secondUnit = resTwoUnit || resTwoBox?.querySelector('.lx-unit-label');
    if (modeText) {
      modeText.dataset.i18n = isAmpsToWatts ? 'calc.mode.atw' : 'calc.mode.wta';
      modeText.textContent = isAmpsToWatts ? 'AMPS TO WATTS' : 'WATTS TO AMPS';
    }
    if (modeBtn) {
      modeBtn.dataset.i18n = isAmpsToWatts ? 'calc.switch.toWta' : 'calc.switch.toAtw';
      modeBtn.textContent = isAmpsToWatts ? 'Switch to Watts to Amps' : 'Switch to Amps to Watts';
      modeBtn.setAttribute('aria-checked', isAmpsToWatts ? 'true' : 'false');
    }
    if (powerLabel) {
      powerLabel.dataset.i18n = isAmpsToWatts ? 'calc.current' : 'calc.power';
      powerLabel.textContent = isAmpsToWatts ? 'Current' : 'Power';
    }
    if (firstLabel) {
      firstLabel.dataset.i18n = isAmpsToWatts ? 'calc.kw' : 'calc.amps';
      firstLabel.textContent = isAmpsToWatts ? 'Power (kW)' : 'Current (amps)';
    }
    if (secondLabel) {
      secondLabel.dataset.i18n = isAmpsToWatts ? 'calc.watts' : 'calc.milliamps';
      secondLabel.textContent = isAmpsToWatts ? 'Power (W)' : 'Current (milliamps)';
    }
    if (firstUnit) firstUnit.textContent = isAmpsToWatts ? 'kW' : 'A';
    if (secondUnit) secondUnit.textContent = isAmpsToWatts ? 'W' : 'mA';
    if (unit) {
      setSelectOptions(unit, isAmpsToWatts
        ? [['a', 'A'], ['ma', 'mA']]
        : [['kw', 'kW'], ['w', 'W']]);
    }
    tool.dataset.mode = mode;
    window.dispatchEvent(new CustomEvent('aw:calculator-mode-change'));
  }

  function updateVisibility(tool) {
    const type = toolField(tool, 'lx-type')?.value || 'dc';
    const vtype = toolField(tool, 'lx-vtype-container');
    const pf = toolField(tool, 'lx-pf-container');
    if (vtype) vtype.classList.toggle('is-hidden', type !== 'ac3');
    if (pf) pf.classList.toggle('is-hidden', type === 'dc');
  }

  function validateInput(field) {
    if (!field) return;
    const val = Number(field.value);
    if (field.value !== '' && (!Number.isFinite(val) || val < 0)) {
      field.classList.add('has-error');
    } else {
      field.classList.remove('has-error');
    }
  }

  function updateCalculator(tool) {
    updateVisibility(tool);
    const decimals = getDecimals(tool);
    const mode = tool.dataset.mode || getMode(tool);
    const type = toolField(tool, 'lx-type')?.value || 'dc';
    const powerField = toolField(tool, 'lx-power');
    const voltsField = toolField(tool, 'lx-volts');
    const unitField = toolField(tool, 'lx-power-unit');
    const pfSlider = toolField(tool, 'lx-pf-slider');
    const pfInput = toolField(tool, 'lx-pf-input');
    const voltageType = toolField(tool, 'lx-vtype')?.value || 'vll';
    const pf = type === 'dc' ? 1 : Math.max(0.01, Math.min(1, number(pfInput || pfSlider, 1)));
    const volts = Math.max(0.000001, number(voltsField, 0));
    const raw = number(powerField, 0);
    const unit = unitField?.value || (mode === 'amps-to-watts' ? 'a' : 'kw');
    const input = unit === 'kw' ? raw * 1000 : unit === 'ma' ? raw / 1000 : raw;
    const divisor = volts * phaseFactor(type, pf, voltageType);

    /* Validate inputs */
    validateInput(powerField);
    validateInput(voltsField);

    let amps = 0;
    let watts = 0;
    if (mode === 'amps-to-watts') {
      amps = input;
      watts = amps * divisor;
    } else {
      watts = input;
      amps = watts / Math.max(0.000001, divisor);
    }

    const resAmps = toolField(tool, 'res-amps');
    const resMa = toolField(tool, 'res-ma');
    const resKw = toolField(tool, 'res-kw');
    const resWatts = toolField(tool, 'res-watts');
    const mirror = toolField(tool, 'lx-mirror-val');

    if (resAmps) resAmps.value = mode === 'amps-to-watts' ? format(watts / 1000, decimals) : format(amps, decimals);
    if (resMa) resMa.value = mode === 'amps-to-watts' ? format(watts, decimals) : format(amps * 1000, decimals);
    if (resKw) resKw.value = mode === 'amps-to-watts' ? format(watts / 1000, decimals) : format(amps, decimals);
    if (resWatts) resWatts.value = mode === 'amps-to-watts' ? format(watts, decimals) : format(amps * 1000, decimals);
    if (mirror) {
      mirror.textContent = mode === 'amps-to-watts'
        ? `${format(watts, decimals)} W`
        : `${format(amps, decimals)} A`;
    }

    /* Store last result for copy/export */
    tool.dataset.lastResult = mode === 'amps-to-watts'
      ? `${format(watts, decimals)} W (${format(watts / 1000, decimals)} kW)`
      : `${format(amps, decimals)} A (${format(amps * 1000, decimals)} mA)`;
    tool.dataset.lastInput = `${raw} ${unit.toUpperCase()} @ ${format(volts, 1)}V, PF=${format(pf, 2)}, ${type.toUpperCase()}`;
  }

  /* ----------------------------------------------------------------
     COPY & EXPORT
     ---------------------------------------------------------------- */
  function showToast(message) {
    let toast = $('.aw-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'aw-toast';
      const icon = document.createElement('span');
      icon.className = 'aw-toast-icon';
      icon.textContent = 'OK';
      const text = document.createElement('span');
      text.className = 'aw-toast-text';
      toast.append(icon, text);
      document.body.appendChild(toast);
    }
    toast.querySelector('.aw-toast-text').textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function copyResult(tool) {
    const result = tool.dataset.lastResult || 'No result';
    const input = tool.dataset.lastInput || '';
    const text = `${result}\nInput: ${input}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Result copied to clipboard'));
    } else {
      /* Fallback for older browsers */
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast('Result copied to clipboard');
    }
  }

  function exportResult(tool) {
    const result = tool.dataset.lastResult || 'No result';
    const input = tool.dataset.lastInput || '';
    const heading = document.querySelector('h1')?.textContent || 'Amps To Watts Calculator';
    const text = [
      heading,
      '='.repeat(heading.length),
      '',
      `Result: ${result}`,
      `Input:  ${input}`,
      '',
      `Generated: ${new Date().toLocaleString()}`,
      `Source:  ${window.location.href}`,
      '',
      'Disclaimer: This result is for educational planning only.',
      'Verify safety-critical work with a licensed professional.'
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculation-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Result exported');
  }

  function injectCopyExportButtons(tool) {
    const actions = tool.querySelector('.lx-actions');
    if (!actions || actions.querySelector('.lx-action-copy')) return;

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'lx-action-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.title = 'Copy result to clipboard';
    copyBtn.addEventListener('click', () => copyResult(tool));

    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'lx-action-export';
    exportBtn.textContent = 'Export';
    exportBtn.title = 'Download result as text file';
    exportBtn.addEventListener('click', () => exportResult(tool));

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
    if (!result || result === 'No result') return;

    const historyPanel = document.getElementById('calc-history');
    const historyList = document.getElementById('calc-history-list');
    if (!historyPanel || !historyList) return;

    historyPanel.classList.remove('is-hidden');

    const item = document.createElement('div');
    item.className = 'calc-history-item';
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const resultEl = document.createElement('span');
    resultEl.className = 'hist-result';
    resultEl.textContent = result.split(' (')[0];
    const inputEl = document.createElement('span');
    inputEl.className = 'hist-input';
    inputEl.textContent = input;
    const timeEl = document.createElement('span');
    timeEl.className = 'hist-time';
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
    $$('[data-watts]').forEach((card) => {
      card.addEventListener('click', () => {
        const tool = $('.lx-tool');
        const field = tool && toolField(tool, 'lx-power');
        const unit = tool && toolField(tool, 'lx-power-unit');
        if (!tool || !field) return;
        setMode(tool, 'watts-to-amps');
        field.value = card.dataset.watts || '0';
        if (unit) unit.value = 'w';
        updateCalculator(tool);
        tool.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // New preset buttons
    $$('[data-preset-watts]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = $('.lx-tool');
        if (!tool) return;
        const powerField = toolField(tool, 'lx-power');
        const voltsField = toolField(tool, 'lx-volts');
        const unitField = toolField(tool, 'lx-power-unit');

        setMode(tool, 'watts-to-amps');
        if (powerField) powerField.value = btn.dataset.presetWatts;
        if (voltsField && btn.dataset.presetVolts) voltsField.value = btn.dataset.presetVolts;
        if (unitField) unitField.value = 'w';
        updateCalculator(tool);
        addToHistory(tool);

        // Visual feedback
        btn.style.borderColor = 'rgba(22, 217, 244, 0.5)';
        btn.style.background = 'rgba(22, 217, 244, 0.08)';
        setTimeout(() => {
          btn.style.borderColor = '';
          btn.style.background = '';
        }, 600);
      });
    });
  }

  /* ----------------------------------------------------------------
     CALCULATOR INIT
     ---------------------------------------------------------------- */
  let calcDebounce = null;
  function initCalculators() {
    $$('.lx-tool').forEach((tool) => {
      if (tool.dataset.ready === 'true') return;
      tool.dataset.ready = 'true';
      setMode(tool, getMode(tool));
      $$('input, select, button', tool).forEach((control) => {
        control.addEventListener('input', () => {
          updateCalculator(tool);
          clearTimeout(calcDebounce);
          calcDebounce = setTimeout(() => addToHistory(tool), 1500);
        });
        control.addEventListener('change', () => {
          updateCalculator(tool);
          clearTimeout(calcDebounce);
          calcDebounce = setTimeout(() => addToHistory(tool), 1500);
        });
      });
      $$('[id^="lx-pf-slider"]', tool).forEach((slider) => {
        slider.addEventListener('input', () => {
          const pfInput = toolField(tool, 'lx-pf-input');
          if (pfInput) pfInput.value = slider.value;
        });
      });
      $$('[id^="lx-pf-input"]', tool).forEach((input) => {
        input.addEventListener('input', () => {
          const slider = toolField(tool, 'lx-pf-slider');
          if (slider) slider.value = input.value;
        });
      });
      $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((button) => {
        button.addEventListener('click', () => {
          $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((btn) => btn.classList.remove('active'));
          button.classList.add('active');
          const hidden = toolField(tool, 'lx-vtype');
          if (hidden) hidden.value = button.id.includes('vln') ? 'vln' : 'vll';
          updateCalculator(tool);
        });
      });
      const modeBtn = toolField(tool, 'lx-mode-btn');
      if (modeBtn) {
        modeBtn.addEventListener('click', () => {
          const next = (tool.dataset.mode || getMode(tool)) === 'amps-to-watts' ? 'watts-to-amps' : 'amps-to-watts';
          setMode(tool, next);
          updateCalculator(tool);
        });
      }
      $$('[class*="reset"]', tool).forEach((button) => {
        button.addEventListener('click', () => {
          const power = toolField(tool, 'lx-power');
          const volts = toolField(tool, 'lx-volts');
          const type = toolField(tool, 'lx-type');
          const pf = toolField(tool, 'lx-pf-input');
          const slider = toolField(tool, 'lx-pf-slider');
          const voltageType = toolField(tool, 'lx-vtype');
          const defaultMode = tool.dataset.defaultMode || 'amps-to-watts';
          const defaultVoltage = tool.dataset.defaultVoltage || '120';
          const defaultPhase = tool.dataset.defaultPhase || 'ac1';
          setMode(tool, defaultMode);
          if (power) power.value = '10';
          if (volts) volts.value = defaultVoltage;
          if (type) type.value = defaultPhase;
          if (pf) pf.value = '1';
          if (slider) slider.value = '1';
          if (voltageType) voltageType.value = 'vll';
          $$('[id^="btn-vll"], [id^="btn-vln"]', tool).forEach((btn) => {
            btn.classList.toggle('active', btn.id.includes('vll'));
          });
          /* Clear validation */
          $$('.has-error', tool).forEach(el => el.classList.remove('has-error'));
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
    const toggle = $('.nav-toggle');
    const nav = $('.site-nav');
    toggle?.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav?.classList.toggle('is-open', !open);
    });

    /* Close nav on outside click */
    document.addEventListener('click', (e) => {
      if (nav?.classList.contains('is-open') && !e.target.closest('.site-header')) {
        toggle?.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    /* Close details on outside click */
    document.addEventListener('click', (e) => {
      $$('.site-nav details[open]').forEach((d) => {
        if (!d.contains(e.target)) d.removeAttribute('open');
      });
    });
  }

  /* ----------------------------------------------------------------
     BACK TO TOP
     ---------------------------------------------------------------- */
  function initBackToTop() {
    const btn = $('.back-to-top');
    if (!btn) return;

    function toggleVisibility() {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleVisibility();
  }

  /* ----------------------------------------------------------------
     SCROLL PROGRESS BAR
     ---------------------------------------------------------------- */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------------
     CALCULATOR SEARCH
     ---------------------------------------------------------------- */
  function initCalculatorSearch() {
    const input = $('#calc-search');
    if (!input) return;

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      const cards = $$('[data-search-card]');
      const groups = $$('[data-group]');

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!query || text.includes(query)) ? '' : 'none';
      });

      /* Hide empty groups */
      groups.forEach((group) => {
        const visibleCards = $$('[data-search-card]', group).filter(c => c.style.display !== 'none');
        group.style.display = visibleCards.length > 0 ? '' : 'none';
      });
    });
  }

  /* ----------------------------------------------------------------
     KEYBOARD SHORTCUTS
     ---------------------------------------------------------------- */
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      /* Escape to reset calculator */
      if (e.key === 'Escape') {
        const tool = $('.lx-tool');
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
    if (document.querySelector('.lx-tool')) {
      initCalculators();
      initDevicePresets();
      initCalculatorSearch();
      initKeyboardShortcuts();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
