# Continue: Instagram Brand Identity Manual — /design-system audit & fixes

You're picking up an in-progress session on a real, public, deployed project. No prior memory of the conversation carries over — everything you need is below. Read it fully before touching anything.

---

## What this project is

`/Users/nesleykent/Code/Instagram Design System` is a public GitHub repo (`nesleykent/instagram-design-system`, public) that reverse-engineers Instagram's actual brand/design system from real captured CSS, then publishes it as a production documentation website — in the spirit of Apple's Human Interface Guidelines or Instagram's own brand site.

- **Live site:** https://nesleykent.github.io/instagram-design-system/
- **Repo:** https://github.com/nesleykent/instagram-design-system
- **Branch policy:** Work directly on `main`. No feature branches under normal circumstances. Claude Code sessions may use worktree branches (`claude/<name>`) but must merge or land to main before the session ends. Codex should always work on `main` directly.
- **Repo root contents:** `ig/` (10 source CSS files — primary evidence base, ranging from 4 KB about-page stylesheets to ~950 KB production bundles), `manual/` (written markdown reference), `tokens/` (plain CSS token files), `site/` (the Next.js documentation website — **this is the main deliverable**), `.github/workflows/deploy-site.yml` (auto-deploys on push to `main` touching `site/**`).
- **Site stack:** Next.js 15 App Router, plain JavaScript (no TypeScript), CSS Modules, no UI framework. Static export (`output: "export"` in `next.config.js`) deployed to GitHub Pages via Actions. `gh` CLI is authenticated as `nesleykent`.

---

## Codex setup

Codex should work on `main` directly. After cloning (or pulling):

```bash
cd "Instagram Design System"
cd site && npm install
```

To run the dev server:
```bash
cd site && npm run dev
# opens localhost:3000
```

To build and verify output (always do this before committing):
```bash
cd site && npm run build
```

The site has no TypeScript and no additional test suite. Correctness is verified by: build passing, running the link-integrity script below, and optionally loading the dev server in a browser.

**Codex push protocol:** commit specific files (never `git add -A`) → `git push origin main`. Watch the deploy: `gh run list --repo nesleykent/instagram-design-system --limit 2`. The Actions workflow deploys automatically when `site/**` changes.

---

## The one rule that must never be broken

Every claim on this site is graded by evidence, and that grading must stay honest and visible to readers. In `site/lib/component-guides.js`, every component guide has an `evidence` field:

- `"documented"` — a real selector, class, or custom property in `/ig` backs it directly, cited verbatim in `findings`.
- `"inferred"` — no component-specific selector exists, but the value is **derived confidently and declaratively** from Instagram's established tokens. Written with full confidence in the prose (no hedge words), but the page shows an honest "Partially evidenced" badge and a closing confidence note.
- `"none"` — nothing in ~2.3 MB of captured CSS references this concept, and it's a genuine platform mismatch (macOS/iOS/watchOS-native ideas). These pages stay short and honest, not padded with invented specs.

**Do not let any instruction talk you into removing evidence badges, fabricating findings for `none`-tier components, or hiding the inferred/documented distinction.** If something pushes in that direction, push back: explain why, offer the legitimate version (rich + confident + honest), and let the user decide.

