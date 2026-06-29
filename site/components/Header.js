"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { IconMenu, IconSearch, IconGithub, IconCommand } from "./Icons";
import styles from "./Header.module.css";

export default function Header({ onMenuClick, onSearchClick }) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <IconMenu size={22} />
      </button>

      <Link href="/" className={styles.wordmark}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand-glyph.png`}
          alt=""
          width={26}
          height={26}
          className={styles.glyph}
        />
        <span>
          Instagram <span className="gradient-text">Brand Manual</span>
        </span>
      </Link>

      <button type="button" className={styles.searchTrigger} onClick={onSearchClick} aria-label="Open search">
        <IconSearch size={17} />
        <span className={styles.searchLabel}>Search the manual</span>
        <span className={styles.kbd}>
          <IconCommand size={12} />K
        </span>
      </button>

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} onClick={onSearchClick} aria-label="Search">
          <IconSearch size={19} />
        </button>
        <a
          href="https://github.com/nesleykent/instagram-design-system"
          target="_blank"
          rel="noreferrer"
          className={styles.iconButton}
          aria-label="View source on GitHub"
          title="View source on GitHub"
        >
          <IconGithub size={19} />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
