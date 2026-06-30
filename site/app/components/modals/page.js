import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ComponentShowcase from "@/components/docs/ComponentShowcase";
import ModalDemo from "@/components/docs/ModalDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata = {
  title: "Modals & Panels",
  description: "Two distinct elevation behaviours depending on context — a full-height slide-up panel, and a lightbox zoom-settle — plus a legacy utility modal for simple…",
};

export default function ModalsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Components"
        title="Modals & Panels"
        description="Two distinct elevation behaviours depending on context — a full-height slide-up panel, and a lightbox zoom-settle — plus a legacy utility modal for simple confirmations."
      />

      <Section kicker="Live" title="Click to open — real overlays, real easing">
        <ComponentShowcase>
          <ModalDemo />
        </ComponentShowcase>
      </Section>

      <Section kicker="Technique" title="Corner-clipping without overflow: hidden">
        <CodeBlock
          code={`clip-path: inset(0 0 0 0 round var(--dialog-corner-radius));
/* --modal-border-radius: 12px */`}
        />
        <p>
          Modern modals clip to rounded corners this way rather than <code>overflow: hidden</code> — inner content
          can scroll without the older overflow-clipping side effects (scrollbar gutter, repaint cost) while still
          guaranteeing rounded corners.
        </p>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use the slide-up panel (Ease Settle) for full-height contextual surfaces.",
            "Use the zoom-settle lightbox (Ease Confident) for media viewers.",
            "Toggle visibility alongside the transform so a closed panel is unreachable by keyboard/AT.",
          ]}
          donts={[
            "Use overflow: hidden to clip modal corners when clip-path: inset(... round ...) is available.",
            "Mix the panel's slide-up entrance with the lightbox's zoom-settle in the same component.",
            "Leave a closed modal in the DOM as focusable — see Accessibility.",
          ]}
        />
      </Section>

      <ImplementationNote title="Implementation note">
        The legacy utility modal (565px fixed width, 6px radius, layered shadow) is documented on Cards — it predates
        the panel/lightbox pattern and is reserved for simple confirmation and share dialogs.
      </ImplementationNote>
    </PageContainer>
  );
}
