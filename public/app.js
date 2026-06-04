/* ================================================================
   AMPS TO WATTS — PREMIUM CLIENT SCRIPT
   Calculator logic, interactions, and micro-animations
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
    if (modeText) modeText.textContent = mode === 'amps-to-watts' ? 'AMPS TO WATTS' : 'WATTS TO AMPS';
    if (modeBtn) {
      modeBtn.textContent = mode === 'amps-to-watts' ? 'Switch to Watts to Amps' : 'Switch to Amps to Watts';
      modeBtn.setAttribute('aria-checked', mode === 'amps-to-watts' ? 'true' : 'false');
    }
    if (powerLabel) powerLabel.textContent = mode === 'amps-to-watts' ? 'Current' : 'Power';
    if (firstLabel) firstLabel.textContent = mode === 'amps-to-watts' ? 'Power (kW)' : 'Current (amps)';
    if (secondLabel) secondLabel.textContent = mode === 'amps-to-watts' ? 'Power (W)' : 'Current (milliamps)';
    if (firstUnit) firstUnit.textContent = mode === 'amps-to-watts' ? 'kW' : 'A';
    if (secondUnit) secondUnit.textContent = mode === 'amps-to-watts' ? 'W' : 'mA';
    if (unit) {
      unit.innerHTML = mode === 'amps-to-watts'
        ? '<option value="a">A</option><option value="ma">mA</option>'
        : '<option value="kw">kW</option><option value="w">W</option>';
    }
    tool.dataset.mode = mode;
  }

  function updateVisibility(tool) {
    const type = toolField(tool, 'lx-type')?.value || 'dc';
    const vtype = toolField(tool, 'lx-vtype-container');
    const pf = toolField(tool, 'lx-pf-container');
    if (vtype) vtype.style.display = type === 'ac3' ? '' : 'none';
    if (pf) pf.style.display = type === 'dc' ? 'none' : '';
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
    const mirror = toolField(tool, 'lx-mirror-val');
    const resultOne = toolField(tool, 'res-watts') || toolField(tool, 'res-kw');

    if (resAmps) resAmps.value = mode === 'amps-to-watts' ? format(watts / 1000, decimals) : format(amps, decimals);
    if (resMa) resMa.value = mode === 'amps-to-watts' ? format(watts, decimals) : format(amps * 1000, decimals);
    if (resultOne) resultOne.value = format(watts, decimals);
    if (mirror) {
      mirror.textContent = mode === 'amps-to-watts'
        ? `${format(watts, decimals)} W`
        : `${format(amps, decimals)} A`;
    }

    /* Update gauge if present */
    const gaugeFill = tool.querySelector('#gauge-fill');
    if (gaugeFill) {
      const val = mode === 'amps-to-watts' ? watts : amps;
      const maxVal = mode === 'amps-to-watts' ? 10000 : 100;
      const percentage = Math.min(1, Math.max(0, val / maxVal));
      const offset = 125.6 - (125.6 * percentage);
      gaugeFill.style.strokeDashoffset = offset;
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
      toast.innerHTML = '<span class="aw-toast-icon">✓</span><span class="aw-toast-text"></span>';
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
    copyBtn.textContent = '⎘ Copy';
    copyBtn.title = 'Copy result to clipboard';
    copyBtn.addEventListener('click', () => copyResult(tool));

    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'lx-action-export';
    exportBtn.textContent = '↓ Export';
    exportBtn.title = 'Download result as text file';
    exportBtn.addEventListener('click', () => exportResult(tool));

    actions.appendChild(copyBtn);
    actions.appendChild(exportBtn);
  }

  /* ----------------------------------------------------------------
     CALCULATOR INIT
     ---------------------------------------------------------------- */
  function initCalculators() {
    $$('.lx-tool').forEach((tool) => {
      if (tool.dataset.ready === 'true') return;
      tool.dataset.ready = 'true';
      setMode(tool, getMode(tool));
      $$('input, select, button', tool).forEach((control) => {
        control.addEventListener('input', () => updateCalculator(tool));
        control.addEventListener('change', () => updateCalculator(tool));
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
          const pf = toolField(tool, 'lx-pf-input');
          const slider = toolField(tool, 'lx-pf-slider');
          if (power) power.value = '10';
          if (volts) volts.value = '120';
          if (pf) pf.value = '1';
          if (slider) slider.value = '1';
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
     DEVICE PRESETS
     ---------------------------------------------------------------- */
  function initDevicePresets() {
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
     COOKIE BANNER
     ---------------------------------------------------------------- */
  function initCookieBar() {
    const existing = $('[class*="cookie"], #cookie-banner');
    if (existing) return;
    const bar = document.createElement('div');
    bar.className = 'cookie-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = '<p>We use cookies for analytics and personalized ads. By clicking Accept, you agree to our use of cookies and our Privacy Policy.</p><div><button type="button" data-cookie-ok>Accept</button><button type="button" data-cookie-no>Decline</button></div>';
    document.body.appendChild(bar);
    bar.addEventListener('click', (event) => {
      if (event.target.closest('[data-cookie-ok], [data-cookie-no]')) bar.remove();
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
     SCROLL REVEAL
     ---------------------------------------------------------------- */
  function initScrollReveal() {
    const targets = $$('.premium-directory-group, .premium-trust-section, .premium-faq-section, .premium-feature-strip a, .premium-tool-card, .premium-trust-item');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      /* Stagger within groups */
      const delay = Math.min(i % 6, 3);
      if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
      observer.observe(el);
    });
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
    initCookieBar();
    initBackToTop();
    initScrollReveal();
    
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
