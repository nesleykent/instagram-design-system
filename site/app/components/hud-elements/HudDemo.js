"use client";

import { useState } from "react";
import styles from "./hud-elements.module.css";

export default function HudDemo() {
  const [health, setHealth] = useState(100);
  const [xp, setXp] = useState(60);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(null);

  function takeDamage() {
    setHealth((h) => Math.max(0, h - 18));
    setFlash("damage");
    setTimeout(() => setFlash(null), 150);
  }

  function gainXp() {
    setXp((x) => {
      const next = x + 22;
      if (next >= 100) {
        setFlash("reward");
        setTimeout(() => setFlash(null), 700);
        setScore((s) => s + 100);
        return next - 100;
      }
      return next;
    });
    setScore((s) => s + 10);
  }

  function reset() {
    setHealth(100);
    setXp(60);
    setScore(0);
  }

  return (
    <div className={styles.hudStage}>
      <div className={[styles.hudOverlay, flash === "damage" ? styles.flashDamage : ""].join(" ")}>
        <div className={styles.hudTopRow}>
          <div className={styles.barGroup}>
            <span className={styles.barLabel}>HP</span>
            <div className={styles.barTrack}>
              <div className={styles.barFillHealth} style={{ width: `${health}%` }} />
            </div>
          </div>
          <div className={[styles.scoreBadge, flash === "reward" ? styles.flashReward : ""].join(" ")}>
            {score.toLocaleString()}
          </div>
        </div>
        <div className={styles.barGroup}>
          <span className={styles.barLabel}>XP</span>
          <div className={styles.barTrack}>
            <div className={styles.barFillXp} style={{ width: `${xp}%` }} />
          </div>
        </div>
        {flash === "reward" && <div className={styles.levelUpToast}>Level up!</div>}
      </div>
      <div className={styles.hudControls}>
        <button type="button" className={styles.hudButton} onClick={takeDamage}>
          Take damage
        </button>
        <button type="button" className={styles.hudButton} onClick={gainXp}>
          Gain XP
        </button>
        <button type="button" className={styles.hudButtonGhost} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
