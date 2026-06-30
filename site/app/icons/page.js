import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./icons.module.css";

export const metadata = { title: "Icons" };

const SIZES = [
  {
    px: 16,
    token: "--icon-size-sm",
    name: "Small",
    touchTarget: "44px wrapper required",
    use: "Inline with body text, metadata rows, badge counts",
    contexts: ["Notification count badge", "Metadata row (views, likes)", "Inline tooltip/help"],
  },
  {
    px: 20,
    token: "--icon-size-md",
    name: "Medium",
    touchTarget: "44px wrapper recommended",
    use: "Navigation, action buttons, companion to system-16 text",
    contexts: ["Nav bar icon", "Tab bar icon", "Action row leading icon"],
  },
  {
    px: 24,
    token: "--icon-size-lg",
    name: "Large",
    touchTarget: "Self-contained at 44px min button",
    use: "Primary action buttons, Stories ring, standalone action surface",
    contexts: ["Primary CTA (Post, Send, Comment)", "Stories ring play/pause", "Media playback controls"],
  },
  {
    px: 32,
    token: "--icon-size-xl",
    name: "XL",
    touchTarget: "44px minimum if interactive",
    use: "Hero moments, empty states, onboarding illustrations",
    contexts: ["Empty state illustration", "Onboarding step icon", "Feature callout"],
  },
];

const STYLE_VARIANTS = [
  {
    name: "Filled",
    when: "Selected state, primary/active affordance, brand moments",
    example: "A filled heart = liked. A filled bookmark = saved. Active tab icon = filled.",
    rule: "Filled icons carry semantic weight — use them only to communicate active or selected state, never decoratively.",
  },
  {
    name: "Outline",
    when: "Default/resting state, inactive, secondary affordance",
    example: "An outline heart = not yet liked. An outline bookmark = unsaved. Inactive tab = outline.",
    rule: "Outline is the default register. Every filled icon should have a matching outline counterpart for the resting state.",
  },
];

const COLOR_TOKENS = [
  { token: "--ig-primary-icon",   role: "Default icon on primary background", context: "Most nav and action icons" },
  { token: "--ig-secondary-icon", role: "Subdued icon, metadata, timestamps", context: "Secondary action rows, helper icons" },
  { token: "--ig-always-white",   role: "Icon on dark fill (gradient, photo)", context: "Overlays, Stories ring controls, camera UI" },
  { token: "--ig-error",          role: "Destructive action icon", context: "Delete, block, report" },
  { token: "--ig-primary-button", role: "CTA icon (Send, Follow)", context: "Blue send arrow, follow affordance" },
];

