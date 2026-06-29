import styles from "./LegacyMenuDemo.module.css";

const ITEMS = ["Edit", "Archive", "Hide like count", "Turn off commenting", "Unfollow"];

export default function LegacyMenuDemo() {
  return (
    <div className={styles.menu}>
      {ITEMS.map((item, i) => (
        <div key={item} className={styles.item} data-disabled={i === ITEMS.length - 2}>
          {item}
        </div>
      ))}
    </div>
  );
}
