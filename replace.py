import re

html_file = 'd:/ampstowatts/Ampstowatt/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<article class="card card-glow calculator-card">'
end_marker = '</article>'

replacement = """<article class="ptool-card">
          <!-- Toolbox Header -->
          <div class="ptool-topbar">
            <div class="ptool-topbar-left">
              <span class="ptool-status-dot"></span>
              <span>LIVE SYSTEM</span>
            </div>
            <div class="ptool-topbar-center">
              <strong>PROFESSIONAL TOOLBOX</strong>
            </div>
            <div class="ptool-topbar-right">
              <span class="ptool-badge">PRO v9</span>
            </div>
          </div>
          
          <div class="ptool-body">
            <div class="main-tool-card-head ptool-head">
              <span>Main calculator</span>
              <strong>Amps To Watts Calculator</strong>
              <p>Fast presets, power factor support, and live real power output in watts, kW, BTU/hr, and horsepower.</p>
            </div>
            
            <div class="ptool-presets-wrapper">
              <div class="ptool-section-label">QUICK PRESETS</div>
              <div class="main-quick-presets ptool-presets" aria-label="Quick calculator presets">
                <button type="button" class="main-quick-preset" data-type="dc" data-amps="10" data-volts="12" data-pf="1"><span class="ptool-preset-tag dc">DC</span> 12V 10A</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="15" data-volts="120" data-pf="1"><span class="ptool-preset-tag ac1">1P</span> 120V 15A</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="30" data-volts="240" data-pf="0.95"><span class="ptool-preset-tag ac1">1P</span> 240V 30A</button>
                <button type="button" class="main-quick-preset" data-type="ac3" data-amps="10" data-volts="230" data-pf="0.85"><span class="ptool-preset-tag ac3">3P</span> 230V 10A</button>
              </div>
            </div>
            
            <div class="main-intent-panel ptool-intent" aria-label="Popular amps watts conversion shortcuts">
              <div class="intent-copy ptool-intent-copy">
                <span>Popular searches</span>
                <strong>Fast answers for common amps, volts, watts, MW, and Ah searches</strong>
              </div>
              <div class="intent-chip-grid ptool-intent-grid">
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="1" data-volts="120" data-pf="1">1 amp watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="1" data-volts="120" data-pf="1">1 amps to watt</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="1.5" data-volts="120" data-pf="1">1.5 amps to watt</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="2" data-volts="120" data-pf="1">2 amps to watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="10" data-volts="120" data-pf="1">10 amp to watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="13" data-volts="120" data-pf="1">13 amps to watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="15" data-volts="120" data-pf="1">15 amp watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="14.5" data-volts="120" data-pf="1">14.5 amps to watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="16" data-volts="120" data-pf="1">16 amp how many watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="20" data-volts="120" data-pf="1">20 amp to watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="32" data-volts="240" data-pf="1">32A 240V watts</button>
                <button type="button" class="main-quick-preset" data-type="ac1" data-amps="50" data-volts="240" data-pf="1">50 amps to watts</button>
                <a href="/megawatts-to-amps-calculator/">MW to amps</a>
                <a href="/amp-hours-to-watt-hours/">Ah to Wh</a>
              </div>
            </div>
            
            <div class="main-formula-strip ptool-formulas" aria-label="Common electrical formulas">
              <span><strong>DC</strong> W = A × V</span>
              <span><strong>AC</strong> A = W / V</span>
              <span><strong>Ah</strong> Wh = Ah × V</span>
              <span><strong>3P</strong> W = 1.732 × A × V × PF</span>
            </div>
            
            <div class="ptool-section-label">SYSTEM PARAMETERS</div>
            <form onsubmit="return false;" aria-label="Amps to Watts Calculator Form" class="ptool-form">
              <div class="input-row ptool-input-row">
                <div class="input-group ptool-group">
                  <label for="main-type">Circuit Type</label>
                  <select id="main-type" onchange="togglePFGroup();" class="ptool-input">
                    <option value="dc">DC</option>
                    <option value="ac1">AC Single-Phase</option>
                    <option value="ac3" selected>AC Three-Phase</option>
                  </select>
                </div>
                <div class="input-group ptool-group">
                  <label for="main-amps">Current (Amps)</label>
                  <input type="number" id="main-amps" value="10" step="any" min="0.1" class="ptool-input" aria-describedby="main-amps-help">
                  <span id="main-amps-help" class="sr-only">Enter the current in amperes. Minimum value is 0.1</span>
                </div>
                <div class="input-group ptool-group">
                  <label for="main-volts">Voltage (Volts)</label>
                  <input type="number" id="main-volts" value="230" step="any" min="1" class="ptool-input" aria-describedby="main-volts-help">
                  <span id="main-volts-help" class="sr-only">Enter the voltage in volts. Minimum value is 1</span>
                </div>
                <div class="input-group ptool-group" id="main-freq-group">
                  <label for="main-freq">Frequency (Hz)</label>
                  <input type="number" id="main-freq" value="50" step="any" min="1" class="ptool-input" aria-describedby="main-freq-help">
                  <span id="main-freq-help" class="sr-only">Enter the frequency in hertz. Only for AC circuits.</span>
                </div>
                <div class="input-group ptool-group" id="main-pf-group">
                  <label for="main-pf">Power Factor</label>
                  <input type="number" id="main-pf" value="0.85" step="0.01" min="0.1" max="1" class="ptool-input" aria-describedby="main-pf-help">
                  <span id="main-pf-help" class="sr-only">Enter power factor between 0.1 and 1.0</span>
                </div>
              </div>
              <div class="btn-row ptool-btn-row">
                <button type="button" class="btn btn-primary ptool-btn-calc" onclick="calcMain()">
                  <span class="ptool-btn-icon">⚡</span> Calculate Watts
                </button>
                <button type="button" class="btn btn-outline btn-sm ptool-btn-reset" onclick="resetMain()">✕ Reset</button>
              </div>
            </form>
            
            <div class="calculator-rules ptool-rules" id="main-rules" aria-live="polite">
              <div class="rule-card ptool-rule active">
                <span class="rule-label">Formula</span>
                <strong id="main-rule-formula">P = 1.732 × A × V × PF</strong>
              </div>
              <div class="rule-card ptool-rule">
                <span class="rule-label">Load Rule</span>
                <strong id="main-rule-load">Continuous target: 80% breaker capacity</strong>
              </div>
              <div class="rule-card ptool-rule">
                <span class="rule-label">Safety Note</span>
                <strong id="main-rule-safety">Confirm RMS voltage and nameplate PF.</strong>
              </div>
            </div>
            
            <div id="main-error" class="error-msg ptool-error" role="alert" aria-live="polite">Please enter valid positive values for all fields.</div>
            
            <div class="ptool-section-label">OUTPUT CONSOLE</div>
            <div id="main-result" class="result-mini ptool-console" aria-live="polite">
              <div class="ptool-console-main">
                <div class="result-mini-unit ptool-console-unit">REAL POWER</div>
                <div class="result-mini-val ptool-console-val" id="main-watt">—</div>
                <div class="result-mini-unit ptool-console-sub" id="main-watt-unit">Watts (W) | <span id="main-va-out">—</span> VA | PF: <span id="main-pf-out">—</span> | kWh/100h: <span id="main-kwh">—</span></div>
              </div>
              
              <div class="result-details ptool-console-details">
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">Apparent Power:</span>
                  <span class="detail-value" id="main-va-detail">— VA</span>
                </div>
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">Reactive Power:</span>
                  <span class="detail-value" id="main-var-detail">— VAR</span>
                </div>
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">Power Factor:</span>
                  <span class="detail-value" id="main-pf-detail">—</span>
                </div>
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">Efficiency:</span>
                  <span class="detail-value" id="main-eff-detail">— %</span>
                </div>
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">BTU/hr:</span>
                  <span class="detail-value" id="main-btu-detail">—</span>
                </div>
                <div class="detail-row ptool-detail-row">
                  <span class="detail-label">Horsepower:</span>
                  <span class="detail-value" id="main-hp-detail">— HP</span>
                </div>
              </div>
              
              <div class="result-mini-unit ptool-console-actions">
                <button class="btn btn-outline btn-xs ptool-action-btn" id="copy-main-result" onclick="copyMainResult()">Copy Result</button>
                <button class="btn btn-outline btn-xs ptool-action-btn" id="export-main-result" onclick="exportMainResult()">Export</button>
              </div>
            </div>
          </div>
        </article>"""

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + replacement + content[end_idx:]
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced HTML")
else:
    print("Could not find block")
