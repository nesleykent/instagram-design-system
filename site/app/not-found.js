import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>
        This page didn&rsquo;t make it into the <span className="gradient-text">manual</span>.
      </h1>
      <p className={styles.desc}>
        Either it moved, or it was never documented. Try search, or head back to the overview.
      </p>
      <Link href="/" className={styles.cta}>
        Back to overview
        <IconArrowRight size={16} />
      </Link>
    </div>
  );
}
