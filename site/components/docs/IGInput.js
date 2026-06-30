import styles from "./IGInput.module.css";

export default function IGInput({ label, placeholder, error, defaultValue }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        className={[styles.input, error ? styles.inputError : ""].join(" ")}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : undefined}
      />
      {error ? <span className={styles.errorText}>{error}</span> : null}
    </label>
  );
}
