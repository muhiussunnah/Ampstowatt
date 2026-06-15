# ampstowatt.com — Complete Fix Prompt
## For: Antigravity / Claude / VS Code AI / Any AI Coding Agent
## COPY EVERYTHING BELOW THIS LINE

---

# WEBSITE FIX REQUEST: ampstowatt.com

## Your Task
Fix the SEO and content issues on my electrical calculator website **ampstowatt.com** by:
1. Removing spam/garbage content from affected pages
2. Setting up 301 redirects for duplicate pages
3. Updating all title tags and H1s
4. Building 8 new missing pages
5. Fixing the sitemap
6. Adding internal links to page bodies
7. Adding JSON-LD schema markup

This is a production website. All changes must be backward-compatible.

---

## STEP 1 — DELETE SPAM CONTENT (Do This First)

### File: `/ac-amps-to-watts-calculator/` (and identical `/amps-to-watts-ac-calculator/`)

**FIND this text and DELETE IT:**
```
Solar shopping labels such as Top solar contractors, American Made Solar Panels, RV Solar Panels, Residential Solar Panels, Bifacial Solar Panels, Wholesale Solar By The Pallet, Clearance, Wholesale, Commercial, Meyer Burger, Meyer Burger 375W Solar Panel, 120 Cell HJT All-Black, MB_B120AyB_375, Hyperion (Runergy), Hyperion (Runergy) 405W Solar Panel, 108 Cells PERC Bifacial, HY-DH108P8B-405, Meyer Burger 385W Solar Panel, MB_B120AyB_385, and Riverton, NJ are product context; the power formula still uses amps, volts, and PF.
```

**REPLACE WITH:**
```
Common household AC loads include window air conditioners (5–10 A at 120V), refrigerators (1.5–3 A at 120V), microwave ovens (8–15 A at 120V), and electric dryers (20–25 A at 240V). For each, real watts equal amps × volts × power factor from the nameplate.
```

**ALSO FIND AND DELETE these boilerplate lines (no replacement needed):**
```
Reference labels such as ChatGPT, Google AI, Perplexity, Claude, Grok, X, Facebook, Pinterest, and Telegram are sharing options, not calculation inputs.
```
```
Use the calculator from Home, Calculators, or All calculators style pages when a load label gives Current (A) and Voltage (V). Reference labels such as ChatGPT, Google AI, Perplexity, Claude, Grok, X, Facebook, Pinterest, and Telegram are sharing options, not calculation inputs.
```

---

### File: `/12v-amps-to-watts-calculator/`

**FIND and DELETE:**
```
Reference authors and institutions in electrical calculation content include Joe Sexton, Aditya Dua, Kevin Weekly, Inch Calculator, Stanford University, University of California Berkeley, and University of Texas.
```

**REPLACE WITH:**
```
For installation safety, verify all wire gauge, fuse sizing, and connector ratings against the maximum continuous current. Consult your vehicle or RV manufacturer's electrical specifications for system-level planning.
```

**Also search the ENTIRE codebase for these strings and delete any instances:**
- `"Inch Calculator"` (as a reference/citation)
- `"Meyer Burger"`
- `"MB_B120AyB"`
- `"Hyperion (Runergy)"`
- `"Riverton, NJ"`
- Any phrase like "Reference labels such as ChatGPT"
- Any phrase like "Reference authors and institutions include"

---

## STEP 2 — SET UP 301 REDIRECTS

Add these permanent 301 redirects to your server config or Next.js/framework config:

