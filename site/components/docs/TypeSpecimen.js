"use client";

import { useState } from "react";
import styles from "./TypeSpecimen.module.css";

export default function TypeSpecimen({
  label,
  meta,
  text = "Aa Bg 24",
  fontSize = 40,
  fontWeight = 400,
  letterSpacing,
  lineHeight,
  fontStyle = "normal",
  editable = false,
}) {
  const [value, setValue] = useState(text);

  return (
    <div className={styles.specimen}>
      {editable ? (
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ fontSize, fontWeight, letterSpacing, lineHeight: lineHeight ?? 1.1, fontStyle }}
          aria-label={label || "Sample text"}
        />
      ) : (
        <p className={styles.sample} style={{ fontSize, fontWeight, letterSpacing, lineHeight: lineHeight ?? 1.1, fontStyle }}>
          {value}
        </p>
      )}
      {(label || meta) && (
        <div className={styles.footer}>
          {label && <span className={styles.label}>{label}</span>}
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      )}
    </div>
  );
}
