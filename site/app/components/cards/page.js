import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import EditorialCard from "@/components/docs/EditorialCard";
import UtilityCard from "@/components/docs/UtilityCard";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = { title: "Cards" };

export default function CardsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Cards"
        description="Two distinct families: the deep-dive editorial card for brand storytelling, and the legacy utility card for confirmation and share dialogs."
      />

      <Section
        kicker="Deep-dive editorial card"
        title="Portrait crop, rolling hover"
        description="aspect-ratio: 3/4, slides up on scroll-into-view, swaps to the rolling-chevron affordance on hover."
      >
        <ComponentShowcase
          codeLabel="Editorial card"
          code={`.card-image { aspect-ratio: 3 / 4; border-radius: 12px; }
.card:hover .card-image { transform: translateY(-4px); }
/* footer rolling-chevron — see Motion */`}
        >
          <EditorialCard title="Creators of 2025" angle={40} />
          <EditorialCard title="Behind the gradient" angle={120} />
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Utility card"
        title="Denser, modal-adjacent"
        description="6px radius, layered soft shadow, circular icon-only dismiss button matching the Circle shape primitive."
      >
        <ComponentShowcase
          codeLabel="Utility card"
          code={`.utility-card {
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1);
}`}
        >
          <UtilityCard />
        </ComponentShowcase>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use the editorial card for brand storytelling and creator-focused content.",
            "Use the utility card for confirmation, share, and other transient dialogs.",
            "Keep the dismiss control on a utility card circular, matching the Circle shape primitive.",
          ]}
          donts={[
            "Mix the two families — an editorial card's rolling-chevron hover doesn't belong on a utility dialog.",
            "Apply the editorial card's slide-up scroll entrance to a card that appears inside an already-open modal.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        The utility card&rsquo;s shadow value (<code>0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1)</code>) is
        shared with the legacy modal component — see Modals &amp; Panels.
      </ImplementationNote>
    </PageContainer>
  );
}
