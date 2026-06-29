import Link from "next/link";
import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import { NAV } from "@/lib/nav";
import { IconArrowRight } from "@/components/Icons";
import styles from "./components.module.css";

export const metadata = { title: "Components" };

export default function ComponentsIndexPage() {
  const items = NAV.find((g) => g.group === "Components").items.filter((i) => i.title !== "Overview");

  return (
    <PageContainer wide>
      <PageHeader
        eyebrow="Components"
        title="Every documented component"
        description="Each page below is a live, interactive recreation of a real pattern found in Instagram's production CSS — not a static mockup."
      />
      <div className={styles.grid}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.cta}>
              View component <IconArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
