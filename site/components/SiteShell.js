"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SearchPalette from "./SearchPalette";
import styles from "./SiteShell.module.css";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e) {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileNavOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen, searchOpen]);

  return (
    <div className={styles.shell}>
      <Header onMenuClick={() => setMobileNavOpen(true)} onSearchClick={() => setSearchOpen(true)} />
      <div className={styles.body}>
        <Sidebar pathname={pathname} mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
