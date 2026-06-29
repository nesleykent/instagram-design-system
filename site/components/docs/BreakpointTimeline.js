"use client";

import { useEffect, useState } from "react";
import styles from "./BreakpointTimeline.module.css";

const TIERS = [
  { name: "Small mobile", from: 0, to: 480 },
  { name: "Mobile / tablet", from: 480, to: 768 },
  { name: "Small desktop", from: 768, to: 1200 },
  { name: "Desktop", from: 1200, to: 1440 },
  { name: "Large desktop", from: 1440, to: 1920 },
  { name: "Ultra-wide", from: 1920, to: 3000 },
];

const SCALE_MAX = 3000;

export default function BreakpointTimeline() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    function update() {
      setWidth(window.innerWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const markerPct = width ? Math.min((width / SCALE_MAX) * 100, 100) : 0;
  const activeTier = TIERS.find((t) => width >= t.from && width < t.to) || TIERS[TIERS.length - 1];

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={styles.segment}
            data-active={tier.name === activeTier.name}
            style={{ flexBasis: `${((tier.to - tier.from) / SCALE_MAX) * 100}%` }}
            title={`${tier.name}: ${tier.from}–${tier.to}px`}
          />
        ))}
        {width != null && <div className={styles.marker} style={{ left: `${markerPct}%` }} />}
      </div>
      <div className={styles.labels}>
        {TIERS.map((tier) => (
          <span key={tier.name} data-active={tier.name === activeTier.name}>
            {tier.name}
            <small>{tier.from}px</small>
          </span>
        ))}
      </div>
      <p className={styles.current}>
        Your viewport is <strong>{width ?? "—"}px</strong> — currently in the <strong>{activeTier.name}</strong> tier.
      </p>
    </div>
  );
}