```
/amps-to-watts-ac-calculator/      → /ac-amps-to-watts-calculator/
/ac-calculator/                    → /ac-amps-to-watts-calculator/
/amps-to-watts-dc-calculator/      → /dc-amps-to-watts-calculator/
/dc-calculator/                    → /dc-amps-to-watts-calculator/
/amps-to-watts-3-phase-calculator/ → /3-phase-amps-to-watts-calculator/
/3-phase-calculator/               → /3-phase-amps-to-watts-calculator/
/single-phase-calculator/          → /single-phase-amps-to-watts/
/amps-to-watts-120v-calculator/    → /120v-amps-to-watts/
/120v-calculator/                  → /120v-amps-to-watts/
/120v-amps-to-watts-calculator/    → /120v-amps-to-watts/
/amps-to-watts-220v-calculator/    → /220v-amps-to-watts/
/220v-calculator/                  → /220v-amps-to-watts/
/220v-amps-to-watts-calculator/    → /220v-amps-to-watts/
/amps-to-watts-230v-calculator/    → /230v-amps-to-watts/
/230v-calculator/                  → /230v-amps-to-watts/
/230v-amps-to-watts-calculator/    → /230v-amps-to-watts/
/amps-to-watts-240v-calculator/    → /240v-amps-to-watts/
/240v-calculator/                  → /240v-amps-to-watts/
/240v-amps-to-watts-calculator/    → /240v-amps-to-watts/
/12v-calculator/                   → /12v-amps-to-watts/
/12v-amps-to-watts-calculator/     → /12v-amps-to-watts/
/faq/                              → /#faq
/other-voltages/                   → /
/voltage-amps-watts-calculator/    → /
```

If you're using Next.js, add to `next.config.js`:
```javascript
async redirects() {
  return [
    { source: '/amps-to-watts-ac-calculator/', destination: '/ac-amps-to-watts-calculator/', permanent: true },
    { source: '/ac-calculator/', destination: '/ac-amps-to-watts-calculator/', permanent: true },
    // ... (all redirects above)
  ]
}
```

---

## STEP 3 — ADD NOINDEX TO UTILITY PAGES

Add `<meta name="robots" content="noindex, follow">` to the `<head>` of:
- `/site-map/`
- `/calculators/`
- `/cookie-policy/`
- `/cookie-preferences/`
- `/privacy-policy/`
- `/terms-and-conditions/`
- `/disclaimer/`

---

## STEP 4 — UPDATE TITLE TAGS AND H1s

Update EVERY page's `<title>` tag and `<h1>` tag as specified in the table below.
Make sure the site name separator is `|` (pipe) not `-` (hyphen).
All titles must be under 60 characters.

| Page URL | New Title Tag | New H1 |
|---|---|---|
| `/` | Amps to Watts Calculator — DC, AC & 3-Phase \| Ampstowatt | Amps to Watts Calculator |
| `/watts-to-amps-calculator/` | Watts to Amps Calculator — Instant Conversion \| Ampstowatt | Watts to Amps Calculator |
| `/ac-amps-to-watts-calculator/` | AC Amps to Watts Calculator — Single & 3 Phase \| Ampstowatt | AC Amps to Watts Calculator |
| `/dc-amps-to-watts-calculator/` | DC Amps to Watts Calculator — Battery & Solar \| Ampstowatt | DC Amps to Watts Calculator |
| `/3-phase-amps-to-watts-calculator/` | 3-Phase Amps to Watts Calculator \| Ampstowatt | 3-Phase Amps to Watts Calculator |
| `/single-phase-amps-to-watts/` | Single-Phase Amps to Watts Calculator \| Ampstowatt | Single-Phase Amps to Watts Calculator |
| `/12v-amps-to-watts/` | 12V Amps to Watts Calculator — DC Battery & Solar \| Ampstowatt | 12V Amps to Watts Calculator |
| `/120v-amps-to-watts/` | 120V Amps to Watts Calculator — US Circuits \| Ampstowatt | 120V Amps to Watts Calculator |
| `/220v-amps-to-watts/` | 220V Amps to Watts Calculator — Appliances \| Ampstowatt | 220V Amps to Watts Calculator |
| `/230v-amps-to-watts/` | 230V Amps to Watts Calculator — UK & EU Mains \| Ampstowatt | 230V Amps to Watts Calculator |
| `/240v-amps-to-watts/` | 240V Amps to Watts Calculator — Dryers & EVs \| Ampstowatt | 240V Amps to Watts Calculator |
| `/kva-to-watts-calculator/` | kVA to Watts Calculator — Apparent to Real Power \| Ampstowatt | kVA to Watts Calculator |
| `/power-factor-calculator/` | Power Factor Calculator — Real & Apparent Power \| Ampstowatt | Power Factor Calculator |
| `/amps-to-kw-calculator/` | Amps to kW Calculator — Current to Kilowatts \| Ampstowatt | Amps to kW Calculator |
| `/amp-hours-to-watt-hours-calculator/` | Amp Hours to Watt Hours Calculator \| Ampstowatt | Amp Hours to Watt Hours Calculator |
| `/voltage-drop-calculator/` | Voltage Drop Calculator — Wire & Cable Planning \| Ampstowatt | Voltage Drop Calculator |
| `/wire-gauge-calculator/` | Wire Gauge Calculator — AWG Ampacity Guide \| Ampstowatt | Wire Gauge Calculator |
| `/solar-panel-amps-to-watts/` | Solar Watts to Amps Calculator — PV Sizing \| Ampstowatt | Solar Watts to Amps Calculator |
| `/led-watts-to-amps/` | LED Watts to Amps Calculator — Strip & Bulbs \| Ampstowatt | LED Watts to Amps Calculator |
| `/speaker-amp-power-calculator/` | Speaker Amp Power Calculator — Amplifier Sizing \| Ampstowatt | Speaker Amplifier Power Calculator |
| `/amps-to-watts-formula/` | Amps to Watts Formula — DC, AC & 3-Phase Guide \| Ampstowatt | Amps to Watts Formula |
| `/conversion-charts/` | Amps to Watts Chart — All Voltages \| Ampstowatt | Amps to Watts Conversion Chart |

