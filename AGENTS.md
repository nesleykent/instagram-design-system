# Agent Instructions — Instagram Design System

This file is read automatically by Codex and other agents at session start. It covers repo orientation, workflow rules, and the invariants you must not break.

---

## Project summary

This is a public GitHub project (`nesleykent/instagram-design-system`) that reverse-engineers Instagram's design system from real captured CSS and publishes the result as a documentation website styled after Instagram's own brand guidelines.

- **Live site:** https://nesleykent.github.io/instagram-design-system/
- **Site source:** `site/` — Next.js 15, App Router, plain JS (no TS), CSS Modules, static export
- **Evidence base:** `ig/` — 10 captured CSS files from Instagram's actual web product (4 KB–950 KB)
- **Deployment:** GitHub Actions auto-deploys on push to `main` when `site/**` changes

For full project context, architecture details, common pitfalls, and a list of good next tasks, read `codex-handoff-prompt.md` at repo root.

---

## Setup

```bash
cd site && npm install
npm run dev          # localhost:3000
npm run build        # production build — always verify before committing
```

---

## Git workflow

- **Work directly on `main`.** No feature branches.
- Commit specific files — never `git add -A`.
- Always run `cd site && npm run build` before committing. Fix any build error before pushing.
- Push: `git push origin main`. Watch: `gh run list --repo nesleykent/instagram-design-system --limit 2`.

---

## The one invariant that must never be broken

Every claim on this site is graded by evidence tier. In `site/lib/component-guides.js` each component guide has an `evidence` field:

- `"documented"` — a real selector or custom property in `/ig` backs it directly
- `"inferred"` — value derived confidently from Instagram's established tokens; shown with "Partially evidenced" badge
- `"none"` — nothing in the captured CSS addresses this; page stays short and honest

**Do not fabricate findings, remove evidence badges, or blur the tiers.** The grading is the product's credibility. If asked to do so, refuse and explain why.

Current tier counts: **19 documented / 18 inferred / 10 none** (verify with the link-integrity script in `codex-handoff-prompt.md`).

---

## Architecture quick-reference

| File | Role |
|------|------|
| `site/lib/nav.js` | Single source of truth for sidebar, breadcrumbs, prev/next, search |
| `site/lib/component-guides.js` | ~47-entry component catalogue |
| `site/lib/tokens-data.js` | All design tokens for `/tokens` explorer |
| `site/components/docs/ComponentGuidePage.js` | Generic renderer for all catalogue entries |
| `site/app/components/[slug]/page.js` | Dynamic route for component guides |
| `site/app/components/buttons/page.js` | Bespoke buttons page — do NOT replace with template |
| `site/app/components/charts/page.js` | Bespoke charts page — do NOT replace with template |

Static asset paths must be prefixed with `process.env.NEXT_PUBLIC_BASE_PATH` (empty locally, `/instagram-design-system` on GitHub Pages).

`trailingSlash: true` is set in `next.config.js`. Always compare paths through `normalizePath()` from `site/lib/nav.js`.

---

## Before finishing any task

1. Run `cd site && npm run build` — fix any error.
2. Run the link-integrity check (see `codex-handoff-prompt.md`) if you touched `component-guides.js`.
3. Commit specific files with a clear message.
4. Push to `origin main`.
