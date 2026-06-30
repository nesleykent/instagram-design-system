import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./empty-states.module.css";

export const metadata = {
  title: "Empty States",
  description: "Every list, grid, and feed surface needs a defined empty state — a centered icon, a short headline naming what's missing, one supporting sentence, and…",
};

const CATALOG = [
  {
    name: "No posts yet (own profile)",
    surface: "Profile grid — viewing your own profile",
    headline: "No posts yet",
    body: "When you share photos and videos, they'll appear here.",
    cta: "Share your first photo",
    iconHint: "Camera or grid outline glyph",
  },
  {
    name: "No posts yet (other profile)",
    surface: "Profile grid — viewing someone else's profile",
    headline: "No posts yet",
    body: "When they share photos and videos, you'll see them here.",
    cta: "None — read-only state",
    iconHint: "Camera or grid outline glyph",
  },
  {
    name: "Empty feed (new account)",
    surface: "Home feed — account follows nobody",
    headline: "Welcome to Instagram",
    body: "Follow people to see their photos and videos in your feed.",
    cta: "Find people to follow",
    iconHint: "App icon or stylised welcome illustration",
  },
  {
    name: "No search results",
    surface: "Search — query with zero matches",
    headline: "No results found",
    body: "Try searching for something else.",
    cta: "None — text only",
    iconHint: "Magnifying glass outline glyph",
  },
  {
    name: "No notifications",
    surface: "Activity feed",
    headline: "Activity On Your Posts",
    body: "When people like or comment on your posts, you'll see it here.",
    cta: "None — text only",
    iconHint: "Heart outline glyph",
  },
  {
    name: "No messages",
    surface: "Inbox — first-time DM user",
    headline: "Your Messages",
    body: "Send private photos and messages to a friend or group.",
    cta: "Send message",
    iconHint: "Paper plane outline glyph, often with circular badge background",
  },
  {
    name: "No saved posts",
    surface: "Saved collection — default collection empty",
    headline: "Save",
    body: "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.",
    cta: "None — text only",
    iconHint: "Bookmark outline glyph",
  },
  {
    name: "No comments yet",
    surface: "Comments sheet on a fresh post",
    headline: "No comments yet.",
    body: "Start the conversation.",
    cta: "None — input field is the implicit CTA",
    iconHint: "No icon — comment composer is visible directly below",
  },
  {
    name: "Empty Explore (rare — new/restricted account)",
    surface: "Explore grid",
    headline: "We'll be back soon",
    body: "Check back later — we're working on bringing you personalised content.",
    cta: "None — text only",
    iconHint: "Compass or sparkle outline glyph",
  },
  {
    name: "Offline / no connection",
    surface: "Any feed-driven surface, network unreachable",
    headline: "No Internet Connection",
    body: "Check your connection and try again.",
    cta: "Try Again",
    iconHint: "Cloud-with-slash or signal outline glyph",
  },
];

const ANATOMY_PARTS = [
  { part: "Icon or illustration", detail: "A single outline-style glyph, 48–64px, often inside a soft circular badge using --ig-secondary-bg. Never a full illustration — Instagram's empty states are minimal, not decorative." },
  { part: "Headline", detail: "1 short line, sentence case, --fw-semibold. States what's missing, not an apology ('No posts yet' not 'Oops, nothing here')." },
  { part: "Supporting text", detail: "1 sentence, --ig-secondary-text, system-14. Explains what will appear here and why, written in second person." },
  { part: "Optional CTA", detail: "A single button or text link — only when there's a clear, single next action. Many empty states are CTA-less by design (no comments yet, no notifications)." },
];

