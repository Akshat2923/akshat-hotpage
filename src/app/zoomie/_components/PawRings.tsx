import * as React from "react";
import { RING, RING_ORDER, type RingKey } from "../_lib/zoomie-data";

// The paw, traced to match SF Symbol `pawprint` — the shape the app's rings
// are actually drawn from. Four toes in an arc over one pad, all outline, no
// fill. Progress is not an arc sweep: the app renders this glyph twice and
// masks the coloured copy with a rising water line, so a ring at 60% is a paw
// filled six-tenths of the way up.

const ART_TOP = 28;
const ART_HEIGHT = 168;

function PawArt() {
  return (
    <>
      <ellipse cx="42" cy="94" rx="16" ry="22" transform="rotate(-32 42 94)" />
      <ellipse cx="76" cy="58" rx="17" ry="24" transform="rotate(-13 76 58)" />
      <ellipse cx="124" cy="58" rx="17" ry="24" transform="rotate(13 124 58)" />
      <ellipse cx="158" cy="94" rx="16" ry="22" transform="rotate(32 158 94)" />
      <path d="M100 110 C133 110 160 131 160 155 C160 177 141 190 124 190 C113 190 107 184 100 184 C93 184 87 190 76 190 C59 190 40 177 40 155 C40 131 67 110 100 110 Z" />
    </>
  );
}

export function PawGauge({
  progress,
  color,
  fillMs = 1600,
  strokeWidth = 13,
  className,
}: {
  progress: number;
  color: string;
  fillMs?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const clipId = React.useId();
  const p = Math.min(Math.max(progress, 0), 1);

  const stroke = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect
            x={-200}
            y={ART_TOP}
            width={600}
            height={ART_HEIGHT * 2}
            style={{
              transform: `translateY(${(1 - p) * ART_HEIGHT}px)`,
              transition: `transform ${fillMs}ms cubic-bezier(.22,1,.36,1)`,
            }}
          />
        </clipPath>
      </defs>

      {/* Track — stands in for the app's .thinMaterial. */}
      <g {...stroke} opacity={0.17}>
        <PawArt />
      </g>

      {/* Fill, clipped to the water line. */}
      <g clipPath={`url(#${clipId})`} {...stroke}>
        <PawArt />
      </g>
    </svg>
  );
}

/** Three nested paws — Wags outside, then Playtime, then Paws. */
export function PawRings({
  progress,
  size = 340,
  fillMs = 1600,
  className,
}: {
  progress: Record<RingKey, number>;
  size?: number;
  fillMs?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        filter: "drop-shadow(0 2px 10px rgba(0,0,0,.55))",
      }}
    >
      {RING_ORDER.map((key, i) => {
        const scale = [1, 0.875, 0.75][i];
        return (
          <div
            key={key}
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
          >
            <PawGauge
              progress={progress[key]}
              color={RING[key].color}
              fillMs={fillMs}
              className="h-full w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
