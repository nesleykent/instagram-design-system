import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import TypeSpecimen from "@/components/docs/TypeSpecimen";
import TypeScaleTable from "@/components/docs/TypeScaleTable";
import FluidTypeDemo from "@/components/docs/FluidTypeDemo";
import TrackingDemo from "@/components/docs/TrackingDemo";
import TokenGrid from "@/components/docs/TokenGrid";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./typography.module.css";

export const metadata = { title: "Typography" };

const SYSTEM_SCALE = [
  { size: 10, lineHeight: 12 },
  { size: 11, lineHeight: 13 },
  { size: 12, lineHeight: 16 },
  { size: 14, lineHeight: 18 },
  { size: 16, lineHeight: 24 },
  { size: 18, lineHeight: 24 },
  { size: 22, lineHeight: 26 },
  { size: 24, lineHeight: 27 },
  { size: 26, lineHeight: 28 },
  { size: 28, lineHeight: 32 },
  { size: 32, lineHeight: 40 },
];

const SCRIPT_CUTS = [
  { name: "Latin", note: "Default cut" },
  { name: "Arbc (Arabic)", note: "Light / Medium / Bold optical cuts" },
  { name: "Viet (Vietnamese)", note: "Light / Medium / Bold, diacritic-aware" },
  { name: "Seol Sans W05", note: "Korean fallback layered beneath the brand stack" },
  { name: "Tazugane Info W05", note: "Japanese fallback" },
  { name: "M Ying Hei HK W05", note: "Hong Kong Chinese fallback" },
];

