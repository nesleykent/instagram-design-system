import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./icons.module.css";

export const metadata = { title: "Icons" };

const SIZES = [
  {
    px: 16,
    token: "--icon-size-sm",
    name: "Small",
    touchTarget: "44px wrapper required",
    use: "Inline with body text, metadata rows, badge counts",
    contexts: ["Notification count badge", "Metadata row (views, likes)", "Inline tooltip/help"],
  },
  {
    px: 20,
    token: "--icon-size-md",
    name: "Medium",
    touchTarget: "44px wrapper recommended",
    use: "Navigation, action buttons, companion to system-16 text",
    contexts: ["Nav bar icon", "Tab bar icon", "Action row leading icon"],
  },
  {
    px: 24,
    token: "--icon-size-lg",
    name: "Large",
    touchTarget: "Self-contained at 44px min button",
    use: "Primary action buttons, Stories ring, standalone action surface",
    contexts: ["Primary CTA (Post, Send, Comment)", "Stories ring play/pause", "Media playback controls"],
  },
  {
    px: 32,
    token: "--icon-size-xl",
    name: "XL",
    touchTarget: "44px minimum if interactive",
    use: "Hero moments, empty states, onboarding illustrations",
    contexts: ["Empty state illustration", "Onboarding step icon", "Feature callout"],
  },
];

const STYLE_VARIANTS = [
  {
    name: "Filled",
    when: "Selected state, primary/active affordance, brand moments",
    example: "A filled heart = liked. A filled bookmark = saved. Active tab icon = filled.",
    rule: "Filled icons carry semantic weight — use them only to communicate active or selected state, never decoratively.",
  },
  {
    name: "Outline",
    when: "Default/resting state, inactive, secondary affordance",
    example: "An outline heart = not yet liked. An outline bookmark = unsaved. Inactive tab = outline.",
    rule: "Outline is the default register. Every filled icon should have a matching outline counterpart for the resting state.",
  },
];

const COLOR_TOKENS = [
  { token: "--ig-primary-icon", role: "Default icon on primary background", context: "Most nav and action icons" },
  { token: "--ig-secondary-icon", role: "Subdued icon, metadata, timestamps", context: "Secondary action rows, helper icons" },
  { token: "--ig-always-white", role: "Icon on dark fill (gradient, photo)", context: "Overlays, Stories ring controls, camera UI" },
  { token: "--ig-error", role: "Destructive action icon", context: "Delete, block, report" },
  { token: "--ig-primary-button", role: "CTA icon (Send, Follow)", context: "Blue send arrow, follow affordance" },
];

