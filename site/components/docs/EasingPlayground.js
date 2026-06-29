"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import styles from "./EasingPlayground.module.css";

export const CURVES = [
  { name: "Ease Standard", value: [0.33, 0, 0.67, 1], use: "Opacity fades, item intros" },
  { name: "Ease Confident", value: [0.7, 0, 0.3, 1], use: "Clip-path wipes, lightbox zoom" },
  { name: "Ease Glide", value: [0, 0, 0.1, 1], use: "translateY reveals, rolling chevrons" },
  { name: "Ease Settle", value: [0, 0.61, 0.28, 0.92], use: "Panel slide-up, nav underline-grow" },
  { name: "Ease Anticipate", value: [0.4, 0, 0.1, 1], use: "Brand-logo zoom, alt split-reveal" },
];

function curveToCss(v) {
  return `cubic-bezier(${v.join(", ")})`;
}

function CurveSVG({ value }) {
  const [x1, y1, x2, y2] = value;
  const W = 116;
  const p1 = `${x1 * W},${(1 - y1) * W}`;
  const p2 = `${x2 * W},${(1 - y2) * W}`;

  return (
    <svg viewBox={`0 0 ${W} ${W}`} width={W} height={W} className={styles.svg} aria-hidden="true">
      <line x1="0" y1={W} x2={W} y2="0" className={styles.diagonal} />
      <path d={`M 0,${W} C ${p1} ${p2} ${W},0`} className={styles.curvePath} />
      <line x1="0" y1={W} x2={x1 * W} y2={(1 - y1) * W} className={styles.handleLine} />
      <line x1={W} y1="0" x2={x2 * W} y2={(1 - y2) * W} className={styles.handleLine} />
      <circle cx={x1 * W} cy={(1 - y1) * W} r="3.5" className={styles.handle} />
      <circle cx={x2 * W} cy={(1 - y2) * W} r="3.5" className={styles.handle} />
    </svg>
  );
}

export default function EasingPlayground() {
  const [active, setActive] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const curve = CURVES[active];
  const css = curveToCss(curve.value);

  function copy() {
    navigator.clipboard?.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <CurveSVG value={curve.value} />
        <div className={styles.trackArea}>
          <div className={styles.track}>
            <div key={playKey} className={styles.dot} style={{ animationTimingFunction: css }} />
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.playBtn} onClick={() => setPlayKey((k) => k + 1)}>
              ▶ Play
            </button>
            <button type="button" className={styles.copyBtn} onClick={copy}>
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              <code>{css}</code>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.presets}>
        {CURVES.map((c, i) => (
          <button key={c.name} type="button" data-active={i === active} className={styles.preset} onClick={() => setActive(i)}>
            <span className={styles.presetName}>{c.name}</span>
            <span className={styles.presetUse}>{c.use}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