export default function EmptyStatesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Empty States"
        description="Every list, grid, and feed surface needs a defined empty state — a centered icon, a short headline naming what's missing, one supporting sentence, and (sometimes) a single clear action. Instagram never leaves a surface visually blank."
      />

      <Section
        kicker="Anatomy"
        title="Four parts, rarely more"
        description="An empty state is not an error page and not an illustration showcase. It's a minimal, calm explanation of why a surface is empty, written from the system's existing voice (see Voice & Writing)."
      >
        <div className={styles.anatomyList}>
          {ANATOMY_PARTS.map((p, i) => (
            <div key={p.part} className={styles.anatomyRow}>
              <span className={styles.anatomyIndex}>{i + 1}</span>
              <div>
                <p className={styles.anatomyPart}>{p.part}</p>
                <p className={styles.anatomyDetail}>{p.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.demoCard}>
          <div className={styles.demoBadge}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28} aria-hidden="true" focusable="false">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="rgb(var(--ig-secondary-icon))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="rgb(var(--ig-secondary-icon))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className={styles.demoHeadline}>No posts yet</p>
          <p className={styles.demoBody}>When you share photos and videos, they&apos;ll appear here.</p>
          <button type="button" className={styles.demoCta}>Share your first photo</button>
        </div>
      </Section>

      <Section
        kicker="Catalog"
        title="Confirmed empty states across the product"
        description="Ten empty states drawn from the surfaces this manual already documents. Use these headline/body pairs verbatim where the surface matches, or as a calibration reference for new surfaces."
      >
        <div className={styles.catalogList}>
          {CATALOG.map((c) => (
            <div key={c.name} className={styles.catalogCard}>
              <div className={styles.catalogMeta}>
                <p className={styles.catalogName}>{c.name}</p>
                <p className={styles.catalogSurface}>{c.surface}</p>
              </div>
              <div className={styles.catalogCopy}>
                <p className={styles.catalogHeadline}>&ldquo;{c.headline}&rdquo;</p>
                <p className={styles.catalogBody}>{c.body}</p>
              </div>
              <div className={styles.catalogFooter}>
                <span className={styles.catalogCtaLabel}>CTA:</span>
                <span className={styles.catalogCta}>{c.cta}</span>
                <span className={styles.catalogIconHint}>{c.iconHint}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Implementation"
        title="Layout pattern"
        description="Empty states are vertically centered within their container, with generous padding so the composition doesn't feel cramped against a mostly-empty surface."
      >
        <CodeBlock
          label="Empty state container — CSS"
          code={`.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-3);
  padding: var(--space-9) var(--space-4);
  min-height: 320px;
}

.empty-state__badge {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-pill);
  background: rgb(var(--ig-secondary-bg));
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--ig-secondary-icon));
}

.empty-state__headline {
  font-size: 18px;
  font-weight: var(--fw-semibold);
  color: rgb(var(--ig-primary-text));
}

.empty-state__body {
  font-size: 14px;
  line-height: 1.5;
  color: rgb(var(--ig-secondary-text));
  max-width: 280px;
}

.empty-state__cta {
  margin-top: var(--space-2);
}`}
        />
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Name what's missing", body: "'No posts yet' tells the user what the surface is for. Generic copy like 'Nothing here' doesn't." },
          { type: "do", title: "Keep the icon outline-style and small", body: "48–64px outline glyph, optionally in a soft circular badge. Never a large illustration — that's heavier than the system's restrained visual language." },
          { type: "do", title: "Match CTA presence to actionability", body: "Only add a button when there's one clear next step (share a photo, send a message). If the state requires someone else's action (no notifications yet), skip the CTA." },
          { type: "do", title: "Reuse the Voice & Writing tone rules", body: "Empty state copy sits at the 'warm, inviting' personality level — see the Tone scale on the Voice & Writing page." },
          { type: "dont", title: "Don't apologize", body: "'Oops, nothing here!' undercuts the calm, direct Instagram voice. State the fact, then help." },
          { type: "dont", title: "Don't leave a surface blank with zero copy", body: "Every list, grid, or feed needs a defined empty state — a blank white/black rectangle is never acceptable." },
          { type: "dont", title: "Don't skeleton an empty surface", body: "Skeletons are for loading; once you know the result set is genuinely empty, show the empty state immediately. See Loading & Skeletons." },
          { type: "dont", title: "Don't combine multiple CTAs", body: "One action maximum. If there are two plausible next steps, pick the more common one and drop the other." },
        ]}
      />

      <ImplementationNote title="Relationship to Loading & Skeletons">
        Empty states and skeletons are mutually exclusive — a surface is either loading (skeleton), has content, or is confirmed empty (this pattern). Never show a skeleton then flash to an empty state faster than the 300ms minimum visible time documented on the Loading & Skeletons page; it reads as a layout bug rather than a deliberate state.
      </ImplementationNote>
    </PageContainer>
  );
}
