import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import MosaicGridDemo from "@/components/docs/MosaicGridDemo";
import StickyHeroDemo from "@/components/docs/StickyHeroDemo";
import ScrimOverlayDemo from "@/components/docs/ScrimOverlayDemo";
import ShimmerDemo from "@/components/docs/ShimmerDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = {
  title: "Imagery",
  description: "Imagery is the content; gradient and type are the frame. Creator photography is asymmetric and collaged, and crop ratios map directly to the same ratios the…",
};

export default function ImageryPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Imagery"
        description="Imagery is the content; gradient and type are the frame. Creator photography is asymmetric and collaged, and crop ratios map directly to the same ratios the product enforces for feed posts, portraits, and Stories."
      />

      <ImplementationNote title="On the art used in this section">
        This site can't license real Instagram creator photography. The tiles below use the brand gradient at
        varying angles as abstract stand-ins for photography slots — a deliberate, on-brand substitute, not a
        generic placeholder.
      </ImplementationNote>

      <Section
        kicker="Mosaic collage"
        title="Asymmetric, not gridded-and-equal"
        description="One cell is deliberately twice the size of its neighbors — the about-page's literal 'creator collage,' built from a CSS grid with explicit column/row spans rather than a uniform N×N grid."
      >
        <MosaicGridDemo />
      </Section>

      <Section
        kicker="Sticky pinned hero"
        title="The image arrives, then holds its position"
        description="Full-viewport photography pinned with position: sticky; top: 0 while a logo-morph sequence and text scroll independently around it."
      >
        <StickyHeroDemo />
      </Section>

      <Section
        kicker="Legibility"
        title="No text sits on unprotected photography"
        description="Every text-on-image instance in the source pairs with a scrim gradient — see Colour for the full overlay system."
      >
        <ScrimOverlayDemo />
      </Section>

      <Section
        kicker="Loading state"
        title="A shimmer, not a flat grey box"
        description="A skeleton background fills media containers before the real asset loads, visually consistent with the neutral palette."
      >
        <ShimmerDemo />
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Vary cell size within a single collage composition.",
            "Crop new creator photography to one of the three core ratios (1:1, 4:5, 9:16) used elsewhere in this manual.",
            "Pair text over photography with a scrim gradient — never place it directly on an unprotected image.",
          ]}
          donts={[
            "Build a uniform, equally-sized tile grid for editorial collage — the system's signature is asymmetry.",
            "Treat the about-page's 3:4 portrait card ratio as the product standard — it's a deliberately distinct editorial crop.",
            "Show a flat grey box while media loads — the established pattern is an animated shimmer.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        One isolated instance of <code>filter: invert(90%) brightness(70%)</code> was found applied to a media
        placeholder elsewhere in the source. With only one occurrence and no surrounding context, it's noted as a
        possible special-case treatment rather than a general imagery-filter rule, and isn't reproduced here.
      </ImplementationNote>
    </PageContainer>
  );
}
