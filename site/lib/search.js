import { FLAT_PAGES } from "./nav";
import { COMPONENT_GUIDES } from "./component-guides";

const GENERATED_HREFS = new Set(COMPONENT_GUIDES.map((g) => g.href));

// Before the user types anything, suggest the hand-built top-level pages —
// not all ~69 pages, which would otherwise include the full ~50-entry
// generated component catalogue dumped in one unfiltered list.
const DEFAULT_SUGGESTIONS = FLAT_PAGES.filter((page) => !GENERATED_HREFS.has(page.href));

export function searchPages(query) {
  const q = query.trim().toLowerCase();
  if (!q) return DEFAULT_SUGGESTIONS;

  return FLAT_PAGES.map((page) => {
    const title = page.title.toLowerCase();
    const description = page.description.toLowerCase();
    const keywords = (page.keywords || []).join(" ").toLowerCase();
    let score = 0;

    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 40;

    if (keywords.split(" ").some((k) => k.startsWith(q))) score += 30;
    if (keywords.includes(q)) score += 20;
    if (description.includes(q)) score += 8;

    return { page, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.page);
}
