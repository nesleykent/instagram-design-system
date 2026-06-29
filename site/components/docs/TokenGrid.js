import styles from "./TokenGrid.module.css";

export default function TokenGrid({ children, min = "220px" }) {
  return (
    <div className={styles.grid} style={{ "--min-col": min }}>
      {children}
    </div>
  );
}
