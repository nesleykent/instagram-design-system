import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./dark-mode.module.css";

export const metadata = {
  title: "Dark Mode",
  description: "Every themed --ig-* token is declared twice in the captured bundle, once in a light theme scope and once in a dark one. This page lists those values as captured.",
};

const TOKEN_PAIRS = [
  { token: "--ig-primary-background",     light: "255, 255, 255", dark: "12, 16, 20",  note: "Light scope declares pure white; dark scope declares 12, 16, 20" },
  { token: "--ig-secondary-background",   light: "243, 245, 247", dark: "37, 41, 46",  note: "Secondary surfaces such as input fills and chips" },
  { token: "--ig-elevated-background",    light: "255, 255, 255", dark: "33, 35, 40",  note: "Cards, modals, sheets" },
  { token: "--ig-primary-text",   light: "0, 0, 0",       dark: "245, 245, 245", note: "Light scope declares pure black; dark scope declares 245, 245, 245" },
  { token: "--ig-secondary-text", light: "115, 115, 115", dark: "168, 168, 168", note: "Lighter grey in the dark scope" },
  { token: "--ig-separator",      light: "219, 219, 219", dark: "38, 38, 38",  note: "Same role in both scopes" },
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
        description="Every themed --ig-* token is declared twice in the captured bundle, once in a light theme scope and once in a dark one. The brand gradient, fixed semantic colours, and photography do not change between themes."
      />

      <Section
        kicker="Theme scopes"
        title="What the two theme scopes declare"
        description="The captured bundle declares each themed token in a light scope (._aa4c) and a dark scope (._aa4d). It records values, not the reasoning behind them."
      >
        <div className={styles.principleGrid}>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Pure white and black in light mode</p>
            <p className={styles.principleBody}>
              The light scope declares <code className={styles.inlineCode}>--ig-primary-background</code> as{" "}
              <code className={styles.inlineCode}>255, 255, 255</code> and{" "}
              <code className={styles.inlineCode}>--ig-primary-text</code> as{" "}
              <code className={styles.inlineCode}>0, 0, 0</code>.
            </p>
          </div>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Dark scope values</p>
            <p className={styles.principleBody}>
              The dark scope declares <code className={styles.inlineCode}>--ig-primary-background</code> as{" "}
              <code className={styles.inlineCode}>12, 16, 20</code> and{" "}
              <code className={styles.inlineCode}>--ig-primary-text</code> as{" "}
              <code className={styles.inlineCode}>245, 245, 245</code>.
            </p>
          </div>
          <div className={styles.principleCard}>
            <p className={styles.principleTitle}>Surface steps</p>
            <p className={styles.principleBody}>
              Light mode: primary and elevated backgrounds are both 255, 255, 255; secondary is
              243, 245, 247. Dark mode: primary 12, 16, 20, elevated 33, 35, 40, secondary 37, 41, 46.
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
  --ig-primary-background: 255, 255, 255;
  --ig-primary-text: 0, 0, 0;
  /* ...every themed token defined once, light values */
}

[data-theme="dark"] {
  --ig-primary-background: 12, 16, 20;
  --ig-primary-text: 245, 245, 245;
  /* ...same token names, dark values only */
}

/* Usage anywhere in the system: */
.surface {
  background: rgb(var(--ig-primary-background));
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
          { type: "do", title: "Use semantic tokens exclusively", body: "Never reference rgb(255,255,255) directly — always rgb(var(--ig-primary-background)). This is the only mechanism that makes dark mode automatic." },
          { type: "do", title: "Test elevation in dark mode specifically", body: "Shadows are far less visible on dark backgrounds. Verify that cards and modals still read as elevated using the Elevation page's --shadow-* tokens, which compensate with adjusted opacity." },
          { type: "do", title: "Read the system preference on first load", body: "Default to prefers-color-scheme when no saved preference exists — don't force light mode on users whose OS is set to dark." },
          { type: "do", title: "Inline the theme-detection script in <head>", body: "Without this, the page flashes light mode before JS hydrates and corrects it — a jarring 'flash of wrong theme'." },
          { type: "dont", title: "Don't invert photography or video", body: "User media is never recoloured, filtered, or inverted for dark mode — only UI chrome is themed." },
          { type: "dont", title: "Don't hardcode surface or text values", body: "Use the captured tokens. Light mode resolves to pure white surfaces and pure black text; the dark scope resolves to rgb(12,16,20) and rgb(245,245,245)." },
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
