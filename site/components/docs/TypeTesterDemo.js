"use client";

import { useState } from "react";
import styles from "./TypeTesterDemo.module.css";

const OPTIONS = [
  { label: "Aa", name: "Sans", weight: 400 },
  { label: "Aa", name: "Sans Bold", weight: 700 },
  { label: "Aa", name: "Condensed", weight: 600, spacing: -1.5 },
  { label: "Aa", name: "Script", weight: 400, italic: true },
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
