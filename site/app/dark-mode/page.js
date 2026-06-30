import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./dark-mode.module.css";

export const metadata = { title: "Dark Mode" };

const TOKEN_PAIRS = [
  { token: "--ig-primary-bg",     light: "255, 255, 255", dark: "12, 16, 20",  note: "Near-black, not pure #000 — pure black against bright media creates excessive contrast and halation" },
  { token: "--ig-secondary-bg",   light: "243, 245, 247", dark: "37, 41, 46",  note: "One step up from primary-bg — used for input fills, chips, secondary surfaces" },
  { token: "--ig-elevated-bg",    light: "255, 255, 255", dark: "33, 35, 40",  note: "Cards, modals, sheets — barely lighter than primary-bg since shadows do less work in dark mode" },
  { token: "--ig-primary-text",   light: "0, 0, 0",       dark: "245, 245, 245", note: "Off-white, not pure #fff — pure white text at high contrast can shimmer/vibrate against dark backgrounds" },
  { token: "--ig-secondary-text", light: "115, 115, 115", dark: "168, 168, 168", note: "Lighter grey than light mode's secondary — needs more luminance to stay legible on dark backgrounds" },
  { token: "--ig-separator",      light: "219, 219, 219", dark: "38, 38, 38",  note: "Inverts from light-grey-on-white to dark-grey-on-black — same relative contrast role" },
  { token: "--ig-stroke",         light: "219, 219, 219", dark: "85, 85, 85",  note: "Brighter than separator — used where a border needs to be more visible (input outlines)" },
  { token: "--ig-hover-overlay-alpha", light: "0.05",     dark: "0.1",         note: "Doubled in dark mode — a 5% white overlay is nearly invisible on dark surfaces, so dark mode compensates with higher alpha" },
];

const UNCHANGED_TOKENS = [
  { token: "--ig-stop-rose / magenta / purple / orange / yellow", note: "The five brand gradient stops are identical in both modes — the gradient is a fixed brand asset, not a themed surface." },
  { token: "--ig-error, --ig-success, --ig-live-badge", note: "Semantic status colours stay fixed — a red error needs to read as urgent in both themes without renegotiating meaning." },
  { token: "--ig-always-white / --ig-always-black", note: "Named explicitly as theme-independent — used for text/icons over photos and gradients where the surface itself doesn't change with theme." },
  { token: "Photography & user media", note: "Photos and videos are never recoloured or filtered for dark mode. Only UI chrome adapts." },
];

