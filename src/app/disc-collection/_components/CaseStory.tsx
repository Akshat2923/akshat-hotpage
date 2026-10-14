"use client";

//
//  CaseStory.tsx
//  The landing page, told the way the app's onboarding is: by a case.
//
//  One case stands in a studio pinned to the screen, and scrolling moves it from one
//  chapter to the next. The words are printed on it, in black on white paper, the way
//  onboarding's welcome case is (`WelcomeArt.swift`): the front welcomes you, the
//  booklet inside says it's blank, then it whirls and comes round empty in each
//  platform's plastic. After that, every chapter is one more thing the app does,
//  printed on whichever side of the case the chapter turns to.
//
//  Pure CSS 3D. A base (back cover outside, tray inside), a lid hinged at the spine
//  (front cover outside, booklet inside), edges for the plastic, and a disc with a
//  label side and a data side. Drag to turn it, tap to open or close it.
//
//  The art is invented, never a real cover: in the app it's your photos of your copy.
//

import * as React from "react";
import Image from "next/image";
import icon from "@/assets/Disc-Collection/Disc Collection-iOS-Default-128@2x.png";

// A game case, 135 × 170 mm, at 2 px/mm. Thicker than its 14 mm so it reads.
const W = 272;
const H = 342;
const T = 22;
const DISC = 240; // 120 mm

// ── Plastics ─────────────────────────────────────────────────────────────────
// The app's own (`CasePlastic`): translucent ones tint what's behind them.

type PlasticKey =
  | "black"
  | "ps5"
  | "xboxSeries"
  | "wii"
  | "dvd"
  | "wiiU"
  | "xbox360"
  | "ps3"
  | "bluRay"
  | "xbox";

const PLASTICS: Record<PlasticKey, { name: string; color: string; translucent?: boolean; light?: boolean }> = {
  black: { name: "Disc Collection", color: "#0b0b0b" },
  ps5: { name: "PlayStation 5", color: "#2980ff", translucent: true },
  xboxSeries: { name: "Xbox Series X|S", color: "#107c10", translucent: true },
  wii: { name: "Wii", color: "#ededed", light: true },
  dvd: { name: "DVD", color: "#0b0b0b" },
  wiiU: { name: "Wii U", color: "#1dacd6" },
  xbox360: { name: "Xbox 360", color: "#6cc24a", translucent: true },
  ps3: { name: "PlayStation 3", color: "#dfe7f1", translucent: true, light: true },
  bluRay: { name: "Blu-ray", color: "#4d9eff", translucent: true },
  xbox: { name: "Xbox", color: "#7dbf2d" },
};

/** Onboarding's order, so no two alike come one after the other. */
const SHOWCASE: PlasticKey[] = ["ps5", "xboxSeries", "wii", "dvd", "wiiU", "xbox360", "ps3", "bluRay", "xbox"];

