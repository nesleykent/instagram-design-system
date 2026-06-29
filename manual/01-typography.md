# 01 · Typography

## Principles

1. **Two type systems, two jobs.** Instagram runs *two* distinct typeface families in production, not one: **Optimistic** is the product/UI typeface (the app you use every day); **Instagram Sans** is the brand/marketing typeface (the about-page, brand storytelling, editorial moments). They share a fallback philosophy (geometric grotesque, Helvetica-adjacent) but are never the same font file.
2. **Global scale is an engineering requirement, not an afterthought.** Both families ship script-specific optical cuts (Arabic, Vietnamese) rather than relying on the browser's generic fallback for non-Latin text.
3. **Display type is fluid by formula, not by breakpoint.** The largest type doesn't jump between fixed sizes at breakpoints — it scales continuously with the viewport via `vw`/`vh` units and `calc()` linear interpolation, only "locking" to a fixed pixel size past `1920px`.

## Typefaces

### Optimistic — the product typeface

Declared via `@font-face` in `g8T_6-Yirbb.css`:

| Family | Weights shipped | Role |
|---|---|---|
| `Optimistic Display` | 200, 300, 500, 700, 800 | Larger UI text, numerals, headline-scale product moments |
| `Optimistic Text` | 400, 500, 700 | Body/UI text |
| `Optimistic VF` | Variable, `200 800` | Variable-font version of the above for fine-grained weight control |

Confirmed elsewhere in the production bundles: `Optimistic Display`/`Optimistic Text` each ship **Light, Medium, Bold, Semibold, ExtraBold** named static instances, plus dedicated **`Arbc` (Arabic)** and **`Viet` (Vietnamese)** cuts in Light/Medium/Bold — each also available as a `Swap`-suffixed family for `font-display: swap` loading. Two further specialised cuts appear: `Optimistic DM` (its own `@font-face`, almost certainly the Direct Messages surface) and `Optimistic 95`.

**Fallback stack:**
```css
font-family: Optimistic Display, Montserrat, Helvetica, Arial, Noto Sans, sans-serif;
```
Montserrat — not a generic system font — is the deliberate second-choice fallback, chosen for its geometric kinship to Optimistic rather than for availability alone.

### Instagram Sans — the brand typeface

Confirmed both by local font files (`Instagram Sans.ttf`, `Instagram Sans Bold.ttf`, `Instagram Sans Light.ttf`, `Instagram Sans Medium.ttf`, `Instagram Sans Headline.otf`) and by extensive use across the about-page CSS:

| Cut | Selector evidence | Typical use |
|---|---|---|
| Instagram Sans (Regular 400) | `._a8fp`, `._a96q` | Default about-page body/UI text |
| Instagram Sans Light (300) | `._a9l1 ._a8f1` | Light editorial moments |
| Instagram Sans Medium (500) | `._a9l2 ._a8f1` | Mid-weight emphasis |
| Instagram Sans Bold (700) | `._a8fg ._a8f1` | Strong emphasis |
| **Instagram Sans Headline** | `._a9in` (hero scroller), `._a96r` (giant stat numerals) | The optically-distinct cut reserved for the largest display moments |
| **Instagram Sans Condensed** (+ Bold) | `._a8fh`/`._a8fi`, type-tester | Tight-width display, character-picker UI |
| **Instagram Sans Script** (+ Bold) | `._a8fd`/`._a8fe`, type-tester | Editorial flourish, character-picker UI |

**Fallback stack (universal across about-page):**
```css
font-family: Instagram Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
/* Headline moments prepend the Headline cut: */
font-family: Instagram Sans Headline, Instagram Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
```

### Internationalization

Both systems treat non-Latin scripts as first-class, not as fallback-font afterthoughts: Optimistic ships `Arbc` and `Viet` optical cuts; the wider production CSS additionally references locale-specific fallback families for CJK and other scripts (e.g. `Seol Sans W05` for Korean, `Tazugane Info W05` for Japanese, `M Ying Hei HK W05` for Hong Kong Chinese) layered in beneath the brand fonts. This is the clearest evidence in the entire codebase that "global scale" in Instagram's own words is a literal, font-engineering commitment.

## Tokens

### Weight scale (named, not just numeric)

