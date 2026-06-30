"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./charts.module.css";

const points = [
  { label: "Mon", reach: 12400, engagement: 640, x: 8, y: 70 },
  { label: "Tue", reach: 18200, engagement: 830, x: 22, y: 52 },
  { label: "Wed", reach: 16100, engagement: 760, x: 36, y: 60 },
  { label: "Thu", reach: 24600, engagement: 1180, x: 50, y: 34 },
  { label: "Fri", reach: 21100, engagement: 960, x: 64, y: 43 },
  { label: "Sat", reach: 29200, engagement: 1420, x: 78, y: 22 },
  { label: "Sun", reach: 26800, engagement: 1310, x: 92, y: 28 },
];

function format(value) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

export function ChartTooltip({ point }) {
  const xPlacement = point.x > 72 ? "left" : "right";
  const yPlacement = point.y < 34 ? "below" : "above";

  return (
    <aside
      className={styles.tooltip}
      data-placement={`${yPlacement}-${xPlacement}`}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      aria-live="polite"
    >
      <strong>{point.label}</strong>
      <span>{format(point.reach)} reach</span>
      <span>{format(point.engagement)} engagements</span>
    </aside>
  );
}

export default function ChartInspector() {
  const [activeIndex, setActiveIndex] = useState(3);
  const plotRef = useRef(null);
  const scrubbingRef = useRef(false);
  const active = points[activeIndex];
  const linePath = useMemo(
    () => points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "),
    []
  );
  const areaPath = `${linePath} L ${points[points.length - 1].x} 88 L ${points[0].x} 88 Z`;

  function selectIndex(value) {
    const nextIndex = Math.max(0, Math.min(points.length - 1, Number(value)));
    setActiveIndex(nextIndex);
  }

  function selectNearestFromPointer(event) {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const nearest = points.reduce(
      (closestIndex, point, index) =>
        Math.abs(point.x - x) < Math.abs(points[closestIndex].x - x) ? index : closestIndex,
      0
    );

    selectIndex(nearest);
  }

  function handlePlotPointerDown(event) {
    scrubbingRef.current = true;
    plotRef.current?.setPointerCapture?.(event.pointerId);
    selectNearestFromPointer(event);
  }

  function handlePlotPointerMove(event) {
    if (!scrubbingRef.current || event.buttons === 0) return;
    selectNearestFromPointer(event);
  }

  function stopScrubbing(event) {
    scrubbingRef.current = false;
    if (plotRef.current?.hasPointerCapture?.(event.pointerId)) {
      plotRef.current.releasePointerCapture(event.pointerId);
    }
  }

  function handleScrubberKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      selectIndex(activeIndex + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      selectIndex(activeIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectIndex(points.length - 1);
    }
  }

  return (
    <div className={styles.inspector}>
      <div className={styles.inspectorHeader}>
        <div>
          <p>Story interactions</p>
          <span id="story-chart-live-value" aria-live="polite">
            {active.label}: {format(active.reach)} reach, {format(active.engagement)} engagements
          </span>
        </div>
        <output aria-label={`Selected engagement value ${format(active.engagement)}`}>{format(active.engagement)}</output>
      </div>

      <div
        ref={plotRef}
        className={styles.inspectPlot}
        role="group"
        aria-label="Interactive story interactions chart. Highest engagement is Saturday with 1.4K engagements."
        aria-describedby="story-chart-live-value"
        onPointerDown={handlePlotPointerDown}
        onPointerMove={handlePlotPointerMove}
        onPointerUp={stopScrubbing}
        onPointerCancel={stopScrubbing}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="inspect-area" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd600" stopOpacity="0.28" />
              <stop offset="48%" stopColor="#ff0169" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#7638fa" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="inspect-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="42%" stopColor="#ff0169" />
              <stop offset="100%" stopColor="#7638fa" />
            </linearGradient>
          </defs>
          {[22, 44, 66, 88].map((y) => (
            <line key={y} x1="6" x2="94" y1={y} y2={y} className={styles.inspectGridLine} />
          ))}
          <path d={areaPath} fill="url(#inspect-area)" />
          <path d={linePath} className={styles.inspectLine} />
        </svg>

        {points.map((point, index) => (
          <button
            key={point.label}
            type="button"
            className={styles.inspectPoint}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            data-active={index === activeIndex}
            aria-label={`${point.label}: ${format(point.reach)} reach and ${format(point.engagement)} engagements`}
            aria-pressed={index === activeIndex}
            onPointerEnter={() => selectIndex(index)}
            onClick={() => selectIndex(index)}
            onFocus={() => selectIndex(index)}
          />
        ))}
        <ChartTooltip point={active} />
      </div>

      <label className={styles.scrubber}>
        <span>Scrub daily values</span>
        <input
          type="range"
          min="0"
          max={points.length - 1}
          step="1"
          value={activeIndex}
          onInput={(event) => selectIndex(event.currentTarget.value)}
          onChange={(event) => selectIndex(event.currentTarget.value)}
          onKeyDown={handleScrubberKeyDown}
          aria-label="Scrub through story interaction values"
        />
      </label>
    </div>
  );
}
