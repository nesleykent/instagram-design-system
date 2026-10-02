# 02 · Colour

## Principles

1. **One loud gradient, everything else quiet.** The brand gradient is fully saturated across five hues; nearly every other surface, text, and border colour in the system is a near-neutral grey so the gradient is never visually competing with anything.
2. **Colour is semantic, not literal.** Production code never reaches for a raw hex value for UI chrome — it reaches for a role (`--ig-primary-text`, `--ig-secondary-background`) that resolves differently in light and dark mode. Brand marketing surfaces are the exception: the hero gradient is hard-coded, deliberately, because it must look identical regardless of theme.
3. **Light and dark values come from two theme scopes.** The captured bundle declares each themed `--ig-*` token in a light scope (`._aa4c`) and a dark scope (`._aa4d`). Light mode uses pure white (`255,255,255`) for `--ig-primary-background` and pure black (`0,0,0`) for `--ig-primary-text`; the dark scope declares `12,16,20` and `245,245,245` for the same tokens. The bundle records values only, not the reasoning behind them.

## Tokens

### The brand gradient family

The canonical About-page hero gradient, found verbatim:

```css
background-image: linear-gradient(72.44deg, #FF0169 4.69%, #D300C5 48.96%, #7638FA 92.19%);
```

This is a three-stop crop of a larger five-stop **spectrum** that recurs across the codebase at multiple angles and crops — strong evidence of one underlying gradient ramp deliberately sliced for different surfaces, rather than independently-designed gradients:

| Stop | Hex | Hue |
|---|---|---|
| 1 | `#FFD600` | Yellow |
| 2 | `#FF7A00` | Orange |
| 3 | `#FF0169` | Pink/Rose |
| 4 | `#D300C5` | Magenta |
| 5 | `#7638FA` | Purple |

Observed full and cropped instances:
```css
linear-gradient(125deg,   #FFD600 15%, #FF7A00 30%, #FF0169, #D300C5 70%, #7638FA 85%)      /* full 5-stop */
linear-gradient(72.44deg, #FFD600 9.9%, #FF7A00, #FF0169 51.56%, #D300C5 71.35%, #7638FA 92.19%) /* full 5-stop, hero angle */
linear-gradient(72.44deg, #FF0169 4.69%, #D300C5 48.96%, #7638FA 92.19%)                     /* crop: rose→purple — the hero default */
linear-gradient(72.44deg, #FF7A00 11.92%, #FF0169 51.56%, #D300C5 85.69%)                    /* crop: orange→magenta */
linear-gradient(72.44deg, #FFD600 9.9%, #FF7A00 41%, #FF0169 89.43%)                         /* crop: yellow→rose */
```
A closely related secondary palette (`#FFD400 / #FF7000 / #FF0067 / #E700CB / #7F33FF`) appears at different angles in the production bundles — near-identical hue positions with slightly shifted hex values. Treat this as a second, lower-confidence gradient family rather than noise: there are clearly *two* generations or *two* contexts of the same five-hue idea in the live CSS, and this manual cannot fully resolve from selectors alone which surfaces use which. Default to the primary family above for any new work.

**Text-gradient treatment** (`-webkit-background-clip: text`), used for hover/highlight emphasis rather than backgrounds:
```css
background-image: linear-gradient(to right, #D300C5, #FF7A00, #FFD600);   /* magenta → orange → yellow */
background-image: linear-gradient(90deg,    #D300C5, #FF0069, #FF7A00);   /* magenta → rose → orange */
```

**Underline accent** (small, secondary — nav link hover):
```css
background-image: linear-gradient(#F7D440, #ED1F1F);   /* yellow → red, vertical */
```

### Neutral & monochrome foundation

The three about-page hero variants are background-only — gradient, pure black, pure white — confirming the gradient is treated as one of exactly three equally-valid "hero moods," not the only option:
```css
background: linear-gradient(72.44deg, #FF0169 4.69%, #D300C5 48.96%, #7638FA 92.19%);
background: #000;
background: #fff;
```

### Themed `--ig-*` tokens (as declared in /ig)

The production app's entire UI is built on `rgb(var(--ig-token-name))` — a custom property holding an `R, G, B` triplet (not a full colour), so opacity can be layered on with `rgba(var(--ig-token), 0.5)` without a second token. Values as declared in the light (`._aa4c`) and dark (`._aa4d`) theme scopes:

| Token | Light | Dark |
|---|---|---|
| `--ig-primary-background` | `255,255,255` | `12,16,20` |
| `--ig-secondary-background` | `243,245,247` | `37,41,46` |
| `--ig-elevated-background` | `255,255,255` | `33,35,40` |
| `--ig-secondary-elevated-background` | `243,245,247` | `43,48,54` |
| `--ig-primary-text` | `0,0,0` | `245,245,245` |
| `--ig-secondary-text` | `115,115,115` | `168,168,168` |
| `--ig-tertiary-text` | `115,115,115` | `199,199,199` |
| `--ig-primary-icon` | `38,38,38` | `245,245,245` |
| `--ig-secondary-icon` | `142,142,142` (single value — constant across themes) | |
| `--ig-highlight-background` (hover fill) | `239,239,239` | `38,38,38` |
| `--ig-separator` | `219,219,219` | `38,38,38` |
| `--post-separator` | `239,239,239` | `38,38,38` |
| `--ig-stroke` | `219,219,219` | `85,85,85` |
| `--ig-hover-overlay` | `0,0,0,.05` (5% black wash) | `255,255,255,.1` (10% white wash) |

