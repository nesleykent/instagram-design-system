# 05 · Components

## Principles

1. **A three-tier button hierarchy**, not a binary primary/secondary split — production tokens confirm `primary` / `secondary` / `tertiary` button backgrounds, borders, hover, and text colours all exist as distinct, named roles.
2. **Hover state is a wash, not a redesign.** The dominant hover pattern across components is a flat percentage-opacity overlay (`--ig-hover-overlay`) or a single underline/scale transform — never a colour, shape, or layout change.
3. **One signature micro-interaction recurs everywhere.** The "rolling" chevron (see [06-motion.md](06-motion.md)) appears on nav links, the type tester, and deep-dive cards — three otherwise-unrelated components united by the same affordance, which is strong evidence it's a deliberate system-level signature rather than a coincidence.

## Buttons

| Tier | Background (light) | Border | Text | Hover |
|---|---|---|---|---|
| Primary | `--ig-primary-button` `0,149,246` | none | white | `--ig-primary-button-hover` `24,119,242` |
| Secondary | `--ig-secondary-button-background` `239,239,239` (dark `54,54,54`) | none | `--ig-secondary-button` `38,38,38` (dark `250,250,250`) | `--ig-secondary-button-hover` `219,219,219` (dark `38,38,38`) |
| Tertiary | `--ig-tertiary-button-background` `255,255,255` | `--ig-tertiary-button-border` `219,219,219` | `--ig-tertiary-button-text` `38,38,38` | `--ig-tertiary-button-hover` `245,245,245` |

The tertiary tokens are declared with identical values in both the light (`._aa4c`) and dark (`._aa4d`) theme scopes, so the tertiary button does not change with theme.

Radius: `var(--input-border-radius)` (`6px`) for standard buttons; pill (`20px`+) for tag-like or compact CTAs.

## Links & navigation

The about-page nav link is a ghost button with an underline that **grows in from the left on hover**, not a static underline that's merely revealed:
```css
position: relative;
}
a::before {
  content: "";
  position: absolute; left: 0; top: 100%;
  width: 100%; height: 1px;
  background-image: linear-gradient(#F7D440, #ED1F1F); /* yellow → red */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .5s cubic-bezier(0,.61,.28,.92);
}
a:hover::before { transform: scaleX(1); }
```
A disabled/current-page variant (`._a96t`) removes both the hover colour change and the underline entirely (`background-image: none; height: 0`) rather than just dimming it — disabled state is structurally inert, not just visually muted.

## Cards

Two distinct card families:
- **Deep-dive editorial card** — `aspect-ratio: 3/4` portrait image, `border-radius` via container, slides up on scroll-into-view (`translateY(100em) → 0`), swaps to a "rolling" play affordance on hover.
- **Utility/list card** (legacy modal-adjacent) — `border-radius: 6px`, layered soft shadow (`0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1)`), `565px` fixed width, used for confirmation/share dialogs.

## Modals & panels

Two distinct elevation behaviours depending on context:
- **Full-height about-page panel** — slides up from `translateY(100%)` to `0`, paired with a `visibility` toggle so it's unreachable by keyboard/AT when closed, eased with `cubic-bezier(0,.61,.28,.92)` (the system's "settle" curve).
- **Lightbox / media viewer** — fades opacity `0→1` *and* scales `0.96→1` simultaneously (a "zoom-settle" combination), eased with `cubic-bezier(.7,0,.3,1)`.
- **Legacy utility modal** — simplest treatment: flat fade, `border-radius: 6px`, circular icon-only dismiss button matching the Circle shape primitive ([04-shape.md](04-shape.md)).

All modern modals clip to rounded corners via `clip-path: inset(0 0 0 0 round var(--dialog-corner-radius))` (`--modal-border-radius: 12px`).

## Chat / messaging

- Outgoing bubble: `--ig-outgoing-message-bubble` `74,93,249` (periwinkle blue).
- Incoming bubble: `--ig-incoming-message-bubble`, theme-paired `243,245,247` / `37,41,46`.
- Tail/notch: the symmetric Bézier `clip-path` documented in [04-shape.md](04-shape.md).
- Dedicated `Optimistic DM` typeface cut, suggesting the messaging surface gets its own optical tuning distinct from the rest of the product.

## Stories progress bar

A flex row of pill segments (`border-radius: 3px`, semi-transparent white track), each filling left-to-right via `transform: scaleX(0) → scaleX(1)` driven by an `animation-duration` that's set inline per-story (so the bar's fill speed always matches that story's display duration exactly). Arguably the single most recognizable Instagram-specific component shape+motion pairing covered in this manual.

## Dropdowns & selectors

The about-page **type tester** (see [01-typography.md](01-typography.md)) is the system's primary example of a "selector" UI: a horizontal row of equal-sized swatches, each `aspect-ratio: 1/1`, filling with a gradient background and triggering the rolling-chevron affordance on hover/active — functioning simultaneously as a typeface preview and as the general pattern for any "pick one of several visual options" control.

Legacy dropdown menus (`._558b`/`._54ng`) use a simpler, denser treatment: `3px` radius, `1px` semi-transparent border, `0 3px 8px rgba(0,0,0,.3)` shadow, `12px` text, disabled items at `55%` opacity rather than removed.

## Forms

Limited evidence in the captured CSS; what's present confirms inputs follow the same token discipline as everything else: `border` colour from `--ig-text-input-border-prism` (light/dark paired), radius from `var(--input-border-radius)`, no bespoke one-off treatment.

## Usage rules

- **Do** reach for the rolling-chevron affordance when introducing a new "hover to discover more" interaction — it's the system's established signature for that purpose, used three times already across unrelated components.
- **Do** keep hover state to a flat overlay wash or a single transform; don't combine colour change + shape change + shadow change on hover, which doesn't appear anywhere in the source.
- **Don't** build a fourth button tier — primary/secondary/tertiary covers every observed case, including on dark backgrounds.
- **Don't** give a disabled nav item a dimmed-but-present underline — the source removes the affordance structurally (`height: 0`), not just visually.

## Implementation notes

- Component specs above are reconstructed from a mix of the about-page's bespoke marketing components and the production app's shared utility classes; where a component (e.g. forms) had limited representation in the captured CSS, this is stated rather than filled in with assumption.
