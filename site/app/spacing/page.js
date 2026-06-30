import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./spacing.module.css";

export const metadata = { title: "Spacing" };

const SCALE = [
  { token: "--space-1",  px: 4,  label: "Micro",  use: "Icon breathing room, inline chip padding, sub-pixel separators" },
  { token: "--space-2",  px: 8,  label: "XS",     use: "Compact row gaps, tight label-to-icon spacing, badge insets" },
  { token: "--space-3",  px: 12, label: "SM",     use: "List item internal padding, inline form element spacing" },
  { token: "--space-4",  px: 16, label: "Base",   use: "The dominant padding unit — card insets, section inner padding, input horizontal padding" },
  { token: "--space-5",  px: 24, label: "MD",     use: "Component group gaps, card-to-card rhythm, modal padding" },
  { token: "--space-6",  px: 32, label: "LG",     use: "Section internal spacing, generous form field gaps" },
  { token: "--space-7",  px: 40, label: "XL",     use: "Search input height, action row height — coincides with control-height tokens" },
  { token: "--space-8",  px: 48, label: "2XL",    use: "Prominent section breaks, sheet interior breathing room" },
  { token: "--space-9",  px: 64, label: "3XL",    use: "Navigation bar height (matches --header-height), major landmark spacing" },
  { token: "--space-10", px: 96, label: "4XL",    use: "Brand-page section rhythm, full-bleed hero padding" },
];

const BASE_UNIT = 8;

export default function SpacingPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="An 8px base unit, with a 4px micro-step for tight UI work. Every gap, padding, and margin in the system resolves to one of ten named steps — never an arbitrary pixel value."
      />

      <Section
        kicker="Scale"
        title="Ten steps, one base unit"
        description="The about-page CSS shows padding and margin values clustering at 4, 8, 12, 16, 24, 32, 40, 48, 64, and 96px — confirming a standard 8px grid with a single 4px micro-step."
      >
        <div className={styles.scaleGrid}>
          {SCALE.map((step) => (
            <div key={step.token} className={styles.scaleRow}>
              <div className={styles.scaleBar}>
                <div
                  className={styles.scaleBarFill}
                  style={{ width: Math.min(step.px * 2.5, 300) }}
                  aria-label={`${step.px}px`}
                />
              </div>
              <div className={styles.scaleMeta}>
                <div className={styles.scaleHead}>
                  <code className={styles.scaleToken}>{step.token}</code>
                  <span className={styles.scaleLabel}>{step.label}</span>
                  <span className={styles.scalePx}>{step.px}px</span>
                </div>
                <p className={styles.scaleUse}>{step.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Rhythm"
        title="8px base unit, 4px micro-step"
        description="The base unit is 8px. Step 1 (4px) is the only exception — it exists for sub-8 adjustments that would otherwise require arbitrary values. Anything below 4px should be a border, not a spacing step."
      >
        <div className={styles.unitDemo}>
          <div className={styles.unitGrid}>
            {[4, 8, 16, 24, 32].map((size) => (
              <div key={size} className={styles.unitCell}>
                <div className={styles.unitBlock} style={{ width: size, height: size }} />
                <span className={styles.unitPx}>{size}px</span>
              </div>
            ))}
          </div>
          <p className={styles.unitNote}>
            Every step is an integer multiple of 4px. The 8px unit generates even steps (16, 24, 32…);
            odd multiples (12, 20, 28…) are the 4px micro-step in between, used only when the 8px
            increment is too coarse for the control in question.
          </p>
        </div>
      </Section>

      <Section kicker="Application" title="Which step for which context">
        <div className={styles.contextTable}>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Icon-only buttons, badge insets</span>
            <code className={styles.contextToken}>--space-1 / --space-2</code>
            <span className={styles.contextPx}>4–8px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Chip / tag padding</span>
            <code className={styles.contextToken}>--space-2 / --space-3</code>
            <span className={styles.contextPx}>8–12px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Input horizontal padding, card insets</span>
            <code className={styles.contextToken}>--space-4</code>
            <span className={styles.contextPx}>16px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Card-to-card gap, modal padding</span>
            <code className={styles.contextToken}>--space-5</code>
            <span className={styles.contextPx}>24px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Section inner breathing room</span>
            <code className={styles.contextToken}>--space-6 / --space-8</code>
            <span className={styles.contextPx}>32–48px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Navigation bar height</span>
            <code className={styles.contextToken}>--space-9 / --header-height</code>
            <span className={styles.contextPx}>64px</span>
          </div>
          <div className={styles.contextRow}>
            <span className={styles.contextContext}>Brand-page section rhythm</span>
            <code className={styles.contextToken}>--space-10</code>
            <span className={styles.contextPx}>96px</span>
          </div>
        </div>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Choose the nearest scale step rather than splitting the difference — 20px is --space-3 rounded up, not a new token.",
            "Use --space-4 (16px) as your default when in doubt — it is the dominant padding value in the evidenced system.",
            "Treat --space-9 (64px) as the navigation-height anchor across all platform surfaces — it matches --header-height.",
          ]}
          donts={[
            "Introduce arbitrary pixel values between steps — 14px, 18px, 22px are outside the scale.",
            "Use spacing steps for control heights — those are size tokens (--search-box-height: 40px) and are separate from layout spacing.",
            "Compose micro-gaps by multiplying --space-1 repeatedly — if you need 20px use --space-3 (12px) or --space-4 (16px) instead.",
          ]}
        />
      </Section>

      <ImplementationNote title="Spacing in CSS">
        <CodeBlock
          label="globals.css — spacing scale"
          code={`/* 8px base unit, 4px micro-step */
--space-1:  4px;   /* micro */
--space-2:  8px;   /* xs    */
--space-3:  12px;  /* sm    */
--space-4:  16px;  /* base  */
--space-5:  24px;  /* md    */
--space-6:  32px;  /* lg    */
--space-7:  40px;  /* xl    */
--space-8:  48px;  /* 2xl   */
--space-9:  64px;  /* 3xl   */
--space-10: 96px;  /* 4xl   */`}
        />
      </ImplementationNote>

      <ImplementationNote title="Evidence basis" tone="gap">
        Spacing values were extracted from the about-page CSS files in /ig using pattern grep for padding,
        margin, and gap declarations. The 8px rhythm with a 4px micro-step is a pattern, not a
        documented token system from the about-page source — no <code>--space-*</code> custom properties
        were found in the captured files. The production bundle uses inline spacing via Stylex atomic
        classes which encode specific values without semantic names. This scale is an evidence-derived
        regularisation of the observed values, not a verbatim token export.
      </ImplementationNote>
    </PageContainer>
  );
}
