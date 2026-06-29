import styles from "./DurationScaleBars.module.css";

const DURATIONS = [
  { label: "Micro-feedback", ms: 150, note: "Hover tint, link width shift" },
  { label: "Reveal", ms: 666, note: "Recurs exactly across the about-page" },
  { label: "Narrative beat", ms: 2000, note: "Looping accents" },
  { label: "Brand sequence", ms: 3100, note: "Logo morph cycle" },
];

const MAX = 3100;

export default function DurationScaleBars() {
  return (
    <div className={styles.list}>
      {DURATIONS.map((d) => (
        <div key={d.label} className={styles.row}>
          <span className={styles.label}>{d.label}</span>
          <div className={styles.track}>
            <div className={styles.bar} style={{ width: `${(d.ms / MAX) * 100}%` }} />
          </div>
          <span className={styles.ms}>{d.ms}ms</span>
        </div>
      ))}
    </div>
  );
}
