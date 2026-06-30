"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import styles from "./ComponentShowcase.module.css";

export default function ComponentShowcase({ children, code, codeLabel, surface = "default", align = "center" }) {
  const [dark, setDark] = useState(surface === "dark");
  const cleanSurface = surface === "clean";

  return (
    <div className={styles.wrap}>
      <div className={styles.stage} data-dark={dark} data-align={align} data-surface={surface}>
        {!cleanSurface && (
          <button
            type="button"
            className={styles.surfaceToggle}
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            aria-label="Toggle preview surface"
          >
            {dark ? "Light surface" : "Dark surface"}
          </button>
        )}
        <div className={styles.content}>{children}</div>
      </div>
      {code && <CodeBlock label={codeLabel} code={code} />}
    </div>
  );
}
