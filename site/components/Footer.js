import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>
          An independent, unofficial documentation project — not published or endorsed by Instagram or Meta
          Platforms, Inc. &ldquo;Instagram,&rdquo; the Instagram wordmark, &ldquo;Instagram Sans,&rdquo; and
          &ldquo;Optimistic&rdquo; are trademarks/property of Meta.
        </p>
        <div className={styles.links}>
          <Link href="/methodology">Methodology</Link>
          <a href="https://github.com/nesleykent/instagram-design-system" target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
          <a href="https://about.instagram.com/brand/" target="_blank" rel="noreferrer">
            Official brand page ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
