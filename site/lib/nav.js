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
        title: "Accessibility",
        href: "/accessibility",
        description:
          "What the system gets right — and the specific, citable gaps — across contrast, focus, and motion.",
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
        description: "Every documented component, browsable by category.",
        keywords: ["components"],
      },
      {
        title: "Buttons",
        href: "/components/buttons",
        description: "The three-tier primary / secondary / tertiary hierarchy and their states.",
        keywords: ["button", "cta", "primary", "secondary", "tertiary"],
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
    ],
  },
];

export const FLAT_PAGES = NAV.flatMap((g) => g.items.map((item) => ({ ...item, group: g.group })));

export function getPageMeta(href) {
  return FLAT_PAGES.find((p) => p.href === href);
}

export function getPrevNext(href) {
  const index = FLAT_PAGES.findIndex((p) => p.href === href);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? FLAT_PAGES[index - 1] : null,
    next: index < FLAT_PAGES.length - 1 ? FLAT_PAGES[index + 1] : null,
  };
}

export function getBreadcrumbs(href) {
  for (const group of NAV) {
    const item = group.items.find((i) => i.href === href);
    if (item) {
      const crumbs = [{ title: "Manual", href: "/" }];
      if (group.group !== "Get started") {
        crumbs.push({ title: group.group, href: group.items[0].href });
      }
      if (!(group.group !== "Get started" && item.title === "Overview")) {
        crumbs.push({ title: item.title, href: item.href });
      }
      return crumbs;
    }
  }
  return [{ title: "Manual", href: "/" }];
}
