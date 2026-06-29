import { IconCheck, IconClose } from "../Icons";
import styles from "./DoDontGrid.module.css";

export default function DoDontGrid({ dos = [], donts = [] }) {
  return (
    <div className={styles.grid}>
      <div className={styles.column} data-kind="do">
        <p className={styles.heading}>
          <IconCheck size={16} /> Do
        </p>
        <ul>
          {dos.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.column} data-kind="dont">
        <p className={styles.heading}>
          <IconClose size={16} /> Don&rsquo;t
        </p>
        <ul>
          {donts.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
