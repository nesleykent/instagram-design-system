"use client";

import { useState } from "react";
import styles from "./ScrimOverlayDemo.module.css";

const PRESETS = [
  { label: "No scrim", value: "none" },
  { label: "Bottom fade", value: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.75))" },
  { label: "Directional", value: "linear-gradient(0deg, transparent 80%, rgba(0,0,0,.55))" },
  { label: "Full wash", value: "linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.15))" },
];

export default function ScrimOverlayDemo() {
  const [active, setActive] = useState(1);

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.art} aria-hidden="true" />
        <div className={styles.scrim} style={{ backgroundImage: PRESETS[active].value }} />
        <p className={styles.text}>Caption text sits here</p>
      </div>
      <div className={styles.presets}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            className={styles.preset}
            data-active={i === active}
            onClick={() => setActive(i)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
