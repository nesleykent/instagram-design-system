import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import SiteShell from "@/components/SiteShell";

const SITE_URL = "https://nesleykent.github.io/instagram-design-system";
const SITE_DESCRIPTION =
  "A source-backed documentation site for Instagram's brand identity system, tracing confirmed rules to production CSS and marking token-derived or not-found component guidance by evidence tier.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Instagram Brand Identity Manual",
    template: "%s · Instagram Brand Identity Manual",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Instagram Brand Identity Manual",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Instagram Brand Identity Manual",
    images: [{ url: "/brand-glyph.png", width: 256, height: 256 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Instagram Brand Identity Manual",
    description: SITE_DESCRIPTION,
    images: ["/brand-glyph.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
