import { IconArrowRight } from "../Icons";
import styles from "./EditorialCard.module.css";

export default function EditorialCard({ title, angle = 40 }) {
  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ backgroundImage: `linear-gradient(${angle}deg, #FFD600, #FF7A00, #FF0169, #D300C5, #7638FA)` }} />
      <div className={styles.footer}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.rollWrap}>
          <IconArrowRight size={18} className={styles.icon} />
          <span className={styles.roll} aria-hidden="true">
            <IconArrowRight size={18} />
          </span>
        </span>
      </div>
    </div>
  );
}
