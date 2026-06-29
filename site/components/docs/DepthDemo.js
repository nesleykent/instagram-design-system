"use client";

import { useState } from "react";
import styles from "./DepthDemo.module.css";

export default function DepthDemo() {
  const [blur, setBlur] = useState(20);

  return (
    <div className={styles.wrap}>
      <div className={styles.art}>
        <div className={styles.glass} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}>
          <span>blur({blur}px)</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={blur}
        onChange={(e) => setBlur(Number(e.target.value))}
        className={styles.slider}
        aria-label="Backdrop blur radius"
      />
      <div className={styles.labels}>
        <span>0px</span>
        <span>20px · modal scrims</span>
        <span>100px · ambient backdrops</span>
      </div>
    </div>
  );
}
