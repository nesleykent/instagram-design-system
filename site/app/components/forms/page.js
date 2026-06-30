import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import IGInput from "@/components/docs/IGInput";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./forms.module.css";

export const metadata = {
  title: "Forms",
  description: "The confirmed text-input layer — border, radius, and focus tokens — extended with the field types every real product needs: checkboxes, radios, selects…",
};

export default function FormsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Forms"
        description="The confirmed text-input layer — border, radius, and focus tokens — extended with the field types every real product needs: checkboxes, radios, selects, textareas, and validation states. Extensions are derived from confirmed neighbouring tokens (Toggles, Text Fields, the error colour) rather than invented from scratch."
      />

      <Section kicker="Live" title="Focus the field — real :focus-visible, magenta ring" align="start">
        <ComponentShowcase align="start">
          <IGInput label="Username" placeholder="your.username" />
          <IGInput label="Email" placeholder="you@example.com" />
          <IGInput label="Username" defaultValue="taken_username" error="This username is already taken." />
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Extended · Checkboxes & radios"
        title="Square for multi-select, circular for single-select"
        description="Both reuse the 20px control size, --ig-stroke resting border, and --ig-primary-button checked fill already confirmed for Toggles — just at a smaller, denser scale appropriate for list-form selection."
      >
        <div className={styles.demoColumns}>
          <div className={styles.optionGroup}>
            <p className={styles.fieldLabel}>Notify me about</p>
            <label className={styles.checkboxRow}>
              <input type="checkbox" className={styles.checkboxInput} defaultChecked />
              <span className={styles.checkboxLabel}>Comments on my posts</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" className={styles.checkboxInput} />
              <span className={styles.checkboxLabel}>New followers</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" className={styles.checkboxInput} disabled />
              <span className={styles.checkboxLabel}>Live videos (disabled)</span>
            </label>
          </div>
          <div className={styles.optionGroup}>
            <p className={styles.fieldLabel}>Who can message you</p>
            <label className={styles.checkboxRow}>
              <input type="radio" name="dm-audience" className={styles.radioInput} defaultChecked />
              <span className={styles.checkboxLabel}>Everyone</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="radio" name="dm-audience" className={styles.radioInput} />
              <span className={styles.checkboxLabel}>People you follow</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="radio" name="dm-audience" className={styles.radioInput} disabled />
              <span className={styles.checkboxLabel}>No one (disabled)</span>
            </label>
          </div>
        </div>
        <CodeBlock
          label="Checkbox — custom-painted native input"
          code={`.checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 1.5px solid rgb(var(--ig-stroke));
  background: rgb(var(--ig-primary-bg));
}
.checkbox:checked {
  background: rgb(var(--ig-primary-button));
  border-color: rgb(var(--ig-primary-button));
}
.checkbox:focus-visible {
  outline: 2px solid var(--ig-stop-magenta);
  outline-offset: 2px;
}
.checkbox:disabled { opacity: 0.5; }

/* Radio — identical control, pill radius, inset dot via ::before */
.radio { border-radius: var(--radius-pill); }
.radio::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: var(--radius-pill);
  background: rgb(var(--ig-primary-button));
  transform: scale(0);
}
.radio:checked::before { transform: scale(1); }`}
        />
      </Section>

      <Section
        kicker="Extended · Select"
        title="Same border, radius, and height as Text Fields"
        description="A select field is a Text Field with a trailing chevron and no free-text entry — it doesn't introduce a new border or radius token."
      >
        <ComponentShowcase align="start">
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="audience-select">Audience</label>
            <div className={styles.selectWrap}>
              <select id="audience-select" className={styles.select} defaultValue="followers">
                <option value="public">Public</option>
                <option value="followers">Followers</option>
                <option value="close-friends">Close Friends</option>
              </select>
              <svg className={styles.selectChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Extended · Textarea"
        title="Multi-line variant of the same field grammar"
        description="Vertical resize only — horizontal resize breaks layout on every surface this would appear in (composer, bio editor, comment box)."
      >
        <ComponentShowcase align="start">
          <div className={styles.field} style={{ width: 320 }}>
            <label className={styles.fieldLabel} htmlFor="bio-textarea">Bio</label>
            <textarea id="bio-textarea" className={styles.textarea} placeholder="Tell people about yourself" defaultValue="Building things, one pixel at a time." />
          </div>
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Extended · Validation"
        title="Error state reuses --ig-error, never a new colour"
        description="The border and focus ring switch to the system's existing error red. Helper text appears below the field in the same colour — never as a separate toast or alert for field-level errors."
      >
        <ComponentShowcase align="start">
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="username-error">Username</label>
            <input
              id="username-error"
              className={[styles.select, styles.fieldError].join(" ")}
              style={{ paddingRight: 12 }}
              defaultValue="taken_username"
              aria-invalid="true"
              aria-describedby="username-error-message"
            />
            <span id="username-error-message" className={styles.helperText} data-tone="error">This username is already taken.</span>
          </div>
        </ComponentShowcase>
        <CodeBlock
          label="Error state — applies to input, select, or textarea"
          code={`.field--error {
  border-color: rgb(var(--ig-error));
}
.field--error:focus-visible {
  outline-color: rgb(var(--ig-error));
}
/* Helper text sits directly below, same colour, system-12 */
.field__helper--error {
  color: rgb(var(--ig-error));
  font-size: 12px;
}`}
        />
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use var(--input-radius) (6px) for every text input, select, and textarea — matching buttons and other input-shaped controls.",
            "Source border colour from the paired light/dark text-input-border token rather than a hard-coded grey.",
            "Show a clear, visible :focus-visible ring on every field type — see Accessibility.",
            "Reuse the 20px checkbox/radio size and --ig-primary-button checked fill confirmed for Toggles — don't invent a new control scale.",
            "Show validation errors inline below the field, in --ig-error, not as a separate toast.",
          ]}
          donts={[
            "Invent a bespoke radius or border treatment for a new form field — derive it from the confirmed field tokens.",
            "Remove the focus ring without a confirmed, equally visible replacement.",
            "Allow horizontal textarea resize — only vertical, to protect surrounding layout.",
            "Introduce a second 'success' green border state — Instagram's confirmed forms only signal error, not success, at the field level.",
          ]}
        />
      </Section>

      <ImplementationNote title="Evidence scope" tone="gap">
        The text-input border, 6px radius, and focus treatment are confirmed in the captured CSS.
        Checkboxes, radios, selects, textareas, and the error state shown above are <strong>extended</strong>,
        not directly observed — they're derived from confirmed neighbouring tokens (Toggle's checked-fill colour
        and control size, the Text Field border/radius, and the system's existing --ig-error token) so a complete
        form system stays internally consistent with what Instagram's production CSS actually confirms elsewhere.
      </ImplementationNote>
    </PageContainer>
  );
}
