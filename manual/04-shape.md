# 04 · Shape

## Principles

1. **A three-tier shape grammar.** Every rounded form in the system resolves to one of three primitives: the **circle** (avatars, icon buttons, dismiss controls), the **rounded square** (cards, tiles, modals — including a true tokenized **squircle**), or the **pill** (tags, badges, segmented progress). There is no fourth shape language.
2. **Radius is a token, not a magic number.** Even one-off components reach for `var(--input-border-radius)` or `var(--modal-border-radius)` rather than a hard-coded pixel value.
3. **Organic cuts are reserved for functional notches, not decoration.** Custom SVG-path `clip-path`s in the codebase consistently resolve to one functional shape — a speech-bubble tail — rather than ornamental blob shapes.

## Tokens

### Radius scale

```
0, 2px, 3px, 4px, 6px, 7px, 8px, 10px, 11px, 12px, 14px, 16px, 20px, 25px, 30px, 100px, 1000px, 50%
```
Plus tokenized references confirmed directly in source:
```css
--input-border-radius: 6px;
--modal-border-radius: 12px;
```
`100px`/`1000px` function as "pill" radii (larger than half the element's height, so the result is fully rounded regardless of size) rather than literal radius measurements.

### The squircle token

```css
clip-path: var(--squircle-polygon);
```
Confirmed as a real, reusable custom property used directly as a `clip-path` on UI tiles (the character-picker swatches) — i.e. Instagram's "squircle" is a genuine tokenized primitive in production CSS, not an inferred visual style. The exact coordinate list wasn't captured in the excerpts analyzed here, but its existence and usage site are independently confirmed.

### Aspect ratios (shape of content, not just containers)

| Ratio | Use |
|---|---|
| `1/1` | Grid posts, avatars, character-picker tiles |
| `4/5` (`auto 3/4.5` observed) | Portrait feed-post crop |
| `9/16` | Stories / Reels full vertical video |
| `16/9`, `32/9` | Landscape video, wide mosaic collage rows |
| `3/4` | Deep-dive editorial cards (about-page) |

## Specifications

### Circle

`border-radius: 50%` — avatars, circular dismiss buttons (`._9l16 ._9l15`: 36px circle with a centered icon, darkens on hover), carousel prev/next arrows (`._aaqh`: white circle, soft drop shadow, scales opacity on hover/press).

### Rounded square / squircle

`border-radius: 4–16px` for cards and containers; the character-picker grid specifically uses `border-radius: 16px` on an `aspect-ratio: 1/1` tile *and* offers the `--squircle-polygon` clip-path as the sharper, more brand-distinct alternative to a plain rounded corner.

### Pill

`border-radius: 20px`–`1000px` for tags (the about-page type-tester badge: `border: 2px solid #7638FA; border-radius: 20px`) and the **Stories progress bar** segments (`border-radius: 3px` on each thin segment, `background: rgba(255,255,255,.35)` track, solid white fill animated via `transform: scaleX`) — one of the single most recognizable shape+motion pairings in the entire Instagram product.

### Functional organic cuts

A symmetric Bézier path —
```css
clip-path: path("M 24 0 Q 19.5 0 18 2.571 Q 16.5 6 12 6 Q 7.5 6 6 2.571 Q 4.5 0 0 0 Z");
```
— 24 units wide, 6 tall, symmetric around its center: this is a chat-bubble tail/notch, not a decorative flourish. Two further triangular `clip-path: polygon(...)` cuts (top-left, bottom-right corner triangles) are used as alternating diagonal mask reveals in the brand-logo scroll sequence — functional transition shapes, not standalone iconography.

### Modal corner-clipping technique

Modern modals clip to rounded corners via `clip-path: inset(0 0 0 0 round var(--dialog-corner-radius))` rather than `overflow: hidden` — this lets inner content scroll without the older overflow-clipping side effects (scrollbar gutter, repaint cost) while still guaranteeing rounded corners.

## Usage rules

- **Do** pick one of the three primitives (circle / rounded-square-or-squircle / pill) for any new component — don't introduce a fourth shape family.
- **Do** use `--squircle-polygon` instead of a plain `border-radius` when a tile should read as distinctly "Instagram" rather than generically rounded (app icon, character/type swatches, brand-forward tiles).
- **Don't** hand-roll a new clip-path SVG path for decoration. Every organic path found in source serves a specific functional purpose (a tail, a transition mask) — that discipline is part of the system, not an accident.
- **Don't** use a fixed pixel radius where a token exists (`var(--input-border-radius)`, `var(--modal-border-radius)`) — even small, "obviously fixed" components in the source reach for the token.

## Implementation notes

- The literal coordinate list behind `--squircle-polygon` was not present in the excerpts available to this analysis; only its declaration-as-custom-property and its usage site are confirmed. Anyone implementing this token directly should source the coordinate values from the live site rather than assuming a generic superellipse formula.
