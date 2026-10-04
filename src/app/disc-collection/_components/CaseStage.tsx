"use client";

//
//  CaseStage.tsx
//  The app's idea, in the browser: a case you can turn, open, and take the disc out of.
//
//  Pure CSS 3D. A base (back cover outside, tray inside), a lid hinged at the spine
//  (front cover outside, booklet inside), edges for the plastic's thickness, and a disc
//  with a label side and a data side. The controls are the app's own: Front, Back,
//  Spine, Open, Disc. Drag to turn it.
//
//  The art is invented, never a real cover: in the app it's your photos of your copy.
//

import * as React from "react";
import Image from "next/image";
import icon from "@/assets/Disc-Collection/Disc Collection-iOS-Default-128@2x.png";

const W = 240; // 135 mm
const H = 302; // 170 mm
const T = 22; // 14 mm, a little thicker so it reads at this size
const DISC = 212; // 120 mm

type Pose = "front" | "back" | "spine";
type DiscStage = "in" | "label" | "data";

const YAW: Record<Pose, number> = { front: -18, back: 180 - 18, spine: 90 };

export function CaseStage() {
  const [yaw, setYaw] = React.useState(YAW.front);
  const [pitch, setPitch] = React.useState(-8);
  const [open, setOpen] = React.useState(false);
  const [disc, setDisc] = React.useState<DiscStage>("in");
  const [dragging, setDragging] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const last = React.useRef<{ x: number; y: number } | null>(null);
  const moved = React.useRef(0);

  const showPose = (pose: Pose) => {
    setTouched(true);
    if (pose === "spine" && open) return;
    if (pose !== "front") setDisc("in");
    setYaw(YAW[pose]);
    setPitch(-8);
  };

  const toggleOpen = () => {
    setTouched(true);
    if (open) setDisc("in");
    setOpen(!open);
    setYaw(open ? YAW.front : -6);
    setPitch(open ? -8 : -14);
  };

  const cycleDisc = () => {
    setTouched(true);
    if (!open) {
      setOpen(true);
      setYaw(-6);
      setPitch(-14);
      window.setTimeout(() => setDisc("label"), 450);
      return;
    }
    setYaw(-6);
    setDisc(disc === "in" ? "label" : disc === "label" ? "data" : "in");
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    last.current = { x: e.clientX, y: e.clientY };
    moved.current = 0;
    setDragging(true);
    setTouched(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    last.current = { x: e.clientX, y: e.clientY };
    setYaw((y) => y + dx * 0.5);
    setPitch((p) => Math.max(-40, Math.min(30, p - dy * 0.3)));
  };
  const onPointerUp = () => {
    // A tap, not a drag: the app opens or closes the case on a tap.
    if (last.current && moved.current < 6) toggleOpen();
    last.current = null;
    setDragging(false);
  };

  const lid = open ? -178 : 0;
  const discTransform =
    disc === "in"
      ? `translateZ(${-T / 2 + 3}px)`
      : disc === "label"
        ? `translateZ(70px) translateY(-14px) rotateX(-12deg)`
        : `translateZ(70px) translateY(-14px) rotateX(-12deg) rotateY(180deg)`;

  return (
    <div className="flex flex-col items-center">
      <style>{CSS}</style>
      <div
        className="dc-scene relative flex h-[440px] w-full max-w-[560px] cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`A disc case, ${open ? "open" : "closed"}${disc !== "in" ? ", disc out" : ""}. Drag to turn it.`}
      >
        <div className="dc-floor" />
        <div className={touched ? "" : "dc-sway"} style={{ transformStyle: "preserve-3d" }}>
          <div
            className="dc-case"
            style={{
              width: W,
              height: H,
              // Open, the case is twice as wide: slide it so the middle stays put.
              transform: `rotateX(${pitch}deg) rotateY(${yaw}deg) translateX(${open ? W / 2 : 0}px)`,
              transition: dragging ? "none" : "transform 900ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            {/* Base: back cover outside, tray inside */}
            <div className="dc-face dc-back" style={{ transform: `translateZ(${-T / 2}px) rotateY(180deg)` }}>
              <BackArt />
            </div>
            <div className="dc-face dc-tray" style={{ transform: `translateZ(${-T / 2 + 1}px)` }}>
              <div className="dc-hub" />
            </div>

            {/* Thickness */}
            <div
              className="dc-edge dc-spine"
              style={{ width: T, height: H, left: -T / 2, transform: "rotateY(-90deg)" }}
            >
              <SpineArt />
            </div>
            <div
              className="dc-edge"
              style={{ width: T, height: H, left: W - T / 2, transform: "rotateY(90deg)", opacity: open ? 0 : 1 }}
            />
            <div
              className="dc-edge"
              style={{ width: W, height: T, top: -T / 2, transform: "rotateX(90deg)", opacity: open ? 0 : 1 }}
            />
            <div
              className="dc-edge"
              style={{ width: W, height: T, top: H - T / 2, transform: "rotateX(-90deg)", opacity: open ? 0 : 1 }}
            />

            {/* Disc */}
            <div
              className="dc-disc"
              style={{
                width: DISC,
                height: DISC,
                left: (W - DISC) / 2,
                top: (H - DISC) / 2,
                transform: discTransform,
                transition: dragging ? "none" : "transform 800ms cubic-bezier(.3,1.3,.4,1)",
              }}
            >
              <div className="dc-disc-face dc-label">
                <Image src={icon} alt="" width={64} height={64} className="rounded-[14px]" />
              </div>
              <div className="dc-disc-face dc-data" />
            </div>

            {/* Lid: front cover outside, booklet inside, hinged at the spine */}
            <div
              className="dc-lid"
              style={{
                transform: `translateZ(${T / 2}px) rotateY(${lid}deg)`,
                transition: dragging ? "none" : "transform 900ms cubic-bezier(.35,1.25,.4,1)",
              }}
            >
              <div className="dc-face dc-front">
                <FrontArt />
              </div>
              <div className="dc-face dc-inner" style={{ transform: "rotateY(180deg)" }}>
                <BookletArt />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-1.5 rounded-full border border-[var(--dc-line)] bg-[var(--dc-glass)] p-1.5 backdrop-blur-xl">
        {(["front", "back", "spine"] as Pose[]).map((pose) => (
          <button
            key={pose}
            onClick={() => showPose(pose)}
            disabled={pose === "spine" && open}
            className="dc-pill"
          >
            {pose[0].toUpperCase() + pose.slice(1)}
          </button>
        ))}
        <span className="mx-1 w-px self-stretch bg-[var(--dc-line)]" />
        <button onClick={toggleOpen} className="dc-pill">
          {open ? "Close" : "Open"}
        </button>
        <button onClick={cycleDisc} className="dc-pill dc-pill-accent">
          {disc === "in" ? "Disc" : disc === "label" ? "Flip" : "Put Back"}
        </button>
      </div>
    </div>
  );
}

function FrontArt() {
  return (
    <div className="dc-art dc-front-art">
      <div className="dc-banner">
        <span>GAME</span>
      </div>
      <div className="dc-sun" />
      <div className="dc-hills" />
      <p className="dc-title">
        Your
        <br />
        Copy
      </p>
      <p className="dc-sub">Exactly as it sits on your shelf</p>
    </div>
  );
}

function BackArt() {
  return (
    <div className="dc-art dc-back-art">
      <div className="dc-banner" />
      <p className="dc-back-title">YOUR COPY</p>
      <div className="dc-shots">
        <div />
        <div />
        <div />
      </div>
      <div className="dc-lines">
        {[92, 84, 88, 60, 90, 70].map((w, i) => (
          <span key={i} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="dc-barcode" />
    </div>
  );
}

function SpineArt() {
  return (
    <div className="dc-spine-art">
      <span className="dc-spine-banner" />
      <span className="dc-spine-title">YOUR COPY</span>
    </div>
  );
}

function BookletArt() {
  return (
    <div className="dc-art dc-booklet">
      <p>Warnings, credits, a map of somewhere</p>
      <div className="dc-lines">
        {[90, 80, 86, 74, 88, 50, 82, 76].map((w, i) => (
          <span key={i} style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

const CSS = `
.dc-scene { perspective: 1400px; }
.dc-floor {
  position: absolute; left: 50%; bottom: 18px; width: 360px; height: 60px; transform: translateX(-50%);
  background: radial-gradient(closest-side, var(--dc-shadow), transparent);
  filter: blur(6px); pointer-events: none;
}
.dc-sway { animation: dc-sway 9s ease-in-out infinite; }
@keyframes dc-sway {
  0%, 100% { transform: rotateY(-14deg); }
  50% { transform: rotateY(16deg); }
}
@media (prefers-reduced-motion: reduce) { .dc-sway { animation: none; } }

.dc-case, .dc-lid, .dc-disc { position: relative; transform-style: preserve-3d; }
.dc-lid { position: absolute; inset: 0; transform-origin: 0 50%; }
.dc-face, .dc-edge, .dc-disc-face { position: absolute; backface-visibility: hidden; }
.dc-face { inset: 0; border-radius: 6px; overflow: hidden; }
.dc-edge { background: linear-gradient(90deg, #1f6fe8, #4d97ff 50%, #1f6fe8); transition: opacity .3s; }
.dc-spine { background: #2a7cf6; display: flex; }

/* The plastic: a translucent blue rim around the printed sleeve. */
.dc-front, .dc-back, .dc-inner {
  background: rgba(41,128,255,.92);
  padding: 7px 8px 7px 10px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25), inset 0 1px 12px rgba(255,255,255,.18);
}
.dc-front::after, .dc-back::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, rgba(255,255,255,.28), rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,.12));
}
.dc-tray {
  background:
    radial-gradient(circle at 50% 50%, transparent 0 26px, rgba(255,255,255,.35) 27px 29px, transparent 30px),
    repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 2px, transparent 2px 6px),
    linear-gradient(160deg, #3b8cff, #1d66e0);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.3);
}
.dc-hub {
  position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; transform: translate(-50%,-50%);
  border-radius: 50%;
  background: repeating-conic-gradient(rgba(255,255,255,.55) 0 10deg, rgba(255,255,255,.15) 10deg 20deg);
}

.dc-art { position: relative; width: 100%; height: 100%; border-radius: 2px; overflow: hidden; }
.dc-banner {
  position: absolute; inset: 0 0 auto 0; height: 26px; background: #0b4fc4; z-index: 2;
  display: flex; align-items: center; padding: 0 10px;
}
.dc-banner span { color: #fff; font-weight: 800; font-size: 11px; letter-spacing: .22em; }
.dc-front-art { background: linear-gradient(180deg, #120a3a 0%, #4b1d6b 42%, #e1525a 72%, #ffb057 100%); }
.dc-sun {
  position: absolute; left: 50%; top: 92px; width: 120px; height: 120px; transform: translateX(-50%);
  border-radius: 50%;
  background: repeating-linear-gradient(180deg, #ffe08a 0 9px, transparent 9px 13px);
  -webkit-mask: linear-gradient(#000 55%, transparent 100%); mask: linear-gradient(#000 55%, transparent 100%);
}
.dc-hills {
  position: absolute; inset: auto 0 0 0; height: 96px;
  background:
    radial-gradient(120px 60px at 20% 100%, #1a0b2e 98%, transparent),
    radial-gradient(160px 70px at 80% 100%, #23103d 98%, transparent),
    linear-gradient(transparent 60%, #12081f);
}
.dc-title {
  position: absolute; left: 14px; top: 34px; z-index: 3; color: #fff;
  font-size: 38px; line-height: .86; font-weight: 900; letter-spacing: -.04em; text-transform: uppercase;
  text-shadow: 0 2px 18px rgba(0,0,0,.35);
}
.dc-sub {
  position: absolute; left: 14px; right: 14px; bottom: 12px; z-index: 3;
  color: rgba(255,255,255,.8); font-size: 9px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
}
.dc-back-art { background: linear-gradient(180deg, #1b1035, #2a1446); padding: 34px 12px 12px; }
.dc-back-title { color: #fff; font-weight: 900; font-size: 16px; letter-spacing: -.02em; }
.dc-shots { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; margin-top: 10px; }
.dc-shots div { height: 40px; border-radius: 2px; background: linear-gradient(140deg, #e1525a, #4b1d6b); }
.dc-shots div:nth-child(2) { background: linear-gradient(140deg, #ffb057, #e1525a); }
.dc-shots div:nth-child(3) { background: linear-gradient(140deg, #4b1d6b, #120a3a); }
.dc-lines { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
.dc-lines span { height: 4px; border-radius: 2px; background: rgba(255,255,255,.28); }
.dc-barcode {
  position: absolute; right: 12px; bottom: 12px; width: 70px; height: 34px; background: #fff;
  background-image: repeating-linear-gradient(90deg, #111 0 2px, transparent 2px 3px, #111 3px 4px, transparent 4px 7px);
  background-clip: content-box; padding: 4px; border-radius: 2px;
}
.dc-booklet { background: linear-gradient(180deg, #f4f1ea, #e6e1d6); padding: 16px 14px; }
.dc-booklet p { font-size: 9px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #6d6656; }
.dc-booklet .dc-lines span { background: rgba(0,0,0,.14); }

.dc-spine-art { position: relative; width: 100%; height: 100%; background: linear-gradient(180deg, #1b1035, #4b1d6b 60%, #e1525a); margin: 0 3px; }
.dc-spine-banner { position: absolute; inset: 0 0 auto 0; height: 26px; background: #0b4fc4; }
.dc-spine-title {
  position: absolute; left: 50%; top: 40px; transform: translateX(-50%);
  writing-mode: vertical-rl; color: #fff; font-weight: 900; font-size: 11px; letter-spacing: .2em;
}

.dc-disc { position: absolute; }
.dc-disc-face { inset: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.dc-label {
  background:
    radial-gradient(circle, transparent 0 9px, #d9dde4 10px 18px, transparent 19px),
    radial-gradient(circle at 50% 50%, #ffffff 0 34%, #eef1f6 35% 46%, transparent 47%),
    conic-gradient(from 200deg, #120a3a, #4b1d6b, #e1525a, #ffb057, #4b1d6b, #120a3a);
  box-shadow: 0 0 0 1px rgba(255,255,255,.4), 0 18px 40px rgba(0,0,0,.35);
}
.dc-data {
  transform: rotateY(180deg);
  background:
    radial-gradient(circle, transparent 0 9px, rgba(255,255,255,.75) 10px 30px, transparent 31px),
    conic-gradient(from 0deg, #c9d2df, #ff9ad5, #9be7ff, #fff3a8, #b5ffb0, #c9d2df, #a6b8ff, #ffb0a0, #c9d2df);
  box-shadow: 0 0 0 1px rgba(255,255,255,.5), 0 18px 40px rgba(0,0,0,.35);
  animation: dc-shimmer 6s linear infinite;
}
@keyframes dc-shimmer { to { filter: hue-rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .dc-data { animation: none; } }

.dc-pill {
  border-radius: 9999px; padding: 6px 14px; font-size: 13px; font-weight: 700; color: var(--dc-text);
  transition: background .2s, transform .15s;
}
.dc-pill:hover:not(:disabled) { background: var(--dc-hover); }
.dc-pill:active:not(:disabled) { transform: scale(.95); }
.dc-pill:disabled { opacity: .35; }
.dc-pill-accent { background: ${"#2980FF"}; color: #fff; }
.dc-pill-accent:hover:not(:disabled) { background: #1f6fe8; }
`;