```
--font-weight-system-extra-light: 200;
--font-weight-system-light:       300;
--font-weight-system-regular:     400;
--font-weight-system-medium:      500;
--font-weight-system-semibold:    600;
--font-weight-system-bold:        700;
--font-weight-system-extra-bold:  800;
```

### System UI type scale (product app — paired size/line-height)

| Font size | Line height | Ratio |
|---|---|---|
| 10px | 12px | 1.20 |
| 11px | 13px | 1.18 |
| 12px | 16px | 1.33 |
| 14px | 18px | 1.29 |
| 16px | 24px | 1.50 |
| 18px | 24px | 1.33 |
| 22px | 26px | 1.18 |
| 24px | 27px | 1.13 |
| 26px | 28px | 1.08 |
| 28px | 32px | 1.14 |
| 32px | 40px | 1.25 |

Line-height ratio compresses as size increases — standard professional type tuning — except at 16px, which gets generous 1.5 spacing (this is the dominant body-copy size).

### Brand/marketing display scale (about-page)

This is a **separate, fluid scale** — not the table above:

| Context | Size | Notes |
|---|---|---|
| Hero type scroller | `32.5vw` (`42vw` ≤768px) | `letter-spacing: -3px`, `line-height: 100%` |
| Giant centered numeral/letter | `43.2vh` → `253px` (≤750px) | Square-canvas display character |
| Stat/headline number | `110px` → `64px` (≤768px) → `56px` (≤475px) → `112px` (≥1920px) | Responsive numeral display |
| Fluid slide headline | `calc(40px + 260 * ((100vw - 300px) / 1800))` | True linear interpolation — no breakpoint jump |

### Tracking (letter-spacing)

Two opposite rules, both deliberate:

- **Display type tightens.** Hero/headline sizes: `-3px` to `-4px` literal tracking; body/UI sizes: `-0.01em` to `-0.06em` micro-tightening.
- **Labels and small caps open up.** Small uppercase-leaning labels: `+0.5px` to `+1.88px` positive tracking (e.g. the about-page stat badge at `1.88px`).

## Specifications

### The "type tester" — a selector style unique to typography

The about-page implements an actual interactive type sampler (`._a8fc`/`._a8f1`/`._a8e_`), letting a visitor preview Instagram Sans across all four display cuts (Sans / Script / Condensed / their Bold counterparts). Each option is a circular swatch (`border-radius` via `aspect-ratio: 1/1` tiles) that fills with a brand-gradient background on hover/active and triggers a "rolling" character-swap animation (see [06-motion.md](06-motion.md)). This is the brand system's most literal expression of "this is our typeface, try it" — a pattern worth reusing whenever introducing a typeface to a non-technical audience.

### Antialiasing

`-webkit-font-smoothing: antialiased` is applied broadly, particularly anywhere a light or thin weight renders on a flat background — necessary because Optimistic Light (200) and Instagram Sans Light (300) lose stroke contrast without it on non-Retina rendering paths.

## Usage rules

- **Do** pair Instagram Sans Headline only with its own fallback chain (`Instagram Sans Headline, Instagram Sans, Helvetica Neue, Helvetica, Arial, sans-serif`) — never drop straight to Helvetica, or the optical sizing intent (a cut specifically drawn for huge display sizes) is lost.
- **Do** use the fluid `calc()` formula for any new hero-scale type rather than adding another breakpoint — it's the system's own preferred technique for display type and avoids visible jumps.
- **Don't** use Optimistic and Instagram Sans interchangeably. Optimistic is for product surfaces (anything that looks like the app); Instagram Sans is for brand/editorial surfaces (anything that looks like marketing).
- **Don't** tighten tracking on small UI text the way display type is tightened — the system reserves negative tracking beyond `-0.06em` for display sizes only.

## Implementation notes

- No `@font-face` block for Instagram Sans itself was found in the captured CSS (only Optimistic's was) — Instagram Sans is evidenced here by the shipped `.ttf`/`.otf` binaries and by extensive `font-family` usage, not by a captured `@font-face` rule. Treat the weight↔cut mapping above as derived, not literally read from a `src:` declaration.
- `Instagram Squeeze` appears once as a referenced family name in the production bundle with no accompanying context — likely a tightly condensed numeral cut for badges/counters. Not enough evidence to specify further.
