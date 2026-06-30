import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import IGNavLink from "@/components/docs/IGNavLink";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = {
  title: "Links & Navigation",
  description: "The nav link is a ghost button with an underline that grows in from the left on hover — not a static underline that's merely revealed.",
};

export default function LinksNavigationPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Links & Navigation"
        description="The nav link is a ghost button with an underline that grows in from the left on hover — not a static underline that's merely revealed."
      />

      <Section kicker="Live" title="Hover to grow the underline" description="The underline is a small yellow-to-red gradient, animated with scaleX and Ease Settle.">
        <ComponentShowcase
          codeLabel="The underline-grow treatment"
          code={`.nav-link { position: relative; padding-bottom: 4px; }
.nav-link::before {
  content: ""; position: absolute; left: 0; top: 100%;
  width: 100%; height: 2px;
  background-image: linear-gradient(#F7D440, #ED1F1F);
  transform: scaleX(0); transform-origin: left;
  transition: transform .5s cubic-bezier(0, .61, .28, .92);
}
.nav-link:hover::before { transform: scaleX(1); }`}
        >
          <IGNavLink>About</IGNavLink>
          <IGNavLink>Brand</IGNavLink>
          <IGNavLink>Careers</IGNavLink>
          <IGNavLink disabled>Current page</IGNavLink>
        </ComponentShowcase>
      </Section>

      <Section
        kicker="Disabled state"
        title="Structurally inert, not just dimmed"
        description="A disabled or current-page link removes the hover colour change and the underline entirely (height: 0; no background-image) rather than just lowering its opacity. Hover the disabled link above — nothing happens, by design."
      />

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Animate the underline with transform: scaleX, not width — it composites on the GPU and doesn't trigger layout.",
            "Use Ease Settle (cubic-bezier(0, .61, .28, .92)) for this specific interaction — it's the system's token for nav underline-grow and panel slide-up.",
            "Remove affordance structurally for disabled/current items.",
          ]}
          donts={[
            "Give a disabled nav item a dimmed-but-present underline — remove it entirely.",
            "Reuse the yellow-to-red underline gradient as a generic accent elsewhere — it's specific to this interaction.",
            "Animate width or left/right instead of transform: scaleX.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        This is a small, secondary accent gradient (yellow → red), distinct from the five-stop brand spectrum
        documented on Colour — it exists specifically for this hover treatment and the about-page's brand-logo
        progress bar, not as a general-purpose accent.
      </ImplementationNote>
    </PageContainer>
  );
}
