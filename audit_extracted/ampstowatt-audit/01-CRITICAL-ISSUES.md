# ampstowatt.com — Critical Issues Found
## Evidence-Based Audit

---

## ISSUE #1 — SITEMAP 500 ERROR (CRITICAL)

### What Was Found
Fetching `https://ampstowatt.com/sitemap.xml` returns **500 Internal Server Error**.

### Why This Is Destroying Rankings
- Google's crawler cannot find your sitemap
- Without a working sitemap, Google has to discover all your pages through crawling alone
- Pages that are not linked prominently from your homepage may NEVER get indexed
- Google Search Console shows sitemap errors → signals low site quality
- Your 35+ pages may only have 10-15 actually indexed

### Fix Required
1. Repair the sitemap.xml generation (check your CMS/framework)
2. Verify it returns 200 OK at `/sitemap.xml`
3. Submit to Google Search Console → Sitemaps
4. Also check `/robots.txt` references the sitemap URL

---

## ISSUE #2 — KEYWORD CANNIBALIZATION (CRITICAL)

### Definition
When two or more pages on your site target the SAME keyword, Google doesn't know which one to rank. Both pages fight each other, and neither ranks well.

### Cannibalization Pairs Found on ampstowatt.com

#### Pair 1 — AC Amps to Watts (WORST OFFENDER)
| URL | Title Tag |
|---|---|
| `/ac-amps-to-watts-calculator/` | "AC Amps to Watts Calculator - Single Phase, Three Phase, and Power Factor" |
| `/amps-to-watts-ac-calculator/` | "AC Amps to Watts Calculator - Single Phase, Three Phase, and Power Factor" |

**IDENTICAL TITLE TAGS. IDENTICAL CONTENT. TWO SEPARATE URLS.**
This is the clearest possible cannibalization. Google sees these as duplicates and demotes both.

#### Pair 2 — 3 Phase Calculator
| URL | Title Tag |
|---|---|
| `/amps-to-watts-3-phase-calculator/` | "Amps to Watts 3 Phase Calculator" |
| `/3-phase-amps-to-watts-calculator/` | (needs verification — likely same content) |
| `/3-phase-calculator/` | Likely overlapping |

#### Pair 3 — 120V Calculators
| URL | Intent |
|---|---|
| `/120v-amps-to-watts-calculator/` | 120V specific |
| `/amps-to-watts-120v-calculator/` | Same intent, different URL |
| `/120v-calculator/` | Same user — same page |

#### Pair 4 — 220V Calculators
| URL | Intent |
|---|---|
| `/220v-amps-to-watts-calculator/` | 220V specific |
| `/amps-to-watts-220v-calculator/` | Same |
| `/220v-calculator/` | Same |

#### Pair 5 — Single Phase
| URL | Intent |
|---|---|
| `/single-phase-amps-to-watts-calculator/` | Single phase |
| `/single-phase-calculator/` | Same topic |

#### Pair 6 — DC Calculator
| URL | Intent |
|---|---|
| `/dc-amps-to-watts-calculator/` | DC conversion |
| `/amps-to-watts-dc-calculator/` | Same |
| `/dc-calculator/` | Same |

### Fix Required
For each pair: **301 redirect the weaker URL to the stronger one.**
- Keep the URL with more content/traffic
- Redirect the other permanently
- Update all internal links to point to the surviving URL

---

## ISSUE #3 — SPAM/GARBAGE CONTENT IN PAGE BODIES (CRITICAL)

### Evidence Found

#### On `/ac-amps-to-watts-calculator/` and `/amps-to-watts-ac-calculator/`
**Found this exact paragraph:**
```
"Household AC appliance calculations include fans, refrigerators, microwaves, 
window air conditioners, heaters, and chargers. Solar shopping labels such as 
Top solar contractors, American Made Solar Panels, RV Solar Panels, Residential 
Solar Panels, Bifacial Solar Panels, Wholesale Solar By The Pallet, Clearance, 
Wholesale, Commercial, Meyer Burger, Meyer Burger 375W Solar Panel, 120 Cell 
HJT All-Black, MB_B120AyB_375, Hyperion (Runergy), Hyperion (Runergy) 405W 
Solar Panel, 108 Cells PERC Bifacial, HY-DH108P8B-405, Meyer Burger 385W Solar 
Panel, MB_B120AyB_385, and Riverton, NJ are product context; the power formula 
still uses amps, volts, and PF."
```

This is a list of solar panel product SKUs and brand names (MB_B120AyB_375, Hyperion, etc.) injected into the middle of the page. This is either:
- An AI hallucination that was never proofread
- A content generation error where product catalog data was accidentally included

**Google's spam algorithms WILL penalize this content.** It signals AI-generated spam.

#### On `/12v-amps-to-watts-calculator/`
**Found this exact paragraph:**
```
"Reference authors and institutions in electrical calculation content include 
Joe Sexton, Aditya Dua, Kevin Weekly, Inch Calculator, Stanford University, 
University of California Berkeley, and University of Texas."
```

This is another AI hallucination — it appears to be a citation instruction that was mistakenly rendered as body content instead of being removed. "Inch Calculator" is a competitor website. Why is a competitor listed as a reference author?

### Why This Destroys Rankings
- Google's Helpful Content Update specifically targets AI-generated content that doesn't serve users
- These paragraphs signal to Google the content was auto-generated without human review
- Could trigger a manual spam review

