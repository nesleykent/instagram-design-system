import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./rtl.module.css";

export const metadata = {
  title: "RTL & Internationalization",
  description: "Direction-aware layout using logical CSS properties, a confirmed mirror/no-mirror classification for the icon vocabulary, and what never changes regardless…",
};

const PHYSICAL_TO_LOGICAL = [
  { physical: "margin-left / margin-right", logical: "margin-inline-start / margin-inline-end" },
  { physical: "padding-left / padding-right", logical: "padding-inline-start / padding-inline-end" },
  { physical: "left / right", logical: "inset-inline-start / inset-inline-end" },
  { physical: "border-left / border-right", logical: "border-inline-start / border-inline-end" },
  { physical: "text-align: left / right", logical: "text-align: start / end" },
  { physical: "border-top-left-radius", logical: "border-start-start-radius" },
  { physical: "flex-direction: row", logical: "row (auto-reverses with dir — no change needed)" },
];

const MIRROR_ICONS = [
  { name: "Back chevron", mirror: true, reason: "Points toward 'previous' in reading order — reverses with text direction" },
  { name: "Forward chevron / disclosure", mirror: true, reason: "Points toward 'next' in reading order" },
  { name: "Send / paper-plane", mirror: true, reason: "Implies forward motion in reading direction" },
  { name: "Reply / forward (message)", mirror: true, reason: "Arrow direction is reading-direction-relative" },
  { name: "Text alignment icons", mirror: true, reason: "Depict line-start/line-end, which swaps with direction" },
  { name: "Progress / loading fill direction", mirror: true, reason: "Fills toward reading-end, same as Stories Progress segments" },
  { name: "Play button (triangle)", mirror: false, reason: "Universal media convention, not direction-coded — every platform keeps it pointing right" },
  { name: "Like / heart", mirror: false, reason: "Symbolic, not directional" },
  { name: "Checkmark", mirror: false, reason: "Universal confirmation symbol" },
  { name: "Camera", mirror: false, reason: "Depicts a real object, not a direction" },
  { name: "Search / magnifying glass", mirror: false, reason: "Symbolic object, no inherent direction" },
  { name: "Profile / person", mirror: false, reason: "Symbolic, not directional" },
  { name: "Settings / gear", mirror: false, reason: "Symbolic, not directional" },
  { name: "Bell / notifications", mirror: false, reason: "Symbolic object" },
  { name: "Instagram logo / wordmark", mirror: false, reason: "Brand marks never mirror — identity stays fixed regardless of direction" },
];

const NEVER_MIRROR = [
  { item: "Photography & video", why: "User media is content, not chrome — never flipped, cropped, or repositioned for direction." },
  { item: "The Instagram logo and wordmark", why: "Brand identity is fixed orientation in every market and every direction." },
  { item: "Code blocks & monospace content", why: "Source code, URLs, and file paths stay LTR even inside an RTL page — see this manual's own CodeBlock component." },
  { item: "Numerals", why: "Arabic-indic and Western numerals both read left-to-right even within RTL body text — '٣٢ متابع' keeps its number LTR-internal." },
  { item: "Usernames, emails, hashtags", why: "These are identifiers, not prose — '@username' and '#hashtag' stay LTR even mid-RTL-sentence." },
  { item: "Charts with a time axis", why: "Time-series charts conventionally read oldest→newest left-to-right regardless of UI direction — mirroring would misrepresent the data, not just the chrome." },
];

