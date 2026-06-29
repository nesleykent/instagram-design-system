"use client";

import Link from "next/link";
import { NAV, normalizePath } from "@/lib/nav";
import { IconClose } from "./Icons";
import styles from "./Sidebar.module.css";

export default function Sidebar({ pathname, mobileOpen, onClose }) {
  const currentPath = normalizePath(pathname);
  return (
    <>
      <div
        className={styles.backdrop}
        data-open={mobileOpen}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={styles.sidebar}
        data-open={mobileOpen}
        aria-label="Manual sections"
      >
        <div className={styles.mobileHead}>
          <span className={styles.mobileTitle}>Menu</span>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close navigation menu">
            <IconClose size={18} />
          </button>
        </div>

        {NAV.map((group) => (
          <div key={group.group} className={styles.group}>
            <p className={styles.groupTitle}>{group.group}</p>
            <ul className={styles.list}>
              {group.items.map((item) => {
                const active = currentPath === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.link}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className={styles.sidebarFooter}>
          <p>v1.0 &middot; Unofficial &amp; independent</p>
        </div>
      </nav>
    </>
  );
}
