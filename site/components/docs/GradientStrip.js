"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import styles from "./GradientStrip.module.css";

export default function GradientStrip({ label, css, angle, stops = [], height = 96 }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure className={styles.figure}>
      <div className={styles.swatch} style={{ backgroundImage: css, height }}>
        {stops.map((stop, i) => (
          <span
            key={stop.hex + i}
            className={styles.marker}
            style={{ left: stop.position }}
            title={`${stop.name} · ${stop.hex} · ${stop.position}`}
          />
        ))}
      </div>
      <figcaption className={styles.caption}>
        <div>
          {label && <p className={styles.label}>{label}</p>}
          {angle && <p className={styles.meta}>{angle}</p>}
        </div>
        <button type="button" className={styles.copyBtn} onClick={copy}>
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </figcaption>
      {stops.length > 0 && (
        <div className={styles.stops}>
          {stops.map((stop, i) => (
            <div key={stop.hex + i} className={styles.stop}>
              <span className={styles.stopDot} style={{ background: stop.hex }} />
              <span className={styles.stopName}>{stop.name}</span>
              <span className={styles.stopHex}>{stop.hex}</span>
            </div>
          ))}
        </div>
      )}
    </figure>
  );
}
