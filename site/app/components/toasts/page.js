import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./toasts.module.css";

export const metadata = { title: "Toasts & Notifications" };

const VARIANTS = [
  { name: "Confirmation", example: "Saved", icon: "check", note: "Past tense, no punctuation, auto-dismisses. The most common toast type." },
  { name: "With action", example: "Post deleted · Undo", icon: "check", note: "Trailing action link for reversible operations. The action extends the auto-dismiss timer." },
  { name: "Error", example: "Couldn't connect. Try again.", icon: "alert", note: "Used only for transient, non-blocking failures — a blocking error uses Alerts, not a toast." },
  { name: "Upload progress", example: "Uploading… 3 of 9", icon: "spinner", note: "Persists until the operation completes — does not auto-dismiss on a timer." },
];

export default function ToastsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Toasts & Notifications"
        description="A transient, non-blocking confirmation that appears, holds, and dismisses itself — for low-stakes feedback that doesn't need to interrupt the user. Not directly confirmed in captured CSS; derived from the system's modal elevation, motion, and copy rules already established elsewhere in this manual."
      />

      <Section
        kicker="Live"
        title="Appears, holds, dismisses — the standard lifecycle"
        description="Slides down from the top edge, holds for 4 seconds, then fades out. The same lifecycle applies to every toast variant below."
      >
        <ComponentShowcase align="center">
          <div className={styles.demoStage}>
            <div className={styles.toast}>
              <svg className={styles.toastIcon} viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Saved</span>
            </div>
          </div>
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Variants"
        title="Four toast types"
        description="Every variant shares the same capsule shape and motion — only the icon, message, and dismiss behaviour change."
      >
        <div className={styles.variantList}>
          {VARIANTS.map((v) => (
            <div key={v.name} className={styles.variantRow}>
              <div className={styles.variantPreview}>
                <div className={[styles.toast, v.icon === "error" ? styles.toastError : ""].join(" ")} data-tone={v.icon === "alert" ? "error" : "default"}>
                  {v.icon === "check" && (
                    <svg className={styles.toastIcon} viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {v.icon === "alert" && (
                    <svg className={styles.toastIcon} viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                  {v.icon === "spinner" && <span className={styles.toastSpinner} />}
                  <span>{v.example}</span>
                </div>
              </div>
              <div className={styles.variantMeta}>
                <p className={styles.variantName}>{v.name}</p>
                <p className={styles.variantNote}>{v.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Spec"
        title="Position, shape, and timing"
        description="Toasts use a dark capsule regardless of light/dark theme — the same theme-independent treatment as a HUD overlay on a photo, because a toast frequently floats over photo or video content where a theme-aware surface would be unreadable."
      >
        <div className={styles.specTable}>
          {[
            { label: "Position", value: "Fixed, top-center, 16px from the safe area top edge" },
            { label: "Shape", value: "Pill (--radius-pill) for single-line; --radius-lg for two-line/action toasts" },
            { label: "Background", value: "rgba(--ig-always-black, 0.85) — theme-independent, like overlay controls on photo/video" },
            { label: "Text colour", value: "rgb(--ig-always-white) — pairs with the fixed dark background" },
            { label: "Shadow", value: "--shadow-elevated — same elevation tier as a modal, since a toast floats above all page content" },
            { label: "Entrance", value: "translateY(-16px) → 0 plus opacity 0 → 1, 250ms, --ease-settle" },
            { label: "Hold duration", value: "4000ms default; extends to 6000ms when an action link is present" },
            { label: "Exit", value: "opacity 1 → 0 over 200ms, --ease-glide — no slide on exit, fade only" },
            { label: "Stacking", value: "One toast visible at a time — a new toast replaces the current one rather than stacking a queue" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          label="Toast — CSS"
          code={`.toast {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%) translateY(-16px);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  background: rgba(var(--ig-always-black), 0.85);
  color: rgb(var(--ig-always-white));
  font-size: 14px;
  font-weight: var(--fw-medium);
  box-shadow: var(--shadow-elevated);
  opacity: 0;
  transition: transform 250ms var(--ease-settle), opacity 250ms var(--ease-settle);
  z-index: var(--layer-10);
}

.toast[data-visible="true"] {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.toast[data-dismissing="true"] {
  transition: opacity 200ms var(--ease-glide);
  opacity: 0;
}`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Keep the message to 1-3 words for simple confirmations", body: "'Saved', 'Reported', 'Link copied' — see Voice & Writing's toast copy rules. Longer messages slow down a pattern meant to be glanced at, not read." },
          { type: "do", title: "Replace, don't stack", body: "If a new toast fires while one is visible, replace it immediately rather than queueing — the user only needs the most recent status." },
          { type: "do", title: "Use the dark capsule regardless of theme", body: "Toasts frequently appear over photo/video content (upload progress, share confirmations) where a theme-aware light surface would disappear against bright media." },
          { type: "do", title: "Persist upload/progress toasts until completion", body: "Don't auto-dismiss a toast that's communicating an in-progress operation — only completed-action confirmations use the 4-second timer." },
          { type: "dont", title: "Don't use a toast for anything requiring a decision", body: "If the user needs to choose between two options, that's an Alert or Action Sheet — a toast self-dismisses and can't wait for input." },
          { type: "dont", title: "Don't put more than one action link in a toast", body: "A single 'Undo' or 'View' link maximum — multiple actions belong in a richer surface." },
          { type: "dont", title: "Don't rely on the toast alone for critical errors", body: "A failed payment or account-security event needs a persistent, blocking surface — not a 4-second toast that can be missed." },
          { type: "dont", title: "Don't animate the exit with a slide", body: "Slide-in on entrance, fade-only on exit — a matching slide-out reads as slower and busier than necessary for a self-dismissing element." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        No toast/snackbar component was directly confirmed in the captured CSS — Instagram's web product
        surfaces this kind of feedback sparingly. This page is <strong>extended</strong> content: the shape
        and elevation derive from the confirmed --shadow-elevated and --radius-pill tokens, the motion derives
        from --ease-settle/--ease-glide (see Motion), and the copy rules derive directly from the toast
        examples already documented on Voice &amp; Writing. Treat this as the recommended pattern for any
        product built on this system, not as a literal Instagram production component.
      </ImplementationNote>
    </PageContainer>
  );
}
