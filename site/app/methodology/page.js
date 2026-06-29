import Link from "next/link";
import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import TokenGrid from "@/components/docs/TokenGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import { COMPONENT_GUIDES } from "@/lib/component-guides";
import styles from "./methodology.module.css";

export const metadata = { title: "Methodology" };

const SOURCE_CONFIDENCE = [
  {
    tier: "High",
    color: "rgb(88, 195, 34)",
    desc: "Fully read, small, about-page-specific file; selector and full rule context available.",
    example: "The 72.44deg hero gradient, the rolling-chevron keyframes, the type-tester structure.",
  },
  {
    tier: "Medium",
    color: "var(--ig-stop-orange)",
    desc: "The same value appears independently in both an about-page file and a production bundle.",
    example: "#FFD600 matching --gradient-yellow; the brand gradient's hues matching --ig-subscribers-only.",
  },
  {
    tier: "Low",
    color: "rgb(var(--ig-error))",
    desc: "Found only via pattern search in a ~950 KB production bundle, without surrounding selector context.",
    example: "The 'alt' gradient family, some light/dark token pairings, the literal --squircle-polygon coordinates.",
  },
];

const COMPONENT_EVIDENCE_COUNTS = COMPONENT_GUIDES.reduce(
  (counts, guide) => {
    counts[guide.evidence] += 1;
    return counts;
  },
  { documented: 0, inferred: 0, none: 0 }
);

const COMPONENT_EVIDENCE = [
  {
    tier: "Documented",
    count: COMPONENT_EVIDENCE_COUNTS.documented,
    color: "rgb(88, 195, 34)",
    desc: "A selector, class, or custom property in /ig backs the component directly, with the finding cited on the page.",
    example: "Buttons, Search Fields, Toggles, Tab Bars, Action Sheets, and Stories Progress.",
  },
  {
    tier: "Partially evidenced",
    count: COMPONENT_EVIDENCE_COUNTS.inferred,
    color: "var(--ig-stop-orange)",
    desc: "No component-specific selector was found, but the specification is derived from established Instagram tokens and neighbouring confirmed patterns.",
    example: "Sliders borrow Toggle's 28px thumb; Alerts borrow the modal radius, backdrop, and destructive colour.",
  },
  {
    tier: "Not found in /ig",
    count: COMPONENT_EVIDENCE_COUNTS.none,
    color: "rgb(var(--ig-error))",
    desc: "The captured CSS does not support the concept, usually because it is a native OS component rather than an Instagram web/product pattern.",
    example: "Dock Menus, Menu Bar, Virtual Keyboards, Activity Rings, Gauges, and Rating Indicators.",
  },
];

const OPEN_QUESTIONS = [
  { q: "Which exact surfaces use the 'primary' vs. 'alt' brand gradient family?", href: "/color" },
  { q: "What does --ig-link's pale-blue value actually back?", href: "/color" },
  { q: "What are the literal coordinates behind --squircle-polygon?", href: "/shape" },
  { q: "Is outline: none on one rule safely superseded elsewhere, or a real gap?", href: "/accessibility" },
  { q: "What does the Instagram Squeeze font family back?", href: "/typography" },
];