function mix(hex: string, other: string, t: number) {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(other.slice(1), 16);
  const ch = (shift: number) =>
    Math.round(((a >> shift) & 255) * (1 - t) + ((b >> shift) & 255) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`;
}

function plasticVars(key: PlasticKey): React.CSSProperties {
  const { color, translucent, light } = PLASTICS[key];
  return {
    "--p": translucent ? `${color}e6` : color,
    "--p-edge": mix(color, "#000000", light ? 0.18 : 0.3),
    "--p-tray": mix(color, light ? "#000000" : "#ffffff", 0.08),
    "--p-hub": light ? "rgba(0,0,0,.18)" : "rgba(255,255,255,.4)",
    "--p-ground": key === "black" || key === "dvd" ? "#0a0a0c" : mix(color, "#000000", light ? 0.78 : 0.7),
  } as React.CSSProperties;
}

// ── What's printed on it ─────────────────────────────────────────────────────

type Face = "front" | "back" | "spine" | "booklet" | "label";

function Small({ children, dim = false }: { children: React.ReactNode; dim?: boolean }) {
  return <p className={`text-[11px] leading-[1.45] ${dim ? "opacity-55" : ""}`}>{children}</p>;
}

const ART: Record<string, React.ReactNode> = {
  // Onboarding's welcome case, word for word.
  "welcome.front": (
    <div className="flex h-full flex-col px-6">
      <div className="flex-1" />
      <p className="text-[13px]">Welcome to your</p>
      <p className="mt-1.5 text-[31px] font-bold leading-[1.02] tracking-[-0.02em]">
        Disc
        <br />
        Collection.
      </p>
      <p className="mt-5 text-[11px] font-medium opacity-50">Tap to open</p>
      <div className="flex-[2]" />
    </div>
  ),
  "welcome.back": (
    <div className="flex h-full items-end justify-center pb-8">
      <p className="text-[9px] font-medium tracking-[0.3em]">DISC COLLECTION</p>
    </div>
  ),
  "welcome.spine": "DISC COLLECTION",
  "welcome.booklet": (
    <div className="flex h-full flex-col justify-center gap-4 px-6">
      <p className="text-[30px] font-bold leading-none">Huh.</p>
      <p className="text-[15px] leading-snug">This case seems to be blank.</p>
      <p className="text-[15px] leading-snug">Try adding your own.</p>
    </div>
  ),
  "welcome.label": "DISC COLLECTION",

  "capture.front": (
    <div className="flex h-full flex-col gap-3 px-6 py-9">
      <Small dim>01</Small>
      <p className="text-[27px] font-bold leading-[1.02] tracking-[-0.02em]">Two photos.</p>
      <p className="text-[13px] leading-snug">The outside, opened flat. Then the inside.</p>
      <div className="flex-1" />
      <Small dim>
        The scanner finds the corners, and each photo is flattened to this case&apos;s exact
        millimeters. So the art lands where the printer put it.
      </Small>
    </div>
  ),
  "capture.spine": "YOUR COPY",

  "reads.back": (
    <div className="flex h-full flex-col gap-3 px-6 py-9">
      <Small dim>02</Small>
      <p className="text-[25px] font-bold leading-[1.02] tracking-[-0.02em]">It reads the case.</p>
      <p className="text-[13px] leading-snug">
        The title off the spine. The platform off the banner. The year off the small print.
      </p>
      <Small dim>On your phone, never a server.</Small>
      <div className="flex-1" />
      <div className="flex items-end justify-between gap-3">
        <p className="dc-read text-[7.5px] leading-[1.4] opacity-70">
          © 2026 YOUR COPY.
          <br />
          ALL RIGHTS RESERVED.
        </p>
        <div className="dc-barcode" />
      </div>
    </div>
  ),

  "copy.booklet": (
    <div className="flex h-full flex-col gap-3 px-6 py-9">
      <Small dim>03</Small>
      <p className="text-[25px] font-bold leading-[1.02] tracking-[-0.02em]">Your copy, in 3D.</p>
      <p className="text-[13px] leading-snug">Turn it. Open it. Lift the disc out.</p>
      <div className="flex-1" />
      <Small dim>
        Built from your photos, so it&apos;s your edition, your scuffs, the sticker from the shop
        you bought it at.
      </Small>
    </div>
  ),
  "copy.label": "YOUR COPY",

  "flip.booklet": (
    <div className="flex h-full flex-col gap-3 px-6 py-9">
      <Small dim>04</Small>
      <p className="text-[25px] font-bold leading-[1.02] tracking-[-0.02em]">Flip it.</p>
      <p className="text-[13px] leading-snug">
        The shiny side throws a rainbow that moves with the light.
      </p>
      <div className="flex-1" />
      <Small dim>
        And every case is the one its platform ships in: its size, its thickness, its plastic.
      </Small>
    </div>
  ),

  "shelf.spine": "YOUR SHELF",

  "gallery.front": (
    <div className="flex h-full flex-col gap-3 px-6 py-9">
      <Small dim>COLLECTOR #4821 · CASE #14</Small>
      <p className="text-[25px] font-bold leading-[1.04] tracking-[-0.02em]">
        Everyone&apos;s cases.
        <br />
        <span className="opacity-45">Nobody&apos;s names.</span>
      </p>
      <p className="text-[13px] leading-snug">One gallery, newest first.</p>
      <div className="flex-1" />
      <div className="w-[58%]">
        <Small dim>No usernames, no follows, no like counts.</Small>
      </div>
    </div>
  ),

  // A retail back cover, for the app itself.
  "end.back": (
    <div className="flex h-full flex-col px-6 py-8">
      <p className="text-[19px] font-bold tracking-[-0.01em]">DISC COLLECTION</p>
      <p className="mt-2 text-[13px] leading-snug">
        A photo is flat.
        <br />
        Your case isn&apos;t.
      </p>
      <ul className="mt-5 space-y-1.5 text-[10.5px] leading-snug">
        <li>■ Turn it, open it, take the disc out</li>
        <li>■ Two photos, read on your phone</li>
        <li>■ A private log in your own iCloud</li>
        <li>■ A gallery with no names, no counts</li>
        <li>■ Widgets for your Home Screen</li>
      </ul>
      <div className="flex-1" />
      <div className="flex items-end justify-between gap-3">
        <p className="text-[7.5px] font-medium leading-[1.5] tracking-[0.08em] opacity-70">
          IPHONE · IPAD
          <br />
          NO ACCOUNTS · NO ADS
          <br />
          NO TRACKING
        </p>
        <div className="flex flex-col items-center gap-1">
          <div className="dc-barcode" />
          <p className="text-[6.5px] tracking-[0.2em]">APP STORE</p>
        </div>
      </div>
    </div>
  ),
};

function Print({ face, art }: { face: Face; art: string }) {
  const content = ART[art] ?? null;
  if (face === "spine") {
    return (
      <div key={art} className="dc-ink flex h-full items-center justify-center">
        <span className="dc-spine-print">{content}</span>
      </div>
    );
  }
  if (face === "label") {
    return (
      <span key={art} className="dc-ink dc-label-print">
        {content}
      </span>
    );
  }
  return (
    <div key={art} className="dc-ink h-full">
      {content}
    </div>
  );
}

// ── Chapters ─────────────────────────────────────────────────────────────────

type Pose = "front" | "back" | "spine";
type DiscState = "in" | "label" | "data";

type Chapter = {
  name: string;
  plastic: PlasticKey | "showcase";
  pose: Pose;
  open?: boolean;
  disc?: DiscState;
  /** Open, on a screen too narrow for both halves: the half to keep in view. */
  focus?: "booklet" | "tray";
  /** Closes and whirls on the way in, the way Add does in onboarding. */
  whirl?: boolean;
  /** No paper, no disc: just the plastic. */
  empty?: boolean;
  art: Record<Face, string>;
  /** Over the case, the way onboarding titles the empty one. */
  header?: [string, string];
  caption?: string;
  /** Said under the case only when the booklet carrying it is out of view. */
  narrowCaption?: string;
  shelf?: boolean;
  sticker?: boolean;
  scan?: boolean;
  read?: boolean;
  cta?: boolean;
  zoom?: number;
  /** For screen readers, which can't read print on a case. */
  sr: string;
};

const WELCOME = {
  front: "welcome.front",
  back: "welcome.back",
  spine: "welcome.spine",
  booklet: "welcome.booklet",
  label: "welcome.label",
};
const YOURS = {
  front: "capture.front",
  back: "reads.back",
  spine: "capture.spine",
  booklet: "copy.booklet",
  label: "copy.label",
};

const CHAPTERS: Chapter[] = [
  {
    name: "Welcome",
    plastic: "black",
    pose: "front",
    art: WELCOME,
    sr: "Welcome to your Disc Collection: a 3D display case for the games and movies you own, on iPhone and iPad.",
  },
  {
    name: "Open",
    plastic: "black",
    pose: "front",
    open: true,
    focus: "booklet",
    art: WELCOME,
    sr: "Open it, and the booklet inside reads: Huh. This case seems to be blank. Try adding your own.",
  },
  {
    name: "Empty",
    plastic: "showcase",
    pose: "front",
    whirl: true,
    empty: true,
    art: WELCOME,
    header: ["This one's empty.", "Capture a case from your shelf to make it yours."],
    sr: "This one's empty. Capture a case from your shelf to make it yours. Every platform comes in its own plastic: PlayStation blue, Xbox green, Wii white, black for DVD.",
  },
  {
    name: "Capture",
    plastic: "ps5",
    pose: "front",
    scan: true,
    art: YOURS,
    sr: "Two photos: the outside, opened flat, then the inside. The document scanner finds the corners, and each photo is flattened to the case's exact millimeters.",
  },
  {
    name: "Reads",
    plastic: "ps5",
    pose: "back",
    read: true,
    art: YOURS,
    sr: "It reads the case: the title off the spine, the platform off the banner, the year off the small print. On your phone, never a server.",
  },
  {
    name: "Disc",
    plastic: "ps5",
    pose: "front",
    open: true,
    disc: "label",
    focus: "tray",
    art: YOURS,
    narrowCaption: "Your copy, in 3D. Built from your photos, so it's your edition, your scuffs, your shop sticker.",
    sr: "Your copy, in 3D. Turn it, open it, lift the disc out. Built from your photos, so it's your edition, your scuffs, the sticker from the shop.",
  },
  {
    name: "Flip",
    plastic: "ps5",
    pose: "front",
    open: true,
    disc: "data",
    focus: "tray",
    art: { ...YOURS, booklet: "flip.booklet" },
    narrowCaption: "Flip it, and the shiny side throws a rainbow that moves with the light.",
    sr: "Flip the disc, and the shiny side throws a rainbow that moves with the light. Every case is the one its platform ships in.",
  },
  {
    name: "Shelf",
    plastic: "ps5",
    pose: "spine",
    shelf: true,
    zoom: 0.78,
    art: { ...YOURS, spine: "shelf.spine" },
    header: ["Your whole shelf.", "Without pulling a single case off it."],
    caption:
      "Ratings, hours played, finished or watched, and a review in your own words. Numbered as you add them, synced through your own iCloud.",
    sr: "Your whole shelf, without pulling a case off it. A private log: ratings, hours played, finished or watched, a review in your own words, every case numbered as you add it.",
  },
  {
    name: "Gallery",
    plastic: "xboxSeries",
    pose: "front",
    sticker: true,
    art: { ...YOURS, front: "gallery.front", spine: "shelf.spine" },
    caption:
      "See one you want? Heart it, and it goes on your wish list. Its owner hears only that someone wants it. Never who, never how many.",
    sr: "The Gallery: everyone's cases, nobody's names, newest first. Heart a case to put it on your wish list. Its owner hears only that someone wants one of their cases.",
  },
  {
    name: "Get it",
    plastic: "black",
    pose: "back",
    cta: true,
    art: { ...WELCOME, back: "end.back" },
    sr: "Disc Collection. A photo is flat; your case isn't. On the App Store for iPhone and iPad. No accounts, no ads, no tracking.",
  },
];

/** On the spines beside yours, in the shelf chapter: what the log keeps. */
const SHELF: { print: string; plastic: PlasticKey; h: number }[] = [
  { print: "CASE #1", plastic: "dvd", h: 1.1 },
  { print: "★★★★★", plastic: "xbox360", h: 1 },
  { print: "41 HRS", plastic: "wii", h: 1 },
  { print: "FINISHED", plastic: "xboxSeries", h: 1 },
  { print: "", plastic: "ps5", h: 1 },
  { print: "WATCHED", plastic: "bluRay", h: 1.12 },
  { print: "★★★★☆", plastic: "ps3", h: 1 },
  { print: "1999", plastic: "dvd", h: 1.1 },
  { print: "CASE #214", plastic: "wiiU", h: 1 },
];

const nearest = (from: number, to: number) => to + 360 * Math.round((from - to) / 360);

// ── The stage ────────────────────────────────────────────────────────────────

export function CaseStory({ cta }: { cta: React.ReactNode }) {
  const root = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [view, setView] = React.useState({ w: 1280, h: 820 });
  const [reduced, setReduced] = React.useState(false);
  const [yaw, setYaw] = React.useState(-16);
  const [spin, setSpin] = React.useState(900);
  const [showcase, setShowcase] = React.useState(0);
  const [drag, setDrag] = React.useState({ yaw: 0, pitch: 0 });
  const [dragging, setDragging] = React.useState(false);
  const [openOverride, setOpenOverride] = React.useState<boolean | null>(null);
  const [touched, setTouched] = React.useState(false);
  const last = React.useRef<{ x: number; y: number; touch: boolean } | null>(null);
  const moved = React.useRef(0);

  const chapter = CHAPTERS[index];

  // Which chapter the scroll is in.
  React.useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = root.current;
      if (!el) return;
      const vh = window.innerHeight;
      const step = (el.offsetHeight - vh) / (CHAPTERS.length - 0.5);
      const scrolled = -el.getBoundingClientRect().top;
      setIndex(Math.max(0, Math.min(CHAPTERS.length - 1, Math.round(scrolled / step))));
      setView((v) => (v.w === window.innerWidth && v.h === vh ? v : { w: window.innerWidth, h: vh }));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goTo = (i: number) => {
    const el = root.current;
    if (!el) return;
    const step = (el.offsetHeight - window.innerHeight) / (CHAPTERS.length - 0.5);
    const top = el.getBoundingClientRect().top + window.scrollY + i * step;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  // Each chapter turns the case to its side, the short way round, unless it whirls.
  React.useEffect(() => {
    const c = CHAPTERS[index];
    setDrag({ yaw: 0, pitch: 0 });
    setOpenOverride(null);
    const base = c.pose === "back" ? 164 : c.pose === "spine" ? 90 : c.open ? -4 : -16;
    const whirl = c.whirl && !reduced;
    setSpin(whirl ? 1500 : 900);
    setYaw((y) => nearest(y, base) + (whirl ? 720 : 0));
  }, [index, reduced]);

  // The empty case comes round in a different platform's plastic each half turn.
  React.useEffect(() => {
    if (chapter.plastic !== "showcase") return;
    setShowcase(0);
    const timers: number[] = [];
    const tick = () => {
      if (!reduced) {
        setSpin(1100);
        setYaw((y) => y + 180);
      }
      // Edge-on is where the plastic changes.
      timers.push(window.setTimeout(() => setShowcase((i) => (i + 1) % SHOWCASE.length), reduced ? 0 : 420));
    };
    let interval = 0;
    timers.push(
      window.setTimeout(() => {
        tick();
        interval = window.setInterval(tick, 2100);
      }, reduced ? 1600 : 2000),
    );
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [chapter.plastic, reduced]);

  const open = openOverride ?? !!chapter.open;
  const disc: DiscState = open ? (chapter.disc ?? "in") : "in";
  const plastic: PlasticKey = chapter.plastic === "showcase" ? SHOWCASE[showcase] : chapter.plastic;
  const basePitch = chapter.pose === "spine" ? 0 : open ? -12 : -8;
  const pitch = Math.max(-40, Math.min(30, basePitch + drag.pitch));

  // Framing: the whole open case when there's room, else the half that carries the words.
  const availW = view.w - 32;
  const availH = view.h - (chapter.header ? (view.w < 640 ? 380 : 300) : 240);
  const wide = availW >= 2 * W * 0.8;
  let scale: number;
  let shift = 0;
  if (open && wide) {
    scale = Math.min(1.2, availW / (2 * W + 40), availH / H);
  } else if (open) {
    scale = Math.min(1, availW / (W + 24), availH / H);
    shift = (chapter.focus ?? (disc === "in" ? "booklet" : "tray")) === "tray" ? -W / 2 : W / 2;
  } else {
    scale = Math.min(1.4, availW / (W + 48), availH / H) * (chapter.zoom ?? 1);
  }
  scale = Math.max(0.5, scale);

  const caption = chapter.caption ?? (open && !wide ? chapter.narrowCaption : undefined);

  // Drag to turn, tap to open or close. On touch, only sideways drags turn it, so
  // the page still scrolls under a finger.
  const onPointerDown = (e: React.PointerEvent) => {
    last.current = { x: e.clientX, y: e.clientY, touch: e.pointerType !== "mouse" };
    moved.current = 0;
    setDragging(true);
    setTouched(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    last.current = { ...last.current, x: e.clientX, y: e.clientY };
    setDrag((d) => ({ yaw: d.yaw + dx * 0.5, pitch: last.current?.touch ? d.pitch : d.pitch - dy * 0.3 }));
  };
  const onPointerUp = () => {
    if (last.current && moved.current < 6) setOpenOverride(!open);
    last.current = null;
    setDragging(false);
  };

  const ease = (ms: number, curve = "cubic-bezier(.2,.8,.2,1)") =>
    dragging || reduced ? "none" : `transform ${ms}ms ${curve}`;

  const discTransform =
    disc === "in"
      ? `translateZ(${-T / 2 + 3}px)`
      : disc === "label"
        ? `translateZ(78px) translateY(-12px) rotateX(-10deg)`
        : `translateZ(78px) translateY(-12px) rotateX(-10deg) rotateY(180deg)`;

  return (
    <div
      ref={root}
      className="relative"
      style={{ height: `calc(100vh + ${(CHAPTERS.length - 0.5) * 72}vh)` }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <ol className="sr-only">
        {CHAPTERS.map((c) => (
          <li key={c.name}>{c.sr}</li>
        ))}
      </ol>

      <div className="dc-studio sticky top-0 h-screen overflow-hidden" style={plasticVars(plastic)}>
        <div className="dc-light" aria-hidden />

        {/* Over the case: the onboarding's title, revealed a line at a time. */}
        <div className="absolute inset-x-0 top-[132px] z-10 sm:top-[88px] flex justify-center px-5" aria-hidden>
          {chapter.header && (
            <div key={index} className="max-w-xl text-center text-white">
              <p className="dc-reveal text-[clamp(26px,5vw,40px)] font-bold leading-tight tracking-[-0.02em]">
                {chapter.header[0]}
              </p>
              <p className="dc-reveal mt-2 text-[15px] text-white/60" style={{ animationDelay: "500ms" }}>
                {chapter.header[1]}
              </p>
            </div>
          )}
        </div>

        {/* The case */}
        <div
          className="dc-scene absolute inset-0 flex cursor-grab select-none items-center justify-center active:cursor-grabbing"
          style={{ paddingTop: chapter.header ? (view.w < 640 ? 130 : 70) : 40, touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden
        >
          <div
            className="dc-rig"
            style={{
              transform: `translateX(${shift * scale}px) scale3d(${scale}, ${scale}, ${scale})`,
              transition: reduced ? "none" : "transform 900ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div className={index === 0 && !touched && !reduced ? "dc-sway" : ""} style={{ transformStyle: "preserve-3d" }}>
              <div
                className="dc-case"
                style={{
                  width: W,
                  height: H,
                  transform: `rotateX(${pitch}deg) rotateY(${yaw + drag.yaw}deg) translateX(${open ? W / 2 : 0}px)`,
                  transition: ease(spin, "cubic-bezier(.25,.8,.25,1)"),
                }}
              >
                {/* Base: back cover outside, tray inside */}
                <div className="dc-face dc-shell" style={{ transform: `translateZ(${-T / 2}px) rotateY(180deg)` }}>
                  <Paper hidden={!!chapter.empty}>
                    <Print face="back" art={chapter.art.back} />
                    {chapter.read && <Reading />}
                  </Paper>
                </div>
                <div className="dc-face dc-tray" style={{ transform: `translateZ(${-T / 2 + 1}px)` }}>
                  <div className="dc-hub" />
                </div>

                {/* Thickness */}
                <div className="dc-edge" style={{ width: T, height: H, left: -T / 2, transform: "rotateY(-90deg)" }}>
                  <div className="dc-spine-paper" style={{ opacity: chapter.empty ? 0 : 1 }}>
                    <Print face="spine" art={chapter.art.spine} />
                  </div>
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
                    transition: ease(800, "cubic-bezier(.3,1.25,.4,1)"),
                    opacity: chapter.empty ? 0 : 1,
                  }}
                >
                  <div className="dc-disc-face dc-label">
                    <Print face="label" art={chapter.art.label} />
                  </div>
                  <div className="dc-disc-face dc-data" />
                </div>

                {/* Lid: front cover outside, booklet inside, hinged at the spine */}
                <div
                  className="dc-lid"
                  style={{
                    transform: `translateZ(${T / 2}px) rotateY(${open ? -178 : 0}deg)`,
                    transition: ease(900, "cubic-bezier(.35,1.2,.4,1)"),
                  }}
                >
                  <div className="dc-face dc-shell">
                    <Paper hidden={!!chapter.empty}>
                      <Print face="front" art={chapter.art.front} />
                      {chapter.scan && <ScanCorners />}
                    </Paper>
                    {chapter.sticker && <Sticker />}
                  </div>
                  <div className="dc-face dc-shell" style={{ transform: "rotateY(180deg)" }}>
                    <Paper hidden={!!chapter.empty}>
                      <Print face="booklet" art={chapter.art.booklet} />
                    </Paper>
                  </div>
                </div>
              </div>
            </div>

            {/* The shelf it goes back on: the log, printed on the spines beside it. */}
            <div className="dc-shelf" style={{ transform: `translateZ(${W / 2}px)` }}>
              {SHELF.map(({ print, plastic: p, h }, i) => {
                if (!print) return null;
                const offset = (i - 4) * (T + 3);
                const height = H * h;
                return (
                  <div
                    key={i}
                    className="dc-shelf-spine"
                    style={{
                      ...plasticVars(p),
                      width: T,
                      height,
                      left: offset - T / 2,
                      top: H / 2 - height,
                      opacity: chapter.shelf ? 1 : 0,
                      transform: chapter.shelf ? "none" : `translateY(${40 + Math.abs(i - 4) * 12}px)`,
                      transitionDelay: chapter.shelf ? `${300 + Math.abs(i - 4) * 70}ms` : "0ms",
                    }}
                  >
                    <div className="dc-spine-paper">
                      <span className="dc-spine-print">{print}</span>
                    </div>
                  </div>
                );
              })}
              <div
                className="dc-plank"
                style={{ opacity: chapter.shelf ? 1 : 0, transitionDelay: chapter.shelf ? "200ms" : "0ms" }}
              />
            </div>
          </div>
        </div>

        {/* Under the case */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-10 text-center">
          {index === 0 && (
            <div key="intro" className="dc-reveal flex flex-col items-center gap-4">
              <p className="flex items-center gap-2.5 text-[12px] font-medium text-white/60">
                <Image src={icon} alt="" width={24} height={24} className="h-6 w-6 rounded-[6px]" />
                Disc Collection · for iPhone and iPad
              </p>
              <button
                onClick={() => goTo(1)}
                className="dc-hint flex flex-col items-center gap-1 text-[11px] tracking-[0.2em] text-white/45"
              >
                SCROLL
                <svg viewBox="0 0 12 8" className="h-2 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M1 1.5l5 5 5-5" />
                </svg>
              </button>
            </div>
          )}
          {chapter.plastic === "showcase" && (
            <p key={showcase} className="dc-swap text-[13px] font-medium text-white/60" aria-hidden>
              {PLASTICS[plastic].name}
            </p>
          )}
          {caption && (
            <p key={`c${index}`} className="dc-reveal max-w-md text-[13px] leading-relaxed text-white/65">
              {caption}
            </p>
          )}
          {chapter.cta && (
            <div key="cta" className="dc-reveal flex flex-col items-center gap-3">
              {cta}
              <p className="text-[12px] text-white/45">Put your shelf on display.</p>
            </div>
          )}
        </div>

        {/* Chapters */}
        <nav
          className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1 sm:right-6"
          aria-label="Chapters"
        >
          {CHAPTERS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => goTo(i)}
              aria-label={c.name}
              aria-current={i === index ? "step" : undefined}
              className="group flex items-center justify-end gap-2 py-1"
            >
              <span className="hidden text-[10px] tracking-[0.15em] text-white/0 transition-colors group-hover:text-white/60 sm:inline">
                {c.name.toUpperCase()}
              </span>
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

/** A printed sheet under the plastic. Paper doesn't change in Dark Mode. */
function Paper({ hidden, children }: { hidden: boolean; children: React.ReactNode }) {
  return (
    <div className="dc-paper" style={{ opacity: hidden ? 0 : 1 }}>
      {children}
    </div>
  );
}

/** The document scanner's corners, closing in on the cover. */
function ScanCorners() {
  return (
    <div className="dc-scan" aria-hidden>
      <span className="dc-corner left-1.5 top-1.5 border-l-[3px] border-t-[3px]" />
      <span className="dc-corner right-1.5 top-1.5 border-r-[3px] border-t-[3px]" />
      <span className="dc-corner bottom-1.5 left-1.5 border-b-[3px] border-l-[3px]" />
      <span className="dc-corner bottom-1.5 right-1.5 border-b-[3px] border-r-[3px]" />
      <span className="dc-sweep" />
    </div>
  );
}

/** What Vision found: boxes on the print, with what it read. */
function Reading() {
  return (
    <div className="dc-reading" aria-hidden>
      <span className="dc-box" style={{ left: 18, bottom: 31, width: 108, height: 30 }}>
        <em>YEAR · 2026</em>
      </span>
    </div>
  );
}

/** Stuck on the plastic, the way a shop sticker would be. */
function Sticker() {
  return (
    <div className="dc-sticker" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1z" />
      </svg>
      <span>
        On someone&apos;s
        <br />
        wish list.
      </span>
    </div>
  );
}

const CSS = `
.dc-studio {
  background-color: var(--p-ground);
  transition: background-color 900ms ease;
  color: #fff;
}
.dc-light {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 46% 42% at 50% 46%, rgba(255,255,255,.14), transparent 70%),
    radial-gradient(ellipse 120% 90% at 50% 40%, transparent 45%, rgba(0,0,0,.65));
}
.dc-scene { perspective: 1500px; }
.dc-rig { position: relative; transform-style: preserve-3d; }
.dc-sway { animation: dc-sway 9s ease-in-out infinite; }
@keyframes dc-sway {
  0%, 100% { transform: rotateY(-10deg); }
  50% { transform: rotateY(12deg); }
}

.dc-case, .dc-lid, .dc-disc { position: relative; transform-style: preserve-3d; }
.dc-lid { position: absolute; inset: 0; transform-origin: 0 50%; }
.dc-face, .dc-edge, .dc-disc-face { position: absolute; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.dc-face { inset: 0; border-radius: 7px; overflow: hidden; }

/* The plastic: a rim around the printed sleeve, with a gloss across it. */
.dc-shell {
  background-color: var(--p);
  transition: background-color 700ms ease;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.22), inset 0 1px 14px rgba(255,255,255,.14);
}
.dc-shell::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 5;
  background: linear-gradient(115deg, rgba(255,255,255,.26), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 72%, rgba(255,255,255,.1));
}
.dc-edge {
  background-color: var(--p-edge);
  transition: background-color 700ms ease, opacity .3s;
  box-shadow: inset 0 0 6px rgba(0,0,0,.35);
}
.dc-tray {
  background-color: var(--p-tray);
  transition: background-color 700ms ease;
  background-image:
    radial-gradient(circle at 50% 50%, transparent 0 28px, var(--p-hub) 29px 31px, transparent 32px),
    repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 2px, transparent 2px 6px),
    linear-gradient(160deg, rgba(255,255,255,.12), rgba(0,0,0,.18));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.2);
}
.dc-hub {
  position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; transform: translate(-50%,-50%);
  border-radius: 50%;
  background: repeating-conic-gradient(var(--p-hub) 0 10deg, transparent 10deg 20deg);
}

