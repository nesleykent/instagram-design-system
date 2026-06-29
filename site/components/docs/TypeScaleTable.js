import TypeScaleRow from "./TypeScaleRow";
import styles from "./TypeScaleTable.module.css";

export default function TypeScaleTable({ rows }) {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>Sample</span>
        <span>Size</span>
        <span>Line height</span>
        <span>Ratio</span>
      </div>
      {rows.map((row) => (
        <TypeScaleRow key={row.size} {...row} />
      ))}
    </div>
  );
}
