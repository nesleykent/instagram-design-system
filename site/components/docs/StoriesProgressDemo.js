"use client";

import { useState } from "react";
import styles from "./StoriesProgressDemo.module.css";

const SEGMENTS = 5;

export default function StoriesProgressDemo() {
  const [active, setActive] = useState(0);
  const [playKey, setPlayKey] = useState(0);

  function restart() {
    setActive(0);
    setPlayKey((k) => k + 1);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <div className={styles.bar}>
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <div key={i} className={styles.track}>
              <div
                key={`${i}-${playKey}`}
                className={styles.fill}
                data-state={i < active ? "done" : i === active ? "playing" : "pending"}
                style={i === active ? { animationDuration: "2.2s" } : undefined}
                onAnimationEnd={() => {
                  if (i === active) {
                    setActive((a) => (a + 1 < SEGMENTS ? a + 1 : a));
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button type="button" className={styles.replay} onClick={restart}>
        ↻ Replay
      </button>
    </div>
  );
}