---

## STEP 5 — BUILD THESE 8 NEW PAGES

Build each page as a standalone page with its own URL, title, H1, and content.

### New Page 1: `/how-many-watts-per-amp/`
**Priority: HIGHEST — Build this first**
- Title: How Many Watts Per Amp? — Answer at Every Voltage | Ampstowatt
- H1: How Many Watts Per Amp?
- Content required:
  - Opening paragraph answering the question directly (Featured Snippet target)
  - Calculator widget pre-set to 1A
  - Table: watts per amp at 12V, 24V, 48V, 120V, 208V, 220V, 230V, 240V, 277V, 480V
  - H2: Why Watts Per Amp Isn't Fixed (formula explanation)
  - H2: DC vs AC Watts Per Amp (power factor for AC)
  - H2: Watts Per Amp for Common US Circuits
  - 5 FAQs with JSON-LD FAQPage schema
  - Internal links to homepage, /1-amp-to-watts/, /120v-amps-to-watts/, /watts-to-amps-calculator/

### New Page 2: `/10-amps-to-watts/`
- Title: 10 Amps to Watts — Conversion at 12V, 120V & 240V | Ampstowatt
- H1: How Many Watts Is 10 Amps?
- Content required:
  - Answer paragraph: "10 amps = 1,200W at 120V, 2,400W at 240V, 120W at 12V"
  - Calculator widget pre-set to 10A
  - Conversion table (10A at all voltages)
  - Formula section
  - "What uses 10 amps?" section with appliance examples
  - Breaker safety section
  - 5 FAQs
  - Internal links

### New Page 3: `/15-amps-to-watts/`
- Title: 15 Amps to Watts — Standard US Circuit Guide | Ampstowatt
- H1: How Many Watts Is 15 Amps?
- Content: Same structure as /10-amps-to-watts/ but for 15A
- Key facts: 1,800W at 120V | 3,600W at 240V | 15A breaker = standard US circuit
- Include NEC 80% rule: 1,440W continuous limit on a 15A/120V circuit

### New Page 4: `/20-amps-to-watts/`
- Title: 20 Amps to Watts — 20A Circuit Wattage Guide | Ampstowatt
- H1: How Many Watts Is 20 Amps?
- Key facts: 2,400W at 120V | 4,800W at 240V | 20A is most common kitchen circuit
- NEC 80% continuous limit: 1,920W at 120V

