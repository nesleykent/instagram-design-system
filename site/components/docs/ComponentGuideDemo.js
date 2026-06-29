"use client";

import { useState } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconClose,
  IconMenu,
  IconSearch,
} from "../Icons";
import styles from "./ComponentGuideDemo.module.css";

const menuItems = ["Share", "Save", "Mute", "Report"];
const navItems = ["Home", "Explore", "Reels", "Profile"];
const tabs = ["Overview", "Details", "Source"];
const chips = ["Design", "Motion", "A11y"];

function DemoShell({ title, children, controls }) {
  return (
    <div className={styles.shell}>
      <div className={styles.demoHeader}>
        <div>
          <p>{title}</p>
          <span>Live, tokenized component demonstration</span>
        </div>
        {controls}
      </div>
      <div className={styles.stage}>{children}</div>
    </div>
  );
}

function ChartDemo() {
  const [selected, setSelected] = useState(2);
  const values = [42, 68, 84, 55, 73];
  return (
    <div className={styles.chart} role="img" aria-label="Five bar engagement chart">
      {values.map((value, index) => (
        <button
          key={value}
          type="button"
          style={{ "--value": `${value}%` }}
          data-selected={selected === index}
          onClick={() => setSelected(index)}
          aria-pressed={selected === index}
        >
          <span />
          <strong>{value}%</strong>
        </button>
      ))}
    </div>
  );
}

function MediaDemo({ kind }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.mediaGrid} data-kind={kind}>
      {[0, 1, 2].map((item) => (
        <button key={item} type="button" data-active={active === item} onClick={() => setActive(item)}>
          <span />
          <small>{item === 0 ? "Portrait" : item === 1 ? "Square" : "Wide"}</small>
        </button>
      ))}
    </div>
  );
}

function TextDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={styles.textView}>
      <p className={styles.kicker}>Instagram Sans UI</p>
      <h3>Compact hierarchy with readable rhythm</h3>
      <p data-expanded={expanded}>
        Text surfaces use system type, semantic text colour, and predictable truncation before they invite expansion.
        The expanded state keeps line length controlled and does not resize surrounding controls.
      </p>
      <button type="button" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Collapse" : "Expand"}
      </button>
    </article>
  );
}

