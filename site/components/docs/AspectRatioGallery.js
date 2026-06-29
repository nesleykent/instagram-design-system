import styles from "./AspectRatioGallery.module.css";

const RATIOS = [
  { label: "1:1", ratio: "1 / 1", note: "Feed grid, avatars", angle: 35 },
  { label: "4:5", ratio: "4 / 5", note: "Standard portrait post", angle: 70 },
  { label: "9:16", ratio: "9 / 16", note: "Stories, Reels", angle: 110 },
  { label: "16:9", ratio: "16 / 9", note: "Landscape video, mosaic rows", angle: 160 },
  { label: "3:4", ratio: "3 / 4", note: "About-page editorial cards", angle: 200 },
];

export default function AspectRatioGallery() {
  return (
    <div className={styles.grid}>
      {RATIOS.map((r) => (
        <div key={r.label} className={styles.card}>
          <div
            className={styles.frame}
            style={{
              aspectRatio: r.ratio,
              backgroundImage: `linear-gradient(${r.angle}deg, #FFD600, #FF7A00, #FF0169, #D300C5, #7638FA)`,
            }}
          />
          <p className={styles.label}>{r.label}</p>
          <p className={styles.note}>{r.note}</p>
        </div>
      ))}
    </div>
  );
}
