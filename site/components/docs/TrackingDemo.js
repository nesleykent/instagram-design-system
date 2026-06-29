"use client";

import { useState } from "react";
import styles from "./TrackingDemo.module.css";

const PRESETS = [
  { label: "Display", value: -3 },
  { label: "UI text", value: -0.5 },
  { label: "Normal", value: 0 },
  { label: "Label", value: 1.88 },
];

export default function TrackingDemo() {
  const [tracking, setTracking] = useState(0);

  return (
    <div className={styles.demo}>
      <p className={styles.sample} style={{ letterSpacing: `${tracking}px` }}>
        INSTAGRAM
      </p>
      <div className={styles.controls}>
        <input
          type="range"
          min={-4}
          max={4}
          step={0.1}
          value={tracking}
          onChange={(e) => setTracking(Number(e.target.value))}
          className={styles.slider}
          aria-label="Letter spacing in pixels"
        />
        <span className={styles.value}>{tracking.toFixed(1)}px</span>
      </div>
      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button key={p.label} type="button" className={styles.preset} onClick={() => setTracking(p.value)}>
            {p.label} <span>{p.value}px</span>
          </button>
        ))}
      </div>
    </div>
  );
}
