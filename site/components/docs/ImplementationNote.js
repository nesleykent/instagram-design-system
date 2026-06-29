import { IconLayers } from "../Icons";
import styles from "./ImplementationNote.module.css";

export default function ImplementationNote({ title = "Implementation note", children, tone = "neutral" }) {
  return (
    <aside className={styles.note} data-tone={tone}>
      <IconLayers size={18} className={styles.icon} />
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.body}>{children}</div>
      </div>
    </aside>
  );
}
