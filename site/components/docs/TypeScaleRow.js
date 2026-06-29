import styles from "./TypeScaleRow.module.css";

export default function TypeScaleRow({ size, lineHeight, sample = "Following" }) {
  const ratio = (lineHeight / size).toFixed(2);
  return (
    <div className={styles.row}>
      <span className={styles.sample} style={{ fontSize: size, lineHeight: `${lineHeight}px` }}>
        {sample}
      </span>
      <span className={styles.dims}>
        {size}<span className={styles.unit}>px</span>
      </span>
      <span className={styles.dims}>
        {lineHeight}<span className={styles.unit}>px</span>
      </span>
      <span className={styles.ratio}>{ratio}</span>
    </div>
  );
}
