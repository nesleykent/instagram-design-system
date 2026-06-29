"use client";

import { useState } from "react";
import styles from "./TypeTesterDemo.module.css";

// Eight options confirmed in the about-page CSS (_a8fd–_a8fi, _a9l1–_a9l2).
// The first option is selected by default matching the page load state.
const OPTIONS = [
  { label: "Aa", name: "Light", weight: 300 },
  { label: "Aa", name: "Regular", weight: 400 },
  { label: "Aa", name: "Medium", weight: 500 },
  { label: "Aa", name: "Bold", weight: 700 },
  { label: "Aa", name: "Condensed", weight: 400, spacing: -1.5 },
  { label: "Aa", name: "Condensed Bold", weight: 700, spacing: -1.5 },
  { label: "Aa", name: "Script", weight: 400, italic: true },
  { label: "Aa", name: "Script Bold", weight: 700, italic: true },
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
            style={{ fontWeight: opt.weight, letterSpacing: opt.spacing, fontStyle: opt.italic ? "italic" : "normal" }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className={styles.caption}>Selected: {OPTIONS[active].name}</p>
    </div>
  );
}
