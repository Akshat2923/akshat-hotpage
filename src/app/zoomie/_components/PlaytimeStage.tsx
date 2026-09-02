"use client";

import * as React from "react";
import type { Stage } from "../_lib/zoomie-data";

// A live session in Zoomie doesn't sit on a blank screen — it plays out on an
// animated SpriteKit stage behind the timer, flat and chunky and a bit silly.
// This is that, in SVG. Palette values are lifted from PlaytimeScenePalette.
//
// The viewBox is anchored to its bottom edge (xMidYMax) and everything that
// matters lives between y=40 and y=125: wide viewports crop the sky, which
// costs nothing, and the control bar that sits over the bottom third only ever
// covers empty ground.

const GROUND = 80;
const FEET = 120;

const P = {
  skyTop: "#BFE0F2",
  skyLow: "#E8F2E0",
  grass: "#94C773",
  grassDark: "#7AAD5C",
  bush: "#427A42",
  canopy: "#478543",
  road: "#9E9994",
  roadLine: "#E6E0CC",
  dirt: "#B89E70",
  cloud: "#FFFFFF",
  wall: "#AD9C8C",
  wallDark: "#95836F",
  baseboard: "#F7F2EB",
  floor: "#BD9466",
  plank: "#9E7850",
  rug: "#DBBD99",
  couch: "#577D82",
  cushion: "#6B9194",
  seam: "#45666B",
  player: "#3359BF",
  dog: "#C08A52",
  dogDark: "#A06F3E",
  ball: "#D9E04A",
  rope: "#D8C089",
};

/** Origin sits at the dog's shoulder; feet land 22 units below. */
function Dog({
  x,
  s = 1,
  flip = false,
  className,
}: {
  x: number;
  s?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${FEET - 22 * s}) scale(${flip ? -s : s} ${s})`}
      className={className}
    >
      <rect x={-16} y={6} width={7} height={16} rx={3.5} fill={P.dogDark} />
      <rect x={8} y={6} width={7} height={16} rx={3.5} fill={P.dogDark} />
      <rect x={-8} y={7} width={7} height={15} rx={3.5} fill={P.dog} />
      <rect x={1} y={7} width={7} height={15} rx={3.5} fill={P.dog} />
      <path
        d="M14 -2 q12 -4 14 -14"
        stroke={P.dog}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={0} cy={-1} rx={20} ry={12} fill={P.dog} />
      <circle cx={-20} cy={-13} r={10} fill={P.dog} />
      <ellipse cx={-29} cy={-10} rx={7} ry={5} fill={P.dog} />
      <circle cx={-35} cy={-11} r={2.4} fill="#3B2A1B" />
      <circle cx={-21} cy={-16} r={1.8} fill="#3B2A1B" />
      <path d="M-15 -20 q6 -6 9 2 q-5 5 -9 -2z" fill={P.dogDark} />
    </g>
  );
}

/** Origin sits at the waist; feet land 30 units below. */
function Person({
  x,
  s = 1,
  className,
}: {
  x: number;
  s?: number;
  className?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${FEET - 30 * s}) scale(${s})`}
      className={className}
    >
      <rect x={-7} y={12} width={6} height={18} rx={3} fill={P.player} />
      <rect x={2} y={12} width={6} height={18} rx={3} fill={P.player} />
      <rect x={-9} y={-12} width={18} height={26} rx={8} fill={P.player} />
      <circle cx={0} cy={-22} r={9} fill={P.player} />
      <rect x={7} y={-10} width={6} height={18} rx={3} fill={P.player} />
    </g>
  );
}

function Outdoor({ typeId }: { typeId: string }) {
  const walking = typeId === "walk";
  return (
    <>
      <defs>
        <linearGradient id="zm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.skyTop} />
          <stop offset="100%" stopColor={P.skyLow} />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#zm-sky)" />
      <ellipse cx="70" cy="44" rx="26" ry="10" fill={P.cloud} opacity={0.85} className="zm-drift" />
      <ellipse cx="290" cy="34" rx="34" ry="12" fill={P.cloud} opacity={0.7} className="zm-drift-slow" />

      {/* treeline, sitting on the horizon */}
      <circle cx="34" cy="58" r="24" fill={P.canopy} />
      <circle cx="112" cy="66" r="16" fill={P.bush} />
      <circle cx="336" cy="56" r="26" fill={P.canopy} />
      <circle cx="258" cy="68" r="14" fill={P.bush} />

      <rect y={GROUND} width="400" height={180 - GROUND} fill={P.grass} />
      <rect y={GROUND} width="400" height="4" fill={P.grassDark} />

      {walking ? (
        <>
          <rect y="104" width="400" height="26" fill={P.road} />
          <g className="zm-scroll">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x={i * 40} y="115" width="20" height="4" rx="2" fill={P.roadLine} />
            ))}
          </g>
        </>
      ) : (
        <ellipse cx="200" cy="126" rx="150" ry="8" fill={P.grassDark} opacity={0.4} />
      )}
    </>
  );
}

