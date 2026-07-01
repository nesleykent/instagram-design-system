// Component guide registry for the dynamic /components/[slug] catch-all route.
//
// Every entry is hand-written and graded by evidence tier:
//   "documented" — a specific selector, custom property, or class name in /ig
//                  backs this component directly (cited in `findings`).
//   "inferred"   — the general token system and neighbouring confirmed
//                  components define the specification, even without a
//                  component-specific captured selector.
//   "none"       — nothing in ~2.3 MB of captured CSS references this
//                  concept, usually because it's a native macOS/iOS/watchOS
//                  idea outside Instagram's web-product surface. The page
//                  stays as a scope boundary and points to the closest
//                  Instagram pattern when useful.
//
// See /methodology on the site for how these public badges relate to
// the source-confidence tiers used elsewhere in the manual.


// ---------------------------------------------------------------------------
// Documented / inferred guides — real, component-specific findings.
// ---------------------------------------------------------------------------

const EVIDENCED_GUIDES = [
  {
    title: "Image Views",
    slug: "image-views",
    category: "Content",
    description: "A ratio-locked frame for a single piece of media — object-fit: cover, a fixed crop, and a shimmer skeleton while it loads.",
    evidence: "documented",
    findings: [
      "Every media frame in /ig pairs aspect-ratio with object-fit: cover; object-position: center — the crop never reflows with content.",
      "The core ratio set is 1:1, 4:5, 9:16, 16:9, and a 3:4 editorial crop (see Shape's Aspect Ratio Gallery for the full table).",
      "A skeleton background (documented as a shimmer.gif reference in source, recreated here as a CSS gradient sweep) fills the frame before the asset loads — see Imagery.",
    ],
    anatomy: ["Ratio frame", "Media object (object-fit: cover)", "Loading skeleton", "Optional scrim for overlaid text"],
    guidance: [
      "Pick the ratio from the documented set (1:1, 4:5, 9:16, 16:9, 3:4) rather than an arbitrary crop — every image-bearing surface in /ig uses one of these.",
      "Never stretch or letterbox — object-fit: cover with object-position: center is universal.",
      "Pair text over an image view with a scrim gradient (see Colour), never a flat box.",
    ],
    doDont: {
      dos: ["Use the shimmer skeleton as the loading state, not a flat grey box.", "Keep the frame's aspect-ratio fixed so layout doesn't jump when the asset arrives."],
      donts: ["Introduce a sixth aspect ratio outside the documented set without new evidence.", "Crop with object-fit: contain — every instance found uses cover."],
    },
    usage: {
      useWhen: "Use for media content requiring aspect-ratio enforcement and lazy-load shimmer, including feed images, profile media, Stories/Reels previews, and editorial creator cards.",
      avoidWhen: "Avoid for icons, avatars, or decorative artwork that must preserve the whole source image; those should use their own fixed-size or object-fit: contain treatment.",
    },
    spec: [
      { label: "Aspect ratios", value: "1:1, 4:5, 9:16, 16:9, and 3:4 editorial crop; use the documented ratio set before inventing a crop" },
      { label: "Fit", value: "object-fit: cover with object-position: center" },
      { label: "Loading fill", value: "Shimmer skeleton over rgb(var(--ig-secondary-bg))" },
      { label: "Frame stability", value: "aspect-ratio locks the box before the asset loads" },
      { label: "Overlay", value: "Optional scrim gradient only when text sits on top of media" },
    ],
    states: [
      { name: "Loading", description: "The ratio frame is present and filled by a shimmer skeleton over --ig-secondary-bg while the image request resolves." },
      { name: "Loaded", description: "The media object fills the locked frame with object-fit: cover and object-position: center." },
      { name: "Failed", description: "A neutral placeholder keeps the same aspect ratio so surrounding layout does not jump." },
      { name: "Pressed", description: "Interactive media applies a temporary overlay or scrim while the pointer or touch is held." },
      { name: "Selected", description: "Multi-select surfaces add a persistent selection overlay or check affordance without changing the crop." },
    ],
    notes: [
      "The shimmer is an implementation of the captured shimmer.gif loading reference; keep it inside the ratio frame.",
      "The crop rule is cover, never contain, so selected and failed states must preserve the same dimensions.",
    ],
    code: `.image-view {\n  aspect-ratio: 4 / 5; /* or 1/1, 9/16, 16/9, 3/4 — see Shape */\n  object-fit: cover;\n  object-position: center;\n}`,
    crossRef: { label: "Aspect Ratio Gallery", href: "/shape" },
  },
  {
    title: "Text Views",
    slug: "text-views",
    category: "Content",
    description: "Longer, selectable copy — captions, bios, comments — built from the same system type scale as every control, not a document-style stack.",
    evidence: "documented",
    findings: [
      "No dedicated \"article\" or document typography scale exists — long-form text reuses the 12/14/16/24px system sizes documented on Typography.",
      "text-overflow: ellipsis; white-space: nowrap truncation recurs constantly for single-line text views (names, captions, list rows).",
      "Multi-line copy has no special CSS beyond standard line-height — there is no line-clamp utility class found in /ig.",
    ],
    anatomy: ["Text frame", "Primary line(s)", "Secondary/metadata line", "Truncation edge"],
    guidance: [
      "Reach for the existing 12/14/16/24px system sizes — don't introduce a document-specific type scale for long captions or bios.",
      "Use text-overflow: ellipsis for single-line truncation; no multi-line clamp pattern was found, so multi-line overflow should scroll or expand, not clamp with a fade.",
    ],
    doDont: {
      dos: ["Set secondary/metadata text to --ig-secondary-text or --ig-tertiary-text, matching the documented hierarchy."],
      donts: ["Invent a larger 'reading' type scale — use the product UI scale, while the about-page display sizes remain marketing-only."],
    },
    usage: {
      useWhen: "Use for multiline text blocks: captions, bios, comment bodies, and other product copy that should expand naturally with content.",
      avoidWhen: "Avoid for single-value form entry or navigational labels; use Text Fields for editable input and Labels for compact metadata.",
    },
    spec: [
      { label: "Height", value: "No fixed height — the block expands to its content" },
      { label: "Type scale", value: "Inherits the system 12/14/16/24px product scale" },
      { label: "Width", value: "max-width comes from the surrounding layout grid, not the text component" },
      { label: "Single-line overflow", value: "overflow hidden, text-overflow: ellipsis, white-space: nowrap" },
      { label: "Multi-line overflow", value: "Scroll or expand; no captured multi-line line-clamp utility" },
    ],
    states: [
      { name: "Default", description: "Readable copy sits in the product UI type scale and expands vertically with content." },
      { name: "Editing", description: "Editable text shows a cursor and expands with new lines rather than introducing a fixed document box." },
      { name: "Overflow", description: "Single-line variants clip with ellipsis; multi-line variants should expose an expand or scroll affordance." },
    ],
    notes: [
      "Text Views do not introduce a separate reading type scale; they reuse the same system sizes as controls and rows.",
      "Layout owns max-width. The text component only supplies hierarchy, colour, and overflow behavior.",
    ],
    code: `.text-view__meta {\n  font-size: var(--system-12-font-size);\n  line-height: var(--system-12-line-height);\n  color: rgb(var(--ig-secondary-text));\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}`,
    crossRef: { label: "Typography", href: "/typography" },
  },
  {
    title: "Boxes",
    slug: "boxes",
    category: "Layout And Organization",
    description: "The structural container every surface composes from — a 1px-bordered, token-filled region with no decorative chrome of its own.",
    evidence: "inferred",
    findings: [
      "Containers in /ig are composed as one-off rules reaching for --ig-separator, --ig-secondary-background, or --ig-stroke directly.",
      "The pattern is consistent even without a shared class: 1px border in --ig-separator, background in --ig-secondary-background or --ig-elevated-background, radius from the documented scale.",
    ],
    rationale:
      "Instagram's surfaces separate content with a hairline border and a tonal background shift, not elevation. A Box is the canonical container that pattern resolves to once it's named: it carries no shadow by default, because shadow in this system is reserved for true overlays (modals, popovers) that sit above the page, not for in-flow grouping.",
    usage: {
      useWhen: "Grouping related content within a surface — a settings group, a card body, a stat block — where the goal is visual separation, not elevation.",
      avoidWhen: "The content is a temporary overlay above the page (use Modals & Panels or Popovers) or a single row in a list (use the row anatomy on Lists And Tables instead of nesting a Box per row).",
    },
    anatomy: ["Container", "Border (--ig-separator)", "Fill (--ig-secondary-bg or --ig-elevated-bg)"],
    spec: [
      { label: "Padding", value: "16px (4× base unit) — 24px for editorial/wide contexts" },
      { label: "Border", value: "1px solid rgb(var(--ig-separator))" },
      { label: "Fill", value: "rgb(var(--ig-secondary-bg)) or rgb(var(--ig-elevated-bg))" },
      { label: "Radius", value: "8px or 12px from the shared radius scale — see Shape" },
      { label: "Elevation", value: "None by default — border substitutes for shadow" },
    ],
    states: [
      { name: "Default", description: "Resting structural container: 1px separator border, token fill, no overlay, and no elevation." },
      { name: "Hover", description: "Only for a Box promoted to a single interactive target, add rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)); passive grouping Boxes do not change on hover." },
      { name: "Pressed/Active", description: "Interactive Boxes use an overlay slightly deeper than hover overlay while pressed; structural Boxes remain unchanged." },
      { name: "Focused", description: "Focusable Boxes use a 2px var(--ig-stop-magenta) outline with a --radius-xs offset around the container." },
      { name: "Disabled", description: "Disabled interactive Boxes have opacity reduced and pointer-events none; passive grouping Boxes are not disabled." },
    ],
    guidance: [
      "Compose containers per-component from the same handful of tokens rather than giving Box a decorative identity of its own.",
      "A shared Box primitive should source its border/fill from --ig-separator and --ig-secondary-background so it matches every existing container without a new token.",
    ],
    accessibility: [
      "A Box is a grouping container, not an interactive element — it carries no role unless its content requires one (e.g. role=\"group\" with an aria-label when it groups form controls).",
      "Border contrast against the page background must clear the same threshold documented on Accessibility — verify --ig-separator against --ig-primary-bg in both themes before shipping a new tonal pairing.",
    ],
    doDont: {
      dos: ["Compose new containers from --ig-separator + --ig-secondary-background/--ig-elevated-background + the documented radius scale."],
      donts: ["Add a drop shadow by default — most /ig containers use a 1px border, not elevation, for separation."],
    },
    notes: ["Structural Boxes stop at separator, fill, and radius tokens; interactive Boxes add the hover/pressed overlay tokens without gaining default elevation."],
    code: `.box {\n  padding: 16px;\n  border: 1px solid rgb(var(--ig-separator));\n  background: rgb(var(--ig-secondary-bg));\n  border-radius: 12px;\n}`,
  },
  {
    title: "Collections",
    slug: "collections",
    category: "Layout And Organization",
    description: "A horizontally-scrolling row of repeating items — the about-page's mosaic and card rows, and the production app's hidden-scrollbar carousels.",
    evidence: "documented",
    findings: [
      "overflow-x: scroll with scrollbar-width: none / a hidden ::-webkit-scrollbar recurs for mobile galleries and card rows in /ig.",
      "The about-page mosaic grid is the asymmetric, non-uniform version of a collection — see Imagery.",
      ".uiScrollableAreaWrapHorizontal{overflow-x:auto} is the legacy desktop equivalent for horizontally-scrolling containers.",
    ],
    anatomy: ["Scroll track", "Item", "Hidden scrollbar (mobile) / custom gripper (legacy desktop)"],
    guidance: [
      "Default to horizontal scroll with native momentum and a hidden scrollbar on touch — that's the consistent mobile pattern across every gallery-like surface in /ig.",
      "Use the legacy desktop fallback when a visible affordance is needed: a custom-styled scrollbar gripper, not pagination dots.",
    ],
    doDont: {
      dos: ["Hide the scrollbar on touch viewports, matching every mobile gallery in /ig."],
      donts: ["Add dot pagination under a free-scrolling collection — reserve Page Controls for short, manually paged sequences."],
    },
    usage: {
      useWhen: "Use for a uniform grid of media items — profile grid, Explore grid, hashtag feed — where repeated image cells form the primary browsing surface.",
      avoidWhen: "Avoid when items have mixed anatomy or variable row heights; those belong in Lists And Tables or a bespoke editorial mosaic.",
    },
    spec: [
      { label: "Grid gap", value: "Use spacing scale gaps, typically --space-2 or --space-3" },
      { label: "Columns", value: "Column count is driven by layout grid units and available viewport width" },
      { label: "Item frame", value: "Each item uses Image Views ratio and object-fit: cover rules" },
      { label: "Touch overflow", value: "scrollbar-width: none and hidden ::-webkit-scrollbar for touch galleries" },
      { label: "Desktop overflow", value: ".uiScrollableAreaWrapHorizontal{overflow-x:auto} when the collection scrolls horizontally" },
    ],
    states: [
      { name: "Loading", description: "Cells render skeleton frames or shimmer while media resolves." },
      { name: "Populated", description: "The grid or row is filled with repeated media items using stable gaps and crops." },
      { name: "Empty state", description: "The surface keeps its grid container but shows concise empty copy or an upload/follow prompt." },
      { name: "Refreshing", description: "Existing cells stay in place while new results load, avoiding a full layout reset." },
    ],
    notes: [
      "A Collection is defined by repetition and stable item geometry; the surface can be a uniform grid or a free-scrolling row depending on context.",
      "Do not pair free-scrolling collections with Page Controls unless the experience is manually paged rather than scroll-based.",
    ],
    crossRef: { label: "Mosaic Grid Demo", href: "/imagery" },
  },
  {
    title: "Column Views",
    slug: "column-views",
    category: "Layout And Organization",
    description: "Two adjacent panes that collapse to one on mobile — Instagram's own split-screen template, not a generic multi-pane browser.",
    evidence: "documented",
    findings: ["The about-page's split-screen sections use near-50/50 or an asymmetric 5:9 column split, collapsing to a single stacked column below ~650–768px — fully documented on Layout & Grid."],
    anatomy: ["Column A", "Column B", "Collapse breakpoint"],
    guidance: ["Use the documented 50/50 or 5:9 ratio rather than inventing a third split — both are clean multiples of the 14-unit grid."],
    doDont: {
      dos: ["Collapse to a single stacked column at the same ~650–768px range used everywhere else in /ig."],
      donts: ["Keep both columns side-by-side below the documented breakpoint — no instance in /ig does this."],
    },
    usage: {
      useWhen: "Use for desktop layouts needing persistent source + detail panes, such as a DM thread list beside an open thread or a settings category beside its detail view.",
      avoidWhen: "Avoid on narrow screens or for unrelated content blocks; collapse to one column when the second pane would compete with the primary task.",
    },
    spec: [
      { label: "Pane widths", value: "Use --ig-grid-unit multiples, including the documented 50/50 and 5:9 split patterns" },
      { label: "Divider", value: "1px solid rgb(var(--ig-separator)) between persistent panes" },
      { label: "Breakpoint", value: "Collapse around the documented ~650–768px range" },
      { label: "Desktop layout", value: "Adjacent panes preserve independent content hierarchy" },
      { label: "Mobile layout", value: "One pane at a time or stacked single-column flow" },
    ],
    states: [
      { name: "Collapsed", description: "Only one column is visible; the secondary pane stacks below or becomes a navigated detail view." },
      { name: "Split", description: "Two panes sit side by side using the documented grid split." },
      { name: "Active pane", description: "The focused pane can raise its separator or z-index so the active edge remains visually clear." },
    ],
    notes: [
      "Use grid-derived pane widths rather than arbitrary percentages.",
      "The divider is a separator line, not an elevated card edge.",
    ],
    crossRef: { label: "Split-Screen Demo", href: "/layout-grid" },
  },
  {
    title: "Disclosure Controls",
    slug: "disclosure-controls",
    category: "Layout And Organization",
    description: "A chevron that rotates 180° to reveal or hide detail in place — built from the same rotation transform the about-page uses to flip its carousel arrow.",
    evidence: "inferred",
    findings: [
      "transform: rotate(180deg) is used in the about-page mosaic gallery to flip a carousel arrow on a layout change.",
      "The chevron + height-transition pattern applies that confirmed binary rotation to an aria-expanded disclosure row.",
    ],
    rationale:
      "Instagram's only confirmed rotation transform is a binary flip — 0deg to 180deg, nothing in between is styled. A disclosure control inherits exactly that: a chevron that flips rather than morphs, paired with a height transition on the revealed content rather than an opacity fade, consistent with the system's preference for transform-driven motion over fades (see Motion).",
    usage: {
      useWhen: "Revealing supplementary detail in place without navigating away — an expandable caption, a settings sub-group, a 'see more' row.",
      avoidWhen: "The hidden content is the primary task content (use a dedicated page or Sheet instead) or there are more than a handful of peer items (use Tab Views).",
    },
    anatomy: ["Row label", "Chevron (rotates 180°)", "Revealed content region"],
    spec: [
      { label: "Chevron size", value: "16px, matching the system icon size used across navigation" },
      { label: "Rotation", value: "rotate(0deg) → rotate(180deg), no intermediate state" },
      { label: "Motion", value: "Ease Glide, 250ms — see Motion" },
      { label: "Content reveal", value: "height: auto via max-height transition, not opacity" },
      { label: "Label colour", value: "rgb(var(--ig-primary-text)); chevron rgb(var(--ig-tertiary-text))" },
    ],
    states: [
      { name: "Collapsed", description: "Chevron at 0deg, content region collapsed to 0 height." },
      { name: "Expanded", description: "Chevron at 180deg, content region expanded to its natural height." },
      { name: "Focus", description: "Standard 2px focus ring on the row, matching every other interactive row in the system." },
    ],
    guidance: [
      "Rotate the chevron as a single instant flip target state, not a multi-frame animation — that matches the only rotation evidence found.",
      "Transition height, not opacity, when revealing content — opacity-only reveals aren't used for in-place disclosure anywhere comparable in the system.",
    ],
    accessibility: [
      "Use aria-expanded on the trigger and toggle it with the visual state — the chevron rotation should be a CSS reflection of that attribute, not an independent state.",
      "Keep the entire row (not just the chevron) as the click target, matching the row-level interaction pattern used throughout Lists And Tables.",
    ],
    doDont: {
      dos: ["Rotate exactly 0deg ↔ 180deg with Ease Glide, matching the one confirmed rotation transform in the system."],
      donts: ["Animate a chevron through intermediate rotation states or pair it with a colour change — the evidenced pattern is a clean binary flip."],
    },
    notes: ["The chevron's Ease Glide rotation is the only named motion treatment here; the content region reveals by height rather than adding a separate fade or morph."],
    code: `.disclosure__chevron {\n  transition: transform 250ms var(--ease-glide);\n}\n.disclosure[aria-expanded="true"] .disclosure__chevron {\n  transform: rotate(180deg);\n}`,
  },
  {
    title: "Labels",
    slug: "labels",
    category: "Layout And Organization",
    description: "Compact, secondary-weight text that names a value or piece of metadata — the --ig-secondary-text / --ig-tertiary-text pair at system-12.",
    evidence: "documented",
    findings: ["--ig-secondary-text and --ig-tertiary-text share light-mode value 115,115,115 but diverge in dark mode (168,168,168 vs 199,199,199) — the hierarchy exists but is subtle, see Colour.", "Labels run at the 10px or 12px system sizes almost universally."],
    anatomy: ["Label text", "Optional icon", "Colour role (secondary or tertiary)"],
    guidance: ["Use --ig-secondary-text for the more prominent metadata tier, --ig-tertiary-text for the quieter one — they're deliberately close in light mode and diverge in dark mode."],
    doDont: {
      dos: ["Keep labels at 10–12px — the established label range."],
      donts: ["Use --ig-primary-text for a label — labels are secondary/tertiary by definition in every instance found."],
    },
    usage: {
      useWhen: "Use for metadata annotations on content, including timestamps, follower counts, view counts, privacy notes, and compact explanatory labels.",
      avoidWhen: "Avoid for primary titles, action text, or body copy; Labels intentionally sit below the primary reading hierarchy.",
    },
    spec: [
      { label: "Font size", value: "var(--system-12-font-size) or var(--system-14-font-size), with 10px reserved for the quietest metadata" },
      { label: "Colour", value: "rgb(var(--ig-secondary-text)) or rgb(var(--ig-tertiary-text))" },
      { label: "Background", value: "None by default; only count badges use a pill background" },
      { label: "Overflow", value: "Single line with ellipsis when space is constrained" },
    ],
    states: [
      { name: "Default", description: "Secondary or tertiary text labels metadata without background or decoration." },
      { name: "Truncated", description: "The label stays on one line and clips with text-overflow: ellipsis." },
      { name: "Count badge", description: "Numerical metadata can move into a pill background while keeping compact label sizing." },
    ],
    notes: [
      "Labels are defined by hierarchy, not shape; only count badges should gain a background.",
      "Use the secondary/tertiary text split to preserve subtle dark-mode hierarchy.",
    ],
  },
  {
    title: "Lists And Tables",
    slug: "lists-and-tables",
    category: "Layout And Organization",
    description: "Row-based, separator-divided, truncating content — search results and comment-style rows, not a desktop spreadsheet grid.",
    evidence: "documented",
    findings: ["--search-result-height:50px and --search-result-list-width:375px define a fixed-height, fixed-width row pattern.", "._54n*-family rules (._54nh, ._54nc) confirm overflow:hidden;text-overflow:ellipsis;white-space:nowrap as the standard row-truncation rule.", "--post-separator and --ig-separator are the row-divider tokens, not a heavier table-border treatment."],
    anatomy: ["Row", "Leading icon/avatar well", "Primary + secondary text", "Trailing affordance", "Separator"],
    guidance: ["Fix row height (Instagram's search rows are 50px) rather than letting content stretch it — every row-list pattern found is fixed-height.", "Truncate with ellipsis; don't wrap row text to multiple lines."],
    doDont: {
      dos: ["Use a 1px --post-separator or --ig-separator between rows, not a heavier table-grid border."],
      donts: ["Build a sortable, multi-column spreadsheet-style table — Instagram row patterns are single-column content with a leading/trailing affordance. See Data Tables if your product genuinely needs that."],
    },
    usage: {
      useWhen: "Use for vertically-scrolling rows of same-height items, including notifications, settings, search results, and comment-thread rows.",
      avoidWhen: "Avoid for dense analytical data or sortable spreadsheet-style tables; Instagram's evidenced pattern is a row list, not a grid of columns. Dashboard/analytics products that need real sortable columns should use the extended Data Tables pattern instead, which reuses this page's row/separator/hover tokens.",
    },
    spec: [
      { label: "Row height", value: "44px minimum; search-result rows are confirmed at 50px" },
      { label: "Separator", value: "1px solid rgb(var(--ig-separator)) or rgb(var(--post-separator))" },
      { label: "Inset", value: "Separator inset starts 16px from the left edge when aligned to row content" },
      { label: "Text overflow", value: "overflow hidden, text-overflow: ellipsis, white-space: nowrap" },
      { label: "Width", value: "Search-result list width is capped at 375px in the documented pattern" },
    ],
    states: [
      { name: "Default", description: "Row rests at its fixed height with leading content, primary/secondary text, and optional trailing affordance." },
      { name: "Hover", description: "Pointer rows receive the --ig-hover-overlay treatment without changing row height." },
      { name: "Pressed", description: "The row applies a slightly stronger overlay while the action is held." },
      { name: "Disabled", description: "Unavailable rows drop to 55% opacity and remain visible." },
      { name: "Selected", description: "Selected rows hold the active overlay or check affordance while preserving truncation and separators." },
    ],
    notes: [
      "Keep row height fixed; long content truncates rather than stretching the list.",
      "Use separator tokens for rows, not a full table grid.",
    ],
    crossRef: { label: "Dropdowns & Selectors (legacy menu rows)", href: "/components/dropdowns" },
  },
  {
    title: "Lockups",
    slug: "lockups",
    category: "Layout And Organization",
    description: "Avatar/icon + title + secondary text bound into one scannable row — the exact anatomy of every search result and identity row in /ig.",
    evidence: "documented",
    findings: ["The search result row pattern (--search-result-height:50px) is structurally a lockup: a leading well, a primary text line, and a secondary/metadata line.", "Secondary text in lockups consistently uses --ig-secondary-text or --ig-tertiary-text, never --ig-primary-text."],
    anatomy: ["Leading icon/avatar well", "Primary text (name/title)", "Secondary text (metadata)", "Optional trailing action"],
    guidance: ["Keep the leading well a fixed size regardless of content length — search rows don't resize the avatar well for longer names.", "Truncate the primary line before wrapping; truncate the secondary line independently."],
    doDont: {
      dos: ["Use --ig-secondary-text for the subtitle line, matching every identity row found."],
      donts: ["Let a long primary line push the secondary line or trailing action out of the fixed row height."],
    },
    usage: {
      useWhen: "Use for any identity row: follow list entries, notification actors, search results, story-ring identities, and compact account references.",
      avoidWhen: "Avoid when the leading visual is decorative rather than identifying; use Labels or Lists And Tables for plain metadata rows.",
    },
    spec: [
      { label: "Avatar", value: "32–40px fixed leading well" },
      { label: "Primary label", value: "var(--system-14-font-size), semibold weight" },
      { label: "Subtext", value: "var(--system-12-font-size), rgb(var(--ig-secondary-text))" },
      { label: "Gap", value: "var(--space-2) between avatar and text stack" },
      { label: "Overflow", value: "Primary and secondary lines truncate independently" },
    ],
    states: [
      { name: "Default", description: "Avatar or icon, primary label, and secondary text sit in a fixed row." },
      { name: "Hover", description: "Interactive lockups receive the row hover overlay while text hierarchy stays unchanged." },
      { name: "Pressed", description: "The row applies a pressed overlay while opening the profile or taking the row action." },
      { name: "Verified", description: "A blue tick appears inline immediately after the primary label without changing row height." },
    ],
    notes: [
      "The leading well stays fixed so long names cannot resize the row.",
      "Verification is inline with the primary label, while secondary metadata remains in --ig-secondary-text.",
    ],
  },
  {
    title: "Tab Views",
    slug: "tab-views",
    category: "Layout And Organization",
    description: "Peer panels switched by a row of labelled controls — the about-page's interactive type-tester, already documented in full on Dropdowns & Selectors.",
    evidence: "documented",
    findings: ["The about-page type-tester is the clearest tab-like pattern in /ig: equal-sized swatches that fill with the brand gradient on hover/active and swap content directly, with no separate underline-tab variant found."],
    anatomy: ["Tab row (equal-width controls)", "Active tab fill (brand gradient)", "Content panel"],
    spec: [
      { label: "Active fill", value: "var(--ig-gradient-hero) — the same 72.44° rose→magenta→purple gradient used across brand surfaces" },
      { label: "Tab control", value: "Equal-width, no underline indicator — active state is a fill, not a line" },
      { label: "Transition", value: "Fill swap is instant or sub-150ms; no sliding-underline animation found" },
    ],
    usage: {
      useWhen: "Switching between peer panels of equal hierarchical level where all panels exist in DOM simultaneously (like a type specimen tester or a settings panel group).",
      avoidWhen: "Top-level product navigation — that's Tab Bars. Or when only one panel loads at a time, which would benefit from URL-routing rather than tab panels.",
    },
    states: [
      { name: "Default (tab)", description: "Control at rest — transparent background, label in --ig-primary-text." },
      { name: "Hover (tab)", description: "--ig-hover-overlay applied to the tab control surface." },
      { name: "Active (tab)", description: "Brand gradient fill behind the label; label colour adapts to remain legible on the gradient." },
      { name: "Panel visible", description: "The content panel for the active tab is visible; all other panels are hidden (display:none or visibility:hidden)." },
    ],
    doDont: {
      dos: ["Use the brand gradient fill — not an underline indicator or a border — to mark the active tab, matching the only confirmed Instagram pattern."],
      donts: ["Use tabs for navigation between separate routes; use them only for in-page panel switching where all content is simultaneously in the DOM."],
    },
    notes: ["The only confirmed Instagram tab pattern uses a gradient fill, not the 'underline tab' pattern common in Material Design or standard web UIs.", "Tab Views share their surface and gradient treatment with the Dropdowns & Selectors page, which has the full visual treatment."],
    guidance: ["This component is fully covered on Dropdowns & Selectors — read that page rather than treating this as a separate pattern; duplicating it here would just restate the same evidence."],
    crossRef: { label: "Dropdowns & Selectors", href: "/components/dropdowns" },
  },
  {
    title: "Context Menus",
    slug: "context-menus",
    category: "Menus And Actions",
    description: "An object-specific action list anchored to a trigger — Instagram's legacy .uiContextualLayer system.",
    evidence: "documented",
    findings: [".uiContextualLayer{position:absolute} plus .uiContextualLayerPositioner/.uiContextualLayerPositionerFixed form the anchoring system.", "._54ng{background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:3px;box-shadow:0 3px 8px #0000004d} is the resulting flyout surface.", "Disabled rows in this system drop to 55% opacity rather than being removed (._5arm ._54nc{opacity:.55})."],
    anatomy: ["Trigger", "Contextual layer (positioned, z-index 202)", "Action rows", "Separator"],
    guidance: ["Anchor the layer with position logic relative to the trigger, not a fixed screen position — that's what the Positioner/PositionerFixed split exists for.", "Dim disabled items to ~55% opacity rather than hiding them."],
    doDont: {
      dos: ["Use a 3px radius and the documented 1px rgba border + soft shadow for the flyout surface."],
      donts: ["Remove disabled actions from the list — the evidenced pattern keeps them visible and dimmed."],
    },
    usage: {
      useWhen: "Use for object-specific actions triggered by right-click or a '...' affordance, especially actions scoped to one post, row, or media item.",
      avoidWhen: "Avoid for global navigation or large, task-taking surfaces; use Tab Bars, Sidebars, Modals, or Sheets depending on scope.",
    },
    spec: [
      { label: "Radius", value: "3px" },
      { label: "Background", value: "#fff" },
      { label: "Border", value: "1px solid rgba(0,0,0,.15)" },
      { label: "Shadow", value: "0 3px 8px rgba(0,0,0,.3)" },
      { label: "Layer", value: "z-index: 202 on the contextual layer" },
    ],
    states: [
      { name: "Hidden", description: "Layer is not rendered or is display:none until the trigger opens it." },
      { name: "Open", description: "The contextual layer is positioned below or above the trigger using the Positioner/PositionerFixed model." },
      { name: "Row hover", description: "The hovered action row highlights while the flyout surface stays fixed." },
      { name: "Row pressed", description: "The row uses a pressed highlight until the command fires or the pointer is released." },
      { name: "Disabled row", description: "Unavailable actions remain visible at 55% opacity." },
    ],
    notes: [
      "The contextual layer supplies anchoring; the menu surface supplies the 3px radius, rgba border, and shadow.",
      "Disabled actions should stay visible and dimmed so the command set remains stable.",
    ],
    code: `.context-menu {\n  position: absolute;\n  background: #fff;\n  border: 1px solid rgba(0,0,0,.15);\n  border-radius: 3px;\n  box-shadow: 0 3px 8px rgba(0,0,0,.3);\n}\n.context-menu__item[disabled] { opacity: .55; }`,
  },
  {
    title: "Menus",
    slug: "menus",
    category: "Menus And Actions",
    description: "A compact action list where the trigger and choices stay in one context — the canonical flyout, toggled open/closed by a single class.",
    evidence: "documented",
    findings: [".uiToggleFlyout,.toggleTargetClosed{display:none} and the paired .openToggler .uiToggleFlyout{display:block} rule define the entire open/closed model — one ancestor class flips visibility, no JS-driven height animation.", "Shares its visual surface with Context Menus (._54ng) and Popovers (.uiContextualLayer)."],
    anatomy: ["Trigger (.openToggler)", "Flyout (.uiToggleFlyout)", "Action rows"],
    guidance: ["The open/closed model is a single toggled ancestor class, not a height or opacity transition — menus appear and disappear instantly in the legacy system."],
    doDont: { dos: ["Toggle visibility via a single ancestor class, matching the evidenced model."], donts: ["Add an animated open/close transition to this specific legacy menu model — it appears and disappears by display state."] },
    usage: {
      useWhen: "Use for a list of related actions surfaced by any non-right-click trigger, including a button, chevron, overflow icon, or compact selector trigger.",
      avoidWhen: "Avoid for object-specific right-click behavior, which is a Context Menu, or for touch-first bottom action lists, which should use Action Sheets.",
    },
    spec: [
      { label: "Surface", value: "Same as Context Menus: #fff, 1px rgba(0,0,0,.15) border, 0 3px 8px rgba(0,0,0,.3) shadow" },
      { label: "Visibility", value: ".uiToggleFlyout hidden by default; .openToggler displays it" },
      { label: "Row height", value: "~36px compact action row" },
      { label: "Leading icon", value: "Optional 16px icon aligned before row label" },
      { label: "Separator", value: "Thin separator row between action groups" },
    ],
    states: [
      { name: "Hidden", description: "The flyout is display:none through .uiToggleFlyout or .toggleTargetClosed." },
      { name: "Open", description: "A single .openToggler ancestor flips the flyout to display:block." },
      { name: "Row hover", description: "Hovered rows highlight without animating the flyout surface." },
      { name: "Row pressed", description: "Pressed rows hold a stronger row highlight until activation." },
      { name: "Row with icon", description: "Rows can include a leading 16px icon while keeping the same compact height." },
      { name: "Separator row", description: "A non-action separator divides groups without receiving hover or pressed states." },
    ],
    notes: [
      "Menus and Context Menus share the same visual chrome; the difference is the trigger model.",
      "The legacy menu opens by display state, so do not add an animated height transition to this pattern.",
    ],
  },
  {
    title: "Activity Views",
    slug: "activity-views",
    category: "Menus And Actions",
    description: "A share/export chooser presented as a sheet — the Action Sheet transition hosting a destination list instead of a command list.",
    evidence: "inferred",
    findings: [
      "The full-height sheet mechanism for this pattern is confirmed: ._a96f translates from translateY(100%) to 0 over Ease Settle, as documented on Action Sheets.",
    ],
    rationale:
      "Sharing is a destination choice, not a command, so it inherits the Lockup anatomy (icon + label) inside the Action Sheet's row list rather than the plain text rows a command menu uses — each destination needs a recognizable icon to scan quickly.",
    usage: {
      useWhen: "Presenting a list of external or in-app destinations to send content to.",
      avoidWhen: "The choices are commands rather than destinations (use Action Sheets' plain row list) or there are more than ~6 destinations (promote the most recent/relevant ones and collapse the rest behind a 'More' row).",
    },
    anatomy: ["Sheet surface", "Destination row (icon + label, Lockup anatomy)", "Recent destinations first", "Dismiss"],
    spec: [
      { label: "Surface", value: "Same as Action Sheets — fixed, full-height, translateY(100%) → 0" },
      { label: "Row height", value: "50px, matching the documented search-result row" },
      { label: "Icon well", value: "Fixed-size leading well, matching Lockups" },
      { label: "Motion", value: "Ease Settle, ~500ms — see Motion" },
    ],
    guidance: [
      "Order destinations by recency, not alphabetically — that's consistent with how Instagram treats the search/result list as recency-led elsewhere in the system.",
      "Reuse the Action Sheet surface verbatim; the only difference is row content, not the container.",
    ],
    states: [
      { name: "Hidden", description: "Sheet not yet triggered. Trigger is typically an icon-only Share button or a contextual action row." },
      { name: "Appearing", description: "Sheet translates from translateY(100%) to 0 over ~500ms Ease Settle — identical motion to Action Sheets." },
      { name: "Visible", description: "Full surface showing destination rows in Lockup layout (icon + label), ordered by recency." },
      { name: "Row pressed", description: "Destination row highlights with the hover-overlay token on tap or click." },
      { name: "Dismissing", description: "Sheet translates back to translateY(100%) on dismiss or destination selection." },
    ],
    doDont: {
      dos: ["Order destinations by recency — the evidenced system ranks recent contacts and apps first.", "Collapse rarely-used destinations behind a 'More' row when the count exceeds six."],
      donts: ["Use text-only rows — destinations need icons (Lockup anatomy) to scan quickly at share-sheet speed.", "Build a custom surface — reuse the Action Sheet container unchanged; only the row content differs."],
    },
    notes: ["Lockup anatomy governs each destination row: a fixed leading icon well plus a label inside the Action Sheet's row list."],
    crossRef: { label: "Action Sheets", href: "/components/action-sheets" },
  },
  {
    title: "Dock Menus",
    slug: "dock-menus",
    category: "Menus And Actions",
    description: "A macOS Dock-style persistent menu — outside Instagram's web and mobile product surface.",
    evidence: "none",
    reason: "Dock Menus are native macOS shell integrations. Instagram's web client expresses persistent destinations through Tab Bars, Sheets, Menus, and row-based navigation rather than operating-system Dock chrome.",
    anatomy: ["macOS Dock icon", "Right-click context menu", "Quick-action command rows"],
    spec: [
      { label: "Dock height", value: "58px (Apple macOS UI Kit reference file)" },
      { label: "Icon size", value: "36×36px — confirmed across every pinned app icon" },
      { label: "Icon gap", value: "9px between adjacent icons, consistent across the full row" },
      { label: "Leading inset", value: "8px from the Dock's edge to the first icon" },
      { label: "Section separator", value: "11px total width, with a 1px visible divider line centered inside it — separates pinned apps from the recent/minimized-windows section" },
      { label: "Reflection zone", value: "Icon frames are 47px tall vs. a 36px icon — the extra 11px is the icon's reflection rendered beneath it" },
    ],
    usage: { useWhen: "Never — this is a macOS shell integration outside the scope of Instagram's web CSS component system.", avoidWhen: "Always. Use Tab Bars for persistent top-level destinations and Menus for contextual command lists." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Express persistent navigation with Tab Bars or Sidebars."], donts: ["Implement a macOS Dock-style menu in a web UI."] },
    notes: ["Dock Menus are registered at the OS level in a native app's Info.plist — they cannot be built in a web CSS component system.", "The closest Instagram analog for persistent top-level destinations is the Tab Bar, which is fully documented."],
    closestAnalog: { label: "Tab Bars", href: "/components/tab-bars" },
  },
  {
    title: "Edit Menus",
    slug: "edit-menus",
    category: "Menus And Actions",
    description: "Desktop-app text/media editing commands (copy, paste, crop, duplicate) — represented in Instagram by the general Menus flyout.",
    evidence: "none",
    reason: "Instagram's action lists use the generic Menus flyout: a trigger, contextual surface, and compact command rows. Editing commands should use that existing action-list grammar rather than a separate desktop Edit Menu category.",
    anatomy: ["Menu bar 'Edit' label trigger", "Drop-down command list", "Keyboard shortcut annotations"],
    usage: { useWhen: "Never for web — the desktop Edit Menu is an OS-level menu bar component that doesn't exist in Instagram's web UI.", avoidWhen: "Always. Use Menus for contextual command lists (copy link, edit caption, delete post)." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Use the Menus flyout for all contextual editing commands."], donts: ["Implement a separate 'Edit Menu' distinct from the standard Menus flyout."] },
    notes: ["The desktop Edit Menu is an application-shell concept (File / Edit / View / Help) that web products don't implement.", "Instagram's media editing commands (crop, filter, adjust) appear in dedicated full-screen flows, not flyout menus."],
    closestAnalog: { label: "Menus", href: "/components/menus" },
  },
  {
    title: "Home Screen Quick Actions",
    slug: "home-screen-quick-actions",
    category: "Menus And Actions",
    description: "iOS home-screen long-press shortcuts — outside the scope of a web property entirely.",
    evidence: "none",
    reason: "This is an iOS home-screen integration configured in a native app's Info.plist, so it belongs to app packaging rather than Instagram's web CSS component system.",
    anatomy: ["App icon long-press gesture", "Quick action label rows", "Shortcut sheet"],
    usage: { useWhen: "Never for web — home-screen quick actions are a native iOS integration, not a CSS component.", avoidWhen: "Always. For contextual shortcuts within the product, use Menus or Action Sheets." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web CSS component system." }],
    doDont: { dos: ["Express contextual shortcuts inside the product with the Menus component."], donts: ["Try to replicate home-screen quick actions in web UI — the affordance belongs to the native app shell."] },
    notes: ["Home Screen Quick Actions are registered in UIApplicationShortcutItem in the native app's Info.plist — they cannot be built in a web component system."],
  },
  {
    title: "Ornaments",
    slug: "ornaments",
    category: "Menus And Actions",
    description: "Small attached controls around a window or media surface — a native window-chrome category outside Instagram's web surfaces.",
    evidence: "none",
    reason: "Ornaments are native window-chrome accessories. Instagram surfaces attach actions through Buttons, Context Menus, Popovers, and Sheets rather than operating-system window accessories.",
    anatomy: ["Host window or media surface", "Attached mini-toolbar or badge", "Ornament dismiss affordance"],
    usage: { useWhen: "Never — Ornaments are a visionOS and macOS window-chrome primitive with no web equivalent.", avoidWhen: "Always. Attach actions to surfaces using Buttons, icon-only menus, or Popovers." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Attach supplementary controls to media surfaces using absolutely-positioned icon Buttons or Context Menus overlays."], donts: ["Build a floating 'ornament' docked to a window edge — that spatial UI pattern doesn't translate to web."] },
    notes: ["Ornaments are a visionOS concept (UIWindowSceneGeometryPreferencesCurrent) that attach mini-toolbars to immersive windows. Web UI has no equivalent spatial attachment primitive."],
  },
  {
    title: "Pop Up Buttons",
    slug: "pop-up-buttons",
    category: "Menus And Actions",
    description: "A tertiary button that displays the current selection and persists it as its own label once the menu closes.",
    evidence: "inferred",
    findings: [
      "The two parts of this component are confirmed: the tertiary button (border, 6px radius) and the legacy flyout (.uiToggleFlyout/.openToggler).",
    ],
    rationale:
      "A pop-up button is a tertiary button whose label is data instead of a verb. It borrows the trailing chevron from Disclosure Controls to signal 'more choices live here' and writes the selected value back into the button itself on close, so the control always shows current state without needing a separate label.",
    usage: {
      useWhen: "Choosing one value from a small, named set where the current choice should stay visible after selecting (a sort order, a privacy level).",
      avoidWhen: "The action doesn't represent a persisted setting (use Pull Down Buttons) or the option set is large enough to need search (use Pickers).",
    },
    anatomy: ["Tertiary button surface", "Current value label", "Trailing chevron", "Flyout menu (Menus anatomy)"],
    spec: [
      { label: "Height", value: "36px, matching the tertiary button and text field height tier" },
      { label: "Radius", value: "var(--input-border-radius) — 6px" },
      { label: "Border", value: "rgb(var(--ig-tertiary-button-border))" },
      { label: "Chevron", value: "16px, rotates with the open/closed state — see Disclosure Controls" },
    ],
    states: [
      { name: "Default", description: "Shows the current value; border at --ig-tertiary-button-border." },
      { name: "Open", description: "Flyout visible; chevron rotated 180°." },
      { name: "Disabled", description: "Opacity .5, matching the documented Buttons disabled treatment." },
    ],
    doDont: {
      dos: ["Always render the current value as the button's label, never a generic placeholder like 'Select...'."],
      donts: ["Use a pop-up button for an action that doesn't persist a value — that's a Pull Down Button instead."],
    },
    notes: ["Because the label is the selected value, the button text must update after selection and always reflect the current state."],
    crossRef: { label: "Dropdowns & Selectors", href: "/components/dropdowns" },
  },
  {
    title: "Pull Down Buttons",
    slug: "pull-down-buttons",
    category: "Menus And Actions",
    description: "A button that looks identical at rest, then opens the same flyout menu used everywhere else in the system.",
    evidence: "inferred",
    findings: ["The legacy flyout (.uiToggleFlyout/.openToggler) is confirmed; nothing distinguishes a button-shaped trigger for it from any other trigger, because the system doesn't need to — the flyout itself is the component."],
    rationale:
      "Unlike a Pop Up Button, a pull-down button's label is a fixed verb or icon — it never changes after selection, because choosing an item performs an action rather than setting a value. That's why the system doesn't need a distinct visual treatment: the button itself is just a Tertiary or Secondary Button, and 'pull down' describes the menu's behaviour, not the button's appearance.",
    usage: {
      useWhen: "A single trigger should reveal several related one-off actions (a post's '...' overflow menu).",
      avoidWhen: "The choice persists as a setting — use Pop Up Buttons instead.",
    },
    anatomy: ["Button (icon or label, unchanged after selection)", "Flyout menu (Menus anatomy)"],
    spec: [
      { label: "Trigger", value: "Tertiary or icon-only button — see Buttons" },
      { label: "Menu surface", value: "Identical to Menus/Context Menus" },
    ],
    guidance: ["Reuse the Buttons and Menus components directly rather than building a new trigger style — the visual distinction belongs to the menu surface, not the trigger."],
    states: [
      { name: "Default", description: "Button at rest — label or icon is fixed and never changes after selection (distinguishes it from Pop Up Buttons)." },
      { name: "Hover", description: "Button surface transitions to hover state per the Buttons token set." },
      { name: "Pressed", description: "Button in pressed state; flyout opens on release." },
      { name: "Menu open", description: "Flyout visible, positioned below or above the trigger. Uses Menus anatomy verbatim." },
      { name: "Disabled", description: "Button opacity reduced, pointer-events none; all flyout actions unavailable." },
    ],
    doDont: {
      dos: ["Keep the trigger label or icon fixed regardless of what was chosen — the button's identity is the verb that opens the menu, not the last-selected value.", "Reuse the existing Tertiary or icon-only Button as the trigger with no modification."],
      donts: ["Change the button label after selection — that's Pop Up Button behaviour.", "Style the trigger differently from the Buttons system; the visual distinction belongs to the flyout, not the button."],
    },
    notes: ["The trigger is literally a Buttons component — tertiary or icon-only — while the pull-down behaviour belongs to the Menus flyout."],
    crossRef: { label: "Menus", href: "/components/menus" },
  },
  {
    title: "The Menu Bar",
    slug: "menu-bar",
    category: "Menus And Actions",
    description: "A global, OS-level command bar — a native desktop shell pattern outside Instagram's web/mobile product surface.",
    evidence: "none",
    reason: "A menu bar is a macOS application-shell component. Instagram expresses global navigation through Tab Bars, Sidebars, and Menus rather than operating-system command chrome.",
    anatomy: ["Application name menu", "Top-level category labels (File, Edit, View…)", "Drop-down command lists"],
    spec: [
      { label: "Bar height", value: "34px (Apple macOS UI Kit reference file)" },
      { label: "Item height", value: "24px — every menu item (Apple logo, app name, category labels) shares this height" },
      { label: "Item spacing", value: "0px — items sit edge-to-edge with zero gap; only their own width differentiates them, confirmed by adjacent item x-positions in the reference file (e.g. an item at x33 width 87 is followed immediately by the next item starting at x120)" },
      { label: "Leading element", value: "Apple logo, 33px wide, flush to the bar's leading edge (x0)" },
      { label: "Trailing cluster", value: "Status icons (Wi-Fi, Control Center, Spotlight) and Date/Time are also zero-gap, edge-to-edge within their own trailing group" },
    ],
    usage: { useWhen: "Never for web — the menu bar is a macOS application shell, not a web UI component.", avoidWhen: "Always. For global navigation, use Sidebars (desktop) or Tab Bars (mobile). For commands, use Menus." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Express global navigation with Sidebars or Tab Bars."], donts: ["Render a persistent File / Edit / View bar across the top of an Instagram-styled UI."] },
    notes: ["The macOS menu bar is rendered by NSMenuBar and lives in operating system chrome that web applications cannot access.", "Instagram expresses the same global-command need through Sidebars (persistent navigation) and Menus (contextual commands)."],
    closestAnalog: { label: "Sidebars", href: "/components/sidebars" },
  },
  {
    title: "Toolbars",
    slug: "toolbars",
    category: "Menus And Actions",
    description: "A row of frequently-repeated commands — the only \"toolbar\"-named token found actually describes the bottom tab bar, not a command toolbar.",
    evidence: "none",
    reason: "The toolbar-named token in /ig is --revamp-nav-bottom-toolbar-height, which sizes the bottom navigation bar (see Tab Bars). Command clusters should use Buttons, Menus, or Tab Bars according to context.",
    anatomy: ["Container row", "Icon-only or labeled command Buttons", "Optional dividers"],
    spec: [
      { label: "Reference only", value: "Apple's macOS UI Kit (not Instagram evidence) confirms toolbar buttons at 28px height, 28-32px width depending on icon vs. segmented-control style — for products built on this system that DO need a real command toolbar, not for Instagram itself" },
    ],
    usage: { useWhen: "Never as a named component. The --revamp-nav-bottom-toolbar-height token sizes the bottom navigation bar, not a command toolbar.", avoidWhen: "Always. Command clusters belong in Menus; persistent top-level tabs belong in Tab Bars." },
    states: [{ name: "N/A", description: "No standalone Toolbar component exists in Instagram's confirmed UI — the token names the bottom nav bar height only." }],
    doDont: { dos: ["Use Tab Bars for bottom navigation and Menus for grouped command lists."], donts: ["Build a horizontal command row labelled 'Toolbar' separate from Tab Bars or Menus."] },
    notes: ["The only toolbar-named token in /ig CSS is --revamp-nav-bottom-toolbar-height, confirming this is a dimension for the nav bar height, not a toolbar component spec."],
    closestAnalog: { label: "Tab Bars", href: "/components/tab-bars" },
  },
  {
    title: "Search Fields",
    slug: "search-fields",
    category: "Navigation And Search",
    description: "A fixed-height query input paired with fixed-height, truncating result rows — one of the most precisely evidenced patterns in /ig.",
    evidence: "documented",
    findings: ["--search-box-height:40px and --search-result-height:50px are literal, confirmed custom properties.", "--search-modal-height / --search-modal-height-expanded / --search-modal-top-offset govern a modal-style search overlay with an expanded state.", "--search-result-list-width:375px caps the result list to a fixed column width even on wide viewports."],
    anatomy: ["40px input box", "Result list (375px max width)", "50px result row", "Expanded modal state"],
    guidance: ["Keep the input at exactly 40px and result rows at exactly 50px — these are confirmed tokens, not approximations.", "Cap the result list width at 375px even in a wide layout; search doesn't stretch to fill available space in the evidenced pattern."],
    doDont: { dos: ["Use the modal-height-expanded token's existence as license to support a taller, expanded search state on focus."], donts: ["Let the result list grow wider than 375px to fill a wide screen."] },
    usage: {
      useWhen: "Use for a query + result list — always use the 40px input / 50px row / 375px max-width combination verbatim.",
      avoidWhen: "Avoid for a plain single-line form value with no results list; use Text Fields when search behavior and result rows are not part of the interaction.",
    },
    spec: [
      { label: "Input height", value: "40px via --search-box-height" },
      { label: "Result row height", value: "50px via --search-result-height" },
      { label: "Result list width", value: "375px via --search-result-list-width" },
      { label: "Modal height", value: "--search-modal-height with --search-modal-height-expanded for the expanded state" },
      { label: "Top offset", value: "--search-modal-top-offset positions the modal-style overlay" },
    ],
    states: [
      { name: "Empty", description: "Input shows placeholder text and no result rows." },
      { name: "Focused", description: "Cursor is visible in the 40px input while no query results are shown yet." },
      { name: "Typing", description: "Inline suggestions or partial matches can appear as the query changes." },
      { name: "Results", description: "The 375px result list shows 50px truncating rows." },
      { name: "No results", description: "The result area remains capped to the search width and shows concise empty copy." },
      { name: "Modal expanded", description: "The search overlay uses the expanded modal-height token when the focused search state needs more vertical room." },
    ],
    notes: [
      "Search is one of the most token-exact components: keep 40px, 50px, and 375px values intact.",
      "Result rows inherit Lists And Tables truncation rather than wrapping to multiple lines.",
    ],
    code: `.search-box { height: var(--search-box-height); /* 40px */ }\n.search-result-row { height: var(--search-result-height); /* 50px */ }\n.search-result-list { width: var(--search-result-list-width); /* 375px */ }`,
  },
  {
    title: "Sidebars",
    slug: "sidebars",
    category: "Navigation And Search",
    description: "Persistent left-rail navigation built from row anatomy already proven in Lists And Tables, with the current destination indicated the same way Tab Bars indicates its current page.",
    evidence: "inferred",
    findings: ["Persistent left-rail navigation is derived from two confirmed structural parts: the row pattern and the current-page indicator used elsewhere in the system."],
    rationale:
      "A sidebar is a vertical list of destinations, so it inherits the row anatomy already specified for Lists And Tables rather than a bespoke navigation primitive. Highlighting the current destination reuses --ig-highlight-bg, the same token the hover/active state uses everywhere else, so 'currently here' simply looks like a permanently-applied hover state.",
    usage: { useWhen: "Persistent, always-visible navigation across more destinations than a Tab Bar can hold — a desktop-width settings or admin surface.", avoidWhen: "The viewport is narrow enough that persistent rail navigation would compete with content for space — collapse to a Sheet or Tab Bar instead." },
    anatomy: ["Rail container", "Destination row (icon + label, Lockup anatomy)", "Current-page highlight", "Section group label"],
    spec: [
      { label: "Row height", value: "40–44px, slightly denser than the 50px search row since icons replace avatars" },
      { label: "Current-page fill", value: "rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha))" },
      { label: "Current-page accent", value: "2px leading border in a brand accent colour" },
      { label: "Group label", value: "system-12, uppercase, rgb(var(--ig-tertiary-text))" },
      { label: "Background", value: "rgb(var(--ig-primary-bg)), separated from content by --ig-separator, not elevation" },
    ],
    states: [
      { name: "Default", description: "Rail is visible, rows rest on rgb(var(--ig-primary-bg)), and destination labels use the normal Lockup hierarchy." },
      { name: "Hover", description: "Destination rows receive rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) behind the row content." },
      { name: "Pressed/Active", description: "Pressed destination rows use an overlay slightly deeper than hover overlay while the navigation action resolves." },
      { name: "Focused", description: "The focused destination row uses a 2px var(--ig-stop-magenta) outline with a --radius-xs offset." },
      { name: "Current", description: "The current destination keeps the hover-overlay fill applied and adds the 2px leading accent border." },
      { name: "Collapsed", description: "Below the small-desktop breakpoint the rail is hidden behind a menu trigger and no row content is squeezed." },
      { name: "Expanded", description: "The rail is shown from the menu trigger with the same row height, current marker, and separator treatment as the persistent rail." },
      { name: "Disabled", description: "Disabled destinations have opacity reduced and pointer-events none while the rail container itself remains visible." },
    ],
    guidance: ["Indicate the current destination with the same highlight tint used for hover/active states elsewhere, plus a leading accent border — don't invent a second 'active' visual language distinct from the rest of the system."],
    responsive: ["Collapse the rail behind a menu trigger below the documented small-desktop breakpoint (1024px) rather than shrinking row content — see Layout & Grid."],
    doDont: { dos: ["Source colours from --ig-secondary-background/--ig-highlight-bg, which are confirmed real tokens, while treating the rail layout itself as derived."], donts: ["Present this site's own sidebar CSS as direct Instagram source — it was authored for this documentation site using the same tokens."] },
    notes: ["The current destination is the hover-overlay treatment made persistent, using rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) plus a 2px leading accent."],
  },
  {
    title: "Tab Bars",
    slug: "tab-bars",
    category: "Navigation And Search",
    description: "The bottom row of top-level destinations — sized by the one real \"toolbar\" token found in /ig.",
    evidence: "documented",
    findings: ["--revamp-nav-bottom-toolbar-height is referenced repeatedly inside calc() expressions for safe-area and scroll-offset math across the production bundle — strong evidence of a real, currently-shipping bottom tab bar ('revamp' suggesting a relatively recent redesign)."],
    anatomy: ["Tab bar container (height: var(--revamp-nav-bottom-toolbar-height))", "Destination icon", "Current-page indicator", "Badge/count"],
    guidance: ["Reserve layout space for the tab bar using the same token other surfaces calc() against it with — that's the evidenced integration pattern, not a fixed pixel guess."],
    doDont: { dos: ["Use --revamp-nav-bottom-toolbar-height for safe-area math, exactly as the rest of the app does."], donts: ["Hard-code a pixel height for the tab bar when a token already exists for it."] },
    usage: {
      useWhen: "Use for top-level destination switching in mobile layout; the bottom nav stays persistent while content scrolls behind reserved safe-area space.",
      avoidWhen: "Avoid for in-page peer panels or short carousels; use Tab Views for panels and Page Controls for manual media position.",
    },
    spec: [
      { label: "Height", value: "var(--revamp-nav-bottom-toolbar-height)" },
      { label: "Icons", value: "24px destination icons" },
      { label: "Active tab", value: "Uses the filled version of the icon, with optional label emphasis" },
      { label: "Safe area", value: "Other surfaces reserve space with calc() against the toolbar-height token" },
      { label: "Badge", value: "Notification dot or count attaches to the icon, not the container" },
    ],
    states: [
      { name: "Default", description: "Destination rests in the bottom bar with an outline icon and normal label treatment." },
      { name: "Pressed", description: "Tap target applies a pressed overlay while navigation resolves." },
      { name: "Active", description: "The current destination uses the filled icon and active label treatment." },
      { name: "Notification dot", description: "A dot or count sits on the icon to signal pending activity." },
      { name: "Disabled", description: "Unavailable destinations reduce opacity and do not navigate." },
    ],
    notes: [
      "The toolbar-height token is part of layout math, so reserve space for the tab bar instead of overlaying it casually.",
      "Filled icons communicate current destination; do not invent a separate underline for the bottom bar.",
    ],
  },
  {
    title: "Token Fields",
    slug: "token-fields",
    category: "Navigation And Search",
    description: "A text field that converts each accepted entry into a pill-shaped chip — the Text Field input row plus the pill grammar used for tags and badges.",
    evidence: "inferred",
    findings: ["Both halves of the token-field pattern are confirmed: the 36px text-field row (._aa48, --ig-text-input-border-prism) and the pill radius (999px) used for tags and the Stories progress segments."],
    rationale:
      "Every bounded, removable value in this system renders as a pill — that's the shape grammar documented on Shape. A token field is simply a Text Field whose committed values are rendered as pills inline with the cursor, rather than a new input paradigm.",
    usage: {
      useWhen: "Collecting a small number of named, removable values inline — tagging people in a post, adding usernames to a Close Friends list.",
      avoidWhen: "The value set is unbounded free text (use a plain Text Field) or single-select (use Pop Up Buttons).",
    },
    anatomy: ["Field container (Text Field anatomy)", "Committed chip (pill, removable)", "Cursor/input position", "Suggestion row (Lockup anatomy)"],
    spec: [
      { label: "Field height", value: "36px minimum, grows with wrapped chips" },
      { label: "Chip radius", value: "999px (pill) — see Shape" },
      { label: "Chip fill", value: "rgb(var(--ig-secondary-bg))" },
      { label: "Chip text", value: "system-12, rgb(var(--ig-primary-text))" },
      { label: "Border", value: "rgb(var(--ig-text-input-border-prism)), matching Text Fields" },
    ],
    states: [
      { name: "Default", description: "Field shows committed chips inline with the cursor position and keeps the 36px minimum Text Field height." },
      { name: "Hover", description: "The field or removable chip target receives rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) without changing chip colour identity." },
      { name: "Pressed/Active", description: "Pressed chips, remove controls, or suggestion rows use an overlay slightly deeper than hover overlay while the action is held." },
      { name: "Focused", description: "The field uses a 2px var(--ig-stop-magenta) outline with a --radius-xs offset and places the cursor after the active token." },
      { name: "Token selected", description: "A committed chip can be highlighted with the hover-overlay tint while its remove action is available." },
      { name: "Suggestions open", description: "Focused input with typed text opens suggestion rows using Lockup anatomy beneath the field." },
      { name: "Disabled", description: "The whole field, chips, and remove affordances have opacity reduced and pointer-events none." },
    ],
    doDont: {
      dos: ["Render each committed value as a 999px pill, matching the system's one pill shape rather than inventing a chip-specific radius."],
      donts: ["Give chips their own colour identity — they should read as neutral tokens, not status indicators."],
    },
    notes: ["Committed chips keep neutral identity colour from --ig-secondary-bg and inherit the field border from Text Fields rather than introducing chip-specific colour semantics."],
    crossRef: { label: "Text Fields", href: "/components/text-fields" },
  },
  {
    title: "Action Sheets",
    slug: "action-sheets",
    category: "Presentation",
    description: "Compact, touch-first action choices — the same full-height sheet transition used by Instagram's brand menu, reframed as a choice list.",
    evidence: "documented",
    findings: ["._a96f{position:fixed;height:100%;width:100%;z-index:400} with transform:translateY(100%) → translateY(0), transitioned over .5s cubic-bezier(0,.61,.28,.92) — the exact mechanism documented as Ease Settle on Motion."],
    anatomy: ["Full-height fixed surface", "Slide-up transform", "Action rows", "Dismiss"],
    guidance: ["Reuse the documented slide-up mechanism verbatim (translateY(100%) → 0, Ease Settle, ~500ms) rather than inventing a new entrance for a sheet-style surface."],
    doDont: { dos: ["Use position: fixed with z-index 400 and the documented Ease Settle transform."], donts: ["Fade a sheet in with opacity alone — every sheet-like surface found uses a translate transform."] },
    usage: {
      useWhen: "Use for a contextual action list triggered from the bottom of the screen; reserve it for 3+ destructive, irreversible, or high-attention actions.",
      avoidWhen: "Avoid for one-off inline commands, persistent navigation, or pointer-first flyouts; use Buttons, Tab Bars, or Menus instead.",
    },
    spec: [
      { label: "Entrance", value: "translateY(100%) → translateY(0)" },
      { label: "Timing", value: "0.5s cubic-bezier(0,.61,.28,.92)" },
      { label: "Backdrop", value: "rgba(0,0,0,0.5)" },
      { label: "Position", value: "position: fixed; height: 100%; width: 100%" },
      { label: "Layer", value: "z-index: 400" },
    ],
    states: [
      { name: "Hidden", description: "Sheet is translated fully off the bottom of the viewport." },
      { name: "Opening", description: "Sheet animates upward from translateY(100%) to 0 over the documented Ease Settle curve." },
      { name: "Visible", description: "Action rows are available over the dimmed backdrop." },
      { name: "Row pressed", description: "The tapped row applies a pressed overlay while the action is held." },
      { name: "Closing", description: "Sheet animates down to translateY(100%) before being removed or hidden." },
    ],
    notes: [
      "The sheet motion is transform-based; opacity-only entrance would contradict the captured mechanism.",
      "Use the backdrop to separate the temporary action list from the page beneath it.",
    ],
    crossRef: { label: "Modals & Panels", href: "/components/modals" },
  },
  {
    title: "Alerts",
    slug: "alerts",
    category: "Presentation",
    description: "A centered modal carrying one title, one line of body copy, and one or two actions — the lightbox's zoom-settle entrance applied to a decision instead of media.",
    evidence: "inferred",
    findings: ["--modal-backdrop-default:rgba(0,0,0,.65) and --modal-border-radius:12px are real, general-purpose modal tokens. Alert-specific destructive treatment derives from the existing --ig-error action colour rather than a separate alert border or icon treatment."],
    rationale:
      "Alerts interrupt, and the system's only interrupt-grade entrance is the lightbox's combined opacity+scale zoom-settle (Ease Confident) — sheets slide up for contextual tasks, alerts zoom in for decisions. The destructive action borrows --ig-error directly rather than introducing a new red, keeping every destructive surface in the system the same colour.",
    usage: {
      useWhen: "A decision or failure must block the current flow until acknowledged — deleting a post, confirming a sign-out.",
      avoidWhen: "The message is informational and non-blocking (use a toast-equivalent inline message) or the content needs more than two lines of body copy (use a Panel)."
    },
    anatomy: ["Backdrop (rgba(0,0,0,.65))", "Centered surface (12px radius)", "Title", "Body copy (1–2 lines)", "Action row (1–2 buttons)"],
    spec: [
      { label: "Surface radius", value: "var(--modal-border-radius) — 12px" },
      { label: "Backdrop", value: "rgba(0,0,0,.65) — var(--modal-backdrop-default)" },
      { label: "Entrance", value: "opacity 0→1, scale .96→1, Ease Confident — see Motion" },
      { label: "Destructive action", value: "rgb(var(--ig-error)) text on a transparent or tertiary button" },
      { label: "Body type", value: "system-14, rgb(var(--ig-secondary-text))" },
    ],
    states: [
      { name: "Entering", description: "Backdrop fades in; surface scales from .96 to 1 over Ease Confident." },
      { name: "Open", description: "Focus trapped inside the surface; backdrop dismisses on outside press unless destructive." },
      { name: "Dismissed", description: "Reverse of entrance, shortened to match the system's faster exit convention." },
    ],
    guidance: ["Build alerts on the same modal tokens as everything else — the alert distinction comes from content and action semantics, not a separate visual shell."],
    accessibility: [
      "Use role=\"alertdialog\" with the title as the accessible name, and trap focus for the duration the alert is open.",
      "Never make outside-press dismiss the only way to close a destructive alert — always pair it with an explicit Cancel action.",
    ],
    doDont: { dos: ["Reuse --modal-border-radius and --modal-backdrop-default rather than inventing alert-specific tokens."], donts: ["Add a bespoke alert colour treatment that isn't backed by --ig-error or --ig-success."] },
    notes: ["Alerts use the interrupt-grade modal layer, so their shadow belongs on --shadow-elevated rather than a card/list shadow tier."],
    crossRef: { label: "Modals & Panels", href: "/components/modals" },
  },
  {
    title: "Page Controls",
    slug: "page-controls",
    category: "Presentation",
    description: "Small filled circles marking position in a short, manually-paged sequence — the carousel's static counterpart to the time-driven Stories Progress bar.",
    evidence: "inferred",
    findings: ["Page Controls combine two confirmed pieces: the carousel/navigation context they pair with (._aaqh) and the circle primitive (border-radius: 50%)."],
    rationale:
      "Stories Progress fills automatically because time is the driver; a manually-paged carousel has no time axis, so it needs a static position marker instead of a filling one. The system's circle primitive (used for avatars and the carousel's own prev/next buttons) is the natural shape — a dot is just that primitive at its smallest documented scale.",
    usage: {
      useWhen: "Showing position in a short (≤10), manually-advanced sequence — a multi-image post, an onboarding carousel.",
      avoidWhen: "Position advances automatically on a timer (use Stories Progress) or the sequence has more than ~10 items (switch to a count label, e.g. '3/24').",
    },
    anatomy: ["Dot (inactive)", "Dot (active, larger or filled)", "Gap between dots"],
    spec: [
      { label: "Dot size", value: "6px inactive, 8px active — both circle (border-radius: 50%)" },
      { label: "Gap", value: "8px (2× base unit)" },
      { label: "Active fill", value: "rgb(var(--ig-primary-text))" },
      { label: "Inactive fill", value: "rgb(var(--ig-stroke))" },
      { label: "Motion", value: "Width/scale transition on active change, Ease Glide, 150ms" },
    ],
    states: [
      { name: "Default", description: "Inactive dots render as 6px circles in rgb(var(--ig-stroke)) with an 8px gap between each dot." },
      { name: "Hover", description: "When dots are interactive, the hit area receives rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) while the dot size stays stable." },
      { name: "Pressed/Active", description: "Pressed dots use an overlay slightly deeper than hover overlay; the active page dot remains the larger filled indicator." },
      { name: "Focused", description: "Keyboard-focused dots use a 2px var(--ig-stop-magenta) outline with a --radius-xs offset around the hit area." },
      { name: "Current page", description: "The current page dot renders at 8px with rgb(var(--ig-primary-text)) fill and transitions with Ease Glide on page change." },
      { name: "Disabled", description: "Disabled page controls have opacity reduced and pointer-events none while preserving the current-page indicator." },
    ],
    doDont: {
      dos: ["Keep dots fixed-size circles from the shape primitive scale, not a bespoke pagination asset."],
      donts: ["Use dots for anything time-driven — that's Stories Progress's job, and mixing the two patterns would contradict the system's own distinction between manual and automatic sequencing."],
    },
    notes: ["The inactive marker is a 6px circle with an 8px gap; only the current page dot grows to the 8px active size."],
    crossRef: { label: "Stories Progress", href: "/components/stories-progress" },
  },
  {
    title: "Popovers",
    slug: "popovers",
    category: "Presentation",
    description: "Lightweight contextual content anchored to a trigger — the same .uiContextualLayer system as Context Menus and Menus, viewed as a presentation surface.",
    evidence: "documented",
    findings: [".uiContextualLayer/.uiContextualLayerPositioner provide the anchoring; ._558b ._54ng provides the bordered, shadowed surface — identical mechanism to Context Menus, just hosting richer content than an action list."],
    anatomy: ["Trigger", "Contextual layer (position:absolute)", "Surface (border + shadow)", "Richer content (form, preview, or info block)"],
    spec: [
      { label: "Surface", value: "background:#fff, border:1px solid rgba(0,0,0,.15), border-radius:3px, box-shadow:0 3px 8px rgba(0,0,0,.3) — identical to Context Menus" },
      { label: "Positioning", value: ".uiContextualLayerPositioner (in-flow) or .uiContextualLayerPositionerFixed (fixed) — chosen by whether the trigger is in a scrollable context" },
      { label: "Z-index", value: "202 — above most overlapping content but below modals" },
    ],
    usage: {
      useWhen: "A trigger needs to surface richer content than a plain action list — a mini form, a preview card, an emoji picker, an inline help explanation.",
      avoidWhen: "The content is purely a command list (use Context Menus or Menus) or requires full-screen focus (use Modals & Panels).",
    },
    states: [
      { name: "Hidden", description: "Layer is not rendered or is display:none; trigger is at rest." },
      { name: "Open", description: "Layer positioned relative to the trigger; surface visible with border and shadow." },
      { name: "Repositioned", description: "When the trigger is near a viewport edge, the Positioner flips the layer to the opposite side — no re-animation required." },
    ],
    doDont: {
      dos: ["Reuse .uiContextualLayer positioning — it handles edge-flip and scroll containment; don't build a new anchoring system for popover-like content."],
      donts: ["Use a Popover for full-screen takeover content — that's a Modal. Popovers stay anchored and small."],
    },
    notes: ["The surface spec (3px radius, 1px rgba border, soft shadow) is the same as Context Menus — Popovers differ only in their content, not their chrome.", "The PositionerFixed variant is for popovers triggered inside scrolling containers — it breaks the layer out of the scroll context."],
    guidance: ["Don't design a new anchoring mechanism — reuse the documented contextual-layer positioning shared with Context Menus and Menus."],
    crossRef: { label: "Context Menus", href: "/components/context-menus" },
  },
  {
    title: "Scroll Views",
    slug: "scroll-views",
    category: "Presentation",
    description: "A surface that owns its own scrollable viewport, with a custom track and gripper instead of the browser default.",
    evidence: "documented",
    findings: [".uiScrollableArea{height:100%;overflow:hidden;position:relative} plus .uiScrollableAreaWrap{overflow-y:scroll} is the legacy desktop scroll container.", ".uiScrollableAreaTrack{width:7px} and .uiScrollableAreaGripper{border-radius:7px;transition:width .25s} define a custom-styled scrollbar that widens on hover/drag.", "Mobile galleries instead hide the native scrollbar entirely (scrollbar-width:none / hidden ::-webkit-scrollbar)."],
    anatomy: ["Scroll container", "Content", "Track (7px)", "Gripper (widens on interaction)"],
    guidance: ["On desktop/legacy surfaces, use a custom 7px track + gripper that widens on hover, not the unstyled native scrollbar.", "On mobile, hide the scrollbar entirely and rely on touch momentum — don't show a custom gripper on touch."],
    doDont: { dos: ["Widen the gripper on hover/drag, matching the documented transition:width .25s."], donts: ["Show a visible custom scrollbar on a mobile/touch gallery — every mobile instance hides it."] },
    usage: {
      useWhen: "Use for any surface with content taller than the viewport that needs styled scrolling, including legacy desktop panes, modal bodies, and long result lists.",
      avoidWhen: "Avoid on touch-first galleries where the evidenced treatment hides scrollbars entirely and relies on native momentum.",
    },
    spec: [
      { label: "Container", value: ".uiScrollableArea height:100%; overflow:hidden; position:relative" },
      { label: "Wrapper", value: ".uiScrollableAreaWrap overflow-y:scroll" },
      { label: "Track width", value: "7px" },
      { label: "Gripper radius", value: "7px border radius" },
      { label: "Gripper transition", value: "width .25s" },
      { label: "Mobile", value: "scrollbar-width:none and hidden ::-webkit-scrollbar" },
    ],
    states: [
      { name: "Default", description: "Track is hidden or minimal while content scrolls inside its viewport." },
      { name: "Hover", description: "Pointer hover reveals the custom track and gripper." },
      { name: "Dragging", description: "The gripper widens during drag, following the documented width transition." },
      { name: "Touch", description: "Scrollbar is hidden entirely and native momentum handles scrolling." },
    ],
    notes: [
      "Desktop and touch treatments intentionally differ: custom gripper for pointer, hidden scrollbar for mobile.",
      "The gripper transition changes width only; do not add a separate opacity or scale animation.",
    ],
  },
  {
    title: "Sheets",
    slug: "sheets",
    category: "Presentation",
    description: "A full-height or bottom-up surface that temporarily takes over the viewport — the broader form of the Action Sheet transition.",
    evidence: "documented",
    findings: ["Same evidence as Action Sheets: ._a96f's translateY(100%) → 0 over .5s cubic-bezier(0,.61,.28,.92). The about-page brand menu is the clearest full, non-action-list example of this mechanism."],
    anatomy: ["Backdrop (rgba scrim)", "Sheet surface (full-width, bottom-anchored)", "Handle pill (optional — drag affordance)", "Scrollable content", "Dismiss control"],
    spec: [
      { label: "Entry animation", value: "translateY(100%) → translateY(0) over 0.5s cubic-bezier(0,.61,.28,.92) — identical to Action Sheets" },
      { label: "Exit animation", value: "translateY(0) → translateY(100%) over 0.5s, same curve" },
      { label: "Backdrop", value: "rgba(0,0,0,0.5) — same as Modals & Panels" },
      { label: "Surface", value: "background:rgb(var(--ig-elevated-bg)), border-radius top-left/top-right var(--radius-lg) 12px" },
      { label: "Shadow", value: "--shadow-8: 0 -6px 16px rgba(0,0,0,.18) — the confirmed upward-facing sheet shadow" },
    ],
    usage: {
      useWhen: "A bottom-up surface hosting richer content than a simple action list — a share tray, a comment section, a media browser, a filter panel.",
      avoidWhen: "The content is a short list of contextual actions (use Action Sheets). Or the content requires a full navigational context (use a new page/route).",
    },
    states: [
      { name: "Hidden", description: "translateY(100%) — fully offscreen below the viewport." },
      { name: "Opening", description: "Animating from translateY(100%) to translateY(0) over 0.5s with --ease-settle curve." },
      { name: "Visible", description: "translateY(0) — sheet occupies bottom of viewport; backdrop is opaque; content is interactive." },
      { name: "Dragging (optional)", description: "User drags the handle pill; sheet follows the pointer. On release: snap to open or snap to dismissed based on velocity." },
      { name: "Closing", description: "Animating from translateY(0) to translateY(100%) — same curve, same duration." },
    ],
    doDont: {
      dos: ["Use the confirmed --ease-settle curve (cubic-bezier(0,.61,.28,.92)) — it gives the bottom-up spring feel consistent with every other Instagram sheet.", "Apply --shadow-8 (upward-facing shadow) to the sheet top edge."],
      donts: ["Invent a different animation curve — Action Sheets and Sheets share exactly the same timing.", "Open a Sheet for a simple 2–3 item action list — that's the Action Sheet use case."],
    },
    notes: ["The sheet and the action sheet are the same component at different content scales — the only difference is what's inside.", "On mobile, Sheets typically go full-width and partial or full height. On desktop, they can take the form of a bottom panel or a side panel depending on the layout."],
    guidance: ["Treat this as the same component as Action Sheets at a larger scale — don't invent a second, different transition for a 'sheet' versus an 'action sheet'."],
    crossRef: { label: "Action Sheets", href: "/components/action-sheets" },
  },
  {
    title: "Windows",
    slug: "windows",
    category: "Presentation",
    description: "A fixed, non-resizable task surface — Instagram's equivalent of a window is the legacy modal box, deliberately without resize or minimize chrome.",
    evidence: "inferred",
    findings: ["Window-like task surfaces resolve to the legacy ._t/._1yv modal box (background:#fff, box-shadow:0 2px 26px rgba(0,0,0,.3)) rather than title bars, resize handles, or minimize/maximize chrome."],
    rationale:
      "A single-surface product has no use for independent, resizable windows, and the system never builds the chrome for one — every task surface found is fixed-size and dismissed as a unit, not resized or minimized. Where a 'document' needs its own space, Instagram reaches for the legacy modal box rather than a window primitive.",
    usage: {
      useWhen: "Migrating a desktop-pattern integration where a self-contained task surface is unavoidable.",
      avoidWhen: "Almost always — prefer Modals & Panels or Sheets, which carry real evidence and the system's actual visual language.",
    },
    anatomy: ["Fixed surface (no title bar)", "Content", "Single dismiss control"],
    spec: [
      { label: "Shadow", value: "0 2px 26px rgba(0,0,0,.3) — confirmed legacy modal box value, same as --shadow-elevated" },
      { label: "Background", value: "#fff (background: #fff from ._t/._1yv selector)" },
      { label: "Corner radius", value: "var(--radius-lg) 12px" },
    ],
    guidance: ["Don't model this as a resizable, independent OS window. If a document-like surface is needed, the legacy modal box is the Instagram precedent."],
    doDont: {
      dos: ["Use the legacy modal box's shadow (0 2px 26px rgba(0,0,0,.3)) and rounded corners if a document-like surface is unavoidable."],
      donts: ["Add resize handles, a title bar, or minimize/maximize controls — they belong to OS window chrome, not Instagram surfaces."],
    },
    notes: ["The legacy modal box is the closest window analog: fixed, elevated, and dismissed as a unit, with no resize or minimize chrome."],
    states: [
      { name: "Default", description: "Fixed surface at rest — no visible chrome beyond the content box, border-radius, and the documented legacy shadow." },
      { name: "Loading", description: "Content renders its own loading state within the fixed surface; the surface itself does not animate." },
      { name: "Dismissing", description: "Surface fades or scales out via the same motion as Modals (Ease Settle, ~300ms); no minimize or hide-to-taskbar affordance." },
    ],
    crossRef: { label: "Modals & Panels", href: "/components/modals" },
  },
  {
    title: "Color Wells",
    slug: "color-wells",
    category: "Selection And Input",
    description: "A circular swatch previewing a chosen colour before a picker opens — built from the same circle primitive as every avatar and icon button.",
    evidence: "inferred",
    findings: ["Every fixed semantic colour this pattern would preview (--ig-error, --ig-success, --ig-close-friends, --ig-subscribers-only) is confirmed real, and the circle shape matches the avatar/icon-button primitive."],
    rationale:
      "Instagram's colour system is semantic, not freeform: most colour choices in the system are fixed tokens (Close Friends green, Live red) rather than user-selected. A colour well in this language previews one of those fixed tokens, not an open palette.",
    usage: {
      useWhen: "Confirming a selection from a small, fixed set of semantic colours (a label colour, a note background) before committing.",
      avoidWhen: "The product needs a true freeform colour picker — that moves outside the semantic-token model that gives Instagram colour its consistency."
    },
    anatomy: ["Circular swatch (current value)", "Border (--ig-stroke)", "Tap target (44px minimum)"],
    spec: [
      { label: "Swatch shape", value: "Circle, border-radius: 50%" },
      { label: "Swatch size", value: "24–32px, matching small avatar scale" },
      { label: "Border", value: "1px rgb(var(--ig-stroke))" },
      { label: "Tap target", value: "44px minimum hit area regardless of visual size" },
    ],
    states: [
      { name: "Default", description: "Circular swatch previews the current semantic colour inside a 44px minimum hit area with a 1px stroke." },
      { name: "Hover", description: "The hit area receives rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) while the swatch colour remains unchanged." },
      { name: "Pressed/Active", description: "The well uses an overlay slightly deeper than hover overlay while the picker trigger is pressed." },
      { name: "Focused", description: "The focused well uses a 2px var(--ig-stop-magenta) outline with a --radius-xs offset around the hit area." },
      { name: "Selected", description: "The committed semantic colour fills the swatch and remains visible before the picker opens." },
      { name: "Disabled", description: "Disabled wells have opacity reduced and pointer-events none while still showing the current colour." },
    ],
    doDont: {
      dos: ["Restrict the underlying value set to documented semantic tokens rather than an open colour space."],
      donts: ["Build a full HSB/RGB picker UI — that scope of control sits outside the semantic-token colour model."],
    },
    notes: ["The circular swatch uses the same circle primitive as Avatars and icon buttons; the chosen semantic colour changes the fill, not the shape."],
  },
  {
    title: "Combo Boxes",
    slug: "combo-boxes",
    category: "Selection And Input",
    description: "A Text Field that opens a Menus-style result list as you type — the same two anatomies the search experience already pairs.",
    evidence: "inferred",
    findings: ["The search experience already pairs the two halves of this pattern in practice: a 40px input (--search-box-height) feeding a result list built from the Lockup row pattern."],
    rationale:
      "Search is functionally a combo box — typed text narrowing a live result list — so a general-purpose combo box inherits its anatomy directly rather than inventing a new one: the input height, the result row height, and the result list's max width all carry over unchanged.",
    usage: {
      useWhen: "A value should be typeable or chosen from a list of matches — entering a location, choosing from a long but searchable option set.",
      avoidWhen: "The option set is short enough to browse without typing (use Pop Up Buttons) or open-ended free text (use a plain Text Field).",
    },
    anatomy: ["Input (Text Field anatomy)", "Result list (Lockup rows)", "Highlighted match", "Empty state"],
    spec: [
      { label: "Input height", value: "36–40px, matching Text Fields / Search Fields" },
      { label: "Result row height", value: "50px, matching Search Fields" },
      { label: "Result list width", value: "Matches input width, capped per Search Fields' 375px precedent on wide layouts" },
      { label: "Highlighted match", value: "rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) background" },
    ],
    states: [
      { name: "Empty", description: "Placeholder text in the input, result list hidden." },
      { name: "Focused", description: "Input bordered at hover variant; cursor active. Recent or suggested entries may surface before any text is typed." },
      { name: "Typing", description: "Result list opens as input value changes. Matching substrings in each row are highlighted with the hover-overlay token." },
      { name: "Result selected", description: "Input fills with the selected label; list collapses instantly — matching the legacy menu's display-state close." },
      { name: "No results", description: "Empty-state label below the input; free text entry remains available." },
    ],
    doDont: {
      dos: ["Surface recent or suggested values before any text is typed — the search pattern primes a recency-first expectation.", "Highlight the matching substring in each result row."],
      donts: ["Build a custom result surface — inherit the Search Fields/Lockup row heights and max-width exactly.", "Show more than ~6 visible rows without a scrollable list; a scroll indicator signals more results exist."],
    },
    notes: ["Suggestions inherit Search Fields' 50px Lockup row height and width cap rather than defining a custom combo-box result surface."],
    crossRef: { label: "Search Fields", href: "/components/search-fields" },
  },
  {
    title: "Digit Entry Views",
    slug: "digit-entry-views",
    category: "Selection And Input",
    description: "A row of equal-width cells for a verification code, each cell sized to the same height as a standard Text Field.",
    evidence: "inferred",
    findings: ["Instagram account verification uses SMS/email confirmation codes, so the digit-entry pattern derives from the confirmed Text Field grammar while splitting the value into equal character cells."],
    rationale:
      "A digit entry view is a Text Field split into equal cells rather than a new control: same 36px height, same border tokens, same focus treatment, just narrowed to one character per cell and gapped by the base unit so the eye reads it as a single code rather than separate fields.",
    usage: {
      useWhen: "Collecting a short, fixed-length numeric code — SMS or email verification.",
      avoidWhen: "The value is longer than ~8 characters or alphanumeric with no fixed length (use a plain Text Field)."
    },
    anatomy: ["Cell (one per character)", "Gap between cells", "Active cell focus ring", "Filled cell"],
    spec: [
      { label: "Cell size", value: "40×36px, matching Text Field height" },
      { label: "Gap", value: "8px (2× base unit)" },
      { label: "Radius", value: "var(--input-border-radius) — 6px per cell" },
      { label: "Border", value: "rgb(var(--ig-text-input-border-prism)); focus uses the hover variant" },
      { label: "Type", value: "system-18 or 22, centered, for legibility at a glance" },
    ],
    states: [
      { name: "Empty", description: "Border at resting colour, placeholder caret in the first empty cell." },
      { name: "Filled", description: "Digit rendered at system-18/22, cursor advances to next cell automatically." },
      { name: "Error", description: "All cells border in rgb(var(--ig-error)) with a single error message below the row." },
    ],
    accessibility: ["Expose the cell row as a single field to screen readers (one accessible name, one value) rather than N separate unlabeled inputs, and support paste-to-fill across all cells at once."],
    doDont: { dos: ["Auto-advance focus to the next cell on input, matching standard code-entry conventions."], donts: ["Require manual tabbing between cells — that contradicts the single-field mental model the row presents visually."] },
    notes: ["Each digit cell is a Text Field segment: the same 36px height, border token, and focus treatment, narrowed to one character."],
  },
  {
    title: "Image Wells",
    slug: "image-wells",
    category: "Selection And Input",
    description: "An Image View frame with an empty-state affordance — the same ratio-locked container, showing an upload icon instead of a shimmer until a value exists.",
    evidence: "inferred",
    findings: ["An Image Well extends the standard ratio-locked Image View frame with one additional empty state for choosing media."],
    rationale:
      "An image well doesn't need new anatomy: it's the Image View's ratio frame, holding either a placeholder icon (empty) or the chosen media (filled), with the same shimmer transition between states that every loading image in the system already uses.",
    usage: { useWhen: "Letting a user choose or replace a single image value — a profile photo, a cover image.", avoidWhen: "Multiple images are being chosen at once (use Collections) or no replace/clear action is needed (use a plain Image View)." },
    anatomy: ["Ratio frame (Image View anatomy)", "Empty-state icon", "Filled state (chosen media)", "Replace/clear affordance"],
    spec: [
      { label: "Frame", value: "Same aspect-ratio + object-fit: cover as Image Views" },
      { label: "Empty fill", value: "rgb(var(--ig-secondary-bg)) with a centered icon at rgb(var(--ig-tertiary-text))" },
      { label: "Border", value: "1px dashed rgb(var(--ig-separator)) in the empty state only" },
    ],
    states: [
      { name: "Default", description: "Empty well shows the ratio frame with secondary fill, centered icon, and dashed separator border." },
      { name: "Hover", description: "The frame receives rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha)) to indicate the choose or replace target." },
      { name: "Pressed/Active", description: "The frame uses an overlay slightly deeper than hover overlay while the media action is pressed." },
      { name: "Focused", description: "The focused frame uses a 2px var(--ig-stop-magenta) outline with a --radius-xs offset." },
      { name: "Filled", description: "Chosen media fills the frame with the same aspect-ratio and object-fit: cover rules as Image Views." },
      { name: "Loading", description: "A shimmer skeleton covers the frame while the chosen media resolves into the filled state." },
      { name: "Disabled", description: "Disabled wells have opacity reduced and pointer-events none while the placeholder or chosen media remains visible." },
    ],
    doDont: { dos: ["Reuse the exact ratio and object-fit rules from Image Views — don't introduce a second cropping convention for the well state."], donts: ["Show a generic file-upload icon unrelated to the system's iconography — keep it visually consistent with the rest of the icon set."] },
    notes: ["The dashed --ig-separator border is reserved for the empty choosing state; once filled, the well returns to the standard Image View frame."],
    crossRef: { label: "Image Views", href: "/components/image-views" },
  },
  {
    title: "Pickers",
    slug: "pickers",
    category: "Selection And Input",
    description: "A bounded value-set selector presented as a Sheet on touch and a Menus flyout on pointer input — there's no third, wheel-style picker surface in this system.",
    evidence: "inferred",
    findings: ["Bounded selection resolves through surfaces the system already has: the general flyout menu documented under Menus and the Sheet pattern used on touch."],
    rationale:
      "Instagram's interaction model already branches by input method for presentation surfaces (sheets on touch, flyouts on pointer — see Menus' responsive guidance), so a picker is that same branch applied to a bounded value set rather than a third, novel surface like an iOS wheel picker.",
    usage: { useWhen: "Choosing one value from a small, bounded set with no need for inline persistence (use Pop Up Buttons for that case instead).", avoidWhen: "The set is large enough to need search — combine with Combo Boxes instead." },
    anatomy: ["Trigger", "Sheet (touch) or flyout (pointer)", "Option row", "Selected-state check"],
    spec: [
      { label: "Touch surface", value: "Action Sheet anatomy" },
      { label: "Pointer surface", value: "Menus flyout anatomy" },
      { label: "Selected indicator", value: "Check mark, leading or trailing, rgb(var(--ig-primary-text))" },
    ],
    states: [
      { name: "Default", description: "Trigger rests inline while the bounded value set remains closed." },
      { name: "Hover", description: "Pointer triggers and option rows receive rgba(var(--ig-hover-overlay-rgb), var(--ig-hover-overlay-alpha))." },
      { name: "Pressed/Active", description: "Pressed triggers or option rows use an overlay slightly deeper than hover overlay until selection or dismissal." },
      { name: "Focused", description: "The focused trigger or option row uses a 2px var(--ig-stop-magenta) outline with a --radius-xs offset." },
      { name: "Open", description: "Touch opens the Action Sheet surface; pointer opens the Menus flyout surface with the same option-row anatomy." },
      { name: "Selected", description: "The selected option row shows a check mark in rgb(var(--ig-primary-text)) and the trigger reflects the committed value." },
      { name: "Disabled", description: "Disabled pickers have opacity reduced and pointer-events none, and the trigger does not open a surface." },
    ],
    doDont: { dos: ["Branch presentation by input method, matching Menus rather than building a single fixed surface."], donts: ["Introduce a wheel/drum picker style — it belongs to native OS controls rather than Instagram's menu/sheet grammar."] },
    notes: ["Picker columns are ordinary sheet or flyout option rows, so they scroll as those surfaces do without wheel-style momentum snap friction."],
    crossRef: { label: "Menus", href: "/components/menus" },
  },
  {
    title: "Segmented Controls",
    slug: "segmented-controls",
    category: "Selection And Input",
    description: "Peer choices sharing one pill-shaped track — Stories Progress's segmented shape, made interactive and given a selected state instead of a fill timer.",
    evidence: "inferred",
    findings: ["The segmented pill shape is confirmed by Stories Progress; Segmented Controls transfer that shape from passive time progress into selectable peer options."],
    rationale:
      "The segmented track shape already exists in the system; adding selection keeps the visual vocabulary closed — a row of equal pill segments always means 'one track, several positions' whether the position changes by time (Stories Progress) or by tap (Segmented Controls).",
    usage: { useWhen: "Switching between 2–4 peer views inline, where each option is equally weighted (a toggle between Grid/List view).", avoidWhen: "There are more than 4 options (use Tab Views) or the options aren't mutually exclusive." },
    anatomy: ["Track (pill, var(--radius-pill))", "Segment (equal width)", "Selected-segment fill", "Divider between unselected segments"],
    spec: [
      { label: "Track height", value: "36px, matching the button height tier" },
      { label: "Track radius", value: "var(--radius-pill) — 999px" },
      { label: "Selected fill", value: "rgb(var(--ig-elevated-bg)) inset within rgb(var(--ig-secondary-bg)) track" },
      { label: "Motion", value: "Selected-fill position transitions with Ease Glide, 200ms" },
    ],
    states: [
      { name: "Default", description: "All segments equal weight, track at --ig-secondary-bg." },
      { name: "Selected", description: "One segment's fill at --ig-elevated-bg, text at --ig-primary-text; others at --ig-secondary-text." },
      { name: "Disabled", description: "Opacity .5 on the whole control, matching Buttons." },
    ],
    doDont: { dos: ["Animate the selected-segment fill sliding between positions rather than crossfading."], donts: ["Use this for passive, time-driven progress — that's Stories Progress, a different component despite the shared shape."] },
    notes: ["The active segment is an --ig-elevated-bg highlight inset inside the --ig-secondary-bg track, keeping selected state as a background relationship rather than a new colour."],
    crossRef: { label: "Stories Progress", href: "/components/stories-progress" },
  },
  {
    title: "Sliders",
    slug: "sliders",
    category: "Selection And Input",
    description: "A thin track with a circular thumb sized to the toggle's exact proportions — the continuous-value counterpart to the Toggle's binary one.",
    evidence: "inferred",
    findings: ["The Toggle's thumb — the system's confirmed circular drag handle — is fully specified (28px, 14px radius, layered shadow) and transfers directly to continuous value control."],
    rationale:
      "A slider is a toggle whose track is continuous instead of binary, so its thumb keeps the exact dimensions already proven on Toggles rather than introducing a second handle size. The filled portion of the track uses the same primary-button blue used everywhere else a control communicates 'this much is active.'",
    usage: { useWhen: "Setting a continuous or near-continuous value with immediate visual feedback — playback scrubbing, a volume level.", avoidWhen: "The value has only a few discrete steps (use Steppers) or the choice is categorical, not numeric (use Segmented Controls)." },
    anatomy: ["Track (full width)", "Filled portion (value indicator)", "Thumb (drag handle)", "Value label (optional, shown while dragging)"],
    spec: [
      { label: "Track height", value: "4px, centered vertically in a 28px tap target" },
      { label: "Track fill (inactive)", value: "rgb(var(--ig-secondary-bg))" },
      { label: "Track fill (active/value)", value: "rgb(var(--ig-primary-button))" },
      { label: "Thumb", value: "28px diameter, 14px radius — identical to the Toggle thumb" },
      { label: "Thumb shadow", value: "0 3px 8px rgba(0,0,0,.15), matching the Toggle thumb exactly" },
      { label: "Motion", value: "Thumb position tracks the pointer 1:1 while dragging; on release, settles with Ease Glide if snapping to a step" },
    ],
    states: [
      { name: "Default", description: "Thumb at current value position, track filled up to that point." },
      { name: "Dragging", description: "Thumb scales to 1.1× and shows a value label above it." },
      { name: "Disabled", description: "Opacity .3, matching the Toggle's disabled treatment exactly." },
    ],
    accessibility: ["Implement as role=\"slider\" with aria-valuemin/max/now, and support arrow-key increments of one step per press."],
    doDont: { dos: ["Size the thumb at 28px/14px-radius to match Toggles — the system has exactly one circular-handle size, not a per-control one."], donts: ["Disable by recolouring the track — disable by dropping opacity to .3, matching Toggles."] },
    notes: ["The 28px thumb is the Toggle thumb reused for continuous value control, preserving the system's single circular handle size."],
  },
  {
    title: "Steppers",
    slug: "steppers",
    category: "Selection And Input",
    description: "A three-part minus/value/plus row built at the same 36px height as every other compact control, with the value field reusing Text Field anatomy.",
    evidence: "inferred",
    findings: ["Every part of the stepper composition is confirmed: the 36px control height shared by Text Fields and Tertiary Buttons, and the tertiary button's border/radius treatment for the two tap targets."],
    rationale:
      "A stepper is two tertiary icon-buttons flanking a Text Field — there's no need for new anatomy because incrementing and decrementing are already button actions, and the value display is already a field. Keeping all three parts at the same 36px height is what makes the row read as one control instead of three.",
    usage: { useWhen: "Adjusting a small numeric value in fixed increments — quantity, a count with a small bounded range.", avoidWhen: "The range is large or continuous (use Sliders) or the value can be typed directly without needing increment buttons." },
    anatomy: ["Minus button (tertiary, 36×36px)", "Value field (Text Field anatomy, center-aligned)", "Plus button (tertiary, 36×36px)"],
    spec: [
      { label: "Control height", value: "36px throughout, matching Text Fields and Tertiary Buttons" },
      { label: "Button width", value: "36px (square), tertiary button styling" },
      { label: "Value field", value: "Center-aligned text, system-16, numeric input mode" },
      { label: "Radius", value: "6px on the end buttons, square inner edges where they meet the field" },
    ],
    states: [
      { name: "Default", description: "Both buttons enabled, current value shown." },
      { name: "At minimum", description: "Minus button disabled at opacity .5." },
      { name: "At maximum", description: "Plus button disabled at opacity .5." },
    ],
    doDont: { dos: ["Keep the whole row at one consistent 36px height so it reads as a single control."], donts: ["Let the value field accept free text — constrain it to the same bounds the buttons respect."] },
    notes: ["The plus and minus controls are literally icon-only tertiary Buttons flanking a Text Field value segment."],
  },
  {
    title: "Text Fields",
    slug: "text-fields",
    category: "Selection And Input",
    description: "A compact 36px input with a paired light/dark border token and a floating label pattern.",
    evidence: "documented",
    findings: ["._aa48{height:36px;display:flex;flex:1 0 0;min-width:0} is the field container.", "--ig-text-input-border-prism (219,223,228 / 43,48,54) and its hover variant --ig-text-input-border-hover-prism are real, paired light/dark tokens.", "--input-border-radius:6px applies here as everywhere else inputs appear."],
    anatomy: ["36px field container", "Border (paired light/dark token)", "Label", "Value text"],
    guidance: ["Keep the field at exactly 36px tall — that's the confirmed height across the evidenced selector.", "Source the border colour from the prism token pair, which already handles the hover state distinctly from the resting state."],
    doDont: { dos: ["Use 6px radius, matching every other input-shaped control in the system."], donts: ["Introduce a taller default field height — 36px is the only evidenced size."] },
    usage: {
      useWhen: "Use for single-line text input: login, search-like inline entry, post caption controls, comment fields, and compact form values.",
      avoidWhen: "Avoid for multiline captions or long readable copy; use Text Views when content should expand beyond one line.",
    },
    spec: [
      { label: "Height", value: "36px" },
      { label: "Radius", value: "6px via --input-border-radius" },
      { label: "Border", value: "1px solid rgb(var(--ig-text-input-border-prism))" },
      { label: "Hover border", value: "rgb(var(--ig-text-input-border-hover-prism))" },
      { label: "Layout", value: "display:flex; flex:1 0 0; min-width:0" },
    ],
    states: [
      { name: "Default", description: "Empty field rests at 36px with the prism border token." },
      { name: "Hover", description: "Border darkens through --ig-text-input-border-hover-prism." },
      { name: "Focused", description: "Border remains darkened and the text cursor is visible inside the field." },
      { name: "Filled", description: "Value text occupies the field while the 36px container and label treatment remain stable." },
      { name: "Error", description: "Border switches to --ig-error while preserving the same radius and height." },
      { name: "Disabled", description: "Field opacity drops to .5 and input is unavailable." },
    ],
    notes: [
      "The field height and radius are exact captured values; do not round up for comfort.",
      "Hover and focus use the prism border pair rather than a new outline treatment.",
    ],
    code: `.text-field {\n  height: 36px;\n  border-radius: var(--input-border-radius); /* 6px */\n  border: 1px solid rgb(var(--ig-text-input-border-prism));\n}\n.text-field:hover { border-color: rgb(var(--ig-text-input-border-hover-prism)); }`,
    crossRef: { label: "Forms", href: "/components/forms" },
  },
  {
    title: "Toggles",
    slug: "toggles",
    category: "Selection And Input",
    description: "A 51×31 track with a 28px circular thumb that translates exactly 23px on check — one of the most precisely confirmed components in this whole manual.",
    evidence: "documented",
    findings: ["._9nq9{height:31px;width:51px} — the track, confirmed at the literal selector.", "._9nqb:before{height:28px;width:28px;border-radius:14px} — the thumb, with a layered shadow (0 3px 8px rgba(0,0,0,.15), two finer 1px shadows).", "Checked state: background-color:#2d88ff (also seen as #1877f2), thumb transform:translate(23px) — and 51 − 28 = 23, so the thumb travels exactly the remaining track width.", "Disabled state drops to opacity:.3, not a colour change."],
    anatomy: ["Track (51×31, 20px radius)", "Thumb (28×28, 14px radius)", "Checked fill colour", "Disabled opacity"],
    guidance: ["Use the exact 51×31 / 28×28 / translate(23px) numbers — they're confirmed, not estimated, and they're internally consistent (23 = 51 − 28).", "Disable by dropping opacity to .3, not by recolouring the track."],
    doDont: { dos: ["Reuse the confirmed dimensions verbatim rather than rounding to 50×30 or similar 'clean' numbers — the source isn't round."], donts: ["Animate the thumb with anything but transform: translate — no scale or colour-interpolation was found on the thumb itself."] },
    usage: {
      useWhen: "Use for a binary, immediately-applied setting such as notifications on/off, dark mode, or a feature flag.",
      avoidWhen: "Avoid when a choice needs confirmation, contains more than two values, or triggers navigation; use Buttons, Pickers, or Menus instead.",
    },
    spec: [
      { label: "Track", value: "51×31px with 20px radius" },
      { label: "Thumb", value: "28×28px with 14px radius" },
      { label: "Checked fill", value: "#2d88ff" },
      { label: "Checked transform", value: "translate(23px)" },
      { label: "Disabled", value: "opacity:.3" },
      { label: "Thumb shadow", value: "0 3px 8px rgba(0,0,0,.15) plus finer 1px shadows" },
    ],
    states: [
      { name: "Off", description: "Default state with neutral track and thumb at the start position." },
      { name: "On", description: "Checked state fills the track with #2d88ff and translates the thumb exactly 23px." },
      { name: "Disabled off", description: "Off toggle drops to .3 opacity and no longer accepts interaction." },
      { name: "Disabled on", description: "Checked toggle remains visually on but drops to .3 opacity." },
      { name: "Pressed", description: "A brief opacity or pressed feedback can appear while the thumb transform remains the only movement." },
    ],
    notes: [
      "The 23px checked travel is the track width minus thumb width, so the captured numbers are internally locked.",
      "Disable by opacity only; do not introduce disabled-specific track colours.",
    ],
    code: `.toggle__track { width: 51px; height: 31px; border-radius: 20px; background: #0000000d; border: .5px solid rgba(0,0,0,.1); transition: .5s ease; }\n.toggle__track[data-checked="true"] { background: #2d88ff; }\n.toggle__thumb { width: 28px; height: 28px; border-radius: 14px; box-shadow: 0 3px 8px rgba(0,0,0,.15); transition: .5s ease; }\n.toggle__track[data-checked="true"] .toggle__thumb { transform: translate(23px); }\n.toggle[disabled] { opacity: .3; }`,
  },
  {
    title: "Virtual Keyboards",
    slug: "virtual-keyboards",
    category: "Selection And Input",
    description: "A custom on-screen keyboard — Instagram's web client delegates text entry to the platform keyboard.",
    evidence: "none",
    reason: "Custom virtual keyboards are native app replacements for the system keyboard. Instagram's web control language stays at the field level and relies on platform text-entry surfaces.",
    anatomy: ["Full key grid", "Shift / backspace / return modifiers", "Predictive text bar"],
    spec: [
      { label: "Keyboard area (iPhone)", value: "402×390px — full alpha key grid (Apple iOS UI Kit reference file)" },
      { label: "Suggestions bar", value: "402×25px, full width, sits above the key grid" },
      { label: "Accessory toolbar", value: "402×48px — the row above the keyboard hosting Done/contextual actions" },
      { label: "Bottom control row", value: "402×78px — houses the globe/emoji toggle and dictation mic" },
      { label: "Number pad keys", value: "125×48px each, in a fixed grid" },
    ],
    usage: { useWhen: "Never — web products cannot replace or customise the platform keyboard. Design Text Fields, not keyboards.", avoidWhen: "Always. Rely on the OS keyboard for text input." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web CSS component system." }],
    doDont: { dos: ["Design text entry surfaces (Text Fields, Search Fields, Combo Boxes) — those are what this system documents."], donts: ["Attempt to render a custom on-screen keyboard in web UI — the platform keyboard handles all text entry."] },
    notes: ["Custom virtual keyboards require UIInputViewController (iOS) or InputMethodService (Android) — both are native app APIs unavailable in web browsers."],
    closestAnalog: { label: "Text Fields", href: "/components/forms" },
  },
  {
    title: "Activity Rings",
    slug: "activity-rings",
    category: "Status",
    description: "A watchOS fitness-ring indicator — outside Instagram's status-feedback model.",
    evidence: "none",
    reason: "Activity Rings are watchOS-specific fitness progress indicators. Instagram's bounded progress language is linear and content-timed, with Stories Progress as the canonical status pattern.",
    anatomy: ["Three concentric arcs (Move / Exercise / Stand)", "Animated fill to percentage", "Goal completion burst"],
    usage: { useWhen: "Never — Activity Rings are a watchOS HealthKit UI concept with no equivalent in Instagram's product vocabulary.", avoidWhen: "Always. For bounded progress, use Stories Progress (linear, segmented, content-timed)." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Express bounded progress with Stories Progress — segmented linear bars are Instagram's progress grammar."], donts: ["Render circular arc progress indicators in Instagram-styled UI."] },
    notes: ["Activity Rings are rendered by HealthKit's ActivityRingView (SwiftUI) — a watchOS/iOS framework unavailable on web or Android.", "Instagram's bounded progress pattern is always linear (Stories Progress), never radial."],
    closestAnalog: { label: "Stories Progress", href: "/components/stories-progress" },
  },
  {
    title: "Gauges",
    slug: "gauges",
    category: "Status",
    description: "A bounded-value dial or arc indicator — outside Instagram's linear progress grammar.",
    evidence: "none",
    reason: "Where Instagram shows bounded progress, the canonical pattern is the linear Stories progress bar: segmented, time-based, and tied to media playback rather than a dial or arc.",
    anatomy: ["Circular or arc track", "Fill indicator to value", "Numeric value label"],
    usage: { useWhen: "Never for Instagram-styled UI — the gauge's arc format doesn't align with the system's linear progress grammar.", avoidWhen: "Always. For bounded progress, use Stories Progress; for indeterminate status, a spinner or skeleton." },
    states: [{ name: "N/A", description: "Not implemented in Instagram's web or mobile surface." }],
    doDont: { dos: ["Use Stories Progress for bounded, time-gated progress. Use a spinner for indeterminate loading."], donts: ["Use a dial or arc gauge to show a percentage in Instagram UI — the language is linear, not radial."] },
    notes: ["SwiftUI's Gauge view (watchOS/iOS) is the platform source for this HIG category — it has no web equivalent.", "If a percentage must be shown, a numeric display with --ig-primary-text is clearer than a radial arc in this system's aesthetic."],
    closestAnalog: { label: "Stories Progress", href: "/components/stories-progress" },
  },
  {
    title: "Progress Indicators",
    slug: "progress-indicators",
    category: "Status",
    description: "This is the same component as Stories Progress, viewed under a different HIG category name — see that page for the full, real treatment.",
    evidence: "documented",
    findings: ["Story progress uses a transform: scaleX width-fill transition with linear timing, set per-instance to match the story's display duration — fully documented on Stories Progress."],
    anatomy: ["Segmented track", "Fill (transform: scaleX, linear timing)", "Per-segment duration"],
    spec: [
      { label: "Fill animation", value: "transform: scaleX(0→1) with linear timing — duration set per-instance to the story's display length" },
      { label: "Track", value: "See Stories Progress for the full confirmed spec" },
    ],
    usage: {
      useWhen: "Indicating time-bounded progress across a sequence of content pieces (stories, slides).",
      avoidWhen: "Showing a generic loading spinner or an indeterminate fetch state — use a different indicator for those.",
    },
    states: [
      { name: "Pending", description: "Segment fill is at scaleX(0) — not yet played." },
      { name: "Playing", description: "Segment fill animates from scaleX(0) to scaleX(1) over the story's duration." },
      { name: "Completed", description: "Segment fill is at scaleX(1) — fully filled." },
    ],
    doDont: {
      dos: ["Go to the Stories Progress page for the complete, evidence-backed implementation — all spec, tokens, and usage live there."],
      donts: ["Duplicate the spec here; this page is a cross-reference only."],
    },
    notes: ["'Progress Indicators' is the Apple HIG category name for what Instagram calls a Story progress bar. The canonical page in this manual is Stories Progress."],
    guidance: ["Don't duplicate content here — Stories Progress is the canonical page for this component."],
    crossRef: { label: "Stories Progress", href: "/components/stories-progress" },
  },
  {
    title: "Rating Indicators",
    slug: "rating-indicators",
    category: "Status",
    description: "Star or sentiment ratings — outside Instagram's engagement and status vocabulary.",
    evidence: "none",
    reason: "Instagram expresses feedback through likes, comments, saves, shares, and view counts. Star-rating or sentiment-score controls belong to a different product vocabulary.",
    anatomy: ["Row of star or heart icons", "Filled proportion = rating value", "Optional numeric label"],
    usage: { useWhen: "Never for standard Instagram surfaces. Star ratings suggest a commerce or review context, not a social surface.", avoidWhen: "Always for standard content feedback. If building a marketplace review feature, use the Icon system (filled/outline star, 20px)." },
    states: [
      { name: "Read-only", description: "Filled icons to the rated value; static, no interaction." },
      { name: "Interactive", description: "Tap or hover selects a star; filled style applies to selected and all icons below it." },
    ],
    doDont: { dos: ["Express engagement with likes (heart, filled/outline toggle), saves, and comment counts — Instagram's confirmed engagement vocabulary."], donts: ["Use star ratings for standard content feedback — they imply an App Store / commerce context, not a social surface."] },
    notes: ["Instagram's engagement icons (heart, bookmark, comment, share) are the binary-state rating system in this product vocabulary — filled = active state.", "If a star indicator is genuinely needed (Shop / marketplace feature), use the Icon system: 20px filled/outline stars in --ig-primary-icon with a 4px gap."],
  },
];

const COMPONENT_EXAMPLES = {
  "image-views": [
    {
      title: "Reel cover in a profile grid",
      context: "Profile media",
      composition:
        "A 4:5 creator portrait fills the frame with object-fit: cover; the username, view count, and Reels mark sit on a soft bottom scrim while the shimmer sweep holds the exact crop before the image resolves.",
      tokens: "4:5 ratio, object-fit: cover, --ig-gradient-to-transparent, --ig-secondary-bg shimmer",
    },
  ],
  "text-views": [
    {
      title: "Caption and comment preview",
      context: "Feed post",
      composition:
        "The author name stays on the primary line, the caption starts after it at system-14, and the 'View all 128 comments' label drops to secondary text without introducing a document-style reading scale.",
      tokens: "system-14 body, system-12 metadata, --ig-secondary-text, ellipsis truncation",
    },
  ],
  boxes: [
    {
      title: "Account privacy setting group",
      context: "Settings",
      composition:
        "Private account, Activity status, and Close Friends rows sit inside one bordered tonal container so the group reads as a related set without floating above the page like a modal.",
      tokens: "16px padding, 1px --ig-separator, --ig-secondary-bg, 8/12px radius",
    },
  ],
  collections: [
    {
      title: "Story highlight tray",
      context: "Profile header",
      composition:
        "Circular highlight covers scroll horizontally beneath the bio; touch viewports hide the scrollbar while desktop keeps native horizontal motion rather than pagination dots.",
      tokens: "overflow-x: scroll, hidden scrollbar, 8px item gap, avatar circle primitive",
    },
  ],
  "column-views": [
    {
      title: "Creator education split",
      context: "Brand page",
      composition:
        "A full-bleed chapter pairs a typography statement with a portrait mosaic; at mobile widths the image stack follows the copy in one column instead of squeezing both panes.",
      tokens: "50/50 or 5:9 columns, 14-unit grid, 100vh rhythm, 650–768px collapse",
    },
  ],
  "disclosure-controls": [
    {
      title: "Expandable caption detail",
      context: "Feed post",
      composition:
        "A 'More from @mikaelastudio' row reveals tagged collaborators and location details in place; the chevron flips 180 degrees while the full row remains the tap target.",
      tokens: "16px chevron, rotate(180deg), Ease Glide 250ms, row-level aria-expanded",
    },
  ],
  labels: [
    {
      title: "Professional dashboard metric label",
      context: "Creator insights",
      composition:
        "The number '24.8K' stays primary while 'Accounts reached · Last 7 days' sits below at system-12 in secondary text, keeping the statistic scannable without competing with the value.",
      tokens: "system-10/12 labels, --ig-secondary-text, --ig-tertiary-text",
    },
  ],
  "lists-and-tables": [
    {
      title: "Search result list",
      context: "Search",
      composition:
        "Rows for @julesframes, @noahshotit, and #streetportraits hold a fixed avatar well, two truncating text lines, and a trailing follow action inside the 375px result column.",
      tokens: "50px rows, 375px list width, --post-separator, ellipsis text",
    },
  ],
  lockups: [
    {
      title: "DM participant row",
      context: "Messaging",
      composition:
        "A round avatar, bold display name, muted last-message preview, and timestamp stay bound as one scannable row, with the subtitle truncating before the time is displaced.",
      tokens: "fixed leading well, system-14 title, --ig-secondary-text subtitle, 50px row logic",
    },
  ],
  "tab-views": [
    {
      title: "Typography tester tabs",
      context: "Brand tooling",
      composition:
        "Sans, Serif, and Mono swatches sit as equal peers; the active swatch fills with the Instagram gradient and swaps the specimen panel without adding an underline-tab variant.",
      tokens: "equal controls, brand gradient active fill, direct panel swap",
    },
  ],
  "context-menus": [
    {
      title: "Post overflow menu",
      context: "Feed actions",
      composition:
        "The three-dot trigger anchors a compact menu with Save, Share to, Copy link, and a dimmed 'Report' row when reporting is unavailable for the current account state.",
      tokens: ".uiContextualLayer anchoring, 3px radius, 1px rgba border, disabled opacity .55",
    },
  ],
  menus: [
    {
      title: "Comment action flyout",
      context: "Comments",
      composition:
        "A long-press or overflow trigger reveals Reply, Pin, Restrict, and Delete; the flyout appears from the toggled ancestor state rather than running a bespoke reveal animation.",
      tokens: ".openToggler display switch, .uiToggleFlyout, shared menu surface",
    },
  ],
  "activity-views": [
    {
      title: "Share reel destination sheet",
      context: "Share flow",
      composition:
        "Recent DM recipients, Add to story, Copy link, and Share to external apps appear as lockup rows inside the same slide-up sheet used by action choices.",
      tokens: "Action Sheet surface, 50px lockup rows, recent-first ordering, Ease Settle",
    },
  ],
  "pop-up-buttons": [
    {
      title: "Comment sort selector",
      context: "Comments",
      composition:
        "The tertiary button reads 'Newest first' after selection, opens a compact flyout, and writes the chosen sort order back into the trigger so current state remains visible.",
      tokens: "36px tertiary button, 6px radius, trailing chevron, Menus flyout",
    },
  ],
  "pull-down-buttons": [
    {
      title: "Profile more-actions trigger",
      context: "Profile",
      composition:
        "The fixed 'More' button opens Block, Restrict, Share profile, and About this account actions; its label never changes because each choice performs a command.",
      tokens: "Tertiary/icon button trigger, Menus anatomy, unchanged label",
    },
  ],
  "search-fields": [
    {
      title: "Explore search overlay",
      context: "Search",
      composition:
        "The 40px query field expands the overlay height on focus, while account, tag, and audio results remain capped to the 375px result column with fixed 50px rows.",
      tokens: "--search-box-height, --search-modal-height-expanded, --search-result-list-width",
    },
  ],
  sidebars: [
    {
      title: "Professional dashboard rail",
      context: "Desktop navigation",
      composition:
        "Insights, Content, Messages, and Settings appear as dense lockup rows; the active destination uses a persistent hover tint plus a leading brand accent and collapses behind a menu trigger on narrow screens.",
      tokens: "40–44px rows, --ig-hover-overlay-rgb, 2px accent, 1024px collapse",
    },
  ],
  "tab-bars": [
    {
      title: "Mobile primary navigation",
      context: "App shell",
      composition:
        "Home, Search, Reels, Activity, and Profile reserve bottom safe-area space with the same toolbar-height token used by scroll math throughout the production bundle.",
      tokens: "--revamp-nav-bottom-toolbar-height, safe-area calc(), current-page indicator",
    },
  ],
  "token-fields": [
    {
      title: "Tag people field",
      context: "Post composer",
      composition:
        "Accepted usernames become removable pills inline with the cursor, while suggestions below reuse lockup rows for avatar, display name, and username.",
      tokens: "36px minimum field, 999px chips, --ig-secondary-bg chip fill, Text Field border",
    },
  ],
  "action-sheets": [
    {
      title: "Story action choices",
      context: "Stories",
      composition:
        "Mute, Report, Hide story, and Copy link slide up as stacked touch targets over a full-height fixed surface, then dismiss along the same translateY path.",
      tokens: "position fixed, z-index 400, translateY(100%) to 0, Ease Settle ~500ms",
    },
  ],
  alerts: [
    {
      title: "Delete post confirmation",
      context: "Destructive decision",
      composition:
        "A centered surface asks 'Delete this post?' with one supporting sentence and Cancel/Delete actions; Delete uses the system error colour while focus stays trapped until a choice is made.",
      tokens: "--modal-backdrop-default, 12px modal radius, --ig-error action, alertdialog semantics",
    },
  ],
  "page-controls": [
    {
      title: "Carousel position dots",
      context: "Multi-image post",
      composition:
        "Five small dots below the media show which image in the post is active; the marker stays static because the user, not time, advances the sequence.",
      tokens: "circle primitive, 6px active dot, 4px inactive dots, --ig-secondary-text",
    },
  ],
  popovers: [
    {
      title: "Account preview popover",
      context: "Hover preview",
      composition:
        "Hovering @camila.city anchors a profile card with avatar, bio, mutual followers, and Follow action to the username instead of sending the user into a full profile page.",
      tokens: ".uiContextualLayer anchoring, bordered surface, 3px radius, shadow",
    },
  ],
  "scroll-views": [
    {
      title: "Horizontal filter chip scroller",
      context: "Explore filters",
      composition:
        "Photography, Food, Travel, and Reels chips move in a native horizontal scroll view; touch hides the scrollbar, while desktop can expose the legacy custom gripper.",
      tokens: "overflow-x auto, mobile hidden scrollbar, width transition gripper on desktop",
    },
  ],
  sheets: [
    {
      title: "Create menu sheet",
      context: "Composer",
      composition:
        "Post, Story, Reel, and Live choices slide up from the bottom using the same full-height mechanism as the brand menu, with rows composed from existing lockup anatomy.",
      tokens: "full-height fixed surface, translateY entrance, Ease Settle, lockup rows",
    },
  ],
  windows: [
    {
      title: "DM thread panel",
      context: "Desktop messaging",
      composition:
        "A centered messaging panel sits over the page using modal tokens; it reads as a constrained Instagram surface, not as an operating-system window with titlebar chrome.",
      tokens: "modal radius, backdrop tokens, no native window chrome, focused overlay surface",
    },
  ],
  "color-wells": [
    {
      title: "Close Friends colour preview",
      context: "Audience settings",
      composition:
        "A circular green well previews the Close Friends token beside the audience label, confirming a semantic colour choice rather than opening a freeform HSB picker.",
      tokens: "--ig-close-friends, 24–32px circle, avatar/icon-button primitive",
    },
  ],
  "combo-boxes": [
    {
      title: "Location search field",
      context: "Post composer",
      composition:
        "Typing 'Lisbon' in the 36px field filters a bounded list of place rows; highlighted matches use the same hover tint as other selectable rows.",
      tokens: "36px Text Field, 50px result rows, 375px cap precedent, hover overlay tint",
    },
  ],
  "digit-entry-views": [
    {
      title: "Two-factor login code",
      context: "Account security",
      composition:
        "Six equal cells accept a pasted SMS code as one logical field, auto-advance visually, and show one shared error message if the code expires.",
      tokens: "40x36px cells, 8px gaps, 6px radius, --ig-error error border",
    },
  ],
  "image-wells": [
    {
      title: "Profile photo picker",
      context: "Edit profile",
      composition:
        "An empty circular frame shows a neutral camera affordance; once a photo is chosen, the same Image View crop rules take over with replace and clear actions nearby.",
      tokens: "Image View ratio rules, --ig-secondary-bg empty fill, dashed --ig-separator border",
    },
  ],
  pickers: [
    {
      title: "Audience picker",
      context: "Composer privacy",
      composition:
        "Followers, Close Friends, and Subscribers appear in a sheet on touch and a flyout on pointer screens, with a check mark on the current audience.",
      tokens: "Action Sheet on touch, Menus flyout on pointer, selected check indicator",
    },
  ],
  "segmented-controls": [
    {
      title: "Inbox filter switcher",
      context: "Messaging",
      composition:
        "Primary, General, and Requests share one pill track; the selected segment slides between positions while unread counts stay inside each segment label.",
      tokens: "36px pill track, equal segments, selected fill, Ease Glide 200ms",
    },
  ],
  sliders: [
    {
      title: "Reel audio mix",
      context: "Reel editor",
      composition:
        "Original audio and music volume controls use a thin active track and the same 28px circular handle proven by Toggles, with a value label while dragging.",
      tokens: "4px track, --ig-primary-button active fill, 28px thumb, toggle shadow",
    },
  ],
  steppers: [
    {
      title: "Story countdown duration",
      context: "Story sticker",
      composition:
        "Minus and plus square buttons flank a centered numeric value for days remaining, disabling the minus button at the minimum rather than letting the value wrap.",
      tokens: "36px controls, tertiary buttons, center-aligned value field, disabled opacity .5",
    },
  ],
  "text-fields": [
    {
      title: "Edit profile name field",
      context: "Profile settings",
      composition:
        "Name, username, bio link, and pronouns fields keep the same 36px height and prism border token, with helper labels sitting outside the input rather than inside as placeholders.",
      tokens: "36px height, --ig-text-input-border-prism, --input-border-radius 6px",
    },
  ],
  toggles: [
    {
      title: "Hide like count setting",
      context: "Post settings",
      composition:
        "The setting row pairs a text lockup with the exact 51x31 switch; checking it moves the 28px thumb exactly 23px and disabling drops the whole control to .3 opacity.",
      tokens: "51x31 track, 28px thumb, translate(23px), disabled opacity .3",
    },
  ],
  "progress-indicators": [
    {
      title: "Story segment timer",
      context: "Stories",
      composition:
        "Each story in a sequence owns one pill segment; the active segment fills left-to-right over the story's real display duration while completed segments remain full.",
      tokens: "transform scaleX fill, linear timing, per-story animation-duration, pill segments",
    },
  ],
};

export const COMPONENT_GUIDES = EVIDENCED_GUIDES.map((raw) => {
  const keywords = [raw.title.toLowerCase(), raw.slug.replaceAll("-", " "), raw.category.toLowerCase(), "component", "instagram"];
  const examples = raw.evidence === "none" ? undefined : COMPONENT_EXAMPLES[raw.slug];
  return {
    ...raw,
    ...(examples ? { examples } : {}),
    href: `/components/${raw.slug}`,
    keywords,
  };
});

export function getComponentGuide(slug) {
  return COMPONENT_GUIDES.find((guide) => guide.slug === slug) || null;
}

export function getComponentGuidesByCategory() {
  const groups = {};
  for (const guide of COMPONENT_GUIDES) {
    groups[guide.category] = groups[guide.category] || [];
    groups[guide.category].push(guide);
  }
  return groups;
}

export const COMPONENT_NAV_ITEMS = COMPONENT_GUIDES.map((guide) => ({
  title: guide.title,
  href: guide.href,
  description: guide.description,
  keywords: guide.keywords,
}));