Fixed, theme-independent semantic colours (deliberately do **not** shift with light/dark, because their meaning depends on consistency, not on matching the surrounding surface):

| Token | RGB | Meaning |
|---|---|---|
| `--ig-primary-button` | `0,149,246` (`#0095F6`) | The signature Instagram link/button blue |
| `--ig-primary-button-hover` | `24,119,242` | Pressed/hover state |
| `--ig-error-or-destructive` | `237,73,86` | Errors, destructive actions |
| `--ig-success` | `88,195,34` | Success state |
| `--ig-live-badge` | `255,1,105` | "LIVE" badge |
| `--ig-close-friends-refreshed` | `28,209,79` | Close Friends green star |
| `--ig-subscribers-only` | `118,56,250` | Subscriptions/paid content purple — identical to `--gradient-purple` |
| `--ig-outgoing-message-bubble` | `74,93,249` | Sent DM bubble |
| `--web-always-white` / `--web-always-black` | `255,255,255` / `0,0,0` | True black/white for video chrome, lightboxes — never theme-swapped |

`--gradient-yellow: 255,214,0` and `--gradient-purple: 118,56,250` independently confirm two of the five brand-gradient stops are also registered as standalone semantic tokens (`#FFD600` and matching the subscribers-only purple) — direct cross-validation that the gradient and the semantic palette share a single source of truth.

### Overlay & scrim system

Photo-legibility overlays are a distinct, repeated pattern — black-to-transparent gradients layered over imagery so white text stays readable without a flat dark box:
```css
linear-gradient(to bottom, rgba(0,0,0,.6), transparent);
linear-gradient(0deg, transparent 80%, rgba(0,0,0,.35));
linear-gradient(180deg, rgba(0,0,0,.5), rgba(0,0,0,.49) ... transparent);  /* 16-stop fine fade */
```

### Depth: blur and glow

- `backdrop-filter: blur(20px)` — modal/sheet scrims.
- `backdrop-filter: blur(100px)` — large ambient background blur (cover-photo-style soft backdrops).
- Soft low-opacity `radial-gradient` glows (e.g. `radial-gradient(#A033FF 37%, transparent 46%)`) sit behind avatars/status indicators as halo treatments rather than hard rings.

### Wide-gamut colour

At least one gradient is authored in the `display-p3` colour space (`color(display-p3 .9216 .2706 1)`), a progressive enhancement that yields richer, more saturated colour on capable displays while degrading gracefully elsewhere — evidence the colour system is engineered for output fidelity, not just defined in sRGB hex.

## Specifications

### Token architecture (three layers)

1. **Foundation layer** — cross-Meta tokens with an `--fds-*` / `--web-always-*` namespace (e.g. `--fds-black-alpha-60`, `--fds-gray-25`) — shared infrastructure, not Instagram-specific.
2. **Semantic layer** — `--ig-*` tokens (the tables above) — Instagram's own naming of roles on top of the foundation.
3. **Compiled atomic layer** — auto-generated hashed classnames (`._a8y9`, `._x8exfn3`, etc.) produced by an atomic CSS build step, each resolving to one or two of the above.

New work should target layer 2 (`--ig-*`) directly and never hand-author layer 3.

## Usage rules

- **Do** apply the brand gradient as a whole-surface treatment (backgrounds, large text-fills) — never as a small UI accent (button fill, icon tint). Small accents borrow the underline-accent or a single solid token instead.
- **Do** use `rgb(var(--ig-token))` / `rgba(var(--ig-token), alpha)`, never a hard-coded hex, for anything that must adapt to light/dark mode.
- **Don't** assume every multi-value custom property uses comma-separated RGB — `--ig-banner-highlight-background` and `--ig-elevated-highlight-background` are space-separated (`239 239 239`), which breaks if dropped directly into a comma-style `rgba()` call without reformatting.
- **Don't** invent a sixth gradient stop or a new angle for "one-off" brand moments — every observed instance is a slice of the same five-stop ramp.

## Implementation notes

- The "alt" gradient family (`#FFD400`/`#FF7000`/`#FF0067`/`#E700CB`/`#7F33FF`) could not be attributed to a specific surface from selector context alone — flagged as lower-confidence rather than omitted.
- `--ig-link` was found with two values (`0,55,107` and `224,241,255`) that don't resolve cleanly to an obvious light/dark pairing (the "light" value is itself very pale) — possibly a link-preview chip background rather than link text colour. Presented as observed, not over-interpreted.
