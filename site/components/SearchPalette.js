"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchPages } from "@/lib/search";
import { IconSearch, IconClose, IconArrowRight } from "./Icons";
import styles from "./SearchPalette.module.css";

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const results = useMemo(() => searchPages(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function go(href) {
    router.push(href);
    onClose();
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) go(results[activeIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.palette}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search the manual"
      >
        <div className={styles.inputRow}>
          <IconSearch size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search typography, colour, components, tokens…"
            className={styles.input}
            aria-label="Search the manual"
          />
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close search">
            <IconClose size={16} />
          </button>
        </div>

        <ul className={styles.results} role="listbox">
          {results.length === 0 && query && (
            <li className={styles.empty}>
              <span className={styles.emptyBadge}>
                <IconSearch size={20} />
              </span>
              <p className={styles.emptyHeadline}>No results found</p>
              <p className={styles.emptyBody}>Try searching for something else.</p>
            </li>
          )}
          {results.map((page, i) => (
            <li key={page.href}>
              <button
                type="button"
                className={styles.result}
                data-active={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => go(page.href)}
                role="option"
                aria-selected={i === activeIndex}
              >
                <span className={styles.resultText}>
                  <span className={styles.resultGroup}>{page.group}</span>
                  <span className={styles.resultTitle}>{page.title}</span>
                  <span className={styles.resultDesc}>{page.description}</span>
                </span>
                <IconArrowRight size={16} className={styles.resultArrow} />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.hints}>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
