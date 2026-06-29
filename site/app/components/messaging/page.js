import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ChatBubbleDemo from "@/components/docs/ChatBubbleDemo";
import ColorSwatch from "@/components/docs/ColorSwatch";
import TokenGrid from "@/components/docs/TokenGrid";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";

export const metadata = { title: "Messaging" };

export default function MessagingPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Messaging"
        description="A dedicated colour pair, a functional tail notch (not a decorative flourish), and a dedicated Optimistic DM type cut suggest this surface gets its own optical tuning distinct from the rest of the product."
      />

      <Section kicker="Live" title="The tail is a real clip-path">
        <ComponentShowcase
          codeLabel="Bubble tail"
          code={`.tail {
  width: 24px; height: 6px;
  clip-path: path("M 24 0 Q 19.5 0 18 2.571 Q 16.5 6 12 6 Q 7.5 6 6 2.571 Q 4.5 0 0 0 Z");
}`}
        >
          <ChatBubbleDemo />
        </ComponentShowcase>
      </Section>

      <Section kicker="Tokens" title="A dedicated colour pair">
        <TokenGrid min="200px">
          <ColorSwatch name="Outgoing bubble" token="--ig-outgoing-bubble" light="74, 93, 249" usage="Periwinkle blue — fixed, doesn't theme-swap" />
          <ColorSwatch name="Incoming bubble" token="--ig-incoming-bubble" light="243, 245, 247" dark="37, 41, 46" />
        </TokenGrid>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use the exact 24×6 unit path for the tail — it's a precise, symmetric Bézier shape, not an approximation.",
            "Keep the outgoing bubble colour fixed across light/dark — it's intentionally theme-independent.",
            "Round the bubble's near corner to 4px (vs. 18px elsewhere) so the tail reads as part of the same shape.",
          ]}
          donts={[
            "Reuse the chat-bubble tail path for an unrelated tooltip or callout — it's sized and proportioned specifically for this bubble radius.",
            "Apply the incoming bubble's light/dark pairing to the outgoing bubble — only one side themes.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        A dedicated <code>Optimistic DM</code> <code>@font-face</code> exists in the production bundle, separate
        from <code>Optimistic Text</code> — strong evidence this surface receives its own optical tuning. No further
        detail on the cut's specific metrics was available in the source excerpts analyzed.
      </ImplementationNote>
    </PageContainer>
  );
}
