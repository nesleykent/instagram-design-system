# 09 · Implementation Notes

## Token architecture

Three layers, observed consistently across every section of this manual:

1. **Foundation layer** — `--fds-*`, `--web-always-*`, `--system-*` custom properties. Shared Meta-wide infrastructure (typography scale, base shadow/alpha tokens), not Instagram-specific.
2. **Semantic layer** — `--ig-*` custom properties (`--ig-primary-background`, `--ig-primary-button`, etc.). Instagram's own naming of *roles* on top of the foundation, almost always stored as bare `R, G, B` triplets so `rgba(var(--ig-token), alpha)` can layer on opacity without a second token.
3. **Compiled atomic layer** — auto-generated hashed classnames (`._a8y9`, `._x8exfn3`, the `._a9xx`-style selectors used throughout this manual). These are build output, not hand-authored — they resolve to one or two layer-2 tokens each and should never be hand-written or extended directly.

**Rule of thumb for any future implementation work:** write against layer 2. Layer 1 is out of Instagram's control (shared infra); layer 3 is generated, not authored.

## Evidence confidence levels

This manual cites three tiers of evidence, and is explicit inline about which applies to each claim:

| Tier | Definition | Example |
|---|---|---|
| **High** | Fully read, small, about-page-specific file; selector and full rule context available | The `72.44deg` hero gradient, the rolling-chevron keyframes, the type-tester structure |
| **Medium** | Cross-validated — the same value appears independently in both an about-page file and a production bundle | `#FFD600` matching `--gradient-yellow`; the brand gradient's hue positions matching `--ig-subscribers-only`/`--gradient-purple` |
| **Low** | Found only via pattern search (`grep`) in a ~950 KB production bundle, without surrounding selector context | The "alt" gradient family, the exact pairing of some light/dark token values, the literal `--squircle-polygon` coordinate list |

Every "Implementation notes" subsection in this manual exists to flag Low-tier claims explicitly rather than presenting them with the same confidence as High-tier ones.

## What was scoped out, and why

The two largest source files (`QhPToV...OpKm_.css` ×2, ~950 KB each) are full production web-app stylesheets, not about-page-specific files. They contain:
- Legacy Facebook-platform utility classes (`.uiContextualLayer`, `#facebook .hidden_elem`, `.fb_logo`) inherited from Meta's shared static-asset pipeline — **out of scope**, not Instagram brand identity.
- Ads-manager and business-suite chrome — **out of scope**.
- Locale-specific fallback font stacks for scripts Instagram Sans/Optimistic don't cover directly (e.g. `Seol Sans W05`, `Tazugane Info W05`) — **partially in scope**: cited in [01-typography.md](01-typography.md) as evidence of the system's internationalization commitment, but not documented as Instagram-authored typefaces, because they aren't.
- Thousands of one-off component breakpoints — **partially in scope**: only values recurring across multiple unrelated components were promoted into the breakpoint tier table in [03-layout-and-grid.md](03-layout-and-grid.md); the rest are noted as existing but not enumerated.

This scoping decision is the main reason this manual is organized by *design dimension* (typography, colour, layout...) rather than by *source file* — a faithful brand-identity manual should read like a design system document, not like an annotated file listing.

## Open questions (consolidated)

For anyone extending this manual against a fresh CSS pull, these are the specific points flagged as unresolved, each with a pointer to where it's discussed:

- Which exact surfaces use the "primary" vs. "alt" brand gradient family? → [02-color.md](02-color.md)
- What does `--ig-link`'s pale-blue value actually back, given it doesn't fit a simple light/dark text-colour pairing? → [02-color.md](02-color.md), [08-accessibility.md](08-accessibility.md)
- What are the literal coordinates behind `--squircle-polygon`? → [04-shape.md](04-shape.md)
- Is `outline: none` on `._5f0v` safely superseded by a `:focus-visible` rule elsewhere in the cascade, or a real gap? → [08-accessibility.md](08-accessibility.md)
- What does the `Instagram Squeeze` font family back? → [01-typography.md](01-typography.md)

## Reproducing this analysis

The methodology was: (1) full reads of every about-page-specific file under `ig/`; (2) targeted `grep -oE` pattern extraction (gradients, custom properties, `cubic-bezier`, breakpoints, shape primitives) across all ten files for anything too large to read in full; (3) cross-referencing extracted values against each other to promote Medium-confidence findings; (4) a single fetch of [about.instagram.com/brand](https://about.instagram.com/brand/) to corroborate the CSS-derived structure against Instagram's own stated framing. Re-running this against an updated `ig/` pull should reuse the same pattern list documented inline across each manual section's tables.
