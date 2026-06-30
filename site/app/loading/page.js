import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./loading.module.css";

export const metadata = {
  title: "Loading & Skeletons",
  description: "Instagram uses a shimmer skeleton pattern for first-load states and spinners only for user-triggered actions.",
};

const SKELETON_PATTERNS = [
  {
    name: "Feed post skeleton",
    context: "Home feed, Profile grid",
    slots: [
      { label: "Avatar circle", shape: "circle", w: 32, h: 32 },
      { label: "Username line", shape: "rect", w: 120, h: 12 },
      { label: "Media block", shape: "rect", w: "100%", h: 300 },
      { label: "Action row spacer", shape: "rect", w: 160, h: 12 },
      { label: "Caption line 1", shape: "rect", w: "90%", h: 10 },
      { label: "Caption line 2", shape: "rect", w: "60%", h: 10 },
    ],
    notes: "The media block is the dominant placeholder — match the known aspect ratio if available (4:5, 1:1, etc.) to avoid layout shift when the image loads.",
  },
  {
    name: "Profile header skeleton",
    context: "Profile page header",
    slots: [
      { label: "Avatar circle", shape: "circle", w: 86, h: 86 },
      { label: "Follower stat ×3", shape: "rect", w: 60, h: 20 },
      { label: "Display name", shape: "rect", w: 140, h: 14 },
      { label: "Bio line 1", shape: "rect", w: "85%", h: 12 },
      { label: "Bio line 2", shape: "rect", w: "50%", h: 12 },
      { label: "Action buttons", shape: "rect", w: "100%", h: 36 },
    ],
    notes: "Follower/following/posts stats are always three equal-width blocks, centred. Reserve their exact space to prevent the header from reflowing when data arrives.",
  },
  {
    name: "Story ring skeleton",
    context: "Story tray, Profile highlights",
    slots: [
      { label: "Story avatar ×5", shape: "circle", w: 56, h: 56 },
      { label: "Username label ×5", shape: "rect", w: 44, h: 8 },
    ],
    notes: "Render 5 placeholder rings to match the typical visible count in the tray. The ring border (gradient when unread, grey when seen) should stay invisible during skeleton state.",
  },
  {
    name: "Explore grid skeleton",
    context: "Explore, Search results",
    slots: [
      { label: "3-col grid cells", shape: "rect", w: "100%", h: "100%" },
    ],
    notes: "Use a 3-column uniform grid with 2px gaps. Every cell is a square (1:1 ratio). Stagger the shimmer timing slightly between cells (20ms offset) so the sweep doesn't look synchronised.",
  },
  {
    name: "Comment list skeleton",
    context: "Comments sheet",
    slots: [
      { label: "Avatar circle", shape: "circle", w: 32, h: 32 },
      { label: "Username line", shape: "rect", w: 80, h: 10 },
      { label: "Comment body line 1", shape: "rect", w: "75%", h: 10 },
      { label: "Comment body line 2", shape: "rect", w: "45%", h: 10 },
    ],
    notes: "Render 4–6 skeleton comment rows to fill the visible area. Don't show the input composer until comments load — it avoids a jarring layout shift.",
  },
];

const LOADING_STATES = [
  {
    name: "Skeleton",
    when: "First load or empty cache — the full page shape is unknown to the user",
    duration: "Until data resolves",
    animation: "Shimmer sweep (translateX + gradient)",
    useFor: "Feed, profile headers, story trays, explore grids",
    avoid: "Never skeleton a page the user has already seen — use stale content + background refresh instead",
  },
  {
    name: "Shimmer only (no shape)",
    when: "Content area dimensions are known but content isn't, e.g. a DM thread with known height",
    duration: "Until messages resolve",
    animation: "Shimmer on a solid block",
    useFor: "Message thread first load, Settings rows",
    avoid: "Don't use for media — the aspect ratio matters too much for layout stability",
  },
  {
    name: "Spinner",
    when: "A user-triggered action with unknown completion time (submit, upload, refresh)",
    duration: "Until the action completes or fails",
    animation: "Rotating arc, --ig-primary-button colour, 1s linear",
    useFor: "Pull-to-refresh, post submission, follow action on slow connection",
    avoid: "Don't use spinner for initial page load — a skeleton is less disorienting",
  },
  {
    name: "Progress bar",
    when: "An operation with known progress — typically file upload or Stories playback",
    duration: "Duration of the upload or story segment",
    animation: "scaleX from 0 to 1, linear timing at the operation's own speed",
    useFor: "Media upload, Story progress (see Stories Progress component)",
    avoid: "Don't fake progress — if the operation duration is unknown, use a spinner instead",
  },
  {
    name: "Stale content + background refresh",
    when: "The user has seen this content before and the cache is still valid",
    duration: "Until new data arrives in the background",
    animation: "None — content stays visible, no loading state shown",
    useFor: "Feed revisit, profile revisit, returning to a conversation",
    avoid: "Don't flash a skeleton when stale content is available — it creates a worse experience than showing old data",
  },
];

