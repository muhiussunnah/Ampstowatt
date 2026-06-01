import os

css_path = 'd:/ampstowatts/Ampstowatt/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of the previous premium CSS and slice it off
marker = '/* ===== PREMIUM TOOLBOX CALCULATOR V9 ===== */'
idx = content.find(marker)
if idx != -1:
    content = content[:idx]

# Define the new premium light/clean CSS
new_css = '''/* ===== PREMIUM TOOLBOX CALCULATOR V9 ===== */
.ptool-v9 {
  background: #f8fafc !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  border-radius: 24px !important;
  padding: 0 !important;
  position: relative;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.08), 0 2px 10px rgba(15, 23, 42, 0.04) !important;
}

.ptool-v9::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #2563eb, #0ea5e9, #10b981) !important;
  z-index: 2;
}

.ptool-card {
  background: #ffffff !important;
  border-radius: 0 !important;
  border: none !important;
  position: relative;
  z-index: 1;
  box-shadow: none !important;
  display: flex;
  flex-direction: column;
  padding: 0 !important;
}

/* TOPBAR */
.ptool-topbar {
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
}

.ptool-topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #059669;
  font-weight: 800;
  letter-spacing: 1px;
}

.ptool-status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
  animation: ptool-pulse 2.5s infinite;
}

@keyframes ptool-pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

.ptool-topbar-center strong {
  color: #475569;
  letter-spacing: 2px;
}

.ptool-badge {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

/* BODY */
.ptool-body {
  padding: clamp(20px, 3vw, 32px) !important;
}

.ptool-head {
  border-bottom: 1px dashed #cbd5e1 !important;
  margin-bottom: 24px !important;
  padding-bottom: 24px !important;
}

.ptool-head span {
  color: #2563eb !important;
  background: #eff6ff !important;
  font-weight: 800 !important;
}

.ptool-head strong {
  color: #0f172a !important;
  font-weight: 900 !important;
}

.ptool-head p {
  color: #475569 !important;
}

.ptool-section-label {
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

/* PRESETS & INTENT */
.ptool-presets, .ptool-intent {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 12px !important;
  padding: 14px !important;
}

.ptool-presets button, .ptool-intent-grid button, .ptool-intent-grid a {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #334155 !important;
  font-weight: 700 !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.ptool-presets button:hover, .ptool-intent-grid button:hover, .ptool-intent-grid a:hover {
  background: #2563eb !important;
  border-color: #2563eb !important;
  color: white !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.15) !important;
}

.ptool-preset-tag {
  display: inline-block;
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 9px;
  margin-right: 6px;
  font-weight: 900;
}
.ptool-preset-tag.dc { background: #fef3c7; color: #b45309; }
.ptool-preset-tag.ac1 { background: #dbeafe; color: #1d4ed8; }
.ptool-preset-tag.ac3 { background: #ede9fe; color: #6d28d9; }

.ptool-presets button:hover .ptool-preset-tag {
  background: rgba(255,255,255,0.2);
  color: white;
}

.ptool-intent-copy span {
  background: #f1f5f9 !important;
  color: #475569 !important;
  font-weight: 800 !important;
}
.ptool-intent-copy strong { color: #334155 !important; }

/* FORMULAS */
.ptool-formulas span {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  color: #475569 !important;
  border-radius: 8px !important;
}
.ptool-formulas strong {
  color: #2563eb;
  margin-right: 6px;
}

/* FORM */
.ptool-input-row {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 16px !important;
  padding: 16px !important;
}

.ptool-group label {
  color: #475569 !important;
  font-weight: 700 !important;
}

.ptool-input {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #0f172a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02) !important;
}

.ptool-input:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
}

.ptool-btn-row {
  margin-top: 20px !important;
}

.ptool-btn-calc {
  background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
  border: none !important;
  color: white !important;
  font-size: 16px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  border-radius: 12px !important;
  padding: 14px 28px !important;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25) !important;
  transition: all 0.2s ease !important;
}
.ptool-btn-calc:hover {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.35) !important;
  transform: translateY(-2px);
}

.ptool-btn-reset {
  background: transparent !important;
  border: 1px solid #cbd5e1 !important;
  color: #64748b !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
}
.ptool-btn-reset:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

/* RULES */
.ptool-rules {
  margin: 24px 0 !important;
}
.ptool-rule {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02) !important;
}
.ptool-rule.active {
  background: #eff6ff !important;
  border-color: #bfdbfe !important;
}
.ptool-rule strong {
  color: #0f172a !important;
}

/* CONSOLE */
.ptool-console {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.04) !important;
  padding: 28px !important;
  border-radius: 18px !important;
  position: relative;
  overflow: hidden;
}

.ptool-console::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(37, 99, 235, 0.03), transparent 60%);
  pointer-events: none;
}

.ptool-console-unit {
  color: #64748b !important;
  font-size: 12px !important;
  font-weight: 900 !important;
  letter-spacing: 2px !important;
}

.ptool-console-val {
  color: #0f172a !important;
  font-size: clamp(38px, 4.5vw, 68px) !important;
  font-weight: 900 !important;
  letter-spacing: -1px !important;
  background: linear-gradient(135deg, #0f172a, #334155) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.ptool-console-sub {
  color: #64748b !important;
}
.ptool-console-sub span {
  color: #0f172a !important;
  font-weight: 700 !important;
}

.ptool-console-details {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 16px !important;
  margin-top: 24px !important;
  border-radius: 12px !important;
}

.ptool-detail-row {
  background: #ffffff !important;
  border: 1px solid #f1f5f9 !important;
  border-radius: 8px !important;
  padding: 10px 14px !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.01) !important;
}
.ptool-detail-row .detail-label {
  color: #64748b !important;
  font-weight: 600 !important;
}
.ptool-detail-row .detail-value {
  color: #0f172a !important;
  font-weight: 800 !important;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.ptool-console-actions {
  margin-top: 20px !important;
}

.ptool-action-btn {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #475569 !important;
  font-weight: 700 !important;
  border-radius: 8px !important;
}
.ptool-action-btn:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
  border-color: #94a3b8 !important;
}

/* Hide normal section divider */
.ptool-v9 .section-divider {
  display: none;
}

@media (max-width: 680px) {
  .ptool-topbar {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
'''

content += '\n' + new_css + '\n'

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('New Premium CSS applied successfully.')
