import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import TypeTesterDemo from "@/components/docs/TypeTesterDemo";
import LegacyMenuDemo from "@/components/docs/LegacyMenuDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = { title: "Dropdowns & Selectors" };

export default function DropdownsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Dropdowns & Selectors"
        description="The about-page's type tester is the system's primary 'selector' pattern: equal-sized swatches that fill with the brand gradient on hover/active — functioning as both a typeface preview and the general template for any pick-one-of-several-options control."
      />

      <Section kicker="Live" title="Click a swatch to select it">
        <ComponentShowcase
          codeLabel="Selector swatch"
          code={`.swatch { width: 64px; height: 64px; border-radius: 16px; }
.swatch:hover, .swatch[data-active="true"] {
  background-image: var(--ig-gradient-hero);
  color: #fff;
}`}
        >
          <TypeTesterDemo />
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Legacy menu"
        title="A denser, simpler treatment"
        description="3px radius, semi-transparent border, layered shadow, 12px text. Disabled items stay visible at 55% opacity rather than being removed."
      >
        <ComponentShowcase>
          <LegacyMenuDemo />
        </ComponentShowcase>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use equal-sized swatch tiles for any 'choose one visual option' control — typefaces, colours, filters.",
            "Fill the swatch with the brand gradient on hover and on the active/selected state — they share the same visual treatment.",
            "Keep legacy dense menus for simple, low-frequency action lists rather than visual selection.",
          ]}
          donts={[
            "Use unequal swatch sizes within the same selector row.",
            "Remove a disabled legacy-menu item entirely — dim it to 55% opacity instead, matching the established pattern.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        The swatch fill technique (background-image swap on hover/active) is the same mechanism used for the
        rolling-chevron trigger state on cards and nav links — see Motion — reinforcing that hover and
        active/selected are treated as the same visual state in this system, not two different ones.
      </ImplementationNote>
    </PageContainer>
  );
}
