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
        description="Limited evidence in the captured CSS — what's present confirms inputs follow the same token discipline as everything else: no bespoke one-off treatment."
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
            "Invent a bespoke radius or border treatment for a new form field — none was found in source.",
            "Remove the focus ring without a confirmed, equally visible replacement.",
          ]}
        />
      </Section>

      <ImplementationNote title="Honest scope" tone="gap">
        This is the thinnest-evidence component page in the manual. Only border-colour and radius tokens for inputs
        were confirmed in the captured CSS — no evidence of validation-state styling, multi-line textarea
        treatment, or select/checkbox/radio specs was found. Don&rsquo;t treat the field above as a complete forms
        system; it's the honest extent of what the source supports.
      </ImplementationNote>
    </PageContainer>
  );
}
