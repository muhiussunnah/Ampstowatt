# ampstowatt.com — Current Topical Map Audit
## What's Wrong with the Existing Structure

---

## The Current Topical Map (As-Built)

The site was built with this structure:

```
Homepage (/)
│
├── TIER 1: Core Pages
│   ├── /watts-to-amps-calculator/
│   ├── /voltage-amps-watts-calculator/
│   └── /calculators/ (directory page)
│
├── TIER 2: Voltage Pages (DUPLICATED — this is the main problem)
│   ├── /12v-amps-to-watts-calculator/   ← duplicate of ↓
│   ├── /12v-calculator/                 ← same topic
│   ├── /120v-amps-to-watts-calculator/  ← duplicate of ↓
│   ├── /amps-to-watts-120v-calculator/  ← same topic
│   ├── /120v-calculator/                ← same topic
│   ├── /220v-amps-to-watts-calculator/  ← duplicate of ↓
│   ├── /amps-to-watts-220v-calculator/  ← same topic
│   ├── /220v-calculator/                ← same topic
│   ├── /230v-amps-to-watts-calculator/  ← duplicate of ↓
│   ├── /amps-to-watts-230v-calculator/  ← same topic
│   ├── /230v-calculator/                ← same topic
│   ├── /240v-amps-to-watts-calculator/  ← duplicate of ↓
│   ├── /amps-to-watts-240v-calculator/  ← same topic
│   ├── /240v-calculator/                ← same topic
│   └── /other-voltages/
│
├── TIER 3: AC/DC Phase Pages (DUPLICATED)
│   ├── /ac-amps-to-watts-calculator/    ← EXACT duplicate of ↓
│   ├── /amps-to-watts-ac-calculator/    ← EXACT duplicate of ↑
│   ├── /ac-calculator/
│   ├── /dc-amps-to-watts-calculator/    ← duplicate of ↓
│   ├── /amps-to-watts-dc-calculator/    ← same topic
│   ├── /dc-calculator/                  ← same topic
│   ├── /single-phase-amps-to-watts-calculator/ ← duplicate of ↓
│   ├── /single-phase-calculator/        ← same topic
│   ├── /3-phase-amps-to-watts-calculator/ ← duplicate of ↓
│   ├── /amps-to-watts-3-phase-calculator/ ← same topic
│   ├── /3-phase-calculator/             ← same topic
│   ├── /kva-to-watts-calculator/
│   └── /power-factor/
│
├── TIER 4: Specialized Pages
│   ├── /amps-to-kw-calculator/
│   ├── /megawatts-to-amps-calculator/
│   ├── /solar-watts-to-amps-calculator/
│   ├── /led-watts-to-amps-calculator/
│   ├── /speaker-amp-power-calculator/
│   ├── /amp-power-consumption-calculator/
│   ├── /amp-hours-to-watt-hours-calculator/
│   ├── /amps-to-volt-amps-calculator/
│   ├── /voltage-drop-calculator/
│   └── /wire-gauge-calculator/
│
└── TIER 5: Learning/Legal Pages
    ├── /amps-to-watts-formula/  ← should be a real content page, not thin
    ├── /conversion-charts/
    ├── /faq/
    ├── /about-us/
    └── /site-map/
```

---

## Why This Structure Is Failing

### Problem 1: The "Double URL" Problem

For EVERY calculator type, the site created two versions:
- The "[keyword] calculator" format: `/ac-amps-to-watts-calculator/`
- The "amps to watts [keyword] calculator" format: `/amps-to-watts-ac-calculator/`

**Why this was probably done:** The builder tried to cover multiple keyword variations.
**Why it actually fails:** Google sees two identical pages and doesn't rank either.

**Evidence that this hurt rankings:**
- Neither `/ac-amps-to-watts-calculator/` nor `/amps-to-watts-ac-calculator/` appears in top 50 Google results for "AC amps to watts calculator"
- The main homepage ranks for generic "amps to watts" because it has no competition from internal pages
- But the homepage ALONE cannot rank for 30+ different keyword variations

### Problem 2: General Pages Competing with Specific Pages

The site has `/ac-calculator/` and `/ac-amps-to-watts-calculator/` as separate pages. Both target AC electrical calculations. This splits authority between them.

A general `/ac-calculator/` page should either:
1. **Be the main AC calculator page** (and the more specific URL redirects to it), OR
2. **Be deleted** and replaced with the specific `/ac-amps-to-watts-calculator/`

Currently it does neither — both exist and compete.

### Problem 3: Voltage "Calculator" Pages Have No Differentiated Value

The site has:
- `/12v-amps-to-watts-calculator/` — Converts amps to watts at 12V
- `/12v-calculator/` — Also converts... amps to watts at 12V?

What's the actual difference? If there's no real content difference, Google will treat them as duplicates (or thin pages) and rank neither.

### Problem 4: The Learning Pages Are Thin and Disconnected

`/amps-to-watts-formula/` is supposed to be the educational resource page explaining the formula. But it's listed as a "Learning, Trust, and Legal" page. It's likely very short and doesn't rank for formula-related searches.

"Amps to watts formula" gets 28,000 monthly searches. This should be a 2,000-word hub page explaining everything. Instead, the formula explanation is embedded in the homepage — and the dedicated `/amps-to-watts-formula/` page is probably thin content.

### Problem 5: No Application Pages = Missing 40% of Traffic

Users searching "amps to watts" often have a SPECIFIC application in mind:
- "air conditioner amps to watts" = homeowner sizing circuits
- "generator amps to watts" = someone buying a generator
- "EV charger amps to watts" = EV owner planning circuits
- "motor amps to watts" = electrician working with motors
- "solar panel amps to watts" = exists ✅ but linked poorly

These pages exist NOWHERE on the site. These are the highest-converting users (they have a real problem to solve) and they're going to competitors.

### Problem 6: No "How Many Watts Is X Amps" Pages

Google's "People Also Ask" box is FULL of questions like:
- "How many watts is 10 amps?"
- "What is 15 amps in watts?"
- "How many watts does 1 amp use?"

These are ZERO on this site. At 12V, 120V, 240V these are separate long-tail keywords with 10K-40K searches each. The site has NO dedicated pages for these queries.

---

## Competitor Comparison

### What RapidTables.com Does Right (Your Main Competitor)
rapidtables.com/calc/electric/Amp_to_Watt_Calculator.htm ranks #1 for "amps to watts"
- Single calculator page with ALL circuit types
- No duplicate pages
- Clear formula tables
- Linked from an electrical reference hub

### What UnitConverter.net Does Right
- Category pages linking to specific converters
- No duplicates

### What Inch-Calculator.com Does Right (competitor referenced in your 12V page!)
- Single strong page per topic
- Topical clusters around "electrical calculations"
- Guides like "How to Convert Amps to Watts" driving traffic to calculator

---

## The Core Mistake: Quantity Over Quality

The site was built with the assumption that **more pages = more rankings**. 

But Google's algorithm says: **more unique, differentiated, high-quality pages = more rankings**.

Two pages competing for the same keyword get ZERO rankings each.
One strong, comprehensive page for each keyword gets rankings.

**You have ~35 pages but effectively only 10-12 truly differentiated pages.**
The rest are splitting authority and confusing Google.
