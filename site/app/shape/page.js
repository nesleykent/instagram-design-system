import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import RadiusScale from "@/components/docs/RadiusScale";
import ShapeGrammar from "@/components/docs/ShapeGrammar";
import AspectRatioGallery from "@/components/docs/AspectRatioGallery";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata = { title: "Shape" };

export default function ShapePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Shape"
        description="Every rounded form in the system resolves to one of three primitives — circle, rounded square (including a true tokenized squircle), or pill. There is no fourth shape language."
      />

      <Section
        kicker="Shape grammar"
        title="Three primitives, no exceptions"
        description="The squircle approximation below uses a generic superellipse — the literal --squircle-polygon coordinates weren't captured in the source excerpts analyzed, only its declaration and usage site."
      >
        <ShapeGrammar />
      </Section>

      <Section
        kicker="Radius scale"
        title="A token, not a magic number"
        description="Even one-off components reach for var(--input-border-radius) (6px) or var(--modal-border-radius) (12px) rather than a hard-coded pixel value."
      >
        <RadiusScale />
      </Section>

      <Section
        kicker="Content shape"
        title="Aspect ratios are product, not art direction"
        description="The ratios used for imagery map directly to product surfaces — the about-page documents the product, even in its own photography."
      >
        <AspectRatioGallery />
      </Section>

      <Section kicker="Functional cuts" title="Organic clip-paths serve one purpose: function">
        <CodeBlock
          label="A chat-bubble tail, not a decorative flourish"
          code={`clip-path: path("M 24 0 Q 19.5 0 18 2.571 Q 16.5 6 12 6 Q 7.5 6 6 2.571 Q 4.5 0 0 0 Z");
/* 24 units wide, 6 tall, symmetric — see Components → Messaging */`}
        />
        <CodeBlock
          label="Modal corner-clipping technique"
          code={`clip-path: inset(0 0 0 0 round var(--dialog-corner-radius));
/* clips to rounded corners without overflow: hidden's scrollbar-gutter and repaint cost */`}
        />
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Pick one of the three primitives for any new component — circle, rounded-square-or-squircle, or pill.",
            "Use --squircle-polygon instead of a plain border-radius when a tile should read as distinctly 'Instagram.'",
            "Use a fixed-pixel radius only when no token exists — most components in source reach for one.",
          ]}
          donts={[
            "Introduce a fourth shape family.",
            "Hand-roll a new decorative clip-path SVG path — every organic path in source serves a specific functional purpose.",
            "Assume a generic superellipse formula matches Instagram's literal squircle coordinates — verify against the live site before shipping.",
          ]}
        />
      </Section>

      <ImplementationNote title="Open question" tone="gap">
        The literal coordinate list behind <code>--squircle-polygon</code> was not present in the excerpts available
        to this analysis — only its declaration as a custom property and its usage site on UI tiles are confirmed.
        The squircle shown above is a generic approximation for illustration.
      </ImplementationNote>
    </PageContainer>
  );
}