export default function RtlPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations · Extended"
        title="RTL & Internationalization"
        description="Direction-aware layout using logical CSS properties, a confirmed mirror/no-mirror classification for the icon vocabulary, and what never changes regardless of reading direction. Not observed in the captured CSS — Instagram's English-language about-page source is LTR-only — so this page is derived from CSS internationalization standards applied to this system's existing tokens."
      />

      <Section
        kicker="Core technique"
        title="Logical properties, not direction conditionals"
        description="The entire system should use logical CSS properties everywhere a physical left/right value would otherwise appear. Done consistently, most components need zero [dir=&quot;rtl&quot;] overrides — they mirror automatically."
      >
        <div className={styles.mappingTable}>
          <div className={[styles.mappingRow, styles.mappingHeader].join(" ")}>
            <span>Physical (avoid)</span>
            <span>Logical (use instead)</span>
          </div>
          {PHYSICAL_TO_LOGICAL.map((m) => (
            <div key={m.physical} className={styles.mappingRow}>
              <code className={styles.mappingCode}>{m.physical}</code>
              <code className={styles.mappingCodeLogical}>{m.logical}</code>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Example — a notification row, direction-agnostic"
          code={`/* Works correctly in both LTR and RTL with zero [dir] overrides */
.notification-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-inline: var(--space-4);
  text-align: start;
}

.notification-row__avatar {
  margin-inline-end: var(--space-2);
}

.notification-row__timestamp {
  margin-inline-start: auto; /* pushes to line-end: right in LTR, left in RTL */
}`}
        />
      </Section>

      <Section
        kicker="Icon mirroring"
        title="Directional icons flip — symbolic icons don't"
        description="The rule: if the icon depicts a direction or motion relative to reading order, it mirrors. If it depicts a real object or a universal symbol, it stays fixed. Applied to this system's confirmed icon vocabulary from the Icons page:"
      >
        <div className={styles.iconRuleGrid}>
          {MIRROR_ICONS.map((icon) => (
            <div key={icon.name} className={styles.iconRuleRow}>
              <span className={[styles.mirrorBadge, icon.mirror ? styles.mirrorYes : styles.mirrorNo].join(" ")}>
                {icon.mirror ? "Mirrors" : "Fixed"}
              </span>
              <div>
                <p className={styles.iconRuleName}>{icon.name}</p>
                <p className={styles.iconRuleReason}>{icon.reason}</p>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Mirroring a directional icon — CSS"
          code={`/* Only directional icons need this — symbolic icons get no rule at all */
[dir="rtl"] .icon--directional {
  transform: scaleX(-1);
}`}
        />
      </Section>

      <Section
        kicker="Layout"
        title="Navigation order mirrors — brand position doesn't"
        description="Primary navigation (Tab Bars, sidebars) reverses its item order so the reading-start item in RTL is still the first thing encountered. The Instagram wordmark stays at the structural start of the header in both directions — brand identity isn't subject to mirroring the way navigation flow is."
      >
        <div className={styles.layoutDemo}>
          <div className={styles.layoutRow}>
            <span className={styles.layoutLabel}>LTR</span>
            <div className={styles.layoutBar}>
              <span className={styles.layoutTab}>Home</span>
              <span className={styles.layoutTab}>Search</span>
              <span className={styles.layoutTab}>Reels</span>
              <span className={styles.layoutTab}>Activity</span>
              <span className={styles.layoutTab}>Profile</span>
            </div>
          </div>
          <div className={styles.layoutRow}>
            <span className={styles.layoutLabel}>RTL</span>
            {/* Same DOM order as the LTR row above — direction: rtl alone produces the mirrored
                visual order. Manually reversing this list too would double-mirror it back to an
                LTR-looking order, which is exactly the row-reverse mistake the Don't below warns about. */}
            <div className={[styles.layoutBar, styles.layoutBarRtl].join(" ")}>
              <span className={styles.layoutTab}>Home</span>
              <span className={styles.layoutTab}>Search</span>
              <span className={styles.layoutTab}>Reels</span>
              <span className={styles.layoutTab}>Activity</span>
              <span className={styles.layoutTab}>Profile</span>
            </div>
          </div>
        </div>
        <CodeBlock
          label="Tab Bar — order mirrors for free with logical flex + DOM order untouched"
          code={`.tab-bar {
  display: flex;
  flex-direction: row; /* auto-reverses visually under dir="rtl" — no JS needed */
}
/* Do NOT reorder the DOM or use flex-direction: row-reverse —
   that breaks screen-reader and keyboard tab order, which should still
   match the logical (start-to-end) reading sequence. */`}
        />
      </Section>

      <Section
        kicker="What never mirrors"
        title="Content stays content, regardless of chrome direction"
        description="Direction-awareness applies to UI chrome — layout, icons, alignment. It does not apply to the content those surfaces hold."
      >
        <div className={styles.neverList}>
          {NEVER_MIRROR.map((n) => (
            <div key={n.item} className={styles.neverRow}>
              <p className={styles.neverItem}>{n.item}</p>
              <p className={styles.neverWhy}>{n.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Implementation"
        title="Setting direction"
        description="Direction is set once, on the root element, driven by the active locale — never per-component."
      >
        <CodeBlock
          label="Direction attribute — set from locale, not detected from content"
          code={`// Server-rendered or set on initial locale resolution
const RTL_LOCALES = ["ar", "he", "fa", "ur"];

function getDirection(locale) {
  const lang = locale.split("-")[0];
  return RTL_LOCALES.includes(lang) ? "rtl" : "ltr";
}

// <html lang={locale} dir={getDirection(locale)}>`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use logical properties by default", body: "margin-inline-*, padding-inline-*, inset-inline-*, text-align: start/end — everywhere a physical left/right value would otherwise appear." },
          { type: "do", title: "Keep DOM order as logical reading order", body: "Let flex-direction: row mirror visually under dir=\"rtl\" rather than reversing the DOM — this preserves correct keyboard and screen-reader tab order." },
          { type: "do", title: "Mirror only direction-coded icons", body: "Chevrons, arrows, send/reply icons. Leave symbolic icons (heart, camera, search, play) untouched." },
          { type: "do", title: "Keep numerals, code, and identifiers LTR", body: "Numbers, usernames, hashtags, and code blocks stay left-to-right even inside RTL body text — this matches how every major OS handles bidirectional text." },
          { type: "dont", title: "Don't use flex-direction: row-reverse to mirror layout", body: "It visually flips content but leaves DOM/tab order wrong — assistive tech and keyboard users get a layout that doesn't match navigation order." },
          { type: "dont", title: "Don't mirror the Instagram logo or any photo/video content", body: "Brand marks and user media are content, not direction-relative chrome." },
          { type: "dont", title: "Don't detect direction from text content", body: "Set dir from the resolved locale, not by sniffing whether a string contains RTL characters — mixed-content strings (a username inside an Arabic caption) need the container's direction to stay stable." },
          { type: "dont", title: "Don't build a separate RTL-only style system", body: "Logical properties mean most components need zero [dir=\"rtl\"] overrides — only direction-coded icons and rare layout exceptions need explicit rules." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        Instagram's captured production CSS is from English-language, LTR-only about-pages — no RTL
        evidence exists in the source this manual is built from. Everything on this page is{" "}
        <strong>extended</strong> content: standard CSS internationalization practice (logical
        properties, the dir attribute) applied to this system&apos;s already-confirmed tokens and
        icon vocabulary. Treat the icon mirror/fixed classification as a recommended starting point,
        not a literal Instagram production finding — verify against Instagram&apos;s actual Arabic or
        Hebrew localised app if pixel-exact parity matters for your use case.
      </ImplementationNote>
    </PageContainer>
  );
}