### New Page 5: `/5-amps-to-watts/`
- Title: 5 Amps to Watts — Conversion at All Voltages | Ampstowatt
- H1: How Many Watts Is 5 Amps?
- Key facts: 60W at 12V | 600W at 120V | 1,200W at 240V

### New Page 6: `/1-amp-to-watts/`
- Title: 1 Amp to Watts — Conversion at 12V, 120V & 240V | Ampstowatt
- H1: How Many Watts Is 1 Amp?
- Key facts: 12W at 12V | 120W at 120V | 240W at 240V
- This is the base unit explanation page

### New Page 7: `/air-conditioner-amps-to-watts/`
- Title: Air Conditioner Amps to Watts Calculator | Ampstowatt
- H1: Air Conditioner Amps to Watts Calculator
- Content:
  - Intro paragraph about AC unit current and power
  - Calculator widget
  - Table: window AC, mini-split, central HVAC types with amps, voltage, PF, watts
  - Section: How to find your AC's amp rating (nameplate)
  - Section: Circuit sizing for your AC
  - 5 FAQs
  - Internal links to homepage, /240v-amps-to-watts/, /ac-amps-to-watts-calculator/

### New Page 8: `/amps-vs-watts/`
- Title: Amps vs Watts — What's the Difference? | Ampstowatt
- H1: Amps vs Watts: What's the Difference?
- Content:
  - Clear definition of amps (current flow)
  - Clear definition of watts (power / rate of work)
  - The relationship: Watt's Law P = I × V
  - Real-world analogy (water pipe: pressure = voltage, flow = amps, work = watts)
  - Table: comparing amps vs watts properties
  - When you'd care about amps (wire sizing, breakers)
  - When you'd care about watts (energy bills, appliance sizing)
  - 5 FAQs
  - Internal links

---

## STEP 6 — FIX THE SITEMAP

1. Fix the sitemap generator so `/sitemap.xml` returns HTTP 200 (currently returns 500)
2. The sitemap should include ONLY canonical URLs (after redirects above are in place)
3. Exclude all noindex pages
4. Add these new pages to the sitemap after building them

Minimum sitemap entries (in priority order):
```
/ (priority 1.0)
/watts-to-amps-calculator/ (priority 0.9)
/how-many-watts-per-amp/ (priority 0.9) [new]
/ac-amps-to-watts-calculator/ (priority 0.8)
/dc-amps-to-watts-calculator/ (priority 0.8)
/3-phase-amps-to-watts-calculator/ (priority 0.8)
/12v-amps-to-watts/ (priority 0.7)
/120v-amps-to-watts/ (priority 0.7)
/240v-amps-to-watts/ (priority 0.7)
/220v-amps-to-watts/ (priority 0.7)
/230v-amps-to-watts/ (priority 0.7)
/10-amps-to-watts/ (priority 0.7) [new]
/15-amps-to-watts/ (priority 0.7) [new]
/20-amps-to-watts/ (priority 0.7) [new]
/5-amps-to-watts/ (priority 0.7) [new]
/1-amp-to-watts/ (priority 0.7) [new]
/air-conditioner-amps-to-watts/ (priority 0.7) [new]
/amps-vs-watts/ (priority 0.7) [new]
/kva-to-watts-calculator/ (priority 0.7)
/power-factor-calculator/ (priority 0.7)
/amps-to-kw-calculator/ (priority 0.6)
/amp-hours-to-watt-hours-calculator/ (priority 0.6)
/voltage-drop-calculator/ (priority 0.6)
/wire-gauge-calculator/ (priority 0.6)
/solar-panel-amps-to-watts/ (priority 0.6)
/amps-to-watts-formula/ (priority 0.6)
/conversion-charts/ (priority 0.6)
/about-us/ (priority 0.3)
```

---

## STEP 7 — ADD JSON-LD SCHEMA TO ALL PAGES

