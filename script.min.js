/**
 * AMPERE TO WATT CALCULATOR - Main Script
 * Complete electrical power conversion suite
 * Version: 2.0
 */

(function() {
  'use strict';

  // ===== DATABASE & CONSTANTS =====
  

  const TRANSLATIONS = {};
  const MACHINE_TRANSLATION_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
  const MACHINE_TRANSLATION_SEPARATOR = '__AMPSTOWATT_I18N_SEP__';
  const MACHINE_TRANSLATION_BATCH_LIMIT = 1200;
  const MACHINE_TRANSLATION_CACHE = {};
  const MACHINE_TRANSLATION_INFLIGHT = {};

  const LANGUAGE_META = {
    en: { name: 'English', dir: 'ltr' },
    es: { name: 'Español', dir: 'ltr' },
    fr: { name: 'Français', dir: 'ltr' },
    de: { name: 'Deutsch', dir: 'ltr' },
    it: { name: 'Italiano', dir: 'ltr' },
    pt: { name: 'Português', dir: 'ltr' },
    hi: { name: 'हिन्दी', dir: 'ltr' },
    bn: { name: 'বাংলা', dir: 'ltr' },
    ja: { name: '日本語', dir: 'ltr' },
    ko: { name: '한국어', dir: 'ltr' },
    ms: { name: 'Malay', dir: 'ltr' },
    pl: { name: 'Polski', dir: 'ltr' },
    id: { name: 'Indonesia', dir: 'ltr' },
    ar: { name: 'العربية', dir: 'rtl' },
    bg: { name: 'Български', dir: 'ltr' },
    tr: { name: 'Türkçe', dir: 'ltr' },
    sv: { name: 'Svenska', dir: 'ltr' },
    ur: { name: 'اردو', dir: 'rtl' },
    ru: { name: 'Русский', dir: 'ltr' }
  };

  const EXTERNAL_TRANSLATION_CACHE = {};

  const DEVICES = [
    { name: "LED Bulb", watts: 9 },
    { name: "Laptop", watts: 65 },
    { name: "Desktop PC", watts: 250 },
    { name: '55" TV', watts: 120 },
    { name: "Fridge", watts: 200 },
    { name: "Microwave", watts: 1000 },
    { name: "Coffee Maker", watts: 950 },
    { name: "Hair Dryer", watts: 1800 },
    { name: "AC Unit 1.5T", watts: 2000 },
    { name: "Water Heater", watts: 4000 },
    { name: "EV Charger L2", watts: 7200 },
    { name: "Washer", watts: 500 }
  ];

  const REF_TABLE_AMPS = [0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 25, 30, 40, 50, 60, 100];

  const FAQ_DATA = [
    {
      q: "How do I convert amps to watts?",
      a: "For DC circuits: Watts = Amps × Volts. For AC single-phase: Watts = PF × Amps × Volts. For AC three-phase (line-to-line): Watts = √3 × PF × Amps × V(L-L) ≈ 1.732 × PF × I × V. For AC three-phase (line-to-neutral): Watts = 3 × PF × Amps × V(L-N). Always confirm your circuit type and voltage measurement before selecting the formula. The square root of 3 (≈1.732) accounts for the 120-degree phase displacement in three-phase systems."
    },
    {
      q: "How many watts is 10 amps at 120V?",
      a: "At 120V AC with unity power factor (PF=1.00), 10 amps = 1,200 watts. With PF=0.95 (typical for fluorescent lighting), 10A = 1,140W. For DC circuits, 10A × 120V = 1,200W exactly. At 240V, 10A = 2,400W. Always apply the appropriate power factor for inductive loads like motors, fluorescent ballasts, and transformers. The NEC 80% continuous load rule means a 15A circuit should not exceed 12A continuous (1,440W at 120V)."
    },
    {
      q: "What is the formula for 3-phase amps to watts?",
      a: "There are two formulas. With line-to-line voltage: P = √3 × PF × I × V(L-L) = 1.732 × PF × I × V(L-L). With line-to-neutral voltage: P = 3 × PF × I × V(L-N). The √3 factor (1.732) accounts for the 120° phase displacement between conductors. Using the wrong voltage type produces a 73% error. In a 480V three-phase system, V(L-L)=480V and V(L-N)=277V. Always verify which voltage measurement you have before calculating."
    },
    {
      q: "How do I convert amp hours to watt hours?",
      a: "Watt-hours (Wh) = Amp-hours (Ah) × Voltage (V). A 100Ah 12V battery stores 100 × 12 = 1,200Wh (1.2 kWh). For milliamp-hours (mAh), divide by 1,000 first: (mAh ÷ 1000) × V = Wh. Example: 5,000mAh at 3.7V = (5000/1000) × 3.7 = 18.5Wh. Our Amp to Watt Hours calculator above handles this automatically with efficiency considerations. This conversion is essential for solar system sizing, battery bank design, and energy storage calculations."
    },
    {
      q: "How do watts relate to amps?",
      a: "Watts and amps are related through voltage via Watt's Law: Power (W) = Current (A) × Voltage (V). For AC circuits, multiply by power factor: W = A × V × PF. Amps measure current flow rate (the quantity of electrons moving), while watts measure the rate of energy transfer (the work being done). You can have high amps with low watts at low voltage (e.g., 100A at 1V = 100W), or low amps with high watts at high voltage (e.g., 1A at 1000V = 1000W). This is why power transmission uses high voltage — to reduce current and minimize losses."
    },
    {
      q: "What are typical power factor values for common devices?",
      a: "Resistive loads (heaters, incandescent bulbs, resistive ovens): PF = 1.00 — voltage and current perfectly in phase. Fluorescent lamps with electronic ballasts: PF = 0.95. Synchronous motors: PF = 0.90 (adjustable; can be leading for PF correction). Induction motors at full load: PF = 0.85 — stator and rotor windings create inductive reactance. Induction motors at no load: PF = 0.35 — magnetizing current dominates without mechanical output. These are reference benchmarks only; always use nameplate data for precise calculations."
    },
    {
      q: "Can I convert amps to watts without voltage?",
      a: "No, this is mathematically impossible. Amperes measure the rate of electric charge flow (coulombs per second), while watts measure the rate of energy transfer (joules per second). Power equals current multiplied by voltage (P = V × I). Without knowing the voltage, you cannot determine how much energy each unit of charge carries. It's analogous to asking how much work water can do without knowing the water pressure — you know the flow rate (amps/gallons per minute) but not the pressure (volts/PSI) driving it."
    },
    {
      q: "What is the difference between real power (W), apparent power (VA), and reactive power (VAR)?",
      a: "Real Power (P) in watts (W) performs actual work — turning motors, producing heat, emitting light. Apparent Power (S) in volt-amperes (VA) is the total power drawn from the supply (V × I). Reactive Power (Q) in volt-amperes reactive (VAR) is stored and released by inductive and capacitive elements without being consumed. The power triangle relates them: S² = P² + Q², and Power Factor = P ÷ S. Generators, transformers, and UPS systems are rated in VA or kVA because they must supply apparent power regardless of load power factor."
    },
    {
      q: "What is the 80% continuous load rule for circuit breakers?",
      a: "Per NEC Section 210.19 and 210.20, circuit breakers should not be loaded beyond 80% of their rating for continuous loads (defined as loads running 3 hours or more). A 20A breaker supports 16A continuous. At 120V: 16A × 120V = 1,920W max continuous. At 240V: 16A × 240V = 3,840W. Non-continuous loads can use 100% of the breaker rating. Exceeding 80% on continuous loads causes thermal stress on the breaker trip mechanism and shortens breaker service life. This is why a 15A circuit should not exceed 1,440W continuous."
    },
    {
      q: "How do I convert milliamps (mA) to watt hours?",
      a: "First convert mA to amps by dividing by 1,000: Amps = mA ÷ 1,000. Then multiply by voltage and time: Watt-hours = Amps × Volts × Hours. Example: 500mA at 5V for 2 hours = (500/1000) × 5V × 2h = 0.5A × 5V × 2h = 5Wh. This is common for USB power banks, phone batteries, and small electronics. A 10,000mAh USB power bank at 3.7V stores (10000/1000) × 3.7 = 37Wh. Use our Amp to Watt Hours calculator tool above for instant conversions with efficiency factors."
    }
  ];

  const RESISTANCE_VALUES = {
    copper: { 14: 0.002525, 12: 0.001588, 10: 0.000999, 8: 0.000628, 6: 0.000395 },
    aluminum: { 14: 0.00408, 12: 0.00256, 10: 0.00161, 8: 0.00101, 6: 0.00064 }
  };

  // ===== INITIALIZATION =====

  function init() {
    initDeviceGrid();
    initReferenceTable();
    initFAQ();
    initLanguageButtons();
    initHeadingVisuals();
    initLiveCalculatorControls();
    initMainQuickPresets();
    if (document.getElementById('main-type')) {
      togglePFGroup();
      updateVisuals(10, 230, 0);
      calcMain();
    }
    if (document.getElementById('premium-type')) {
      togglePremiumPFGroup();
      calcPremiumWattsToAmps();
    }
    if (document.getElementById('ah-amps')) calcAmpHours();
    if (document.getElementById('va-amps')) calcVA();
    if (document.getElementById('vd-amps')) calcVoltageDrop();
    if (document.getElementById('pf-watts')) calcPF();
    if (document.getElementById('wg-amps')) calcWireGauge();
  }


  function initMainQuickPresets() {
    const presets = document.querySelectorAll('.main-quick-preset');
    if (!presets.length) return;

    presets.forEach(button => {
      button.addEventListener('click', () => {
        const type = button.dataset.type || 'ac1';
        const amps = button.dataset.amps || '10';
        const volts = button.dataset.volts || '120';
        const pf = button.dataset.pf || '1';

        document.getElementById('main-type').value = type;
        document.getElementById('main-amps').value = amps;
        document.getElementById('main-volts').value = volts;
        document.getElementById('main-pf').value = pf;
        togglePFGroup();
        calcMain();
      });
    });
  }
  function initLiveCalculatorControls() {
    const liveIds = [
      'main-type', 'main-amps', 'main-volts', 'main-freq', 'main-pf',
      'premium-type', 'premium-watts', 'premium-volts', 'premium-freq', 'premium-pf', 'premium-efficiency',
      'ah-amps', 'ah-volts', 'ah-hours', 'ah-eff', 'ah-type',
      'va-amps', 'va-volts', 'va-type',
      'vd-amps', 'vd-volts', 'vd-dist', 'vd-gauge', 'vd-material',
      'pf-watts', 'pf-va', 'pf-volts',
      'wg-amps', 'wg-volts', 'wg-temp', 'wg-install'
    ];

    liveIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', handleLiveCalculatorInput);
      el.addEventListener('change', handleLiveCalculatorInput);
    });
  }

  function handleLiveCalculatorInput(event) {
    const id = event.target.id;
    if (id.indexOf('main-') === 0) {
      if (id === 'main-type') togglePFGroup();
      calcMain();
      return;
    }

    if (id.indexOf('premium-') === 0) {
      if (id === 'premium-type') togglePremiumPFGroup();
      calcPremiumWattsToAmps();
      return;
    }

    if (id.indexOf('ah-') === 0) calcAmpHours();
    if (id.indexOf('va-') === 0) calcVA();
    if (id.indexOf('vd-') === 0) calcVoltageDrop();
    if (id.indexOf('pf-') === 0) calcPF();
    if (id.indexOf('wg-') === 0) calcWireGauge();
  }

  // ===== LANGUAGE BUTTONS INITIALIZATION =====

  function getActiveLanguage() {
    return document.documentElement.lang || 'en';
  }

  function normalizePhraseKey(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function loadTranslationJson(lang) {
    if (lang === 'en' || EXTERNAL_TRANSLATION_CACHE[lang]) {
      return Promise.resolve(EXTERNAL_TRANSLATION_CACHE[lang] || {});
    }
    return fetch('/translations/' + lang + '.json', { cache: 'force-cache' })
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        const phrases = data.phrases || data || {};
        const normalizedPhrases = {};
        Object.keys(phrases).forEach((key) => {
          const normalized = normalizePhraseKey(key);
          if (normalized) normalizedPhrases[normalized] = phrases[key];
        });
        TRANSLATIONS[lang] = Object.assign({}, TRANSLATIONS[lang] || {}, phrases, normalizedPhrases);
        EXTERNAL_TRANSLATION_CACHE[lang] = phrases;
        return phrases;
      })
      .catch(() => ({}));
  }

  function translatePhrase(text, lang = getActiveLanguage()) {
    if (lang === 'en') return text;
    const raw = String(text || '');
    const normalized = normalizePhraseKey(raw);
    const map = TRANSLATIONS[lang] || {};
    return map[raw] || map[normalized] || raw;
  }

  function createTranslationChunks(phrases, charLimit = MACHINE_TRANSLATION_BATCH_LIMIT) {
    const chunks = [];
    let current = [];
    let size = 0;

    phrases.forEach((phrase) => {
      const candidate = String(phrase || '');
      if (!candidate) return;
      const nextSize = size + candidate.length + (current.length ? MACHINE_TRANSLATION_SEPARATOR.length : 0);
      if (current.length && nextSize > charLimit) {
        chunks.push(current);
        current = [candidate];
        size = candidate.length;
      } else {
        current.push(candidate);
        size = nextSize;
      }
    });

    if (current.length) chunks.push(current);
    return chunks;
  }

  function requestMachineTranslation(lang, chunk) {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'en',
      tl: lang,
      dt: 't',
      q: chunk.join(MACHINE_TRANSLATION_SEPARATOR)
    });

    return fetch(MACHINE_TRANSLATION_ENDPOINT + '?' + params.toString(), { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!Array.isArray(data) || !Array.isArray(data[0])) return [];
        const translatedJoined = data[0].map((part) => (Array.isArray(part) ? (part[0] || '') : '')).join('');
        const translatedParts = translatedJoined.split(MACHINE_TRANSLATION_SEPARATOR);

        if (translatedParts.length === chunk.length) {
          return translatedParts.map((item) => item.trim());
        }

        return chunk.map((item) => item);
      })
      .catch(() => chunk.map((item) => item));
  }

  function loadMachineTranslations(lang, phrases) {
    if (lang === 'en') return Promise.resolve();
    const targetMap = TRANSLATIONS[lang] || (TRANSLATIONS[lang] = {});
    const uniqueMissing = Array.from(new Set(
      phrases
        .map((item) => normalizePhraseKey(item))
        .filter((item) => item && !targetMap[item])
    ));

    if (!uniqueMissing.length) return Promise.resolve();
    const inflightKey = lang + '::' + uniqueMissing.join('|');
    if (MACHINE_TRANSLATION_INFLIGHT[inflightKey]) {
      return MACHINE_TRANSLATION_INFLIGHT[inflightKey];
    }

    const cacheBucket = MACHINE_TRANSLATION_CACHE[lang] || (MACHINE_TRANSLATION_CACHE[lang] = {});
    const pending = uniqueMissing.filter((item) => !cacheBucket[item]);
    if (!pending.length) {
      uniqueMissing.forEach((source) => {
        targetMap[source] = cacheBucket[source];
      });
      return Promise.resolve();
    }

    const chunks = createTranslationChunks(pending);
    const request = Promise.all(chunks.map((chunk) => requestMachineTranslation(lang, chunk)))
      .then((translatedChunkList) => {
        translatedChunkList.forEach((translatedChunk, chunkIndex) => {
          const sourceChunk = chunks[chunkIndex];
          sourceChunk.forEach((source, idx) => {
            const translated = translatedChunk[idx] || source;
            cacheBucket[source] = translated;
            targetMap[source] = translated;
          });
        });
      })
      .finally(() => {
        delete MACHINE_TRANSLATION_INFLIGHT[inflightKey];
      });

    MACHINE_TRANSLATION_INFLIGHT[inflightKey] = request;
    return request;
  }

  function applyLanguageToNodes(nodes, selectedLang) {
    nodes.forEach((node) => {
      if (!node.__i18nOriginal) node.__i18nOriginal = node.nodeValue;
      const original = node.__i18nOriginal;
      const trimmed = original.trim();
      if (!trimmed) return;

      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = leading + translatePhrase(trimmed, selectedLang) + trailing;
    });
  }

  function getTranslatableTextNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, textarea, input, select, .language-buttons')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function applyLanguage(lang) {
    const selectedLang = LANGUAGE_META[lang] ? lang : 'en';
    const meta = LANGUAGE_META[selectedLang];

    document.documentElement.lang = selectedLang;
    document.documentElement.dir = meta.dir;
    document.body.classList.toggle('is-rtl', meta.dir === 'rtl');

    const textNodes = getTranslatableTextNodes();
    applyLanguageToNodes(textNodes, selectedLang);

    if (selectedLang !== 'en') {
      const originals = textNodes
        .map((node) => normalizePhraseKey(node.__i18nOriginal || node.nodeValue))
        .filter(Boolean);
      loadMachineTranslations(selectedLang, originals).then(() => {
        if (getActiveLanguage() !== selectedLang) return;
        applyLanguageToNodes(getTranslatableTextNodes(), selectedLang);
      });
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === selectedLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    if (document.getElementById('main-type')) {
      calcMain();
    }
    const status = document.getElementById('language-status');
    if (status) {
      status.textContent = selectedLang === 'en'
        ? 'Language set to English.'
        : 'Language changed to ' + meta.name + '. Some technical formulas and legal terms may remain in English for accuracy.';
    }
  }

  function initLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    if (!langButtons.length) return;

    const languageWrap = document.querySelector('.footer-languages');
    if (languageWrap && !document.getElementById('language-status')) {
      const status = document.createElement('p');
      status.id = 'language-status';
      status.className = 'language-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      languageWrap.appendChild(status);
    }

    langButtons.forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function() {
        applyLanguage(this.getAttribute('data-lang') || 'en');
      });
    });

    localStorage.removeItem('preferredLanguage');
    localStorage.removeItem('siteLanguage');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }

  // ===== DEVICE GRID INITIALIZATION =====

  function initDeviceGrid() {
    const grid = document.getElementById('device-grid');
    if (!grid) return;

    grid.innerHTML = DEVICES.map(d =>
      `<div class="device-chip" onclick="window.loadDevice('${d.name.replace(/'/g, "\\'")}', ${d.watts})" role="listitem" tabindex="0" onkeydown="if(event.key==='Enter')window.loadDevice('${d.name.replace(/'/g, "\\'")}', ${d.watts})">
        <div class="device-name">${d.name}</div>
        <div class="device-watt">${d.watts}W</div>
      </div>`
    ).join('');
  }

  function getHeadingVisualType(text) {
    const value = text.toLowerCase();
    if (value.includes('three') || value.includes('3 phase')) return ['3P', 'three phase path'];
    if (value.includes('battery') || value.includes('12v') || value.includes('dc')) return ['DC', 'battery circuit'];
    if (value.includes('ac') || value.includes('power factor')) return ['PF', 'AC power factor'];
    if (value.includes('amp') || value.includes('current')) return ['A', 'current draw'];
    if (value.includes('watt') || value.includes('power') || value.includes('kw')) return ['W', 'power output'];
    if (value.includes('volt')) return ['V', 'voltage input'];
    if (value.includes('wire') || value.includes('breaker') || value.includes('load')) return ['LD', 'load planning'];
    return ['FX', 'formula flow'];
  }

  function initHeadingVisuals() {
    if (!document.querySelector('.mini-tool-calculator, .calculator-section, .seo-chart-visual')) return;
    const formulaNode = document.querySelector('.seo-visual-formula');
    const mainCalc = document.querySelector('.mini-tool-calculator');
    const formula = formulaNode ? formulaNode.textContent.trim() : 'W = A x V x PF';
    const volts = mainCalc && mainCalc.dataset.defaultVolts ? mainCalc.dataset.defaultVolts + ' V' : 'V';
    const selector = [
      'main .content-card h2',
      'main .content-card h3',
      'main .topic-copy h2',
      'main .topic-copy h3'
    ].join(',');

    document.querySelectorAll(selector).forEach((heading) => {
      if (
        heading.closest('.static-faq-card, .calculator-section, .premium-visual-section, .sub-calculator-section, .seo-chart-visual') ||
        (heading.nextElementSibling && heading.nextElementSibling.classList.contains('heading-technical-visual'))
      ) {
        return;
      }

      const visualType = getHeadingVisualType(heading.textContent || '');
      const tag = visualType[0];
      const label = visualType[1];
      const visual = document.createElement('button');
      visual.type = 'button';
      visual.className = 'heading-technical-visual';
      visual.setAttribute('aria-expanded', 'false');
      visual.innerHTML = `
        <span class="heading-visual-svg" aria-hidden="true">
          <svg viewBox="0 0 360 118" focusable="false">
            <rect x="16" y="28" width="76" height="52" rx="12"></rect>
            <path d="M92 54 H144"></path>
            <circle cx="162" cy="54" r="18"></circle>
            <path d="M180 54 H242"></path>
            <rect x="242" y="28" width="100" height="52" rx="12"></rect>
            <text x="54" y="59" text-anchor="middle">${tag}</text>
            <text x="162" y="59" text-anchor="middle">=</text>
            <text x="292" y="52" text-anchor="middle">RESULT</text>
            <text x="292" y="68" text-anchor="middle">${volts}</text>
          </svg>
        </span>
        <span class="heading-visual-copy">
          <strong>${label}</strong>
          <em>${formula}</em>
          <small>Tap to view the calculation path for this heading.</small>
        </span>
        <span class="heading-visual-more" aria-hidden="true">+</span>
      `;
      visual.addEventListener('click', () => {
        const expanded = visual.classList.toggle('is-expanded');
        visual.setAttribute('aria-expanded', String(expanded));
      });
      heading.insertAdjacentElement('afterend', visual);
    });
  }

  // ===== REFERENCE TABLE INITIALIZATION =====

  function initReferenceTable() {
    const table = document.getElementById('ref-table-120');
    if (!table) return;

    table.innerHTML = REF_TABLE_AMPS.map(a =>
      `<tr><td>${a} A</td><td>120 V</td><td>${a * 120} W</td></tr>`
    ).join('');
  }

  // ===== FAQ INITIALIZATION =====

  function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = FAQ_DATA.map((f, i) =>
      `<div class="faq-item" role="listitem">
        <button class="faq-q" onclick="window.toggleFaq(this)" aria-expanded="false" aria-controls="faq-answer-${i}">
          <span>${f.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-a" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    ).join('');
  }

  // ===== UI UTILITIES =====

  function toggleFaq(btn) {
    const ans = btn.nextElementSibling;
    const isOpen = ans.classList.contains('open');

    // Close all FAQs
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
    });

    // Open clicked FAQ if wasn't open
    if (!isOpen) {
      ans.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  window.toggleFaq = toggleFaq;

  function togglePFGroup() {
    const type = document.getElementById('main-type').value;
    const pfGroup = document.getElementById('main-pf-group');

    if (type === 'dc') {
      pfGroup.style.opacity = '0.4';
      pfGroup.style.pointerEvents = 'none';
      document.getElementById('main-pf').value = '1';
    } else {
      pfGroup.style.opacity = '1';
      pfGroup.style.pointerEvents = 'auto';
      if (document.getElementById('main-pf').value === '1') {
        document.getElementById('main-pf').value = '0.85';
      }
    }
  }

  window.togglePFGroup = togglePFGroup;

  // ===== VISUAL UPDATE =====

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updateMainRules(type, amps, volts, pf, watts) {
    const formula = type === 'dc'
      ? 'P = A x V'
      : type === 'ac1'
        ? 'P = A x V x PF'
        : 'P = 1.732 x A x V x PF';
    const breaker = Math.max(15, Math.ceil((amps || 0) / 0.8));
    const loadNote = amps > 0
      ? `Approx. continuous breaker target: ${breaker} A or larger`
      : 'Continuous loads should stay at 80% of breaker rating.';
    const safety = type === 'dc'
      ? 'DC uses direct voltage and does not need power factor.'
      : (pf < 0.8 ? 'Low PF increases apparent power and conductor current.' : 'Use RMS voltage and actual equipment power factor.');

    setText('main-rule-formula', formula);
    setText('main-rule-load', loadNote);
    setText('main-rule-safety', safety);
    setText('hero-live-output', formatPowerValue(watts));
  }

  function updatePremiumRules(type, watts, volts, pf, efficiency, amps) {
    const formula = type === 'dc'
      ? 'A = W / (V x efficiency)'
      : type === 'ac1'
        ? 'A = W / (V x PF x efficiency)'
        : 'A = W / (1.732 x V x PF x efficiency)';
    const breaker = amps > 0 ? Math.ceil(amps * 1.25) : 0;
    const breakerText = breaker
      ? `Estimated breaker minimum: ${breaker} A before code-specific rounding.`
      : 'Breaker estimate uses 125% load sizing.';
    const safety = efficiency < 0.9
      ? 'Lower efficiency raises input current and heat.'
      : 'Verify nameplate watts before final circuit sizing.';

    setText('premium-rule-formula', formula);
    setText('premium-rule-breaker', breakerText);
    setText('premium-rule-safety', safety);
  }

  function formatPowerValue(watts) {
    if (!watts || watts <= 0) return '—';
    if (watts >= 1e6) return (watts / 1e6).toFixed(2) + ' MW';
    if (watts >= 1e3) return (watts / 1e3).toFixed(2) + ' kW';
    return watts.toFixed(0) + ' W';
  }

  function getCircuitLabel(type) {
    if (type === 'dc') return 'DC Circuit';
    if (type === 'ac1') return 'AC Single-Phase';
    return 'AC Three-Phase';
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateCircuitDiagram(amps, volts, watts, type, pf) {
    const card = document.getElementById('circuit-diagram-card');
    if (!card) return;

    const safeWatts = Number.isFinite(watts) && watts > 0 ? watts : 0;
    const safeAmps = Number.isFinite(amps) && amps > 0 ? amps : 0;
    const safeVolts = Number.isFinite(volts) && volts > 0 ? volts : 0;
    const loadPct = Math.min(safeWatts / 30000, 1);
    const currentPct = Math.min(safeAmps / 50, 1);
    const status = safeWatts === 0 ? 'Waiting for input' : loadPct < 0.7 ? 'Normal load' : loadPct < 0.9 ? 'High load' : 'Overload risk';
    const statusClass = safeWatts === 0 ? 'idle' : loadPct < 0.7 ? 'normal' : loadPct < 0.9 ? 'warning' : 'danger';
    const flowSpeed = Math.max(0.65, 3.2 - (loadPct * 2.2));
    const wireWidth = (5 + currentPct * 6).toFixed(2);

    card.classList.remove('idle', 'normal', 'warning', 'danger');
    card.classList.add(statusClass);
    card.style.setProperty('--flow-speed', flowSpeed.toFixed(2) + 's');
    card.style.setProperty('--wire-width', wireWidth);
    card.style.setProperty('--house-glow', (0.25 + loadPct * 0.55).toFixed(2));

    // Keep circuit labels connected to the active footer language selection.
    setText('circuit-status', translatePhrase(status));
    setText('diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '— V');
    setText('diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '— A');
    setText('diagram-phase', translatePhrase(getCircuitLabel(type)));
    setText('circuit-status', status);
    setText('diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '— V');
    setText('diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '— A');
    setText('diagram-phase', getCircuitLabel(type));
    setText('diagram-power', formatPowerValue(safeWatts));
    setText('diagram-load', formatPowerValue(safeWatts));
    setText('diagram-pf', type === 'dc' ? 'DC mode' : 'PF ' + (pf || 1).toFixed(2));

    const breaker = document.getElementById('diagram-breaker-switch');
    if (breaker) {
      breaker.setAttribute('fill', statusClass === 'danger' ? '#ef4444' : statusClass === 'warning' ? '#f59e0b' : '#16a34a');
    }
  }
  function updateVisuals(amps, volts, watts, type = 'ac3', pf = 0.85) {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    const setBar = (id, pct, label) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.width = pct + '%';
      if (el.parentElement) {
        el.parentElement.setAttribute('aria-valuenow', Math.round(pct));
        el.parentElement.setAttribute('aria-label', label + ' level ' + Math.round(pct) + ' percent');
      }
    };

    setText('visual-voltage', volts.toFixed(1) + ' V');
    setText('visual-current', amps.toFixed(2) + ' A');
    setText('visual-power', watts > 0 ? watts.toFixed(2) + ' W' : '— W');

    const vPct = Math.min((volts / 500) * 100, 100);
    const aPct = Math.min((amps / 50) * 100, 100);
    const wPct = Math.min((watts / 30000) * 100, 100);

    setBar('visual-bar-voltage', vPct, 'Voltage');
    setBar('visual-bar-current', aPct, 'Current');
    setBar('visual-bar-power', wPct, 'Power');

    setText('visual-kw', watts > 0 ? (watts / 1000).toFixed(3) + ' kW' : '—');
    setText('visual-hp', watts > 0 ? (watts / 746).toFixed(3) + ' HP' : '—');
    setText('visual-btu', watts > 0 ? (watts * 3.412).toFixed(1) + ' BTU' : '—');
    updateCircuitDiagram(amps, volts, watts, type, pf);
  }

  // Interactive How-It-Works Diagram Update
  function updateHIWDiagram(amps, volts, watts, type, pf, va, var_power, btu, hp) {
    const formatNumber = (num, decimals = 2) => num ? num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals }) : '0';

    // 1. Update Input Nodes
    setText('hiw-amps-val', `${formatNumber(amps)} Amps`);
    setText('hiw-volts-val', `${formatNumber(volts)} Volts`);
    setText('hiw-pf-val', type === 'dc' ? 'Power Factor: N/A (DC)' : `Power Factor: ${pf.toFixed(2)}`);

    // Update Input Chips
    setText('hiw-chip-amps', `${formatNumber(amps)} A`);
    setText('hiw-chip-volts', `${formatNumber(volts)} V`);
    setText('hiw-chip-pf', type === 'dc' ? 'DC' : `PF ${pf.toFixed(2)}`);

    // 2. Update Engine Node
    const engineCircuitEl = document.getElementById('hiw-engine-circuit');
    const badgeEl = document.getElementById('hiw-circuit-badge');
    const formulaEl = document.getElementById('hiw-engine-formula');
    const stepFormulaEl = document.getElementById('hiw-step-formula');
    const engineStepEl = document.getElementById('hiw-engine-step');

    let circuitLabel = '';
    let formulaText = '';
    let stepText = '';

    if (type === 'dc') {
      circuitLabel = 'DC Circuit';
      formulaText = 'W = A × V';
      stepText = `${formatNumber(amps)} × ${formatNumber(volts)}`;
    } else if (type === 'ac1') {
      circuitLabel = 'AC Single-Phase';
      formulaText = 'W = PF × A × V';
      stepText = `${pf.toFixed(2)} × ${formatNumber(amps)} × ${formatNumber(volts)}`;
    } else {
      circuitLabel = 'AC Three-Phase';
      formulaText = 'W = 1.732 × PF × A × V';
      stepText = `1.732 × ${pf.toFixed(2)} × ${formatNumber(amps)} × ${formatNumber(volts)}`;
    }

    if (engineCircuitEl) engineCircuitEl.textContent = circuitLabel;
    if (badgeEl) badgeEl.textContent = circuitLabel.toUpperCase();
    if (formulaEl) formulaEl.textContent = formulaText;
    if (stepFormulaEl) stepFormulaEl.textContent = formulaText;
    if (engineStepEl) engineStepEl.textContent = stepText;

    // 3. Update Output Nodes
    let kw = watts / 1000;
    
    setText('hiw-watts-val', formatNumber(watts));
    setText('hiw-kw-val', `${formatNumber(kw)} kW`);
    setText('hiw-hp-val', `${formatNumber(hp)} HP | ${formatNumber(btu, 0)} BTU/hr`);
    
    setText('hiw-va-val', `${formatNumber(va)} VA`);
    if (type === 'dc') {
      setText('hiw-var-val', 'Reactive: 0 VAR (DC)');
    } else {
      setText('hiw-var-val', `Reactive: ${formatNumber(var_power)} VAR`);
    }

    // Update Output Chips
    setText('hiw-chip-watts', `${formatNumber(watts)} W`);
    setText('hiw-chip-kw', `${formatNumber(kw)} kW`);
  }
  
  // ===== MAIN CALCULATOR =====


  function calcMain() {
    const type = document.getElementById('main-type').value;
    const amps = parseFloat(document.getElementById('main-amps').value);
    const volts = parseFloat(document.getElementById('main-volts').value);
    const pf = parseFloat(document.getElementById('main-pf').value) || 1;
    const freq = parseFloat(document.getElementById('main-freq') ? document.getElementById('main-freq').value : 50);
    const errorEl = document.getElementById('main-error');
    const resultEl = document.getElementById('main-result');

    errorEl.removeAttribute('role');
    errorEl.style.display = 'none';

    if (!amps || !volts || amps <= 0 || volts <= 0) {
      updateVisuals(amps || 0, volts || 0, 0, type, pf);
      updateMainRules(type, amps || 0, volts || 0, pf, 0);
      resultEl.classList.remove('show');
      updateGauge(0);
      return;
    }

    if (type !== 'dc' && (pf < 0.1 || pf > 1)) {
      errorEl.textContent = 'Power factor must be between 0.1 and 1.0 for AC circuits.';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.display = 'block';
      resultEl.classList.remove('show');
      updateVisuals(amps || 0, volts || 0, 0, type, pf);
      updateMainRules(type, amps || 0, volts || 0, pf, 0);
      updateGauge(0);
      return;
    }

    let watts, va, var_power;

    if (type === 'dc') {
      watts = amps * volts;
      va = watts;
      var_power = 0;
    } else if (type === 'ac1') {
      watts = amps * volts * pf;
      va = amps * volts;
      var_power = Math.sqrt(va * va - watts * watts);
    } else {
      watts = 1.732 * amps * volts * pf;
      va = 1.732 * amps * volts;
      var_power = Math.sqrt(va * va - watts * watts);
    }

    // Auto unit switching
    let displayVal = watts;
    let displayUnit = 'W';
    if (watts >= 1e6) {
      displayVal = watts / 1e6;
      displayUnit = 'MW';
    } else if (watts >= 1e3) {
      displayVal = watts / 1e3;
      displayUnit = 'kW';
    }

    // Calculate additional metrics
    const efficiency = type === 'dc' ? 100 : (pf * 100);
    const btuPerHour = watts * 3.412;
    const horsepower = watts / 745.7;

    document.getElementById('main-watt').textContent = displayVal.toFixed(3);
    document.getElementById('main-watt-unit').innerHTML = `${displayUnit} | <span id="main-va-out">${va.toFixed(2)}</span> VA | PF: <span id="main-pf-out">${(watts / va).toFixed(4)}</span> | kWh/100h: <span id="main-kwh">${(watts * 100 / 1000).toFixed(2)} kWh</span>`;

    // Update detailed results
    document.getElementById('main-va-detail').textContent = va.toFixed(2) + ' VA';
    document.getElementById('main-var-detail').textContent = var_power.toFixed(2) + ' VAR';
    document.getElementById('main-pf-detail').textContent = (watts / va).toFixed(4);
    document.getElementById('main-eff-detail').textContent = efficiency.toFixed(1) + '%';
    document.getElementById('main-btu-detail').textContent = btuPerHour.toFixed(0) + ' BTU/hr';
    document.getElementById('main-hp-detail').textContent = horsepower.toFixed(3) + ' HP';

    resultEl.classList.add('show');
    updateVisuals(amps, volts, watts, type, pf);
    updateMainRules(type, amps, volts, pf, watts);
    updateGauge(watts);
    updateHIWDiagram(amps, volts, watts, type, pf, va, var_power, btuPerHour, horsepower);
  }

  // Visual gauge for power
  function updateGauge(watts) {
    const arc = document.getElementById('main-gauge-arc');
    const label = document.getElementById('main-gauge-label');
    if (!arc || !label) return;
    // Max 20kW for gauge
    const maxW = 20000;
    const pct = Math.min(watts / maxW, 1);
    // Arc from 20,90 to 160,90 (semi-circle)
    const r = 70, cx = 90, cy = 90;
    const start = Math.PI, end = Math.PI * (1 - pct);
    const x1 = cx - r * Math.cos(start), y1 = cy - r * Math.sin(start);
    const x2 = cx - r * Math.cos(end), y2 = cy - r * Math.sin(end);
    const largeArc = pct > 0.5 ? 1 : 0;
    arc.setAttribute('d', `M20,90 A70,70 0 ${largeArc},1 ${x2},${y2}`);
    arc.setAttribute('stroke', pct < 0.7 ? '#16a34a' : pct < 0.9 ? '#f59e0b' : '#ef4444');
    label.textContent = watts >= 1e6 ? (watts/1e6).toFixed(2)+' MW' : watts >= 1e3 ? (watts/1e3).toFixed(2)+' kW' : watts.toFixed(0)+' W';
  }

  // Copy/export result
  function copyMainResult() {
    const val = document.getElementById('main-watt').textContent;
    const unit = document.getElementById('main-watt-unit').textContent;
    navigator.clipboard.writeText(`Result: ${val} ${unit}`);
    alert('Result copied!');
  }
  window.copyMainResult = copyMainResult;

  function exportMainResult() {
    const val = document.getElementById('main-watt').textContent;
    const unit = document.getElementById('main-watt-unit').textContent;
    const blob = new Blob([`Result: ${val} ${unit}`], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'amps-to-watts-result.txt';
    a.click();
  }
  window.exportMainResult = exportMainResult;

  window.calcMain = calcMain;

  function resetMain() {
    document.getElementById('main-amps').value = '10';
    document.getElementById('main-volts').value = '230';
    document.getElementById('main-pf').value = '0.85';
    document.getElementById('main-type').value = 'ac3';
    document.getElementById('main-result').classList.remove('show');
    document.getElementById('main-error').style.display = 'none';
    togglePFGroup();
    updateVisuals(10, 230, 0);
    calcMain();
  }

  window.resetMain = resetMain;

  function loadDevice(name, watts) {
    document.getElementById('main-amps').value = (watts / 230).toFixed(3);
    document.getElementById('main-volts').value = '230';
    document.getElementById('main-type').value = 'ac1';
    document.getElementById('main-pf').value = '1';
    togglePFGroup();
    calcMain();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.loadDevice = loadDevice;

  // ===== TOOL: AMP HOURS TO WATT HOURS =====

  function calcAmpHours() {
    const a = parseFloat(document.getElementById('ah-amps').value);
    const v = parseFloat(document.getElementById('ah-volts').value);
    const h = parseFloat(document.getElementById('ah-hours').value);
    const eff = parseFloat(document.getElementById('ah-eff').value) / 100;
    const type = document.getElementById('ah-type').value;

    if (!a || !v || !h || a <= 0 || v <= 0 || h <= 0) return;

    let wh = a * v * h * eff;
    if (type === 'ac1') wh *= 0.9;

    document.getElementById('ah-wh').textContent = wh.toFixed(2);
    document.getElementById('ah-kwh').textContent = (wh / 1000).toFixed(4);
    setText('visual-ah', a.toFixed(2) + ' Ah');
    setText('visual-volts', v.toFixed(1) + ' V');
    setText('visual-wh', wh.toFixed(2) + ' Wh');
    setText('battery-capacity', wh.toFixed(0) + ' Wh');
    document.getElementById('ah-result').classList.add('show');
  }

  window.calcAmpHours = calcAmpHours;

  // ===== TOOL: VOLT-AMPS =====

  function calcVA() {
    const a = parseFloat(document.getElementById('va-amps').value);
    const v = parseFloat(document.getElementById('va-volts').value);
    const t = document.getElementById('va-type').value;

    if (!a || !v || a <= 0 || v <= 0) return;

    const va = t === 'ac3' ? 1.732 * a * v : a * v;

    document.getElementById('va-val').textContent = va.toFixed(2);
    document.getElementById('va-watt').textContent = (va * 0.85).toFixed(2);
    setText('visual-amps', a.toFixed(2) + ' A');
    setText('visual-volts', v.toFixed(1) + ' V');
    setText('visual-va', va.toFixed(2) + ' VA');
    setText('diagram-current', a.toFixed(2) + ' A');
    setText('diagram-voltage', v.toFixed(1) + ' V');
    setText('diagram-va', va.toFixed(0) + ' VA');
    document.getElementById('va-result').classList.add('show');
  }

  window.calcVA = calcVA;

  // ===== TOOL: WATT TO AMPS =====

  function calcWattToAmps() {
    const w = parseFloat(document.getElementById('wa-watts').value);
    const v = parseFloat(document.getElementById('wa-volts').value);
    const pf = parseFloat(document.getElementById('wa-pf').value);
    const t = document.getElementById('wa-type').value;

    if (!w || !v || w <= 0 || v <= 0) return;

    let a;
    if (t === 'dc') {
      a = w / v;
    } else if (t === 'ac1') {
      a = w / (v * pf);
    } else {
      a = w / (1.732 * v * pf);
    }

    document.getElementById('wa-amps').textContent = a.toFixed(4);
    document.getElementById('wa-result').classList.add('show');
  }

  window.calcWattToAmps = calcWattToAmps;

  // ===== TOOL: VOLTAGE DROP =====

  function calcVoltageDrop() {
    const a = parseFloat(document.getElementById('vd-amps').value);
    const v = parseFloat(document.getElementById('vd-volts').value);
    const d = parseFloat(document.getElementById('vd-dist').value);
    const g = document.getElementById('vd-gauge').value;
    const m = document.getElementById('vd-material').value;

    if (!a || !v || !d || a <= 0 || v <= 0 || d <= 0) return;

    const resistance = RESISTANCE_VALUES[m][g] || 0.001588;
    const drop = 2 * a * resistance * d;

    document.getElementById('vd-drop').textContent = drop.toFixed(3);
    document.getElementById('vd-pct').textContent = ((drop / v) * 100).toFixed(2);
    document.getElementById('vd-end').textContent = (v - drop).toFixed(1);
    setText('vd-visual-amps', a.toFixed(2) + ' A');
    setText('vd-visual-volts', v.toFixed(1) + ' V');
    setText('vd-visual-drop', drop.toFixed(3) + ' V');
    setText('vd-diagram-drop', drop.toFixed(2) + ' V drop');
    document.getElementById('vd-result').classList.add('show');
  }

  window.calcVoltageDrop = calcVoltageDrop;

  // ===== TOOL: POWER FACTOR =====

  function calcPF() {
    const w = parseFloat(document.getElementById('pf-watts').value);
    const va = parseFloat(document.getElementById('pf-va').value);
    const v = parseFloat(document.getElementById('pf-volts').value);

    if (!w || !va || !v || w <= 0 || va <= 0 || v <= 0) return;

    const pf = w / va;
    const varVal = Math.sqrt(Math.max(0, va * va - w * w));

    document.getElementById('pf-val').textContent = pf.toFixed(4);
    document.getElementById('pf-amps').textContent = (va / v).toFixed(3);
    document.getElementById('pf-var').textContent = varVal.toFixed(2);
    setText('pf-visual-volts', v.toFixed(1) + ' V');
    setText('pf-visual-watts', w.toFixed(0) + ' W');
    setText('pf-visual-va', va.toFixed(0) + ' VA');
    setText('pf-diagram-pf', 'PF = ' + pf.toFixed(3));
    document.getElementById('pf-result').classList.add('show');
  }

  window.calcPF = calcPF;

  // ===== TOOL: WIRE GAUGE =====

  function calcWireGauge() {
    const a = parseFloat(document.getElementById('wg-amps').value);
    const v = parseFloat(document.getElementById('wg-volts').value);
    const temp = parseFloat(document.getElementById('wg-temp').value);
    const inst = document.getElementById('wg-install').value;

    if (!a || !v || a <= 0 || v <= 0) return;

    let derate = 1;
    if (temp > 30) derate *= (1 - (temp - 30) * 0.005);
    if (inst === 'conduit') derate *= 0.8;
    if (inst === 'buried') derate *= 0.7;

    const adjA = a / derate;
    let g;

    if (adjA <= 15) g = '14 AWG';
    else if (adjA <= 20) g = '12 AWG';
    else if (adjA <= 30) g = '10 AWG';
    else if (adjA <= 40) g = '8 AWG';
    else if (adjA <= 55) g = '6 AWG';
    else if (adjA <= 70) g = '4 AWG';
    else g = '2 AWG+';

    document.getElementById('wg-size').textContent = g;
    document.getElementById('wg-maxw').textContent = (a * v).toFixed(0);
    setText('wg-visual-amps', a.toFixed(2) + ' A');
    setText('wg-visual-volts', v.toFixed(1) + ' V');
    setText('wg-visual-size', g);
    setText('wg-diagram-size', g);
    document.getElementById('wg-result').classList.add('show');
  }

  window.calcWireGauge = calcWireGauge;

  // ===== LANGUAGE SWITCHER =====

  function switchLanguage(lang) {
    const code = lang || 'en';
    loadTranslationJson(code).then(() => applyLanguage(code));
  }

  window.switchLanguage = switchLanguage;

  // ===== PREMIUM WATTS TO AMPS CALCULATOR =====

  function togglePremiumPFGroup() {
    const type = document.getElementById('premium-type').value;
    const pfGroup = document.getElementById('premium-pf-group');
    const freqGroup = document.getElementById('premium-freq-group');

    if (type === 'dc') {
      pfGroup.style.display = 'none';
      freqGroup.style.display = 'none';
    } else {
      pfGroup.style.display = 'block';
      freqGroup.style.display = 'block';
    }
  }

  window.togglePremiumPFGroup = togglePremiumPFGroup;

  function calcPremiumWattsToAmps() {
    const type = document.getElementById('premium-type').value;
    const watts = parseFloat(document.getElementById('premium-watts').value);
    const volts = parseFloat(document.getElementById('premium-volts').value);
    const pf = parseFloat(document.getElementById('premium-pf').value) || 1;
    const efficiency = parseFloat(document.getElementById('premium-efficiency').value) / 100;
    const errorEl = document.getElementById('premium-error');
    const resultEl = document.getElementById('premium-result');

    errorEl.removeAttribute('role');
    errorEl.style.display = 'none';

    if (!watts || !volts || !efficiency || watts <= 0 || volts <= 0 || efficiency <= 0 || efficiency > 1) {
      updatePremiumCircuitVisuals(0, volts || 0, 0, type, pf, efficiency);
      updatePremiumRules(type, watts || 0, volts || 0, pf, efficiency, 0);
      resultEl.classList.remove('show');
      return;
    }

    if (type !== 'dc' && (pf < 0.1 || pf > 1)) {
      errorEl.textContent = 'Power factor must be between 0.1 and 1.0 for AC circuits.';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.display = 'block';
      resultEl.classList.remove('show');
      updatePremiumRules(type, watts || 0, volts || 0, pf, efficiency, 0);
      return;
    }

    // Adjust watts for efficiency
    const adjustedWatts = watts / efficiency;

    let apparentAmps, realAmps;

    if (type === 'dc') {
      realAmps = adjustedWatts / volts;
      apparentAmps = realAmps;
    } else if (type === 'ac1') {
      realAmps = adjustedWatts / (volts * pf);
      apparentAmps = adjustedWatts / volts;
    } else {
      realAmps = adjustedWatts / (1.732 * volts * pf);
      apparentAmps = adjustedWatts / (1.732 * volts);
    }

    // Calculate additional premium metrics
    const voltageDrop = realAmps * 0.02; // Estimated 2% voltage drop
    const breakerSize = Math.ceil(realAmps * 1.25); // 125% of load
    const wireGauge = getRecommendedWireGauge(realAmps, volts);

    document.getElementById('premium-amps').textContent = realAmps.toFixed(3);
    document.getElementById('premium-amps-unit').innerHTML = `Amperes (A) | <span id="premium-adjusted-watts">${adjustedWatts.toFixed(2)}</span> W adjusted | Efficiency: <span id="premium-eff-out">${(efficiency * 100).toFixed(1)}</span>%`;

    // Update premium details
    document.getElementById('premium-apparent-amps').textContent = apparentAmps.toFixed(3) + ' A';
    document.getElementById('premium-real-amps').textContent = realAmps.toFixed(3) + ' A';
    document.getElementById('premium-pf-detail').textContent = pf.toFixed(3);
    document.getElementById('premium-voltage-drop').textContent = voltageDrop.toFixed(2) + ' V';
    document.getElementById('premium-breaker-size').textContent = breakerSize + ' A';
    document.getElementById('premium-wire-gauge').textContent = wireGauge;

    resultEl.classList.add('show');
    updatePremiumCircuitVisuals(watts, volts, realAmps, type, pf, efficiency);
    updatePremiumRules(type, watts, volts, pf, efficiency, realAmps);
  }

  function getRecommendedWireGauge(amps, volts) {
    // Simple wire gauge recommendation based on current
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
    return '250+ MCM';
  }

  function updatePremiumCircuitVisuals(watts, volts, amps, type, pf, efficiency) {
    const safeWatts = Number.isFinite(watts) && watts > 0 ? watts : 0;
    const safeVolts = Number.isFinite(volts) && volts > 0 ? volts : 0;
    const safeAmps = Number.isFinite(amps) && amps > 0 ? amps : 0;
    const safeEfficiency = Number.isFinite(efficiency) && efficiency > 0 ? efficiency : 0;
    const loadPct = Math.min(safeAmps / 50, 1);
    const powerPct = Math.min(safeWatts / 30000, 1);
    const status = safeWatts === 0 ? 'Waiting for input' : loadPct < 0.7 ? 'Normal load' : loadPct < 0.9 ? 'High load' : 'Overload risk';
    const statusClass = safeWatts === 0 ? 'idle' : loadPct < 0.7 ? 'normal' : loadPct < 0.9 ? 'warning' : 'danger';
    const flowSpeed = Math.max(0.65, 3.2 - (Math.max(loadPct, powerPct) * 2.2));
    const wireWidth = (5 + loadPct * 6).toFixed(2);
    const card = document.getElementById('premium-circuit-diagram-card');

    setText('premium-visual-power', safeWatts ? safeWatts.toFixed(0) + ' W' : '- W');
    setText('premium-visual-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-metric-voltage', safeVolts ? safeVolts + ' V' : '- V');
    setText('premium-metric-pf', type === 'dc' ? '1.0' : pf.toFixed(3));
    setText('premium-metric-phase', type === 'dc' ? 'DC' : type === 'ac1' ? '1-Ph' : '3-Ph');
    setText('premium-metric-efficiency', (safeEfficiency * 100).toFixed(1) + '%');

    if (card) {
      card.classList.remove('idle', 'normal', 'warning', 'danger');
      card.classList.add(statusClass);
      card.style.setProperty('--flow-speed', flowSpeed.toFixed(2) + 's');
      card.style.setProperty('--wire-width', wireWidth);
      card.style.setProperty('--house-glow', (0.25 + loadPct * 0.55).toFixed(2));
    }

    setText('premium-status', status);
    setText('premium-diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '- V');
    setText('premium-diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-diagram-phase', getCircuitLabel(type));
    setText('premium-diagram-load', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-diagram-power', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');

    const breaker = document.getElementById('premium-diagram-breaker-switch');
    if (breaker) {
      breaker.setAttribute('fill', statusClass === 'danger' ? '#ef4444' : statusClass === 'warning' ? '#b45309' : '#15803d');
    }
  }

  function updatePremiumVisuals(watts, volts, amps, type, pf, efficiency) {
    updatePremiumCircuitVisuals(watts, volts, amps, type, pf, efficiency);
  }

  function copyPremiumResult() {
    const val = document.getElementById('premium-amps').textContent;
    const unit = document.getElementById('premium-amps-unit').textContent;
    navigator.clipboard.writeText(`Premium Result: ${val} ${unit}`);
    alert('Premium result copied!');
  }

  function exportPremiumResult() {
    const val = document.getElementById('premium-amps').textContent;
    const unit = document.getElementById('premium-amps-unit').textContent;
    const details = Array.from(document.querySelectorAll('.premium-details .detail-value')).map(el => el.textContent).join('\n');
    const blob = new Blob([`Premium Result: ${val} ${unit}\n\nDetails:\n${details}`], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'premium-watts-to-amps-result.txt';
    a.click();
  }

  function resetPremium() {
    document.getElementById('premium-watts').value = '3000';
    document.getElementById('premium-volts').value = '230';
    document.getElementById('premium-pf').value = '0.85';
    document.getElementById('premium-efficiency').value = '95';
    document.getElementById('premium-type').value = 'ac3';
    document.getElementById('premium-result').classList.remove('show');
    document.getElementById('premium-error').style.display = 'none';
    togglePremiumPFGroup();
    updatePremiumCircuitVisuals(0, 230, 0, 'ac3', 0.85, 0.95);
  }

  window.calcPremiumWattsToAmps = calcPremiumWattsToAmps;
  window.copyPremiumResult = copyPremiumResult;
  window.exportPremiumResult = exportPremiumResult;
  window.resetPremium = resetPremium;

  // ===== INITIALIZATION ON DOM READY =====

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// Premium language selector and on-demand translation bridge
(function() {
  const languages = [
    ['en', 'English'],
    ['hi', 'Hindi'],
    ['es', 'Spanish'],
    ['ru', 'Russian'],
    ['fr', 'French'],
    ['de', 'German'],
    ['it', 'Italian'],
    ['pt', 'Portuguese'],
    ['bn', 'Bengali'],
    ['ja', 'Japanese'],
    ['ko', 'Korean'],
    ['ms', 'Malay'],
    ['pl', 'Polish'],
    ['id', 'Indonesian'],
    ['ar', 'Arabic'],
    ['bg', 'Bulgarian'],
    ['tr', 'Turkish'],
    ['sv', 'Swedish'],
    ['ur', 'Urdu']
  ];

  function getSavedLanguage() {
    localStorage.removeItem('siteLanguage');
    localStorage.removeItem('preferredLanguage');
    return 'en';
  }

  function getLanguageName(code) {
    const match = languages.find((item) => item[0] === code);
    return match ? match[1] : 'English';
  }

  function applyDirection(code) {
    document.documentElement.dir = ['ar', 'ur'].includes(code) ? 'rtl' : 'ltr';
  }

  function setLanguage(code, shouldReload) {
    applyDirection(code);
    if (window.switchLanguage) window.switchLanguage(code);
    document.querySelectorAll('.premium-language-option').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.lang === code);
      button.setAttribute('aria-pressed', String(button.dataset.lang === code));
    });
    const label = document.querySelector('.premium-language-current');
    if (label) label.textContent = getLanguageName(code);
  }

  function initPremiumLanguageSelector() {
    const headerInner = document.querySelector('.premium-header-inner');
    const menuButton = document.querySelector('.premium-menu-button');
    if (!headerInner || document.querySelector('.premium-language-shell')) return;

    const savedLanguage = getSavedLanguage();
    const shell = document.createElement('div');
    shell.className = 'premium-language-shell';
    shell.innerHTML = `
      <button class="premium-language-toggle" type="button" aria-expanded="false" aria-haspopup="true" aria-label="Choose website language">
        <span class="premium-language-icon" aria-hidden="true">Aa</span>
        <span class="premium-language-current">${getLanguageName(savedLanguage)}</span>
      </button>
      <div class="premium-language-menu" role="menu" aria-label="Website language options">
        <div class="premium-language-title">Choose Language</div>
        <div class="premium-language-grid">
          ${languages.map(([code, name]) => `<button class="premium-language-option${code === savedLanguage ? ' is-active' : ''}" type="button" data-lang="${code}" role="menuitemradio" aria-pressed="${code === savedLanguage}">${name}</button>`).join('')}
        </div>
      </div>
    `;

    if (menuButton) {
      headerInner.insertBefore(shell, menuButton);
    } else {
      headerInner.appendChild(shell);
    }

    const toggle = shell.querySelector('.premium-language-toggle');
    const panel = shell.querySelector('.premium-language-menu');

    toggle.addEventListener('click', () => {
      const isOpen = shell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    shell.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.lang, true);
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!shell.contains(event.target)) {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    panel.addEventListener('click', (event) => event.stopPropagation());
    applyDirection(savedLanguage);
    if (savedLanguage !== 'en' && window.switchLanguage) window.switchLanguage(savedLanguage);
  }

  function initPremiumFooterLanguages() {
    const footerInner = document.querySelector('.premium-footer-inner');
    if (!footerInner || document.querySelector('.premium-footer-language')) return;

    const savedLanguage = getSavedLanguage();
    const section = document.createElement('section');
    section.className = 'premium-footer-language';
    section.setAttribute('aria-label', 'Website language options');
    section.innerHTML = `
      <div class="footer-section-heading">Languages</div>
      <p>Choose a language for the website.</p>
      <div class="premium-footer-language-grid">
        ${languages.map(([code, name]) => `<button class="premium-language-option${code === savedLanguage ? ' is-active' : ''}" type="button" data-lang="${code}" aria-pressed="${code === savedLanguage}">${name}</button>`).join('')}
      </div>
    `;
    footerInner.appendChild(section);

    section.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
    });
  }

  function initPremiumBackToTop() {
    if (document.querySelector('.premium-back-to-top')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'premium-back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<span aria-hidden="true">^</span><strong>Top</strong>';
    document.body.appendChild(button);

    const updateButton = () => {
      button.classList.toggle('is-visible', window.scrollY > 420);
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
  }

  function initPremiumSocialShare() {
    // Contact & Trust and DMCA sections removed
    return;
  }

  function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1600 });
      return;
    }
    window.setTimeout(callback, 350);
  }

  function initPremiumEnhancements() {
    initPremiumLanguageSelector();
    initPremiumSocialShare();
    runWhenIdle(() => {
      initPremiumFooterLanguages();
      initPremiumBackToTop();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumEnhancements);
  } else {
    initPremiumEnhancements();
  }
})();

// Premium universal navigation controller
(function() {
  function initPremiumNavigation() {
    const button = document.querySelector('.premium-menu-button');
    const nav = document.querySelector('.premium-nav');
    if (!button || !nav) return;

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !button.contains(event.target)) {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.premium-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumNavigation);
  } else {
    initPremiumNavigation();
  }
})();

// ===== UI ENHANCEMENTS FOR PREMIUM DESIGN =====
document.addEventListener('DOMContentLoaded', () => {
  const resultBoxes = document.querySelectorAll('.tool-page-result, .ptool-console, .result-mini');
  if (resultBoxes.length > 0) {
    const decimalsHtml = `
      <div class="ui-decimals-container" style="display:flex; align-items:center; gap:8px; margin-bottom:15px; justify-content:flex-end;">
        <span class="ui-decimals-label" style="color:var(--text2); font-size:14px;">Decimals:</span>
        <div class="ui-stepper-group" style="display:flex; align-items:center; border:1px solid var(--border); border-radius:6px; overflow:hidden;">
          <button class="ui-stepper-btn minus" type="button" onclick="if(window.decimals>0){window.decimals--; if(window.calcMain)calcMain();}">âˆ’</button>
          <span id="ui-decimal-val" class="ui-stepper-val" style="width:32px; text-align:center; color:#ffffff; font-weight:bold; background:var(--input-bg); height:32px; line-height:32px; display:inline-block; font-size:14px; border-left:1px solid var(--border); border-right:1px solid var(--border);">2</span>
          <button class="ui-stepper-btn plus" type="button" onclick="if(window.decimals<6){window.decimals++; if(window.calcMain)calcMain();}">+</button>
        </div>
      </div>
    `;
    resultBoxes[0].insertAdjacentHTML('beforebegin', decimalsHtml);
    window.decimals = 2;
    const origFormatPowerValue = window.formatPowerValue;
    if(origFormatPowerValue) {
       window.formatPowerValue = function(watts) {
          const el = document.getElementById('ui-decimal-val');
          if(el) el.textContent = window.decimals;
          if (!watts || watts <= 0) return '—';
          if (watts >= 1e6) return (watts / 1e6).toFixed(window.decimals) + ' MW';
          if (watts >= 1e3) return (watts / 1e3).toFixed(window.decimals) + ' kW';
          return watts.toFixed(window.decimals) + ' W';
       };
    }
  }

  const pfInputs = document.querySelectorAll('input[id$="pf"], input[class$="pf"]');
  pfInputs.forEach(input => {
    if (input.type === 'number') {
      const wrapper = document.createElement('div');
      wrapper.className = 'ui-enhanced-wrapper';
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0.01';
      slider.max = '1.00';
      slider.step = '0.01';
      slider.value = input.value;
      slider.className = 'ui-slider-track';
      
      input.style.width = '60px';
      input.style.padding = '5px';
      input.style.minHeight = '30px';
      
      input.parentNode.insertBefore(wrapper, input);
    if (menuButton) {
      headerInner.insertBefore(shell, menuButton);
    } else {
      headerInner.appendChild(shell);
    }

    const toggle = shell.querySelector('.premium-language-toggle');
    const panel = shell.querySelector('.premium-language-menu');

    toggle.addEventListener('click', () => {
      const isOpen = shell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    shell.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.lang, true);
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!shell.contains(event.target)) {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    panel.addEventListener('click', (event) => event.stopPropagation());
    applyDirection(savedLanguage);
    if (savedLanguage !== 'en' && window.switchLanguage) window.switchLanguage(savedLanguage);
  }

  function initPremiumFooterLanguages() {
    const footerInner = document.querySelector('.premium-footer-inner');
    if (!footerInner || document.querySelector('.premium-footer-language')) return;

    const savedLanguage = getSavedLanguage();
    const section = document.createElement('section');
    section.className = 'premium-footer-language';
    section.setAttribute('aria-label', 'Website language options');
    section.innerHTML = `
      <div class="footer-section-heading">Languages</div>
      <p>Choose a language for the website.</p>
      <div class="premium-footer-language-grid">
        ${languages.map(([code, name]) => `<button class="premium-language-option${code === savedLanguage ? ' is-active' : ''}" type="button" data-lang="${code}" aria-pressed="${code === savedLanguage}">${name}</button>`).join('')}
      </div>
    `;
    footerInner.appendChild(section);

    section.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
    });
  }

  function initPremiumBackToTop() {
    if (document.querySelector('.premium-back-to-top')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'premium-back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<span aria-hidden="true">^</span><strong>Top</strong>';
    document.body.appendChild(button);

    const updateButton = () => {
      button.classList.toggle('is-visible', window.scrollY > 420);
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
  }

  function initPremiumSocialShare() {
    // Contact & Trust and DMCA sections removed
    return;
  }

  function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1600 });
      return;
    }
    window.setTimeout(callback, 350);
  }

  function initPremiumEnhancements() {
    initPremiumLanguageSelector();
    initPremiumSocialShare();
    runWhenIdle(() => {
      initPremiumFooterLanguages();
      initPremiumBackToTop();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumEnhancements);
  } else {
    initPremiumEnhancements();
  }
})();

// Premium universal navigation controller
(function() {
  function initPremiumNavigation() {
    const button = document.querySelector('.premium-menu-button');
    const nav = document.querySelector('.premium-nav');
    if (!button || !nav) return;

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !button.contains(event.target)) {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.premium-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumNavigation);
  } else {
    initPremiumNavigation();
  }
})();

// ===== UI ENHANCEMENTS FOR PREMIUM DESIGN =====
document.addEventListener('DOMContentLoaded', () => {
  const resultBoxes = document.querySelectorAll('.tool-page-result, .ptool-console, .result-mini');
  if (resultBoxes.length > 0) {
    const decimalsHtml = `
      <div class="ui-decimals-container" style="display:flex; align-items:center; gap:8px; margin-bottom:15px; justify-content:flex-end;">
        <span class="ui-decimals-label" style="color:var(--text2); font-size:14px;">Decimals:</span>
        <div class="ui-stepper-group" style="display:flex; align-items:center; border:1px solid var(--border); border-radius:6px; overflow:hidden;">
          <button class="ui-stepper-btn minus" type="button" onclick="if(window.decimals>0){window.decimals--; if(window.calcMain)calcMain();}">âˆ’</button>
          <span id="ui-decimal-val" class="ui-stepper-val" style="width:32px; text-align:center; color:#ffffff; font-weight:bold; background:var(--input-bg); height:32px; line-height:32px; display:inline-block; font-size:14px; border-left:1px solid var(--border); border-right:1px solid var(--border);">2</span>
          <button class="ui-stepper-btn plus" type="button" onclick="if(window.decimals<6){window.decimals++; if(window.calcMain)calcMain();}">+</button>
        </div>
      </div>
    `;
    resultBoxes[0].insertAdjacentHTML('beforebegin', decimalsHtml);
    window.decimals = 2;
    const origFormatPowerValue = window.formatPowerValue;
    if(origFormatPowerValue) {
       window.formatPowerValue = function(watts) {
          const el = document.getElementById('ui-decimal-val');
          if(el) el.textContent = window.decimals;
          if (!watts || watts <= 0) return '—';
          if (watts >= 1e6) return (watts / 1e6).toFixed(window.decimals) + ' MW';
          if (watts >= 1e3) return (watts / 1e3).toFixed(window.decimals) + ' kW';
          return watts.toFixed(window.decimals) + ' W';
       };
    }
  }

  const pfInputs = document.querySelectorAll('input[id$="pf"], input[class$="pf"]');
  pfInputs.forEach(input => {
    if (input.type === 'number') {
      const wrapper = document.createElement('div');
      wrapper.className = 'ui-enhanced-wrapper';
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0.01';
      slider.max = '1.00';
      slider.step = '0.01';
      slider.value = input.value;
      slider.className = 'ui-slider-track';
      
      input.style.width = '60px';
      input.style.padding = '5px';
      input.style.minHeight = '30px';
      
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(slider);
      wrapper.appendChild(input);
      
      slider.addEventListener('input', (e) => {
        input.value = e.target.value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      input.addEventListener('input', (e) => {
        slider.value = e.target.value;
      });
    }
  });
});

// ===== LUXURY THEME ENGINE: 100% IMAGE REPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Inject CSS directly to bypass cache issues
  const styleId = 'lux-theme-engine-css';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.innerHTML = `
      .ptool-input-row, .ptool-presets, .ptool-intent, .ptool-rules, .ptool-console, .ptool-topbar {
        display: none !important;
      }
      .lux-calculator-wrapper {
        display: grid !important;
        grid-template-columns: 320px 1fr !important;
        gap: 32px !important;
        max-width: 1100px !important;
        margin: 0 auto 40px !important;
        font-family: inherit !important;
        align-items: start !important;
      }
      @media (max-width: 900px) {
        .lux-calculator-wrapper {
          grid-template-columns: 1fr !important;
        }
      }
      .lux-left-col {
        display: flex !important;
        flex-direction: column !important;
        gap: 20px !important;
      }
      .lux-top-row {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      }
      .lux-mode-badge {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        color: #00e5ff !important;
        font-weight: 800 !important;
        font-size: 13px !important;
        letter-spacing: 1px !important;
      }
      .lux-dot {
        width: 8px !important;
        height: 8px !important;
        background: #00e5ff !important;
        border-radius: 50% !important;
        box-shadow: 0 0 10px #00e5ff !important;
      }
      .lux-decimals {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        color: #94a3b8 !important;
        font-size: 13px !important;
      }
      .lux-stepper {
        display: flex !important;
        align-items: center !important;
        background: #0b1426 !important;
        border-radius: 6px !important;
        overflow: hidden !important;
        border: 1px solid #1e2d4a !important;
      }
      .lux-stepper button {
        background: transparent !important;
        border: none !important;
        color: #00e5ff !important;
        width: 32px !important;
        height: 32px !important;
        cursor: pointer !important;
        font-size: 16px !important;
        font-weight: bold !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .lux-stepper button.plus {
        background: #00e5ff !important;
        color: #000 !important;
      }
      .lux-stepper span {
        width: 28px !important;
        text-align: center !important;
        color: #fff !important;
        font-weight: bold !important;
        background: #02050a !important;
        height: 32px !important;
        line-height: 32px !important;
        display: inline-block !important;
        font-size: 14px !important;
      }
      .lux-inputs-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        background: transparent !important;
      }
      .lux-input-group {
        display: flex !important;
        flex-direction: column !important;
      }
      .lux-input-group label {
        display: block !important;
        margin-bottom: 8px !important;
        color: #94a3b8 !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
      }
      .lux-input-wrapper {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        background: #0b1426 !important;
        border: 1px solid #1e2d4a !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        transition: border-color 0.2s !important;
      }
      .lux-input-wrapper:focus-within {
        border-color: #00e5ff !important;
      }
      .lux-input-wrapper input, .lux-input-wrapper select {
        width: 100% !important;
        background: transparent !important;
        border: none !important;
        color: #ffffff !important;
        padding: 16px !important;
        font-size: 16px !important;
        font-weight: bold !important;
        outline: none !important;
        height: auto !important;
        margin: 0 !important;
        box-shadow: none !important;
        appearance: none !important;
      }
      .lux-input-wrapper input[type="number"]::-webkit-inner-spin-button, 
      .lux-input-wrapper input[type="number"]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
      .lux-unit {
        position: absolute !important;
        right: 16px !important;
        color: #64748b !important;
        font-weight: 800 !important;
        pointer-events: none !important;
        font-size: 14px !important;
      }
      .lux-btn-row {
        display: flex !important;
        gap: 12px !important;
        margin-top: 8px !important;
      }
      .lux-btn-outline {
        flex: 1 !important;
        background: transparent !important;
        border: 1px solid #1e2d4a !important;
        color: #fff !important;
        padding: 16px !important;
        border-radius: 8px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        transition: all 0.2s !important;
      }
      .lux-btn-outline:hover {
        background: #1e2d4a !important;
      }
      .lux-btn-primary {
        flex: 2 !important;
        background: #00e5ff !important;
        border: none !important;
        color: #000 !important;
        padding: 16px !important;
        border-radius: 8px !important;
        font-weight: 900 !important;
        font-size: 16px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 15px rgba(0,229,255,0.2) !important;
        transition: transform 0.2s !important;
      }
      .lux-btn-primary:hover {
        transform: translateY(-2px) !important;
      }
      .lux-right-col {
        display: flex !important;
        flex-direction: column !important;
        gap: 24px !important;
      }
      .lux-live-result-box {
        background: #0b1426 !important;
        border-radius: 12px !important;
        border: 1px solid #1e2d4a !important;
        border-top: 4px solid #00e5ff !important;
        padding: 40px 32px !important;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
      }
      .lux-live-header {
        color: #00e5ff !important;
        font-weight: 900 !important;
        font-size: 13px !important;
        letter-spacing: 2px !important;
        margin-bottom: 24px !important;
      }
      .lux-live-value {
        color: #ffffff !important;
        font-size: clamp(48px, 6vw, 64px) !important;
        font-weight: 900 !important;
        line-height: 1.1 !important;
        margin-bottom: 12px !important;
        word-break: break-word !important;
      }
      .lux-live-sub {
        color: #00e5ff !important;
        font-size: 16px !important;
        font-weight: bold !important;
        margin-bottom: 24px !important;
      }
      .lux-live-desc {
        color: #64748b !important;
        font-size: 14px !important;
        line-height: 1.6 !important;
        margin: 0 !important;
      }
      .lux-quick-tips {
        background: transparent !important;
        border: 1px solid #1e2d4a !important;
        border-radius: 12px !important;
        padding: 24px !important;
      }
      .lux-tips-header {
        color: #ffffff !important;
        font-weight: 800 !important;
        font-size: 14px !important;
        margin-bottom: 16px !important;
      }
      .lux-rules-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }
      .lux-rule-card {
        background: #02050a !important;
        border: 1px solid #1e2d4a !important;
        padding: 16px !important;
        border-radius: 8px !important;
      }
      .lux-rule-card .rule-label {
        display: block !important;
        color: #00e5ff !important;
        font-size: 11px !important;
        font-weight: bold !important;
        margin-bottom: 6px !important;
        text-transform: uppercase !important;
      }
      .lux-rule-card strong {
        color: #fff !important;
        font-size: 14px !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const calcForms = document.querySelectorAll('.ptool-card, .mini-tool-calculator');
  if (calcForms.length === 0) return;

  calcForms.forEach(formEl => {
    if (formEl.dataset.luxEngineApplied) return;
    formEl.dataset.luxEngineApplied = 'true';

    // Hide original wrapper
    formEl.style.display = 'none';

    // Build Luxury Wrapper
    const luxWrapper = document.createElement('div');
    luxWrapper.className = 'lux-calculator-wrapper';

    // Find title
    let titleText = 'CALCULATOR';
    const headSpan = formEl.querySelector('.ptool-head strong');
    const h1 = document.querySelector('h1');
    if (headSpan) titleText = headSpan.textContent.trim().toUpperCase();
    else if (h1) titleText = h1.textContent.trim().toUpperCase();
    else titleText = document.title.split('-')[0].trim().toUpperCase();

    // Create Left Col
    const leftCol = document.createElement('div');
    leftCol.className = 'lux-left-col';
    
    // Top Row: Mode + Decimals
    const topRow = document.createElement('div');
    topRow.className = 'lux-top-row';
    topRow.innerHTML = `
      <div class="lux-mode-badge"><span class="lux-dot"></span> MODE: ${titleText}</div>
      <div class="lux-decimals">
        <div class="lux-stepper">
          <button type="button" class="minus" onclick="if(window.decimals>0){window.decimals--; if(window.calcMain)calcMain(); if(window.toolCalc)toolCalc();}">−</button>
          <span id="lux-dec-val">2</span>
          <button type="button" class="plus" onclick="if(window.decimals<6){window.decimals++; if(window.calcMain)calcMain(); if(window.toolCalc)toolCalc();}">+</button>
        </div>
      </div>
    `;
    leftCol.appendChild(topRow);

    // Form inputs wrapper
    const inputsGrid = document.createElement('div');
    inputsGrid.className = 'lux-inputs-grid';

    // Extract inputs
    const originalInputs = formEl.querySelectorAll('input, select');
    
    originalInputs.forEach(origInput => {
      if (origInput.type === 'hidden' || origInput.type === 'range') return;

      const group = document.createElement('div');
      group.className = 'lux-input-group';

      let labelText = '';
      if (origInput.labels && origInput.labels.length > 0) {
        labelText = origInput.labels[0].textContent.trim();
      } else {
        const prev = origInput.previousElementSibling;
        if (prev && prev.tagName === 'LABEL') labelText = prev.textContent.trim();
        else {
          const parent = origInput.closest('label');
          if (parent) {
            const clone = parent.cloneNode(true);
            const inp = clone.querySelector('input, select');
            if(inp) clone.removeChild(inp);
            labelText = clone.textContent.trim();
          }
        }
      }

      // Clean label text
      labelText = labelText.replace(/\(.*\)/, '').trim();

      const labelEl = document.createElement('label');
      labelEl.textContent = labelText || 'Input';
      group.appendChild(labelEl);

      const wrapper = document.createElement('div');
      wrapper.className = 'lux-input-wrapper';

      let proxyInput;
      if (origInput.tagName === 'SELECT') {
        proxyInput = document.createElement('select');
        Array.from(origInput.options).forEach(opt => {
          const newOpt = document.createElement('option');
          newOpt.value = opt.value;
          newOpt.textContent = opt.textContent;
          if (opt.selected) newOpt.selected = true;
          proxyInput.appendChild(newOpt);
        });
      } else {
        proxyInput = document.createElement('input');
        proxyInput.type = origInput.type;
        proxyInput.value = origInput.value;
        if (origInput.min !== '') proxyInput.min = origInput.min;
        if (origInput.max !== '') proxyInput.max = origInput.max;
        if (origInput.step !== '') proxyInput.step = origInput.step;
      }

      // Sync proxy to orig
      proxyInput.addEventListener('input', (e) => {
        origInput.value = e.target.value;
        origInput.dispatchEvent(new Event('input', { bubbles: true }));
        origInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        if (typeof window.calcMain === 'function') window.calcMain();
        if (typeof window.toolCalc === 'function') window.toolCalc();
      });

      // Sync orig to proxy
      origInput.addEventListener('input', (e) => {
        proxyInput.value = e.target.value;
      });
      origInput.addEventListener('change', (e) => {
        proxyInput.value = e.target.value;
      });

      wrapper.appendChild(proxyInput);

      // Unit Addon logic
      const lowerLabel = labelText.toLowerCase();
      let unitStr = '';
      if (lowerLabel.includes('amps') || lowerLabel.includes('current')) unitStr = 'A';
      else if (lowerLabel.includes('watts') || lowerLabel.includes('power')) unitStr = 'W';
      else if (lowerLabel.includes('volts') || lowerLabel.includes('voltage')) unitStr = 'V';
      else if (lowerLabel.includes('hz') || lowerLabel.includes('frequency')) unitStr = 'Hz';
      else if (lowerLabel.includes('hours')) unitStr = 'h';
      else if (lowerLabel.includes('kva')) unitStr = 'kVA';
      else if (lowerLabel.includes('mw')) unitStr = 'MW';
      else if (lowerLabel.includes('rate')) unitStr = '$';

      if (unitStr) {
        const unitEl = document.createElement('span');
        unitEl.className = 'lux-unit';
        unitEl.textContent = unitStr;
        wrapper.appendChild(unitEl);
      }

      group.appendChild(wrapper);
      inputsGrid.appendChild(group);
    });
    
    leftCol.appendChild(inputsGrid);

    // Buttons
    const btnRow = document.createElement('div');
    btnRow.className = 'lux-btn-row';
    const resetBtn = document.createElement('button');
    resetBtn.className = 'lux-btn-outline';
    resetBtn.textContent = 'Reset';
    resetBtn.type = 'button';
    resetBtn.onclick = () => {
      const origReset = formEl.querySelector('.tool-reset-button, .ptool-btn-reset');
      if (origReset) origReset.click();
      else if(typeof window.resetMain === 'function') window.resetMain();
      
      setTimeout(() => {
        const origs = formEl.querySelectorAll('input, select');
        const proxies = inputsGrid.querySelectorAll('input, select');
        origs.forEach((o, i) => {
          if (proxies[i] && o.type !== 'hidden' && o.type !== 'range') proxies[i].value = o.value;
        });
      }, 50);
    };

    const calcBtn = document.createElement('button');
    calcBtn.className = 'lux-btn-primary';
    const mainBtn = formEl.querySelector('.tool-calc-button, .ptool-btn-calc');
    calcBtn.textContent = mainBtn ? mainBtn.textContent.replace(/⚡|^\s+|\s+$/g, '').trim() : 'Calculate';
    calcBtn.type = 'button';
    calcBtn.onclick = () => {
      if (mainBtn) mainBtn.click();
      else {
        if(typeof window.calcMain === 'function') window.calcMain();
        if(typeof window.toolCalc === 'function') window.toolCalc();
      }
    };

    btnRow.appendChild(resetBtn);
    btnRow.appendChild(calcBtn);
    leftCol.appendChild(btnRow);

    // Create Right Col
    const rightCol = document.createElement('div');
    rightCol.className = 'lux-right-col';

    const liveResult = document.createElement('div');
    liveResult.className = 'lux-live-result-box';
    liveResult.innerHTML = `
      <div class="lux-live-header">LIVE RESULT</div>
      <div class="lux-live-value" id="lux-main-val">Ready</div>
      <div class="lux-live-sub" id="lux-sub-val">Enter values</div>
      <p class="lux-live-desc">Adjust inputs on the left. This box always mirrors your main result for quick reference.</p>
    `;
    rightCol.appendChild(liveResult);

    // Quick tips
    const rulesEl = formEl.querySelector('.ptool-rules, .calculator-rules');
    if (rulesEl) {
      const tipsBox = document.createElement('div');
      tipsBox.className = 'lux-quick-tips';
      tipsBox.innerHTML = '<div class="lux-tips-header">QUICK TIPS & FORMULAS</div>';
      
      const rulesClone = document.createElement('div');
      rulesClone.className = 'lux-rules-container';
      Array.from(rulesEl.querySelectorAll('.rule-card, .ptool-rule')).forEach(rule => {
         const newRule = document.createElement('div');
         newRule.className = 'lux-rule-card';
         newRule.innerHTML = rule.innerHTML;
         rulesClone.appendChild(newRule);
      });
      tipsBox.appendChild(rulesClone);
      rightCol.appendChild(tipsBox);
    }

    luxWrapper.appendChild(leftCol);
    luxWrapper.appendChild(rightCol);

    // Append new wrapper
    formEl.parentNode.insertBefore(luxWrapper, formEl);

    // Setup Mutation Observer
    const resultBox = formEl.querySelector('.ptool-console-val, .tool-result-main');
    const resultSubBox = formEl.querySelector('.ptool-console-sub, .tool-result-detail');
    
    if (resultBox) {
      const observer = new MutationObserver(() => {
        document.getElementById('lux-main-val').textContent = resultBox.textContent;
        if (resultSubBox) document.getElementById('lux-sub-val').innerHTML = resultSubBox.innerHTML;
      });
      observer.observe(resultBox, { childList: true, characterData: true, subtree: true });
      if (resultSubBox) observer.observe(resultSubBox, { childList: true, characterData: true, subtree: true });
      
      document.getElementById('lux-main-val').textContent = resultBox.textContent;
      if (resultSubBox) document.getElementById('lux-sub-val').innerHTML = resultSubBox.innerHTML;
    }
  });

  // Ensure formatPowerValue uses our new decimal span
  const origFormatPowerValue = window.formatPowerValue;
  if(origFormatPowerValue) {
     window.formatPowerValue = function(watts) {
        const el = document.getElementById('lux-dec-val');
        if(el) el.textContent = window.decimals;
        if (!watts || watts <= 0) return '—';
        if (watts >= 1e6) return (watts / 1e6).toFixed(window.decimals) + ' MW';
        if (watts >= 1e3) return (watts / 1e3).toFixed(window.decimals) + ' kW';
        return watts.toFixed(window.decimals) + ' W';
     };
  }
});
