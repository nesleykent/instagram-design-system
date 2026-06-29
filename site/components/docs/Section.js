import styles from "./Section.module.css";

export default function Section({ id, kicker, title, description, children, wide = false }) {
  return (
    <section id={id} className={styles.section} data-wide={wide}>
      {(kicker || title) && (
        <div className={styles.heading}>
          {kicker && <p className="eyebrow">{kicker}</p>}
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
