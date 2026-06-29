const IG_APP_CSS =
  "/ig/QhPToV7QelD3mQgfUHD55wHgg0BzlELrIyN70lAdsPet3O926IpA3OuHTDb5AtLODcfgQe914iiBfONMKn3YhINqtPbgX2VI-6IU49pVNahkCkQvuWABIjhhRs97xFZK--hBruhBENOpKm_.css";

const IG_APP_CSS_ALT =
  "/ig/QhPToV7QelD3mQgfUHD55wyN70lAdsPetfgQe914iiBfONMKn3YhINqtPbgX2VI-6IU49pVNahkCkGzNiZ9AWV5Gs97xFZK--hBruhBENOpKm_.css";

export const CSS_REFERENCES = {
  appTokens: {
    title: "Application semantic tokens",
    file: IG_APP_CSS,
    fragments: [
      "--ig-primary-background:255, 255, 255",
      "--ig-secondary-background:243, 245, 247",
      "--ig-elevated-background:255, 255, 255",
      "--ig-primary-text:0, 0, 0",
      "--ig-secondary-text:115, 115, 115",
      "--ig-separator:219, 219, 219",
      "--ig-stroke:219, 219, 219",
      "--base-unit:4px",
    ],
    note:
      "Most app components are constructed from RGB semantic tokens rather than hard-coded page-local colours.",
  },
  typography: {
    title: "System type and control text",
    file: IG_APP_CSS,
    fragments: [
      "--font-family-system:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      "--system-12-font-size:12px; --system-12-line-height:16px",
      "--system-14-font-size:14px; --system-14-line-height:18px",
      "--system-16-font-size:16px; --system-16-line-height:24px",
      "--font-weight-system-semibold:600",
      "body button, body input, body textarea inherit the system family and 14px rhythm",
    ],
    note:
      "The captured app CSS keeps UI chrome compact: 12px, 14px, and 16px text sizes carry most controls.",
  },
  brandGrid: {
    title: "Brand grid and responsive spacing",
    file: "/ig/cyug0JeffsB.css",
    fragments: [
      "7.142vw spacing units recur across brand sections",
      "max-width:1600px containers",
      "split sections use 50% columns until mobile breakpoints",
      "@media (max-width: 768px) switches dense grids to 1 or 2 columns",
    ],
    note:
      "Brand pages use a 14-column rhythm, wide viewport sections, and early mobile simplification instead of arbitrary card gutters.",
  },
  brandMotion: {
    title: "Brand motion grammar",
    file: "/ig/rrhy0Jd1eT4.css",
    fragments: [
      "cubic-bezier(0,0,.1,1)",
      "cubic-bezier(.7,0,.3,1)",
      "clip-path reveal blocks",
      "rolling arrow and text animations",
      "linear progress fill for story-like sequencing",
    ],
    note:
      "Motion is mostly transform, opacity, clip-path, and scaleX, with reduced decorative choreography on small screens.",
  },
  imagery: {
    title: "Image and media layouts",
    file: "/ig/rrhy0Jd1eT4.css",
    fragments: [
      "aspect-ratio:16 / 9",
      "aspect-ratio:3 / 4",
      "object-fit:cover; object-position:center",
      "overflow-x:scroll with hidden scrollbars on mobile galleries",
    ],
    note:
      "Image views are ratio-led and object-fit driven, then become horizontal or single-column flows on narrow screens.",
  },
  buttons: {
    title: "Button primitives",
    file: IG_APP_CSS,
    fragments: [
      "--ig-primary-button:0, 149, 246",
      "--ig-primary-button-hover:24, 119, 242",
      "._aa8a uses appearance:none, border:0, system-16 text, semibold weight",
      "legacy ._4jy0 and ._al65/._al66 confirm compact heights and 6px radii",
    ],
    note:
      "Buttons are flat, text-precise controls. Hover changes colour or opacity, not layout.",
  },
  menus: {
    title: "Menu and contextual layers",
    file: "/ig/cyug0JeffsB.css",
    fragments: [
      ".uiContextualLayer positions the flyout",
      "._54ng background:#fff; border:1px solid rgba(0,0,0,.15); border-radius:3px",
      "box-shadow:0 3px 8px #0000004d",
      ".openToggler controls visibility",
    ],
    note:
      "Menus are contextual layers with a compact radius, clear border, and explicit open/closed toggler state.",
  },
  modal: {
    title: "Modal, panel, and sheet surfaces",
    file: IG_APP_CSS,
    fragments: [
      "--modal-backdrop-default:rgba(0, 0, 0, .65)",
      "--modal-backdrop-dark:rgba(0, 0, 0, .85)",
      "--modal-border-radius:12px",
      "--modal-padding:16px",
      "IGCoreModalShow .1s ease-out",
    ],
    note:
      "Presentation surfaces use a fixed z-index layer, restrained padding, and short entrance motion.",
  },
  sheet: {
    title: "Full-height translated panel",
    file: "/ig/cyug0JeffsB.css",
    fragments: [
      "._a96f position:fixed; height:100%; width:100%; z-index:400",
      "transform:translateY(100%)",
      "transition:transform .5s cubic-bezier(0,.61,.28,.92)",
      "._a96f._a94- transform:translateY(0)",
    ],
    note:
      "Instagram's brand menu behaves like a full-height sheet, not a floating desktop popover.",
  },
  scroll: {
    title: "Scrollable regions",
    file: "/ig/cyug0JeffsB.css",
    fragments: [
      ".uiScrollableArea height:100%; overflow:hidden; position:relative",
      ".uiScrollableAreaWrap overflow-y:scroll",
      ".uiScrollableAreaTrack width:7px",
      ".uiScrollableAreaGripper border-radius:7px; transition:width .25s",
    ],
    note:
      "Scroll views own their viewport, shadow affordances, and custom gripper instead of relying on accidental body scroll.",
  },
  search: {
    title: "Search rows and result sizing",
    file: IG_APP_CSS,
    fragments: [
      "--search-box-height:40px",
      "--search-result-height:50px",
      "--search-result-list-width:375px",
      "._acmx row uses border-bottom, 10px 16px padding, and nowrap truncation",
      "._acmy upgrades rows to 60px with a 44px avatar well",
    ],
    note:
      "Search fields pair a fixed-height input with compact, truncating result rows and visible selected/hover states.",
  },
  inputs: {
    title: "Input fields and floating labels",
    file: IG_APP_CSS,
    fragments: [
      "._aa48 height:36px; display:flex; min-width:0",
      "._aa4a label uses system-12, line-height:36px, transform-origin:left",
      "._aa49 ._aa4a transforms to scale(10 / 12) translateY(-10px)",
      "._add6 background:rgb(var(--ig-secondary-background)); padding:9px 0 7px 8px",
      "._ac4d:disabled uses highlight background and not-allowed cursor",
    ],
    note:
      "Text input anatomy is compact: a 36px field, a floating 12px label, and a secondary-background fill.",
  },
  toggles: {
    title: "Toggle switch anatomy",
    file: "/ig/31d5t_UoCWK.css",
    fragments: [
      "._9nq9 width:51px; height:31px",
      "._9nqb border-radius:20px",
      "thumb is 28px with layered shadow",
      "checked state translates the thumb 23px",
      "disabled state drops opacity to .3",
    ],
    note:
      "The switch is a mobile-native control with a 51 x 31 track, a nearly full-height thumb, and one translate state change.",
  },
  status: {
    title: "Status and progress motion",
    file: IG_APP_CSS,
    fragments: [
      "story progress uses width transition with linear timing",
      "pulse-ring and pulse keyframes support live state emphasis",
      "IGCoreToastShow and IGCoreToastHide define transient feedback",
      "xuiButtonLoadingSpinner rotates a 12px ring once per second",
    ],
    note:
      "Status indicators communicate progress or activity with looped transform animation, then settle back to semantic colours.",
  },
  accessibility: {
    title: "Reduced motion and focus",
    file: IG_APP_CSS_ALT,
    fragments: [
      "@media (prefers-reduced-motion: reduce)",
      "animation-duration:0!important",
      "transition-duration:0!important",
      "--ig-focus-stroke:168, 168, 168",
      "forced-colors: active rules are present in utility CSS",
    ],
    note:
      "Every interactive component in this manual should preserve focus visibility and provide a reduced-motion path.",
  },
};