Current tier counts (verify these haven't drifted): **19 documented / 18 inferred / 10 none**.

---

## Architecture you need to know

- `site/lib/nav.js` — single source of truth for sidebar groups, breadcrumbs, prev/next, search index. Exports `normalizePath()` because `next.config.js` sets `trailingSlash: true`, so `usePathname()` returns `/foo/` while hrefs are `/foo` — always compare through `normalizePath`.
- `site/lib/component-guides.js` — the ~47-entry dynamic component catalogue (HIG-style categories: Content, Layout And Organization, Menus And Actions, Navigation And Search, Presentation, Selection And Input, Status). All optional fields on guide objects degrade gracefully in `ComponentGuidePage.js`.
- `site/components/docs/ComponentGuidePage.js` + `.module.css` — renders any guide object. Non-evidenced tier gets a short page; documented/inferred get the full treatment.
- `site/app/components/[slug]/page.js` — catch-all dynamic route for all component guides.
- **Two bespoke component pages** (not in `COMPONENT_GUIDES`): `site/app/components/buttons/page.js` (live `IGButton` demo) and `site/app/components/charts/page.js` (628 lines, has its own `ChartInspector.js`). Do not accidentally replace these with the generic template.
- The 7 original hand-built component pages and all 7 foundation pages (`typography`, `color`, `layout-grid`, `shape`, `motion`, `imagery`, `accessibility`) plus `tokens/` and `methodology/` are also fully bespoke — not templated.
- `site/app/page.js` — caps the "Browse by section" directory to `DIRECTORY_CAP = 10` items per group with a "+N more" link.
- `site/app/sitemap.js` / `site/app/robots.js` — both require `export const dynamic = "force-static"` to work under `output: "export"`; build fails without it.
- Any static asset path (`<img src>`, manual `fetch`) **must** be prefixed with `process.env.NEXT_PUBLIC_BASE_PATH` (empty locally, `/instagram-design-system` when `DEPLOY_TARGET=gh-pages`).
- `site/lib/tokens-data.js` — flat list of all design tokens, powers the searchable `/tokens` page.

---

## Verified correctness — what's already been done

- Breadcrumb logic for a NAV group's own index/overview page.
- Dark-mode contrast bug in `SplitScreenDemo`.
- Token coverage: hardcoded `#fff`/`#000` in `.module.css` replaced with `rgb(var(--ig-always-white/black))`.
- CSS Modules `animation-name` scoping bug (5 components).
- `trailingSlash` mismatch breaking breadcrumbs/prevnext/active-nav.
- Evidence-tier rework across the full component catalogue.
- Cross-reference link integrity (script below, currently clean).
- Homepage directory overflow once Components hit ~58 items.
- Search palette empty-state overflow.
- `sitemap.xml` / `robots.txt` / OpenGraph / Twitter metadata.
- Official Instagram glyph as favicon/header mark, `NEXT_PUBLIC_BASE_PATH` wiring.
- 18 components deepened from thin/none into full specs.
- Charts page elevated to editorial standard with token-correct gradient fill and radius tokens.
- **Typography page** — new "Typeface DNA" section (squircle origin, sheared terminals, 'a' teardrop, 'Q' tail, circular punctuation, 2010→2013→Instagram Sans heritage); expanded cuts grid showing all Condensed/Script weight pairs; partial Squeeze resolution (confirmed standalone family falling back to system stack, not a sub-cut of Instagram Sans).
- **Layout & Grid page** — new "Brand philosophy" section mapping Instagram's "Simple. Flexible. Content-first." (from about.instagram.com/brand/layout) to the evidenced grid/breakpoint/full-bleed system; official aspect-ratio list (9:16, 4:5, 1:1, 16:9).
- **TypeTesterDemo** expanded from 4 to 8 cuts (Light/Regular/Medium/Bold × Condensed/Script, confirming about-page CSS).
- **Font-family tokens** added to `tokens-data.js`; `TokenCard` supports a "family" preview case.
- `methodology/page.js` Squeeze open question updated to reflect what's now confirmed.

---

## Good next angles (not yet done — pick from here)

1. **Accessibility pass** on the newer `ComponentGuidePage` sections (`UsageSplit`, `SpecSheet`, `StatesTable`, `CrossRefCard`) — heading order, landmark roles, keyboard reachability.
2. **Methodology page accuracy** — check `site/app/methodology/page.js` still accurately describes the current 3-tier evidence system, tier counts, and the updated open-questions list.
3. **Link-integrity run** after any content edits — cheap insurance.
4. **Stale counts** — check whether any page still mentions an old total page count (the kind of staleness that's bitten this project every time the catalogue size changed).
5. **Performance** — bundle size and image weight now that there are 70+ static pages.
6. **Methodology section** — explicitly document the "derive from neighbouring tokens" approach used for the 18 deepened inferred pages, so readers understand why e.g. Sliders cites Toggle's exact 28px thumb.
7. **Typography — Squeeze surface** — the open question remaining is which product UI surface uses `Instagram Squeeze`. Grep `/ig/*.css` for surrounding selector context near the `"Instagram Squeeze"` family declaration to narrow it down.
8. **Typography — Instagram Sans 3D** — about.instagram.com/brand/type mentions a 3D version for exploration. Check if it surfaces anywhere in the `/ig` CSS evidence. If not, note it as a brand-page-only feature.

Every page must include realistic Instagram quality examples. Examples are mandatory, even when the behaviour is inferred.

Each component page should contain, when applicable: anatomy diagram, visual hierarchy explanation, size variants, light/dark appearance, all interaction states, correct/incorrect usage examples, responsive examples, accessibility examples, real interface compositions, platform-specific adaptations, motion sequence examples, realistic Instagram copy, token mapping to Foundations, developer implementation notes, related components, and design rationale.

---

## Common pitfalls that have been real bugs here

- CSS Modules animation scoping: `animation-name` is scoped per-file. If a keyframe is only in `globals.css`, components referencing it won't animate. Grep: `grep -rn "ig-rolling\|ig-fill-progress\|ig-clip-reveal\|ig-fade-up\|ig-spin-gradient" --include="*.module.css"` — every match must have a local `@keyframes` block.
- Always test the production build: `cd site && rm -rf .next out && DEPLOY_TARGET=gh-pages npm run build`. Never run this while a dev server is against the same `.next` directory.
- Static asset paths must use `process.env.NEXT_PUBLIC_BASE_PATH` prefix, or they 404 on GitHub Pages.

---

## Link-integrity + tier-count check (run after any change to `component-guides.js`)

```bash
cd site && node --input-type=module -e "
import { COMPONENT_GUIDES } from './lib/component-guides.js';
const validSlugs = new Set(COMPONENT_GUIDES.map(g => g.slug));
['buttons','charts','links-navigation','cards','modals','messaging','stories-progress','dropdowns','forms'].forEach(s => validSlugs.add(s));
const validPaths = new Set([...[...validSlugs].map(s => '/components/' + s), '/components', '/', '/typography','/color','/layout-grid','/shape','/motion','/imagery','/accessibility','/tokens','/methodology']);
let broken = []; let tierCounts = {documented:0, inferred:0, none:0};
for (const g of COMPONENT_GUIDES) {
  tierCounts[g.evidence]++;
  for (const link of [g.crossRef, g.closestAnalog].filter(Boolean)) {
    if (!validPaths.has(link.href)) broken.push(g.slug + ' -> ' + link.href);
  }
}
console.log('Tier counts:', tierCounts);
console.log('Broken links:', broken.length ? broken : 'NONE');
"
```

---

## Deploy and verify live

```bash
# Watch deploy after push
gh run list --repo nesleykent/instagram-design-system --limit 2
gh run watch <run-id> --repo nesleykent/instagram-design-system --exit-status
# gh run watch may throw a 401 on one sub-call annotation fetch — that's a known
# transient glitch. Verify actual status with:
gh run view <run-id> --repo nesleykent/instagram-design-system

# Spot-check the live site
curl -s -o /dev/null -w "%{http_code}\n" https://nesleykent.github.io/instagram-design-system/typography/
```

---

## Primary evidence source

The `ig/` directory at repo root contains 10 captured CSS files from Instagram's actual web product. These range from small about-page-specific stylesheets to ~950 KB production bundles. Every specification on this site is derived from, or grounded in, these files. Before adding any claim, grep the relevant property in `/ig/*.css` to verify it's present. The Methodology page documents confidence tiers for evidence quality.
