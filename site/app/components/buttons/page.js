import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import IGButton from "@/components/docs/IGButton";
import TokenGrid from "@/components/docs/TokenGrid";
import ColorSwatch from "@/components/docs/ColorSwatch";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = {
  title: "Buttons",
  description: "A three-tier hierarchy, not a binary primary/secondary split — production tokens confirm primary, secondary, and tertiary backgrounds, borders, hover, and…",
};

export default function ButtonsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Buttons"
        description="A three-tier hierarchy, not a binary primary/secondary split — production tokens confirm primary, secondary, and tertiary backgrounds, borders, hover, and text colours all exist as distinct, named roles."
      />

      <Section kicker="Live" title="Hover and click — these are real" description="Every state below is the actual CSS hover/disabled behaviour, not a screenshot.">
        <ComponentShowcase
          codeLabel="Variant markup"
          code={`<button class="ig-button" data-variant="primary">Follow</button>
<button class="ig-button" data-variant="secondary">Following</button>
<button class="ig-button" data-variant="tertiary">Learn more</button>`}
        >
          <IGButton variant="primary">Follow</IGButton>
          <IGButton variant="secondary">Following</IGButton>
          <IGButton variant="tertiary">Learn more</IGButton>
          <IGButton variant="primary" disabled>
            Disabled
          </IGButton>
        </ComponentShowcase>
      </Section>

      <Section kicker="Tokens" title="Token values from /ig">
        <TokenGrid min="200px">
          <ColorSwatch name="Primary" token="--ig-primary-button" light="0, 149, 246" usage="Hover: --ig-primary-button-hover (24, 119, 242)" />
          <ColorSwatch name="Secondary background" token="--ig-secondary-button-background" light="239, 239, 239" dark="54, 54, 54" usage="Hover: --ig-secondary-button-hover (219, 219, 219 / 38, 38, 38)" />
          <ColorSwatch name="Secondary label" token="--ig-secondary-button" light="38, 38, 38" dark="250, 250, 250" usage="Used by /ig as the secondary button's text colour" />
          <ColorSwatch name="Tertiary background" token="--ig-tertiary-button-background" light="255, 255, 255" usage="Same value in both /ig theme scopes. Hover: --ig-tertiary-button-hover (245, 245, 245)" />
          <ColorSwatch name="Tertiary border" token="--ig-tertiary-button-border" light="219, 219, 219" usage="Same value in both /ig theme scopes. Text: --ig-tertiary-button-text (38, 38, 38)" />
        </TokenGrid>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use primary for the single most important action on a surface — there should usually be one.",
            "Keep hover state to a flat background-colour shift — no shape, shadow, or layout change.",
            "Use var(--input-radius) (6px) for the corner radius — it's a token, not a magic number.",
          ]}
          donts={[
            "Add a fourth button tier — primary/secondary/tertiary covers every observed case, including on dark backgrounds.",
            "Combine colour change + shape change + shadow change on hover — no observed instance does this.",
            "Lower disabled opacity below 0.5 or remove the cursor: not-allowed affordance.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        Pill-radius CTA buttons (used for tags and compact actions elsewhere in this manual) are a distinct,
        smaller-scale pattern — see Dropdowns &amp; Selectors and Stories Progress — not a fourth button tier.
      </ImplementationNote>
    </PageContainer>
  );
}
