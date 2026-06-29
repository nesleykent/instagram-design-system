import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  metadataBase: undefined,
  title: {
    default: "Instagram Brand Identity Manual",
    template: "%s · Instagram Brand Identity Manual",
  },
  description:
    "A reverse-engineered, production documentation site for Instagram's own brand identity system — typography, colour, layout, shape, components, motion, imagery, and accessibility, sourced directly from Instagram's CSS.",
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
