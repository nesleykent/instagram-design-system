import styles from "./IGNavLink.module.css";

export default function IGNavLink({ children, disabled = false }) {
  return (
    <span className={styles.link} data-disabled={disabled} tabIndex={disabled ? -1 : 0}>
      {children}
    </span>
  );
}
