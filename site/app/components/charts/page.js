import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import ChartInspector from "./ChartInspector";
import styles from "./charts.module.css";

export const metadata = {
  title: "Charts",
  description:
    "Source-backed chart guidance for Instagram-style data visualization, interaction, accessibility, and responsive chart systems.",
};

const markGuides = [
  {
    type: "bar",
    title: "Bar Marks",
    use: "Use bars to compare discrete categories, rankings, or short time buckets such as post reach by format.",
    best: "Bars communicate magnitude and difference quickly because every mark shares a common baseline.",
    avoid: "Do not truncate the baseline when magnitude comparison is the main message. Avoid dense labels on every bar in compact cards.",
    look: "Use flat rounded rectangles, subtle grid lines, and one Instagram gradient or tokenized accent for the selected series.",
  },
  {
    type: "line",
    title: "Line Marks",
    use: "Use lines for continuous change over time, such as audience growth, weekly reach, or story completion rate.",
    best: "Lines communicate direction, pace, turning points, and trend continuity.",
    avoid: "Do not imply precision with too many points or use a line for unrelated categories.",
    look: "Use a confident 2px to 3px stroke, rounded joins, compact points only where inspection is useful, and no heavy chart frame.",
  },
  {
    type: "point",
    title: "Point Marks",
    use: "Use points to show individual observations, outliers, or relationships between two measures.",
    best: "Points communicate distribution, clusters, and exceptions without hiding the original observations.",
    avoid: "Do not rely on colour alone to distinguish groups; shape, label, or position must help.",
    look: "Use circular targets with a larger invisible hit area so touch and keyboard inspection feel forgiving.",
  },
  {
    type: "area",
    title: "Area Marks",
    use: "Use areas to emphasize accumulated volume or the weight of a trend, such as total impressions over a campaign window.",
    best: "Areas communicate scale and continuity when the filled region has a meaningful baseline.",
    avoid: "Do not stack many translucent areas or let the fill obscure labels and grid lines.",
    look: "Use a soft Instagram gradient fill under a clear line, with opacity low enough to keep data readable.",
  },
  {
    type: "stacked",
    title: "Stacked Marks",
    use: "Use stacked marks when the total and the contribution of each segment both matter.",
    best: "Stacks communicate composition, such as reach from followers, non-followers, ads, and shares.",
    avoid: "Do not compare inner segments across many stacks unless the chart also provides labels or summaries.",
    look: "Use compact rounded stacks, clear legends, and restrained separators between segments.",
  },
  {
    type: "combined",
    title: "Combined Marks",
    use: "Use combined marks when two related measures need one shared context, such as reach bars plus engagement-rate line.",
    best: "Combined marks communicate relationship and divergence between volume and rate.",
    avoid: "Do not combine unrelated metrics or use dual axes without explicit units and labels.",
    look: "Give each metric a distinct mark shape and label so colour is supportive, not required.",
  },
];

const anatomy = [
  ["Plot area", "The bounded space where values are encoded. Keep it larger than supporting chrome."],
  ["Marks", "Bars, lines, points, areas, stacks, and combinations that encode the dataset."],
  ["Axes", "Scales that map values or categories to position."],
  ["Ticks", "Small reference stops that divide an axis into readable intervals."],
  ["Grid lines", "Quiet reference lines for comparison; they should never dominate the marks."],
  ["Axis value labels", "Short labels that clarify units, dates, or categories."],
  ["Titles", "The chart's main message in plain language."],
  ["Subtitles", "Scope, date range, unit, or comparison context."],
  ["Annotations", "Direct notes on notable shifts, peaks, or anomalies."],
  ["Legends", "A decoding key for colour, texture, or shape when direct labels are not enough."],
  ["Accessibility labels", "Programmatic names, summaries, mark labels, and interactive value announcements."],
];

const platformGuidance = [
  ["Responsive web", "Let the plot width grow first. Move legends below the chart before shrinking label text."],
  ["Mobile web", "Prefer one insight, one chart, and one inspection gesture. Keep touch targets larger than the visible mark."],
  ["Desktop", "Support richer comparison: hover, keyboard focus, visible legends, and persistent selected values."],
  ["Embedded cards", "Use glanceable summaries and a compact spark chart. Never hide the only important number in a tooltip."],
];

