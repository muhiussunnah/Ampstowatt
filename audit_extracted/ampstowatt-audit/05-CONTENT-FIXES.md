# ampstowatt.com — Content Fixes
## Exact Content to DELETE and Exact Replacements

---

## FIX #1 — DELETE SPAM CONTENT (URGENT — DO THIS FIRST)

### Pages Affected
- `/ac-amps-to-watts-calculator/`
- `/amps-to-watts-ac-calculator/` (same content, redirecting anyway)

### Content to DELETE (find this exact text and remove it)

**FIND AND DELETE — Paragraph 1:**
```
Solar shopping labels such as Top solar contractors, American Made Solar Panels, 
RV Solar Panels, Residential Solar Panels, Bifacial Solar Panels, Wholesale Solar 
By The Pallet, Clearance, Wholesale, Commercial, Meyer Burger, Meyer Burger 375W 
Solar Panel, 120 Cell HJT All-Black, MB_B120AyB_375, Hyperion (Runergy), 
Hyperion (Runergy) 405W Solar Panel, 108 Cells PERC Bifacial, HY-DH108P8B-405, 
Meyer Burger 385W Solar Panel, MB_B120AyB_385, and Riverton, NJ are product 
context; the power formula still uses amps, volts, and PF.
```

**REPLACE WITH:**
```
Common household AC loads include window air conditioners (5–10 A at 120V), 
refrigerators (1.5–3 A at 120V), microwave ovens (8–15 A at 120V), and 
electric dryers (20–25 A at 240V). For each, the real watts equal amps × 
volts × power factor from the nameplate.
```

---

**FIND AND DELETE — Paragraph 2 (on `/12v-amps-to-watts-calculator/`):**
```
Reference authors and institutions in electrical calculation content include 
Joe Sexton, Aditya Dua, Kevin Weekly, Inch Calculator, Stanford University, 
University of California Berkeley, and University of Texas.
```

**REPLACE WITH:**
```
For installation safety, verify all wire gauge, fuse sizing, and connector 
ratings against the maximum continuous current. Always consult your vehicle 
or RV manufacturer's electrical specifications for system-level planning.
```

---

**Also DELETE this phrase from the 12V page:**
```
Reference labels such as ChatGPT, Google AI, Perplexity, Claude, Grok, X, 
Facebook, Pinterest, and Telegram are sharing options, not calculation inputs.
```

This appears to be AI-generated template boilerplate that was accidentally left in the page. Delete it entirely — no replacement needed.

---

**Also DELETE from AC page:**
```
Use the calculator from Home, Calculators, or All calculators style pages when 
a load label gives Current (A) and Voltage (V). Reference labels such as 
ChatGPT, Google AI, Perplexity, Claude, Grok, X, Facebook, Pinterest, and 
Telegram are sharing options, not calculation inputs.
```

Delete entirely.

---

## FIX #2 — KEYWORD STUFFING IN H3s

### Problem
The AC calculator page has these H3 headings in a row, all meaning the same thing:
```
### AC Amps to Watts
### Convert AC Amps Into Watts
### Voltage Current Watt Relationship
### AC Electrical Power Calculations
### Appliance Current Conversion Examples
### AC Power Consumption Examples
```

### Solution
Replace these 6 H3s with 1 clear H2 section and meaningful content:

**DELETE all 6 H3s and their content.**

**REPLACE WITH this single section:**
```markdown
## AC Amps to Watts — Quick Reference Examples

The table below shows real watt values for common AC loads at 120V and 240V. 
All examples assume power factor from the equipment nameplate.

| Load | Amps | Voltage | PF | Watts |
|---|---|---|---|---|
| Ceiling fan | 0.5 A | 120 V | 0.85 | 51 W |
| Refrigerator | 2.0 A | 120 V | 0.80 | 192 W |
| Window AC | 7.5 A | 120 V | 0.90 | 810 W |
| Microwave oven | 12.0 A | 120 V | 1.00 | 1,440 W |
| Electric dryer | 24.0 A | 240 V | 1.00 | 5,760 W |
| EV charger (Level 2) | 32.0 A | 240 V | 1.00 | 7,680 W |
| 3-phase motor (small) | 10.0 A | 208 V | 0.85 | 3,055 W |
```

---

## FIX #3 — HOMEPAGE HEADING HIERARCHY