const CATEGORY_DEFAULTS = {
  Content: {
    principle: "Keep the content object honest: the frame should clarify media, data, or text without adding decorative chrome.",
    interaction: "Interaction should reveal detail, selection, or playback state. Avoid hidden controls that only appear after precision hover.",
    layout: "Use ratio, truncation, and semantic spacing so content remains scannable in feed, modal, and narrow-column contexts.",
    responsive: "Collapse dense content into a single column or horizontal scroller before shrinking text below the documented system sizes.",
    accessibility: "Expose text alternatives, labels, and structured names for the content. Preserve contrast over media scrims.",
  },
  "Layout And Organization": {
    principle: "Use containers to establish hierarchy, not decoration. The /ig CSS favours grids, split panes, borders, and rhythm over nested cards.",
    interaction: "Layout controls should disclose, select, or resize with one clear state change.",
    layout: "Anchor spacing to the 4px app base unit and the brand 7.142vw rhythm where pages become editorial.",
    responsive: "Move from multi-column to stacked or horizontally scrollable layouts at the same 768px and 650px breakpoints seen in /ig.",
    accessibility: "Keep DOM order aligned with the visual order after responsive changes, especially for split and outline layouts.",
  },
  "Menus And Actions": {
    principle: "Actions should feel immediate, compact, and reversible. Menus are contextual layers, not new pages.",
    interaction: "Open with a direct button or gesture, keep focus inside the active layer, and close on Escape, outside press, or completed action.",
    layout: "Use compact row heights, semibold labels, and separators only when they improve grouping.",
    responsive: "Prefer sheets or action rows on touch viewports and flyouts on wider pointer-driven viewports.",
    accessibility: "Use menu, menuitem, toolbar, and button semantics only when the interaction model matches those roles.",
  },
  "Navigation And Search": {
    principle: "Navigation components should preserve orientation. Selection, hierarchy, and search results need stable positions.",
    interaction: "Typing, selection, and route changes should update visible state immediately without layout jumps.",
    layout: "Use fixed-height rows, truncation, and clear dividers so navigation remains usable in narrow sidebars.",
    responsive: "Collapse wide navigation into bottom bars, compact sidebars, or search-first flows before hiding destinations entirely.",
    accessibility: "Expose the current page, selected tab, query label, and result count to assistive technology.",
  },
  Presentation: {
    principle: "Presentation surfaces interrupt with purpose. The scrim, radius, padding, and entrance motion should describe modality.",
    interaction: "Keep dismissal predictable and never strand focus behind a scrim.",
    layout: "Use 12px modal radii, 16px padding, centered content, and fixed z-index layers where the source CSS does.",
    responsive: "Promote popovers and panels to sheets or full-width surfaces when viewport height or width becomes constrained.",
    accessibility: "Use dialog semantics, labelled titles, focus trapping, and visible close actions.",
  },
  "Selection And Input": {
    principle: "Input controls should look quiet until active, then show one strong state: focus, selected, invalid, or disabled.",
    interaction: "Direct manipulation should update value text, selected affordance, and accessibility state together.",
    layout: "Keep controls aligned to the 36px/40px/44px control heights seen in /ig and pair labels with the field, not the surrounding card.",
    responsive: "Use native platform affordances when small touch targets would otherwise become ambiguous.",
    accessibility: "Every input needs a programmatic label, visible focus state, keyboard path, and error message when validation fails.",
  },
  Status: {
    principle: "Status components should report work, not decorate it. Motion must be informative and interruptible.",
    interaction: "Let users distinguish indeterminate activity from measurable progress and complete states.",
    layout: "Status indicators should align with nearby labels and avoid reflow when values change.",
    responsive: "Keep indicators readable at compact sizes and pair icon-only status with text in critical flows.",
    accessibility: "Use live regions sparingly and expose numeric values for gauges, ratings, and progress bars.",
  },
};

