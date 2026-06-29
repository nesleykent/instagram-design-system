# 08 · Accessibility

## Principles

1. **Accessibility shows up as infrastructure, not as an add-on layer.** The strongest evidence (a real OS-level dyslexia-friendly font option, `forced-colors`/`prefers-contrast` media queries, a true screen-reader-only utility class) lives in the production app's foundation CSS, not bolted on to individual components.
2. **The marketing site holds a lower bar than the product.** Several patterns that are handled correctly in the core app (notably reduced-motion support) are absent on the about/brand storytelling pages — documented below as gaps, not glossed over.
3. **Faithful documentation means reporting both.** This section credits real, citable accessibility investment and names real, citable gaps — both are part of describing the system "as faithfully as possible."

## What the system does well (citable evidence)

### Inclusive font option

```css
font-family: Open Dyslexic;
```
A literal `Open Dyslexic` family reference exists in the production bundle — strong evidence of a genuine accessibility display setting (a dyslexia-friendly font toggle), not just a design-system curiosity.

### OS-level contrast & colour-scheme support

```css
@media (forced-colors: active)  { /* Windows High Contrast Mode overrides */ }
@media (prefers-contrast: more) { /* respects OS-level "increase contrast" */ }
@media (prefers-color-scheme: dark) { /* at least some surfaces follow OS theme, not just an in-app toggle */ }
```
All three confirmed present in the production bundles — this is real, OS-level adaptive accessibility support, beyond what most marketing sites implement.

### Screen-reader-only utility class

```css
.sr-only-equivalent {
  border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px;
  overflow: hidden; padding: 0; position: absolute; width: 1px;
}
```
A textbook visually-hidden-but-AT-accessible utility class (`._akf2` in source) confirms the product ships hidden label text for at least some icon-only controls, rather than relying on icons alone.

### Keyboard focus

```css
:focus-visible { /* present in all three large production bundles */ }
```
Modern `:focus-visible`-scoped focus styling exists, meaning focus rings are shown for keyboard navigation without also appearing on every mouse click — though it appears as a small number of foundational rules rather than extensive per-component customization, so treat this as "present and correct," not "richly designed."

### Antialiasing for light weights

`-webkit-font-smoothing: antialiased` is applied wherever a Light/200–300-weight type cut renders on a flat background — a legibility correction, not just a visual-polish flag, since thin strokes lose contrast without it.

### Robust decorative cursor fallback

Custom cursor SVGs on the about-page (`cursor: url(...), default`) are **always** paired with the `default` keyword fallback — if the custom asset fails to load, the browser cursor still works. A small but real robustness detail worth preserving in any future use of this pattern.

## Gaps (citable, not editorialized)

### Reduced motion — about-page only

As detailed in [06-motion.md](06-motion.md): `@media (prefers-reduced-motion: reduce)` is present and respected in the production app, but **absent from every about-page file analyzed** — meaning visitors who've set their OS to reduce motion still receive the scroll-linked hero animation, the infinite rolling marquees, and the auto-rotating gradient at full intensity. This is the most actionable, specific gap this analysis surfaced.

### `outline: none` without a confirmed replacement

```css
._5f0v { outline: none; }
```
Found with no paired focus-visible replacement style in the same file. Elsewhere in the codebase `:focus-visible` rules do exist (see above), so this may well be safely superseded elsewhere in the cascade — but in isolation, an `outline: none` rule with no visible replacement is a standing accessibility risk pattern, and is flagged here rather than assumed safe.

### Ambiguous-contrast token pairing

`--ig-link` was observed with values `0,55,107` (deep navy) and `224,241,255` (very pale blue) that don't cleanly map to a confident light-mode/dark-mode pairing (see [02-color.md](02-color.md)). Until the actual usage context is confirmed, don't assume either value meets text contrast requirements against an unknown background — verify before reusing.

## Usage rules

- **Do** add a `prefers-reduced-motion: reduce` override to any new about-page/marketing motion — match the bar the production app already clears, rather than the bar the existing about-page code happens to clear.
- **Do** pair any future decorative custom cursor with a `default`/`pointer` fallback, exactly as the existing pattern does.
- **Do** provide hidden label text (the `._akf2`-style utility) for any icon-only control — this is already the established pattern for at least some controls.
- **Don't** ship `outline: none` without confirming a `:focus-visible` replacement is actually in scope for that element — verify rather than assume.
- **Don't** reuse the `--ig-link` token without first confirming which background it will sit on, given the ambiguity noted above.

## Implementation notes

- This section deliberately separates "what's proven by evidence" from "what's a gap" rather than presenting an uncritical accessibility scorecard — both halves matter for a manual whose stated goal is fidelity to the real system.
