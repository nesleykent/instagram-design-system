import { COMPONENT_NAV_ITEMS } from "./component-guides";

// Single source of truth for site navigation. Sidebar, breadcrumbs,
// prev/next footer nav, and the search index are all derived from this
// file — add a page by adding one entry here plus the route itself.

export const NAV = [
  {
    group: "Get started",
    items: [
      {
        title: "Overview",
        href: "/",
        description:
          "Why this manual exists, how it was built, and the three pillars Instagram's own brand page names.",
        keywords: ["home", "introduction", "about", "pillars"],
      },
    ],
  },
  {
    group: "Foundations",
    items: [
      {
        title: "Typography",
        href: "/typography",
        description:
          "Optimistic and Instagram Sans, weight and type scales, tracking, and the fluid display-type formula.",
        keywords: ["font", "type", "optimistic", "instagram sans", "weight", "tracking", "letter-spacing"],
      },
      {
        title: "Colour",
        href: "/color",
        description:
          "The five-stop brand gradient, semantic light/dark tokens, neutrals, overlays, and the token architecture.",
        keywords: ["color", "gradient", "palette", "dark mode", "tokens", "rgb"],
      },
      {
        title: "Layout & Grid",
        href: "/layout-grid",
        description:
          "The 14-unit fluid grid, breakpoint tiers, 100vh section rhythm, and the split-screen template.",
        keywords: ["grid", "breakpoints", "responsive", "vw", "spacing", "viewport"],
      },
      {
        title: "Shape",
        href: "/shape",
        description:
          "The circle / squircle / pill grammar, the radius scale, and functional clip-path notches.",
        keywords: ["radius", "squircle", "corner", "clip-path", "pill", "circle"],
      },
      {
        title: "Motion",
        href: "/motion",
        description:
          "Named easing curves, the duration scale, clip-path reveals, and the signature rolling-chevron affordance.",
        keywords: ["animation", "easing", "cubic-bezier", "transition", "duration", "reduced motion"],
      },
      {
        title: "Imagery",
        href: "/imagery",
        description:
          "The asymmetric mosaic collage, sticky pinned hero photography, crop ratios, and the scrim overlay system.",
        keywords: ["photography", "image", "crop", "aspect ratio", "collage", "overlay"],
      },
      {
        title: "Icons",
        href: "/icons",
        description:
          "Size scale (16/20/24/32px), filled vs outline grammar, semantic colour tokens, and touch target requirements.",
        keywords: ["icon", "svg", "filled", "outline", "24px", "touch target", "glyph"],
      },
      {
        title: "Spacing",
        href: "/spacing",
        description:
          "The 8px base unit, the 10-step named scale, and which step to use in which context.",
        keywords: ["spacing", "padding", "margin", "gap", "8px", "grid", "density"],
      },
      {
        title: "Elevation",
        href: "/elevation",
        description:
          "Seven shadow levels from flat to sheet, the --shadow-* token system, and z-index layer pairing.",
        keywords: ["shadow", "elevation", "z-index", "layer", "depth", "box-shadow", "modal"],
      },
      {
        title: "Accessibility",
        href: "/accessibility",
        description:
          "What the system gets right — and the specific, citable risks — across contrast, focus, and motion.",
        keywords: ["a11y", "contrast", "focus", "screen reader", "forced colors", "open dyslexic"],
      },
    ],
  },
  {
    group: "Components",
    items: [
      {
        title: "Overview",
        href: "/components",
        description: "Every component, browsable by category and evidence tier.",
        keywords: ["components"],
      },
      {
        title: "Buttons",
        href: "/components/buttons",
        description: "The three-tier primary / secondary / tertiary hierarchy and their states.",
        keywords: ["button", "cta", "primary", "secondary", "tertiary"],
      },
      {
        title: "Charts",
        href: "/components/charts",
        description: "Instagram-style data visualisation anatomy, marks, axes, interaction, and accessibility.",
        keywords: ["chart", "data", "analytics", "visualization", "axis", "tooltip"],
      },
      {
        title: "Links & Navigation",
        href: "/components/links-navigation",
        description: "The underline-grow hover treatment and the structurally-inert disabled state.",
        keywords: ["link", "nav", "underline", "hover"],
      },
      {
        title: "Cards",
        href: "/components/cards",
        description: "The deep-dive editorial card and the legacy utility card.",
        keywords: ["card", "editorial"],
      },
      {
        title: "Modals & Panels",
        href: "/components/modals",
        description: "Full-height panels, the lightbox zoom-settle, and corner-clipping via clip-path.",
        keywords: ["modal", "dialog", "panel", "lightbox", "sheet"],
      },
      {
        title: "Messaging",
        href: "/components/messaging",
        description: "Chat bubble colour, the functional tail notch, and the Optimistic DM type cut.",
        keywords: ["chat", "dm", "bubble", "message"],
      },
      {
        title: "Stories Progress",
        href: "/components/stories-progress",
        description: "The segmented pill progress bar that drives Stories playback.",
        keywords: ["stories", "progress", "segment"],
      },
      {
        title: "Dropdowns & Selectors",
        href: "/components/dropdowns",
        description: "The interactive type-tester swatch pattern and legacy dense menus.",
        keywords: ["dropdown", "select", "menu", "swatch", "picker"],
      },
      {
        title: "Forms",
        href: "/components/forms",
        description: "Input borders, radius, and focus tokens.",
        keywords: ["form", "input", "field"],
      },
      ...COMPONENT_NAV_ITEMS,
    ],
  },
  {
    group: "Resources",
    items: [
      {
        title: "Design Tokens",
        href: "/tokens",
        description: "Every token in this system, searchable, with copy-to-clipboard values.",
        keywords: ["tokens", "variables", "css custom properties", "search"],
      },
      {
        title: "Methodology",
        href: "/methodology",
        description: "Evidence tiers, the token architecture, scoping decisions, and open questions.",
        keywords: ["methodology", "sources", "evidence", "confidence"],
      },
      {
        title: "Platform Guidance",
        href: "/platform",
        description:
          "Applying this system to native mobile, dashboards, developer products, and games.",
        keywords: ["native", "ios", "android", "dashboard", "game", "density", "platform", "extension"],
      },
    ],
  },
];