export default function LoadingPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Loading & Skeletons"
        description="Instagram uses a shimmer skeleton pattern for first-load states and spinners only for user-triggered actions. The shimmer sweep timing and skeleton shapes are defined per-surface to prevent layout shift when content resolves."
      />

      <Section
        kicker="Loading state system"
        title="Five loading modes — one for each scenario"
        description="The right loading pattern depends on whether the content shape is known, whether the user triggered the wait, and whether the user has seen the content before."
      >
        <div className={styles.stateTable}>
          <div className={[styles.stateRow, styles.stateHeader].join(" ")}>
            <span>Pattern</span>
            <span>Use when</span>
            <span>Use for</span>
            <span>Avoid</span>
          </div>
          {LOADING_STATES.map((s) => (
            <div key={s.name} className={styles.stateRow}>
              <div>
                <p className={styles.stateName}>{s.name}</p>
                <p className={styles.stateAnimation}>{s.animation}</p>
              </div>
              <p className={styles.stateWhen}>{s.when}</p>
              <p className={styles.stateUseFor}>{s.useFor}</p>
              <p className={styles.stateAvoid}>{s.avoid}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Shimmer anatomy"
        title="The shimmer sweep"
        description="The shimmer is a light-coloured gradient that sweeps left-to-right across a placeholder shape. It communicates 'content is loading' without suggesting a specific time-to-complete."
      >
        <div className={styles.shimmerDemo}>
          <div className={styles.shimmerDemoInner}>
            <div className={styles.shimmerRow}>
              <div className={[styles.shimmer, styles.shimmerCircle].join(" ")} style={{ width: 40, height: 40 }} />
              <div className={styles.shimmerLines}>
                <div className={[styles.shimmer, styles.shimmerLine].join(" ")} style={{ width: "60%" }} />
                <div className={[styles.shimmer, styles.shimmerLine].join(" ")} style={{ width: "40%" }} />
              </div>
            </div>
            <div className={[styles.shimmer, styles.shimmerBlock].join(" ")} />
            <div className={[styles.shimmer, styles.shimmerLine].join(" ")} style={{ width: "80%" }} />
            <div className={[styles.shimmer, styles.shimmerLine].join(" ")} style={{ width: "55%" }} />
          </div>
        </div>

        <CodeBlock
          label="Shimmer CSS — the core sweep animation"
          code={`/* Base skeleton shape */
.skeleton {
  background: rgb(var(--ig-highlight-bg));
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
}

/* The shimmer overlay */
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--ig-primary-bg), 0.6) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  to { transform: translateX(100%); }
}

/* Circle variant */
.skeleton--circle { border-radius: var(--radius-pill); }`}
        />
        <CodeBlock
          label="Dark mode shimmer — adapts via CSS variables"
          code={`/* Light: --ig-highlight-bg = rgb(239,239,239), overlay = white-tinted
   Dark:  --ig-highlight-bg = rgb(38,38,38),  overlay = white-tinted
   Both cases: the same ::after gradient works because it uses the
   primary-bg variable which flips between white and near-black */
[data-theme="dark"] .skeleton::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--ig-elevated-bg), 0.5) 50%,
    transparent 100%
  );
}`}
        />
      </Section>

      <Section
        kicker="Skeleton patterns"
        title="Confirmed shapes per surface"
        description="Each skeleton pattern mirrors the exact layout of the resolved content. The slot dimensions are derived from the component specs documented in the Components section."
      >
        <div className={styles.patternList}>
          {SKELETON_PATTERNS.map((pat) => (
            <div key={pat.name} className={styles.patternCard}>
              <div className={styles.patternHeader}>
                <p className={styles.patternName}>{pat.name}</p>
                <p className={styles.patternContext}>{pat.context}</p>
              </div>
              <div className={styles.patternBody}>
                <div className={styles.patternSlots}>
                  {pat.slots.map((slot, i) => (
                    <div key={i} className={styles.patternSlot}>
                      <div
                        className={[
                          styles.slotVisual,
                          slot.shape === "circle" ? styles.slotCircle : styles.slotRect,
                        ].join(" ")}
                        style={{
                          width: typeof slot.w === "number" ? slot.w : slot.w,
                          height: typeof slot.h === "number" ? slot.h : undefined,
                          aspectRatio: slot.w === "100%" ? (slot.h === "100%" ? "1/1" : undefined) : undefined,
                        }}
                      />
                      <span className={styles.slotLabel}>{slot.label}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.patternNotes}>{pat.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Timing"
        title="Animation timing rules"
        description="The shimmer duration and stagger are critical to the perception of responsiveness — too fast looks broken, too slow feels like a bug."
      >
        <div className={styles.timingTable}>
          {[
            { token: "Shimmer duration",    value: "1.6s",        note: "Full sweep cycle. Slower than 2s feels broken; faster than 1.2s looks jittery." },
            { token: "Shimmer easing",      value: "linear",      note: "The gradient itself creates the ease effect — the animation timing function is always linear." },
            { token: "Stagger between rows",value: "20–40ms",     note: "Offset each row's animation-delay slightly so rows don't sweep in a synchronised wave." },
            { token: "Spinner duration",    value: "1s",          note: "One full rotation per second. Instagram's spinner uses linear timing, not ease-in-out." },
            { token: "Spinner size",        value: "20–24px",     note: "Matches --icon-size-md or --icon-size-lg. Use 20px inline; 24px for full-screen waits." },
            { token: "Min visible time",    value: "300ms",       note: "Show the loading state for at least 300ms — an instant flash of skeleton followed by content is more jarring than no skeleton at all." },
          ].map((r) => (
            <div key={r.token} className={styles.timingRow}>
              <p className={styles.timingToken}>{r.token}</p>
              <code className={styles.timingValue}>{r.value}</code>
              <p className={styles.timingNote}>{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Match skeleton shapes to resolved content", body: "A 4:5 image skeleton prevents layout shift. A generic grey rectangle that resizes when the image loads creates a jarring jump." },
          { type: "do", title: "Show stale content when available", body: "If the user has seen this content before, show the cached version and refresh in the background. Skeletons are for first load." },
          { type: "do", title: "Use --ig-highlight-bg for skeleton fills", body: "This token is defined for both light (239,239,239) and dark (38,38,38) mode — the skeleton automatically adapts." },
          { type: "do", title: "Stagger row animation-delay", body: "20–40ms offset between rows prevents the synchronised wave that makes skeletons look low-effort." },
          { type: "dont", title: "Don't use skeleton for actions", body: "When a user taps Follow or Post, show a spinner inline in the button — not a skeleton. Skeletons are for initial content load, not interactions." },
          { type: "dont", title: "Don't fake progress", body: "A progress bar that isn't based on real progress (upload %, download %) must be replaced with a spinner. Fake progress confuses users when it stalls." },
          { type: "dont", title: "Don't skeleton known-height empty states", body: "If the surface has legitimately no content, show the empty state copy immediately — don't skeleton an empty list." },
          { type: "dont", title: "Don't animate in reduced-motion", body: "The shimmer animation must be removed under prefers-reduced-motion. The static skeleton fill communicates loading without movement." },
        ]}
      />

      <CodeBlock
        label="Reduced motion — required override"
        code={`@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
    /* Static skeleton still visible — just no sweep */
  }
}`}
      />

      <ImplementationNote title="Stories Progress">
        The animated progress bar on Stories is documented as a separate component under Stories Progress. Its scaleX animation is timing-matched to story duration, not a generic loading indicator.
      </ImplementationNote>
    </PageContainer>
  );
}