export default function IconsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Icons"
        description="Instagram uses a custom icon set — no public icon library matches the production vocabulary. This page documents the size scale, filled/outline grammar, colour system, and touch target requirements derived from confirmed component specs."
      />

      <Section
        kicker="Size scale"
        title="Four sizes, one 4px grid"
        description="Every icon size is divisible by 4 — the same base unit as the spacing scale. The 20px default aligns with system-16 text line-height; the 24px size aligns with system-18 and primary actions."
      >
        <div className={styles.sizeGrid}>
          {SIZES.map((s) => (
            <div key={s.px} className={styles.sizeCard}>
              <div className={styles.sizeDemo}>
                <div className={styles.sizeIcon} style={{ width: s.px, height: s.px }}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={s.px} height={s.px}>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="rgb(var(--ig-stop-magenta))"
                    />
                  </svg>
                </div>
                <span className={styles.sizePx}>{s.px}px</span>
              </div>
              <div className={styles.sizeMeta}>
                <p className={styles.sizeName}>{s.name}</p>
                <code className={styles.sizeToken}>{s.token}</code>
                <p className={styles.sizeUse}>{s.use}</p>
                <p className={styles.sizeTouchTarget}>{s.touchTarget}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Style grammar"
        title="Filled and outline carry meaning"
        description="Instagram icons are binary: filled communicates active/selected; outline communicates resting/unselected. This isn't decoration — it's the system's primary state-change signal for toggleable affordances."
      >
        <div className={styles.styleGrid}>
          {STYLE_VARIANTS.map((v) => (
            <div key={v.name} className={styles.styleCard}>
              <div className={styles.styleIconRow}>
                <div className={styles.styleIconPair}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={v.name === "Filled" ? "rgb(var(--ig-stop-rose))" : "none"}
                      stroke={v.name === "Outline" ? "rgb(var(--ig-primary-icon))" : "none"}
                      strokeWidth={v.name === "Outline" ? "2" : "0"}
                    />
                  </svg>
                  <span className={styles.styleVariantName}>{v.name}</span>
                </div>
              </div>
              <div className={styles.styleMeta}>
                <p className={styles.styleWhen}><strong>Use when: </strong>{v.when}</p>
                <p className={styles.styleExample}><em>{v.example}</em></p>
                <p className={styles.styleRule}>{v.rule}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Colour"
        title="Semantic colour tokens for icons"
        description="Icons are coloured with semantic tokens, never hardcoded hex. The primary icon token adapts automatically between light and dark mode."
      >
        <div className={styles.colorTable}>
          <div className={styles.colorHeader}>
            <span>Token</span>
            <span>Role</span>
            <span>Contexts</span>
          </div>
          {COLOR_TOKENS.map((c) => (
            <div key={c.token} className={styles.colorRow}>
              <code className={styles.colorToken}>{c.token}</code>
              <span className={styles.colorRole}>{c.role}</span>
              <span className={styles.colorContexts}>{c.context}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Touch targets"
        title="44px minimum interactive area"
        description="Icons smaller than 44px must live inside a 44×44px interactive wrapper. The icon's visual size never changes; only the tap surface expands."
      >
        <div className={styles.touchDemos}>
          <div className={styles.touchDemo}>
            <div className={styles.touchTarget}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgb(var(--ig-stop-rose))" />
              </svg>
              <div className={styles.touchBorder} />
            </div>
            <p className={styles.touchLabel}>20px icon in 44px wrapper</p>
          </div>
          <div className={styles.touchDemo}>
            <div className={styles.touchTarget} style={{ width: 24, height: 24 }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgb(var(--ig-stop-rose))" />
              </svg>
              <div className={styles.touchBorder} />
            </div>
            <p className={styles.touchLabel}>24px icon self-contained 44px button</p>
          </div>
        </div>
        <CodeBlock
          label="Touch target wrapper pattern"
          code={`.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-pill);
  cursor: pointer;
}

/* Icon stays its intrinsic size — only the button grows */
.icon-button svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}`}
        />
      </Section>

      <Section
        kicker="Typography pairing"
        title="Icon weight matches text weight"
        description="When pairing an icon with text, choose the icon size whose stroke weight visually matches the text weight. Heavy text (--fw-bold/semibold) pairs with filled or heavier-stroke icons; light body text pairs with outline."
      >
        <div className={styles.pairingTable}>
          <div className={styles.pairingRow}>
            <div className={styles.pairingCell + " " + styles.pairingHeader}>Text size</div>
            <div className={styles.pairingCell + " " + styles.pairingHeader}>Line height</div>
            <div className={styles.pairingCell + " " + styles.pairingHeader}>Icon size</div>
            <div className={styles.pairingCell + " " + styles.pairingHeader}>Vertical align</div>
          </div>
          {[
            { text: "system-12", lh: "16px", icon: "16px", align: "middle" },
            { text: "system-14", lh: "18px", icon: "16px", align: "middle" },
            { text: "system-16", lh: "24px", icon: "20px", align: "middle" },
            { text: "system-18", lh: "24px", icon: "20–24px", align: "middle" },
            { text: "system-22+", lh: "26–32px", icon: "24px", align: "middle" },
          ].map((r) => (
            <div key={r.text} className={styles.pairingRow}>
              <code className={styles.pairingCell}>{r.text}</code>
              <span className={styles.pairingCell}>{r.lh}</span>
              <span className={styles.pairingCell}>{r.icon}</span>
              <span className={styles.pairingCell}>{r.align}</span>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use semantic colour tokens", body: "Colour icons with --ig-primary-icon or --ig-secondary-icon so they adapt to dark mode automatically." },
          { type: "do", title: "Pair filled ↔ outline for toggle states", body: "Every icon that represents a binary state (liked/not-liked) must have both a filled and an outline version." },
          { type: "do", title: "Wrap small icons in a 44px target", body: "16px and 20px icons must live inside a 44×44px interactive element — never expose a tiny tap target." },
          { type: "dont", title: "Don't use fill for decoration", body: "Filled icons signal 'selected' in Instagram's grammar. Using filled icons decoratively confuses the state-change signal." },
          { type: "dont", title: "Don't use arbitrary sizes", body: "Icon sizes must come from the four-step scale (16 / 20 / 24 / 32). In-between values (18px, 22px) are not part of the system." },
          { type: "dont", title: "Don't hardcode colour hex", body: "Icons coloured with a hardcoded hex won't adapt to dark mode and lose semantic meaning." },
        ]}
      />

      <Section kicker="Implementation" title="CSS token definitions">
        <CodeBlock
          label="Icon size tokens — add to globals.css"
          code={`/* Icon size scale — mirrors spacing base unit */
--icon-size-sm: 16px;
--icon-size-md: 20px;
--icon-size-lg: 24px;
--icon-size-xl: 32px;`}
        />
        <CodeBlock
          label="Base icon component pattern"
          code={`.icon {
  display: inline-block;
  flex-shrink: 0;
  color: rgb(var(--ig-primary-icon));
}

.icon--secondary { color: rgb(var(--ig-secondary-icon)); }
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--xl { width: var(--icon-size-xl); height: var(--icon-size-xl); }

.icon svg {
  width: 100%;
  height: 100%;
  /* currentColor inherits from parent color property */
  fill: currentColor;
}`}
        />
      </Section>

      <ImplementationNote title="Icon set availability">
        Instagram's icon set is proprietary and not publicly available. This page documents the
        size scale, colour grammar, and usage rules that can be reverse-engineered from component
        specs. The icon designs themselves must be reproduced from Instagram's product screens — or
        replaced with a similar custom set that follows the same filled/outline grammar and 4px
        size grid.
      </ImplementationNote>
    </PageContainer>
  );
}
