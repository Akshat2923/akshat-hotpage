"use client";

import * as React from "react";
import figureStand from "@/assets/zoomie/figure.stand@10x.png";
import treeFill from "@/assets/zoomie/tree.fill@10x.png";
import leafFill from "@/assets/zoomie/leaf.fill@10x.png";
import sofaFill from "@/assets/zoomie/sofa.fill@10x.png";
import artFrame from "@/assets/zoomie/photo.artframe@10x.png";
import figureWalk from "@/assets/zoomie/figure.walk@10x.png";
import dogFill from "@/assets/zoomie/dog.fill@10x.png";
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
  frame: "#6E5B49",
  baseboard: "#F7F2EB",
  floor: "#BD9466",
  plank: "#9E7850",
  rug: "#DBBD99",
  couch: "#577D82",
  cushion: "#6B9194",
  seam: "#45666B",
  player: "#3359BF",
  dog: "#C08A52",
  ball: "#D9E04A",
  rope: "#D8C089",
};

// Actors are the app's own SF Symbols — figure.walk, figure.stand and
// dog.fill, exported at @10x — rather than shapes drawn by hand. Each is
// painted by filling a rect through a mask of the glyph, which is the only way
// to recolour a white PNG inside an SVG.
//
// Boxes are sized from each file's own aspect ratio so nothing stretches, and
// the dog stands at 0.63 of the person's height — the same ratio the app's
// composed glyph pairs use (primarySize 32 against secondarySize 20).
const PERSON_H = 54;
const DOG_H = 34;
const ASPECT = {
  stand: 440 / 1050,
  walk: 660 / 1090,
  dog: 1250 / 1060,
  tree: 1200 / 1220,
  leaf: 1010 / 890,
  sofa: 1410 / 810,
  frame: 1110 / 870,
};

const SRC = {
  stand: figureStand.src,
  walk: figureWalk.src,
  dog: dogFill.src,
  tree: treeFill.src,
  leaf: leafFill.src,
  sofa: sofaFill.src,
  frame: artFrame.src,
};

/**
 * Where a lead attaches on dog.fill, as a fraction of its box. Read off the
 * glyph's own row profile: the collar notch sits just behind the head.
 */
const COLLAR = { x: 0.75, y: 0.25 };

/**
 * One symbol, standing on `FEET`, centred on `x` and painted in `color`.
 * `flip` mirrors it about its own centre — figure.walk and dog.fill both face
 * right in the file, so anything meant to face the other way needs it.
 */
function Glyph({
  kind,
  x,
  h,
  color,
  base = FEET,
  flip = false,
  className,
}: {
  kind: keyof typeof SRC;
  x: number;
  h: number;
  color: string;
  /** What the glyph stands on. Actors use the ground; scenery sets its own. */
  base?: number;
  flip?: boolean;
  className?: string;
}) {
  const id = React.useId();
  const w = h * ASPECT[kind];
  const left = x - w / 2;
  const top = base - h;

  return (
    <g className={className}>
      <mask id={id} maskUnits="userSpaceOnUse" x={left} y={top} width={w} height={h}>
        <image
          href={SRC[kind]}
          x={left}
          y={top}
          width={w}
          height={h}
          transform={flip ? `translate(${2 * left + w} 0) scale(-1 1)` : undefined}
        />
      </mask>
      <rect x={left} y={top} width={w} height={h} fill={color} mask={`url(#${id})`} />
    </g>
  );
}

/** Scenery: a symbol planted on `base` rather than on the ground line. */
function Prop({
  kind,
  x,
  h,
  base,
  color,
}: {
  kind: keyof typeof SRC;
  x: number;
  h: number;
  base: number;
  color: string;
}) {
  return <Glyph kind={kind} x={x} h={h} base={base} color={color} />;
}

/** The dog, facing right unless flipped. */
function Dog({ h = DOG_H, ...props }: { x: number; h?: number; flip?: boolean; className?: string }) {
  return <Glyph kind="dog" color={P.dog} h={h} {...props} />;
}