const DEMO_COPY = {
  chart: {
    anatomy: ["Chart frame", "Data mark", "Axis label", "Value label", "Selected state"],
    variants: ["Compact spark bars", "Segmented bars", "Single KPI chart"],
    states: ["Loading shimmer", "Selected value", "Empty data", "Reduced motion"],
  },
  media: {
    anatomy: ["Ratio frame", "Media object", "Inner stroke", "Caption rail", "Action affordance"],
    variants: ["Square", "Portrait 3:4", "Landscape 16:9", "Carousel"],
    states: ["Loading", "Loaded", "Selected", "Unavailable"],
  },
  text: {
    anatomy: ["Text frame", "Title", "Body", "Metadata", "Truncation edge"],
    variants: ["Single line", "Multi-line", "Editorial body", "Code text"],
    states: ["Default", "Selected", "Expanded", "Overflowing"],
  },
  web: {
    anatomy: ["Browser frame", "URL label", "Viewport", "Loading bar", "Fallback state"],
    variants: ["Inline preview", "Authenticated web view", "External handoff"],
    states: ["Loading", "Loaded", "Blocked", "Error"],
  },
  layout: {
    anatomy: ["Container", "Header", "Primary region", "Secondary region", "Divider"],
    variants: ["Single column", "Two column", "Grid", "Stacked mobile"],
    states: ["Default", "Selected", "Collapsed", "Overflow"],
  },
  menu: {
    anatomy: ["Trigger", "Contextual layer", "Action row", "Shortcut or hint", "Separator"],
    variants: ["Inline menu", "Context menu", "Toolbar menu", "Sheet menu"],
    states: ["Closed", "Open", "Hovered", "Disabled", "Destructive"],
  },
  nav: {
    anatomy: ["Container", "Current marker", "Destination label", "Icon well", "Badge or count"],
    variants: ["Sidebar", "Tab bar", "Breadcrumb", "Search result"],
    states: ["Current", "Hover", "Pressed", "Collapsed", "Overflow"],
  },
  presentation: {
    anatomy: ["Scrim", "Surface", "Title", "Content", "Actions", "Dismiss control"],
    variants: ["Popover", "Panel", "Sheet", "Alert", "Window"],
    states: ["Entering", "Open", "Scrollable", "Dismissed"],
  },
  input: {
    anatomy: ["Label", "Control", "Value", "Focus ring", "Help or error text"],
    variants: ["Compact", "Full width", "Read only", "Disabled"],
    states: ["Empty", "Focused", "Filled", "Invalid", "Disabled"],
  },
  status: {
    anatomy: ["Track", "Indicator", "Value label", "State text", "Completion mark"],
    variants: ["Indeterminate", "Determinate", "Compact", "Inline with label"],
    states: ["Idle", "Running", "Complete", "Error", "Paused"],
  },
};

