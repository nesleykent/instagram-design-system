import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./command-palette.module.css";

export const metadata = {
  title: "Command Palette",
  description: "The Cmd/Ctrl+K search overlay pattern — press it right now to see the real implementation. Extracted from this manual's own SearchPalette component.",
};

export default function CommandPalettePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Command Palette"
        description="A keyboard-first search overlay — press ⌘K or Ctrl+K anywhere on this site right now to see it. Extremely common in developer tools and dashboards (this manual's own most-used interaction after page links), but absent from Instagram's own consumer product, which has no keyboard-driven power-user surface."
      />

      <Section
        kicker="Live"
        title="Try it — this page's own header wires it up"
        description="This isn't a demo recreation. Press ⌘K / Ctrl+K, or the / key, right now — the same SearchPalette component documented below will open."
      >
        <div className={styles.tryItBox}>
          <kbd className={styles.kbdLarge}>⌘</kbd>
          <kbd className={styles.kbdLarge}>K</kbd>
          <span className={styles.tryItText}>or</span>
          <kbd className={styles.kbdLarge}>/</kbd>
          <span className={styles.tryItText}>anywhere on this site</span>
        </div>
      </Section>

      <Section kicker="Keyboard model" title="Three shortcuts, one guard condition">
        <div className={styles.specTable}>
          {[
            { label: "⌘K / Ctrl+K", value: "Toggles the palette open/closed from anywhere, including while focused inside a text field — this shortcut always wins." },
            { label: "/ (slash)", value: "Opens the palette, but only when focus is NOT already inside an <input> or <textarea> — otherwise a user typing a slash character into a real field would be interrupted." },
            { label: "Escape", value: "Closes the palette (and, doing double duty, also closes the mobile nav drawer if that's open instead)." },
            { label: "↑ / ↓", value: "Moves the active-result index, clamped to the result list bounds — never wraps past the first/last item." },
            { label: "Enter", value: "Navigates to the currently active result." },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}><kbd className={styles.kbdSmall}>{s.label}</kbd></p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="The typing-guard — the one subtle correctness detail"
          code={`function onKeyDown(e) {
  const tag = document.activeElement?.tagName;
  const isTyping = tag === "INPUT" || tag === "TEXTAREA";

  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    setSearchOpen((v) => !v);
  } else if (e.key === "/" && !isTyping) {
    e.preventDefault();
    setSearchOpen(true);
  } else if (e.key === "Escape") {
    setSearchOpen(false);
    setMobileNavOpen(false);
  }
}`}
        />
      </Section>

      <Section kicker="Spec" title="Overlay and palette surface">
        <div className={styles.specTable}>
          {[
            { label: "Overlay backdrop", value: "rgba(--shadow-rgb, 0.5) + 6px backdrop-filter blur — dims and softens page content without hiding it entirely" },
            { label: "Overlay entrance", value: "Simple opacity fade, --duration-micro (150ms), --ease-glide" },
            { label: "Palette position", value: "Fixed, 12vh from the top — high enough to feel keyboard-reachable, not vertically centered like a modal dialog" },
            { label: "Palette entrance", value: "translateY(-12px) scale(0.98) → translateY(0) scale(1), --duration-reveal (666ms), --ease-settle — the same settle-in treatment used for the site's other overlay surfaces" },
            { label: "Palette surface", value: "560px max-width, 70vh max-height, --modal-radius, 1px separator border, a dedicated 0 12px 48px shadow heavier than any --shadow-* token (a deliberately maximal elevation for the topmost interactive layer)" },
            { label: "Result row", value: "10px/12px padding, --radius-md, active row gets --ig-hover-overlay tint — keyboard nav and mouse hover share the exact same active-state style" },
            { label: "Z-index", value: "var(--z-palette) — the highest confirmed layer in this system, above even the mobile nav drawer" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Guard text-triggerable shortcuts against active text fields", body: "A bare / or other single-character shortcut must check document.activeElement before firing — otherwise it breaks every text field on the page." },
          { type: "do", title: "Let ⌘K/Ctrl+K work everywhere, unconditionally", body: "The modifier-key combination is unambiguous — it never collides with normal typing, so it doesn't need the same guard as a bare key shortcut." },
          { type: "do", title: "Reuse Escape for whatever overlay is currently open", body: "One global Escape handler that closes search AND mobile nav (whichever is active) is simpler and more predictable than per-component key listeners." },
          { type: "do", title: "Show the empty state only after a real query", body: "See Empty States — don't flash 'no results' before the user has typed anything; a blank query should show a browsable default (recent/all items), not an error-adjacent empty state." },
          { type: "dont", title: "Don't trap body scroll without restoring it on close", body: "Locking document.body.style.overflow while the palette is open is correct — but the cleanup function must restore it, or every subsequent page becomes unscrollable if the component unmounts unexpectedly." },
          { type: "dont", title: "Don't make the palette taller than ~70vh", body: "A full-height palette starts to compete with the content it's meant to help you find quickly — cap it and let results scroll internally." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        Instagram&apos;s own product has no command-palette pattern to evidence — it&apos;s a
        touch-first, tab-driven mobile app. This page is <strong>extended</strong>, but like
        Breadcrumbs and Prev/Next Navigation, it documents this manual&apos;s own real, shipped
        implementation (<code>site/components/SearchPalette.js</code> and the keyboard wiring in{" "}
        <code>site/components/SiteShell.js</code>) rather than a hypothetical proposal — the same
        component handling every keystroke on this exact page.
      </ImplementationNote>
    </PageContainer>
  );
}
