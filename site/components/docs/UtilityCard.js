import styles from "./UtilityCard.module.css";

export default function UtilityCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>Share to…</span>
        <button type="button" className={styles.close} aria-label="Close">
          ×
        </button>
      </div>
      <div className={styles.body}>
        <p>Confirmation and share dialogs use this denser, utility treatment.</p>
      </div>
    </div>
  );
}
