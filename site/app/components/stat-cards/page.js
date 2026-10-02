import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./stat-cards.module.css";

export const metadata = {
  title: "Stat Cards",
  description: "Dashboard summary tiles — a label, a large numeral, and an optional trend indicator, built from this system's confirmed shadow, radius, and semantic colour tokens.",
};

const STATS = [
  { label: "Accounts reached", value: "284.1K", delta: "+12.4%", trend: "up", compare: "vs last 7 days" },
  { label: "Engagement rate", value: "6.2%", delta: "-0.8%", trend: "down", compare: "vs last 7 days" },
  { label: "New followers", value: "1,204", delta: "+34.1%", trend: "up", compare: "vs last 7 days" },
  { label: "Profile visits", value: "9,842", delta: "0.0%", trend: "flat", compare: "vs last 7 days" },
];

function TrendIcon({ trend }) {
  if (trend === "flat") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: trend === "down" ? "rotate(180deg)" : "none" }}>
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatCardsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Stat Cards"
        description="A label, a large numeral, and an optional trend indicator — the summary-tile pattern every dashboard surface needs. Built from this system's confirmed --shadow-card elevation and semantic success/error tokens, extended because Instagram's own product doesn't expose a KPI-summary surface to evidence."
      />

      <Section
        kicker="Live"
        title="Four-up grid, the most common density"
        description="Trend colour reuses the system's existing --ig-success and --ig-error tokens — no new colour is introduced for 'good' vs 'bad' movement."
      >
        <ComponentShowcase align="start">
          <div className={styles.statGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statValue}>{s.value}</p>
                <div className={styles.statFooter}>
                  <span
                    className={[
                      styles.statDelta,
                      s.trend === "up" ? styles.deltaUp : s.trend === "down" ? styles.deltaDown : styles.deltaFlat,
                    ].join(" ")}
                  >
                    <TrendIcon trend={s.trend} />
                    {s.delta}
                  </span>
                  <span className={styles.statCompare}>{s.compare}</span>
                </div>
              </div>
            ))}
          </div>
        </ComponentShowcase>
      </Section>

      <Section kicker="Spec" title="Token reuse">
        <div className={styles.specTable}>
          {[
            { label: "Card surface", value: "rgb(--ig-elevated-background), border 1px solid rgb(--ig-separator), --radius-lg" },
            { label: "Elevation", value: "--shadow-card — the same confirmed token used for editorial cards, applied here at rest (no hover-lift; stat cards are not interactive)" },
            { label: "Padding", value: "var(--space-5) — 24px, matching other card-shaped surfaces in this system" },
            { label: "Label", value: "system-12.5, --fw-medium, --ig-secondary-text, sentence case (see Voice & Writing)" },
            { label: "Value", value: "system-28–32, --fw-bold, --ig-primary-text, tabular-nums — abbreviated per Voice & Writing's number rules (1.2M, not 1,200,000)" },
            { label: "Positive trend", value: "rgb(--ig-success) icon + text — up arrow" },
            { label: "Negative trend", value: "rgb(--ig-error) icon + text — down arrow" },
            { label: "Flat trend", value: "rgb(--ig-secondary-text), horizontal dash icon — avoid implying movement that didn't happen" },
            { label: "Comparison text", value: "system-11.5, --ig-tertiary-text — always states the comparison window explicitly" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Stat Card — CSS"
          code={`.stat-card {
  background: rgb(var(--ig-elevated-background));
  border: 1px solid rgb(var(--ig-separator));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-5);
}

.stat-card__label {
  font-size: 12.5px;
  font-weight: var(--fw-medium);
  color: rgb(var(--ig-secondary-text));
  margin-bottom: var(--space-2);
}

.stat-card__value {
  font-size: 30px;
  font-weight: var(--fw-bold);
  font-variant-numeric: tabular-nums;
  color: rgb(var(--ig-primary-text));
}

.stat-card__delta[data-trend="up"]   { color: rgb(var(--ig-success)); }
.stat-card__delta[data-trend="down"] { color: rgb(var(--ig-error)); }
.stat-card__delta[data-trend="flat"] { color: rgb(var(--ig-secondary-text)); }`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Always pair colour with an icon", body: "The up/down arrow (or flat dash) carries the meaning independently of colour — this keeps trend direction legible for colourblind users, consistent with this system's accessibility standard." },
          { type: "do", title: "State the comparison window explicitly", body: "'+12.4% vs last 7 days', never a bare percentage — an unscoped delta is ambiguous and erodes trust in the number." },
          { type: "do", title: "Abbreviate large values the same way the rest of the system does", body: "1.2M, 284.1K — see Voice & Writing's number formatting rules. A dashboard with its own number format reads as inconsistent." },
          { type: "do", title: "Use tabular-nums on the value", body: "Keeps digit widths consistent so a row of stat cards doesn't visually jitter as values update in real time." },
          { type: "dont", title: "Don't make stat cards interactive by default", body: "They're a summary surface, not a button — if a card needs to be clickable (drill into detail), add a clear affordance rather than relying on the whole card being a silent link." },
          { type: "dont", title: "Don't invent a third trend colour", body: "Up is --ig-success, down is --ig-error, flat is neutral grey — exactly the two semantic tokens already confirmed elsewhere in this system, no new colour." },
          { type: "dont", title: "Don't omit the flat state", body: "A 0% delta still needs an explicit, neutral treatment — don't silently hide the trend indicator when nothing changed." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        No KPI-summary surface exists in Instagram&apos;s consumer product to evidence — the closest
        confirmed pattern is the Professional Dashboard&apos;s metric label (see Labels), which pairs a
        large numeral with secondary-text metadata but has no trend indicator or card surface. This
        page is <strong>extended</strong>: the card shape borrows the confirmed --shadow-card token from
        Cards, and the trend colours reuse the confirmed --ig-success/--ig-error semantic tokens — but
        the composition as a whole (label + value + trend + comparison, in a bordered card) is a
        standard dashboard pattern applied to this system&apos;s tokens, not an Instagram production
        finding.
      </ImplementationNote>
    </PageContainer>
  );
}
