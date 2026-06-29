# 03 · Layout & Grid

## Principles

1. **One base unit drives the whole canvas.** Nearly every major horizontal measurement on the about-page is a clean multiple of a single fluid unit: `7.142vw` (i.e. `100 ÷ 14`). This is a 14-unit grid expressed in viewport width rather than fixed columns.
2. **The viewport *is* the layout system, until it isn't.** Below `1920px`, spacing and split-ratios scale with `vw`. At and above `1920px`, the system locks to fixed pixel values computed against a `1600px` canvas — the grid stops growing once the canvas is "big enough."
3. **Section rhythm is the narrative unit.** The about-page is built from stacked full-viewport-height (`100vh`) blocks, each a self-contained "chapter," rather than continuous freely-flowing content.

## Tokens

### The 14-unit fluid grid

Base unit: `7.142vw` ≈ `100vw ÷ 14`. Every major layout split observed is a clean multiple:

| Multiple | Value | Fixed equivalent (≥1920px, 1600px canvas) |
|---|---|---|
| ×1 | `7.142vw` | `114.272px` |
| ×2 | `14.285vw` | `228.56px` |
| ×3 | `21.428vw` | `342.848px` |
| ×4 | `28.571vw` | — |
| ×5 | `35.714vw` | `571.424px` |
| ×8 | `57.142vw` | — |
| ×9 | `64.285vw` | `1028.56px` |
| ×10 | `71.428vw` | — |
| ×12 | `85.714vw` | — |

The fixed-pixel column confirms this isn't approximate — `7.142vw` of a `1600px` canvas is exactly `114.27px`, which is the literal value hard-coded into the `min-width: 1920px` media queries. The grid is mathematically intentional, not a rounding coincidence.

### Breakpoint tiers

Instagram's production CSS uses dozens of one-off, component-specific breakpoints (over 100 distinct `max-width`/`min-width` values across the codebase). Filtering for the values that recur across *multiple, unrelated* components surfaces a clear underlying tier system:

| Tier | Anchor values | Use |
|---|---|---|
| Small mobile | `375`, `400`, `430`, `450`, `480px` | Smallest phones |
| Mobile / tablet | `600`, `650`, `735`/`736`, `750`, `768px` | The about-page's primary mobile cutover is `768px`; `735`/`736` recurs heavily in the production app (likely a newer convention layered on top of the legacy `768px` Meta-platform default) |
| Small desktop | `900`, `1000`, `1023`/`1024`, `1050`, `1100`, `1200px` | Compact desktop / small laptop |
| Desktop | `1264`, `1300`, `1350`, `1380`, `1400px` | `1264px` recurs often enough to be the de facto "feed app" desktop threshold |
| Large desktop | `1440`, `1600`, `1730`, `1800`, `1920px` | `1920px` is where the fluid `vw` grid above locks to fixed pixels |
| Ultra-wide (about-page only) | `2700`, `3000px` | Fine-tuning for the hero marquee type size only — not a general-purpose tier |

Also present: `@media (pointer: coarse)` (touch vs. mouse adaptation), `@media print` / `@media not print`, and pixel-density queries (`min-resolution: 144dpi`, `-webkit-min-device-pixel-ratio: 2`) for asset sharpness.

### Max content width

`1600px` is the system's canvas ceiling — confirmed by the `min-width: 1920px` media queries, which consistently substitute `vw`-based spacing with values computed against a `1600px` content width (with the surrounding `(100vw - 1600px) / 2` used to center that canvas on wider viewports).

## Specifications

### Section rhythm: the full-bleed `100vh` chapter

The defining structural unit of the about/brand site. Each "chapter" is:
```css
height: 100vh;
min-height: 512px;   /* prevents collapse on short viewports; observed floors: 450, 500, 512, 700, 712, 850, 1000px depending on content */
```
stacked vertically with `margin-top: 120px` between chapters (reduced to `80px` on the squeezed `max-aspect-ratio: 8/7` variant, and to a simple stacked flex column with no fixed height below `768px`).

### Split-screen template ("Story Split")

A recurring two-column pattern, near-50/50 or asymmetric `5:9` (i.e. `35.714vw` / `64.285vw` — both multiples of the base grid unit):
```css
display: flex;
flex-direction: row;
/* column A */ width: 50%;  min-height: max(100vh, 512px);
/* column B */ width: 50%;  min-height: max(100vh, 512px);
```
Collapses to a single stacked column below `~650–768px`, with explicit `order` reassignment so the image/media column can appear either before or after the text column independent of source order.

### Sticky scrollytelling

Hero photography is pinned via `position: sticky; top: 0` while surrounding text scrolls past underneath/over it (`._a8-5`, `._a8f2`). One sequence spans `height: 180vh` with a `6.66667s` CSS-variable-driven animation duration tied to scroll position — the about-page's most elaborate storytelling device, layering a logo-morph animation, a scale-zoom photo entrance, and a progress bar in sync.

### Reveal-via-clip-path

Instead of revealing new sections with opacity alone, panels wipe into view via `clip-path: inset(...)` transitioning from a fully-clipped edge to `inset(0 0 0 0)` — a deliberate "uncovering" motion rather than a "fading in" one. See [06-motion.md](06-motion.md) for the easing curves involved.

## Usage rules

- **Do** size new about-page layout regions in multiples of `7.142vw` so they align to the existing grid rather than introducing an arbitrary fraction.
- **Do** give every `100vh` section an explicit `min-height` floor — every observed instance has one; none rely on `100vh` alone.
- **Don't** add a new one-off breakpoint without checking the tier table first — the system already has an anchor close to almost any plausible value.
- **Don't** mix `vw`-locked spacing with fixed-pixel spacing within the same section below `1920px` — pick one per breakpoint range, matching how the existing CSS commits fully to `vw` until the `1920px` lock-over.

## Implementation notes

- The ultra-wide (`2700px`/`3000px`) breakpoints exist solely to keep the hero marquee type from over-scaling — they are not a general layout tier and shouldn't be treated as one.
- The production app layers many additional one-off breakpoints per component beyond the tiers above; the tier table reflects values that recur across *multiple unrelated* selectors, which is the relevant signal for "is this an intentional system tier" versus "is this one component's specific tuning."