const DEMO_FAMILY = {
  charts: "chart",
  "image-views": "media",
  "text-views": "text",
  "web-views": "web",
  boxes: "layout",
  collections: "layout",
  "column-views": "layout",
  "disclosure-controls": "layout",
  labels: "text",
  "lists-and-tables": "layout",
  lockups: "text",
  "outline-views": "layout",
  "split-views": "layout",
  "tab-views": "layout",
  "activity-views": "menu",
  buttons: "menu",
  "context-menus": "menu",
  "dock-menus": "menu",
  "edit-menus": "menu",
  "home-screen-quick-actions": "menu",
  menus: "menu",
  ornaments: "presentation",
  "pop-up-buttons": "input",
  "pull-down-buttons": "menu",
  "menu-bar": "menu",
  toolbars: "menu",
  "path-controls": "nav",
  "search-fields": "nav",
  sidebars: "nav",
  "tab-bars": "nav",
  "token-fields": "input",
  "action-sheets": "presentation",
  alerts: "presentation",
  "page-controls": "nav",
  panels: "presentation",
  popovers: "presentation",
  "scroll-views": "presentation",
  sheets: "presentation",
  windows: "presentation",
  "color-wells": "input",
  "combo-boxes": "input",
  "digit-entry-views": "input",
  "image-wells": "input",
  pickers: "input",
  "segmented-controls": "input",
  sliders: "input",
  steppers: "input",
  "text-fields": "input",
  toggles: "input",
  "virtual-keyboards": "input",
  "activity-rings": "status",
  gauges: "status",
  "progress-indicators": "status",
  "rating-indicators": "status",
};

