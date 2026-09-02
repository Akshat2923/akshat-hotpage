"use client";

import * as React from "react";
import {
  Activity,
  ArrowDownCircle,
  BadgeCheck,
  Brush,
  Camera,
  Carrot,
  Circle,
  Droplet,
  Hand,
  MessageCircleQuestion,
  MessageSquare,
  MoonStar,
  MoveHorizontal,
  Pause,
  Play,
  Search,
  Sparkles,
  Volume2,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  CATEGORY_ORDER,
  PLAYTIMES,
  RING,
  WAGS,
  type PlaytimeType,
  type RingKey,
  type WagKey,
} from "../_lib/zoomie-data";
import { PawRings } from "./PawRings";
import { PlaytimeStage } from "./PlaytimeStage";
import { useZoomieFx } from "./ZoomieFx";

const ICONS: Record<string, LucideIcon> = {
  Volume2,
  Droplet,
  MoveHorizontal,
  Carrot,
  Circle,
  ArrowDownCircle,
  Zap,
  MoonStar,
  Hand,
  Sparkles,
  BadgeCheck,
  MessageCircleQuestion,
  Brush,
  Search,
  Activity,
  Camera,
  MessageSquare,
};

// A day's goals, at the numbers the app ships with. The clock is compressed —
// a real 45-minute session would make for a long afternoon on a portfolio site
// — but everything else behaves the way the app does.
const TARGETS = { paws: 8000, playtime: 45, wags: 8 };
const SECONDS_TO_CLOSE = 50;
const LINE_EVERY = 4200;

function clock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WagIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Circle;
  return <Cmp className={className} strokeWidth={2.4} />;
}

type Floater = { id: number; label: string; icon: string; x: number };