Add this schema component to every calculator/converter page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "[PAGE TITLE]",
      "url": "https://ampstowatt.com/[SLUG]/",
      "description": "[META DESCRIPTION]",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "Ampstowatt",
        "url": "https://ampstowatt.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[FAQ QUESTION 1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[FAQ ANSWER 1]"
          }
        }
        // ... repeat for each FAQ
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ampstowatt.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "[PAGE NAME]",
          "item": "https://ampstowatt.com/[SLUG]/"
        }
      ]
    }
  ]
}
</script>
```

---

## STEP 8 — ADD CONTEXTUAL INTERNAL LINKS TO PAGE BODIES

For the **homepage** (`/`), add these links INSIDE the article body text:

In the DC section, add:
> "For dedicated DC circuit planning without power factor, use the [DC Amps to Watts Calculator](/dc-amps-to-watts-calculator/)."

In the AC single-phase section, add:
> "For single-phase AC calculations with power factor, see the [AC Amps to Watts Calculator](/ac-amps-to-watts-calculator/)."

In the three-phase section, add:
> "Industrial three-phase loads are covered in detail on the [3-Phase Amps to Watts Calculator](/3-phase-amps-to-watts-calculator/)."

In the power factor section, add:
> "To find the power factor for your equipment, use the [Power Factor Calculator](/power-factor-calculator/)."

In the breaker section, add:
> "For long cable runs, check voltage loss with the [Voltage Drop Calculator](/voltage-drop-calculator/)."

For the **watts-to-amps page**, add near the top:
> "For the reverse conversion, use the [Amps to Watts Calculator](/)."

For ALL voltage-specific pages (12V, 120V, 240V, etc.), add at the end:
> "Need to convert watts back to amps? Use the [Watts to Amps Calculator](/watts-to-amps-calculator/)."

---

## STEP 9 — BUILD THE COMPLETE SILO STRUCTURE

The site uses a 7-silo architecture. After completing Steps 1–8, build the remaining pages in priority order to complete each silo. Full details, internal linking rules, and anchor text guidelines are in `08-SILO-STRUCTURE.md`.

### EMERGENCY — Two pages are listed in the sitemap but return 404. Build these FIRST:

**Build `/amps-to-watts-formula/`** (404 ERROR — 28,000 searches/month)
```
Title: Amps to Watts Formula — DC, AC Single-Phase & 3-Phase
H1: Amps to Watts Formula: DC, AC, and Three-Phase
Content:
- DC formula: W = A × V (with worked example: 10A × 120V = 1,200W)
- AC single-phase: W = A × V × PF (example: 10A × 120V × 0.9 = 1,080W)
- AC three-phase: W = √3 × A × V × PF (example)
- Formula table: all three circuit types side by side
- When to use which formula (decision guide)
- 5 worked examples with real device loads
- FAQ: 6 questions
Internal links: → / (homepage), → /ac-amps-to-watts-calculator/, → /dc-amps-to-watts-calculator/, → /amps-vs-watts/
```

**Build `/conversion-charts/`** (404 ERROR — 8,000 searches/month)
```
Title: Amps to Watts Conversion Chart — 12V, 120V, 240V Reference Tables
H1: Amps to Watts Conversion Charts (12V, 120V, 240V)
Content:
- Table 1: Common values at 12V (1A through 100A)
- Table 2: Common values at 120V (1A through 50A)
- Table 3: Common values at 240V (1A through 50A)
- Table 4: AC values with 0.8 power factor (120V)
- How to use the chart (brief guide)
Internal links: → / (homepage), → /amps-to-watts-formula/, → /12v-amps-to-watts-calculator/
```

### Phase 1 New Pages (Silo 6 — Specific Values, HIGH PRIORITY):

Build these pages in order. Each needs: calculator widget, worked example at 120V and 12V, FAQ (5 questions), internal links.

| URL | H1 | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/how-many-watts-per-amp/` | How Many Watts Per Amp? Formula + Examples | how many watts per amp | 40,000 |
| `/10-amps-to-watts/` | 10 Amps to Watts — at 120V, 240V, and 12V | 10 amps to watts | 35,000 |
| `/15-amps-to-watts/` | 15 Amps to Watts — 120V Circuit Wattage | 15 amps to watts | 28,000 |
| `/20-amps-to-watts/` | 20 Amps to Watts at 120V and 240V | 20 amps to watts | 24,000 |
| `/1-amp-to-watts/` | 1 Amp to Watts at Any Voltage | 1 amp to watts | 22,000 |
| `/5-amps-to-watts/` | 5 Amps to Watts — Instant Calculator | 5 amps to watts | 18,000 |
| `/30-amps-to-watts/` | 30 Amps to Watts — Dryer and Range Circuits | 30 amps to watts | 18,000 |
| `/50-amps-to-watts/` | 50 Amps to Watts — EV and Service Panel | 50 amps to watts | 12,000 |
| `/40-amps-to-watts/` | 40 Amps to Watts Calculator | 40 amps to watts | 10,000 |
| `/100-amps-to-watts/` | 100 Amps to Watts — Main Panel Capacity | 100 amps to watts | 9,000 |
| `/60-amps-to-watts/` | 60 Amps to Watts at 120V and 240V | 60 amps to watts | 8,000 |

