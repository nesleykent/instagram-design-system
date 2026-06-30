import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import TokenGrid from "@/components/docs/TokenGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./platform.module.css";

export const metadata = { title: "Platform Guidance" };

const PLATFORMS = [
  {
    name: "Web App",
    readiness: 90,
    tag: "Ready",
    summary: "The system was built from web evidence — every token, radius, shadow, and motion value is directly applicable.",
    use: ["Use the full token set as-is.", "Spacing, elevation, typography, and colour require zero adaptation.", "Add breakpoint overrides for viewports outside Instagram's documented 375–1440px range."],
    skip: ["The fluid grid (--ig-grid-unit in vw) should be converted to a fixed-max-width grid for product UIs that don't need full-bleed storytelling."],
  },
  {
    name: "Native Mobile",
    readiness: 65,
    tag: "Adapt",
    summary: "Tokens map directly; interaction model and navigation grammar need platform-specific translation.",
    use: ["--space-* maps directly to native dp/pt units (8dp = --space-2, 16dp = --space-4).", "Colour tokens (--ig-primary-bg, --ig-primary-text etc.) map to native semantic colour roles.", "Motion: Ease Settle (~spring) maps to iOS UISpringTimingParameters; Ease Confident maps to Android Emphasized Decelerate.", "Border radii: --radius-lg (12pt) is native card radius; --radius-pill is native pill."],
    skip: ["Do not port the CSS flex/grid layout — use UIStackView (iOS) or ConstraintLayout (Android).", "Replace web focus rings with native accessibility focus indicators.", "Navigation: replace Sidebars and Tab Bars with UITabBarController / BottomNavigationView."],
  },
  {
    name: "Dashboard",
    readiness: 45,
    tag: "Extend",
    summary: "Instagram's system is content-first and spacious. Dashboards are data-first and dense. Several extensions are needed.",
    use: ["Typography: system-12 and system-14 become primary display sizes (Instagram uses them for captions — dashboards use them for body).", "--ig-secondary-text is the dominant label colour for dense data.", "Colour: --ig-success / --ig-error / --ig-primary-button are valid for KPI delta states.", "Charts: the Charts page documents the colour system and gradient tokens — apply directly."],
    skip: ["Do not use the brand gradient in data-encoding contexts — the five gradient stops are visual, not semantic.", "Avoid --space-9/10 (64–96px) for row heights — dashboard rows live at --space-6/7 (32–40px)."],
    extend: ["Add a --density-compact mode that halves --space-4 and --space-5 for table rows and sidebar nav.", "Add data-table-specific tokens: row-height, header-height, cell-padding, sticky-column-background.", "Monospace type: --font-mono is defined. Add a --system-mono-12 and --system-mono-14 scale entry."],
  },
  {
    name: "Developer Product",
    readiness: 35,
    tag: "Extend",
    summary: "API docs, SDKs, and developer tools share the visual aesthetic but need a code-presentation layer the base system doesn't include.",
    use: ["--font-mono is already defined — use it for all code samples, terminal output, and variable names.", "--ig-secondary-bg works as code block background in light mode.", "--ig-error / --ig-success / --ig-primary-button map directly to terminal stderr / stdout / interactive prompt colours."],
    skip: ["Do not use Instagram Sans for code samples — monospace only.", "Do not use the brand gradient in syntax highlighting — reserve it for UI chrome only."],
    extend: ["Add syntax-highlighting tokens: --code-keyword, --code-string, --code-comment, --code-number, --code-type derived from the existing colour palette.", "Add terminal-prompt colours: --terminal-bg (near-black from dark mode --ig-primary-bg), --terminal-prompt (--ig-stop-magenta), --terminal-output (--ig-primary-text).", "Add API status colour tokens: --status-2xx (--ig-success), --status-4xx (--ig-error), --status-5xx (deep red), --status-3xx (--ig-stop-orange)."],
  },
  {
    name: "Game / Real-time UI",
    readiness: 20,
    tag: "Build",
    summary: "The Instagram system provides the aesthetic vocabulary — gradient, radius, type weight, motion curves — but real-time interactive surfaces need new composition patterns.",
    use: ["Brand gradient: --ig-gradient-hero works for score overlays, achievement banners, and progress fills.", "Motion: --ease-confident (0.7,0,0.3,1) maps to game UI snap/settle; --ease-settle (spring-like) maps to reward animations.", "Colour: --ig-stop-rose / --ig-stop-purple are valid for health/energy bar gradients. --ig-success for positive feedback, --ig-error for damage.", "Shape: --radius-pill is canonical for HUD progress bars and level badges."],
    skip: ["Do not use Instagram's navigation components (Sidebars, Tab Bars) — HUDs use overlay layers, not navigational grids."],
    extend: ["Add HUD-specific tokens: --hud-z-index (above --layer-10), --hud-bg (semi-transparent dark), --hud-text (--ig-always-white).", "Add real-time feedback tokens: --feedback-duration (faster than --duration-micro, ~80ms), --feedback-ease (linear for damage, --ease-settle for rewards).", "Add progress-fill tokens: --bar-bg, --bar-fill-gradient, --bar-height, derived from the existing gradient system.", "Add overlay pattern: a radial vignette behind HUD elements using --ig-shadow-rgb at high alpha."],
  },
];

