# 07 · Imagery

## Principles

1. **Imagery is the content; gradient and type are the frame.** Layout patterns consistently treat photography as full-bleed and structural (mosaic grids, full-viewport sticky heroes), while colour and type provide overlay/context rather than competing for primary attention.
2. **Creator photography is asymmetric and collaged, not gridded-and-equal.** The about-page's signature imagery layout deliberately varies cell size within a single composition.
3. **Crop ratios map directly to product surfaces.** The aspect ratios used for imagery (`1/1`, `4/5`, `9/16`) aren't arbitrary art-direction choices — they are the same ratios the product enforces for feed posts, portrait posts, and Stories/Reels, respectively. The about-page documents the product, even in its own photography.

This is corroborated directly by Instagram's own brand page, which describes its current photography direction as deliberately diverse and tightly cropped — "photography features diverse subjects... images are tightly cropped, emphasizing faces and personal style" across varied fashion and self-expression — and frames imagery explicitly around showcasing its global creator community rather than staged lifestyle photography.

## Specifications

### Mosaic collage grid

A CSS grid of asymmetric image cells (not a uniform N×N grid):
```css
aspect-ratio: 16/9;            /* or 32/9 for a wide single-row variant */
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
```
Individual cells span 1–2 grid tracks via explicit `grid-column`/`grid-row` start/end, producing a composition where one image is twice the size of its neighbors — collapses to a single-column stack (`aspect-ratio: 16/36`, 4 stacked rows) below `400px`. This is the about-page's literal "creator collage."

### Sticky pinned hero photography

Full-viewport photography pinned with `position: sticky; top: 0` while a logo-morph sequence and text scroll independently above/around it. The photo itself enters with a scale-down "zoom-settle" (`scale(1.3051) → scale(1)` over `2s`) — see [06-motion.md](06-motion.md) — so the image visibly arrives rather than simply being present on load.

### Portrait editorial cards

`aspect-ratio: 3/4`, `object-fit: cover`, `object-position: center` — a deliberately tighter, more personal crop than the product's standard `4/5` feed-post ratio, reserved for the about-page's "deep dive" creator profiles.

### Core content aspect-ratio system (mirrors the product)

| Ratio | Surface |
|---|---|
| `1/1` | Feed grid, avatars |
| `4/5` | Standard portrait feed post |
| `9/16` | Stories, Reels |
| `16/9` | Landscape video, About-page mosaic rows |

Numerous additional fixed pixel-ratio crops (e.g. `335/680`, `584/255`) exist for specific one-off promotional cards and are out of scope as general system ratios.

### Layering & legibility

Photography is never left to compete directly with overlaid text — every text-on-image instance in the source pairs with a scrim gradient (see [02-color.md](02-color.md) Overlay & scrim system), most often a directional black-to-transparent fade rather than a flat semi-transparent box, so the underlying image stays partially visible even where text sits.

### Loading state

A `shimmer.gif`-based skeleton background (`background-color: rgb(var(--ig-highlight-background)); background-image: url(shimmer.gif)`) fills media containers before the real asset loads — the system's perceived-performance treatment, visually consistent with the neutral palette rather than a generic grey box.

## Usage rules

- **Do** vary cell size within a single collage composition — the system's mosaic grid is explicitly asymmetric, not a uniform tile grid.
- **Do** crop new creator photography to one of the three core ratios (`1/1`, `4/5`, `9/16`) so editorial imagery stays visually consistent with what the product itself produces.
- **Don't** place text directly over photography without a scrim gradient — there is no instance in the source of unprotected text-on-image.
- **Don't** treat the about-page's `3/4` portrait card ratio as the product standard — it's a deliberately distinct, slightly tighter "editorial" crop reserved for brand storytelling, not feed posts.

## Implementation notes

- One isolated instance of `filter: invert(90%) brightness(70%)` was found applied to a media placeholder. With only one occurrence and no surrounding context, this is noted as a possible special-case treatment rather than a general imagery-filter rule.
- This section's "diverse, tightly-cropped, creator-focused" characterization is corroborated by the public brand page in addition to the CSS evidence (CSS alone cannot describe photographic subject matter) — see [00-introduction.md](00-introduction.md) for how the two sources were cross-validated.
