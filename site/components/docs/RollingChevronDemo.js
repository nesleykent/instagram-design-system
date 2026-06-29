import { IconArrowRight } from "../Icons";
import styles from "./RollingChevronDemo.module.css";

export default function RollingChevronDemo() {
  return (
    <div className={styles.row}>
      {["Nav link", "Type tester", "Deep-dive card"].map((label) => (
        <div key={label} className={styles.trigger} tabIndex={0}>
          <span className={styles.label}>{label}</span>
          <span className={styles.rollWrap}>
            <IconArrowRight size={16} className={styles.icon} />
            <span className={styles.roll} aria-hidden="true">
              <IconArrowRight size={16} />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
