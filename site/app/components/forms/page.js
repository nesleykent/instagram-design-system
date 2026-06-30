import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import IGInput from "@/components/docs/IGInput";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = { title: "Forms" };

export default function FormsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Forms"
        description="Limited evidence in the captured CSS confirms forms follow the same token discipline as everything else: no bespoke one-off treatment."
      />

      <Section kicker="Live" title="Focus the field — real :focus-visible, magenta ring" align="start">
        <ComponentShowcase align="start">
          <IGInput label="Username" placeholder="your.username" />
          <IGInput label="Email" placeholder="you@example.com" />
        </ComponentShowcase>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use var(--input-border-radius) (6px) for every text input, matching buttons and other input-shaped controls.",
            "Source border colour from the paired light/dark text-input-border token rather than a hard-coded grey.",
            "Show a clear, visible :focus-visible ring — see Accessibility.",
          ]}
          donts={[
            "Invent a bespoke radius or border treatment for a new form field — derive it from the confirmed field tokens.",
            "Remove the focus ring without a confirmed, equally visible replacement.",
          ]}
        />
      </Section>

      <ImplementationNote title="Honest scope" tone="gap">
        This page documents the confirmed input layer: border-colour tokens, the 6px radius, and the focus treatment.
        Validation states, multi-line textareas, selects, checkboxes, and radios were not confirmed in the captured
        CSS, so they should extend that field grammar instead of introducing a parallel forms system.
      </ImplementationNote>
    </PageContainer>
  );
}
