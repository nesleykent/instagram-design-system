import Link from "next/link";
import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import Section from "./Section";
import CodeBlock from "./CodeBlock";
import DoDontGrid from "./DoDontGrid";
import ImplementationNote from "./ImplementationNote";
import { IconArrowRight } from "../Icons";
import styles from "./ComponentGuidePage.module.css";

const EVIDENCE_LABELS = {
  documented: "Documented in /ig",
  inferred: "Partially evidenced",
  none: "Not found in /ig",
};

function GuidanceList({ items }) {
  return (
    <ul className={styles.guidanceList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AnatomyList({ items }) {
  return (
    <ol className={styles.anatomyGrid}>
      {items.map((item, index) => (
        <li className={styles.anatomyItem} key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function SpecSheet({ items }) {
  return (
    <dl className={styles.specSheet}>
      {items.map((item) => (
        <div className={styles.specRow} key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StatesTable({ items, title }) {
  return (
    <table className={styles.statesTable}>
      <caption className="visually-hidden">Interaction states for {title}</caption>
      <thead>
        <tr>
          <th scope="col">State</th>
          <th scope="col">Behaviour</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className={styles.stateRow} key={item.name}>
            <th scope="row" className={styles.stateName}>{item.name}</th>
            <td className={styles.stateDesc}>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UsageSplit({ usage }) {
  return (
    <div className={styles.usageSplit}>
      <section className={styles.usageCol} data-kind="use" aria-labelledby="usage-use-heading">
        <h3 id="usage-use-heading" className={styles.usageLabel}>Use when</h3>
        <p>{usage.useWhen}</p>
      </section>
      <section className={styles.usageCol} data-kind="avoid" aria-labelledby="usage-avoid-heading">
        <h3 id="usage-avoid-heading" className={styles.usageLabel}>Avoid when</h3>
        <p>{usage.avoidWhen}</p>
      </section>
    </div>
  );
}

function ExampleCards({ items }) {
  return (
    <div className={styles.exampleGrid}>
      {items.map((item) => (
        <article className={styles.exampleCard} key={item.title}>
          <p className={styles.exampleContext}>{item.context}</p>
          <h3>{item.title}</h3>
          <p>{item.composition}</p>
          <p className={styles.exampleTokens}>{item.tokens}</p>
        </article>
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
          <span
            className={styles.evidenceBadge}
            data-tier={guide.evidence}
            aria-label={`Evidence tier: ${EVIDENCE_LABELS[guide.evidence]}`}
          >
            {EVIDENCE_LABELS[guide.evidence]}
          </span>
          <span>{guide.category}</span>
        </div>
      </PageHeader>

      {!isEvidenced && (
        <Section kicker="Scope" title="Platform scope boundary">
          <ImplementationNote title="Scope rationale" tone="gap">
            <p>{guide.reason}</p>
          </ImplementationNote>
          {guide.closestAnalog && (
            <div className={styles.analogWrap}>
              <p className={styles.analogLabel}>Closest Instagram pattern:</p>
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

          {guide.rationale && (
            <Section kicker="Rationale" title="Why this component exists">
              <p className={styles.rationale}>{guide.rationale}</p>
            </Section>
          )}

          {guide.usage && (
            <Section kicker="Usage" title="When to use it">
              <UsageSplit usage={guide.usage} />
            </Section>
          )}

          {guide.anatomy && (
            <Section kicker="Anatomy" title="Anatomy">
              <AnatomyList items={guide.anatomy} />
            </Section>
          )}

          {guide.spec && (
            <Section kicker="Specification" title="Spacing, colour, type, and motion">
              <SpecSheet items={guide.spec} />
            </Section>
          )}

          {guide.states && (
            <Section kicker="States" title="States">
              <StatesTable items={guide.states} title={guide.title} />
            </Section>
          )}

          {guide.examples && (
            <Section kicker="Examples" title="Real interface compositions">
              <ExampleCards items={guide.examples} />
            </Section>
          )}

          {guide.guidance && (
            <Section kicker="Guidance" title="Usage guidance">
              <GuidanceList items={guide.guidance} />
            </Section>
          )}

          {guide.accessibility && (
            <Section kicker="Accessibility" title="Accessibility">
              <GuidanceList items={guide.accessibility} />
            </Section>
          )}

          {guide.responsive && (
            <Section kicker="Responsive" title="Responsive behaviour">
              <GuidanceList items={guide.responsive} />
            </Section>
          )}

          {guide.doDont && (
            <Section kicker="Do / Don't" title="Do / Don't">
              <DoDontGrid dos={guide.doDont.dos} donts={guide.doDont.donts} />
            </Section>
          )}

          {guide.code && (
            <Section kicker="Code" title="Evidence-backed CSS">
              <CodeBlock label={`${guide.title} — derived from /ig`} code={guide.code} />
            </Section>
          )}

          {guide.engineeringNotes && (
            <Section kicker="Engineering" title="Engineering notes">
              <GuidanceList items={guide.engineeringNotes} />
            </Section>
          )}

          {guide.crossRef && (
            <Section kicker="See also" title="Covered in more depth elsewhere">
              <CrossRefCard crossRef={guide.crossRef} />
            </Section>
          )}

          {guide.evidence === "inferred" && (
            <ImplementationNote title="Confidence note" tone="gap">
              The specification above is derived from the established token system — spacing, radius, colour, type,
              and motion — and from neighbouring confirmed components rather than from a dedicated selector captured
              under this component name.
            </ImplementationNote>
          )}
        </>
      )}
    </PageContainer>
  );
}