**Internal linking pattern for ALL Silo 6 pages:**
```
Body text must include:
→ /how-many-watts-per-amp/ — "For a full watts-per-amp guide..."
→ / — "Use the main Amps to Watts Calculator for any value"
→ One adjacent value page (e.g., /10-amps-to-watts/ links to /15-amps-to-watts/)
→ /120v-amps-to-watts-calculator/ — "For all 120V conversions..."
```

### Phase 1 New Pages (Silo 5 — Missing Critical Tool):

**Build `/kw-to-amps-calculator/`** (24,000 searches/month — reverse of existing page)
```
Title: kW to Amps Calculator — DC, AC Single-Phase & Three-Phase
H1: kW to Amps Calculator: Convert Kilowatts to Amperes
Content:
- DC: Amps = kW × 1000 ÷ Volts
- AC single-phase: Amps = kW × 1000 ÷ (Volts × PF)
- AC three-phase: Amps = kW × 1000 ÷ (√3 × Volts × PF)
- Worked examples for motors, generators, solar inverters
Internal links: → /amps-to-kw-calculator/ (reverse), → / (homepage), → /power-factor/
```

### Phase 1 New Pages (Silo 4 — Application Pages):

Build these 4 application pages. Each needs 1,200+ words, device-specific examples, real wattage data, and a calculator.

| URL | H1 | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/air-conditioner-amps-to-watts/` | Air Conditioner Amps to Watts — Window, Mini-Split, Central AC | air conditioner amps to watts | 14,000 |
| `/generator-amps-to-watts/` | Generator Amps to Watts — Size Your Generator Correctly | generator amps to watts | 12,000 |
| `/ev-charger-amps-to-watts/` | EV Charger Amps to Watts — Level 1, 2, and DC Fast Charging | ev charger amps to watts | 9,000 |
| `/electric-motor-amps-to-watts/` | Motor Amps to Watts Calculator — HP, kW, and Efficiency | motor amps to watts | 8,000 |

**AC page internal links:** → /240v-amps-to-watts-calculator/, → /ac-amps-to-watts-calculator/, → /amp-power-consumption-calculator/, → /
**Generator page internal links:** → /watts-to-amps-calculator/, → /amp-power-consumption-calculator/, → /
**EV charger page internal links:** → /240v-amps-to-watts-calculator/, → /amp-power-consumption-calculator/, → /
**Motor page internal links:** → /3-phase-amps-to-watts-calculator/, → /kw-to-amps-calculator/, → /

### Phase 2 New Pages (Silo 7 — Educational):

| URL | H1 | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/amps-vs-watts/` | Amps vs Watts — What's the Difference? | amps vs watts | 22,000 |
| `/kwh-explained/` | What Is a kWh? Kilowatt Hours Explained Simply | what is kwh | 12,000 |
| `/watts-law-explained/` | Watt's Law Explained — Formula, Examples, and Uses | watts law | 12,000 |
| `/power-factor-explained/` | What Is Power Factor? A Plain-English Guide | what is power factor | 9,000 |

