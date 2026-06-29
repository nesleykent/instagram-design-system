import styles from "./RadiusScale.module.css";

const RADII = [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 16, 20, 25, 30];

export default function RadiusScale() {
  return (
    <div className={styles.row}>
      {RADII.map((r) => (
        <div key={r} className={styles.item}>
          <div className={styles.box} style={{ borderRadius: r }} />
          <span>{r}px</span>
        </div>
      ))}
      <div className={styles.item}>
        <div className={styles.box} style={{ borderRadius: "50%" }} />
        <span>50%</span>
      </div>
      <div className={styles.item}>
        <div className={styles.pillBox} style={{ borderRadius: 999 }} />
        <span>999px (pill)</span>
      </div>
    </div>
  );
}
