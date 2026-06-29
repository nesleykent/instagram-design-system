import Link from "next/link";
import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import Section from "./Section";
import CodeBlock from "./CodeBlock";
import DoDontGrid from "./DoDontGrid";
import ImplementationNote from "./ImplementationNote";
import { IconArrowRight } from "../Icons";
import styles from "./ComponentGuidePage.module.css";

function GuidanceList({ items }) {
  return (
    <ul className={styles.guidanceList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AnatomyGrid({ items }) {
  return (
    <div className={styles.anatomyGrid}>
      {items.map((item, index) => (
        <div className={styles.anatomyItem} key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

function CrossRefCard({ crossRef, label = "Covered in full on" }) {
  return (
    <Link href={crossRef.href} className={styles.crossRefCard}>
      <span>
        {label} <strong>{crossRef.label}</strong>
      </span>
      <IconArrowRight size={16} />
    </Link>
  );
}

export default function ComponentGuidePage({ guide }) {
  const isEvidenced = guide.evidence === "documented" || guide.evidence === "inferred";

  return (
    <PageContainer>
      <PageHeader eyebrow={guide.category} title={guide.title} description={guide.description}>
        <div className={styles.meta}>
          <span className={styles.evidenceBadge} data-tier={guide.evidence}>
            {guide.evidence === "documented" && "Documented in /ig"}
            {guide.evidence === "inferred" && "Partially evidenced"}
            {guide.evidence === "none" && "Not found in /ig"}
          </span>
          <span>{guide.category}</span>
        </div>
      </PageHeader>

      {!isEvidenced && (
        <Section kicker="Evidence" title="Not part of Instagram's product">
          <ImplementationNote title="Why this page is short" tone="gap">
            <p>{guide.reason}</p>
          </ImplementationNote>
          {guide.closestAnalog && (
            <div className={styles.analogWrap}>
              <p className={styles.analogLabel}>If you need something in this space, the closest real pattern is:</p>
              <CrossRefCard crossRef={guide.closestAnalog} label="See" />
            </div>
          )}
        </Section>
      )}

      {isEvidenced && (
        <>
          <Section kicker="Findings" title="What's actually in /ig">
            <GuidanceList items={guide.findings} />
          </Section>

          {guide.anatomy && (
            <Section kicker="Anatomy" title="Anatomy">
              <AnatomyGrid items={guide.anatomy} />
            </Section>
          )}

          {guide.guidance && (
            <Section kicker="Guidance" title="Usage guidance">
              <GuidanceList items={guide.guidance} />
            </Section>
          )}

          {guide.doDont && (
            <Section kicker="Usage" title="Do / Don't">
              <DoDontGrid dos={guide.doDont.dos} donts={guide.doDont.donts} />
            </Section>
          )}

          {guide.code && (
            <Section kicker="Code" title="Evidence-backed CSS">
              <CodeBlock label={`${guide.title} — derived from /ig`} code={guide.code} />
            </Section>
          )}

          {guide.crossRef && (
            <Section kicker="See also" title="Covered in more depth elsewhere">
              <CrossRefCard crossRef={guide.crossRef} />
            </Section>
          )}

          {guide.evidence === "inferred" && (
            <ImplementationNote title="Confidence note" tone="gap">
              No selector or custom property specific to {guide.title.toLowerCase()} was found — the findings above
              describe the closest real evidence and how the general token system would apply, not a confirmed
              dedicated component.
            </ImplementationNote>
          )}
        </>
      )}
    </PageContainer>
  );
}
