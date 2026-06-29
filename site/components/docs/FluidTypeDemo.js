"use client";

import { useMemo, useState } from "react";
import styles from "./FluidTypeDemo.module.css";

const MIN_VW = 300;
const MAX_VW = 2100;

function computeSize(vw) {
  return 40 + 260 * ((vw - 300) / 1800);
}

export default function FluidTypeDemo() {
  const [vw, setVw] = useState(900);
  const size = useMemo(() => computeSize(vw), [vw]);

  return (
    <div className={styles.demo}>
      <div className={styles.stage}>
        <p className={styles.sample} style={{ fontSize: Math.min(size, 120) }}>
          Instagram
        </p>
      </div>
      <div className={styles.controls}>
        <label className={styles.sliderRow}>
          <span>Simulated viewport width</span>
          <span className={styles.value}>{vw}px</span>
        </label>
        <input
          type="range"
          min={MIN_VW}
          max={MAX_VW}
          value={vw}
          onChange={(e) => setVw(Number(e.target.value))}
          className={styles.slider}
          aria-label="Simulated viewport width"
        />
        <div className={styles.formula}>
          <code>font-size: calc(40px + 260 * ((100vw - 300px) / 1800))</code>
          <span className={styles.resolved}>→ resolves to {size.toFixed(1)}px at {vw}px</span>
        </div>
      </div>
    </div>
  );
}
