"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import styles from "./CodeBlock.module.css";

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.block}>
      {label && <span className={styles.label}>{label}</span>}
      <button type="button" className={styles.copyBtn} onClick={copy} aria-label="Copy code">
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className={styles.pre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
