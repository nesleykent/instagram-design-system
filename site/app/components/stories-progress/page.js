import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import StoriesProgressDemo from "@/components/docs/StoriesProgressDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata = { title: "Stories Progress" };

export default function StoriesProgressPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Stories Progress"
        description="A flex row of pill segments that fill left-to-right via transform: scaleX, driven by an animation-duration set per-instance to match that story's display time exactly. Arguably the single most recognizable Instagram-specific component in this manual."
      />

      <Section kicker="Live" title="Watch it run, segment by segment" surface="dark">
        <ComponentShowcase surface="dark">
          <StoriesProgressDemo />
        </ComponentShowcase>
      </Section>

      <Section kicker="Implementation" title="The only major animation that's deliberately linear">
        <CodeBlock
          code={`.segment-fill {
  transform-origin: left;
  transform: scaleX(0);
  animation: fillProgressBar linear forwards;
  animation-duration: inherit; /* set per-instance to match story display time */
}
@keyframes fillProgressBar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`}
        />
        <p>
          Every other major animation in this system uses one of the five named easing curves (see Motion). This is
          the exception — because it&rsquo;s communicating elapsed real time, not expressing personality, it&rsquo;s
          explicitly <code>linear</code>.
        </p>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Set animation-duration to match the actual story display time, per segment.",
            "Keep the fill animation strictly linear — this is the one place where an eased curve would misrepresent elapsed time.",
            "Use a 3px pill radius on both the track and the fill.",
          ]}
          donts={[
            "Apply Ease Glide or any of the other named curves to the segment fill.",
            "Reuse this exact pattern for a generic loading bar that isn't tied to real elapsed time.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        In production this lives inside the Stories camera/viewer surface alongside the brand-logo progress bar
        pattern used on the about-page&rsquo;s scroll-driven hero sequence — the two share the same pill-segment
        shape grammar but serve different timing sources (real elapsed time vs. a fixed narrative duration).
      </ImplementationNote>
    </PageContainer>
  );
}
