import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import HudDemo from "./HudDemo";
import styles from "./hud-elements.module.css";

export const metadata = {
  title: "HUD Elements",
  description: "Health/XP bars, score badges, and reward feedback — the real-time overlay tokens Platform Guidance only recommended in prose, now implemented and live.",
};

export default function HudElementsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="HUD Elements"
        description="Health and progress bars, a score badge, and reward/damage feedback timing — for real-time, game-style overlays. Platform Guidance named these tokens as a recommendation; this page implements them for real, the same way CodeBlock's syntax highlighting moved from prose to working code."
      />

      <Section
        kicker="Live"
        title="Take damage, gain XP — real timing, not a mockup"
        description="Damage feedback uses --feedback-duration-fast (80ms, linear) — fast enough to read as immediate impact. XP and reward feedback use --feedback-duration-reward (600ms, --ease-settle) — slower, with spring-like settle, matching the system's existing reward-moment easing."
      >
        <ComponentShowcase align="center">
          <HudDemo />
        </ComponentShowcase>
      </Section>

      <Section kicker="Spec" title="Token reference">
        <div className={styles.specTable}>
          {[
            { label: "--hud-z-index", value: "110 — above --layer-10 (100), the highest confirmed layer, so HUD always sits above modals/sheets" },
            { label: "--hud-bg", value: "rgba(--ig-always-black, 0.55) — semi-transparent regardless of theme, since HUDs float over game content, not page chrome" },
            { label: "--hud-text", value: "rgb(--ig-always-white) — pairs with the fixed dark hud-bg" },
            { label: "--bar-height", value: "10px — thin enough to stay peripheral, not competing with game content" },
            { label: "--bar-bg", value: "rgba(--ig-always-white, 0.18) — a faint track visible on any background" },
            { label: "--bar-fill-health", value: "linear-gradient(90deg, --ig-stop-rose, --ig-stop-purple) — reuses two confirmed brand gradient stops" },
            { label: "--bar-fill-xp", value: "--ig-gradient-hero — the full confirmed brand gradient, reused directly" },
            { label: "--feedback-duration-fast", value: "80ms, linear — damage/hit feedback, faster than --duration-micro (150ms)" },
            { label: "--feedback-duration-reward", value: "600ms, --ease-settle — XP gain, level-up, and score feedback" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}><code>{s.label}</code></p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="HUD bar — CSS"
          code={`.hud-overlay {
  position: relative;
  z-index: var(--hud-z-index);
  background: var(--hud-bg);
  color: var(--hud-text);
}

.bar-track {
  height: var(--bar-height);
  border-radius: var(--radius-pill);
  background: var(--bar-bg);
  overflow: hidden;
}

.bar-fill--health {
  height: 100%;
  background: var(--bar-fill-health);
  transition: width var(--feedback-duration-fast) linear;
}

.bar-fill--xp {
  height: 100%;
  background: var(--bar-fill-xp);
  transition: width var(--feedback-duration-reward) var(--ease-settle);
}`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use linear timing for damage/hit feedback", body: "--feedback-duration-fast is linear, not eased — impact should read as instant, not soft." },
          { type: "do", title: "Use --ease-settle for rewards and level-ups", body: "The same spring-like settle curve used for Stories and reward moments elsewhere in this system — consistency across 'good news' moments." },
          { type: "do", title: "Keep the HUD semi-transparent over content", body: "--hud-bg is a fixed dark overlay regardless of theme — a HUD needs to stay legible over arbitrary game content, not adapt to light/dark mode." },
          { type: "do", title: "Reuse the brand gradient for XP, not health", body: "--ig-gradient-hero (the full 3-stop brand gradient) reads as 'progress/achievement' — health uses just two stops (rose→purple) to stay visually distinct from XP at a glance." },
          { type: "dont", title: "Don't animate damage feedback with easing", body: "An eased health-bar drain reads as soft/delayed — damage needs to feel immediate. Linear only." },
          { type: "dont", title: "Don't use --layer-10 or below for HUD elements", body: "--hud-z-index (110) is deliberately above every other confirmed layer — a HUD that can be covered by a modal is a real usability bug in any real-time UI." },
          { type: "dont", title: "Don't theme the HUD by light/dark mode", body: "--hud-bg and --hud-text are fixed, not theme-aware tokens — see Dark Mode for which tokens should and shouldn't adapt." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        No HUD, health bar, or real-time feedback surface exists in Instagram&apos;s product to evidence —
        Platform Guidance named this token set (--hud-*, --bar-*, --feedback-duration-*) as a
        recommendation for game/real-time use cases without ever implementing it. This page closes that
        gap: every token here is <strong>extended</strong>, derived from confirmed neighbouring values
        (the brand gradient, --layer-10, --duration-micro, --ease-settle) rather than observed directly,
        but the bars, badge, and timing above are real, working code — not a mockup.
      </ImplementationNote>
    </PageContainer>
  );
}