const RAW_GUIDES = [
  ["Charts", "charts", "Content", "chart", ["appTokens", "typography", "status"], "Use charts for compact, readable metrics without breaking Instagram's neutral interface rhythm.", "Instagram CSS exposes segmented chart colour tokens and story progress timing; chart UI should stay flat, labelled, and semantic."],
  ["Image Views", "image-views", "Content", "media", ["imagery", "brandGrid", "accessibility"], "Use image views to present inspectable media in a stable crop, ratio, and loading model.", "The extracted media CSS is ratio-led with object-fit cover, inner borders, and mobile horizontal scrollers."],
  ["Text Views", "text-views", "Content", "text", ["typography", "appTokens"], "Use text views for longer, selectable, or scrollable copy that needs hierarchy beyond a label.", "Text views inherit the system stack and the 12/14/16/24px rhythm rather than introducing document-style typography."],
  ["Web Views", "web-views", "Content", "web", ["appTokens", "modal", "scroll"], "Use web views when external or embedded content must appear inside an Instagram-owned frame.", "Web views should feel like controlled surfaces with clear fallback, loading, and escape paths."],

  ["Boxes", "boxes", "Layout And Organization", "box", ["appTokens", "brandGrid"], "Use boxes as structural containers for grouping content with borders, background, or spacing.", "The source CSS uses surfaces, separators, and 4px spacing units; boxes should organize hierarchy without decorative nesting."],
  ["Collections", "collections", "Layout And Organization", "collection", ["brandGrid", "imagery", "scroll"], "Use collections for repeating visual or action items that need scanning, selection, or reordering.", "Collections inherit grid and horizontal-scroll behaviour from the brand and app CSS."],
  ["Column Views", "column-views", "Layout And Organization", "columns", ["brandGrid", "scroll"], "Use column views when hierarchy is best explored left to right across adjacent panes.", "Split brand sections and sidebar widths show how Instagram preserves column intent until mobile collapse."],
  ["Disclosure Controls", "disclosure-controls", "Layout And Organization", "disclosure", ["brandMotion", "typography"], "Use disclosure controls to reveal detail without navigating away from the current context.", "The captured CSS uses chevron rotation, height changes, and compact text to disclose extra content."],
  ["Labels", "labels", "Layout And Organization", "label", ["typography", "appTokens"], "Use labels to name values, controls, status, or metadata with compact, unambiguous text.", "Labels should use the documented system sizes and secondary text tokens, not custom grey ramps."],
  ["Lists And Tables", "lists-and-tables", "Layout And Organization", "table", ["appTokens", "search", "scroll"], "Use lists and tables for row-based comparison, search results, settings, and dense metadata.", "Instagram rows rely on fixed heights, separators, truncation, and scroll containment."],
  ["Lockups", "lockups", "Layout And Organization", "lockup", ["typography", "imagery"], "Use lockups to bind an image, avatar, title, subtitle, and action into one scannable unit.", "Search rows and profile surfaces use an icon well plus primary and secondary text with stable spacing."],
  ["Outline Views", "outline-views", "Layout And Organization", "outline", ["appTokens", "brandMotion"], "Use outline views for nested structure that must expand and collapse in place.", "Outlines should combine row separators, chevrons, indentation, and stateful disclosure."],
  ["Split Views", "split-views", "Layout And Organization", "split", ["brandGrid", "scroll"], "Use split views when a persistent source list and detail pane are both needed.", "Instagram's split templates use 50% panes on desktop and stacked content on mobile."],
  ["Tab Views", "tab-views", "Layout And Organization", "tabs", ["brandMotion", "typography"], "Use tab views to switch between peer panels inside a single task.", "Type tester tabs in /ig use underline/border-bottom states and direct content replacement."],

  ["Activity Views", "activity-views", "Menus And Actions", "activity", ["menus", "modal", "buttons"], "Use activity views to expose sharing or export actions as a focused chooser.", "Activity surfaces should prioritize recent destinations, primary actions, and a clear dismiss path."],
  ["Buttons", "buttons", "Menus And Actions", "button", ["buttons", "appTokens", "typography"], "Use buttons for explicit commands with one primary action per local surface.", "Button CSS confirms flat controls, semibold text, tokenized primary blue, and compact heights."],
  ["Context Menus", "context-menus", "Menus And Actions", "context", ["menus", "accessibility"], "Use context menus for object-specific commands that should not occupy permanent chrome.", "Context menus should be contextual layers with compact rows, separators, and keyboard closure."],
  ["Dock Menus", "dock-menus", "Menus And Actions", "dock", ["menus", "brandMotion"], "Use dock menus for persistent command sets that sit against an edge or media frame.", "Docked commands should be compact, pointer-friendly, and responsive to safe-area edges."],
  ["Edit Menus", "edit-menus", "Menus And Actions", "edit", ["menus", "inputs"], "Use edit menus for text and media operations like copy, paste, crop, duplicate, and delete.", "Edit commands need disabled states and destructive styling that map to semantic tokens."],
  ["Home Screen Quick Actions", "home-screen-quick-actions", "Menus And Actions", "quick", ["menus", "buttons"], "Use Home Screen quick actions for a very small set of launch-time destinations.", "Quick actions should be short, verb-led, and mirror real in-app destinations."],
  ["Menus", "menus", "Menus And Actions", "menu", ["menus", "typography"], "Use menus for compact action lists where the trigger and choices stay in one context.", "The legacy contextual layer CSS shows the canonical flyout surface and visibility model."],
  ["Ornaments", "ornaments", "Menus And Actions", "ornament", ["modal", "appTokens"], "Use ornaments for small attached controls around a window or media surface.", "Ornaments must not compete with content; they should appear only when their command is locally relevant."],
  ["Pop Up Buttons", "pop-up-buttons", "Menus And Actions", "popup", ["menus", "inputs"], "Use pop up buttons when one selected value must persist after choosing from a menu.", "Pop up buttons combine input value display with menu behaviour and a selected option state."],
  ["Pull Down Buttons", "pull-down-buttons", "Menus And Actions", "pulldown", ["menus", "buttons"], "Use pull down buttons when a command reveals several related actions but does not store a value.", "Pull down controls should look like buttons until opened, then behave like a contextual menu."],
  ["The Menu Bar", "menu-bar", "Menus And Actions", "menubar", ["menus", "typography"], "Use the menu bar as a global command surface only when the surrounding platform expects it.", "A menu bar needs predictable grouping, keyboard access, and no hidden app-critical commands."],
  ["Toolbars", "toolbars", "Menus And Actions", "toolbar", ["buttons", "menus", "appTokens"], "Use toolbars for frequently repeated commands that benefit from spatial memory.", "Toolbar icons and labels should remain stable while selected, disabled, and overflow states change."],

  ["Path Controls", "path-controls", "Navigation And Search", "path", ["appTokens", "typography"], "Use path controls to show where the user is inside a hierarchy and allow direct jumps.", "Path controls should truncate middle segments and preserve the current destination."],
  ["Search Fields", "search-fields", "Navigation And Search", "search", ["search", "inputs", "accessibility"], "Use search fields for query entry paired with predictable result rows.", "Search CSS exposes 40px boxes, 50px result rows, and compact truncating result anatomy."],
  ["Sidebars", "sidebars", "Navigation And Search", "sidebar", ["appTokens", "search", "scroll"], "Use sidebars for persistent navigation, filters, or source lists.", "Sidebar rows should remain compact, scrollable, and selected with a single clear state."],
  ["Tab Bars", "tab-bars", "Navigation And Search", "tabbar", ["brandMotion", "appTokens"], "Use tab bars for top-level peer destinations where the current section must remain visible.", "Tab bars should preserve selection, badge, and touch target clarity in compact viewports."],
  ["Token Fields", "token-fields", "Navigation And Search", "tokens", ["inputs", "search"], "Use token fields to collect multiple structured values inside one input flow.", "Token fields are input rows plus selected chips; truncation and keyboard deletion must be deliberate."],

  ["Action Sheets", "action-sheets", "Presentation", "actionsheet", ["sheet", "modal", "menus"], "Use action sheets for compact action choices on touch-first surfaces.", "Action sheets adapt contextual menus into a bottom or full-height presentation surface."],
  ["Alerts", "alerts", "Presentation", "alert", ["modal", "buttons", "accessibility"], "Use alerts only for decisions or failures that interrupt the current flow.", "Alerts need one clear title, concise body copy, and an obvious primary or destructive action."],
  ["Page Controls", "page-controls", "Presentation", "pages", ["brandMotion", "status"], "Use page controls to show position inside a small ordered sequence.", "Page controls should update with visible selected state and avoid tiny unlabelled targets when critical."],
  ["Panels", "panels", "Presentation", "panel", ["modal", "sheet", "scroll"], "Use panels for substantial supporting content that should remain related to the current task.", "Panel CSS evidence points to fixed overlays, scrollable interiors, and 12px radius surfaces."],
  ["Popovers", "popovers", "Presentation", "popover", ["menus", "modal"], "Use popovers for lightweight contextual content anchored to a trigger.", "Popovers should be dismissible contextual layers with compact width and focus return."],
  ["Scroll Views", "scroll-views", "Presentation", "scroll", ["scroll", "imagery", "accessibility"], "Use scroll views when content needs an owned viewport, custom shadows, or hidden overflow.", "The CSS has explicit scroll tracks, grippers, mobile hidden scrollbars, and scroll shadows."],
  ["Sheets", "sheets", "Presentation", "sheetdemo", ["sheet", "modal"], "Use sheets for full-height or bottom-up tasks that temporarily take over the viewport.", "The brand menu sheet translates from 100% to 0 with a 500ms settle curve."],
  ["Windows", "windows", "Presentation", "window", ["modal", "appTokens"], "Use windows for independent document or task surfaces with their own title and controls.", "Windows should preserve title, scroll region, command area, and resizable responsive behaviour."],

  ["Color Wells", "color-wells", "Selection And Input", "color", ["inputs", "appTokens"], "Use color wells when a selected colour needs to be visible before opening a picker.", "Colour wells should show swatch, focus, value label, and disabled state."],
  ["Combo Boxes", "combo-boxes", "Selection And Input", "combo", ["inputs", "menus", "search"], "Use combo boxes when typing and menu selection are both valid paths.", "Combo boxes combine input field anatomy with contextual results and keyboard selection."],
  ["Digit Entry Views", "digit-entry-views", "Selection And Input", "digit", ["inputs", "typography"], "Use digit entry views for short numeric codes or fixed-length values.", "Digit entry needs stable cells, clear focus, paste handling, and visible error feedback."],
  ["Image Wells", "image-wells", "Selection And Input", "imagewell", ["imagery", "inputs"], "Use image wells when users choose, replace, or inspect an image value.", "Image wells should use ratio frames, object-fit, and a clear empty state."],
  ["Pickers", "pickers", "Selection And Input", "picker", ["inputs", "menus"], "Use pickers for bounded value sets where browsing is faster than typing.", "Pickers should expose selected state, keyboard movement, and a compact mobile alternative."],
  ["Segmented Controls", "segmented-controls", "Selection And Input", "segmented", ["inputs", "buttons"], "Use segmented controls for small peer choices that update one local view.", "Segments are buttons with a shared track; only one selected state should dominate."],
  ["Sliders", "sliders", "Selection And Input", "slider", ["inputs", "status"], "Use sliders for continuous or near-continuous values with immediate feedback.", "Sliders need visible track, thumb, value label, and keyboard increments."],
  ["Steppers", "steppers", "Selection And Input", "stepper", ["inputs", "buttons"], "Use steppers for small numeric changes where each tap has a predictable increment.", "Steppers should expose minus, value, plus, disabled edges, and touch-sized controls."],
  ["Text Fields", "text-fields", "Selection And Input", "field", ["inputs", "typography", "accessibility"], "Use text fields for freeform values with labels, focus, and validation feedback.", "The captured field CSS confirms a 36px input, floating 12px label, disabled state, and autofill handling."],
  ["Toggles", "toggles", "Selection And Input", "toggle", ["toggles", "inputs"], "Use toggles for immediate binary settings that can be changed without a confirmation flow.", "The switch CSS confirms a 51 x 31 track, 28px thumb, translate-on state, and disabled opacity."],
  ["Virtual Keyboards", "virtual-keyboards", "Selection And Input", "keyboard", ["inputs", "typography"], "Use virtual keyboards when a constrained input surface needs custom keys or previews.", "Virtual keyboards should echo native key sizing, focus order, and visible pressed states."],

  ["Activity Rings", "activity-rings", "Status", "ring", ["status", "accessibility"], "Use activity rings for indeterminate work where duration is unknown.", "Activity rings should loop quietly, pause for reduced motion, and avoid implying measurable progress."],
  ["Gauges", "gauges", "Status", "gauge", ["status", "appTokens"], "Use gauges for bounded values where relative position matters more than exact history.", "Gauges need numeric value semantics, thresholds, and stable labels."],
  ["Progress Indicators", "progress-indicators", "Status", "progress", ["status", "brandMotion"], "Use progress indicators when completion can be measured or staged.", "Story progress in /ig uses scale or width fill with linear timing and compact tracks."],
  ["Rating Indicators", "rating-indicators", "Status", "rating", ["status", "buttons"], "Use rating indicators for user sentiment or quality values with a small bounded range.", "Ratings need selected, hover, keyboard, and read-only variants, not just decorative icons."],
];