export default function DarkModePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Dark Mode"
        description="Dark mode is not an inverted palette — every background, text, and border token was independently tuned for legibility and comfort at low luminance. The brand gradient, semantic status colours, and all photography stay fixed across both themes."
      />

      <Section
        kicker="Principles"
        title="Why dark mode isn't just inversion"
        description="A naive implementation swaps white for black and black for white. Instagram's actual token values show several deliberate departures from a pure inversion."
      >
        <div className={styles.principleGrid}>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Near-black, not pure black</p>
            <p className={styles.principleBody}>
              <code className={styles.inlineCode}>--ig-primary-bg</code> is{" "}
              <code className={styles.inlineCode}>rgb(12,16,20)</code> in dark mode — not{" "}
              <code className={styles.inlineCode}>#000</code>. Pure black against bright photo and
              video content creates harsh contrast edges; a near-black background eases that transition.
            </p>
          </div>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Off-white, not pure white text</p>
            <p className={styles.principleBody}>
              Primary text is <code className={styles.inlineCode}>rgb(245,245,245)</code>, not{" "}
              <code className={styles.inlineCode}>#fff</code>. Pure white text at high contrast
              against a dark background can visually shimmer or feel harsher than necessary for
              comfortable reading.
            </p>
          </div>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Compressed surface hierarchy</p>
            <p className={styles.principleBody}>
              In light mode, primary-bg → elevated-bg moves from white to near-white
              (255 → 243). In dark mode it barely moves (12 → 33) because shadows carry less of
              the elevation signal at low luminance — see Elevation for how shadow opacity is
              tuned per theme.
            </p>
          </div>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Brand stays constant</p>
            <p className={styles.principleBody}>
              The five-stop hero gradient, error/success colours, and all photography are
              identical in both modes. Only neutral UI chrome — backgrounds, text, borders —
              is themed.
            </p>
          </div>
        </div>
      </Section>

      <Section
        kicker="Token pairs"
        title="Light → dark token values"
        description="Every themed token is defined twice: once under :root (light, default) and once under [data-theme=&quot;dark&quot;]. The pairing below shows the confirmed values and why each dark variant isn't a simple inversion."
      >
        <div className={styles.tokenTable}>
          <div className={[styles.tokenRow, styles.tokenHeader].join(" ")}>
            <span>Token</span>
            <span>Light</span>
            <span>Dark</span>
            <span>Why</span>
          </div>
          {TOKEN_PAIRS.map((t) => (
            <div key={t.token} className={styles.tokenRow}>
              <code className={styles.tokenName}>{t.token}</code>
              <span className={styles.tokenSwatchCell}>
                <span className={styles.swatch} style={{ background: `rgb(${t.light})` }} />
                <code className={styles.tokenValue}>{t.light}</code>
              </span>
              <span className={styles.tokenSwatchCell}>
                <span className={[styles.swatch, styles.swatchDark].join(" ")} style={{ background: `rgb(${t.dark})` }} />
                <code className={styles.tokenValue}>{t.dark}</code>
              </span>
              <span className={styles.tokenNote}>{t.note}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="What never changes"
        title="Theme-independent tokens"
        description="Some tokens are deliberately excluded from theming. These represent the system's fixed brand identity and semantic meanings that must stay legible and consistent regardless of theme."
      >
        <div className={styles.unchangedList}>
          {UNCHANGED_TOKENS.map((u) => (
            <div key={u.token} className={styles.unchangedRow}>
              <p className={styles.unchangedToken}>{u.token}</p>
              <p className={styles.unchangedNote}>{u.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Implementation"
        title="The data-theme attribute pattern"
        description="Theme state lives as a data attribute on the root html element, toggled by a small client component and persisted to localStorage. Every themed token resolves through this single attribute — no component needs its own theme-awareness."
      >
        <CodeBlock
          label="globals.css — token definition pattern"
          code={`:root {
  --ig-primary-bg: 255, 255, 255;
  --ig-primary-text: 0, 0, 0;
  /* ...every themed token defined once, light values */
}

[data-theme="dark"] {
  --ig-primary-bg: 12, 16, 20;
  --ig-primary-text: 245, 245, 245;
  /* ...same token names, dark values only */
}

/* Usage anywhere in the system: */
.surface {
  background: rgb(var(--ig-primary-bg));
  color: rgb(var(--ig-primary-text));
}`}
        />
        <CodeBlock
          label="Theme toggle — client component pattern"
          code={`"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("ig-theme", next);
    setTheme(next);
  }

  return (
    <button onClick={toggle} aria-label={\`Switch to \${theme === "dark" ? "light" : "dark"} theme\`}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}`}
        />
        <CodeBlock
          label="Inline script — prevents flash of wrong theme on load"
          code={`// Runs before paint, in <head>, reads saved preference or system setting
(function () {
  var saved = localStorage.getItem("ig-theme");
  var theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use semantic tokens exclusively", body: "Never reference rgb(255,255,255) directly — always rgb(var(--ig-primary-bg)). This is the only mechanism that makes dark mode automatic." },
          { type: "do", title: "Test elevation in dark mode specifically", body: "Shadows are far less visible on dark backgrounds. Verify that cards and modals still read as elevated using the Elevation page's --shadow-* tokens, which compensate with adjusted opacity." },
          { type: "do", title: "Read the system preference on first load", body: "Default to prefers-color-scheme when no saved preference exists — don't force light mode on users whose OS is set to dark." },
          { type: "do", title: "Inline the theme-detection script in <head>", body: "Without this, the page flashes light mode before JS hydrates and corrects it — a jarring 'flash of wrong theme'." },
          { type: "dont", title: "Don't invert photography or video", body: "User media is never recoloured, filtered, or inverted for dark mode — only UI chrome is themed." },
          { type: "dont", title: "Don't use pure black or pure white", body: "rgb(12,16,20) and rgb(245,245,245) are the confirmed values — pure #000/#fff create harsher contrast than the production system uses." },
          { type: "dont", title: "Don't theme the brand gradient", body: "The five-stop hero gradient is identical in both modes — it's a fixed brand asset, not a themed surface." },
          { type: "dont", title: "Don't hardcode a single hover-overlay alpha", body: "Dark mode doubles the hover overlay alpha (0.05 → 0.1) because the same overlay is far less visible against dark surfaces." },
        ]}
      />

      <ImplementationNote title="System contrast mode">
        Forced-colors and high-contrast OS modes are handled separately from light/dark theming — see the Accessibility page for the specific risks and overrides Instagram's production system needs for those modes.
      </ImplementationNote>
    </PageContainer>
  );
}
