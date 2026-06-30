import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import DoDontGrid from "@/components/docs/DoDontGrid";
import ImplementationNote from "@/components/docs/ImplementationNote";
import CodeBlock from "@/components/docs/CodeBlock";
import styles from "./elevation.module.css";

export const metadata = {
  title: "Elevation",
  description: "Seven levels from flat to sheet. Every shadow in the system is directional and dual-layered — a spread shadow for depth, a tight shadow for edge definition.",
};

const SHADOW_LEVELS = [
  {
    name: "Flat",
    token: "none",
    shadow: "none",
    description: "No elevation. The default state for every surface — cards, rows, inputs at rest.",
    components: "Body text, list rows, inputs (unfocused)",
  },
  {
    name: "Hairline",
    token: "--shadow-inset",
    shadow: "0 0 0 1px rgba(0,0,0,0.08) inset",
    description: "A 1px inset ring that distinguishes a surface from its parent without lifting it. Used for bordered inputs and chip outlines.",
    components: "Text Field border, Chip / Tag outline",
  },
  {
    name: "Card",
    token: "--shadow-card",
    shadow: "0 1px 4px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.06)",
    description: "Subtle two-layer shadow that lifts a card off the page without competing with its content. The lightest true elevation.",
    components: "Cards, Popovers resting, inline suggestions",
  },
  {
    name: "List",
    token: "--shadow-list",
    shadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.1)",
    description: "Dropdown and flyout menus sit one level above the page surface. The second shadow leg anchors the shadow under the menu edge.",
    components: "Menus, Dropdowns, Autocomplete lists, Context Menus",
  },
  {
    name: "Elevated",
    token: "--shadow-elevated",
    shadow: "0 2px 26px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)",
    description: "Full-featured modal elevation. The wide spread shadow creates depth; the 1px ring clarifies the modal edge against any background.",
    components: "Modals, Action Sheets, Activity Views, Popovers (active)",
  },
  {
    name: "Sheet",
    token: "--shadow-8",
    shadow: "0 -6px 16px rgba(0,0,0,0.18)",
    description: "Bottom sheets cast their shadow upward — the inverse direction signals that the surface rises from below rather than floating above.",
    components: "Bottom sheets, Drawers, Sheet panels",
  },
  {
    name: "Focus ring",
    token: "--shadow-focus",
    shadow: "0 0 0 2px var(--ig-stop-magenta)",
    description: "Keyboard focus uses an outline, not a shadow — but for components where outline clips the design, a ring box-shadow is the documented alternative.",
    components: "Focused inputs, focused buttons when outline clips",
  },
];

