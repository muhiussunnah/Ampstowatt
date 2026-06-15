# ampstowatt.com — Complete Silo Structure
## In-Depth Topical Authority Architecture
## Updated: June 2026

---

## What Is a Content Silo?

A silo groups pages covering the same broad topic so that all internal links, anchor text, and topic signals flow within the group. Google sees a silo as a "mini authority" on that topic. The stronger each silo is, the higher the entire silo ranks — including pages that would struggle on their own.

**The Rule:** Pages inside a silo link to each other freely. Pages ONLY cross silos through the homepage or designated hub pages. This prevents link equity from leaking out of a strong silo into an unrelated area.

---

## CURRENT SITE PAGE STATUS — FULL AUDIT

Before building the silo, here is the status of EVERY page on ampstowatt.com:

### Pages That Currently EXIST

| URL | HTTP Status | Action | Silo |
|---|---|---|---|
| `/` | ✅ 200 | KEEP — homepage hub | ALL |
| `/watts-to-amps-calculator/` | ✅ 200 | KEEP + update title | Silo 1 |
| `/voltage-amps-watts-calculator/` | ✅ 200 | 301 → `/` (redundant) | DELETE |
| `/calculators/` | ✅ 200 | Noindex — navigation only | Support |
| `/ac-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical AC page | Silo 2 |
| `/dc-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical DC page | Silo 2 |
| `/single-phase-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical single phase | Silo 2 |
| `/3-phase-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical 3-phase | Silo 2 |
| `/amps-to-watts-ac-calculator/` | ✅ 200 | 301 → `/ac-amps-to-watts-calculator/` | DELETE |
| `/amps-to-watts-dc-calculator/` | ✅ 200 | 301 → `/dc-amps-to-watts-calculator/` | DELETE |
| `/amps-to-watts-3-phase-calculator/` | ✅ 200 | 301 → `/3-phase-amps-to-watts-calculator/` | DELETE |
| `/ac-calculator/` | ✅ 200 | 301 → `/ac-amps-to-watts-calculator/` | DELETE |
| `/dc-calculator/` | ✅ 200 | 301 → `/dc-amps-to-watts-calculator/` | DELETE |
| `/single-phase-calculator/` | ✅ 200 | 301 → `/single-phase-amps-to-watts-calculator/` | DELETE |
| `/3-phase-calculator/` | ✅ 200 | 301 → `/3-phase-amps-to-watts-calculator/` | DELETE |
| `/12v-amps-to-watts-calculator/` | ✅ 200 | KEEP or consolidate to `/12v-amps-to-watts/` | Silo 3 |
| `/120v-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical 120V | Silo 3 |
| `/220v-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical 220V | Silo 3 |
| `/240v-amps-to-watts-calculator/` | ✅ 200 | KEEP — canonical 240V | Silo 3 |
| `/amps-to-watts-120v-calculator/` | ✅ 200 | 301 → `/120v-amps-to-watts-calculator/` | DELETE |
| `/amps-to-watts-220v-calculator/` | ✅ 200 | 301 → `/220v-amps-to-watts-calculator/` | DELETE |
| `/amps-to-watts-230v-calculator/` | ✅ 200 | 301 → `/230v-amps-to-watts-calculator/` | DELETE |
| `/amps-to-watts-240v-calculator/` | ✅ 200 | 301 → `/240v-amps-to-watts-calculator/` | DELETE |
| `/12v-calculator/` | ✅ 200 | 301 → `/12v-amps-to-watts-calculator/` | DELETE |
| `/120v-calculator/` | ✅ 200 | 301 → `/120v-amps-to-watts-calculator/` | DELETE |
| `/220v-calculator/` | ✅ 200 | 301 → `/220v-amps-to-watts-calculator/` | DELETE |
| `/230v-calculator/` | ✅ 200 | 301 → `/230v-amps-to-watts-calculator/` | DELETE |
| `/240v-calculator/` | ✅ 200 | 301 → `/240v-amps-to-watts-calculator/` | DELETE |
| `/other-voltages/` | ✅ 200 | 301 → `/` | DELETE |
| `/kva-to-watts-calculator/` | ✅ 200 | KEEP + update | Silo 5 |
| `/power-factor/` | ✅ 200 | KEEP + update title to `/power-factor-calculator/` | Silo 5 |
| `/amps-to-kw-calculator/` | ✅ 200 | KEEP + update | Silo 5 |
| `/megawatts-to-amps-calculator/` | ✅ 200 | KEEP + update | Silo 5 |
| `/solar-watts-to-amps-calculator/` | ✅ 200 | KEEP + update content | Silo 4 |
| `/led-watts-to-amps-calculator/` | ✅ 200 | KEEP + update content | Silo 4 |
| `/speaker-amp-power-calculator/` | ✅ 200 | KEEP + update | Silo 4 |
| `/amp-power-consumption-calculator/` | ✅ 200 | KEEP + update title | Silo 5 |
| `/amp-hours-to-watt-hours-calculator/` | ✅ 200 | KEEP + update | Silo 5 |
| `/amps-to-volt-amps-calculator/` | ✅ 200 | KEEP + update | Silo 5 |
| `/voltage-drop-calculator/` | ✅ 200 | KEEP — strong page | Silo 5 |
| `/wire-gauge-calculator/` | ✅ 200 | KEEP — strong page | Silo 5 |
| `/about-us/` | ✅ 200 | KEEP — E-E-A-T signal | Support |
| `/faq/` | ✅ 200 | Noindex — merge FAQ into homepage | Support |
| `/contact-us/` | ✅ 200 | Noindex | Support |
| `/site-map/` | ✅ 200 | Noindex | Support |
| `/privacy-policy/` | ✅ 200 | Noindex | Support |
| `/cookie-policy/` | ✅ 200 | Noindex | Support |
| `/terms-and-conditions/` | ✅ 200 | Noindex | Support |
| `/disclaimer/` | ✅ 200 | Noindex | Support |

