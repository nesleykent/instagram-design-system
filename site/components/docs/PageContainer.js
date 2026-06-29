import PrevNext from "../PrevNext";
import styles from "./PageContainer.module.css";

export default function PageContainer({ children, wide = false }) {
  return (
    <div className={styles.wrap} data-wide={wide}>
      <article className={styles.article}>
        {children}
        <PrevNext />
      </article>
    </div>
  );
}