/** The owner. Walking while a session runs, standing the rest of the time. */
function Person({
  moving = false,
  h = PERSON_H,
  ...props
}: { x: number; h?: number; moving?: boolean; flip?: boolean; className?: string }) {
  return <Glyph kind={moving ? "walk" : "stand"} color={P.player} h={h} {...props} />;
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

      {/* Treeline, planted just past the horizon so the trunks read as
          standing behind the ground rather than on top of it. */}
      <Prop kind="tree" x={36} h={44} base={86} color={P.canopy} />
      <Prop kind="tree" x={334} h={48} base={86} color={P.canopy} />
      {/* Shrubs, set a little into the grass rather than balanced on the
          horizon — a leaf has no trunk, so on the line itself it floats. */}
      <Prop kind="leaf" x={112} h={22} base={91} color={P.bush} />
      <Prop kind="leaf" x={258} h={18} base={89} color={P.bush} />

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
      <Prop kind="frame" x={62} h={44} base={60} color={P.frame} />
      <rect y={GROUND} width="400" height="8" fill={P.baseboard} />
      <rect y={GROUND + 8} width="400" height={180 - GROUND - 8} fill={P.floor} />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 46} y={GROUND + 8} width="2.5" height={180 - GROUND - 8} fill={P.plank} opacity={0.7} />
      ))}
      <rect x="56" y="106" width="290" height="28" rx="8" fill={P.rug} />
      {/* After the floor and the rug, so they can't cover its legs, and set
          back far enough that the baseboard falls behind the solid seat band
          rather than showing through the gap between the cushions. */}
      {couch && <Prop kind="sofa" x={255} h={62} base={106} color={P.couch} />}
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

        {/* dog.fill carries its collar at about 0.80 across and 0.22 down,
            which is where a leash or a rope has to land. */}
        {typeId === "walk" && (
          <g className="zm-bob">
            <Person x={140} moving={running} />
            <Dog x={245} />
            <line
              x1={running ? 157 : 150}
              y1={running ? 94 : 97}
              x2={245 - 40.09 / 2 + COLLAR.x * 40.09}
              y2={FEET - 34 + COLLAR.y * 34}
              stroke={P.rope}
              strokeWidth={2.5}
            />
          </g>
        )}

        {typeId === "fetch" && (
          <>
            <Person x={70} />
            <circle cx={84} cy={88} r={5} fill={P.ball} className="zm-ball" />
            <Dog x={240} className="zm-run" />
          </>
        )}

        {/* They run as a pair: the dog behind, gaining. */}
        {typeId === "chase" && (
          <g className="zm-run">
            <Dog x={165} />
            <Person x={235} moving={running} className="zm-bob" />
          </g>
        )}

        {typeId === "tug" && (
          <>
            <Person x={130} />
            <Dog x={250} flip className="zm-bob" />
            <line
              x1={141}
              y1={96}
              x2={250 + 40.09 / 2 - COLLAR.x * 40.09}
              y2={FEET - 34 + COLLAR.y * 34}
              stroke={P.rope}
              strokeWidth={5}
              strokeLinecap="round"
            />
          </>
        )}

        {typeId === "cuddle" && (
          <>
            <Person x={252} />
            <g className="zm-breathe">
              <Dog x={205} h={31} />
            </g>
          </>
        )}

        {(typeId === "massage" || typeId === "brushing") && (
          <>
            <Person x={128} />
            <g className="zm-breathe">
              <Dog x={228} flip />
            </g>
          </>
        )}

        {typeId === "training" && (
          <>
            <Person x={138} />
            <Dog x={248} flip className="zm-bob" />
            <circle cx={196} cy={86} r={4.5} fill={P.ball} opacity={0.9} />
          </>
        )}

        {typeId === "scent" && (
          <>
            <Person x={332} />
            <g className="zm-run">
              <Dog x={165} />
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
