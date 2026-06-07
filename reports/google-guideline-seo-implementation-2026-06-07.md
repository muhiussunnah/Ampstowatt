# Google-Guideline SEO Implementation Notes

Date: 2026-06-07

## Official Google Guidance Applied

Google's helpful-content guidance says ranking systems are designed to prioritize helpful, reliable, people-first content. The homepage changes add practical conversion answers, transparent methodology, visible review notes, and source references rather than adding content only for word count.

Google's SEO Starter Guide explains that useful content is central to search performance and that descriptive internal link text helps users and Google understand the destination page. The subpage contextual-link block now links naturally back to the homepage with `Amps to Watts Calculator` anchor text and explains why the user should start there.

Google's FAQ structured data documentation notes that FAQ rich results are generally limited to well-known government or health sites. The FAQ remains visible for users and included in existing structured data, but the implementation no longer treats FAQ schema as the main ranking lever. The stronger signals are visible content, references, and internal linking.

## Implemented Changes

- Added a visible Methodology, Review Notes, and Sources section on the homepage.
- Added external reference links to NIST, CDC/NIOSH, and OSHA resources.
- Added transparent editorial review wording without inventing licensed credentials.
- Added `dateModified`, `author`, `publisher`, `reviewedBy`, `citation`, and calculator `featureList` fields to JSON-LD.
- Added contextual subpage links back to `/` with natural anchor text: `Amps to Watts Calculator`.
- Built the site successfully after implementation.

## Remaining Non-Code SEO Work

- Add a real named reviewer if a qualified electrician or electrical engineer can review the formulas and safety notes.
- Build external links from electrical, solar, DIY, and engineering resources.
- Deploy the build, request indexing in Google Search Console, and watch query/page movement for at least 2-4 weeks.
- Use Search Console data to decide whether to test title variants after indexing.