export default function TypographyPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Two separate type systems, one fallback philosophy: Optimistic runs the product, Instagram Sans runs the brand. Both treat non-Latin scripts as first-class citizens, not fallback fonts."
      />

      <ImplementationNote title="How this page renders type">
        This site cannot legally bundle Instagram Sans or Optimistic — both are Meta-proprietary. Every specimen
        below renders in your system&rsquo;s UI font stack, exactly the fallback tier Instagram&rsquo;s own CSS
        specifies after its custom fonts. Weights, sizes, tracking, and the fluid formula are all real; the glyph
        shapes are your OS&rsquo;s, not Instagram&rsquo;s.
      </ImplementationNote>

      <Section
        kicker="Two systems, two jobs"
        title="Optimistic runs the product. Instagram Sans runs the brand."
        description="They share a fallback philosophy — geometric, Helvetica-adjacent — but are never the same font file, and were never meant to be used interchangeably."
      >
        <div className={styles.pairGrid}>
          <TypeSpecimen
            label="Optimistic Display / Text / VF"
            meta="Product UI · weights 200–800"
            text="Following"
            fontSize={42}
            fontWeight={700}
          />
          <TypeSpecimen
            label="Instagram Sans"
            meta="Brand & marketing · weights 300–700"
            text="Creators"
            fontSize={42}
            fontWeight={400}
          />
        </div>
        <p className={styles.caption}>
          Fallback stack used by Optimistic Display: <code>Optimistic Display, Montserrat, Helvetica, Arial, Noto Sans, sans-serif</code> —
          Montserrat is a deliberate second choice for its geometric kinship, not a generic system font.
        </p>
      </Section>

      <Section
        kicker="Instagram Sans"
        title="Seven cuts, one family"
        description="Regular is the about-page workhorse. Headline is reserved for the largest display moments. Condensed and Script exist almost entirely for the interactive type-tester (see Dropdowns & Selectors)."
      >
        <TokenGrid min="260px">
          <TypeSpecimen label="Regular · 400" text="Instagram" fontSize={28} fontWeight={400} />
          <TypeSpecimen label="Light · 300" text="Instagram" fontSize={28} fontWeight={300} />
          <TypeSpecimen label="Medium · 500" text="Instagram" fontSize={28} fontWeight={500} />
          <TypeSpecimen label="Bold · 700" text="Instagram" fontSize={28} fontWeight={700} />
          <TypeSpecimen label="Headline" meta="Display-only optical cut" text="Instagram" fontSize={28} fontWeight={700} letterSpacing={-1} />
          <TypeSpecimen label="Condensed" meta="Tight-width display" text="Instagram" fontSize={28} fontWeight={600} letterSpacing={-1.5} />
          <TypeSpecimen label="Script" meta="Editorial flourish" text="Instagram" fontSize={28} fontWeight={400} fontStyle="italic" />
        </TokenGrid>
      </Section>

      <Section kicker="Weight scale" title="A named scale, not just numbers" description="Production tokens name every weight — not just the number.">
        <TokenGrid min="180px">
          {[
            ["extralight", 200],
            ["light", 300],
            ["regular", 400],
            ["medium", 500],
            ["semibold", 600],
            ["bold", 700],
            ["extrabold", 800],
          ].map(([name, weight]) => (
            <TypeSpecimen key={name} label={`--font-weight-system-${name}`} meta={String(weight)} text="Ag" fontSize={36} fontWeight={weight} />
          ))}
        </TokenGrid>
      </Section>

      <Section
        kicker="System UI type scale"
        title="11 paired sizes, from 10px to 32px"
        description="Line-height ratio compresses as size increases — standard professional tuning — except at 16px, the dominant body-copy size, which gets generous 1.5 spacing."
      >
        <TypeScaleTable rows={SYSTEM_SCALE} />
      </Section>

      <Section
        kicker="Brand display scale"
        title="Fluid by formula, not by breakpoint"
        description="The largest about-page type never jumps between fixed sizes — it scales continuously with the viewport via a calc() linear interpolation, only locking to a fixed pixel size past 1920px."
      >
        <FluidTypeDemo />
        <CodeBlock
          label="Other fluid/viewport-driven sizes on the about-page"
          code={`/* Hero type scroller */
font-size: 32.5vw;          /* 42vw at <=768px */
letter-spacing: -3px;

/* Giant centered numeral */
font-size: 43.2vh;          /* locks to 253px at <=750px */

/* Stat / headline number */
font-size: 110px;           /* 64px <=768px / 56px <=475px / 112px >=1920px */`}
        />
      </Section>

      <Section
        kicker="Tracking"
        title="Tight at display sizes, open at labels"
        description="Two opposite rules, both deliberate: headline-scale type tightens toward -3px to -4px; small uppercase labels open up to +0.5px through +1.88px."
      >
        <TrackingDemo />
      </Section>

      <Section
        kicker="Internationalization"
        title="Global scale is engineering, not an afterthought"
        description="Both type systems ship script-specific optical cuts rather than relying on the browser's generic fallback for non-Latin text — the clearest evidence in the codebase that “global scale” is a literal commitment."
      >
        <TokenGrid min="220px">
          {SCRIPT_CUTS.map((cut) => (
            <div key={cut.name} className={styles.scriptCard}>
              <p className={styles.scriptName}>{cut.name}</p>
              <p className={styles.scriptNote}>{cut.note}</p>
            </div>
          ))}
        </TokenGrid>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Pair Instagram Sans Headline only with its own fallback chain — never drop straight to Helvetica.",
            "Use the fluid calc() formula for new hero-scale type rather than adding another breakpoint.",
            "Apply -webkit-font-smoothing: antialiased anywhere a Light/200–300 weight renders on a flat background.",
          ]}
          donts={[
            "Use Optimistic and Instagram Sans interchangeably — Optimistic is product, Instagram Sans is brand.",
            "Tighten tracking on small UI text the way display type is tightened — negative tracking beyond -0.06em is reserved for display sizes.",
            "Assume a non-Latin script can fall back to the generic stack — Arabic and Vietnamese get dedicated optical cuts.",
          ]}
        />
      </Section>

      <ImplementationNote title="Open question" tone="gap">
        No <code>@font-face</code> block for Instagram Sans itself was found in the captured CSS — only Optimistic&rsquo;s
        was. Instagram Sans is evidenced here by shipped <code>.ttf</code>/<code>.otf</code> binaries and extensive{" "}
        <code>font-family</code> usage, not a captured <code>src:</code> declaration. The weight↔cut mapping above is
        derived, not literally read from source.
      </ImplementationNote>
    </PageContainer>
  );
}
