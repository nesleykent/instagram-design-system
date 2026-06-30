"use client";

import { useState } from "react";
import styles from "./TypeTesterDemo.module.css";

// Eight options confirmed in the about-page CSS (_a8fd–_a8fi, _a9l1–_a9l2).
// The first option is selected by default matching the page load state.
const OPTIONS = [
  { label: "Aa", name: "Light", family: "var(--font-family-brand)", weight: 300 },
  { label: "Aa", name: "Regular", family: "var(--font-family-brand)", weight: 400 },
  { label: "Aa", name: "Medium", family: "var(--font-family-brand)", weight: 500 },
  { label: "Aa", name: "Bold", family: "var(--font-family-brand)", weight: 700 },
  { label: "Aa", name: "Condensed", family: "var(--font-family-brand-condensed)", weight: 400, spacing: -1.5 },
  { label: "Aa", name: "Condensed Bold", family: "var(--font-family-brand-condensed)", weight: 700, spacing: -1.5 },
  { label: "Aa", name: "Script", family: "var(--font-family-brand-script)", weight: 400 },
  { label: "Aa", name: "Script Bold", family: "var(--font-family-brand-script)", weight: 700 },
];

export default function TypeTesterDemo() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.name}
            type="button"
            className={styles.swatch}
            data-active={active === i}
            onClick={() => setActive(i)}
            style={{ fontFamily: opt.family, fontWeight: opt.weight, letterSpacing: opt.spacing }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className={styles.caption}>Selected: {OPTIONS[active].name}</p>
    </div>
  );
}
