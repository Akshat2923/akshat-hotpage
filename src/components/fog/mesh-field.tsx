"use client";

//
//  mesh-field.tsx
//  Fog's background, ported.
//
//  The app draws a 4x4 SwiftUI `MeshGradient` whose vertices drift and whose Bezier handles
//  swirl. The browser has no mesh gradient, so the geometry is kept and the rendering is
//  swapped: sixteen vertices, sixteen radial falloffs, drawn into a canvas barely bigger
//  than a favicon and stretched across the viewport. Upscaling *is* the interpolation, and
//  it costs nothing — a full-resolution field at 60fps would cost plenty.
//
//  Three things are carried over verbatim, because they are what make it read as Fog rather
//  than as a wallpaper:
//
//  1. **Corners pinned, edges slide, interior drifts.** A boundary vertex pulled inward
//     exposes the page colour at the rim.
//  2. **Opaque colours mixed toward the page colour in linear light.** An alpha wash sheds
//     chroma faster than lightness, which is how "subtle" turns into "grey".
//  3. **An energy envelope: 0.45s up, 1.1s down.** The field only churns while something is
//     generating — quick to rouse, slow to settle.
//

import * as React from "react";
import { ACCENTS, useFog } from "./fog-context";

const SIDE = 4;
const SPACING = 1 / (SIDE - 1);

const WIND_UP = 0.45;
const WIND_DOWN = 1.1;
const FAST_RATE = 2.3;
const SLOW_RATE = 1.55;
const INTERIOR_TRAVEL = 0.155;
const EDGE_TRAVEL = 0.15;
const CHROMA_LIFT = 0.5;

/// Warm sunset through to cool ocean, in the app's order. Loud is not the same as arbitrary.
const RAVE_RAMP = [
  "#FB861E", // ecstasy
  "#E79B8B", // tonysPink
  "#ED5A77", // mandy
  "#FB105A", // redRibbon
  "#BF6FB6", // fuchsiaPink
  "#967BE3", // mediumPurple
  "#A176C2", // wisteria
  "#6494C4", // danube
  "#4999F5", // cornflowerBlue
];

type HSB = { h: number; s: number; b: number };

function hexToHSB(hex: string): HSB {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 0xff) / 255;
  const g = ((n >> 8) & 0xff) / 255;
  const b = (n & 0xff) / 255;
  const high = Math.max(r, g, b);
  const low = Math.min(r, g, b);
  const delta = high - low;
  let h = 0;
  if (delta > 0) {
    if (high === r) h = ((g - b) / delta) % 6;
    else if (high === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  return { h, s: high === 0 ? 0 : delta / high, b: high };
}

function hsbToRGB({ h, s, b }: HSB): [number, number, number] {
  const hue = ((h % 1) + 1) % 1;
  const i = Math.floor(hue * 6);
  const f = hue * 6 - i;
  const p = b * (1 - s);
  const q = b * (1 - f * s);
  const t = b * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return [b, t, p];
    case 1: return [q, b, p];
    case 2: return [p, b, t];
    case 3: return [p, q, b];
    case 4: return [t, p, b];
    default: return [b, p, q];
  }
}

