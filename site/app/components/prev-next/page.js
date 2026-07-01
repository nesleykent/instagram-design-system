import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./prev-next.module.css";

export const metadata = {
  title: "Prev/Next Navigation",
  description: "Sequential page navigation with the rolling-chevron hover affordance — the exact footer component this manual uses on every page, documented as a reusable pattern.",
};

export default function PrevNextPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Prev/Next Navigation"
        description="A two-card footer pattern for stepping sequentially through an ordered set of content — documentation chapters, tutorial steps, paginated articles. Hover either card and watch the arrow: that's the same rolling-chevron affordance documented on the Motion page, reused verbatim rather than a new animation invented for this component."
      />

      <Section
        kicker="Live"
        title="Hover to see the rolling chevron"
        description="Real component, real animation — not a screenshot. The arrow fades out while a duplicate slides in from behind and off the far edge, on a 1.6s loop, using --ease-glide."
      >
        <ComponentShowcase align="start">
          <nav aria-label="Page navigation" className={styles.demoNav}>
            <a href="#" className={styles.demoCard} data-side="prev">
              <span className={styles.demoRollWrap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.demoIcon}>
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.demoText}>
                <span className={styles.demoLabel}>Previous</span>
                <span className={styles.demoTitle}>Breadcrumbs</span>
              </span>
            </a>
            <a href="#" className={styles.demoCard} data-side="next">
              <span className={styles.demoText}>
                <span className={styles.demoLabel}>Next</span>
                <span className={styles.demoTitle}>Design Tokens</span>
              </span>
              <span className={styles.demoRollWrap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.demoIcon}>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </nav>
        </ComponentShowcase>
      </Section>

      <Section kicker="Spec" title="Token reference">
        <div className={styles.specTable}>
          {[
            { label: "Card padding", value: "var(--space-4) var(--space-5) — 16px vertical, 24px horizontal" },
            { label: "Card gap (icon-to-text)", value: "var(--space-3) (12px)" },
            { label: "Grid gap (between cards)", value: "var(--space-4) (16px)" },
            { label: "Top offset", value: "var(--space-9) margin-top (64px) + var(--space-6) padding-top (32px) above a 1px separator" },
            { label: "Label", value: "12px, --fw-bold, uppercase, 0.06em tracking, --ig-tertiary-text" },
            { label: "Title", value: "15px, --fw-semibold, --ig-primary-text, single-line ellipsis truncation" },
            { label: "Hover state", value: "Border brightens to --ig-stroke, background gets --ig-hover-overlay tint" },
            { label: "Roll animation", value: "1.6s infinite, --ease-glide — translateX(-100%) to translateX(125%), fading in/out at the 10%/90% marks" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Rolling chevron — the reused Motion-page keyframe"
          code={`/* Same keyframe as globals.css and Motion's documented affordance —
   redeclared locally because CSS Modules scope keyframe references. */
@keyframes ig-rolling {
  0%   { transform: translateX(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateX(125%); opacity: 0; }
}

.card:hover .icon { opacity: 0; }
.card:hover .roll {
  opacity: 1;
  animation: ig-rolling 1.6s infinite var(--ease-glide);
}`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Reuse the exact rolling-chevron keyframe from Motion", body: "Don't invent a second hover-arrow animation — this system has one signature version, used everywhere an arrow needs hover motion." },
          { type: "do", title: "Truncate long titles with ellipsis, never wrap", body: "A two-line title breaks the card's fixed height and the grid alignment between the prev and next cards." },
          { type: "do", title: "Hide the whole component when there's nothing to link to", body: "At the start or end of a sequence, render nothing rather than a disabled-looking empty card — see the real component's `if (!prev && !next) return null`." },
          { type: "do", title: "Keep prev on the left, next on the right", body: "Matches reading direction — mirror this in RTL contexts per RTL & Internationalization, since the arrows are directional." },
          { type: "dont", title: "Don't use this for non-sequential jumps", body: "Prev/Next implies a linear order. For unordered related links, use a plain link list instead." },
          { type: "dont", title: "Don't add more than the label + title to each card", body: "No description text, no thumbnail — this is a lightweight sequential stepper, not a card component." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        Like Breadcrumbs, this is <strong>extended</strong> content extracted directly from this
        manual&apos;s own shipped code (<code>site/components/PrevNext.js</code>) rather than a
        hypothetical proposal — it has rendered correctly at the bottom of every page with a
        previous or next entry throughout this site&apos;s build. The rolling-chevron animation
        itself is fully evidence-backed: see the Motion page for where that affordance was first
        confirmed and documented.
      </ImplementationNote>
    </PageContainer>
  );
}