### Pages Listed in Sitemap But Return 404 ERROR

| URL | HTTP Status | Problem | Action |
|---|---|---|---|
| `/amps-to-watts-formula/` | ❌ **404** | Listed in sitemap, page doesn't exist | **BUILD THIS PAGE** |
| `/conversion-charts/` | ❌ **404** | Listed in sitemap, page doesn't exist | **BUILD THIS PAGE** |

**⚠️ CRITICAL:** Having URLs in your sitemap that return 404 tells Google your site has broken pages. Fix immediately. These two missing pages also target high-volume keywords (28K and 8K/month respectively).

---

## THE 7-SILO ARCHITECTURE

```
══════════════════════════════════════════════════════════════════
                    HOMEPAGE / DOMAIN HUB
                    ampstowatt.com (/)
                "Amps to Watts Calculator"
                    110,000 searches/mo
══════════════════════════════════════════════════════════════════
        │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼
   SILO 1      SILO 2      SILO 3      SILO 4      SILO 5
  REVERSE    CIRCUIT     VOLTAGE    APPLICATION  ELECTRICAL
 CONVERSION   TYPE      SPECIFIC      TOOLS       TOOLS
        │           │           │
        ▼           ▼           ▼
   SILO 6      SILO 7
  SPECIFIC    EDUCATION
   VALUES      & LEARN
══════════════════════════════════════════════════════════════════
```

---

## SILO 1 — REVERSE CONVERSION (Watts → Amps)

