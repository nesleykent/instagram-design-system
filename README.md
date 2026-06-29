# Instagram Brand Identity Manual (Reverse-Engineered)

An internal-style design system document that reverse-engineers Instagram's **own** brand identity system — typography, colour, layout, shape, components, motion, imagery, and accessibility — directly from Instagram's production CSS and the public [about.instagram.com/brand](https://about.instagram.com/brand/) page.

This is **not** a new brand inspired by Instagram. Every claim in `manual/` is traced back to a real selector, custom property, gradient, easing curve, or breakpoint found in the source files in [`ig/`](ig/), or to stated copy on the official brand page. Where evidence was partial or ambiguous, the manual says so explicitly rather than guessing.

> **Disclaimer:** This is an independent, unofficial reverse-engineering and documentation project, not published or endorsed by Instagram or Meta Platforms, Inc. "Instagram," the Instagram wordmark, "Instagram Sans," and "Optimistic" are trademarks/property of Meta. No proprietary font binaries are redistributed in this repository (see [`.gitignore`](.gitignore)) — typefaces are documented by name, metrics, and usage only.

## Repository structure

```
.
├── ig/                       Source CSS — the primary evidence base (about-page + production app bundles)
├── manual/                   The Brand Identity Manual, one file per dimension
│   ├── 00-introduction.md
│   ├── 01-typography.md
│   ├── 02-color.md
│   ├── 03-layout-and-grid.md
│   ├── 04-shape.md
│   ├── 05-components.md
│   ├── 06-motion.md
│   ├── 07-imagery.md
│   ├── 08-accessibility.md
│   └── 09-implementation-notes.md
└── tokens/                   Extracted design tokens as usable CSS, informed directly by ig/
    ├── colors.css
    ├── typography.css
    ├── spacing.css
    └── motion.css
```

## Methodology

1. **Static analysis of `ig/`** — ten CSS files captured from Instagram's about-page (`about.instagram.com`) and production web app, ranging from a 3 KB about-page stylesheet to two ~950 KB production app bundles. Every selector, custom property, gradient, easing curve, breakpoint, and shape primitive cited in the manual was extracted from these files with `grep`/direct reads — not invented.
2. **Visual/narrative reference** — [about.instagram.com/brand](https://about.instagram.com/brand/), Instagram's own public brand-refresh page, which independently confirms the three pillars the CSS evidence already pointed to: a custom typeface (Instagram Sans), an updated gradient/colour system, and a layout system built to showcase community imagery.
3. **Cross-validation** — where a token appears in both the about-page CSS and the production app bundles (e.g. the gradient yellow `#FFD600` matching the `--gradient-yellow` custom property), the manual treats it as high-confidence. Single-source or ambiguous findings are flagged inline as such.

## Reading order

Start at [`manual/00-introduction.md`](manual/00-introduction.md), then read in numeric order — later sections (Components, Motion) assume the tokens established in Typography, Colour, and Shape.

## Source assets

[`ig/`](ig/) is kept as-is and committed alongside the manual so every claim remains independently verifiable against the original CSS.
