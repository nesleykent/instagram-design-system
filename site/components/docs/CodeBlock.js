"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";
import { tokenizeCode } from "./highlightCode";
import styles from "./CodeBlock.module.css";

const TOKEN_CLASS = {
  comment: styles.tokComment,
  string: styles.tokString,
  type: styles.tokType,
  keyword: styles.tokKeyword,
  number: styles.tokNumber,
};

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const tokens = tokenizeCode(code);

  return (
    <div className={styles.block}>
      {label && <span className={styles.label}>{label}</span>}
      <button type="button" className={styles.copyBtn} onClick={copy} aria-label="Copy code">
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className={styles.pre}>
        <code>
          {tokens.map((t, i) =>
            t.type ? (
              <span key={i} className={TOKEN_CLASS[t.type]}>
                {t.text}
              </span>
            ) : (
              t.text
            )
          )}
        </code>
      </pre>
    </div>
  );
}
