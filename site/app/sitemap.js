import { FLAT_PAGES } from "@/lib/nav";

export const dynamic = "force-static";

const BASE_URL = "https://nesleykent.github.io/instagram-design-system";

export default function sitemap() {
  return FLAT_PAGES.map((page) => ({
    url: `${BASE_URL}${page.href === "/" ? "" : page.href}/`,
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : page.href.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