function normalizeRef(ref) {
  return CSS_REFERENCES[ref] ? ref : "appTokens";
}

function sentenceList(items, fallback) {
  return items && items.length ? items : fallback;
}

function componentCode(guide) {
  const className = guide.slug.replaceAll("-", "-");
  if (guide.demo.type === "button") {
    return `<button class="ig-button" data-variant="primary">Continue</button>
<button class="ig-button" data-variant="secondary">Save draft</button>
<button class="ig-button" data-variant="tertiary">Cancel</button>`;
  }
  if (guide.demo.type === "field" || guide.demo.family === "input") {
    return `<label class="ig-field">
  <span class="ig-field__label">${guide.title}</span>
  <input class="ig-field__control" name="${className}" />
</label>`;
  }
  if (guide.demo.family === "presentation") {
    return `<section class="ig-${className}" role="dialog" aria-labelledby="${className}-title">
  <h2 id="${className}-title">${guide.title}</h2>
  <p>Keep the surface focused, labelled, and dismissible.</p>
  <button type="button">Done</button>
</section>`;
  }
  if (guide.demo.family === "nav") {
    return `<nav class="ig-${className}" aria-label="${guide.title}">
  <a aria-current="page">Home</a>
  <a>Explore</a>
  <a>Profile</a>
</nav>`;
  }
  if (guide.demo.family === "status") {
    return `<div class="ig-${className}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64">
  <span class="ig-${className}__track"><span style="width:64%"></span></span>
  <span class="ig-${className}__label">64%</span>
</div>`;
  }
  return `<div class="ig-${className}" data-component="${guide.title}">
  <div class="ig-${className}__surface">
    <strong>${guide.title}</strong>
    <span>Tokenized surface, state, and content anatomy.</span>
  </div>
</div>`;
}

