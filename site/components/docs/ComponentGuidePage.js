import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import Section from "./Section";
import CodeBlock from "./CodeBlock";
import ImplementationNote from "./ImplementationNote";
import ComponentGuideDemo from "./ComponentGuideDemo";
import { CSS_REFERENCES } from "@/lib/component-guides";
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

function PillList({ items }) {
  return (
    <div className={styles.pills}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function VisualExamples({ examples }) {
  return (
    <div className={styles.exampleGrid}>
      {examples.map((example, index) => (
        <article className={styles.exampleCard} key={example}>
          <div className={styles.exampleVisual} data-index={index}>
            <span />
            <span />
            <span />
          </div>
          <p>{example}</p>
        </article>
      ))}
    </div>
  );
}

function CssReferences({ refs }) {
  return (
    <div className={styles.sourceGrid}>
      {refs.map((refKey) => {
        const ref = CSS_REFERENCES[refKey];
        if (!ref) return null;

        return (
          <article className={styles.sourceCard} key={refKey}>
            <p className={styles.sourceTitle}>{ref.title}</p>
            <code>{ref.file}</code>
            <ul>
              {ref.fragments.map((fragment) => (
                <li key={fragment}>{fragment}</li>
              ))}
            </ul>
            <p>{ref.note}</p>
          </article>
        );
      })}
    </div>
  );
}

export default function ComponentGuidePage({ guide }) {
  return (
    <PageContainer>
      <PageHeader eyebrow={guide.category} title={guide.title} description={guide.description}>
        <div className={styles.meta}>
          <span>{guide.category}</span>
          <span>{guide.cssRefs.length} CSS evidence groups</span>
          <span>Static documentation page</span>
        </div>
      </PageHeader>

      <Section kicker="Overview" title="Overview">
        <p className={styles.lede}>{guide.overview}</p>
      </Section>

      <Section kicker="Purpose" title="Purpose">
        <p className={styles.lede}>{guide.purpose}</p>
      </Section>

      <Section kicker="Principles" title="Design Principles">
        <GuidanceList items={guide.principles} />
      </Section>

      <Section kicker="Anatomy" title="Anatomy">
        <AnatomyGrid items={guide.anatomy} />
      </Section>

      <Section kicker="Variants" title="Variants">
        <PillList items={guide.variants} />
      </Section>

      <Section kicker="States" title="States">
        <PillList items={guide.states} />
      </Section>

      <Section kicker="Interaction" title="Interaction Behaviour">
        <GuidanceList items={guide.interactions} />
      </Section>

      <Section kicker="Motion" title="Motion">
        <GuidanceList items={guide.motion} />
      </Section>

      <Section kicker="Layout" title="Layout Guidance">
        <GuidanceList items={guide.layout} />
      </Section>

      <Section kicker="Responsive" title="Responsive Behaviour">
        <GuidanceList items={guide.responsive} />
      </Section>

      <Section kicker="Accessibility" title="Accessibility Guidance">
        <GuidanceList items={guide.accessibility} />
      </Section>

      <Section kicker="Best practices" title="Best Practices">
        <GuidanceList items={guide.bestPractices} />
      </Section>

      <Section kicker="Common mistakes" title="Common Mistakes">
        <GuidanceList items={guide.commonMistakes} />
      </Section>

      <Section kicker="Examples" title="Real Visual Examples">
        <VisualExamples examples={guide.visualExamples} />
      </Section>

      <Section kicker="Live demo" title="Interactive Demonstration">
        <ComponentGuideDemo guide={guide} />
      </Section>

      <Section kicker="Implementation" title="Implementation Notes">
        <ImplementationNote title={`${guide.title} implementation`}>
          {guide.implementationNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </ImplementationNote>
      </Section>

      <Section kicker="CSS" title="Relevant CSS References Extracted From /ig">
        <CssReferences refs={guide.cssRefs} />
      </Section>

      <Section kicker="Code" title="Production Code Example">
        <CodeBlock label={`${guide.title} primitive`} code={guide.code} />
      </Section>
    </PageContainer>
  );
}