export default function MethodologyPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Resources"
        title="Methodology"
        description="How this manual — and this website — were built, what was scoped out and why, and exactly how confident each claim is."
      />

      <Section kicker="Architecture" title="Three token layers, one direction of authorship">
        <div className={styles.layers}>
          <div className={styles.layer}>
            <p className={styles.layerName}>1 · Foundation</p>
            <p>
              <code>--fds-*</code> <code>--web-always-*</code> <code>--system-*</code>
            </p>
            <p className={styles.layerDesc}>Shared Meta-wide infrastructure. Not Instagram-specific.</p>
          </div>
          <div className={styles.layer} data-emphasis="true">
            <p className={styles.layerName}>2 · Semantic</p>
            <p>
              <code>--ig-*</code>
            </p>
            <p className={styles.layerDesc}>Instagram's own naming of roles on top of the foundation. Write new work against this layer.</p>
          </div>
          <div className={styles.layer}>
            <p className={styles.layerName}>3 · Compiled atomic</p>
            <p>
              <code>._a8y9</code> <code>._x8exfn3</code>
            </p>
            <p className={styles.layerDesc}>Auto-generated build output. Never hand-author.</p>
          </div>
        </div>
      </Section>

      <Section kicker="Evidence" title="Source confidence tiers">
        <TokenGrid min="260px">
          {SOURCE_CONFIDENCE.map((c) => (
            <div key={c.tier} className={styles.confCard} style={{ borderTopColor: c.color }}>
              <p className={styles.confTier} style={{ color: c.color }}>
                {c.tier}
              </p>
              <p className={styles.confDesc}>{c.desc}</p>
              <p className={styles.confExample}>{c.example}</p>
            </div>
          ))}
        </TokenGrid>
      </Section>

      <Section kicker="Components" title="Component evidence badges stay visible">
        <TokenGrid min="260px">
          {COMPONENT_EVIDENCE.map((c) => (
            <div key={c.tier} className={styles.confCard} style={{ borderTopColor: c.color }}>
              <p className={styles.confTier} style={{ color: c.color }}>
                {c.tier}
              </p>
              <p className={styles.count}>{c.count} pages</p>
              <p className={styles.confDesc}>{c.desc}</p>
              <p className={styles.confExample}>{c.example}</p>
            </div>
          ))}
        </TokenGrid>
        <p className={styles.note}>
          Inferred pages are written confidently because the implementation is derived from established system
          tokens — spacing, radius, colour, type, motion, and neighbouring confirmed components — but the badge
          still tells readers that no dedicated selector was captured. Not-found pages stay short rather than
          pretending Instagram ships an unsupported native-platform pattern.
        </p>
      </Section>

      <Section kicker="Scope" title="What was scoped out, and why">
        <ul className={styles.scopeList}>
          <li>
            Legacy Facebook-platform utility classes (<code>.uiContextualLayer</code>, <code>#facebook .hidden_elem</code>,{" "}
            <code>.fb_logo</code>) inherited from Meta&rsquo;s shared static-asset pipeline — out of scope.
          </li>
          <li>Ads-manager and business-suite chrome — out of scope.</li>
          <li>
            Locale-specific fallback font stacks for scripts Instagram Sans/Optimistic don&rsquo;t cover directly —
            cited as evidence of internationalization commitment, not documented as Instagram-authored typefaces.
          </li>
          <li>
            Thousands of one-off component breakpoints — only values recurring across multiple unrelated
            components were promoted into the tier table on Layout &amp; Grid.
          </li>
        </ul>
      </Section>

      <Section kicker="Open questions" title="Unresolved, and exactly where">
        <div className={styles.questions}>
          {OPEN_QUESTIONS.map((item) => (
            <Link key={item.q} href={item.href} className={styles.question}>
              <span>{item.q}</span>
              <span className={styles.questionLink}>See {item.href.replace("/", "")} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section kicker="This website" title="Built the same way, with one addition">
        <p className={styles.note}>
          The site at <code>site/</code> is a Next.js app composed from the reusable component library documented
          throughout this manual. Every visual demo — the easing playground, the contrast checker, the Stories
          progress bar — runs real CSS and real WCAG math, not a screenshot. Component pages use the same
          badge system shown above: documented pages cite direct findings, partially evidenced pages derive from
          confirmed tokens, and not-found pages say so explicitly rather than inventing unsupported specs.
        </p>
      </Section>

      <ImplementationNote title="Reproducing this analysis">
        Full reads of every about-page-specific file in <code>ig/</code>; targeted <code>grep -oE</code> pattern
        extraction (gradients, custom properties, cubic-bezier, breakpoints, shape primitives) across all ten files
        for anything too large to read in full; cross-referencing extracted values against each other to promote
        Medium-confidence findings; one fetch of{" "}
        <a href="https://about.instagram.com/brand/" target="_blank" rel="noreferrer">
          about.instagram.com/brand
        </a>{" "}
        to corroborate the CSS-derived structure against Instagram&rsquo;s own stated framing.
      </ImplementationNote>
    </PageContainer>
  );
}
