import styles from "./IGInput.module.css";

export default function IGInput({ label, placeholder }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} placeholder={placeholder} />
    </label>
  );
}
