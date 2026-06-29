import styles from "./ShapeGrammar.module.css";

const SHAPES = [
  { name: "Circle", note: "border-radius: 50% — avatars, icon buttons, dismiss controls", className: "circle" },
  { name: "Squircle", note: "clip-path: var(--squircle-polygon) — brand-forward tiles", className: "squircle" },
  { name: "Rounded square", note: "border-radius: 8–16px — cards, containers", className: "rounded" },
  { name: "Pill", note: "border-radius: 999px — tags, segmented progress", className: "pill" },
];

export default function ShapeGrammar() {
  return (
    <div className={styles.grid}>
      {SHAPES.map((s) => (
        <div key={s.name} className={styles.card}>
          <div className={`${styles.shape} ${styles[s.className]}`} />
          <p className={styles.name}>{s.name}</p>
          <p className={styles.note}>{s.note}</p>
        </div>
      ))}
    </div>
  );
}