function Indoor({ couch }: { couch: boolean }) {
  return (
    <>
      <rect width="400" height="180" fill={P.wall} />
      <rect x="26" y="14" width="80" height="52" rx="6" fill={P.wallDark} />
      <rect x="33" y="21" width="66" height="38" rx="4" fill={P.dirt} opacity={0.55} />
      {couch && (
        <g>
          <rect x="196" y="26" width="186" height="56" rx="12" fill={P.couch} />
          <rect x="206" y="34" width="78" height="32" rx="8" fill={P.cushion} />
          <rect x="292" y="34" width="78" height="32" rx="8" fill={P.cushion} />
          <rect x="196" y="74" width="186" height="10" rx="5" fill={P.seam} />
        </g>
      )}
      <rect y={GROUND} width="400" height="8" fill={P.baseboard} />
      <rect y={GROUND + 8} width="400" height={180 - GROUND - 8} fill={P.floor} />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 46} y={GROUND + 8} width="2.5" height={180 - GROUND - 8} fill={P.plank} opacity={0.7} />
      ))}
      <rect x="56" y="106" width="290" height="28" rx="8" fill={P.rug} />
    </>
  );
}

// Memoised: the console re-renders ten times a second while a session runs,
// and re-walking this whole scene graph each tick was enough to starve the
// clock's own interval.
export const PlaytimeStage = React.memo(function PlaytimeStage({
  stage,
  typeId,
  running,
}: {
  stage: Stage;
  typeId: string;
  running: boolean;
}) {
  const indoor = stage === "floor" || stage === "couch";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <style>{`
        @keyframes zm-scroll { to { transform: translateX(-40px); } }
        @keyframes zm-drift { to { transform: translateX(430px); } }
        @keyframes zm-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes zm-run { 0%,100% { transform: translateX(-64px); } 50% { transform: translateX(64px); } }
        @keyframes zm-ball { 0% { transform: translate(0,0) } 50% { transform: translate(120px,-46px) } 100% { transform: translate(240px,0) } }
        @keyframes zm-breathe { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }
        .zm-scroll { animation: zm-scroll 1.1s linear infinite; }
        .zm-drift { animation: zm-drift 34s linear infinite; }
        .zm-drift-slow { animation: zm-drift 52s linear infinite; }
        .zm-bob { animation: zm-bob .55s ease-in-out infinite; }
        .zm-run { animation: zm-run 2.4s ease-in-out infinite; }
        .zm-ball { animation: zm-ball 2.6s ease-in-out infinite; }
        .zm-breathe { animation: zm-breathe 3.4s ease-in-out infinite; transform-origin: center; }
        .zm-paused * { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) {
          .zm-scroll,.zm-drift,.zm-drift-slow,.zm-bob,.zm-run,.zm-ball,.zm-breathe { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox="0 0 400 180"
        preserveAspectRatio="xMidYMax slice"
        className={`h-full w-full ${running ? "" : "zm-paused"}`}
        aria-hidden="true"
      >
        {indoor ? <Indoor couch={stage === "couch"} /> : <Outdoor typeId={typeId} />}

        {typeId === "walk" && (
          <g className="zm-bob">
            <Person x={150} />
            <line x1={162} y1={96} x2={222} y2={106} stroke={P.rope} strokeWidth={3} />
            <Dog x={250} flip />
          </g>
        )}

        {typeId === "fetch" && (
          <>
            <Person x={74} />
            <circle cx={90} cy={92} r={6} fill={P.ball} className="zm-ball" />
            <Dog x={236} className="zm-run" />
          </>
        )}

        {typeId === "chase" && (
          <g className="zm-run">
            <Person x={152} className="zm-bob" />
            <Dog x={240} flip />
          </g>
        )}

        {typeId === "tug" && (
          <>
            <Person x={134} />
            <line x1={147} y1={98} x2={220} y2={106} stroke={P.rope} strokeWidth={6} strokeLinecap="round" />
            <Dog x={254} flip className="zm-bob" />
          </>
        )}

        {typeId === "cuddle" && (
          <>
            <Person x={252} s={0.95} />
            <g className="zm-breathe">
              <Dog x={206} s={0.9} />
            </g>
          </>
        )}

        {(typeId === "massage" || typeId === "brushing") && (
          <>
            <Person x={132} s={0.95} />
            <g className="zm-breathe">
              <Dog x={228} flip s={1.05} />
            </g>
          </>
        )}

        {typeId === "training" && (
          <>
            <Person x={142} />
            <Dog x={248} flip className="zm-bob" />
            <circle cx={198} cy={84} r={5} fill={P.ball} opacity={0.9} />
          </>
        )}

        {typeId === "scent" && (
          <>
            <Person x={330} s={0.9} />
            <g className="zm-run">
              <Dog x={162} s={1.05} />
            </g>
            {[104, 142, 180, 218].map((x, i) => (
              <circle key={x} cx={x} cy={128} r={3} fill={P.dirt} opacity={0.4 + i * 0.14} />
            ))}
          </>
        )}
      </svg>
    </div>
  );
});
