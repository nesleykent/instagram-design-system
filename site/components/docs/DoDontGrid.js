import { IconCheck, IconClose } from "../Icons";
import styles from "./DoDontGrid.module.css";

// Supports two call shapes:
//   <DoDontGrid dos={["..."]} donts={["..."]} />              (flat strings)
//   <DoDontGrid items={[{ type: "do"|"dont", title, body }]} /> (titled entries)
export default function DoDontGrid({ dos = [], donts = [], items }) {
  const doItems = items ? items.filter((i) => i.type === "do") : dos.map((text) => ({ text }));
  const dontItems = items ? items.filter((i) => i.type === "dont") : donts.map((text) => ({ text }));

  return (
    <div className={styles.grid}>
      <div className={styles.column} data-kind="do">
        <h3 className={styles.heading}>
          <IconCheck size={16} /> Do
        </h3>
        <ul>
          {doItems.map((item, i) => (
            <li key={i}>
              {item.title ? <strong className={styles.itemTitle}>{item.title}</strong> : null}
              {item.title ? " — " : null}
              {item.body || item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.column} data-kind="dont">
        <h3 className={styles.heading}>
          <IconClose size={16} /> Don&rsquo;t
        </h3>
        <ul>
          {dontItems.map((item, i) => (
            <li key={i}>
              {item.title ? <strong className={styles.itemTitle}>{item.title}</strong> : null}
              {item.title ? " — " : null}
              {item.body || item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
