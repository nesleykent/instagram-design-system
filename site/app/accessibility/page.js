import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ContrastChecker from "@/components/docs/ContrastChecker";
import TokenGrid from "@/components/docs/TokenGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./accessibility.module.css";

export const metadata = {
  title: "Accessibility",
  description: "Accessibility shows up as infrastructure in the product, not an add-on layer.",
};

const WINS = [
  { title: "Open Dyslexic font option", detail: "A literal Open Dyslexic family reference exists in the production bundle — a genuine display-setting toggle, not a curiosity." },
  { title: "forced-colors & prefers-contrast", detail: "Windows High Contrast Mode overrides and OS-level 'increase contrast' are both respected in production." },
  { title: "Screen-reader-only utility", detail: "A textbook visually-hidden-but-AT-accessible class confirms hidden label text ships for at least some icon-only controls." },
  { title: ":focus-visible support", detail: "Keyboard focus rings show without appearing on every mouse click — present as foundational rules, not richly customized per component." },
  { title: "Antialiasing on light weights", detail: "-webkit-font-smoothing: antialiased is applied wherever a Light/200–300 weight renders on a flat background." },
  { title: "Robust cursor fallback", detail: "Custom cursor SVGs always pair with the default keyword — if the asset fails to load, the cursor still works." },
];

export default function AccessibilityPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        description="Accessibility shows up as infrastructure in the product, not an add-on layer. This page documents the strongest product patterns and the specific source-backed risks to preserve."
      />

      <Section
        kicker="Contrast"
        title="Check any pair against WCAG"
        description="Try the presets, or enter your own. Ratios use the real WCAG relative-luminance formula, computed live."
      >
        <ContrastChecker />
      </Section>

      <Section kicker="What the system gets right" title="Citable evidence, not a marketing scorecard">
        <TokenGrid min="240px">
          {WINS.map((w) => (
            <div key={w.title} className={styles.winCard}>
              <p className={styles.winTitle}>{w.title}</p>
              <p className={styles.winDetail}>{w.detail}</p>
            </div>
          ))}
        </TokenGrid>
      </Section>

      <Section kicker="Risk areas" title="Specific, citable, not editorialized">
        <div className={styles.gaps}>
          <ImplementationNote title="Reduced motion — about-page only" tone="gap">
            <code>@media (prefers-reduced-motion: reduce)</code> is present and respected in the production app, but
            absent from every about-page file analyzed — visitors who&rsquo;ve set their OS to reduce motion still
            receive the scroll-linked hero animation, infinite rolling marquees, and auto-rotating gradient at full
            intensity. The most actionable risk this analysis surfaced. This site does not repeat it — see Motion.
          </ImplementationNote>
          <ImplementationNote title="outline: none without a confirmed replacement" tone="gap">
            One rule disables the default focus outline with no paired <code>:focus-visible</code> replacement in
            the same file. <code>:focus-visible</code> rules do exist elsewhere in the codebase, so this may be
            safely superseded — but in isolation it&rsquo;s a standing risk pattern, flagged rather than assumed
            safe.
          </ImplementationNote>
          <ImplementationNote title="Ambiguous-contrast token pairing" tone="gap">
            <code>--ig-link</code> was observed with values that don&rsquo;t cleanly map to a confident light/dark
            text-contrast pairing. Don&rsquo;t assume either value meets contrast requirements against an unknown
            background — verify before reusing. See Colour.
          </ImplementationNote>
        </div>
      </Section>

      <Section kicker="This site" title="Practicing what the manual preaches">
        <CodeBlock
          label="app/globals.css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
        />
        <p className={styles.note}>
          Plus a real skip-link, a visible focus ring on every interactive element (<code>:focus-visible</code>,
          magenta, 2px), and semantic heading order on every page — check the source.
        </p>
      </Section>
    </PageContainer>
  );
}