**Silo Purpose:** Capture all "watts to amps" intent — users who know watts and need amps.
**Silo Hub:** `/watts-to-amps-calculator/`
**Cross-link to Homepage:** YES (always — it's the reverse of the homepage tool)

### Pages in Silo 1

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/watts-to-amps-calculator/` | ✅ EXISTS | watts to amps calculator | 90,000 | Hub — Critical |
| `/watts-to-amps-12v/` | ❌ MISSING | watts to amps 12v | 14,000 | Build Phase 2 |
| `/watts-to-amps-120v/` | ❌ MISSING | watts to amps 120v | 18,000 | Build Phase 2 |
| `/watts-to-amps-240v/` | ❌ MISSING | watts to amps 240v | 12,000 | Build Phase 2 |
| `/watts-to-amps-formula/` | ❌ MISSING | watts to amps formula | 9,000 | Build Phase 2 |
| `/1000-watts-to-amps/` | ❌ MISSING | 1000 watts to amps | 8,000 | Build Phase 3 |
| `/1500-watts-to-amps/` | ❌ MISSING | 1500 watts to amps | 7,000 | Build Phase 3 |
| `/2000-watts-to-amps/` | ❌ MISSING | 2000 watts to amps | 6,000 | Build Phase 3 |

### Silo 1 Internal Linking Rules

```
/watts-to-amps-calculator/ (HUB)
  ↔ links to all voltage-specific watts-to-amps pages
  ↔ links to / (homepage) — "For the reverse conversion..."
  
/watts-to-amps-12v/ (SPOKE)
  → links back to /watts-to-amps-calculator/ (hub)
  → links to /12v-amps-to-watts-calculator/ (cross-silo: Silo 3)
  → links to / (homepage)
  
/watts-to-amps-formula/ (SPOKE)
  → links back to /watts-to-amps-calculator/ (hub)
  → links to /amps-to-watts-formula/ (cross-silo: Silo 7)
```

### Topical Authority Gap: Silo 1

The existing watts-to-amps page exists but has NO satellite pages around it. It's an isolated spoke with no internal link support. It's competing alone for 90K searches/month against sites that have full topic clusters. Adding the voltage-specific pages would dramatically boost the hub's authority.

---

## SILO 2 — CIRCUIT TYPE (AC / DC / Phase)

**Silo Purpose:** Capture all circuit-type-specific searches — users who know what type of circuit they have.
**Silo Hub:** `/ac-amps-to-watts-calculator/` (highest traffic) + `/dc-amps-to-watts-calculator/`
**Cross-link to Homepage:** YES from hub pages

### Pages in Silo 2

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/ac-amps-to-watts-calculator/` | ✅ EXISTS (spam — fix) | ac amps to watts calculator | 22,000 | Hub — Critical |
| `/dc-amps-to-watts-calculator/` | ✅ EXISTS | dc amps to watts calculator | 18,000 | Hub — Critical |
| `/3-phase-amps-to-watts-calculator/` | ✅ EXISTS | 3 phase amps to watts | 12,000 | Spoke — Keep |
| `/single-phase-amps-to-watts-calculator/` | ✅ EXISTS | single phase amps to watts | 8,000 | Spoke — Keep |
| `/ac-single-phase-amps-to-watts/` | ❌ MISSING | single phase ac amps to watts | 5,000 | Build Phase 3 |
| `/3-phase-ac-amps-to-watts/` | ❌ MISSING | three phase amps to watts 480v | 4,000 | Build Phase 3 |
| `/208v-3-phase-amps-to-watts/` | ❌ MISSING | 208v 3 phase amps to watts | 3,500 | Build Phase 3 |
| `/400v-3-phase-amps-to-watts/` | ❌ MISSING | 400v 3 phase amps to watts | 3,000 | Build Phase 3 |
| `/480v-3-phase-amps-to-watts/` | ❌ MISSING | 480v amps to watts | 5,000 | Build Phase 2 |

### Silo 2 Internal Linking Rules

```
/ac-amps-to-watts-calculator/ (HUB)
  ↔ /single-phase-amps-to-watts-calculator/ (AC sub-type)
  ↔ /3-phase-amps-to-watts-calculator/ (AC sub-type)
  → /power-factor/ (cross-silo: Silo 5)
  → / (homepage)

/dc-amps-to-watts-calculator/ (HUB)
  ↔ /12v-amps-to-watts-calculator/ (cross-silo: Silo 3 — most common DC voltage)
  ↔ /solar-watts-to-amps-calculator/ (cross-silo: Silo 4)
  → / (homepage)

/3-phase-amps-to-watts-calculator/ (SPOKE)
  → /ac-amps-to-watts-calculator/ (parent hub)
  → /480v-3-phase-amps-to-watts/ (sub-spoke)
  → /kva-to-watts-calculator/ (cross-silo: Silo 5)
  → / (homepage)
```

### Topical Authority Gap: Silo 2

The 3-phase and single-phase pages exist but have no supporting voltage-specific 3-phase pages. Industrial users searching "208V 3-phase amps to watts" or "480V 3-phase watts" find nothing. These are LOW competition, high-intent commercial searches.

---

## SILO 3 — VOLTAGE SPECIFIC

**Silo Purpose:** Capture voltage-specific searches where users already know their circuit voltage.
**Silo Hub:** Create a NEW hub page: `/voltage-calculator/` OR use `/120v-amps-to-watts-calculator/` as anchor
**Cross-link to Homepage:** YES from hub

### Pages in Silo 3

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/12v-amps-to-watts-calculator/` | ✅ EXISTS (spam — fix) | 12v amps to watts | 14,000 | Spoke — Critical |
| `/120v-amps-to-watts-calculator/` | ✅ EXISTS | 120v amps to watts | 22,000 | Spoke — Critical |
| `/220v-amps-to-watts-calculator/` | ✅ EXISTS | 220v amps to watts | 16,000 | Spoke — Keep |
| `/230v-amps-to-watts-calculator/` | ✅ EXISTS | 230v amps to watts | 9,000 | Spoke — Keep |
| `/240v-amps-to-watts-calculator/` | ✅ EXISTS | 240v amps to watts | 18,000 | Spoke — Keep |
| `/480v-amps-to-watts-calculator/` | ❌ MISSING | 480v amps to watts | 5,000 | Build Phase 2 |
| `/24v-amps-to-watts/` | ❌ MISSING | 24v amps to watts | 4,500 | Build Phase 3 |
| `/48v-amps-to-watts/` | ❌ MISSING | 48v amps to watts | 3,500 | Build Phase 3 |
| `/208v-amps-to-watts/` | ❌ MISSING | 208v amps to watts | 3,000 | Build Phase 3 |
| `/277v-amps-to-watts/` | ❌ MISSING | 277v amps to watts | 2,500 | Build Phase 3 |

### Silo 3 Internal Linking Rules

```
/120v-amps-to-watts-calculator/ (de-facto ANCHOR of Silo 3)
  ↔ /240v-amps-to-watts-calculator/ ("For 240V dryer circuits...")
  ↔ /220v-amps-to-watts-calculator/ ("For 220V appliances...")
  → / (homepage)
  → /watts-to-amps-calculator/ (cross-silo: Silo 1)

/12v-amps-to-watts-calculator/ (SPOKE)
  ↔ /24v-amps-to-watts/ (next voltage up)
  → /dc-amps-to-watts-calculator/ (cross-silo: Silo 2)
  → /solar-watts-to-amps-calculator/ (cross-silo: Silo 4)
  → / (homepage)

/240v-amps-to-watts-calculator/ (SPOKE)
  ↔ /120v-amps-to-watts-calculator/ (related voltage)
  → /ev-charger-amps-to-watts/ (cross-silo: Silo 4)
  → / (homepage)
```

### Topical Authority Gap: Silo 3

Missing 480V (industrial), 24V (telecom/solar), 48V (solar battery systems, telecom), and 208V (commercial 3-phase Y) pages. These voltages have real searchers — electricians, engineers, data center technicians — who are HIGH-INTENT users. LOW competition for these specific voltages.

---

## SILO 4 — APPLICATION PAGES (Use-Case)

**Silo Purpose:** Capture intent-driven searches where users have a specific device or scenario. These users KNOW what they're trying to calculate and convert at the highest rate.
**Silo Hub:** `/amp-power-consumption-calculator/` (already exists, needs positioning as hub)
**Cross-link to Homepage:** YES

### Pages in Silo 4

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/amp-power-consumption-calculator/` | ✅ EXISTS | amp power consumption calculator | 6,000 | HUB — reposition |
| `/solar-watts-to-amps-calculator/` | ✅ EXISTS | solar watts to amps | 10,000 | Spoke — update |
| `/led-watts-to-amps-calculator/` | ✅ EXISTS | led watts to amps | 8,000 | Spoke — update |
| `/speaker-amp-power-calculator/` | ✅ EXISTS | speaker amp power | 5,000 | Spoke — keep |
| `/air-conditioner-amps-to-watts/` | ❌ MISSING | air conditioner amps to watts | 14,000 | **Build First** |
| `/generator-amps-to-watts/` | ❌ MISSING | generator amps to watts | 12,000 | **Build First** |
| `/ev-charger-amps-to-watts/` | ❌ MISSING | ev charger amps to watts | 9,000 | **Build First** |
| `/electric-motor-amps-to-watts/` | ❌ MISSING | motor amps to watts | 8,000 | **Build First** |
| `/refrigerator-amps-to-watts/` | ❌ MISSING | refrigerator amps to watts | 6,000 | Build Phase 2 |
| `/microwave-amps-to-watts/` | ❌ MISSING | microwave amps to watts | 5,500 | Build Phase 2 |
| `/dryer-amps-to-watts/` | ❌ MISSING | dryer amps to watts | 5,000 | Build Phase 2 |
| `/pool-pump-amps-to-watts/` | ❌ MISSING | pool pump amps to watts | 4,500 | Build Phase 2 |
| `/water-heater-amps-to-watts/` | ❌ MISSING | water heater amps to watts | 4,000 | Build Phase 2 |
| `/battery-charger-amps-to-watts/` | ❌ MISSING | battery charger amps to watts | 3,500 | Build Phase 3 |
| `/heat-pump-amps-to-watts/` | ❌ MISSING | heat pump amps to watts | 3,500 | Build Phase 3 |
| `/well-pump-amps-to-watts/` | ❌ MISSING | well pump amps to watts | 3,000 | Build Phase 3 |
| `/welding-machine-amps-to-watts/` | ❌ MISSING | welder amps to watts | 2,500 | Build Phase 3 |

### Silo 4 Internal Linking Rules

```
/amp-power-consumption-calculator/ (HUB)
  ↔ /air-conditioner-amps-to-watts/
  ↔ /generator-amps-to-watts/
  ↔ /ev-charger-amps-to-watts/
  ↔ /electric-motor-amps-to-watts/
  ↔ /solar-watts-to-amps-calculator/
  ↔ /refrigerator-amps-to-watts/
  → / (homepage)

/air-conditioner-amps-to-watts/ (SPOKE)
  → /amp-power-consumption-calculator/ (silo hub)
  → /240v-amps-to-watts-calculator/ (cross-silo: voltage)
  → /ac-amps-to-watts-calculator/ (cross-silo: circuit type)
  → / (homepage)

/solar-watts-to-amps-calculator/ (SPOKE)
  → /amp-power-consumption-calculator/ (silo hub)
  → /12v-amps-to-watts-calculator/ (cross-silo: 12V is main solar voltage)
  → /dc-amps-to-watts-calculator/ (cross-silo: solar is DC)
  → /amp-hours-to-watt-hours-calculator/ (cross-silo: Silo 5)
  → / (homepage)
```

### Topical Authority Gap: Silo 4

This silo is the BIGGEST opportunity. Zero application pages exist except solar, LED, and speaker — which are niche use cases. The mainstream use cases (air conditioner, generator, EV charger, motor, refrigerator, dryer) get combined 50,000+ monthly searches and have LOW competition. These pages also have the HIGHEST user intent — someone searching "air conditioner amps to watts" is about to buy a breaker or plan a circuit.

---

## SILO 5 — RELATED ELECTRICAL TOOLS

**Silo Purpose:** Capture adjacent electrical calculation searches. These users need a different (but related) calculation. Each tool builds domain authority for "electrical calculations" broadly.
**Silo Hub:** `/calculators/` page (rebuild as a real content hub, not just a navigation list)

### Pages in Silo 5

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/calculators/` | ✅ EXISTS (navigation) | electrical calculators | 4,000 | Rebuild as HUB |
| `/watts-to-amps-calculator/` | ✅ EXISTS | watts to amps | 90,000 | Keep (also Silo 1) |
| `/kva-to-watts-calculator/` | ✅ EXISTS | kva to watts | 22,000 | Keep |
| `/power-factor/` | ✅ EXISTS | power factor calculator | 28,000 | Keep (update URL) |
| `/amps-to-kw-calculator/` | ✅ EXISTS | amps to kw | 18,000 | Keep |
| `/amp-hours-to-watt-hours-calculator/` | ✅ EXISTS | amp hours to watt hours | 14,000 | Keep |
| `/voltage-drop-calculator/` | ✅ EXISTS | voltage drop calculator | 16,000 | Keep |
| `/wire-gauge-calculator/` | ✅ EXISTS | wire gauge calculator | 22,000 | Keep |
| `/amps-to-volt-amps-calculator/` | ✅ EXISTS | amps to va | 6,000 | Keep |
| `/megawatts-to-amps-calculator/` | ✅ EXISTS | megawatts to amps | 3,000 | Keep |
| `/amp-power-consumption-calculator/` | ✅ EXISTS | amp power consumption | 6,000 | Keep (also Silo 4) |
| `/kw-to-amps-calculator/` | ❌ MISSING | kw to amps | 24,000 | **Build Phase 1** |
| `/kva-to-amps-calculator/` | ❌ MISSING | kva to amps | 10,000 | Build Phase 2 |
| `/watts-to-kw-calculator/` | ❌ MISSING | watts to kw | 8,000 | Build Phase 2 |
| `/ohms-law-calculator/` | ❌ MISSING | ohms law calculator | 18,000 | Build Phase 2 |
| `/electrical-load-calculator/` | ❌ MISSING | electrical load calculator | 8,000 | Build Phase 2 |
| `/watts-to-kwh-calculator/` | ❌ MISSING | watts to kwh | 12,000 | Build Phase 2 |
| `/kwh-to-watts-calculator/` | ❌ MISSING | kwh to watts | 10,000 | Build Phase 2 |
| `/circuit-breaker-calculator/` | ❌ MISSING | circuit breaker size calculator | 8,000 | Build Phase 3 |
| `/generator-size-calculator/` | ❌ MISSING | generator size calculator | 9,000 | Build Phase 3 |

**CRITICAL MISSING PAGE:** `/kw-to-amps-calculator/` (24,000 searches/month, LOW competition) — the site has `/amps-to-kw-calculator/` but NOT the reverse direction which gets more searches!

### Silo 5 Internal Linking Rules

```
/calculators/ (HUB — rebuild as real content hub)
  ↔ ALL other Silo 5 pages (full list)
  → / (homepage)

Each Silo 5 page MUST link to:
  → / (homepage — "For amps to watts...")
  → /calculators/ (silo hub — "Browse all electrical calculators")
  → 2-3 closely related Silo 5 pages contextually

/kva-to-watts-calculator/ (SPOKE)
  → /power-factor/ (power factor is required for kVA to W)
  → /kva-to-amps-calculator/ (related reverse)
  → /3-phase-amps-to-watts-calculator/ (kVA common in 3-phase)

/voltage-drop-calculator/ (SPOKE)
  → /wire-gauge-calculator/ (natural next step)
  → /12v-amps-to-watts-calculator/ (cross-silo: low-voltage drop)
  → / (homepage)
```

### Topical Authority Gap: Silo 5

Missing `/kw-to-amps-calculator/` is the biggest gap — 24,000 searches/month with LOW competition, and it's the direct reverse of a page that already exists. The site also misses `/ohms-law-calculator/` (18K/mo) which is deeply related to all the power calculations already on the site.

---

## SILO 6 — SPECIFIC VALUE QUERIES

**Silo Purpose:** Capture searchers who want an instant answer for a specific amperage value. These are among the most searched queries related to amps-to-watts and they are ALL missing from the site.
**Silo Hub:** `/how-many-watts-per-amp/` [MISSING — build first]

### Pages in Silo 6

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/how-many-watts-per-amp/` | ❌ MISSING | how many watts per amp | 40,000 | **Hub — BUILD FIRST** |
| `/1-amp-to-watts/` | ❌ MISSING | 1 amp to watts | 22,000 | Build Phase 1 |
| `/2-amps-to-watts/` | ❌ MISSING | 2 amps to watts | 8,000 | Build Phase 2 |
| `/3-amps-to-watts/` | ❌ MISSING | 3 amps to watts | 6,000 | Build Phase 2 |
| `/5-amps-to-watts/` | ❌ MISSING | 5 amps to watts | 18,000 | Build Phase 1 |
| `/10-amps-to-watts/` | ❌ MISSING | 10 amps to watts | 35,000 | **Build Phase 1** |
| `/15-amps-to-watts/` | ❌ MISSING | 15 amps to watts | 28,000 | **Build Phase 1** |
| `/20-amps-to-watts/` | ❌ MISSING | 20 amps to watts | 24,000 | Build Phase 1 |
| `/25-amps-to-watts/` | ❌ MISSING | 25 amps to watts | 8,000 | Build Phase 2 |
| `/30-amps-to-watts/` | ❌ MISSING | 30 amps to watts | 18,000 | Build Phase 1 |
| `/40-amps-to-watts/` | ❌ MISSING | 40 amps to watts | 10,000 | Build Phase 2 |
| `/50-amps-to-watts/` | ❌ MISSING | 50 amps to watts | 12,000 | Build Phase 1 |
| `/60-amps-to-watts/` | ❌ MISSING | 60 amps to watts | 8,000 | Build Phase 2 |
| `/100-amps-to-watts/` | ❌ MISSING | 100 amps to watts | 9,000 | Build Phase 2 |
| `/200-amps-to-watts/` | ❌ MISSING | 200 amps to watts | 6,000 | Build Phase 3 |
| `/0.5-amps-to-watts/` | ❌ MISSING | 0.5 amps to watts | 3,000 | Build Phase 3 |

### Silo 6 Internal Linking Rules

```
/how-many-watts-per-amp/ (HUB)
  ↔ /1-amp-to-watts/ ("For 1 amp specifically...")
  ↔ /5-amps-to-watts/ ("For 5 amps...")
  ↔ /10-amps-to-watts/ ("For 10 amps...")
  ↔ /15-amps-to-watts/ ("15 amps = standard circuit")
  ↔ /20-amps-to-watts/ ("20 amps = kitchen circuit")
  → / (homepage)

Each value page links to ADJACENT values:
/10-amps-to-watts/
  → /how-many-watts-per-amp/ (silo hub)
  → /15-amps-to-watts/ (next common circuit)
  → /5-amps-to-watts/ (previous value)
  → /120v-amps-to-watts-calculator/ (cross-silo: most common voltage for 10A)
  → / (homepage)
```

### Topical Authority Gap: Silo 6

This entire silo is MISSING. That's 16 pages representing approximately 217,000 combined monthly searches with LOW competition. These are exactly the kinds of pages that:
1. Rank quickly (low competition, clear search intent)
2. Generate featured snippets ("10 amps = 1,200W at 120V")
3. Drive internal traffic to the calculator pages
4. Build topical authority for the domain

---

## SILO 7 — EDUCATION & LEARNING

**Silo Purpose:** Build E-E-A-T (expertise, authority, trust) signals. Educational content captures "how/why/what" queries and drives users to calculators. Also creates featured snippet opportunities.
**Silo Hub:** `/amps-to-watts-formula/` [CURRENTLY 404 — needs to be built]

### Pages in Silo 7

| URL | Status | Target Keyword | Monthly Searches | Priority |
|---|---|---|---|---|
| `/amps-to-watts-formula/` | ❌ **404 ERROR** | amps to watts formula | 28,000 | **BUILD IMMEDIATELY** |
| `/conversion-charts/` | ❌ **404 ERROR** | amps to watts chart | 8,000 | **BUILD IMMEDIATELY** |
| `/amps-vs-watts/` | ❌ MISSING | amps vs watts | 22,000 | Build Phase 1 |
| `/watts-law-explained/` | ❌ MISSING | watts law | 12,000 | Build Phase 2 |
| `/power-factor-explained/` | ❌ MISSING | what is power factor | 9,000 | Build Phase 2 |
| `/electrical-units-guide/` | ❌ MISSING | electrical units explained | 6,000 | Build Phase 2 |
| `/how-to-read-electric-meter/` | ❌ MISSING | how to read electric meter | 8,000 | Build Phase 3 |
| `/kwh-explained/` | ❌ MISSING | what is kwh | 12,000 | Build Phase 2 |
| `/nec-electrical-code-guide/` | ❌ MISSING | nec electrical code | 5,000 | Build Phase 3 |
| `/electrical-load-calculation-guide/` | ❌ MISSING | electrical load calculation | 6,000 | Build Phase 3 |

### Silo 7 Internal Linking Rules

```
/amps-to-watts-formula/ (HUB)
  ↔ /amps-vs-watts/
  ↔ /watts-law-explained/
  ↔ /power-factor-explained/
  → / (homepage — "Use the calculator here")
  → /conversion-charts/ (reference table)

/amps-vs-watts/ (SPOKE)
  → /amps-to-watts-formula/ (silo hub)
  → / (homepage)
  → /how-many-watts-per-amp/ (cross-silo: Silo 6)

/watts-law-explained/ (SPOKE)
  → /amps-to-watts-formula/ (silo hub)
  → /power-factor-explained/ (related concept)
  → / (homepage)
```

### Topical Authority Gap: Silo 7

Two pages that are **listed in the sitemap return 404 errors** (`/amps-to-watts-formula/` and `/conversion-charts/`). These are high-volume targets (28K + 8K = 36K/month) that the site is telling Google it has but actually doesn't. This is a Google Trust issue — the sitemap says these URLs exist, Google tries to crawl them, finds 404, and this damages site credibility.

---

## COMPLETE INTERNAL LINKING MAP

### The Linking Hierarchy Rules

```
TIER 1 (Homepage) → can link to anything
TIER 2 (Silo Hub) → links to own silo + homepage + 1-2 cross-silo
TIER 3 (Spoke) → links to own silo hub + homepage + 1-2 cross-silo
```

### Cross-Silo Links (Allowed and Required)

These cross-silo links are NATURAL and should be included:

| From Page (Silo) | To Page (Silo) | Why It's Natural |
|---|---|---|
| `/dc-amps-to-watts-calculator/` (S2) | `/12v-amps-to-watts-calculator/` (S3) | 12V is the most common DC voltage |
| `/12v-amps-to-watts-calculator/` (S3) | `/solar-watts-to-amps-calculator/` (S4) | 12V is main solar battery voltage |
| `/3-phase-amps-to-watts-calculator/` (S2) | `/kva-to-watts-calculator/` (S5) | 3-phase often involves kVA |
| `/power-factor/` (S5) | `/ac-amps-to-watts-calculator/` (S2) | PF is needed for AC calculations |
| `/voltage-drop-calculator/` (S5) | `/wire-gauge-calculator/` (S5) | These two are always used together |
| `/240v-amps-to-watts-calculator/` (S3) | `/ev-charger-amps-to-watts/` (S4) | EVs use 240V circuits |
| `/how-many-watts-per-amp/` (S6) | `/amps-to-watts-formula/` (S7) | Related concept |
| `/air-conditioner-amps-to-watts/` (S4) | `/240v-amps-to-watts-calculator/` (S3) | ACs often use 240V |
| `/10-amps-to-watts/` (S6) | `/120v-amps-to-watts-calculator/` (S3) | 10A at 120V is the example |
| `/generator-amps-to-watts/` (S4) | `/watts-to-amps-calculator/` (S1) | Generator sizing goes both ways |
| `/amp-hours-to-watt-hours-calculator/` (S5) | `/amp-power-consumption-calculator/` (S4) | Both are about battery/energy |

---

## COMPLETE PAGE COUNT SUMMARY

| Silo | Existing Pages | Missing Pages | Total After Fix |
|---|---|---|---|
| Silo 1 — Reverse Conversion | 1 | 7 | 8 |
| Silo 2 — Circuit Type | 4 | 5 | 9 |
| Silo 3 — Voltage Specific | 5 | 5 | 10 |
| Silo 4 — Application | 3 | 14 | 17 |
| Silo 5 — Related Tools | 11 | 9 | 20 |
| Silo 6 — Specific Values | 0 | 16 | 16 |
| Silo 7 — Education | 0 (2 are 404!) | 10 | 10 |
| **TOTAL** | **24 real pages** | **66 new pages** | **90 pages** |

---

## TOPICAL AUTHORITY SCORE BY SILO

| Silo | Current Score | Target Score | Gap |
|---|---|---|---|
| Silo 1 | 2/10 | 8/10 | Need 7 more pages |
| Silo 2 | 4/10 | 8/10 | Need duplicates removed + 5 pages |
| Silo 3 | 3/10 | 8/10 | Need duplicates removed + 5 pages |
| Silo 4 | 2/10 | 9/10 | Need 14 new application pages |
| Silo 5 | 6/10 | 9/10 | Need 9 more tools (kW to amps most urgent) |
| Silo 6 | 0/10 | 9/10 | Entire silo missing — 16 pages needed |
| Silo 7 | 0/10 | 8/10 | Two 404s + 8 more educational pages needed |
| **OVERALL** | **2.4/10** | **8.5/10** | Major work required |

---

## PRIORITY BUILD QUEUE — ALL SILOS COMBINED

### Week 1 — Emergency Fixes (Zero Building Required)
1. Fix `/amps-to-watts-formula/` 404 → BUILD this page
2. Fix `/conversion-charts/` 404 → BUILD this page
3. Delete spam content (AC and 12V pages)
4. Set up 301 redirects for all duplicate pairs
5. Fix sitemap.xml 500 error
6. Add noindex to 9 utility/legal pages
7. Submit fixed sitemap to Google Search Console

### Week 2 — Silo 6 Hub + Top Value Pages (Fastest Rankings)
8. Build `/how-many-watts-per-amp/` — Silo 6 hub (40K/mo, zero competition)
9. Build `/10-amps-to-watts/` (35K/mo)
10. Build `/15-amps-to-watts/` (28K/mo)
11. Build `/20-amps-to-watts/` (24K/mo)

### Week 3 — Complete Silo 6 Core
12. Build `/5-amps-to-watts/` (18K/mo)
13. Build `/30-amps-to-watts/` (18K/mo)
14. Build `/1-amp-to-watts/` (22K/mo)
15. Build `/50-amps-to-watts/` (12K/mo)

### Week 4 — Silo 5 Critical Gap
16. Build `/kw-to-amps-calculator/` (24K/mo — reverse of existing page!)
17. Build `/ohms-law-calculator/` (18K/mo)
18. Build `/watts-to-kwh-calculator/` (12K/mo)

### Month 2, Week 1 — Silo 4 Application Pages
19. Build `/air-conditioner-amps-to-watts/` (14K/mo)
20. Build `/generator-amps-to-watts/` (12K/mo)
21. Build `/ev-charger-amps-to-watts/` (9K/mo)
22. Build `/electric-motor-amps-to-watts/` (8K/mo)

### Month 2, Week 2 — Silo 7 Educational Content
23. Build `/amps-vs-watts/` (22K/mo)
24. Build `/kwh-explained/` (12K/mo)
25. Build `/watts-law-explained/` (12K/mo)
26. Build `/power-factor-explained/` (9K/mo)

### Month 2, Week 3 — Silo 1 Reverse Expansion
27. Build `/watts-to-amps-120v/` (18K/mo)
28. Build `/watts-to-amps-12v/` (14K/mo)
29. Build `/watts-to-amps-240v/` (12K/mo)
30. Build `/watts-to-amps-formula/` (9K/mo)

### Month 2, Week 4 — Silo 3 & 2 Expansion
31. Build `/480v-amps-to-watts-calculator/` (5K/mo)
32. Build `/kva-to-amps-calculator/` (10K/mo)
33. Build `/208v-3-phase-amps-to-watts/` (3.5K/mo)
34. Build `/480v-3-phase-amps-to-watts/` (5K/mo)

### Month 3 — Silo 4 Expansion (More Application Pages)
35. Build `/refrigerator-amps-to-watts/` (6K/mo)
36. Build `/microwave-amps-to-watts/` (5.5K/mo)
37. Build `/dryer-amps-to-watts/` (5K/mo)
38. Build `/pool-pump-amps-to-watts/` (4.5K/mo)
39. Build `/water-heater-amps-to-watts/` (4K/mo)

---

## SILO INTERNAL LINK TEMPLATE

### For Every NEW Page — Required Internal Links

**In the article BODY (not footer):**
1. One link to the SILO HUB: "For all [topic] conversions, see the [hub page name]."
2. One link to the HOMEPAGE: "Use the main [Amps to Watts Calculator] for any amperage."
3. One ADJACENT page link: "Related: [adjacent page in same silo]"
4. One CROSS-SILO link (where natural): "For [related topic], use the [cross-silo page]."

**In the Related Calculators section (footer/bottom):**
- List 4-6 pages from the same silo
- List 2 cross-silo pages

**NEVER link:**
- To legal/support pages (privacy, contact, sitemap) from article body
- To the `/calculators/` directory from article body (only from footer)
- More than 8 internal links total per page body

---

## ANCHOR TEXT RULES

| Link Target | Correct Anchor Text | Wrong Anchor Text |
|---|---|---|
| Homepage `/` | "Amps to Watts Calculator" | "click here", "this tool", "main page" |
| `/watts-to-amps-calculator/` | "Watts to Amps Calculator" | "reverse conversion", "here" |
| `/ac-amps-to-watts-calculator/` | "AC Amps to Watts Calculator" | "AC calculator", "this calculator" |
| `/10-amps-to-watts/` | "10 amps to watts conversion" | "10A page", "this page" |
| `/power-factor/` | "Power Factor Calculator" | "PF calculator", "power factor page" |
| `/voltage-drop-calculator/` | "Voltage Drop Calculator" | "voltage drop tool", "check here" |

Use keyword-rich anchor text consistently. Never repeat the same anchor text more than twice per page.
