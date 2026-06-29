"use client";

import { useMemo, useState } from "react";
import styles from "./ContrastChecker.module.css";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num) || full.length !== 6) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hexA, hexB) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  if (!a || !b) return null;
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const PRESETS = [
  { label: "Primary button on white", fg: "#0095F6", bg: "#FFFFFF" },
  { label: "Secondary text, light mode", fg: "#737373", bg: "#FFFFFF" },
  { label: "Secondary text, dark mode", fg: "#A8A8A8", bg: "#0C1014" },
  { label: "Error on white", fg: "#ED4956", bg: "#FFFFFF" },
];

export default function ContrastChecker() {
  const [fg, setFg] = useState("#0095F6");
  const [bg, setBg] = useState("#FFFFFF");

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const rounded = ratio ? ratio.toFixed(2) : "—";

  const aaNormal = ratio >= 4.5;
  const aaaNormal = ratio >= 7;
  const aaLarge = ratio >= 3;

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.preview} style={{ background: bg, color: fg }}>
          <span>Aa</span>
        </div>
        <div className={styles.inputs}>
          <label className={styles.inputRow}>
            <span>Text</span>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className={styles.hexInput}
              aria-label="Foreground hex"
            />
          </label>
          <label className={styles.inputRow}>
            <span>Background</span>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className={styles.hexInput}
              aria-label="Background hex"
            />
          </label>
        </div>
        <div className={styles.result}>
          <span className={styles.ratio}>{rounded}</span>
          <span className={styles.ratioLabel}>contrast ratio</span>
        </div>
      </div>

      <div className={styles.badges}>
        <span className={styles.badge} data-pass={aaLarge}>
          AA · large text {aaLarge ? "✓" : "✗"}
        </span>
        <span className={styles.badge} data-pass={aaNormal}>
          AA · normal text {aaNormal ? "✓" : "✗"}
        </span>
        <span className={styles.badge} data-pass={aaaNormal}>
          AAA · normal text {aaaNormal ? "✓" : "✗"}
        </span>
      </div>

      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={styles.preset}
            onClick={() => {
              setFg(p.fg);
              setBg(p.bg);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
