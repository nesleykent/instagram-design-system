"use client";

import { useState } from "react";
import styles from "./SplitScreenDemo.module.css";

const RATIOS = {
  even: { label: "50 / 50", a: "50%", b: "50%" },
  asym: { label: "5 : 9 (35.714vw / 64.285vw)", a: "35.714%", b: "64.285%" },
};

export default function SplitScreenDemo() {
  const [ratio, setRatio] = useState("even");
  const current = RATIOS[ratio];

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.col} style={{ width: current.a }} data-side="a">
          Text column
        </div>
        <div className={styles.col} style={{ width: current.b }} data-side="b">
          Media column
        </div>
      </div>
      <div className={styles.toggle}>
        {Object.entries(RATIOS).map(([key, r]) => (
          <button key={key} type="button" data-active={ratio === key} onClick={() => setRatio(key)}>
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
