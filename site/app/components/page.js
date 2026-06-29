import Link from "next/link";
import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import { NAV } from "@/lib/nav";
import { getComponentGuidesByCategory } from "@/lib/component-guides";
import { IconArrowRight } from "@/components/Icons";
import styles from "./components.module.css";

export const metadata = { title: "Components" };

export default function ComponentsIndexPage() {
  const items = NAV.find((g) => g.group === "Components").items.filter((i) => i.title !== "Overview");
  const guideGroups = getComponentGuidesByCategory();
  const legacyItems = items.filter((item) => !Object.values(guideGroups).flat().some((guide) => guide.href === item.href));

  return (
    <PageContainer wide>
      <PageHeader
        eyebrow="Components"
        title="Every documented component"
        description="Each page below is a live, interactive recreation of a real pattern found in Instagram's production CSS — not a static mockup."
      />

      <section className={styles.group}>
        <div className={styles.groupHeader}>
          <h2>Complete component catalogue</h2>
          <p>Dedicated pages generated from the extracted /ig CSS evidence, grouped by component family.</p>
        </div>
        {Object.entries(guideGroups).map(([group, guides]) => (
          <div className={styles.subgroup} key={group}>
            <h3>{group}</h3>
            <div className={styles.grid}>
              {guides.map((guide) => (
                <Link key={guide.href} href={guide.href} className={styles.card}>
                  <h4>{guide.title}</h4>
                  <p>{guide.description}</p>
                  <span className={styles.cta}>
                    View component <IconArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.group}>
        <div className={styles.groupHeader}>
          <h2>Existing deep dives</h2>
          <p>Earlier focused pages remain available as supporting pattern studies.</p>
        </div>
        <div className={styles.grid}>
          {legacyItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.card}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <span className={styles.cta}>
                View component <IconArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
