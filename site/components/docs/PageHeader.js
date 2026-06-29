import Breadcrumbs from "../Breadcrumbs";
import styles from "./PageHeader.module.css";

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className={styles.header}>
      <Breadcrumbs />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </header>
  );
}
