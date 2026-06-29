import styles from "./StickyHeroDemo.module.css";

export default function StickyHeroDemo() {
  return (
    <div className={styles.frame}>
      <p className={styles.hint}>Scroll inside this frame ↓</p>
      <div className={styles.scroller}>
        <div className={styles.sticky} />
        <div className={styles.copy}>
          <p>The photo stays pinned…</p>
        </div>
        <div className={styles.copy}>
          <p>…while this text keeps scrolling past it.</p>
        </div>
        <div className={styles.copy}>
          <p>position: sticky; top: 0;</p>
        </div>
      </div>
    </div>
  );
}
