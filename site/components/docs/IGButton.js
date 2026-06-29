import styles from "./IGButton.module.css";

export default function IGButton({ variant = "primary", children, disabled = false, ...props }) {
  return (
    <button type="button" className={styles.button} data-variant={variant} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