function ReadinessBar({ value, tag }) {
  const tagColors = {
    Ready: "var(--ig-stop-magenta)",
    Adapt: "var(--ig-stop-orange)",
    Extend: "var(--ig-stop-yellow)",
    Build: "rgb(var(--ig-secondary-text))",
  };
  return (
    <div className={styles.readiness}>
      <div className={styles.readinessBar}>
        <div
          className={styles.readinessFill}
          style={{ width: `${value}%`, background: tagColors[tag] }}
        />
      </div>
      <span className={styles.readinessTag} style={{ color: tagColors[tag] }}>{tag} · {value}%</span>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Resources"
        title="Platform Guidance"
        description="How to apply this system beyond instagram.com — to native mobile, dashboards, developer products, and games. Every platform shares the same token base; the extensions are additive, never breaking."
      />

      <Section
        kicker="Principle"
        title="One token base, five deployment targets"
        description="The --ig-* semantic tokens, spacing scale, radius scale, motion curves, and typography system are the shared foundation. Platform guidance tells you what to use as-is, what to adapt, and what new tokens to add for each context."
      >
        <div className={styles.platformGrid}>
          {PLATFORMS.map((p) => (
            <div key={p.name} className={styles.platformCard}>
              <div className={styles.platformCardHeader}>
                <h3 className={styles.platformName}>{p.name}</h3>
                <ReadinessBar value={p.readiness} tag={p.tag} />
              </div>
              <p className={styles.platformSummary}>{p.summary}</p>
              <div className={styles.platformSections}>
                <div className={styles.platformSection}>
                  <p className={styles.platformSectionLabel}>Use as-is</p>
                  <ul className={styles.platformList}>
                    {p.use.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                {p.skip?.length > 0 && (
                  <div className={styles.platformSection}>
                    <p className={styles.platformSectionLabel + " " + styles.skip}>Skip or replace</p>
                    <ul className={styles.platformList + " " + styles.skipList}>
                      {p.skip.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {p.extend?.length > 0 && (
                  <div className={styles.platformSection}>
                    <p className={styles.platformSectionLabel + " " + styles.extend}>Extend with</p>
                    <ul className={styles.platformList + " " + styles.extendList}>
                      {p.extend.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Token portability" title="How tokens translate across runtimes">
        <CodeBlock
          label="CSS → iOS (Swift) — token mapping example"
          code={`// CSS token            iOS equivalent
// --space-4: 16px  →  spacing: 16 (CGFloat)
// --radius-lg       →  cornerRadius: 12
// --ig-primary-bg   →  UIColor(dynamicProvider: ...)
// --ease-settle     →  UISpringTimingParameters(mass:1,stiffness:300,damping:28)
// --duration-micro  →  UIViewPropertyAnimator(duration: 0.15, ...)`}
        />
        <CodeBlock
          label="CSS → Android (Kotlin) — token mapping example"
          code={`// CSS token              Android equivalent
// --space-4: 16px    →  16.dp
// --radius-lg         →  ShapeDefaults.Medium (12.dp corners)
// --ig-primary-bg     →  MaterialTheme.colorScheme.background
// --ease-confident    →  EmphasizedDecelerateEasing
// --duration-reveal   →  666  // milliseconds`}
        />
      </Section>

      <Section kicker="Density modes" title="Adapting spacing for dense UIs">
        <p className={styles.note}>
          Dashboards and developer products need a compact mode. The base system is comfortable at{" "}
          <code>--space-4</code> (16px) body padding; dense UIs drop to <code>--space-3</code> (12px)
          or even <code>--space-2</code> (8px) for table rows. The cleanest approach is a single
          CSS class that overrides the spacing tokens:
        </p>
        <CodeBlock
          label="Compact density override"
          code={`[data-density="compact"] {
  /* Row and list spacing tightened */
  --space-4: 12px;   /* was 16px */
  --space-5: 16px;   /* was 24px */
  --space-6: 24px;   /* was 32px */

  /* Typography tightened one step down */
  --system-14-font-size: 12px;
  --system-16-font-size: 14px;
}

/* Usage: <div data-density="compact"> wraps a table or sidebar nav */`}
        />
      </Section>

      <ImplementationNote title="Extension philosophy">
        Every addition suggested on this page is <strong>additive</strong> — it defines new tokens
        that layer over the base system without modifying or overriding confirmed Instagram tokens.
        The base token set (<code>--ig-*</code>, <code>--space-*</code>, <code>--shadow-*</code>)
        is the fixed foundation. Platform extensions live in a separate scope ({" "}
        <code>--hud-*</code>, <code>--code-*</code>, <code>--terminal-*</code>) so a future
        update to the base system never collides with platform-specific additions.
      </ImplementationNote>
    </PageContainer>
  );
}