// Icon paths (24×24 viewBox). outlinePaths: stroke-rendered. filledPaths: fill-rendered.
const ICON_VOCAB = [
  {
    name: "Like / Heart",
    sfSymbol: "heart",
    sfFilled: "heart.fill",
    material: "favorite_border / favorite",
    where: "Feed, Reels, Stories, Comments",
    outlinePaths: [
      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    ],
    filledPaths: [
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    ],
  },
  {
    name: "Comment",
    sfSymbol: "message",
    sfFilled: "message.fill",
    material: "chat_bubble_outline / chat_bubble",
    where: "Feed, Reels, Comments action row",
    outlinePaths: [
      "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    ],
    filledPaths: [
      "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
    ],
  },
  {
    name: "Share / Send",
    sfSymbol: "paperplane",
    sfFilled: "paperplane.fill",
    material: "send",
    where: "Feed actions, DM send button",
    outlinePaths: [
      "M22 2L11 13",
      "M22 2l-7 20-4-9-9-4 20-7z",
    ],
    filledPaths: [
      "M2 21l21-9L2 3v7l15 2-15 2z",
    ],
  },
  {
    name: "Save / Bookmark",
    sfSymbol: "bookmark",
    sfFilled: "bookmark.fill",
    material: "bookmark_border / bookmark",
    where: "Feed post actions, Collections",
    outlinePaths: [
      "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
    ],
    filledPaths: [
      "M17 3H7c-1.1 0-2 .9-2 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z",
    ],
  },
  {
    name: "Home / Feed",
    sfSymbol: "house",
    sfFilled: "house.fill",
    material: "home",
    where: "Tab Bar — primary navigation",
    outlinePaths: [
      "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      "M9 22V12h6v10",
    ],
    filledPaths: [
      "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    ],
  },
  {
    name: "Profile",
    sfSymbol: "person",
    sfFilled: "person.fill",
    material: "person_outline / person",
    where: "Tab Bar, Profile pages",
    outlinePaths: [
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
      "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    ],
    filledPaths: [
      "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    ],
  },
  {
    name: "Notifications / Bell",
    sfSymbol: "bell",
    sfFilled: "bell.fill",
    material: "notifications_none / notifications",
    where: "Activity feed, navigation",
    outlinePaths: [
      "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
      "M13.73 21a2 2 0 0 1-3.46 0",
    ],
    filledPaths: [
      "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
    ],
  },
  {
    name: "Camera",
    sfSymbol: "camera",
    sfFilled: "camera.fill",
    material: "camera_alt",
    where: "Stories creation, profile photo",
    outlinePaths: [
      "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
      "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    ],
    filledPaths: [
      "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10-12h-4l-2-3H8L6 5H2C.9 5 0 5.9 0 7v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z",
    ],
  },
];

// Comprehensive SF Symbol ↔ Material mapping for common Instagram icon semantics
const SF_MAPPING = [
  { semantic: "Like / Heart",       sfOutline: "heart",             sfFilled: "heart.fill",            materialOutline: "favorite_border",   materialFilled: "favorite" },
  { semantic: "Comment",            sfOutline: "message",           sfFilled: "message.fill",           materialOutline: "chat_bubble_outline", materialFilled: "chat_bubble" },
  { semantic: "Share / Send",       sfOutline: "paperplane",        sfFilled: "paperplane.fill",        materialOutline: "send",              materialFilled: "send" },
  { semantic: "Save / Bookmark",    sfOutline: "bookmark",          sfFilled: "bookmark.fill",          materialOutline: "bookmark_border",   materialFilled: "bookmark" },
  { semantic: "Home / Feed",        sfOutline: "house",             sfFilled: "house.fill",             materialOutline: "home",              materialFilled: "home" },
  { semantic: "Search / Explore",   sfOutline: "magnifyingglass",   sfFilled: "magnifyingglass",        materialOutline: "search",            materialFilled: "search" },
  { semantic: "Profile / Person",   sfOutline: "person",            sfFilled: "person.fill",            materialOutline: "person_outline",    materialFilled: "person" },
  { semantic: "Notifications",      sfOutline: "bell",              sfFilled: "bell.fill",              materialOutline: "notifications_none", materialFilled: "notifications" },
  { semantic: "DM / Messages",      sfOutline: "paperplane",        sfFilled: "paperplane.fill",        materialOutline: "send",              materialFilled: "send" },
  { semantic: "New Post / Add",     sfOutline: "plus",              sfFilled: "plus.app.fill",          materialOutline: "add",               materialFilled: "add_box" },
  { semantic: "Reels / Video",      sfOutline: "play.rectangle",    sfFilled: "play.rectangle.fill",    materialOutline: "play_circle_outline", materialFilled: "play_circle" },
  { semantic: "Camera",             sfOutline: "camera",            sfFilled: "camera.fill",            materialOutline: "camera_alt",        materialFilled: "camera_alt" },
  { semantic: "Settings / Gear",    sfOutline: "gearshape",         sfFilled: "gearshape.fill",         materialOutline: "settings",          materialFilled: "settings" },
  { semantic: "More / Options",     sfOutline: "ellipsis",          sfFilled: "ellipsis.circle.fill",   materialOutline: "more_horiz",        materialFilled: "more_horiz" },
  { semantic: "Close / Dismiss",    sfOutline: "xmark",             sfFilled: "xmark.circle.fill",      materialOutline: "close",             materialFilled: "cancel" },
  { semantic: "Back",               sfOutline: "chevron.left",      sfFilled: "chevron.left",           materialOutline: "arrow_back",        materialFilled: "arrow_back" },
  { semantic: "Mute / Volume off",  sfOutline: "speaker.slash",     sfFilled: "speaker.slash.fill",     materialOutline: "volume_off",        materialFilled: "volume_off" },
  { semantic: "Following / Check",  sfOutline: "person.badge.checkmark", sfFilled: "person.badge.checkmark.fill", materialOutline: "person_add_disabled", materialFilled: "how_to_reg" },
  { semantic: "Close Friends",      sfOutline: "person.2",          sfFilled: "person.2.fill",          materialOutline: "group_outline",     materialFilled: "group" },
  { semantic: "Play",               sfOutline: "play",              sfFilled: "play.fill",              materialOutline: "play_arrow",        materialFilled: "play_arrow" },
];

function OutlineIcon({ paths, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function FilledIcon({ paths, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function IconsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Icons"
        description="Instagram uses a custom icon set — no public icon library matches the production vocabulary. This page documents the size scale, filled/outline grammar, colour system, touch target requirements, and the SF Symbol / Material equivalents for each semantic icon."
      />

      <Section
        kicker="Size scale"
        title="Four sizes, one 4px grid"
        description="Every icon size is divisible by 4 — the same base unit as the spacing scale. The 20px default aligns with system-16 text line-height; the 24px size aligns with system-18 and primary actions."
      >
        <div className={styles.sizeGrid}>
          {SIZES.map((s) => (
            <div key={s.px} className={styles.sizeCard}>
              <div className={styles.sizeDemo}>
                <div className={styles.sizeIcon} style={{ width: s.px, height: s.px }}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={s.px} height={s.px}>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="rgb(var(--ig-stop-magenta))"
                    />
                  </svg>
                </div>
                <span className={styles.sizePx}>{s.px}px</span>
              </div>
              <div className={styles.sizeMeta}>
                <p className={styles.sizeName}>{s.name}</p>
                <code className={styles.sizeToken}>{s.token}</code>
                <p className={styles.sizeUse}>{s.use}</p>
                <p className={styles.sizeTouchTarget}>{s.touchTarget}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Style grammar"
        title="Filled and outline carry meaning"
        description="Instagram icons are binary: filled communicates active/selected; outline communicates resting/unselected. This isn't decoration — it's the system's primary state-change signal for toggleable affordances."
      >
        <div className={styles.styleGrid}>
          {STYLE_VARIANTS.map((v) => (
            <div key={v.name} className={styles.styleCard}>
              <div className={styles.styleIconRow}>
                <div className={styles.styleIconPair}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={v.name === "Filled" ? "rgb(var(--ig-stop-rose))" : "none"}
                      stroke={v.name === "Outline" ? "rgb(var(--ig-primary-icon))" : "none"}
                      strokeWidth={v.name === "Outline" ? "1.5" : "0"}
                    />
                  </svg>
                  <span className={styles.styleVariantName}>{v.name}</span>
                </div>
              </div>
              <div className={styles.styleMeta}>
                <p className={styles.styleWhen}><strong>Use when: </strong>{v.when}</p>
                <p className={styles.styleExample}><em>{v.example}</em></p>
                <p className={styles.styleRule}>{v.rule}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Icon vocabulary"
        title="Common icon pairs with platform equivalents"
        description="Instagram's icon set follows the same semantic grammar as SF Symbols (iOS) and Material Symbols (Android). Each icon below shows outline (resting) and filled (active) at 24px. SF Symbol and Material names are the nearest equivalents for native implementation."
      >
        <div className={styles.vocabGrid}>
          {ICON_VOCAB.map((icon) => (
            <div key={icon.name} className={styles.vocabCard}>
              <div className={styles.vocabIconPair}>
                <div className={styles.vocabIconSlot}>
                  <div className={styles.vocabIconWrap} style={{ color: "rgb(var(--ig-primary-icon))" }}>
                    <OutlineIcon paths={icon.outlinePaths} size={24} />
                  </div>
                  <span className={styles.vocabIconLabel}>Outline</span>
                </div>
                <div className={styles.vocabIconSlot}>
                  <div className={styles.vocabIconWrap} style={{ color: "rgb(var(--ig-primary-icon))" }}>
                    <FilledIcon paths={icon.filledPaths} size={24} />
                  </div>
                  <span className={styles.vocabIconLabel}>Filled</span>
                </div>
              </div>
              <p className={styles.vocabCardName}>{icon.name}</p>
              <div className={styles.vocabCardSymbols}>
                <span className={styles.vocabSymbolLabel}>SF</span>
                <code className={styles.vocabSymbolCode}>{icon.sfSymbol}</code>
              </div>
              <div className={styles.vocabCardSymbols}>
                <span className={styles.vocabSymbolLabel}>MD</span>
                <code className={styles.vocabSymbolCode}>{icon.material.split(" / ")[0]}</code>
              </div>
              <p className={styles.vocabWhere}>{icon.where}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Platform mapping"
        title="SF Symbol & Material Symbol reference"
        description="Use these names for native iOS and Android implementations. SF Symbols always come in outline and .fill variants matching this system's filled/outline grammar. Material Symbols use _outline and filled suffixes."
      >
        <div className={styles.mappingTable}>
          <div className={[styles.mappingRow, styles.mappingHeader].join(" ")}>
            <span>Instagram semantic</span>
            <span>SF Symbol (outline / filled)</span>
            <span>Material Symbol (outline / filled)</span>
          </div>
          {SF_MAPPING.map((row) => (
            <div key={row.semantic} className={styles.mappingRow}>
              <span className={styles.mappingSemantic}>{row.semantic}</span>
              <span className={styles.mappingCodes}>
                <code>{row.sfOutline}</code>
                {row.sfOutline !== row.sfFilled && <><span className={styles.mappingSep}>/</span><code>{row.sfFilled}</code></>}
              </span>
              <span className={styles.mappingCodes}>
                <code>{row.materialOutline}</code>
                {row.materialOutline !== row.materialFilled && <><span className={styles.mappingSep}>/</span><code>{row.materialFilled}</code></>}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Platform implementation"
        title="Native and web usage"
        description="Apply the icon grammar consistently across platforms. SF Symbols on iOS natively support filled/outline switching; Material Symbols provide the same via Icons.Filled / Icons.Outlined namespaces."
      >
        <div className={styles.implGrid}>
          <div className={styles.implCard}>
            <p className={styles.implPlatform}>iOS — SwiftUI + SF Symbols</p>
            <CodeBlock
              label="SwiftUI toggle state with SF Symbols"
              code={`// Outline (resting) ↔ Filled (active)
Button { isLiked.toggle() } label: {
  Image(systemName: isLiked ? "heart.fill" : "heart")
    .font(.system(size: 24))
    .foregroundStyle(isLiked ? Color.red : Color.primary)
}
.accessibilityLabel(isLiked ? "Unlike" : "Like")

// Use symbolRenderingMode for multi-colour icons
Image(systemName: "person.fill")
  .symbolRenderingMode(.hierarchical)
  .foregroundStyle(Color.primary)`}
            />
          </div>
          <div className={styles.implCard}>
            <p className={styles.implPlatform}>Android — Jetpack Compose</p>
            <CodeBlock
              label="Compose icon toggle with Material Symbols"
              code={`// Outline ↔ Filled via Icons namespace
Icon(
  imageVector = if (isLiked)
    Icons.Filled.Favorite
  else
    Icons.Outlined.FavoriteBorder,
  contentDescription = if (isLiked) "Unlike" else "Like",
  tint = if (isLiked)
    MaterialTheme.colorScheme.error
  else
    LocalContentColor.current,
  modifier = Modifier.size(24.dp)
)`}
            />
          </div>
        </div>
        <CodeBlock
          label="Web — CSS icon component with tokens"
          code={`.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--ig-primary-icon));
  flex-shrink: 0;
}
.icon--sm  { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md  { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg  { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--xl  { width: var(--icon-size-xl); height: var(--icon-size-xl); }
.icon--secondary { color: rgb(var(--ig-secondary-icon)); }
.icon--on-fill   { color: rgb(var(--ig-always-white)); }

/* SVG inside inherits currentColor — no fill attr needed */
.icon svg { width: 100%; height: 100%; }`}
        />
      </Section>

      <Section
        kicker="Colour"
        title="Semantic colour tokens for icons"
        description="Icons are coloured with semantic tokens, never hardcoded hex. The primary icon token adapts automatically between light and dark mode."
      >
        <div className={styles.colorTable}>
          <div className={styles.colorHeader}>
            <span>Token</span>
            <span>Role</span>
            <span>Contexts</span>
          </div>
          {COLOR_TOKENS.map((c) => (
            <div key={c.token} className={styles.colorRow}>
              <code className={styles.colorToken}>{c.token}</code>
              <span className={styles.colorRole}>{c.role}</span>
              <span className={styles.colorContexts}>{c.context}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Touch targets"
        title="44px minimum interactive area"
        description="Icons smaller than 44px must live inside a 44×44px interactive wrapper. The icon's visual size never changes; only the tap surface expands."
      >
        <div className={styles.touchDemos}>
          <div className={styles.touchDemo}>
            <div className={styles.touchTarget}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgb(var(--ig-stop-rose))" />
              </svg>
              <div className={styles.touchBorder} />
            </div>
            <p className={styles.touchLabel}>20px icon in 44px wrapper</p>
          </div>
          <div className={styles.touchDemo}>
            <div className={styles.touchTarget} style={{ width: 44, height: 44 }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgb(var(--ig-stop-rose))" />
              </svg>
              <div className={styles.touchBorder} />
            </div>
            <p className={styles.touchLabel}>24px icon self-contained in 44px button</p>
          </div>
        </div>
        <CodeBlock
          label="Touch target wrapper pattern"
          code={`.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  color: rgb(var(--ig-primary-icon));
}
/* The icon's visual size never changes — only the button grows */
.icon-button svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}`}
        />
      </Section>

      <Section
        kicker="Typography pairing"
        title="Icon weight matches text weight"
        description="When pairing an icon with text, choose the icon size whose stroke weight visually matches the text weight. Heavy text (--fw-bold/semibold) pairs with filled or heavier-stroke icons; light body text pairs with outline."
      >
        <div className={styles.pairingTable}>
          <div className={styles.pairingRow}>
            <div className={[styles.pairingCell, styles.pairingHeader].join(" ")}>Text size</div>
            <div className={[styles.pairingCell, styles.pairingHeader].join(" ")}>Line height</div>
            <div className={[styles.pairingCell, styles.pairingHeader].join(" ")}>Icon size</div>
            <div className={[styles.pairingCell, styles.pairingHeader].join(" ")}>Vertical align</div>
          </div>
          {[
            { text: "system-12", lh: "16px", icon: "16px", align: "middle" },
            { text: "system-14", lh: "18px", icon: "16px", align: "middle" },
            { text: "system-16", lh: "24px", icon: "20px", align: "middle" },
            { text: "system-18", lh: "24px", icon: "20–24px", align: "middle" },
            { text: "system-22+", lh: "26–32px", icon: "24px", align: "middle" },
          ].map((r) => (
            <div key={r.text} className={styles.pairingRow}>
              <code className={styles.pairingCell}>{r.text}</code>
              <span className={styles.pairingCell}>{r.lh}</span>
              <span className={styles.pairingCell}>{r.icon}</span>
              <span className={styles.pairingCell}>{r.align}</span>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use semantic colour tokens", body: "Colour icons with --ig-primary-icon or --ig-secondary-icon so they adapt to dark mode automatically." },
          { type: "do", title: "Pair filled ↔ outline for toggle states", body: "Every icon that represents a binary state (liked/not-liked) must have both a filled and an outline version." },
          { type: "do", title: "Wrap small icons in a 44px target", body: "16px and 20px icons must live inside a 44×44px interactive element — never expose a tiny tap target." },
          { type: "do", title: "Use SF Symbols on iOS", body: "Image(systemName:) with the .fill suffix mirrors this system's filled/outline grammar exactly — no custom assets needed for the standard vocabulary." },
          { type: "dont", title: "Don't use fill for decoration", body: "Filled icons signal 'selected' in Instagram's grammar. Using filled icons decoratively confuses the state-change signal." },
          { type: "dont", title: "Don't use arbitrary sizes", body: "Icon sizes must come from the four-step scale (16 / 20 / 24 / 32). In-between values (18px, 22px) are not part of the system." },
          { type: "dont", title: "Don't hardcode colour hex", body: "Icons coloured with a hardcoded hex won't adapt to dark mode and lose semantic meaning." },
          { type: "dont", title: "Don't mix icon libraries on one platform", body: "Pick one source per surface — SF Symbols on iOS, Material on Android, custom SVG on web. Mixing grammar systems breaks visual consistency." },
        ]}
      />

      <ImplementationNote title="Icon set availability">
        Instagram's icon set is proprietary and not publicly available. This page documents the
        size scale, colour grammar, and usage rules derived from component specs. The SF Symbol and
        Material Symbol names above are the closest semantic equivalents for native implementation.
        For web, reproduce icons from product screens or commission a matching custom set that
        follows the same filled/outline grammar and 4px size grid.
      </ImplementationNote>
    </PageContainer>
  );
}
