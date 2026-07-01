"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "./Icons";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("ig-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </button>
  );
}
