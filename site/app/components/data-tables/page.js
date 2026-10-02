import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./data-tables.module.css";

export const metadata = {
  title: "Data Tables",
  description: "A sortable, multi-column table built from the confirmed Lists & Tables row tokens — for dashboard and analytics surfaces that the row-list pattern doesn't fit.",
};

const ROWS = [
  { account: "@julesframes", followers: "284.1K", engagement: "6.2%", posts: 412, status: "Active" },
  { account: "@noahshotit", followers: "1.2M", engagement: "3.8%", posts: 891, status: "Active" },
  { account: "@streetportraits", followers: "58.9K", engagement: "9.1%", posts: 203, status: "Active" },
  { account: "@mikaelastudio", followers: "412K", engagement: "4.5%", posts: 1204, status: "Paused" },
  { account: "@camila.city", followers: "92.3K", engagement: "7.7%", posts: 156, status: "Active" },
];

export default function DataTablesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components · Extended"
        title="Data Tables"
        description="A sortable, multi-column table for dashboard and analytics surfaces — built from the same row height, separator, and hover tokens already confirmed on Lists & Tables, extended past that page's single-column row pattern because dashboard products need this and Instagram's own product doesn't have one to evidence."
      />

      <Section
        kicker="Live"
        title="Sortable columns, numeric alignment, row selection"
        description="Click a column header to sort. Numeric columns align to the line-end (right in LTR, left in RTL — see RTL & Internationalization) while text columns align to the line-start."
      >
        <ComponentShowcase align="start">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thCheckbox}>
                    <input type="checkbox" className={styles.checkbox} aria-label="Select all rows" />
                  </th>
                  <th className={styles.th}>
                    <button type="button" className={styles.sortButton}>
                      Account
                      <svg className={styles.sortIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </th>
                  <th className={[styles.th, styles.thNumeric].join(" ")}>
                    <button type="button" className={[styles.sortButton, styles.sortActive].join(" ")}>
                      Followers
                      <svg className={[styles.sortIcon, styles.sortIconActive].join(" ")} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </th>
                  <th className={[styles.th, styles.thNumeric].join(" ")}>Engagement</th>
                  <th className={[styles.th, styles.thNumeric].join(" ")}>Posts</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.account} className={styles.tr}>
                    <td className={styles.tdCheckbox}>
                      <input type="checkbox" className={styles.checkbox} aria-label={`Select ${r.account}`} />
                    </td>
                    <td className={styles.td}>{r.account}</td>
                    <td className={[styles.td, styles.tdNumeric].join(" ")}>{r.followers}</td>
                    <td className={[styles.td, styles.tdNumeric].join(" ")}>{r.engagement}</td>
                    <td className={[styles.td, styles.tdNumeric].join(" ")}>{r.posts}</td>
                    <td className={styles.td}>
                      <span className={[styles.statusBadge, r.status === "Paused" ? styles.statusPaused : styles.statusActive].join(" ")}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <span className={styles.paginationLabel}>Showing 1–5 of 47</span>
              <div className={styles.paginationControls}>
                <button type="button" className={styles.pageButton} disabled aria-label="Previous page">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className={[styles.pageButton, styles.pageButtonActive].join(" ")}>1</button>
                <button type="button" className={styles.pageButton}>2</button>
                <button type="button" className={styles.pageButton}>3</button>
                <span className={styles.pageEllipsis}>…</span>
                <button type="button" className={styles.pageButton}>10</button>
                <button type="button" className={styles.pageButton} aria-label="Next page">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Spec"
        title="Shared tokens with Lists & Tables, extended for columns"
        description="Row height, separator, and hover treatment are identical to the confirmed row-list pattern — only the header row and column-specific alignment are new."
      >
        <div className={styles.specTable}>
          {[
            { label: "Row height", value: "44px minimum — same confirmed value as Lists & Tables" },
            { label: "Header row", value: "background: rgb(--ig-secondary-background), system-12 bold uppercase labels, sticky position optional" },
            { label: "Separator", value: "1px solid rgb(--ig-separator) between rows — same token as Lists & Tables" },
            { label: "Hover", value: "--ig-hover-overlay on row, same as every other row-based pattern in this system" },
            { label: "Cell padding", value: "var(--space-3) vertical, var(--space-4) horizontal" },
            { label: "Text alignment", value: "text-align: start for text/identity columns, text-align: end for numeric columns — both logical, RTL-safe" },
            { label: "Sort icon", value: "16px chevron, rotates 180deg between ascending/descending, --ig-stop-magenta when active" },
            { label: "Status badge", value: "var(--radius-pill), --ig-success/10% bg for positive states, --ig-secondary-background for neutral" },
          ].map((s) => (
            <div key={s.label} className={styles.specRow}>
              <p className={styles.specLabel}>{s.label}</p>
              <p className={styles.specValue}>{s.value}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          label="Table — core CSS"
          code={`.table { width: 100%; border-collapse: collapse; }

.table thead th {
  background: rgb(var(--ig-secondary-background));
  padding: var(--space-3) var(--space-4);
  font-size: 12px;
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: start;
  color: rgb(var(--ig-secondary-text));
}

.table tbody tr {
  min-height: 44px;
  border-top: 1px solid rgb(var(--ig-separator));
}

.table tbody tr:hover {
  background: rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha));
}

.table td {
  padding: var(--space-3) var(--space-4);
  text-align: start;
}

.table td[data-numeric="true"] {
  text-align: end;
  font-variant-numeric: tabular-nums;
}`}
        />
      </Section>

      <Section kicker="States" title="Row and column states">
        <div className={styles.stateList}>
          {[
            { name: "Default row", description: "44px minimum height, 1px separator above, text/numeric cells aligned per column type." },
            { name: "Hover row", description: "--ig-hover-overlay applied to the full row — same treatment as Lists & Tables rows." },
            { name: "Selected row", description: "Checkbox checked; row background takes a light --ig-primary-button tint to stay visible alongside the hover overlay." },
            { name: "Sorted column", description: "Header label and chevron switch to --ig-stop-magenta; chevron rotation reflects ascending/descending." },
            { name: "Empty result set", description: "Replace the table body with the standard Empty States pattern — centered icon, headline, body, optional CTA." },
            { name: "Loading", description: "Replace row content with the shimmer skeleton pattern from Loading & Skeletons — same row height, no layout shift when data resolves." },
          ].map((s) => (
            <div key={s.name} className={styles.stateRow}>
              <p className={styles.stateName}>{s.name}</p>
              <p className={styles.stateDescription}>{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Reuse Lists & Tables' row tokens", body: "44px row height, --ig-separator dividers, --ig-hover-overlay — keep tables visually consistent with the rest of the row-based system, not a separate design language." },
          { type: "do", title: "Right/end-align numeric columns", body: "Use text-align: end (not a hardcoded 'right') and font-variant-numeric: tabular-nums so digits line up vertically for scanning." },
          { type: "do", title: "Show loading and empty states using existing patterns", body: "Cross-reference Loading & Skeletons for the loading row treatment and Empty States for zero-result tables — don't invent table-specific versions of either." },
          { type: "do", title: "Keep sort state in the URL or app state, not just component state", body: "A user should be able to share or refresh a sorted/paginated table view and land on the same view." },
          { type: "dont", title: "Don't use this pattern for simple content lists", body: "Notifications, search results, and settings rows are Lists & Tables — single-column, no header, no sort. Reach for Data Tables only when columns are genuinely independent, sortable fields." },
          { type: "dont", title: "Don't make every column sortable by default", body: "Sort only columns where ordering is meaningful (followers, engagement) — sorting a status or avatar column rarely helps a user." },
          { type: "dont", title: "Don't paginate AND infinite-scroll the same table", body: "Pick one. Numbered pagination suits analytical tables where a user wants to jump to a specific page; infinite scroll suits content feeds — see Lists & Tables." },
        ]}
      />

      <ImplementationNote title="Evidence scope" tone="gap">
        Lists & Tables documents Instagram&apos;s actual, confirmed pattern: fixed-height, single-column
        rows with no sort and no header — and its own guidance explicitly says not to build a
        spreadsheet-style table from it. That finding is correct for Instagram&apos;s own product, which
        doesn&apos;t need this pattern. This page is <strong>extended</strong> content for products built on
        this system that <em>do</em> need sortable, multi-column data — dashboards, analytics views,
        admin panels. The row height, separator, and hover tokens are reused directly from the
        confirmed pattern; the header row, sort affordance, and column alignment rules are new,
        derived from standard data-table conventions rather than Instagram evidence.
      </ImplementationNote>
    </PageContainer>
  );
}