### Current Homepage H2 Structure (Problem)
```
H2: Conversion calculator
H2: How to Convert Amps to Watts
H2: Amps, volts, watts, and circuit limits in one view
H2: Amps to Watts Conversion Table
H2: Amps to Watts Formula — Explained in Full
H2: How to Convert Amps to Watts — Step by Step  ← DUPLICATE of H2 above!
H2: Power Factor Values by Device Type
H2: Common Appliance Amps and Watts Chart
H2: Circuit Breaker Safety Check
H2: Amps to Watts Worked Examples
H2: DC vs AC: When to Use Each Formula
H2: Watts to Amps: The Reverse Conversion
H2: Methodology, Review Notes, and Sources
H2: What Makes This Amps to Watts Calculator Different
H2: Related Amps to Watts Calculators
H2: Voltage-Specific Calculators
H2: AC/DC Power Calculators
H2: Specialized Electrical Calculators
H2: Frequently Asked Questions
```

**Count: 19 H2s.** This is excessive and confusing to Google.

### Fix — Reduce to 8 H2s Maximum:

```
H2: How to Convert Amps to Watts          ← Formula + circuit types
H2: Amps to Watts Conversion Table        ← Reference table (merge the duplicate)
H2: Step-by-Step Worked Examples          ← Practical examples
H2: Power Factor by Device Type           ← PF reference table
H2: Common Appliance Amps and Watts       ← Appliance chart
H2: Circuit Breaker Safety Check          ← NEC planning
H2: Frequently Asked Questions            ← 7 FAQs (keep existing)
H2: Related Electrical Calculators        ← Internal links (keep at bottom)
```

**DELETE these H2 sections entirely (their content is already covered above):**
- "Amps, volts, watts, and circuit limits in one view" (redundant with formula)
- "Amps to Watts Formula — Explained in Full" (merge into "How to Convert")
- "How to Convert Amps to Watts — Step by Step" (merge with step examples)
- "DC vs AC: When to Use Each Formula" (merge into "How to Convert")
- "Watts to Amps: The Reverse Conversion" (make it a short callout, not full H2)
- "What Makes This Amps to Watts Calculator Different" (marketing fluff — cut)
- "Methodology, Review Notes, and Sources" (move to footer/about page)
- "Voltage-Specific Calculators" + "AC/DC Power Calculators" + "Specialized Calculators" (consolidate into one "Related Calculators" section)

---

## FIX #4 — ADD BODY INTERNAL LINKS (Currently Missing)

### For the Homepage (`/`)

Add these contextual internal links WITHIN the article body (not just footer):

In the **DC formula section**, add:
> "For dedicated DC circuit planning, use the → [DC Amps to Watts Calculator](/dc-amps-to-watts-calculator/)."

In the **AC single-phase section**, add:
> "For step-by-step single-phase calculations, see the → [AC Amps to Watts Calculator](/ac-amps-to-watts-calculator/)."

In the **3-phase section**, add:
> "Industrial calculations are covered in the → [3-Phase Amps to Watts Calculator](/3-phase-amps-to-watts-calculator/)."

In the **power factor section**, add:
> "To calculate power factor from watts and VA, use the → [Power Factor Calculator](/power-factor-calculator/)."

In the **breaker section**, add:
> "For long cable runs, check the → [Voltage Drop Calculator](/voltage-drop-calculator/)."

---

## FIX #5 — PAGES TO SET AS NOINDEX

These pages should NOT be indexed by Google. They dilute crawl budget and add no search value:

Add `<meta name="robots" content="noindex, follow">` to:
- `/site-map/` — Navigation page, not content
- `/calculators/` — Directory page, not content  
- `/cookie-policy/` — Legal, not search-worthy
- `/cookie-preferences/` — Legal
- `/privacy-policy/` — Legal
- `/terms-and-conditions/` — Legal
- `/disclaimer/` — Legal
- `/contact-us/` — Support page

**Keep indexed:**
- `/about-us/` — Keep indexed (E-E-A-T signal for Google)
- `/faq/` → Better to merge into homepage; OR noindex the standalone page and keep FAQ on homepage

---

## FIX #6 — SITEMAP REPAIR

After all redirects are in place:

1. Regenerate your sitemap.xml to include only canonical URLs
2. Verify the sitemap file returns **HTTP 200** (not 500)
3. Include only pages you want indexed (exclude noindex pages)
4. Add `lastmod`, `changefreq`, and `priority` values:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ampstowatt.com/</loc>
    <lastmod>2026-06-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ampstowatt.com/watts-to-amps-calculator/</loc>
    <lastmod>2026-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... all canonical calculator URLs ... -->
</urlset>
```

5. Submit updated sitemap in Google Search Console → Sitemaps → Add new sitemap URL

---

## FIX #7 — ROBOTS.TXT VERIFICATION

Make sure `/robots.txt` exists and looks like this:

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://ampstowatt.com/sitemap.xml
```

The sitemap reference is critical — this helps Google find the sitemap even if Search Console submission is delayed.
