import Link from "next/link";
import { NAV } from "@/lib/nav";
import GradientStrip from "@/components/docs/GradientStrip";
import ColorSwatch from "@/components/docs/ColorSwatch";
import TokenGrid from "@/components/docs/TokenGrid";
import PrevNext from "@/components/PrevNext";
import { IconArrowRight } from "@/components/Icons";
import styles from "./page.module.css";

export const metadata = {
  title: "Overview · Instagram Brand Identity Manual",
  description: "Why this manual exists, how it was built, and the three pillars Instagram's own brand page names.",
};

// Components currently has 57 entries (overview + 9 hand-built pages +
// 47 generated guides) — cap the homepage preview so the directory stays
// scannable and point overflow at the full /components index.
const DIRECTORY_CAP = 10;

const PILLARS = [
  {
    title: "A custom typeface, for global scale",
    body: "Instagram Sans for brand storytelling, Optimistic for the product itself — each shipping dedicated optical cuts down to specific scripts, not just a Latin alphabet with fallbacks bolted on.",
    href: "/typography",
    cta: "Explore Typography",
  },
  {
    title: "Colour designed to illuminate and inspire",
    body: "One fully-saturated five-stop gradient, sliced into every brand moment, sitting on top of a near-monochrome semantic colour system built for both light and dark.",
    href: "/color",
    cta: "Explore Colour",
  },
  {
    title: "Layouts built to showcase community",
    body: "A 14-unit fluid grid measured in viewport width, full-bleed 100vh storytelling chapters, and an asymmetric mosaic for creator photography.",
    href: "/layout-grid",
    cta: "Explore Layout & Grid",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className="eyebrow">Source-backed brand identity manual</p>
          <h1 className={styles.heroTitle}>
            This is how Instagram <span className="gradient-text">actually builds</span> Instagram.
          </h1>
          <p className={styles.heroSubtitle}>
            Every documented rule on this site is traced to Instagram&rsquo;s own production CSS — ten source files,
            from a 4&nbsp;KB about-page stylesheet to two 950&nbsp;KB web-app bundles — and cross-checked against{" "}
            <a href="https://about.instagram.com/brand/" target="_blank" rel="noreferrer">
              about.instagram.com/brand
            </a>
            . Derived component guidance is marked as partially evidenced, and native platform concepts are marked
            not found in /ig as product-scope boundaries.
          </p>
          <div className={styles.heroActions}>
            <Link href="/typography" className={styles.primaryButton}>
              Start with Typography
              <IconArrowRight size={16} />
            </Link>
            <Link href="/tokens" className={styles.secondaryButton}>
              Browse all tokens
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.preview}>
        <p className="eyebrow">Tokens, visualized — not listed</p>
        <h2 className={styles.previewTitle}>Every value on this site renders as itself.</h2>
        <div className={styles.previewGrid}>
          <GradientStrip
            label="The hero gradient"
            css="linear-gradient(72.44deg, #FF0169 4.69%, #D300C5 48.96%, #7638FA 92.19%)"
            angle="72.44deg · the about-page default crop"
            height={140}
            stops={[
              { name: "Rose", hex: "#FF0169", position: "4.69%" },
              { name: "Magenta", hex: "#D300C5", position: "48.96%" },
              { name: "Purple", hex: "#7638FA", position: "92.19%" },
            ]}
          />
          <TokenGrid min="150px">
            <ColorSwatch name="Primary button" token="--ig-primary-button" light="0, 149, 246" usage="#0095F6 — the signature link/button blue" />
            <ColorSwatch name="Primary bg / text" token="--ig-primary-background" light="255, 255, 255" dark="12, 16, 20" />
            <ColorSwatch name="Error / destructive" token="--ig-error" light="237, 73, 86" />
            <ColorSwatch name="Success" token="--ig-success" light="88, 195, 34" />
          </TokenGrid>
        </div>
      </section>

      <section className={styles.pillars}>
        <p className="eyebrow">Instagram&rsquo;s own framing</p>
        <h2 className={styles.previewTitle}>
          &ldquo;We created a custom typeface, updated our gradient and color palette, and refined our approach to
          layout and design.&rdquo;
        </h2>
        <p className={styles.quoteSource}>— about.instagram.com/brand</p>
        <div className={styles.pillarGrid}>
          {PILLARS.map((pillar) => (
            <Link key={pillar.href} href={pillar.href} className={styles.pillarCard}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <span className={styles.pillarCta}>
                {pillar.cta}
                <IconArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.directory}>
        <p className="eyebrow">Everything in this manual</p>
        <h2 className={styles.previewTitle}>Browse by section.</h2>
        <div className={styles.directoryGroups}>
          {NAV.filter((g) => g.group !== "Get started").map((group) => {
            const visible = group.items.slice(0, DIRECTORY_CAP);
            const hiddenCount = group.items.length - visible.length;
            return (
              <div key={group.group} className={styles.directoryGroup}>
                <h3>{group.group}</h3>
                <ul>
                  {visible.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <span>{item.title}</span>
                        <IconArrowRight size={16} />
                      </Link>
                    </li>
                  ))}
                  {hiddenCount > 0 && (
                    <li>
                      <Link href="/components" className={styles.directoryMore}>
                        <span>+{hiddenCount} more in the full catalogue</span>
                        <IconArrowRight size={16} />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.prevNextWrap}>
        <PrevNext />
      </div>
    </div>
  );
}
