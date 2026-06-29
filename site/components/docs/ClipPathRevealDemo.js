"use client";

import { useState } from "react";
import styles from "./ClipPathRevealDemo.module.css";

export default function ClipPathRevealDemo() {
  const [playKey, setPlayKey] = useState(0);

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <div key={playKey} className={styles.panel} />
        <span className={styles.stageLabel}>Brand storytelling section</span>
      </div>
      <button type="button" className={styles.replay} onClick={() => setPlayKey((k) => k + 1)}>
        ↻ Replay wipe
      </button>
    </div>
  );
}
