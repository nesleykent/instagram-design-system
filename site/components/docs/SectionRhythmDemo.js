import styles from "./SectionRhythmDemo.module.css";

const CHAPTERS = [
  { label: "Chapter 1", note: "height: 100vh · min-height: 512px", tint: "var(--ig-gradient-hero)" },
  { label: "Chapter 2", note: "margin-top: 120px", tint: "#000" },
  { label: "Chapter 3", note: "min-height: 700px floor", tint: "#fff" },
];

export default function SectionRhythmDemo() {
  return (
    <div className={styles.frame}>
      <p className={styles.scrollHint}>Scroll inside this frame ↓</p>
      <div className={styles.scroller}>
        {CHAPTERS.map((c, i) => (
          <div
            key={c.label}
            className={styles.chapter}
            style={{ background: c.tint, color: c.tint === "#fff" ? "#000" : "#fff" }}
          >
            <span className={styles.chapterLabel}>{c.label}</span>
            <span className={styles.chapterNote}>{c.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
