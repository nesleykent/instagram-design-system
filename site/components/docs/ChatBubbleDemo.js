import styles from "./ChatBubbleDemo.module.css";

export default function ChatBubbleDemo() {
  return (
    <div className={styles.thread}>
      <div className={styles.row} data-side="in">
        <div className={styles.bubble} data-side="in">
          Hey! Did you see the new gradient?
          <span className={styles.tail} data-side="in" />
        </div>
      </div>
      <div className={styles.row} data-side="out">
        <div className={styles.bubble} data-side="out">
          Yeah — it's the same five stops, just a tighter crop.
          <span className={styles.tail} data-side="out" />
        </div>
      </div>
    </div>
  );
}
