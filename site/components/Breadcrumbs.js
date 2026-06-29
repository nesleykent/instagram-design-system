"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/lib/nav";
import { IconChevronRight } from "./Icons";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href + i} className={styles.item}>
              {isLast ? (
                <span aria-current="page">{crumb.title}</span>
              ) : (
                <Link href={crumb.href}>{crumb.title}</Link>
              )}
              {!isLast && <IconChevronRight size={13} className={styles.sep} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