function ChartPreview() {
  return (
    <div className={styles.previewCard} aria-label="Instagram-style creator analytics chart preview">
      <div className={styles.cardTopline}>
        <span>Creator analytics</span>
        <strong>+18.4%</strong>
      </div>
      <div className={styles.previewBars} aria-hidden="true">
        {[42, 58, 36, 76, 64, 88, 70].map((value, index) => (
          <span key={index} style={{ "--height": `${value}%` }} />
        ))}
      </div>
      <svg viewBox="0 0 420 180" className={styles.previewLine} aria-hidden="true" focusable="false">
        <path d="M12 126 C72 86, 92 118, 140 80 S230 42, 270 72 S340 110, 408 38" />
      </svg>
      <div className={styles.previewLegend}>
        <span><i /> Reach</span>
        <span><i /> Engagement</span>
      </div>
    </div>
  );
}

function ChartLegend({ items }) {
  return (
    <div className={styles.legend} aria-label="Chart legend">
      {items.map((item) => (
        <span key={item.label} data-tone={item.tone}>
          <i />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function OverviewGrid() {
  const examples = [
    ["Creator analytics", "Show the post formats, audience segments, and posting windows that move performance."],
    ["Post reach", "Compare how feed posts, reels, carousels, and collaborations travel across audiences."],
    ["Engagement trends", "Track likes, comments, shares, saves, replies, and profile actions over time."],
    ["Audience growth", "Reveal follower growth, churn, geographic shifts, and active-hour patterns."],
    ["Ad performance", "Monitor spend, impressions, click-through rate, conversions, and cost per result."],
    ["Story interactions", "Understand taps forward, exits, replies, sticker taps, and completion rate."],
  ];

  return (
    <div className={styles.overviewGrid}>
      {examples.map(([title, body]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

function ChartAnatomy() {
  return (
    <div className={styles.anatomyWrap}>
      <div className={styles.anatomyChart} aria-label="Chart anatomy diagram">
        <div className={styles.anatomyTitle}>Reach by content format</div>
        <div className={styles.anatomySubtitle}>Last 28 days, accounts reached</div>
        <div className={styles.plotArea}>
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className={styles.gridLine} />
          ))}
          <div className={styles.yAxis}>
            <span>80K</span>
            <span>60K</span>
            <span>40K</span>
            <span>20K</span>
          </div>
          <div className={styles.xAxis}>
            <span>Reels</span>
            <span>Posts</span>
            <span>Stories</span>
            <span>Ads</span>
          </div>
          {[72, 48, 34, 64].map((value, index) => (
            <button
              key={index}
              type="button"
              className={styles.anatomyBar}
              style={{ "--bar": `${value}%`, "--left": `${[9, 33, 57, 81][index]}%` }}
              aria-label={`${["Reels", "Posts", "Stories", "Ads"][index]} reached ${value} thousand accounts`}
            >
              <span>{value}K</span>
            </button>
          ))}
          <div className={styles.annotation}>Reels drove the largest lift after remix sharing increased.</div>
        </div>
        <ChartLegend
          items={[
            { label: "Organic reach", tone: "primary" },
            { label: "Paid reach", tone: "secondary" },
          ]}
        />
      </div>
      <div className={styles.calloutLayer} aria-hidden="true">
        <span data-callout="plot">Plot area</span>
        <span data-callout="marks">Marks</span>
        <span data-callout="axis">Axes and ticks</span>
        <span data-callout="labels">Value labels</span>
        <span data-callout="annotation">Annotation</span>
        <span data-callout="legend">Legend</span>
      </div>
    </div>
  );
}

function AnatomyList() {
  return (
    <div className={styles.definitionGrid}>
      {anatomy.map(([title, body]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

function ChartMark({ type }) {
  if (type === "bar") {
    return (
      <div className={styles.markBars} aria-hidden="true">
        {[38, 62, 44, 86, 70].map((value) => (
          <span key={value} style={{ "--height": `${value}%` }} />
        ))}
      </div>
    );
  }

  if (type === "stacked") {
    return (
      <div className={styles.markStacked} aria-hidden="true">
        {[["42%", "28%", "30%"], ["56%", "20%", "24%"], ["36%", "42%", "22%"]].map((stack, index) => (
          <span key={index}>
            {stack.map((value, segment) => (
              <i key={segment} style={{ "--width": value }} />
            ))}
          </span>
        ))}
      </div>
    );
  }

  if (type === "point") {
    return (
      <div className={styles.markPoints} aria-hidden="true">
        {[
          [18, 68],
          [32, 42],
          [44, 58],
          [62, 30],
          [74, 76],
          [86, 36],
        ].map(([left, top]) => (
          <span key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%` }} />
        ))}
      </div>
    );
  }

  const path = type === "area"
    ? "M8 78 C20 64 29 72 40 52 S62 30 72 42 S84 66 94 28 L94 88 L8 88 Z"
    : type === "combined"
      ? "M8 68 C24 48 36 58 48 42 S68 30 92 34"
      : "M8 72 C22 54 34 62 46 44 S64 22 78 36 S88 58 94 30";

  return (
    <svg className={styles.markSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false" data-type={type}>
      {[24, 48, 72].map((y) => (
        <line key={y} x1="6" x2="94" y1={y} y2={y} />
      ))}
      {type === "combined" && [34, 56, 72, 50].map((value, index) => (
        <rect key={value} x={14 + index * 18} y={value} width="9" height={88 - value} rx="3" />
      ))}
      <path d={path} />
      {type !== "area" && type !== "combined" && [8, 32, 54, 78, 94].map((x, index) => (
        <circle key={x} cx={x} cy={[72, 58, 36, 42, 30][index]} r="3" />
      ))}
    </svg>
  );
}

function ChartExample({ guide }) {
  return (
    <article className={styles.markCard}>
      <div className={styles.markVisual}>
        <ChartMark type={guide.type} />
      </div>
      <div className={styles.markContent}>
        <h3>{guide.title}</h3>
        <dl>
          <div>
            <dt>When to use</dt>
            <dd>{guide.use}</dd>
          </div>
          <div>
            <dt>Communicates best</dt>
            <dd>{guide.best}</dd>
          </div>
          <div>
            <dt>Mistakes to avoid</dt>
            <dd>{guide.avoid}</dd>
          </div>
          <div>
            <dt>Instagram treatment</dt>
            <dd>{guide.look} Colour, shape, labels, and motion should support comprehension before they express style.</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function AxisExamples() {
  return (
    <div className={styles.axisGrid}>
      <article>
        <h3>Fixed range</h3>
        <p>Use a fixed range when people compare the same metric across posts, creators, or time windows.</p>
        <div className={styles.axisMini} data-range="fixed">
          <span>0</span><span>25K</span><span>50K</span><span>75K</span>
        </div>
      </article>
      <article>
        <h3>Dynamic range</h3>
        <p>Use a dynamic range when the chart's job is to reveal small movement inside a narrow performance band.</p>
        <div className={styles.axisMini} data-range="dynamic">
          <span>7.0%</span><span>7.5%</span><span>8.0%</span><span>8.5%</span>
        </div>
      </article>
      <article>
        <h3>Compact labels</h3>
        <p>Use short labels in cards: 1.2K, 4 PM, Mon, Q3, or 8.4%. Expand the unit in the subtitle.</p>
        <div className={styles.axisMini} data-range="compact">
          <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
        </div>
      </article>
    </div>
  );
}

function GuidanceColumns({ items }) {
  return (
    <div className={styles.guidanceColumns}>
      {items.map(([title, body]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

const primitiveExample = `import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ImplementationNote from "@/components/docs/ImplementationNote";

export default function CreatorReachChart({ data }) {
  const maxReach = Math.max(...data.map((datum) => datum.reach));

  return (
    <ComponentShowcase align="start">
      <figure aria-labelledby="reach-title" aria-describedby="reach-summary">
        <h3 id="reach-title">Reels drove the largest reach lift</h3>
        <p id="reach-summary">
          Last 28 days, accounts reached. Reels reached 72K accounts,
          the highest value in the range.
        </p>
        <div className="chart-bars" aria-label="Reach by content format">
          {data.map((datum) => (
            <button
              key={datum.id}
              type="button"
              className="chart-mark"
              style={{ "--height": (datum.reach / maxReach) * 100 + "%" }}
              aria-label={datum.format + ", " + datum.reach.toLocaleString() + " accounts reached"}
            >
              <span>{datum.label}</span>
            </button>
          ))}
        </div>
      </figure>
      <ImplementationNote title="Chart summary">
        Keep the takeaway available as text; interaction only adds precision.
      </ImplementationNote>
    </ComponentShowcase>
  );
}`;

const primitiveCssExample = `.chart-bars {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: flex-end;
  gap: 12px;
  min-height: 180px;
  border-bottom: 1px solid rgb(var(--ig-separator));
}

.chart-mark {
  height: var(--height);
  min-height: 28px;
  border: 0;
  border-radius: 8px 8px 0 0;
  background: rgb(var(--ig-highlight-bg));
  transition: transform 150ms cubic-bezier(0, 0, .1, 1);
}

.chart-mark[aria-current="true"],
.chart-mark:hover,
.chart-mark:focus-visible {
  background-image: var(--ig-gradient-spectrum);
  transform: translateY(-3px);
}`;

const accessibleExample = `<figure aria-labelledby="reach-title" aria-describedby="reach-summary">
  <h3 id="reach-title">Reels drove the largest reach lift</h3>
  <p id="reach-summary">
    Last 28 days. Reels reached 72K accounts, posts reached 48K,
    stories reached 34K, and ads reached 64K.
  </p>
  <div role="img" aria-label="Bar chart comparing reach by format">
    <button aria-label="Reels, 72 thousand accounts reached">72K</button>
    <button aria-label="Posts, 48 thousand accounts reached">48K</button>
    <button aria-label="Stories, 34 thousand accounts reached">34K</button>
    <button aria-label="Ads, 64 thousand accounts reached">64K</button>
  </div>
</figure>`;

export default function ChartsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Charts"
        description="Charts organise data to communicate information with clarity, insight, and visual appeal. In the Instagram system, chart chrome stays quiet while colour, motion, and labels help people understand what changed and why it matters."
      >
        <div className={styles.meta}>
          <span>Content</span>
          <span>4 CSS evidence groups</span>
          <span>Static documentation page</span>
        </div>
      </PageHeader>

      <Section
        kicker="Overview"
        title="Charts turn raw metrics into decisions"
        description="Charts highlight key information in a dataset. They help people understand patterns, compare values, track change, monitor progress, and decide what to do next."
      >
        <ComponentShowcase align="start" codeLabel="Gradient chart surface" code={`.chart-card {
  border: 1px solid rgb(var(--ig-separator));
  border-radius: 12px;
  background: rgb(var(--ig-secondary-bg));
}

.active-mark {
  background-image: var(--ig-gradient-spectrum);
  transition: transform 150ms cubic-bezier(0, 0, .1, 1);
}`}>
          <ChartPreview />
        </ComponentShowcase>
        <OverviewGrid />
      </Section>

      <Section
        kicker="Anatomy"
        title="Every chart has a job, a structure, and a reading path"
        description="A chart is more than marks inside a box. It needs a plot, scale, labels, legends, annotations, and accessibility labels that all support the same message."
      >
        <ComponentShowcase align="start">
          <ChartAnatomy />
        </ComponentShowcase>
        <AnatomyList />
      </Section>

      <Section
        kicker="Marks"
        title="Choose marks by the question people need answered"
        description="Instagram charts should use the simplest mark that communicates the insight. Brand colour and motion can add energy, but the mark must carry the meaning first."
      >
        <div className={styles.markGrid}>
          {markGuides.map((guide) => (
            <ChartExample key={guide.type} guide={guide} />
          ))}
        </div>
      </Section>

      <Section
        kicker="Axes"
        title="Axis ranges should make comparison honest"
        description="Axes define what difference means. Keep them stable when people compare charts, and only make them dynamic when the page explains the narrower focus."
      >
        <div className={styles.copyBlock}>
          <p>
            Use zero as the lower bound for bars and other length-based comparisons. A truncated bar baseline can
            exaggerate small differences. For line charts, a non-zero lower bound is acceptable when the chart is
            about variation inside a range, but the subtitle or annotation must say so.
          </p>
          <p>
            Tick density should match the available plot width. Use familiar sequences such as 0, 25K, 50K, 75K or
            0%, 25%, 50%, 75%, 100%. Keep grid lines subtle and align the chart edges with nearby text, cards, and
            controls so the chart feels integrated with the surrounding Instagram interface.
          </p>
        </div>
        <AxisExamples />
      </Section>

      <Section
        kicker="Descriptive content"
        title="Write the message before drawing the chart"
        description="Every chart should have a clear main message before people inspect the details. Titles, subtitles, annotations, summaries, labels, and legends should reduce interpretation work."
      >
        <GuidanceColumns
          items={[
            ["Title", "Lead with the insight: Reels drove the largest reach lift, not Reach by format."],
            ["Subtitle", "State scope and unit: Last 28 days, accounts reached."],
            ["Annotation", "Name the cause or event: Remix sharing increased after launch week."],
            ["Summary", "Give a text version of the takeaway for complex charts and screen readers."],
            ["Legend", "Use direct labels when possible; use a legend only when it makes comparison easier."],
            ["Tone", "Use Instagram language that is specific, optimistic, and concrete: Saves rose fastest among carousel posts."],
          ]}
        />
      </Section>

      <Section
        kicker="Interaction"
        title="Inspection should clarify, not hide the truth"
        description="Hover, tap, focus, and scrubbing can reveal exact values, but critical information must remain visible without interaction."
      >
        <ComponentShowcase align="start">
          <ChartInspector />
        </ComponentShowcase>
        <GuidanceColumns
          items={[
            ["Hover and tap", "Highlight the nearest mark and show a value tooltip. Tap should pin the selection until another mark is chosen."],
            ["Scrubbing", "Let the entire plot area act as the target on touch screens; the visible point can stay small."],
            ["Selected marks", "Use shape, border, label, or position in addition to colour."],
            ["Keyboard", "Order focus by reading direction. Arrow keys or range controls can support sequential inspection."],
            ["Reduced motion", "Disable animated drawing and looping pulse effects. Preserve instant state changes."],
            ["Tooltips", "Keep values short, include units, and ensure the same information is available in text."],
          ]}
        />
      </Section>

      <Section
        kicker="Colour"
        title="Colour adds hierarchy and brand energy"
        description="Use Instagram's gradient language to focus attention, not to decorate every series. Colour must always have a secondary cue."
      >
        <div className={styles.colourExamples}>
          <article>
            <span className={styles.gradientSwatch} />
            <h3>Primary emphasis</h3>
            <p>Use the yellow, orange, pink, lavender, and purple family for the active series or key change.</p>
          </article>
          <article>
            <span className={styles.neutralSwatch} />
            <h3>Neutral comparison</h3>
            <p>Use secondary backgrounds, separators, and muted text for reference values and inactive series.</p>
          </article>
          <article>
            <span className={styles.patternSwatch} />
            <h3>Secondary cues</h3>
            <p>Pair colour with labels, shape, separators, texture, direct annotations, or selected outlines.</p>
          </article>
        </div>
      </Section>

      <Section
        kicker="Accessibility"
        title="Charts need more than one image alt label"
        description="Accessible charts expose purpose, structure, values, and interaction state. Treat the text summary as part of the chart, not an afterthought."
      >
        <ImplementationNote title="Label the chart at every useful level">
          <p>Chart purpose: what decision or question the chart supports.</p>
          <p>Axes and units: dates, categories, percentages, currency, counts, or rates.</p>
          <p>Marks, groups, legends, selected values, and the main summary need programmatic labels.</p>
        </ImplementationNote>
        <GuidanceColumns
          items={[
            ["Screen readers", "Use labelled figures, summaries, and interactive mark labels. Do not expose only an unlabeled SVG."],
            ["Keyboard navigation", "Make marks or an equivalent scrubber reachable in logical order."],
            ["Reduced motion", "Remove animated drawing, shimmer, pulse, and looped transitions unless the user opts in."],
            ["High contrast", "Preserve visible borders, selected states, and labels when gradients flatten."],
            ["Non-colour interpretation", "Use text labels, patterns, separators, annotations, and direct values for meaning."],
            ["Good label", "Saturday: 29.2K reach and 1.4K engagements, highest engagement in the week."],
          ]}
        />
        <CodeBlock label="Accessible chart markup" code={accessibleExample} />
      </Section>

      <Section kicker="Best practices" title="Best Practices">
        <DoDontGrid
          dos={[
            "Make the data more prominent than supporting chrome.",
            "Keep grid lines subtle and use familiar tick sequences.",
            "Maximise plot width in compact layouts and align charts with surrounding content.",
            "Use actual values, clear units, concise labels, and summaries for complex charts.",
          ]}
          donts={[
            "Never require interaction to reveal critical information.",
            "Do not use ambiguous date or unit formats.",
            "Do not make colour the only way to understand a group, state, or trend.",
            "Do not add dashboard chrome that competes with the marks.",
          ]}
        />
      </Section>

      <Section
        kicker="Platform"
        title="Platform Considerations"
        description="The same chart should adapt its density and inspection model to the surface it lives in."
      >
        <GuidanceColumns items={platformGuidance} />
      </Section>

      <Section
        kicker="Implementation"
        title="Implementation Notes"
        description="Build charts from reusable primitives so anatomy, accessibility, interaction, and token usage stay consistent across analytics surfaces."
      >
        <ImplementationNote title="Source-backed implementation">
          <p>
            This page follows /ig evidence for the 4px base unit, 7.142vw editorial rhythm, Instagram gradient stops,
            12px modal/card radii, compact 12/14/16px UI type, subtle separators, transform-based motion, and reduced
            motion overrides.
          </p>
        </ImplementationNote>
        <CodeBlock label="Reusable chart primitive example" code={primitiveExample} />
        <CodeBlock label="Chart primitive CSS" code={primitiveCssExample} />
      </Section>
    </PageContainer>
  );
}
