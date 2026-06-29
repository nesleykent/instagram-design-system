"use client";

import { useState } from "react";
import styles from "./GridUnitVisualizer.module.css";

const UNITS = [
  { n: 1, vw: "7.142vw", px: "114.272px" },
  { n: 2, vw: "14.285vw", px: "228.56px" },
  { n: 3, vw: "21.428vw", px: "342.848px" },
  { n: 5, vw: "35.714vw", px: "571.424px" },
  { n: 9, vw: "64.285vw", px: "1028.56px" },
  { n: 12, vw: "85.714vw", px: "—" },
];

export default function GridUnitVisualizer() {
  const [active, setActive] = useState(1);

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className={styles.cell} data-filled={i < active} />
        ))}
      </div>
      <div className={styles.legend}>
        {UNITS.map((u) => (
          <button
            key={u.n}
            type="button"
            className={styles.unitBtn}
            data-active={active === u.n}
            onClick={() => setActive(u.n)}
          >
            <span className={styles.unitN}>×{u.n}</span>
            <span className={styles.unitVw}>{u.vw}</span>
            <span className={styles.unitPx}>{u.px}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