### Phase 2 New Pages (Silo 1 — Reverse Conversion Expansion):

| URL | H1 | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/watts-to-amps-120v/` | Watts to Amps at 120V — US Standard Circuit | watts to amps 120v | 18,000 |
| `/watts-to-amps-12v/` | Watts to Amps at 12V — DC Battery Systems | watts to amps 12v | 14,000 |
| `/watts-to-amps-240v/` | Watts to Amps at 240V — Dryers, EVs, and High Power | watts to amps 240v | 12,000 |

### Phase 2 New Pages (Silo 3 — Voltage Expansion):

| URL | H1 | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/480v-amps-to-watts-calculator/` | 480V Amps to Watts — Industrial Three-Phase Calculations | 480v amps to watts | 5,000 |
| `/24v-amps-to-watts/` | 24V Amps to Watts Calculator — Telecom and Solar | 24v amps to watts | 4,500 |

### Phase 2 New Pages (Silo 4 — More Appliances):

| URL | H1 | Monthly Searches |
|---|---|---|
| `/refrigerator-amps-to-watts/` | Refrigerator Amps to Watts — Running and Startup Watts | 6,000 |
| `/microwave-amps-to-watts/` | Microwave Amps to Watts — 700W to 1800W Models | 5,500 |
| `/dryer-amps-to-watts/` | Dryer Amps to Watts — Electric and Gas Dryer Circuits | 5,000 |
| `/pool-pump-amps-to-watts/` | Pool Pump Amps to Watts — Variable Speed and Single Speed | 4,500 |

---

## STEP 10 — VERIFY AFTER COMPLETION

After all changes, verify:
- [ ] `/sitemap.xml` returns HTTP 200 (was returning 500 error)
- [ ] `/robots.txt` references the sitemap
- [ ] `/amps-to-watts-formula/` returns HTTP 200 (was 404)
- [ ] `/conversion-charts/` returns HTTP 200 (was 404)
- [ ] All spam paragraphs are deleted (search for "Meyer Burger" — should return 0 results)
- [ ] All 301 redirects work (check with curl or browser)
- [ ] No page has a duplicate title tag (check all `<title>` tags are unique)
- [ ] No page has more than one H1 tag
- [ ] All new pages are accessible and return HTTP 200
- [ ] Schema markup is valid (test with Google's Rich Results Test)
- [ ] Every new page has internal links to its silo hub and homepage
- [ ] No orphan pages (every page linked from at least one other page)
- [ ] Submit updated sitemap to Google Search Console
- [ ] noindex added to: /faq/, /site-map/, /calculators/, /contact-us/, /privacy-policy/, /cookie-policy/, /terms-and-conditions/, /disclaimer/

---

## Reference Files

All detailed specs are in these companion files:
- `08-SILO-STRUCTURE.md` — Complete 7-silo architecture, all pages per silo, internal linking rules
- `03-NEW-TOPICAL-MAP.md` — Full topical map with all 90 pages, keywords, and search volumes
- `04-TITLE-H1-UPDATE.md` — Updated title tags and H1s for every page
- `05-CONTENT-FIXES.md` — Exact spam text to delete and replace
- `06-MISSING-PAGES.md` — Detailed content templates for new pages

---

## Expected Results After These Fixes

| Timeframe | Expected Improvement |
|---|---|
| Week 1 | Spam removed + 404s fixed = Google quality signal improves immediately |
| Week 2–3 | 301 redirects complete = link equity consolidates to canonical URLs |
| Month 2 | Silo 6 pages indexed = begin ranking for "10 amps to watts" (35K/mo) |
| Month 2–3 | "/how-many-watts-per-amp/" enters top 20 (40K/mo keyword) |
| Month 3 | Application pages indexed = high-intent traffic begins |
| Month 4 | Rankings improve 20–40 positions for existing main keywords |
| Month 5–6 | Enter top 5 for multiple amps-to-watts silo keywords |
| Month 6+ | Top 3 for "how many watts per amp" and specific-value queries |