function WebDemo() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.webView}>
      <div className={styles.browserBar}>
        <span />
        <code>instagram.com/brand</code>
      </div>
      <button type="button" onClick={() => setLoaded(true)} data-loaded={loaded}>
        {loaded ? "Preview loaded" : "Load preview"}
      </button>
      <div className={styles.webBody} data-loaded={loaded}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function LayoutDemo({ type }) {
  const [collapsed, setCollapsed] = useState(false);
  if (type === "disclosure" || type === "outline") {
    return (
      <div className={styles.disclosure}>
        <button type="button" onClick={() => setCollapsed((value) => !value)} aria-expanded={!collapsed}>
          <IconChevronDown size={16} />
          Source-backed section
        </button>
        {!collapsed && (
          <div>
            <p>Expanded content remains in flow, with compact typography and a visible border relationship.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.layoutDemo} data-type={type} data-collapsed={collapsed}>
      <button type="button" onClick={() => setCollapsed((value) => !value)}>
        {collapsed ? "Expand" : "Collapse"}
      </button>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function MenuDemo({ type }) {
  const [open, setOpen] = useState(type === "toolbar" || type === "button");
  const [selected, setSelected] = useState(0);
  if (type === "button") {
    return (
      <div className={styles.buttonSet}>
        <button data-variant="primary" type="button">
          Follow
        </button>
        <button data-variant="secondary" type="button">
          Following
        </button>
        <button data-variant="tertiary" type="button">
          Learn more
        </button>
      </div>
    );
  }

  return (
    <div className={styles.menuDemo} data-type={type}>
      <button className={styles.trigger} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {type === "toolbar" ? <IconMenu size={16} /> : "Actions"}
        <IconChevronDown size={14} />
      </button>
      {open && (
        <div className={styles.menuLayer} role="menu">
          {menuItems.map((item, index) => (
            <button
              key={item}
              type="button"
              role="menuitem"
              data-selected={selected === index}
              onClick={() => setSelected(index)}
            >
              {selected === index && <IconCheck size={14} />}
              <span>{item}</span>
              {item === "Report" && <small>!</small>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavDemo({ type }) {
  const [selected, setSelected] = useState(0);
  if (type === "search") {
    return (
      <div className={styles.searchDemo}>
        <label>
          <IconSearch size={16} />
          <input defaultValue="motion" aria-label="Search components" />
        </label>
        {["Motion", "Stories progress", "Clip reveal"].map((item, index) => (
          <button key={item} type="button" data-selected={selected === index} onClick={() => setSelected(index)}>
            <span />
            <strong>{item}</strong>
            <small>{index + 1} result</small>
          </button>
        ))}
      </div>
    );
  }

  if (type === "tokens") {
    return (
      <div className={styles.tokenDemo}>
        {chips.map((chip, index) => (
          <button key={chip} type="button" onClick={() => setSelected(index)} data-selected={selected === index}>
            {chip}
            <IconClose size={12} />
          </button>
        ))}
        <input aria-label="Add token" placeholder="Add token" />
      </div>
    );
  }

  return (
    <nav className={styles.navDemo} data-type={type} aria-label="Demo navigation">
      {navItems.map((item, index) => (
        <button key={item} type="button" data-selected={selected === index} onClick={() => setSelected(index)}>
          <span />
          {item}
        </button>
      ))}
    </nav>
  );
}

function PresentationDemo({ type }) {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  if (type === "pages") {
    return (
      <div className={styles.pageDots}>
        {[0, 1, 2, 3].map((item) => (
          <button key={item} type="button" data-active={page === item} onClick={() => setPage(item)} aria-label={`Page ${item + 1}`} />
        ))}
      </div>
    );
  }

  if (type === "scroll") {
    return (
      <div className={styles.scrollBox}>
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>Scrollable row {index + 1}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.presentationDemo} data-open={open} data-type={type}>
      <button type="button" className={styles.closeSurface} onClick={() => setOpen((value) => !value)}>
        {open ? "Dismiss" : "Open"}
      </button>
      {open && (
        <div className={styles.surface}>
          <h3>{type === "alert" ? "Discard changes?" : "Presentation surface"}</h3>
          <p>Focused content, clear action hierarchy, and a visible dismiss path.</p>
          <div>
            <button type="button">Cancel</button>
            <button type="button">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function InputDemo({ type }) {
  const [value, setValue] = useState(type === "slider" ? 64 : 1);
  const [selected, setSelected] = useState(0);
  const [on, setOn] = useState(true);

  if (type === "toggle") {
    return (
      <button className={styles.toggle} type="button" data-on={on} onClick={() => setOn((state) => !state)} aria-pressed={on}>
        <span />
      </button>
    );
  }

  if (type === "slider") {
    return (
      <label className={styles.slider}>
        <span>Intensity {value}%</span>
        <input type="range" min="0" max="100" value={value} onChange={(event) => setValue(event.target.value)} />
      </label>
    );
  }

  if (type === "stepper" || type === "digit") {
    return (
      <div className={styles.stepper}>
        <button type="button" onClick={() => setValue((current) => Math.max(0, Number(current) - 1))}>
          -
        </button>
        <strong>{String(value).padStart(type === "digit" ? 4 : 1, "0")}</strong>
        <button type="button" onClick={() => setValue((current) => Number(current) + 1)}>
          +
        </button>
      </div>
    );
  }

  if (type === "segmented" || type === "picker" || type === "color") {
    return (
      <div className={styles.segmented} data-type={type}>
        {["One", "Two", "Three"].map((item, index) => (
          <button key={item} type="button" data-selected={selected === index} onClick={() => setSelected(index)}>
            {type === "color" && <span style={{ "--swatch": index === 0 ? "#ff0169" : index === 1 ? "#d300c5" : "#7638fa" }} />}
            {item}
          </button>
        ))}
      </div>
    );
  }

  if (type === "keyboard") {
    return (
      <div className={styles.keyboard}>
        {"instagram".split("").map((key) => (
          <button key={key} type="button" onClick={() => setValue(key)}>
            {key}
          </button>
        ))}
        <strong>{value}</strong>
      </div>
    );
  }

  if (type === "imagewell") {
    return <MediaDemo kind="well" />;
  }

  return (
    <label className={styles.fieldDemo}>
      <span>{type === "combo" ? "Choose component" : "Label"}</span>
      <input defaultValue={type === "combo" ? "Search fields" : ""} placeholder="Value" />
    </label>
  );
}

function StatusDemo({ type }) {
  const [value, setValue] = useState(64);
  if (type === "ring") {
    return (
      <button type="button" className={styles.ring} onClick={() => setValue((current) => (current > 80 ? 28 : current + 18))}>
        <span />
        <strong>Syncing</strong>
      </button>
    );
  }

  if (type === "rating") {
    return (
      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((item) => (
          <button key={item} type="button" data-active={item <= Math.round(value / 20)} onClick={() => setValue(item * 20)}>
            *
          </button>
        ))}
      </div>
    );
  }

  return (
    <button type="button" className={styles.progressDemo} onClick={() => setValue((current) => (current > 90 ? 24 : current + 12))}>
      <span>
        <span style={{ width: `${value}%` }} />
      </span>
      <strong>{type === "gauge" ? `${value}/100` : `${value}% complete`}</strong>
    </button>
  );
}

export default function ComponentGuideDemo({ guide }) {
  const { type, family } = guide.demo;

  let demo;
  if (family === "chart") demo = <ChartDemo />;
  else if (family === "media") demo = <MediaDemo kind={type} />;
  else if (family === "text") demo = <TextDemo />;
  else if (family === "web") demo = <WebDemo />;
  else if (family === "layout") demo = <LayoutDemo type={type} />;
  else if (family === "menu") demo = <MenuDemo type={type} />;
  else if (family === "nav") demo = <NavDemo type={type} />;
  else if (family === "presentation") demo = <PresentationDemo type={type} />;
  else if (family === "input") demo = <InputDemo type={type} />;
  else demo = <StatusDemo type={type} />;

  return (
    <DemoShell
      title={guide.title}
      controls={
        <span className={styles.sourceBadge}>
          {guide.category}
          <IconArrowRight size={13} />
        </span>
      }
    >
      {demo}
    </DemoShell>
  );
}
