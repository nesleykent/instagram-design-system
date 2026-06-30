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

const PRODUCT_FONT = "var(--font-family-product)";
const BRAND_FONT = "var(--font-family-brand)";
const BRAND_HEADLINE_FONT = "var(--font-family-brand-headline)";
const BRAND_CONDENSED_FONT = "var(--font-family-brand-condensed)";
const BRAND_SCRIPT_FONT = "var(--font-family-brand-script)";

export default function TypographyPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Two separate type systems, one fallback philosophy: Optimistic runs the product, Instagram Sans runs the brand. Both treat non-Latin scripts as first-class citizens, not fallback fonts."
      />

      <ImplementationNote title="How this page renders type">
        This site now loads the local font files available in the repository: <code>Optimistic</code> for product/UI
        surfaces and <code>Instagram Sans</code> for brand/editorial surfaces. The bundled Optimistic file is the
        variable family used by the product CSS; the local Instagram Sans files cover Regular, Light, Medium, Bold,
        and Headline. Condensed, Script, and Squeeze remain documented family names with the manual&rsquo;s fallback
        behaviour because those binaries are not present in this repository.
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
            fontFamily={PRODUCT_FONT}
          />
          <TypeSpecimen
            label="Instagram Sans"
            meta="Brand & marketing · weights 300–700"
            text="Creators"
            fontSize={42}
            fontWeight={400}
            fontFamily={BRAND_FONT}
          />
        </div>
        <p className={styles.caption}>
          Fallback stack used by Optimistic Display: <code>Optimistic Display, Montserrat, Helvetica, Arial, Noto Sans, sans-serif</code> —
          Montserrat is a deliberate second choice for its geometric kinship, not a generic system font.
        </p>
      </Section>

      <Section
        kicker="Instagram Sans"
        title="Seven cuts, one family — plus a standalone squeeze"
        description="Regular is the about-page workhorse. Headline is reserved for the largest display moments. Condensed and Script appear in the interactive type-tester (see Dropdowns & Selectors) with both weight variants. Instagram Squeeze ships as a separate family, not a sub-cut — it falls back to the system font stack rather than to Instagram Sans."
      >
        <TokenGrid min="260px">
          <TypeSpecimen label="Regular · 400" text="Instagram" fontSize={28} fontWeight={400} fontFamily={BRAND_FONT} />
          <TypeSpecimen label="Light · 300" text="Instagram" fontSize={28} fontWeight={300} fontFamily={BRAND_FONT} />
          <TypeSpecimen label="Medium · 500" text="Instagram" fontSize={28} fontWeight={500} fontFamily={BRAND_FONT} />
          <TypeSpecimen label="Bold · 700" text="Instagram" fontSize={28} fontWeight={700} fontFamily={BRAND_FONT} />
          <TypeSpecimen label="Headline" meta="Display-only optical cut · shipped as .otf" text="Instagram" fontSize={28} fontWeight={400} letterSpacing={-1} fontFamily={BRAND_HEADLINE_FONT} />
          <TypeSpecimen label="Condensed · 400" meta="Tight-width display · documented fallback" text="Instagram" fontSize={28} fontWeight={400} letterSpacing={-1.5} fontFamily={BRAND_CONDENSED_FONT} />
          <TypeSpecimen label="Condensed · 700" meta="Tight-width display, bold · documented fallback" text="Instagram" fontSize={28} fontWeight={700} letterSpacing={-2} fontFamily={BRAND_CONDENSED_FONT} />
          <TypeSpecimen label="Script · 400" meta="Editorial flourish · documented fallback" text="Instagram" fontSize={28} fontWeight={400} fontFamily={BRAND_SCRIPT_FONT} />
          <TypeSpecimen label="Script · 700" meta="Editorial flourish, bold · documented fallback" text="Instagram" fontSize={28} fontWeight={700} fontFamily={BRAND_SCRIPT_FONT} />
        </TokenGrid>
      </Section>

      <Section
        kicker="Typeface DNA"
        title="From glyph to letterform"
        description="Instagram Sans was designed from the inside out — the same squircle geometry that gives the app icon its shape flows directly into the letterforms."
      >
        <TokenGrid min="240px">
          {[
            { label: "The squircle origin", note: "Every curved stroke in Instagram Sans derives from the space between a perfect circle and a square — the same mathematical form behind the app icon's corner radius." },
            { label: "Sheared terminals", note: "Stroke endings are cut at an angle rather than perfectly horizontal, suggesting the natural flick of a human hand and breaking from pure geometric rigour." },
            { label: "The 'a' teardrop", note: "The interior counter of the lowercase 'a' is an explicit teardrop — a deliberate quirk that distinguishes the typeface from generic grotesques at every display size." },
            { label: "The 'Q' tail", note: "The Q carries a distinctive tail treatment that extends the circular motif rather than cutting through it, another recognisable departure from standard grotesque conventions." },
            { label: "Circular punctuation", note: "Circular motifs appear in the typeface's punctuation marks — periods, colons, bullet points — reinforcing the glyph-derived geometric vocabulary at the smallest typographic elements." },
            { label: "Heritage", note: "The typeface is a contemporary evolution of Instagram's 2010 wordmark, updated in 2013 and then formalised as a custom type system — not a commissioned typeface built from scratch." },
          ].map((item) => (
            <div key={item.label} className={styles.scriptCard}>
              <p className={styles.scriptName}>{item.label}</p>
              <p className={styles.scriptNote}>{item.note}</p>
            </div>
          ))}
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
            <TypeSpecimen key={name} label={`--font-weight-system-${name}`} meta={String(weight)} text="Ag" fontSize={36} fontWeight={weight} fontFamily={PRODUCT_FONT} />
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

      <ImplementationNote title="Instagram Squeeze — partially resolved">
        The production bundle confirms <code>font-family: &quot;Instagram Squeeze&quot;, var(--font-family-system)</code> — note
        the fallback: <strong>the system font stack, not Instagram Sans</strong>. This makes Squeeze a standalone family,
        not a sub-cut. The name implies ultra-compressed letterforms for tight headline slots, but the selector context
        wasn&rsquo;t captured, so the surface that uses it inside the product remains unconfirmed. Do not conflate it
        with Instagram Sans Condensed, which is a confirmed sub-cut that falls back to Instagram Sans.
      </ImplementationNote>

      <ImplementationNote title="@font-face source boundary" tone="gap">
        The captured CSS includes Optimistic <code>@font-face</code> declarations directly. Instagram Sans is evidenced
        by the local binaries (<code>Instagram Sans.ttf</code>, <code>Light.ttf</code>, <code>Medium.ttf</code>,{" "}
        <code>Bold.ttf</code>, <code>Headline.otf</code>) and extensive <code>font-family</code> usage across /ig files,
        so the site maps those local cuts to the same family names the manual documents.
      </ImplementationNote>
    </PageContainer>
  );
}