.dc-paper {
  position: absolute; inset: 7px 8px 7px 11px; border-radius: 2px; overflow: hidden;
  background: #fff; color: #000; font-family: var(--dc-mono);
  transition: opacity 500ms ease;
  box-shadow: 0 0 0 1px rgba(0,0,0,.06);
}
.dc-spine-paper {
  position: absolute; inset: 6px 3px; background: #fff; color: #000; border-radius: 1px;
  font-family: var(--dc-mono); transition: opacity 500ms ease;
}
.dc-spine-print {
  display: block; writing-mode: vertical-rl; white-space: nowrap;
  font-size: 10px; font-weight: 700; letter-spacing: .22em;
}
.dc-ink { animation: dc-ink 650ms ease both; }
@keyframes dc-ink { from { opacity: 0; filter: blur(3px); } }

.dc-barcode {
  width: 64px; height: 30px; flex-shrink: 0;
  background-image: repeating-linear-gradient(90deg, #000 0 2px, transparent 2px 3px, #000 3px 4px, transparent 4px 7px, #000 7px 8px, transparent 8px 10px);
}

.dc-scan { position: absolute; inset: 0; pointer-events: none; }
.dc-corner {
  position: absolute; width: 26px; height: 26px; border-color: #ffcc00; border-radius: 3px;
  animation: dc-corner 900ms cubic-bezier(.2,.8,.2,1) both;
}
@keyframes dc-corner { from { opacity: 0; transform: scale(1.6); } }
.dc-sweep {
  position: absolute; left: 0; right: 0; height: 40px; top: -40px;
  background: linear-gradient(transparent, rgba(255,204,0,.28), transparent);
  animation: dc-sweep 1.6s ease-in-out 400ms both;
}
@keyframes dc-sweep { from { top: -40px; } to { top: 100%; } }

.dc-reading { position: absolute; inset: 0; pointer-events: none; }
.dc-box {
  position: absolute; border: 1.5px dashed #2980ff; border-radius: 3px;
  animation: dc-corner 700ms cubic-bezier(.2,.8,.2,1) 300ms both;
}
.dc-box em {
  position: absolute; left: -1.5px; top: -17px; font-style: normal; white-space: nowrap;
  background: #2980ff; color: #fff; font-size: 8px; font-weight: 700; letter-spacing: .12em;
  padding: 2px 5px; border-radius: 3px;
}

.dc-sticker {
  position: absolute; right: 18px; bottom: 22px; z-index: 6;
  width: 92px; height: 92px; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  background: #fad02e; color: #000; font-family: var(--dc-mono);
  font-size: 9px; font-weight: 700; line-height: 1.2; text-align: center;
  box-shadow: 0 3px 8px rgba(0,0,0,.25), inset 0 0 0 1px rgba(0,0,0,.08);
  transform: rotate(-12deg);
  animation: dc-stick 700ms cubic-bezier(.3,1.5,.5,1) 500ms both;
}
@keyframes dc-stick { from { opacity: 0; transform: rotate(-40deg) scale(1.8); } }

.dc-disc { position: absolute; transition: opacity 400ms; }
.dc-disc-face { inset: 0; border-radius: 50%; }
.dc-label {
  background:
    radial-gradient(circle, rgba(40,40,40,1) 0 7.5%, transparent 7.6%),
    radial-gradient(circle, #c7c7c7 0 18%, transparent 18.2%),
    #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,.08), 0 18px 40px rgba(0,0,0,.35);
  color: #000; font-family: var(--dc-mono);
}
.dc-label-print {
  position: absolute; left: 0; right: 0; top: 19%; text-align: center;
  font-size: 11px; font-weight: 700; letter-spacing: .22em;
}
.dc-data {
  transform: rotateY(180deg);
  background:
    radial-gradient(circle, transparent 0 7.5%, rgba(255,255,255,.75) 7.6% 18%, transparent 18.2%),
    conic-gradient(from 0deg, #c9d2df, #ff9ad5, #9be7ff, #fff3a8, #b5ffb0, #c9d2df, #a6b8ff, #ffb0a0, #c9d2df);
  box-shadow: 0 0 0 1px rgba(255,255,255,.5), 0 18px 40px rgba(0,0,0,.35);
  animation: dc-shimmer 6s linear infinite;
}
@keyframes dc-shimmer { to { filter: hue-rotate(360deg); } }

.dc-shelf { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform-style: preserve-3d; pointer-events: none; }
.dc-shelf-spine {
  position: absolute; border-radius: 2px;
  background-color: var(--p-edge);
  box-shadow: inset 0 0 6px rgba(0,0,0,.35);
  transition: opacity 600ms ease, transform 800ms cubic-bezier(.2,.8,.2,1);
}
.dc-shelf-spine .dc-spine-paper { display: flex; align-items: center; justify-content: center; }
.dc-plank {
  position: absolute; left: -150px; width: 300px; top: ${H / 2}px; height: 12px; border-radius: 2px;
  background: linear-gradient(180deg, #3a2b20, #1d150f);
  box-shadow: 0 16px 30px rgba(0,0,0,.5);
  transition: opacity 600ms ease;
}

.dc-reveal { animation: dc-reveal 900ms linear both; }
@keyframes dc-reveal { from { opacity: 0; filter: blur(6px); transform: translateY(6px); } to { opacity: 1; filter: none; transform: none; } }
.dc-swap { animation: dc-reveal 500ms ease both; }
.dc-hint svg { animation: dc-bob 1.8s ease-in-out infinite; }
@keyframes dc-bob { 50% { transform: translateY(4px); } }

@media (prefers-reduced-motion: reduce) {
  .dc-sway, .dc-data, .dc-hint svg, .dc-sweep { animation: none; }
  .dc-reveal, .dc-swap, .dc-ink, .dc-corner, .dc-box, .dc-sticker { animation-duration: 1ms; animation-delay: 0ms; }
}
`;
