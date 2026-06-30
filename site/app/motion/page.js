import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import EasingPlayground from "@/components/docs/EasingPlayground";
import DurationScaleBars from "@/components/docs/DurationScaleBars";
import RollingChevronDemo from "@/components/docs/RollingChevronDemo";
import ClipPathRevealDemo from "@/components/docs/ClipPathRevealDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        description="Motion is infrequent and purposeful, not ambient. A small set of named easing curves, each reused consistently for the same kind of motion across unrelated components."
      />

      <Section
        kicker="Named easing curves"
        title="Five curves account for nearly every transition"
        description="Press play to watch the dot move using the real cubic-bezier value, graphed on the left."
      >
        <EasingPlayground />
      </Section>

      <Section
        kicker="Duration scale"
        title="From micro-feedback to brand sequences"
        description="666ms recurs exactly enough times across the about-page to read as a deliberate token, not a coincidence."
      >
        <DurationScaleBars />
      </Section>

      <Section
        kicker="Signature affordance"
        title="The rolling chevron"
        description="Hover any of these. The same animation — translateX(-100%) → 0 → 125%, 2s infinite, Ease Glide — appears near-identically on nav links, the type tester, and deep-dive cards. Three unrelated components, one shared signature."
      >
        <RollingChevronDemo />
      </Section>

      <Section
        kicker="Reveal pattern"
        title="Uncover, don't fade"
        description="Brand storytelling sections enter via a clip-path wipe rather than opacity alone — a deliberate 'uncovering' feeling."
      >
        <ClipPathRevealDemo />
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Match the easing curve to the kind of motion, per the curves above — don't pick one for how it 'feels' in isolation.",
            "Use the rolling-chevron pattern verbatim (timing, transform values) for a new hover-to-reveal affordance.",
            "Prefer a clip-path wipe over an opacity fade for brand storytelling section entrances.",
          ]}
          donts={[
            "Add ambient or looping motion to UI chrome beyond the established loops (rolling chevron, progress-bar fill, gradient rotation).",
            "Ship new about-page motion without a prefers-reduced-motion override — see Accessibility.",
            "Invent a sixth easing curve for a one-off moment when one of the five already fits.",
          ]}
        />
      </Section>

      <ImplementationNote title="Accessibility risk this site does not repeat" tone="gap">
        <code>@media (prefers-reduced-motion: reduce)</code> is present in the production app bundles but absent from
        every about-page-specific file analyzed — meaning visitors who&rsquo;ve asked their OS to reduce motion still
        receive the about-page&rsquo;s scroll-linked hero and infinite marquees at full intensity. This site
        respects the preference site-wide; see <code>app/globals.css</code>.
      </ImplementationNote>
    </PageContainer>
  );
}
