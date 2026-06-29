import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import TokenGrid from "@/components/docs/TokenGrid";
import GridUnitVisualizer from "@/components/docs/GridUnitVisualizer";
import BreakpointTimeline from "@/components/docs/BreakpointTimeline";
import SectionRhythmDemo from "@/components/docs/SectionRhythmDemo";
import SplitScreenDemo from "@/components/docs/SplitScreenDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./layout-grid.module.css";

export const metadata = { title: "Layout & Grid" };

export default function LayoutGridPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Layout & Grid"
        description="One base unit drives the whole canvas: 7.142vw, exactly 100 ÷ 14. Below 1920px the layout scales fluidly with the viewport; at and above it, spacing locks to fixed pixels computed against a 1600px canvas."
      />

      <Section
        kicker="Brand philosophy"
        title="Simple. Flexible. Content-first."
        description="Instagram's own brand page names three layout principles and anchors them to the product. The CSS evidence maps directly onto each one."
      >
        <TokenGrid min="260px">
          {[
            {
              label: "Simple",
              note: "Confident layouts use one compositional decision per section — one split ratio, one typography scale, one image treatment. Complexity is never decorative.",
            },
            {
              label: "Flexible",
              note: "The 14-unit fluid grid and the six breakpoint tiers exist so layouts adapt continuously rather than jumping. No fixed-pixel layout was found in the about-page source below 1920px.",
            },
            {
              label: "Content-first",
              note: "Full-bleed images fill the viewport rather than being framed. Type and imagery combine compositionally — the grid serves the content, not a predefined column template.",
            },
            {
              label: "Mirrors the app",
              note: "\"Our UI tells the story of our product. It's the functional embodiment of our aspirations for our community.\" — about.instagram.com/brand/layout. The about-page is not a marketing site separate from the product; it is the product's visual language rendered as editorial.",
            },
            {
              label: "Official aspect ratios",
              note: "The brand page formally documents 9:16, 4:5, 1:1, and 16:9 as the supported ratios. These are identical to the product's feed and Stories crop set — confirming the layout language and the content-authoring constraints are intentionally unified.",
            },
            {
              label: "Experimentation within the core",
              note: "\"An iconic core foundation enables experimentation while maintaining brand consistency.\" The 14-unit grid and the six breakpoint tiers are the foundation; split ratios, type movement, and compositional asymmetry are the latitude that sits on top.",
            },
          ].map((item) => (
            <div key={item.label} className={styles.principleCard}>
              <p className={styles.principleLabel}>{item.label}</p>
              <p className={styles.principleNote}>{item.note}</p>
            </div>
          ))}
        </TokenGrid>
      </Section>

      <Section
        kicker="The 14-unit grid"
        title="Click a multiple to see it filled"
        description="Every major layout split on the about-page is a clean multiple of this base unit — never an arbitrary fraction."
      >
        <GridUnitVisualizer />
      </Section>

      <Section
        kicker="Breakpoint tiers"
        title="Resize your browser — the marker is live"
        description="Instagram's production CSS uses over 100 one-off breakpoints. Filtering for values that recur across unrelated components surfaces six real tiers."
      >
        <BreakpointTimeline />
      </Section>

      <Section
        kicker="Section rhythm"
        title="Full-bleed 100vh chapters, stacked"
        description="Each brand-storytelling 'chapter' is a full-viewport-height block with a min-height floor, separated by a 120px gap (80px on the squeezed aspect-ratio variant)."
      >
        <SectionRhythmDemo />
      </Section>

      <Section
        kicker="Split-screen template"
        title="Two ratios, one template"
        description="A recurring two-column pattern: near-50/50, or an asymmetric 5:9 — both clean multiples of the base grid unit. Collapses to a single stacked column below ~650–768px."
      >
        <SplitScreenDemo />
      </Section>

      <Section kicker="Technique" title="Reveal via clip-path, not opacity">
        <CodeBlock
          label="Brand storytelling sections wipe into view"
          code={`.section {
  clip-path: inset(100% 0 0 0); /* fully hidden, masked from the bottom */
  transition: clip-path 1s cubic-bezier(.7, 0, .3, 1);
}
.section.is-visible {
  clip-path: inset(0 0 0 0);
}`}
        />
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Size new layout regions in multiples of 7.142vw so they align to the existing grid.",
            "Give every 100vh section an explicit min-height floor — every observed instance has one.",
            "Commit fully to vw-based spacing below 1920px, then switch to the fixed-pixel equivalents above it.",
          ]}
          donts={[
            "Add a new one-off breakpoint without checking the tier table first.",
            "Mix vw-locked and fixed-pixel spacing within the same section below 1920px.",
            "Treat the 2700px/3000px ultra-wide breakpoints as a general layout tier — they exist only to tune the hero marquee type.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        The breakpoint tier table reflects values that recur across multiple unrelated selectors — the relevant
        signal for &ldquo;is this an intentional system tier&rdquo; versus one component&rsquo;s specific tuning.
        The production app layers many additional one-off breakpoints per component beyond what&rsquo;s shown here.
      </ImplementationNote>
    </PageContainer>
  );
}