/** The app's Playtime tab. Memoised for the same reason the stage is. */
const PlaytimeList = React.memo(function PlaytimeList({
  activeId,
  onPick,
}: {
  activeId: string;
  onPick: (t: PlaytimeType) => void;
}) {
  return (
    <div className="rounded-[26px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-3">
      <div className="px-2 pb-2 pt-1">
        <p className="text-[26px] font-extrabold leading-none tracking-tight text-[var(--zm-text)]">
          Playtime
        </p>
        <p className="text-xs text-[var(--zm-faint)]">9 kinds, 3 moods</p>
      </div>

      {/* Only the two-column layout needs this to scroll on its own; on a
          phone a nested scroller just fights the page. */}
      <div className="space-y-3 lg:max-h-[430px] lg:overflow-y-auto lg:pr-1">
        {CATEGORY_ORDER.map((category) => (
          <div key={category}>
            <p className="px-2 pb-1.5 text-sm font-bold text-[var(--zm-faint)]">
              {category}
            </p>
            <div className="overflow-hidden rounded-2xl bg-[var(--zm-inset)]">
              {PLAYTIMES.filter((p) => p.category === category).map(
                (p, i, arr) => {
                  const active = p.id === activeId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onPick(p)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        active ? "bg-[var(--zm-active)]" : "hover:bg-[var(--zm-hover)]"
                      } ${i < arr.length - 1 ? "border-b border-[var(--zm-line-soft)]" : ""}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-[var(--zm-text)]">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-[var(--zm-faint)]">
                          {p.tagline}
                        </span>
                      </span>
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                        style={{
                          background: active
                            ? RING.playtime.color
                            : "rgba(0,236,75,.14)",
                        }}
                      >
                        <Play
                          className="h-4 w-4 translate-x-px"
                          fill={active ? "#04140a" : RING.playtime.color}
                          stroke="none"
                        />
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export function SessionConsole() {
  const { unleash } = useZoomieFx();
  const [type, setType] = React.useState<PlaytimeType>(PLAYTIMES[0]);
  const [status, setStatus] = React.useState<"idle" | "running" | "paused">(
    "idle",
  );
  const [elapsed, setElapsed] = React.useState(0);
  const [wags, setWags] = React.useState(0);
  const [lineIndex, setLineIndex] = React.useState(0);
  const [floaters, setFloaters] = React.useState<Floater[]>([]);
  const [closed, setClosed] = React.useState(false);
  const floatId = React.useRef(0);

  // Clock. Driven off wall time rather than by accumulating ticks, so a
  // dropped frame or a throttled interval can't quietly lose seconds.
  const runSince = React.useRef(0);
  const banked = React.useRef(0);

  React.useEffect(() => {
    if (status !== "running") return;
    runSince.current = performance.now();
    const id = setInterval(() => {
      setElapsed(
        banked.current + (performance.now() - runSince.current) / 1000,
      );
    }, 100);
    return () => {
      banked.current += (performance.now() - runSince.current) / 1000;
      clearInterval(id);
    };
  }, [status]);

  // Commentary, in the order the app's scenes narrate it.
  React.useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(
      () => setLineIndex((i) => (i + 1) % type.lines.length),
      LINE_EVERY,
    );
    return () => clearInterval(id);
  }, [status, type]);

  const progress: Record<RingKey, number> = React.useMemo(() => {
    const t = Math.min(elapsed / SECONDS_TO_CLOSE, 1);
    return {
      playtime: t,
      paws: type.tracksPaws ? t : 0,
      wags: Math.min(wags / TARGETS.wags, 1),
    };
  }, [elapsed, wags, type.tracksPaws]);

  const values = {
    playtime: Math.round(progress.playtime * TARGETS.playtime),
    paws: Math.round(progress.paws * TARGETS.paws),
    wags,
  };

  // All three closed is the whole point of the app, so it gets a moment.
  const allClosed =
    progress.paws >= 1 && progress.playtime >= 1 && progress.wags >= 1;
  React.useEffect(() => {
    if (allClosed && !closed) {
      setClosed(true);
      unleash();
    }
  }, [allClosed, closed, unleash]);

  const reset = React.useCallback((next: PlaytimeType) => {
    banked.current = 0;
    setType(next);
    setStatus("idle");
    setElapsed(0);
    setWags(0);
    setLineIndex(0);
    setClosed(false);
  }, []);

  const logWag = (key: WagKey) => {
    if (status === "idle") return;
    setWags((w) => w + 1);
    const id = floatId.current++;
    setFloaters((f) => [
      ...f,
      { id, label: WAGS[key].label, icon: WAGS[key].icon, x: Math.random() * 60 + 20 },
    ]);
    setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1000);
  };

  const running = status === "running";
  const quickActions: WagKey[] = [...type.quickActions, "photo"];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      <style>{`
        @keyframes zm-float { to { transform: translateY(-72px) scale(1.25); opacity: 0; } }
        @keyframes zm-line-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .zm-float { animation: zm-float .95s cubic-bezier(.22,1,.36,1) forwards; }
        .zm-line { animation: zm-line-in .45s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .zm-float { animation-duration: .01ms; }
          .zm-line { animation: none; }
        }
      `}</style>

      <PlaytimeList activeId={type.id} onPick={reset} />

      {/* ── The live session ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-[26px] border border-[var(--zm-line)] bg-black">
          <div className="h-[240px] sm:h-[280px]">
            <PlaytimeStage stage={type.stage} typeId={type.id} running={running} />
          </div>

          {/* Dynamic Island, mirroring the Live Activity */}
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
            <div
              className={`flex items-center gap-2.5 rounded-full bg-black/90 px-4 py-1.5 shadow-lg ring-1 ring-white/10 backdrop-blur transition-opacity ${
                status === "idle" ? "opacity-0" : "opacity-100"
              }`}
            >
              {running ? (
                <span
                  className="h-2 w-2 animate-pulse rounded-full"
                  style={{ background: RING.playtime.color }}
                />
              ) : (
                <Pause className="h-3 w-3 text-yellow-400" fill="currentColor" stroke="none" />
              )}
              <span className="text-xs font-semibold text-white/80">
                {type.verb} Percy
              </span>
              <span
                className="font-mono text-sm font-bold tabular-nums"
                style={{ color: RING.wags.color }}
              >
                {clock(elapsed)}
              </span>
            </div>
          </div>

          {/* Scene commentary */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[92px] flex justify-center px-4">
            <p
              key={`${type.id}-${lineIndex}`}
              className="zm-line max-w-full truncate rounded-full bg-black/55 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm"
            >
              {status === "idle"
                ? type.tagline
                : type.lines[lineIndex % type.lines.length]}
            </p>
          </div>

          {/* The app's session control bar */}
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#141416]/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setStatus((s) => (s === "running" ? "paused" : "running"))
                }
                aria-label={running ? "Pause playtime" : "Start playtime"}
                className="grid h-11 w-11 place-items-center rounded-full transition-transform active:scale-90"
                style={{ background: running ? "#F2CC33" : RING.playtime.color }}
              >
                {running ? (
                  <Pause className="h-5 w-5 text-black" fill="currentColor" stroke="none" />
                ) : (
                  <Play className="h-5 w-5 translate-x-px text-black" fill="currentColor" stroke="none" />
                )}
              </button>

              <span
                className="font-mono text-3xl font-bold tabular-nums"
                style={{ color: RING.playtime.color }}
              >
                {clock(elapsed)}
              </span>

              <button
                onClick={() => logWag("photo")}
                aria-label="Log a photo wag"
                className="grid h-11 w-11 place-items-center rounded-full transition-transform active:scale-90"
                style={{ background: RING.wags.color }}
              >
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions — this type's own, in its own order */}
        <div className="relative rounded-[26px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-sm font-bold text-[var(--zm-text)]">Quick actions</p>
            <p className="text-xs text-[var(--zm-faint)]">
              {status === "idle" ? "press play first" : "every tap is a wag"}
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-16 z-10">
            {floaters.map((f) => (
              <div
                key={f.id}
                className="zm-float absolute flex flex-col items-center text-[var(--zm-text)]"
                style={{ left: `${f.x}%` }}
              >
                <WagIcon name={f.icon} className="h-6 w-6" />
                <span className="text-[10px] font-semibold">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2">
            {quickActions.map((key) => (
              <button
                key={key}
                onClick={() => logWag(key)}
                disabled={status === "idle"}
                className="group flex flex-col items-center gap-1.5 rounded-xl py-2 transition-transform enabled:active:scale-90 disabled:opacity-35"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-[var(--zm-chip)] text-[var(--zm-chip-ink)] transition-colors group-enabled:group-hover:bg-[var(--zm-chip-hover)]"
                  style={
                    key === "photo"
                      ? { background: RING.wags.color, color: "#fff" }
                      : undefined
                  }
                >
                  <WagIcon name={WAGS[key].icon} className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-medium text-[var(--zm-muted)]">
                  {WAGS[key].label}
                </span>
              </button>
            ))}
          </div>

          {/* Always rendered, disabled when there's nothing to end — the same
              way the quick actions above behave. Mounting it only mid-session
              made the card change height and left a gap under the grid. */}
          <button
            onClick={() => reset(type)}
            disabled={status === "idle"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF4A4A] py-3 text-base font-bold text-white transition-transform enabled:active:scale-[0.98] disabled:opacity-35"
          >
            <X className="h-5 w-5" strokeWidth={3} />
            End Playtime
          </button>
        </div>
      </div>

      {/* ── Rings, filling for real ───────────────────────────────────── */}
      <div className="lg:col-span-2">
        <div className="flex flex-col items-center gap-6 rounded-[26px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-6 sm:flex-row sm:gap-10 sm:p-8">
          <PawRings
            progress={progress}
            size={196}
            fillMs={340}
            className="shrink-0"
          />

          <div className="w-full space-y-4">
            <div>
              <p className="text-xl font-extrabold tracking-tight text-[var(--zm-text)]">
                {closed ? "Zoomie closed." : "Percy's Zoomie"}
              </p>
              <p className="text-sm text-[var(--zm-faint)]">
                {closed
                  ? "All three rings, in one session. That earns a Treat."
                  : "Three rings, filling as you play."}
              </p>
            </div>

            {(["paws", "playtime", "wags"] as RingKey[]).map((key) => (
              <div key={key}>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--zm-muted)]">
                    {RING[key].label}
                  </span>
                  <span
                    className="font-mono text-lg font-bold tabular-nums"
                    style={{ color: RING[key].ink }}
                  >
                    {values[key].toLocaleString()} / {TARGETS[key].toLocaleString()}{" "}
                    <span className="text-xs">{RING[key].unit}</span>
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--zm-track)]">
                  <div
                    className="h-full rounded-full transition-[width] duration-300"
                    style={{
                      width: `${progress[key] * 100}%`,
                      background: RING[key].color,
                    }}
                  />
                </div>
                {key === "paws" && !type.tracksPaws && (
                  <p className="mt-1 text-[11px] text-[var(--zm-dim)]">
                    {type.name} doesn&apos;t track paws — a session of tug isn&apos;t a distance.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
