import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import GradientStrip from "@/components/docs/GradientStrip";
import ColorSwatch from "@/components/docs/ColorSwatch";
import TokenGrid from "@/components/docs/TokenGrid";
import ScrimOverlayDemo from "@/components/docs/ScrimOverlayDemo";
import DepthDemo from "@/components/docs/DepthDemo";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import styles from "./color.module.css";

export const metadata = { title: "Colour" };

export default function ColorPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Colour"
        description="One fully-saturated gradient, sliced into every brand moment, sitting on top of a near-monochrome semantic system built for both light and dark."
      />

      <Section
        kicker="The brand gradient"
        title="A five-stop ramp, cropped a dozen ways"
        description="Every gradient on the about-page is a slice of the same underlying spectrum — never an independently-designed one-off."
      >
        <GradientStrip
          label="Full spectrum — 125deg"
          css="linear-gradient(125deg, #FFD600 15%, #FF7A00 30%, #FF0169, #D300C5 70%, #7638FA 85%)"
          angle="125deg · the uncropped 5-stop ramp"
          height={88}
          stops={[
            { name: "Yellow", hex: "#FFD600", position: "15%" },
            { name: "Orange", hex: "#FF7A00", position: "30%" },
            { name: "Rose", hex: "#FF0169", position: "50%" },
            { name: "Magenta", hex: "#D300C5", position: "70%" },
            { name: "Purple", hex: "#7638FA", position: "85%" },
          ]}
        />
        <GradientStrip
          label="Hero crop — the about-page default"
          css="linear-gradient(72.44deg, #FF0169 4.69%, #D300C5 48.96%, #7638FA 92.19%)"
          angle="72.44deg · rose → purple"
          height={88}
          stops={[
            { name: "Rose", hex: "#FF0169", position: "4.69%" },
            { name: "Magenta", hex: "#D300C5", position: "48.96%" },
            { name: "Purple", hex: "#7638FA", position: "92.19%" },
          ]}
        />
        <div className={styles.textGradientRow}>
          <p className={styles.textGradientSample} style={{ backgroundImage: "linear-gradient(to right, #D300C5, #FF7A00, #FFD600)" }}>
            Hover text fill
          </p>
          <p className={styles.textGradientSample} style={{ backgroundImage: "linear-gradient(#F7D440, #ED1F1F)" }}>
            <span className={styles.underlineDemo}>Nav link underline</span>
          </p>
        </div>
        <ImplementationNote title="Lower-confidence variant" tone="gap">
          A closely related secondary palette (<code>#FFD400 / #FF7000 / #FF0067 / #E700CB / #7F33FF</code>) appears
          at different angles in the production bundles — near-identical hue positions, slightly shifted hex values.
          Selector context couldn&rsquo;t confirm which surfaces use it; default to the primary family above for new
          work.
        </ImplementationNote>
      </Section>

      <Section
        kicker="Semantic tokens"
        title="Light and dark, paired by design"
        description="Dark mode isn't an inverted light mode — pure black/white are explicitly avoided in favor of a deliberate soft-black background and soft-white text."
      >
        <TokenGrid min="220px">
          <ColorSwatch name="Primary background" token="--ig-primary-bg" light="255, 255, 255" dark="12, 16, 20" />
          <ColorSwatch name="Secondary background" token="--ig-secondary-bg" light="243, 245, 247" dark="37, 41, 46" />
          <ColorSwatch name="Elevated background" token="--ig-elevated-bg" light="255, 255, 255" dark="33, 35, 40" />
          <ColorSwatch name="Primary text" token="--ig-primary-text" light="0, 0, 0" dark="245, 245, 245" />
          <ColorSwatch name="Secondary text" token="--ig-secondary-text" light="115, 115, 115" dark="168, 168, 168" />
          <ColorSwatch name="Tertiary text" token="--ig-tertiary-text" light="115, 115, 115" dark="199, 199, 199" />
          <ColorSwatch name="Highlight / hover fill" token="--ig-highlight-bg" light="239, 239, 239" dark="38, 38, 38" />
          <ColorSwatch name="Separator" token="--ig-separator" light="219, 219, 219" dark="38, 38, 38" />
          <ColorSwatch name="Stroke" token="--ig-stroke" light="219, 219, 219" dark="85, 85, 85" />
        </TokenGrid>
      </Section>

      <Section
        kicker="Fixed semantics"
        title="Some colours never theme-swap"
        description="Their meaning depends on consistency, not on matching the surrounding surface."
      >
        <TokenGrid min="200px">
          <ColorSwatch name="Primary button" token="--ig-primary-button" light="0, 149, 246" usage="#0095F6 — the signature link/button blue" />
          <ColorSwatch name="Error / destructive" token="--ig-error" light="237, 73, 86" />
          <ColorSwatch name="Success" token="--ig-success" light="88, 195, 34" />
          <ColorSwatch name="Live badge" token="--ig-live-badge" light="255, 1, 105" />
          <ColorSwatch name="Close Friends" token="--ig-close-friends" light="28, 209, 79" />
          <ColorSwatch name="Subscribers only" token="--ig-subscribers-only" light="118, 56, 250" usage="Matches --gradient-purple exactly" />
          <ColorSwatch name="Outgoing DM bubble" token="--ig-outgoing-bubble" light="74, 93, 249" />
        </TokenGrid>
      </Section>

      <Section
        kicker="Overlay & scrim system"
        title="Photography never carries text alone"
        description="Every text-on-image instance pairs with a directional black-to-transparent scrim, so the image stays partially visible rather than sitting behind a flat box."
      >
        <ScrimOverlayDemo />
      </Section>

      <Section
        kicker="Depth"
        title="Blur at two scales"
        description="20px for modal/sheet scrims, 100px for large ambient cover-style backdrops — drag to compare."
      >
        <DepthDemo />
      </Section>

      <Section kicker="Architecture" title="Three layers, one direction of authorship">
        <div className={styles.layers}>
          <div className={styles.layer}>
            <p className={styles.layerName}>1. Foundation</p>
            <code>--fds-*</code> <code>--web-always-*</code>
            <p className={styles.layerDesc}>Shared Meta-wide infrastructure. Not Instagram-specific.</p>
          </div>
          <div className={styles.layer} data-emphasis="true">
            <p className={styles.layerName}>2. Semantic</p>
            <code>--ig-*</code>
            <p className={styles.layerDesc}>Instagram's own naming of roles on top of the foundation. Write new code against this layer.</p>
          </div>
          <div className={styles.layer}>
            <p className={styles.layerName}>3. Compiled atomic</p>
            <code>._a8y9</code> <code>._x8exfn3</code>
            <p className={styles.layerDesc}>Auto-generated build output. Never hand-author.</p>
          </div>
        </div>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Apply the brand gradient as a whole-surface treatment — backgrounds, large text-fills.",
            "Use rgb(var(--ig-token)) / rgba(var(--ig-token), alpha), never a hard-coded hex, for anything theme-adaptive.",
            "Pair text over photography with a directional scrim gradient.",
          ]}
          donts={[
            "Use the gradient as a small UI accent (button fill, icon tint) — it's a whole-surface treatment only.",
            "Assume every multi-value custom property is comma-separated — some highlight-background tokens use space-separated triplets.",
            "Invent a sixth gradient stop or a new angle for a one-off brand moment.",
          ]}
        />
      </Section>

      <ImplementationNote title="Open question" tone="gap">
        <code>--ig-link</code> was found with two values (<code>0, 55, 107</code> and <code>224, 241, 255</code>) that
        don&rsquo;t cleanly resolve to a confident light/dark pairing — the &ldquo;light&rdquo; value is itself very
        pale, suggesting it may back a link-preview chip rather than link text colour. Verify before reusing.
      </ImplementationNote>
    </PageContainer>
  );
}
