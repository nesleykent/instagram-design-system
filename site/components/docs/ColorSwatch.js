"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import styles from "./ColorSwatch.module.css";

function Chip({ rgb, label, name }) {
  const [copied, setCopied] = useState(false);
  const css = `rgb(${rgb})`;
  const colorName = label ? `${label.toLowerCase()} ${name}` : name;

  function copy() {
    navigator.clipboard?.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      className={styles.chip}
      style={{ background: css }}
      onClick={copy}
      title={`Copy ${css}`}
      aria-label={`Copy ${colorName} colour value ${css}`}
    >
      <span className={styles.chipOverlay} data-light={isLight(rgb)}>
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      </span>
      {label && <span className={styles.chipLabel} data-light={isLight(rgb)}>{label}</span>}
    </button>
  );
}

function isLight(rgb) {
  const [r, g, b] = rgb.split(",").map((n) => parseInt(n.trim(), 10));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export default function ColorSwatch({ name, token, light, dark, usage }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.chips}>
        <Chip rgb={light} label={dark ? "Light" : null} name={name} />
        {dark && <Chip rgb={dark} label="Dark" name={name} />}
      </div>
      <div className={styles.meta}>
        <p className={styles.name}>{name}</p>
        <code className={styles.token}>{token}</code>
        {usage && <p className={styles.usage}>{usage}</p>}
        <div className={styles.values}>
          <span>{light}</span>
          {dark && <span>{dark}</span>}
        </div>
      </div>
    </div>
  );
}