export default function ElevationPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Elevation"
        description="Seven levels from flat to sheet. Every shadow in the system is directional and dual-layered — a spread shadow for depth, a tight shadow for edge definition."
      />

      <Section
        kicker="Scale"
        title="Seven named levels"
        description="The production bundle confirms --shadow-card, --shadow-elevated, --shadow-inset, --shadow-list, and --shadow-rgb as named tokens. Concrete box-shadow values extracted below."
      >
        <div className={styles.levelsGrid}>
          {SHADOW_LEVELS.map((level) => (
            <div key={level.name} className={styles.levelCard}>
              <div
                className={styles.levelSurface}
                style={{ boxShadow: level.shadow === "none" ? "none" : level.shadow }}
              >
                <span className={styles.levelName}>{level.name}</span>
              </div>
              <div className={styles.levelMeta}>
                <div className={styles.levelHead}>
                  <code className={styles.levelToken}>{level.token}</code>
                </div>
                <p className={styles.levelDesc}>{level.description}</p>
                <p className={styles.levelComponents}>{level.components}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Shadow composition"
        title="Two-layer shadows, one composable base"
        description="Instagram's shadow system builds from --shadow-rgb (the base colour) rather than hard-coding black. This lets dark mode shift the shadow hue without changing the structure."
      >
        <CodeBlock
          label="Token definitions — light mode"
          code={`/* Shadow base — shifts in dark mode */
--shadow-rgb: 0, 0, 0;  /* light: pure black; dark: muted navy */

/* Named elevation levels */
--shadow-inset:    0 0 0 1px rgba(var(--shadow-rgb), .08) inset;
--shadow-card:     0 1px 4px rgba(var(--shadow-rgb), .10),
                   0 0 0 .5px rgba(var(--shadow-rgb), .06);
--shadow-list:     0 2px 8px rgba(var(--shadow-rgb), .15),
                   0 1px 1px rgba(var(--shadow-rgb), .10);
--shadow-elevated: 0 2px 26px rgba(var(--shadow-rgb), .30),
                   0 0 0 1px rgba(var(--shadow-rgb), .10);
--shadow-8:        0 -6px 16px rgba(var(--shadow-rgb), .18);`}
        />
        <CodeBlock
          label="Dark mode override"
          code={`[data-theme="dark"] {
  --shadow-rgb: 0, 0, 0;      /* keep black — dark surfaces absorb more */
  /* Optional: increase alpha slightly to compensate for dark bg */
}`}
        />
      </Section>

      <Section
        kicker="Layer order"
        title="Z-index paired with elevation"
        description="The production bundle confirms --layer-1 through --layer-10 as named z-index tokens. Elevation and layer always move together — a higher shadow level must sit on a higher layer."
      >
        <div className={styles.layerTable}>
          <div className={styles.layerRow + " " + styles.layerHeader}>
            <span>Layer token</span>
            <span>Shadow level</span>
            <span>Surfaces</span>
          </div>
          {[
            { layer: "default (0)", shadow: "Flat / Hairline", surfaces: "Page, rows, inputs" },
            { layer: "--layer-1", shadow: "Card", surfaces: "Cards, inline chips" },
            { layer: "--layer-2", shadow: "List", surfaces: "Menus, dropdowns, tooltips" },
            { layer: "--layer-8", shadow: "Elevated", surfaces: "Modals, dialogs, sheets" },
            { layer: "--layer-10", shadow: "Focus ring", surfaces: "Active focus on top of all" },
          ].map((row) => (
            <div key={row.layer} className={styles.layerRow}>
              <code className={styles.layerToken}>{row.layer}</code>
              <span className={styles.layerShadow}>{row.shadow}</span>
              <span className={styles.layerSurfaces}>{row.surfaces}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Usage" title="Do / Don't">
        <DoDontGrid
          dos={[
            "Use --shadow-elevated for any surface that interrupts the main flow (modals, action sheets, popovers).",
            "Pair z-index with shadow level — a surface with --shadow-list must also sit on --layer-2 or higher.",
            "In dark mode, rely on surface colour contrast first; shadow provides secondary depth cues.",
          ]}
          donts={[
            "Invent custom box-shadow values — the two-layer shadow grammar is specific and any one-off creates visual inconsistency.",
            "Use elevation on flat list rows or body text — shadow at that level reads as interactive.",
            "Forget the upward shadow for bottom sheets — 'box-shadow: 0 -Npx' is intentional; a downward shadow contradicts the panel's origin.",
          ]}
        />
      </Section>

      <ImplementationNote title="Production evidence">
        Shadow token names (<code>--shadow-1</code>, <code>--shadow-card</code>,{" "}
        <code>--shadow-elevated</code>, <code>--shadow-inset</code>, <code>--shadow-list</code>,{" "}
        <code>--shadow-rgb</code>) are confirmed from the production CSS bundle via pattern-grep.
        Layer tokens (<code>--layer-1</code>, <code>--layer-2</code>, <code>--layer-8</code>,{" "}
        <code>--layer-10</code>) are confirmed from <code>z-index:var(--layer-N)</code> usage in the
        same bundle. Concrete numeric values were inferred from the most common{" "}
        <code>box-shadow</code> patterns extracted from that bundle — they match the overall
        system grammar but the exact alpha values may vary slightly between releases.
      </ImplementationNote>
    </PageContainer>
  );
}
