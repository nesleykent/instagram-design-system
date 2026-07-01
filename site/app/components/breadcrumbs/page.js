import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./breadcrumbs.module.css";

export const metadata = {
  title: "Breadcrumbs",
  description: "Hierarchy wayfinding for nested content — the exact pattern this manual's own header uses on all 86 of its pages, documented as a reusable component.",
};

export default function BreadcrumbsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Breadcrumbs"
        description="A horizontal trail showing where the current page sits in a nested hierarchy. Not an Instagram product pattern — Instagram's app is mostly flat, tab-driven navigation — but essential for any dashboard, documentation site, or admin panel built on this system. This is the exact component powering this manual's own header, on every page."
      />

      <Section
        kicker="Live"
        title="This manual's own breadcrumb trail"
        description="Not a mockup — this is the real Breadcrumbs component, rendered the same way it renders at the top of every page on this site."
      >
        <ComponentShowcase align="start">
          <nav aria-label="Breadcrumb" className={styles.demoNav}>
            <ol className={styles.demoList}>
              <li className={styles.demoItem}>
                <a href="#">Manual</a>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.demoSep} aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li className={styles.demoItem}>
                <a href="#">Components</a>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.demoSep} aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li className={styles.demoItem}>
                <span aria-current="page">Breadcrumbs</span>
              </li>
            </ol>
          </nav>
        </ComponentShowcase>
      </Section>

      <Section kicker="Spec" title="Token reference">
        <div className={styles.specTable}>
          {[
            { label: "Font size", value: "13.5px, --ig-tertiary-text default colour" },
            { label: "Link colour", value: "--ig-secondary-text at rest, --ig-primary-text + underline on hover" },
            { label: "Current page", value: "--ig-primary-text, --fw-medium — no link, aria-current=\"page\"" },
            { label: "Separator", value: "16px chevron-right icon (--icon-size-sm), --ig-stroke colour" },
            { label: "Item gap", value: "var(--space-1) (4px) between label and separator" },
            { label: "Trail-to-content gap", value: "var(--space-5) (24px) margin below the trail, before the page heading" },
            { label: "Hover transition", value: "color var(--duration-micro) var(--ease-glide)" },
            { label: "Wrapping", value: "flex-wrap: wrap — long trails wrap to a second line rather than truncating or scrolling" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Breadcrumbs — CSS"
          code={`.breadcrumbs { margin-bottom: var(--space-5); }

.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  list-style: none;
  font-size: 13.5px;
  color: rgb(var(--ig-tertiary-text));
}

.item { display: flex; align-items: center; gap: var(--space-1); }

.item a {
  color: rgb(var(--ig-secondary-text));
  transition: color var(--duration-micro) var(--ease-glide);
}
.item a:hover {
  color: rgb(var(--ig-primary-text));
  text-decoration: underline;
}

.item span[aria-current="page"] {
  color: rgb(var(--ig-primary-text));
  font-weight: var(--fw-medium);
}

.sep { color: rgb(var(--ig-stroke)); }`}
        />
      </Section>

      <Section kicker="Anatomy" title="Three-part structure">
        <div className={styles.anatomyList}>
          {[
            { part: "Trail item (link)", detail: "Every crumb except the last is a real link to that level of the hierarchy — never a dead label." },
            { part: "Separator", detail: "A 16px chevron-right icon between every pair of items — never a slash, pipe, or other text character, for consistent icon-grammar alignment with the rest of the system." },
            { part: "Current page", detail: "The last item is never a link — plain text, aria-current=\"page\", slightly heavier weight to mark it as the destination." },
          ].map((a, i) => (
            <div key={a.part} className={styles.anatomyRow}>
              <span className={styles.anatomyIndex}>{i + 1}</span>
              <div>
                <p className={styles.anatomyPart}>{a.part}</p>
                <p className={styles.anatomyDetail}>{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Keep every non-final crumb a real, working link", body: "A breadcrumb trail is navigation, not a label — every ancestor level should be one click away." },
          { type: "do", title: "Use the 16px chevron consistently as the separator", body: "Matches the icon-size scale and reuses the same glyph as other directional affordances in the system (see RTL & Internationalization for why chevrons mirror in RTL)." },
          { type: "do", title: "Let long trails wrap, not truncate or scroll", body: "flex-wrap keeps every level visible and clickable — truncating a mid-trail item breaks navigation, and horizontal scroll is easy to miss." },
          { type: "do", title: "Mark the current page with aria-current, not just a style", body: "Screen reader users need the programmatic signal, not just the visual weight difference." },
          { type: "dont", title: "Don't make the current page (last crumb) a link", body: "It's already the page the user is on — a link to itself is either dead or confusing." },
          { type: "dont", title: "Don't use breadcrumbs as the only navigation", body: "They're a wayfinding aid for hierarchy, not a replacement for primary navigation (Sidebars, Tab Bars) — use both." },
          { type: "dont", title: "Don't show a single-item trail", body: "A breadcrumb with only the current page (no ancestors) adds noise without wayfinding value — omit the component entirely at the hierarchy's root level." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        Instagram&apos;s own product doesn&apos;t use breadcrumb navigation — it&apos;s a mostly flat,
        tab-driven mobile-first app where this pattern wouldn&apos;t apply. This page is{" "}
        <strong>extended</strong> content, but unlike most extended components in this manual, it
        isn&apos;t hypothetical: it&apos;s a direct extraction of this site&apos;s own working
        Breadcrumbs component (<code>site/components/Breadcrumbs.js</code>), which has rendered
        correctly at the top of every one of this manual&apos;s 86 pages throughout its build. The
        spec above is the real, shipped implementation, not a proposal.
      </ImplementationNote>
    </PageContainer>
  );
}
