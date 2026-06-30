// Flat list of every token surfaced across the manual. Powers the
// searchable/filterable explorer at /tokens. Add a token here and it
// appears in search + its category filter automatically.

export const CATEGORIES = ["Colour", "Typography", "Spacing & shape", "Elevation", "Motion"];

export const TOKENS = [
  // ---- Colour: brand gradient stops ----
  { category: "Colour", type: "color", name: "Gradient — Yellow", token: "--ig-stop-yellow / --gradient-yellow", light: "255, 214, 0" },
  { category: "Colour", type: "color", name: "Gradient — Orange", token: "--ig-stop-orange", light: "255, 122, 0" },
  { category: "Colour", type: "color", name: "Gradient — Rose", token: "--ig-stop-rose", light: "255, 1, 105" },
  { category: "Colour", type: "color", name: "Gradient — Magenta", token: "--ig-stop-magenta", light: "211, 0, 197" },
  { category: "Colour", type: "color", name: "Gradient — Purple", token: "--ig-stop-purple / --gradient-purple", light: "118, 56, 250" },

  // ---- Colour: semantic light/dark ----
  { category: "Colour", type: "color", name: "Primary background", token: "--ig-primary-bg", light: "255, 255, 255", dark: "12, 16, 20" },
  { category: "Colour", type: "color", name: "Secondary background", token: "--ig-secondary-bg", light: "243, 245, 247", dark: "37, 41, 46" },
  { category: "Colour", type: "color", name: "Elevated background", token: "--ig-elevated-bg", light: "255, 255, 255", dark: "33, 35, 40" },
  { category: "Colour", type: "color", name: "Secondary elevated bg", token: "--ig-secondary-elevated-bg", light: "243, 245, 247", dark: "43, 48, 54" },
  { category: "Colour", type: "color", name: "Primary text", token: "--ig-primary-text", light: "0, 0, 0", dark: "245, 245, 245" },
  { category: "Colour", type: "color", name: "Secondary text", token: "--ig-secondary-text", light: "115, 115, 115", dark: "168, 168, 168" },
  { category: "Colour", type: "color", name: "Tertiary text", token: "--ig-tertiary-text", light: "115, 115, 115", dark: "199, 199, 199" },
  { category: "Colour", type: "color", name: "Primary icon", token: "--ig-primary-icon", light: "38, 38, 38", dark: "245, 245, 245" },
  { category: "Colour", type: "color", name: "Secondary icon", token: "--ig-secondary-icon", light: "142, 142, 142" },
  { category: "Colour", type: "color", name: "Highlight / hover fill", token: "--ig-highlight-bg", light: "239, 239, 239", dark: "38, 38, 38" },
  { category: "Colour", type: "color", name: "Separator", token: "--ig-separator", light: "219, 219, 219", dark: "38, 38, 38" },
  { category: "Colour", type: "color", name: "Stroke", token: "--ig-stroke", light: "219, 219, 219", dark: "85, 85, 85" },
  { category: "Colour", type: "color", name: "Focus stroke", token: "--ig-focus-stroke", light: "168, 168, 168", dark: "85, 85, 85" },

  // ---- Colour: fixed semantics ----
  { category: "Colour", type: "color", name: "Primary button", token: "--ig-primary-button", light: "0, 149, 246", description: "#0095F6" },
  { category: "Colour", type: "color", name: "Primary button hover", token: "--ig-primary-button-hover", light: "24, 119, 242" },
  { category: "Colour", type: "color", name: "Error / destructive", token: "--ig-error", light: "237, 73, 86" },
  { category: "Colour", type: "color", name: "Success", token: "--ig-success", light: "88, 195, 34" },
  { category: "Colour", type: "color", name: "Live badge", token: "--ig-live-badge", light: "255, 1, 105" },
  { category: "Colour", type: "color", name: "Close Friends", token: "--ig-close-friends", light: "28, 209, 79" },
  { category: "Colour", type: "color", name: "Subscribers only", token: "--ig-subscribers-only", light: "118, 56, 250" },
  { category: "Colour", type: "color", name: "Outgoing DM bubble", token: "--ig-outgoing-bubble", light: "74, 93, 249" },
  { category: "Colour", type: "color", name: "Incoming DM bubble", token: "--ig-incoming-bubble", light: "243, 245, 247", dark: "37, 41, 46" },
  { category: "Colour", type: "color", name: "Always white", token: "--ig-always-white", light: "255, 255, 255" },
  { category: "Colour", type: "color", name: "Always black", token: "--ig-always-black", light: "0, 0, 0" },

  // ---- Colour: syntax highlighting (extended — see Platform Guidance) ----
  { category: "Colour", type: "code", name: "Code keyword", token: "--code-keyword", light: "118, 56, 250" },
  { category: "Colour", type: "code", name: "Code string", token: "--code-string", light: "88, 195, 34" },
  { category: "Colour", type: "code", name: "Code comment", token: "--code-comment", light: "115, 115, 115", dark: "168, 168, 168" },
  { category: "Colour", type: "code", name: "Code number", token: "--code-number", light: "255, 122, 0" },
  { category: "Colour", type: "code", name: "Code type (CSS custom property)", token: "--code-type", light: "0, 149, 246" },

  // ---- Typography: font families ----
  { category: "Typography", type: "family", name: "Product UI", token: "--font-family-product", value: "Optimistic VF / Montserrat fallback" },
  { category: "Typography", type: "family", name: "Brand — main", token: "--font-family-brand", value: "Instagram Sans local cuts" },
  { category: "Typography", type: "family", name: "Brand — headline optical cut", token: "--font-family-brand-headline", value: "Instagram Sans Headline" },
  { category: "Typography", type: "family", name: "Brand — condensed cut", token: "--font-family-brand-condensed", value: "Instagram Sans Condensed → Instagram Sans" },
  { category: "Typography", type: "family", name: "Brand — script cut", token: "--font-family-brand-script", value: "Instagram Sans Script → Instagram Sans" },
  { category: "Typography", type: "family", name: "Brand — UI variant", token: "--font-family-brand-ui", value: "Instagram Sans UI → var(--font-family-system)" },
  { category: "Typography", type: "family", name: "Brand — squeeze (standalone)", token: "--font-family-squeeze", value: "Instagram Squeeze → var(--font-family-system)" },

  // ---- Typography: weights ----
  { category: "Typography", type: "weight", name: "Extralight", token: "--fw-extralight", value: 200 },
  { category: "Typography", type: "weight", name: "Light", token: "--fw-light", value: 300 },
  { category: "Typography", type: "weight", name: "Regular", token: "--fw-regular", value: 400 },
  { category: "Typography", type: "weight", name: "Medium", token: "--fw-medium", value: 500 },
  { category: "Typography", type: "weight", name: "Semibold", token: "--fw-semibold", value: 600 },
  { category: "Typography", type: "weight", name: "Bold", token: "--fw-bold", value: 700 },
  { category: "Typography", type: "weight", name: "Extrabold", token: "--fw-extrabold", value: 800 },

  // ---- Typography: system scale ----
  { category: "Typography", type: "scale", name: "System 10", token: "--system-10-font-size", size: 10, lineHeight: 12 },
  { category: "Typography", type: "scale", name: "System 12", token: "--system-12-font-size", size: 12, lineHeight: 16 },
  { category: "Typography", type: "scale", name: "System 14", token: "--system-14-font-size", size: 14, lineHeight: 18 },
  { category: "Typography", type: "scale", name: "System 16", token: "--system-16-font-size", size: 16, lineHeight: 24 },
  { category: "Typography", type: "scale", name: "System 18", token: "--system-18-font-size", size: 18, lineHeight: 24 },
  { category: "Typography", type: "scale", name: "System 22", token: "--system-22-font-size", size: 22, lineHeight: 26 },
  { category: "Typography", type: "scale", name: "System 24", token: "--system-24-font-size", size: 24, lineHeight: 27 },
  { category: "Typography", type: "scale", name: "System 28", token: "--system-28-font-size", size: 28, lineHeight: 32 },
  { category: "Typography", type: "scale", name: "System 32", token: "--system-32-font-size", size: 32, lineHeight: 40 },

  // ---- Spacing: named scale ----
  { category: "Spacing & shape", type: "spacing", name: "Space 1 — Micro",  token: "--space-1",  value: "4px"  },
  { category: "Spacing & shape", type: "spacing", name: "Space 2 — XS",     token: "--space-2",  value: "8px"  },
  { category: "Spacing & shape", type: "spacing", name: "Space 3 — SM",     token: "--space-3",  value: "12px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 4 — Base",   token: "--space-4",  value: "16px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 5 — MD",     token: "--space-5",  value: "24px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 6 — LG",     token: "--space-6",  value: "32px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 7 — XL",     token: "--space-7",  value: "40px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 8 — 2XL",    token: "--space-8",  value: "48px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 9 — 3XL",    token: "--space-9",  value: "64px" },
  { category: "Spacing & shape", type: "spacing", name: "Space 10 — 4XL",   token: "--space-10", value: "96px" },

  // ---- Icon size scale ----
  { category: "Spacing & shape", type: "icon", name: "Icon SM — Inline/badge",     token: "--icon-size-sm", value: "16px" },
  { category: "Spacing & shape", type: "icon", name: "Icon MD — Nav/action",       token: "--icon-size-md", value: "20px" },
  { category: "Spacing & shape", type: "icon", name: "Icon LG — Primary action",   token: "--icon-size-lg", value: "24px" },
  { category: "Spacing & shape", type: "icon", name: "Icon XL — Hero/empty state", token: "--icon-size-xl", value: "32px" },

  // ---- Elevation: shadow tokens ----
  { category: "Elevation", type: "shadow", name: "Shadow inset",    token: "--shadow-inset",    value: "0 0 0 1px rgba(0,0,0,.08) inset" },
  { category: "Elevation", type: "shadow", name: "Shadow card",     token: "--shadow-card",     value: "0 1px 4px rgba(0,0,0,.10), 0 0 0 .5px rgba(0,0,0,.06)" },
  { category: "Elevation", type: "shadow", name: "Shadow list",     token: "--shadow-list",     value: "0 2px 8px rgba(0,0,0,.15), 0 1px 1px rgba(0,0,0,.10)" },
  { category: "Elevation", type: "shadow", name: "Shadow elevated", token: "--shadow-elevated",  value: "0 2px 26px rgba(0,0,0,.30), 0 0 0 1px rgba(0,0,0,.10)" },
  { category: "Elevation", type: "shadow", name: "Shadow sheet",    token: "--shadow-8",        value: "0 -6px 16px rgba(0,0,0,.18)" },
  { category: "Elevation", type: "layer",  name: "Layer 1 — Card",  token: "--layer-1",         value: "10"   },
  { category: "Elevation", type: "layer",  name: "Layer 2 — List",  token: "--layer-2",         value: "20"   },
  { category: "Elevation", type: "layer",  name: "Layer 8 — Modal", token: "--layer-8",         value: "80"   },
  { category: "Elevation", type: "layer",  name: "Layer 10 — Focus",token: "--layer-10",        value: "100"  },

  // ---- Spacing & shape: grid ----
  { category: "Spacing & shape", type: "grid", name: "Grid unit ×1", token: "--ig-grid-unit", value: "7.142vw" },
  { category: "Spacing & shape", type: "grid", name: "Grid unit ×2", token: "--ig-grid-unit-2", value: "14.285vw" },
  { category: "Spacing & shape", type: "grid", name: "Grid unit ×3", token: "--ig-grid-unit-3", value: "21.428vw" },
  { category: "Spacing & shape", type: "grid", name: "Grid unit ×5", token: "--ig-grid-unit-5", value: "35.714vw" },
  { category: "Spacing & shape", type: "grid", name: "Grid unit ×9", token: "--ig-grid-unit-9", value: "64.285vw" },
  { category: "Spacing & shape", type: "radius", name: "Radius xs", token: "--radius-xs", value: 2 },
  { category: "Spacing & shape", type: "radius", name: "Radius sm", token: "--radius-sm", value: 4 },
  { category: "Spacing & shape", type: "radius", name: "Radius md", token: "--radius-md", value: 8 },
  { category: "Spacing & shape", type: "radius", name: "Radius lg / input", token: "--input-radius", value: 6 },
  { category: "Spacing & shape", type: "radius", name: "Radius xl / modal", token: "--modal-radius", value: 12 },
  { category: "Spacing & shape", type: "radius", name: "Radius pill", token: "--radius-pill", value: 999 },

  // ---- Motion ----
  { category: "Motion", type: "ease", name: "Ease Standard", token: "--ease-standard", value: "cubic-bezier(0.33, 0, 0.67, 1)" },
  { category: "Motion", type: "ease", name: "Ease Confident", token: "--ease-confident", value: "cubic-bezier(0.7, 0, 0.3, 1)" },
  { category: "Motion", type: "ease", name: "Ease Glide", token: "--ease-glide", value: "cubic-bezier(0, 0, 0.1, 1)" },
  { category: "Motion", type: "ease", name: "Ease Settle", token: "--ease-settle", value: "cubic-bezier(0, 0.61, 0.28, 0.92)" },
  { category: "Motion", type: "ease", name: "Ease Anticipate", token: "--ease-anticipate", value: "cubic-bezier(0.4, 0, 0.1, 1)" },
  { category: "Motion", type: "duration", name: "Micro-feedback", token: "--duration-micro", value: "150ms" },
  { category: "Motion", type: "duration", name: "Reveal", token: "--duration-reveal", value: "666ms" },
  { category: "Motion", type: "duration", name: "Narrative beat", token: "--duration-narrative", value: "2000ms" },
];
