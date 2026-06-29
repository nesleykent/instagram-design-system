import styles from "./ShimmerDemo.module.css";

export default function ShimmerDemo() {
  return (
    <div className={styles.row}>
      <div className={styles.shimmer} />
      <div className={styles.shimmer} />
      <div className={styles.shimmer} />
    </div>
  );
}