/// Takes the short way around the wheel, so red-to-magenta does not detour through green.
function sampleRamp(ramp: HSB[], position: number): HSB {
  if (ramp.length < 2) return ramp[0];
  const scaled = Math.min(Math.max(position, 0), 1) * (ramp.length - 1);
  const index = Math.min(Math.floor(scaled), ramp.length - 2);
  const fraction = scaled - index;
  const a = ramp[index];
  const b = ramp[index + 1];
  let step = b.h - a.h;
  if (step > 0.5) step -= 1;
  else if (step < -0.5) step += 1;
  return {
    h: a.h + step * fraction,
    s: a.s + (b.s - a.s) * fraction,
    b: a.b + (b.b - a.b) * fraction,
  };
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const toSRGB = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

/// Mixed in linear light rather than in sRGB — the whole reason the app specifies
/// `.perceptual` on its own blend.
function mix(a: [number, number, number], b: [number, number, number], t: number): string {
  const out = a.map((channel, i) => {
    const linear = toLinear(channel) + (toLinear(b[i]) - toLinear(channel)) * t;
    return Math.round(Math.min(Math.max(toSRGB(linear), 0), 1) * 255);
  });
  return `rgb(${out[0]},${out[1]},${out[2]})`;
}

/// Two sines on rates that do not divide into each other, so the churn never loops visibly.
function churn(tau: number, seed: number) {
  return Math.sin(tau * FAST_RATE + seed * 1.7) * 0.62 + Math.sin(tau * SLOW_RATE + seed * 3.1) * 0.38;
}

type Vertex = { x: number; y: number; interior: boolean };

function field(tau: number, energy: number): Vertex[] {
  const points: Vertex[] = [];
  for (let row = 0; row < SIDE; row++) {
    for (let col = 0; col < SIDE; col++) {
      const seed = (row * SIDE + col) * 1.618;
      const pinnedY = row === 0 || row === SIDE - 1;
      const pinnedX = col === 0 || col === SIDE - 1;
      const interior = !pinnedX && !pinnedY;

      // At rest the field is frozen at a phase that flatters it; at full energy it churns.
      // Blending between the two is what removes the snap when work starts and stops.
      const restTravel = interior ? 0.13 : 0.095;
      const restX = (Math.sin(9.4 * 0.1017 + seed * 1.7) * 0.62 + Math.sin(9.4 * 0.0639 + seed * 3.1) * 0.38) * restTravel;
      const restY = (Math.sin(9.4 * 0.113 + (seed + 4.2) * 1.7) * 0.62 + Math.sin(9.4 * 0.071 + (seed + 4.2) * 3.1) * 0.38) * restTravel;

      const liveTravel = interior ? INTERIOR_TRAVEL : EDGE_TRAVEL;
      const liveX = churn(tau, seed) * liveTravel;
      const liveY = churn(tau, seed + 4.2) * liveTravel;

      let x = col * SPACING;
      let y = row * SPACING;
      if (!pinnedX) x += restX + (liveX - restX) * energy;
      if (!pinnedY) y += restY + (liveY - restY) * energy;

      const limit = interior ? 0.12 : 0.1;
      if (!pinnedX) x = Math.min(Math.max(x, limit), 1 - limit);
      if (!pinnedY) y = Math.min(Math.max(y, limit), 1 - limit);

      points.push({ x, y, interior });
    }
  }
  return points;
}

function palette(ramp: HSB[], dark: boolean, tone: number): string[] {
  const page: [number, number, number] = dark ? [0.055, 0.055, 0.055] : [0.972, 0.972, 0.972];
  const colors: string[] = [];
  for (let row = 0; row < SIDE; row++) {
    for (let col = 0; col < SIDE; col++) {
      const u = col / (SIDE - 1);
      const v = row / (SIDE - 1);
      // Hue travels along a bent diagonal — on a straight axis the ramp reads as bands.
      const along = Math.min(Math.max(u * 0.62 + v * 0.38 + 0.1 * Math.sin((u - v) * Math.PI), 0), 1);
      const stop = { ...sampleRamp(ramp, along) };
      // One soft light source, upper left, so the eye reads lighting rather than noise.
      const lit = 1 - (u * 0.34 + v * 0.66);
      // Chroma peaks in the middle so the rim settles into the page instead of ending hard.
      const bloom = 0.62 + 0.38 * Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
      if (dark) {
        stop.s = Math.min(Math.max(stop.s * 1.05, 0.45), 1);
        stop.b = 0.34 + 0.34 * lit;
      } else {
        stop.s = Math.min(Math.max(stop.s * 0.98, 0.38), 0.96);
        stop.b = 0.8 + 0.2 * lit;
      }
      colors.push(mix(page, hsbToRGB(stop), Math.min(Math.max(tone * bloom, 0), 0.92)));
    }
  }
  return colors;
}

/// A tile of mid-grey noise. A full-screen 8-bit gradient bands on OLED, and banding is most
/// of what reads as cheap. Centred on mid grey so overlay leaves the image alone except for
/// a sub-1% nudge either way: dither, not texture.
function grainURL(): string {
  const side = 96;
  const canvas = document.createElement("canvas");
  canvas.width = side;
  canvas.height = side;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const image = ctx.createImageData(side, side);
  for (let i = 0; i < side * side; i++) {
    const value = 128 + Math.floor(Math.random() * 69) - 34;
    image.data[i * 4] = value;
    image.data[i * 4 + 1] = value;
    image.data[i * 4 + 2] = value;
    image.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

export function MeshField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { accent, rave, intensity, activity } = useFog();
  const [grain, setGrain] = React.useState<string>("");
  const redraw = React.useRef<(now: number) => void>();

  // Read by the frame loop, which must not restart when a swatch changes.
  const settings = React.useRef({ accent, rave, intensity });
  settings.current = { accent, rave, intensity };

  React.useEffect(() => setGrain(grainURL()), []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const W = (canvas.width = 96);
    const H = (canvas.height = 160);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let energy = 0;
    let energyAtTransition = 0;
    let transitionAt = performance.now() / 1000;
    let live = false;
    let tau = 0;
    // At rest the field is a still image. Redrawing it sixty times a second to produce the
    // same pixels is the kind of thing that shows up in someone's battery report, so a
    // resting frame is skipped unless the palette it was drawn with has changed.
    let lastPalette = "";

    const draw = (now: number) => {
      const seconds = now / 1000;
      const wantsLive = !reduceMotion && activity.current > 0;
      if (wantsLive !== live) {
        // Ramp from the value the field actually held, so an interrupted wind-up continues
        // rather than stepping.
        energyAtTransition = energy;
        transitionAt = seconds;
        live = wantsLive;
      }
      const duration = live ? WIND_UP : WIND_DOWN;
      const progress = Math.min(Math.max((seconds - transitionAt) / duration, 0), 1);
      const eased = progress * progress * (3 - 2 * progress);
      energy = energyAtTransition + ((live ? 1 : 0) - energyAtTransition) * eased;
      tau = seconds - transitionAt;

      const dark = document.documentElement.classList.contains("dark");
      const { accent: key, rave: isRave, intensity: scale } = settings.current;

      let ramp: HSB[];
      let tone: number;
      if (isRave) {
        ramp = RAVE_RAMP.map(hexToHSB);
        tone = dark ? 0.82 : 0.74;
      } else {
        // One colour still needs somewhere to travel: fan the accent into an analogous trio
        // so the mesh has real hues to interpolate between.
        const base = hexToHSB(ACCENTS[key].hex);
        ramp = [
          { ...base, h: base.h - 0.055 },
          base,
          { ...base, h: base.h + 0.075 },
        ];
        tone = dark ? 0.46 : 0.4;
      }
      tone *= scale * (1 + CHROMA_LIFT * energy);

      const paletteKey = `${dark}|${key}|${isRave}|${scale}|${energy.toFixed(3)}`;
      if (energy === 0 && paletteKey === lastPalette) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastPalette = paletteKey;

      const colors = palette(ramp, dark, tone);
      const points = field(tau, energy);

      ctx.fillStyle = dark ? "rgb(14,14,14)" : "rgb(248,248,248)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < points.length; i++) {
        const { x, y, interior } = points[i];
        const cx = x * W;
        const cy = y * H;
        const radius = (interior ? 0.72 : 0.62) * Math.max(W, H) * 0.62;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const color = colors[i];
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.55, color.replace("rgb(", "rgba(").replace(")", ",0.55)"));
        gradient.addColorStop(1, color.replace("rgb(", "rgba(").replace(")", ",0)"));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(draw);
    };

    // One frame drawn straight away. A tab that is restored from the background can go a
    // long time before its first animation frame, and until then an undrawn canvas is a
    // transparent hole where the field should be.
    redraw.current = draw;
    draw(performance.now());
    return () => cancelAnimationFrame(raf);
  }, [activity]);

  // A new colour should land on the next paint, not on the next animation frame — those are
  // the same thing in a visible tab and very much not in a throttled one.
  React.useEffect(() => {
    redraw.current?.(performance.now());
  }, [accent, rave, intensity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full scale-110"
        style={{ filter: "blur(18px)" }}
      />
      {grain ? (
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url(${grain})`, backgroundRepeat: "repeat" }}
        />
      ) : null}
    </div>
  );
}
