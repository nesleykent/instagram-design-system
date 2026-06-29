# 06 · Motion

## Principles

1. **Motion is infrequent and purposeful, not ambient.** There is no general "everything fades in" rule. Instead there's a small set of named easing curves, each reused consistently for the same *kind* of motion across unrelated components.
2. **Reveals uncover; they don't just appear.** The system's preferred entrance is a `clip-path` wipe (something sliding out from behind a mask) rather than a plain opacity fade, whenever the brand storytelling sections are the actor.
3. **One signature affordance, reused deliberately.** The "rolling" chevron/arrow animation appears, near-identically, in at least three unrelated components — strong evidence it's a recognized internal pattern, not a coincidence of three designers solving the same problem differently.

## Tokens

### Named easing curves (about-page brand storytelling)

These five curves account for nearly every transition on the about-page; names below are descriptive labels assigned for this manual, not confirmed internal Meta names:

| Label | Curve | Feel | Used for |
|---|---|---|---|
| **Ease Standard** | `cubic-bezier(.33,0,.67,1)` | Smooth, symmetric | Opacity fades, item intros |
| **Ease Confident** | `cubic-bezier(.7,0,.3,1)` | Steep, deliberate | `clip-path` wipes, lightbox zoom |
| **Ease Glide** | `cubic-bezier(0,0,.1,1)` | Fast start, long gentle settle | translateY reveals, rolling chevrons, arrow bounce |
| **Ease Settle** | `cubic-bezier(0,.61,.28,.92)` | Springy, no overshoot | Panel slide-up, nav underline-grow |
| **Ease Anticipate** | `cubic-bezier(.4,0,.1,1)` | Slow build, quick resolve | Brand-logo zoom, alternate split-reveal |

### Broader production easing toolkit

The production app bundles reference over 30 distinct `cubic-bezier` curves in total, including standard named curves from common animation libraries (e.g. `cubic-bezier(.34,1.56,.64,1)` and `cubic-bezier(.68,-.55,.265,1.55)` — both recognizable "back-out/back-in-out" overshoot curves). This manual does not attribute every one of these to a specific component — selector context for the two largest bundles wasn't fully traceable — but their presence confirms the product surface draws on a wider, more conventional easing toolkit than the about-page's five narrative curves, reserved for playful micro-interactions (e.g. like-button-style bounces) rather than brand storytelling.

### Duration scale

| Range | Use |
|---|---|
| `100–250ms` | Micro-feedback (hover background tint, link width shift) |
| `500–750ms` (`666ms` recurs exactly) | Reveal/intro animations |
| `1–3.1s` | Narrative beats, looping accents |
| Scroll-linked (e.g. `180vh` track) | Pinned hero scrollytelling — duration is a function of scroll distance, not a timer |

## Specifications

### The "rolling" affordance

A horizontal or vertical infinite marquee that appears only on hover, signaling "more to discover":
```css
@keyframes rolling {
  0%  { transform: translate(-100%); }
  50% { transform: translate(0); }
  100%{ transform: translate(125%); }
}
.trigger:hover .rolling-element {
  animation: rolling 2s infinite cubic-bezier(0,0,.1,1); /* Ease Glide */
}
```
Confirmed near-identically in: the about-page nav type-tester row, the character/type-picker, and the deep-dive editorial cards. Three independent components, one shared signature — treat this as the system's canonical "hover for more" tell, not a one-off effect to be redesigned per component.

### Clip-path reveals

Brand storytelling sections enter via masked wipes rather than fades:
```css
clip-path: inset(100% 0 0 0);              /* fully hidden, masked from the bottom */
transition: clip-path 1s cubic-bezier(.7,0,.3,1); /* Ease Confident */
/* on reveal: */
clip-path: inset(0 0 0 0);
```
Diagonal variants use `polygon()` corner cuts instead of `inset()` for the brand-logo sequence specifically, alternating top-left and bottom-right triangle masks in sync with a `steps(1,end)` timing function — a hard-cut slideshow rhythm layered underneath the smoother clip-path easing for the photo beneath it.

### Stories progress bar fill

```css
transform: scaleX(0);
transform-origin: left;
animation: fillProgressBar infinite;
animation-duration: inherit; /* set per-instance to match story display time */
animation-timing-function: linear;
```
The only major animation in the system that's explicitly linear rather than eased — appropriate, since it's communicating elapsed real time, not expressing personality.

### Image entrance "zoom-settle"

Hero photography scales from `1.3051` down to `1` over `2s` (`Ease Glide`-adjacent), landing precisely as the section becomes fully visible — a deliberate "settling into frame" feeling distinct from a simple fade.

## Usage rules

- **Do** match the easing curve to the kind of motion, per the table above — don't pick a curve for how it "feels" in isolation without checking what it's already conventionally used for in this system.
- **Do** use the rolling-chevron pattern verbatim (timing, transform values) when adding a new hover-to-reveal affordance, rather than designing a new one.
- **Don't** add ambient/looping motion to UI chrome that isn't already one of the established loops (rolling chevron, progress-bar fill, gradient rotation) — the system is deliberately sparse here.
- **Don't** fade in brand storytelling sections with opacity alone if a `clip-path` wipe is feasible — it's the established narrative-section entrance.

## Implementation notes — accessibility gap

`@media (prefers-reduced-motion: reduce)` **is** present and respected in the production app bundles (`31d5t_UoCWK.css`'s sibling bundles and `k-FEO04tvD4.css`). It is **absent from every about-page-specific file analyzed** (`0r_vd89O1o6.css`, `cyug0JeffsB.css`, `g8T_6-Yirbb.css`, `k9nOd3POwRJ.css`, `rrhy0Jd1eT4.css`) — meaning the about-page's heaviest motion (scroll-linked hero sequences, infinite rolling marquees, an auto-rotating gradient) has no reduced-motion override, while the core product app does respect the preference elsewhere. This is a genuine, citable inconsistency: **Don't** ship new about-page/marketing motion without a `prefers-reduced-motion` fallback, even though the existing about-page code doesn't yet have one to follow as precedent.