function buildGuide([title, slug, category, demoType, refs, purpose, summary]) {
  const family = DEMO_FAMILY[slug] || "layout";
  const demoCopy = DEMO_COPY[family] || DEMO_COPY.layout;
  const categoryDefaults = CATEGORY_DEFAULTS[category];
  const cssRefs = refs.map(normalizeRef);

  const guide = {
    title,
    slug,
    href: `/components/${slug}`,
    category,
    description: summary,
    keywords: [
      title.toLowerCase(),
      slug.replaceAll("-", " "),
      category.toLowerCase(),
      "component",
      "instagram",
    ],
    demo: {
      type: demoType,
      family,
    },
    overview: summary,
    purpose,
    principles: [
      categoryDefaults.principle,
      `Build ${title.toLowerCase()} from the same semantic tokens documented in /ig instead of local one-off colours.`,
      "Prefer one clear state transition over combined colour, scale, shadow, and layout changes.",
    ],
    anatomy: demoCopy.anatomy,
    variants: demoCopy.variants,
    states: demoCopy.states,
    interactions: [
      categoryDefaults.interaction,
      `The ${title.toLowerCase()} demo below updates visible UI state and keeps the control keyboard reachable.`,
    ],
    motion: [
      "Use transform, opacity, clip-path, or scaleX for motion; avoid layout-driven animation.",
      "Use the Instagram curves found in /ig: cubic-bezier(0,0,.1,1), cubic-bezier(.7,0,.3,1), and short ease-out modal motion.",
      "Provide a reduced-motion path for every loop, reveal, and progress animation.",
    ],
    layout: [categoryDefaults.layout, "Maintain 4px-based spacing in app UI and 7.142vw rhythm in editorial brand layouts."],
    responsive: [
      categoryDefaults.responsive,
      "At narrow widths, preserve readable 12px, 14px, and 16px text rather than compressing the component until labels wrap badly.",
    ],
    accessibility: [
      categoryDefaults.accessibility,
      "Keep focus visible, expose selected and disabled states, and avoid relying on colour alone for state.",
    ],
    bestPractices: [
      `Use ${title.toLowerCase()} only where the surrounding task needs that component's specific affordance.`,
      "Map background, border, text, and disabled colours to the semantic tokens surfaced from /ig.",
      "Test default, hover, focus, selected, disabled, loading, and narrow viewport states before shipping.",
    ],
    commonMistakes: [
      "Replacing the compact Instagram rhythm with generic oversized controls.",
      "Adding decorative shadows, gradients, or nested cards that are not present in the source CSS.",
      "Leaving the interactive state visible only to pointer users or only to colour perception.",
    ],
    visualExamples: [
      `Primary ${title.toLowerCase()} surface using Instagram semantic background and separator tokens.`,
      `Dense ${title.toLowerCase()} state with compact system type and truncation.`,
      `Responsive ${title.toLowerCase()} adaptation using either stacking, sheet presentation, or horizontal scroll.`,
    ],
    implementationNotes: [
      "This page treats /ig as the evidence source and names unsupported details as guidance rather than invented tokens.",
      `The ${title.toLowerCase()} implementation should be a reusable primitive with explicit variants instead of copied markup.`,
      "When the extracted CSS exposes only partial evidence, extend from the nearest documented token family and document the assumption.",
    ],
    cssRefs,
  };

  guide.code = componentCode(guide);
  return guide;
}

export const COMPONENT_GUIDES = RAW_GUIDES.map(buildGuide);

export const STATIC_COMPONENT_GUIDE_SLUGS = new Set(["buttons", "charts"]);

export const DYNAMIC_COMPONENT_GUIDES = COMPONENT_GUIDES.filter(
  (guide) => !STATIC_COMPONENT_GUIDE_SLUGS.has(guide.slug)
);

export const COMPONENT_NAV_ITEMS = DYNAMIC_COMPONENT_GUIDES.map((guide) => ({
  title: guide.title,
  href: guide.href,
  description: guide.description,
  keywords: guide.keywords,
}));

export function getComponentGuide(slug) {
  return COMPONENT_GUIDES.find((guide) => guide.slug === slug);
}

export function getComponentGuidesByCategory() {
  return COMPONENT_GUIDES.reduce((groups, guide) => {
    if (!groups[guide.category]) groups[guide.category] = [];
    groups[guide.category].push(guide);
    return groups;
  }, {});
}