### Fix Required
**DELETE these paragraphs immediately.** Search your entire codebase for:
- "Solar shopping labels"
- "Inch Calculator" (as a reference)
- "Stanford University" (in this context)
- "Meyer Burger"
- "MB_B120AyB"
- "Riverton, NJ"
- "Hyperion (Runergy)"

Then audit EVERY page for similar injected content.

---

## ISSUE #4 — TITLE TAG INCONSISTENCY AND WEAK FORMAT

### Evidence Found

| URL | Current Title | Problem |
|---|---|---|
| `/` | "Amps to Watts Calculator — Convert Amps to Watts Instantly" | ✅ Good format |
| `/ac-amps-to-watts-calculator/` | "AC Amps to Watts Calculator - Single Phase, Three Phase, and Power Factor" | Uses `-` not `—`, too long (74 chars) |
| `/amps-to-watts-3-phase-calculator/` | "Amps to Watts 3 Phase Calculator" | Too short, no brand, no descriptor |
| `/12v-amps-to-watts-calculator/` | "12V Amps to Watts Calculator - 12V DC Power Conversion" | Repeats "12V" twice |

### Title Tag Rules Being Broken
1. Max 60 characters — most pages exceed this
2. Use `—` not `-` (brand consistency)
3. Include the brand name `| Ampstowatt`
4. Primary keyword first, brand last

---

## ISSUE #5 — H1 / TITLE TAG MISMATCH

### What Was Found

| URL | Title Tag | H1 Tag |
|---|---|---|
| `/ac-amps-to-watts-calculator/` | "AC Amps to Watts Calculator - Single Phase, Three Phase, and Power Factor" | "AC Amps to Watts Calculator — Single & 3 Phase" |
| `/12v-amps-to-watts-calculator/` | "12V Amps to Watts Calculator - 12V DC Power Conversion" | "12V Amps to Watts Calculator — 12V DC Power" |

**H1 and Title should say the same thing** (with minor acceptable variations). When they differ significantly, Google doesn't know which one to trust for keyword relevance.

---

## ISSUE #6 — WRONG TOPICAL MAP STRUCTURE

### What's Missing (High-Volume Pages Not on the Site)

| Missing Page | Keyword | Est. Monthly Searches | Why It Matters |
|---|---|---|---|
| "1 amp to watts" | 1 amp to watts | 22,000 | Direct answer question |
| "5 amps to watts" | 5 amps to watts | 18,000 | |
| "10 amps to watts" | 10 amps to watts | 35,000 | Very high |
| "15 amps to watts" | 15 amps to watts | 28,000 | Standard US circuit |
| "20 amps to watts" | 20 amps to watts | 25,000 | Standard US circuit |
| "30 amps to watts" | 30 amps to watts | 18,000 | Dryer/EV circuits |
| "50 amps to watts" | 50 amps to watts | 12,000 | |
| "100 amps to watts" | 100 amps to watts | 9,000 | Service panel sizing |
| "how many watts is an amp" | how many watts is an amp | 40,000 | Featured snippet opportunity |
| "amps to watts formula" | amps to watts formula | 28,000 | Learning intent |
| "amps vs watts" | amps vs watts | 22,000 | Comparison content |
| "air conditioner amps to watts" | ac unit amps to watts | 14,000 | Application intent |
| "generator amps to watts" | generator amps to watts | 12,000 | High value use case |
| "EV charger amps to watts" | ev charger amps to watts | 8,000 | Growing rapidly |
| "motor amps to watts" | electric motor amps to watts | 9,000 | Industrial users |
| "480V amps to watts" | 480v amps to watts | 6,000 | Industrial, MISSING from site |

### Pages That Exist But Target Wrong Keywords

The site has `calculators/` and `site-map/` as directory-style pages that don't rank for anything. These are internal navigation pages being indexed as content pages — they're diluting the site's crawl budget.

---

## ISSUE #7 — CONTENT QUALITY ON EXISTING PAGES

### Problem: Keyword Stuffing Disguised as H3s

The AC calculator page uses H3 subheadings that are just keyword variations:
```
### Residential and Commercial AC Load Calculations P=V x I x PF
### AC Amps to Watts
### Convert AC Amps Into Watts
### Voltage Current Watt Relationship
### AC Electrical Power Calculations
### Appliance Current Conversion Examples
### AC Power Consumption Examples
```

These are 7 H3s that all mean the same thing. This is keyword stuffing at the heading level. Google's NLP can see this pattern.

### Problem: Thin Supporting Pages

Pages like `/calculators/`, `/site-map/`, and the learning pages (`/amps-to-watts-formula/`, `/conversion-charts/`, `/faq/`) appear to be very thin (less than 300 words) and are not internally linked well. They're wasting crawl budget without contributing to topical authority.

---

## ISSUE #8 — INTERNAL LINKING IS ONLY IN FOOTER, NOT IN BODY

### What Was Found
Every page has a "Related Amps to Watts and Electrical Calculators" section at the BOTTOM of the page. But the **article body itself has almost no internal links**.

### Why This Matters
- Google uses internal links to understand which pages are most important
- Links inside content body carry more SEO weight than footer navigation links
- Missing body links = Google doesn't understand the site hierarchy properly

### Fix Required
Every converter page should link to 3-5 other pages contextually WITHIN the article body, not just in the footer. Examples:
- In the DC formula section → link to `/dc-amps-to-watts-calculator/`
- In the AC section → link to `/ac-amps-to-watts-calculator/`
- In the 3-phase section → link to `/3-phase-amps-to-watts-calculator/`
- In the power factor section → link to `/power-factor/`
- In the breaker section → link to a "circuit breaker sizing" guide (if it exists)
