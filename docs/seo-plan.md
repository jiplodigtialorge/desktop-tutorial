# Crisis HR SEO and Content Architecture Plan

## North-Star Objectives

- Own California and rank nationally on queries such as "crisis HR," "workplace investigations," "Fair Chance hiring," and "HR compliance audit." 
- KPIs: 30+ top-3 non-brand terms in California, 10+ national top-5 rankings, 3%+ site conversion rate on confidential intake.

## Architecture (Rankable by Design)

### Hubs (3)

- `/crisis-intervention`
- `/compliance-audit`
- `/strategic-staffing-succession`

### Guides (8–12, Evergreen)

- First-24-Hours
- Lawful Comms
- Investigation Steps
- CA WVPP
- Handbook Remediation
- Fair Chance Workflow
- Adverse Action
- Manager Briefings

### Programmatic Pages

- **State matrix (50):** `/fair-chance/<state>`, `/wvpp/<state>` with strict disclaimers and quarterly update cadence.
- **Industry pages (12):** schools, nonprofits, retail, clinics, logistics, hospitality, light manufacturing, and more.
- **City pages (California first):** Burlingame, San Mateo, San Francisco, San Jose, Oakland, Los Angeles, Pasadena/Glendale, Orange County, San Diego. Each page requires localized proof and FAQ.

### Resources (Gated)

- First-Hour Crisis Checklist
- Audit Checklist
- Fair Chance Flowchart

### Proof Assets

- Anonymized case tiles with outcomes and timelines.

## Component System (Answer-Engine Optimized)

- **Answer Cards:** 60–110-word direct answers per query, surfaced at the top of the page and in FAQ sections.
- **How-To Blocks:** Step lists for tasks such as "first 24 hours" and "run a lawful investigation."
- **Glossary:** Legal and HR terms with canonical short definitions.
- **Speakable excerpts:** Optimized for voice answers.
- **Sticky conversion:** "Request a confidential consult" CTA with intake form; no public phone or open scheduler.

## Technical SEO Requirements

- Core Web Vitals: Largest Contentful Paint ≤ 2.0s, Interaction to Next Paint ≤ 200ms, Cumulative Layout Shift ≤ 0.1.
- Image pipeline: AVIF/WebP, responsive `srcset`, lazy-load, CDN delivery.
- Crawl/index: Flat URL structure, clean faceted rules, XML sitemaps per type, robots.txt allowlists.
- Internal links: Hub → guides → state/industry pages → resources; breadcrumbs on every page.
- Canonicals + 301s; avoid tag noise.
- Accessibility: Semantic landmarks, 4.5:1 contrast, reduced-motion variants.

## Schema (JSON-LD on All Pages)

- `Organization`, `LocalBusiness` (service-area), `WebSite`, `BreadcrumbList`.
- `Service` per path page; `FAQPage` on hubs; `HowTo` where steps exist; `Article` for guides with author attribution.
- `Product` for downloadable checklists; `Review`/`AggregateRating` only if policy-compliant.
- `SpeakableSpecification` on hero answers.
- `sameAs` links to LinkedIn, chambers, arbitrator registry, reputable directories.

## Entity & E-E-A-T Signals

- **Author entities:** Jennifer Brust with credentials, bylines, and reviewer notes on legally sensitive pages.
- **Organizational trust:** Physical presence in Burlingame, NDA at intake, privacy/terms, accessibility page, editorial policy with update stamps.
- **Case evidence:** Outcomes, timelines, methods; no client names.

## Local and Multi-Engine Presence

- Google Business Profile with California service areas, Q&A seeded using Answer Cards, product listings for checklists, incident posts.
- Bing Places, Apple Business Connect, and Yelp for corroboration.
- Consistent NAP; no public phone on site—list email and form but keep NAP in citations.

## Links & Authority (White-Hat, Compounding)

- Digital PR: Publish anonymized incident studies; pitch to local business press, SHRM chapters, and chambers.
- Partner content: Co-authored guides with employment attorneys, insurance brokers, crisis-PR teams; reciprocal citations.
- Resource inclusion: Law firm libraries, university clinics, nonprofit HR coalitions.
- Thought leadership: Private roundtables; slides/PDFs hosted on-domain with `Article` schema and canonical tags.

## Image and Answer-Engine Optimization Metadata

- Descriptive alt text patterns; IPTC creator/copyright, headline, location.
- Filenames include query terms.
- Captions include "last updated" signals.

## Content Operations

- Quarterly state-law refresh; monthly California updates.
- Two Answer Cards per week per hub until 100+ live.
- Each net-new page ships with unique title/meta, H1, FAQ, internal links, schema, proof, CTA, and last-updated stamp.

## Measurement Plan

- Google Search Console: Track query clusters per hub, click-through rate, rich-result impressions.
- Log files: Monitor crawl budget and render health.
- Rank tracking: California plus five national metros.
- Conversion tracking: Form starts, completions, assisted conversions by page type.
- Link velocity and referring domains from legal, insurance, and PR sites.

## 90-Day Build Roadmap

- **Weeks 1–2:** Launch new theme tokens, hub pages, hero Answer Cards, shielded UX, base schema, GBP/Bing/Apple listings.
- **Weeks 3–4:** Publish six guides, three city pages, crisis checklist gate; finalize internal link map.
- **Weeks 5–6:** Add ten Answer Cards, two industry pages, first partner guide, initiate digital PR outreach.
- **Weeks 7–8:** Launch California WVPP and Fair Chance hubs; start state matrix with five states.
- **Weeks 9–10:** Add Los Angeles/Orange County/San Diego city pages; enable retargeting for crisis/compliance visitors.
- **Weeks 11–12:** Conduct link audit, tune Core Web Vitals, expand FAQs, publish anonymized case study PDF.

## Risk Controls

- No guarantees; avoid doorway pages; deliver unique value per page.
- Legal review before publishing state-specific content.
- Strict anonymization with no identifying client details.

## Outstanding Decisions Required

- Final accent color and fonts.
- Crisis service-level agreement hours.
- Five anonymized case blurbs (Scenario → Action → Outcome → Timeline).
- Partner list for co-authored pieces.

