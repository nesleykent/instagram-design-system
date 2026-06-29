"use client";

import { useState } from "react";
import { IconClose } from "../Icons";
import styles from "./ModalDemo.module.css";

export default function ModalDemo() {
  const [open, setOpen] = useState(null);

  return (
    <div className={styles.triggers}>
      <button type="button" className={styles.trigger} onClick={() => setOpen("panel")}>
        Open panel
      </button>
      <button type="button" className={styles.trigger} onClick={() => setOpen("lightbox")}>
        Open lightbox
      </button>

      {open === "panel" && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setOpen(null)} aria-label="Close panel">
              <IconClose size={16} />
            </button>
            <p className={styles.modalLabel}>Full-height panel</p>
            <p className={styles.modalDesc}>
              Slides up from translateY(100%) → 0, eased with Ease Settle. Visibility toggles alongside the
              transform so it&rsquo;s unreachable by keyboard/AT while closed.
            </p>
          </div>
        </div>
      )}

      {open === "lightbox" && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setOpen(null)} aria-label="Close lightbox">
              <IconClose size={16} />
            </button>
            <p className={styles.modalLabel}>Lightbox / media viewer</p>
            <p className={styles.modalDesc}>
              Fades opacity 0→1 and scales 0.96→1 simultaneously — a &ldquo;zoom-settle&rdquo; combination, eased
              with Ease Confident.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
