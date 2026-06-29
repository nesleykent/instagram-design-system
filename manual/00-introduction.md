# 00 · Introduction

## What this document is

This manual describes Instagram's existing brand identity system as it is actually implemented — in the CSS that ships to browsers — not a reinterpretation of it. It is organized the way an internal design-system document would be: principles, tokens, component specs, usage rules, and do/don't guidance, each backed by a citation to a real file in [`ig/`](../ig/).

## Source evidence base

| File | Size | What it is |
|---|---|---|
| `0r_vd89O1o6.css` | 4 KB | About-page hero type scroller + gradient hero backgrounds |
| `cyug0JeffsB.css` | 23 KB | Shared Meta/Instagram UI utility classes (modals, scrollable areas, contextual layers) |
| `g8T_6-Yirbb.css` | 4 KB | `@font-face` definitions for **Optimistic Display**, **Optimistic Text**, **Optimistic VF** |
| `k9nOd3POwRJ.css` | 7 KB | Product UI fragments — comment permalinks, embeds, stories camera, semantic colour tokens |
| `rrhy0Jd1eT4.css` | 25 KB | About-page brand storytelling sections — animated logo sequence, split heroes, deep-dive cards, mosaic grids, sticky nav |
| `31d5t_UoCWK.css` | 74 KB | Production app CSS fragment |
| `k-FEO04tvD4.css` | 229 KB | Production app CSS fragment (reduced-motion / forced-colors support found here) |
| `QhPToV...OpKm_.css` ×2 | ~950 KB each | Full production web-app CSS bundles — the deepest source of semantic colour tokens, easing curves, breakpoints, and shape primitives in this repository |

The two ~950 KB bundles are the main Instagram web client's compiled stylesheets. They contain thousands of selectors unrelated to brand identity (ads tooling, business-suite chrome, legacy Facebook-platform utility classes inherited from Meta's shared static-asset pipeline). This manual only documents what is clearly Instagram-brand-relevant — the `--ig-*` token namespace, the Optimistic/Instagram Sans typefaces, the brand gradient family, and recurring shape/motion primitives — and is explicit in [09-implementation-notes.md](09-implementation-notes.md) about what was scoped out.

## The three pillars (Instagram's own framing)

Instagram's public brand page states its own brand refresh in exactly three parts, and the CSS evidence independently corroborates all three:

> "We created a custom typeface, updated our gradient and color palette, and refined our approach to layout and design" — [about.instagram.com/brand](https://about.instagram.com/brand/)

1. **"A custom typeface created for global scale"** → confirmed by the Instagram Sans family (Regular/Light/Medium/Bold/Headline/Condensed/Script cuts) and the production Optimistic Display/Text/VF system. See [01-typography.md](01-typography.md).
2. **"Color designed to illuminate and inspire"** → confirmed by the `linear-gradient(72.44deg, #FF0169, #D300C5, #7638FA)` family found verbatim in the CSS, plus a full semantic light/dark colour token system. See [02-color.md](02-color.md).
3. **"Layouts built to showcase our community"** → confirmed by the `7.142vw`-unit fluid grid, full-bleed `100vh` section rhythm, and sticky scrollytelling patterns. See [03-layout-and-grid.md](03-layout-and-grid.md).

## Brand personality, synthesized

Reading the evidence as a whole, Instagram's identity system optimizes for three things simultaneously:

- **Maximalist colour, minimalist structure.** The gradient is loud (five fully-saturated stops); almost everything else — type colour, surface colour, shadows — is reduced to near-monochrome so the gradient has nowhere to hide and nothing to compete with.
- **Confidence over decoration.** Motion is purposeful and infrequent rather than ambient: deliberate wipes (`clip-path` reveals), settles (`cubic-bezier(0,.61,.28,.92)`), and one recurring signature micro-interaction (the "rolling" chevron) rather than a large vocabulary of hover effects.
- **Global before local.** The typeface system ships Arabic- and Vietnamese-specific optical cuts; the colour system ships light and dark variants for nearly every token; the layout system fluidly scales from `375px` to `3000px` viewports. Inclusivity shows up as engineering, not just imagery.

## How to use this manual

Each section follows the same shape: **Principles → Tokens → Specifications → Usage rules → Do/Don't → Implementation notes**. Tokens are restated as real CSS in [`tokens/`](../tokens/) so they can be copied directly rather than re-transcribed from prose.
