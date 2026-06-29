# Instagram Brand Identity Manual (Reverse-Engineered)

**Live site: [nesleykent.github.io/instagram-design-system](https://nesleykent.github.io/instagram-design-system/)**

A production documentation website — in the spirit of Apple's Human Interface Guidelines — that reverse-engineers Instagram's **own** brand identity system: typography, colour, layout, shape, components, motion, imagery, and accessibility, all derived directly from Instagram's production CSS and the public [about.instagram.com/brand](https://about.instagram.com/brand/) page.

**The website is the manual.** Every guideline, token, and component lives on its own page at [`site/`](site/), with real navigation, search, breakpoints, and interactive examples — not a folder of long-form text documents.

This is **not** a new brand inspired by Instagram. Every claim traces back to a real selector, custom property, gradient, easing curve, or breakpoint found in [`ig/`](ig/), or to stated copy on the official brand page. Where evidence was partial or ambiguous, the manual says so explicitly rather than guessing.

> **Disclaimer:** This is an independent, unofficial reverse-engineering and documentation project, not published or endorsed by Instagram or Meta Platforms, Inc. "Instagram," the Instagram wordmark, "Instagram Sans," and "Optimistic" are trademarks/property of Meta. No proprietary font binaries are redistributed in this repository — typefaces are documented by name, metrics, and usage only, and the site itself renders in each visitor's system font stack.

## Run the site locally

```bash
cd site
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # static export to site/out — see site/README.md for deploy notes
```

## Repository structure

```
.
├── ig/                       Source CSS — the primary evidence base (about-page + production app bundles)
├── manual/                   The written Brand Identity Manual, one markdown file per dimension
│   ├── 00-introduction.md … 09-implementation-notes.md
├── tokens/                   Extracted design tokens as plain, usable CSS
│   ├── colors.css, typography.css, spacing.css, motion.css
└── site/                     The documentation website — a Next.js app built from manual/ + tokens/
    ├── app/                  One route per manual section + every component page
    ├── components/           Reusable doc UI: swatches, specimens, playgrounds, showcases
    ├── lib/                  Navigation config, search index — the site's single source of truth
    └── public/
```

## Methodology

1. **Static analysis of `ig/`** — ten CSS files captured from Instagram's about-page and production web app, ranging from a 4 KB about-page stylesheet to two ~950 KB production app bundles. Every selector, custom property, gradient, easing curve, breakpoint, and shape primitive cited anywhere on the site was extracted from these files — not invented.
2. **Visual/narrative reference** — [about.instagram.com/brand](https://about.instagram.com/brand/), which independently confirms the three pillars the CSS evidence already pointed to: a custom typeface, an updated gradient/colour system, and a layout system built to showcase community imagery.
3. **Cross-validation** — tokens confirmed in both the about-page CSS and the production bundles are treated as high-confidence; single-source or ambiguous findings are flagged inline as such, on the site and in `manual/09-implementation-notes.md`.

## Reading order

Start at the site's [Overview](site/app/page.js), then **Foundations** (Typography → Colour → Layout & Grid → Shape → Motion → Imagery → Accessibility) before **Components** — later sections assume the tokens established earlier. The written `manual/*.md` files follow the same order for offline reading.

## Deployment

Every push to `main` touching `site/` builds and publishes the static export to GitHub Pages via [`.github/workflows/deploy-site.yml`](.github/workflows/deploy-site.yml) — no manual deploy step.

## Source assets

[`ig/`](ig/) is kept as-is and committed alongside the manual and the site so every claim remains independently verifiable against the original CSS.
