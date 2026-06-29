# Instagram Brand Identity Manual — the website

**Live: [nesleykent.github.io/instagram-design-system](https://nesleykent.github.io/instagram-design-system/)**

A Next.js (App Router) documentation site that presents the reverse-engineered Instagram brand identity manual (see the repo root [`manual/`](../manual/) and [`tokens/`](../tokens/)) as a real, navigable, interactive product — in the spirit of Apple's Human Interface Guidelines or Instagram's own brand site.

## Stack

Plain JavaScript (no TypeScript build step), Next.js App Router, CSS Modules — no UI framework or component library dependency. Colour, type, spacing, radius, and motion tokens are authored as real CSS custom properties in [`app/globals.css`](app/globals.css), translated directly from `../tokens/*.css`.

No proprietary Instagram font is bundled or loaded — see `/typography` on the site for why. The interface renders in the visitor's system UI font stack, which is the same fallback tier Instagram's own CSS specifies after its custom fonts.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
npm run start    # serve a non-static production build (not used for deploy)
```

`next.config.js` builds with `output: "export"` — the result is fully static and can be hosted from any static file server. `DEPLOY_TARGET=gh-pages npm run build` sets the `/instagram-design-system` basePath/assetPrefix this repo's GitHub Pages deployment needs; a plain `npm run build` (no env var) builds for root-path hosting. Every push to `main` touching `site/` redeploys automatically via `.github/workflows/deploy-site.yml` at the repo root.

## Project structure

```
app/
  layout.js                 Root HTML shell, theme script, metadata
  globals.css                All design tokens + base styles
  page.js                     Overview (home)
  typography/page.js
  color/page.js
  layout-grid/page.js
  shape/page.js
  motion/page.js
  imagery/page.js
  accessibility/page.js
  components/
    page.js                   Components index
    buttons/page.js
    links-navigation/page.js
    cards/page.js
    modals/page.js
    messaging/page.js
    stories-progress/page.js
    dropdowns/page.js
    forms/page.js
  tokens/page.js               Visual, searchable token explorer
  methodology/page.js

components/                   Site chrome: Header, Sidebar, SearchPalette, Breadcrumbs, PrevNext, Footer, Icons
components/docs/               Reusable documentation building blocks (see below)

lib/
  nav.js                       Single source of truth for sidebar groups, breadcrumbs, prev/next, and search
  search.js                     Client-side search scoring over lib/nav.js
```

## The component library (`components/docs/`)

Every page is composed from a small set of reusable, content-driven components rather than bespoke per-page markup:

| Component | Purpose |
|---|---|
| `PageHeader`, `Section`, `PageContainer` | Consistent page scaffold: breadcrumbs, heading, anchored sections, prev/next |
| `ColorSwatch`, `GradientStrip`, `TokenGrid` | Visual token rendering with copy-to-clipboard |
| `TypeSpecimen`, `TypeScaleRow`, `TrackingDemo`, `FluidTypeDemo` | Live, editable type rendering |
| `GridUnitVisualizer`, `BreakpointTimeline`, `SectionRhythmDemo` | Layout system diagrams |
| `RadiusScale`, `ShapeGrammar`, `AspectRatioGallery` | Shape primitives |
| `EasingPlayground`, `DurationScaleBars`, `RollingChevronDemo`, `ClipPathRevealDemo` | Motion playgrounds |
| `ComponentShowcase`, `CodeBlock`, `DoDontGrid`, `ImplementationNote` | Component documentation blocks |
| `ContrastChecker`, `MosaicGridDemo`, `ScrimOverlayDemo`, `ChatBubbleDemo`, `StoriesProgressDemo` | Page-specific interactive examples |

## Adding a new page

The site is intentionally config-driven so it can grow without restructuring:

1. Add a route under `app/` (e.g. `app/components/tooltips/page.js`).
2. Add one entry to the matching group in `lib/nav.js` (`title`, `href`, `description`, `keywords`). Sidebar, breadcrumbs, prev/next, and search all update automatically — nothing else to wire up.
3. Compose the page from `components/docs/*` where possible; add a new doc component only when an existing one genuinely doesn't fit.
