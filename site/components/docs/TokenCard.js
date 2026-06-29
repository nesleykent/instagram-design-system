"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import styles from "./TokenCard.module.css";

function Preview({ token }) {
  switch (token.type) {
    case "color":
      return (
        <div className={styles.colorPreview}>
          <span className={styles.colorChip} style={{ background: `rgb(${token.light})` }} />
          {token.dark && <span className={styles.colorChip} style={{ background: `rgb(${token.dark})` }} />}
        </div>
      );
    case "weight":
      return <span className={styles.weightPreview} style={{ fontWeight: token.value }}>Ag</span>;
    case "scale":
      return (
        <span className={styles.scalePreview} style={{ fontSize: token.size, lineHeight: `${token.lineHeight}px` }}>
          Aa
        </span>
      );
    case "grid":
      return <div className={styles.gridPreview} style={{ width: `min(${token.value}, 100%)` }} />;
    case "radius":
      return <div className={styles.radiusPreview} style={{ borderRadius: token.value >= 999 ? "999px" : token.value }} />;
    case "ease": {
      const nums = token.value.match(/[-\d.]+/g)?.map(Number) || [0, 0, 1, 1];
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" className={styles.easeSvg} aria-hidden="true">
          <path
            d={`M 0,40 C ${nums[0] * 40},${(1 - nums[1]) * 40} ${nums[2] * 40},${(1 - nums[3]) * 40} 40,0`}
            fill="none"
            stroke="var(--ig-stop-magenta)"
            strokeWidth="2.5"
          />
        </svg>
      );
    }
    case "duration": {
      const ms = parseInt(token.value, 10);
      return (
        <div className={styles.durationPreview}>
          <div className={styles.durationBar} style={{ width: `${Math.min((ms / 2000) * 100, 100)}%` }} />
        </div>
      );
    }
    default:
      return null;
  }
}

export default function TokenCard({ token }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(token.token.split(" / ")[0]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={styles.card}>
      <div className={styles.previewWrap}>
        <Preview token={token} />
      </div>
      <div className={styles.meta}>
        <p className={styles.name}>{token.name}</p>
        <button type="button" className={styles.tokenBtn} onClick={copy} title="Copy token name">
          <code>{token.token}</code>
          {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
        </button>
        {(token.description || token.value !== undefined) && (
          <p className={styles.value}>{token.description || String(token.value)}</p>
        )}
      </div>
    </div>
  );
}
