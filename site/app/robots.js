export const dynamic = "force-static";

const BASE_URL = "https://nesleykent.github.io/instagram-design-system";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
