// A small, consistent set of interface icons authored for this site.
// Instagram's own icon glyphs are served from a private CDN inside the
// source CSS (rsrc.php URLs) and can't be reproduced here — these are the
// site's own functional icons, drawn in the geometric, single-stroke
// grammar documented on /shape, and used live throughout this interface.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ size = 20, children, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      {children}
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </Svg>
  );
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Svg>
  );
}

export function IconChevronRight(props) {
  return (
    <Svg {...props}>
      <polyline points="9 6 15 12 9 18" />
    </Svg>
  );
}

export function IconChevronDown(props) {
  return (
    <Svg {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </Svg>
  );
}

export function IconArrowLeft(props) {
  return (
    <Svg {...props}>
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="11 5 4 12 11 19" />
    </Svg>
  );
}

export function IconSun(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.6" y1="4.6" x2="6.3" y2="6.3" />
      <line x1="17.7" y1="17.7" x2="19.4" y2="19.4" />
      <line x1="4.6" y1="19.4" x2="6.3" y2="17.7" />
      <line x1="17.7" y1="6.3" x2="19.4" y2="4.6" />
    </Svg>
  );
}

export function IconMoon(props) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </Svg>
  );
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
    </Svg>
  );
}

export function IconCopy(props) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <polyline points="4 13 9 18 20 6" />
    </Svg>
  );
}

export function IconExternal(props) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Svg>
  );
}

export function IconGithub(props) {
  return (
    <Svg {...props} strokeWidth={0} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.57.11.78-.25.78-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5Z" />
    </Svg>
  );
}

export function IconCommand(props) {
  return (
    <Svg {...props}>
      <path d="M9 6.5A2.5 2.5 0 1 0 6.5 9H17.5A2.5 2.5 0 1 0 15 6.5" />
      <path d="M9 17.5A2.5 2.5 0 1 1 6.5 15H17.5A2.5 2.5 0 1 1 15 17.5" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="0" />
    </Svg>
  );
}

export function IconLayers(props) {
  return (
    <Svg {...props}>
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 13 12 18 21 13" />
      <polyline points="3 17.5 12 22.5 21 17.5" />
    </Svg>
  );
}
