"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPrevNext } from "@/lib/nav";
import { IconArrowLeft, IconArrowRight } from "./Icons";
import styles from "./PrevNext.module.css";

export default function PrevNext() {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  if (!prev && !next) return null;

  return (
    <nav className={styles.nav} aria-label="Page navigation">
      {prev ? (
        <Link href={prev.href} className={styles.card} data-side="prev">
          <span className={styles.rollWrap}>
            <IconArrowLeft size={16} className={styles.icon} />
            <span className={styles.roll} aria-hidden="true">
              <IconArrowLeft size={16} />
            </span>
          </span>
          <span className={styles.text}>
            <span className={styles.label}>Previous</span>
            <span className={styles.title}>{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className={styles.card} data-side="next">
          <span className={styles.text}>
            <span className={styles.label}>Next</span>
            <span className={styles.title}>{next.title}</span>
          </span>
          <span className={styles.rollWrap}>
            <IconArrowRight size={16} className={styles.icon} />
            <span className={styles.roll} aria-hidden="true">
              <IconArrowRight size={16} />
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
