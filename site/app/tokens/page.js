"use client";

import { useMemo, useState } from "react";
import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import TokenCard from "@/components/docs/TokenCard";
import { IconSearch } from "@/components/Icons";
import { TOKENS, CATEGORIES } from "@/lib/tokens-data";
import styles from "./tokens.module.css";

export default function TokensPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOKENS.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.token.toLowerCase().includes(q) ||
        String(t.value ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <PageContainer wide>
      <PageHeader
        eyebrow="Resources"
        title="Design Tokens"
        description={`${TOKENS.length} tokens from this manual, searchable and rendered visually. Click any token name to copy it.`}
      />

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <IconSearch size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tokens…"
            aria-label="Search tokens"
          />
        </div>
        <div className={styles.pills}>
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} type="button" data-active={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No tokens match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((t) => (
            <TokenCard key={t.token + t.name} token={t} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