export const FLAT_PAGES = NAV.flatMap((g) => g.items.map((item) => ({ ...item, group: g.group })));

// next.config.js sets trailingSlash: true (required for clean static-export
// hosting on GitHub Pages), so usePathname() returns "/foo/" while every
// href in this file is "/foo" — normalize before comparing anywhere below.
export function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function getPageMeta(href) {
  const path = normalizePath(href);
  return FLAT_PAGES.find((p) => p.href === path);
}

export function getPrevNext(href) {
  const path = normalizePath(href);
  const index = FLAT_PAGES.findIndex((p) => p.href === path);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? FLAT_PAGES[index - 1] : null,
    next: index < FLAT_PAGES.length - 1 ? FLAT_PAGES[index + 1] : null,
  };
}

export function getBreadcrumbs(href) {
  const path = normalizePath(href);
  for (const group of NAV) {
    const item = group.items.find((i) => i.href === path);
    if (!item) continue;

    const crumbs = [{ title: "Manual", href: "/" }];
    const groupHasOverview = group.items[0].title === "Overview";
    const isGroupOverviewPage = groupHasOverview && item.href === group.items[0].href;

    if (group.group !== "Get started") {
      if (isGroupOverviewPage) {
        // On a group's own index page, show the group's real name as the
        // current-page crumb ("Components") rather than the generic item
        // title ("Overview"), which is meaningless out of sidebar context.
        crumbs.push({ title: group.group, href: item.href });
        return crumbs;
      }
      // Only link the group label when it has a real index page to land on;
      // otherwise show it as a plain, non-clickable label.
      crumbs.push({ title: group.group, href: groupHasOverview ? group.items[0].href : null });
    }
    crumbs.push({ title: item.title, href: item.href });
    return crumbs;
  }
  return [{ title: "Manual", href: "/" }];
}
