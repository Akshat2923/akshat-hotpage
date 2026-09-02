"use client";

import * as React from "react";
import { Camera, RotateCcw } from "lucide-react";
import { EMOJI_PALETTE, JOINTS, RING } from "../_lib/zoomie-data";

// The app runs VNDetectAnimalBodyPoseRequest over a still photo, drops a
// tappable target on every joint it finds, and lets you hang an emoji off
// each one. Every emoji is a wag. This is that flow, with a drawn dog
// standing in for the photo — the joint coordinates are where Vision
// actually tends to put them.

function DogSubject() {
  // viewBox is 0–100 on both axes so JOINTS coordinates map straight on.
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="zm-coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8A46B" />
          <stop offset="100%" stopColor="#B07C42" />
        </linearGradient>
      </defs>

      {/* far legs */}
      <rect x="42" y="58" width="6" height="30" rx="3" fill="#96652F" />
      <rect x="78" y="58" width="6" height="30" rx="3" fill="#96652F" />
      {/* tail */}
      <path
        d="M80 44 q14 -6 15 -20"
        stroke="url(#zm-coat)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {/* body */}
      <ellipse cx="60" cy="52" rx="25" ry="16" fill="url(#zm-coat)" />
      {/* neck */}
      <path d="M40 40 q2 12 10 14 l0 -18z" fill="url(#zm-coat)" />
      {/* near legs */}
      <rect x="34" y="58" width="7" height="31" rx="3.5" fill="url(#zm-coat)" />
      <rect x="72" y="58" width="7" height="31" rx="3.5" fill="url(#zm-coat)" />
      <ellipse cx="37.5" cy="89" rx="5" ry="3" fill="#96652F" />
      <ellipse cx="75.5" cy="89" rx="5" ry="3" fill="#96652F" />
      {/* head */}
      <circle cx="32" cy="34" r="12" fill="url(#zm-coat)" />
      <ellipse cx="20" cy="40" rx="9" ry="6" fill="url(#zm-coat)" />
      <circle cx="13" cy="39" r="2.6" fill="#2E2119" />
      <circle cx="30" cy="31" r="2" fill="#2E2119" />
      {/* ears */}
      <path d="M29 23 q-4 -9 4 -8 q4 3 1 9z" fill="#96652F" />
      <path d="M38 21 q1 -9 7 -5 q2 4 -2 8z" fill="#96652F" />
      {/* tongue, because it is always out */}
      <ellipse cx="16" cy="45" rx="3" ry="4" fill="#E0768C" />
    </svg>
  );
}

export function WagPhotoEditor() {
  const [scanned, setScanned] = React.useState(false);
  const [placed, setPlaced] = React.useState<Record<string, string>>({});
  const [open, setOpen] = React.useState<string | null>(null);
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    const id = setTimeout(() => setScanned(true), 900);
    return () => clearTimeout(id);
  }, []);

  const count = Object.keys(placed).length;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
      <style>{`
        @keyframes zm-scan { 0% { transform: translateY(-6%); opacity:0 } 12%{opacity:1} 88%{opacity:1} 100% { transform: translateY(106%); opacity:0 } }
        @keyframes zm-joint-in { from { opacity:0; transform: scale(.3) } to { opacity:1; transform: scale(1) } }
        @keyframes zm-pop { 0% { transform: scale(.2) rotate(-25deg) } 60% { transform: scale(1.25) rotate(6deg) } 100% { transform: scale(1) rotate(0) } }
        .zm-scan { animation: zm-scan 1.6s ease-in-out; }
        .zm-joint { animation: zm-joint-in .4s cubic-bezier(.34,1.56,.64,1) both; }
        .zm-pop { animation: zm-pop .5s cubic-bezier(.34,1.56,.64,1); }
        @media (prefers-reduced-motion: reduce) {
          .zm-scan { animation: none; opacity: 0 }
          .zm-joint, .zm-pop { animation: none; }
        }
      `}</style>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-[var(--zm-line)] bg-gradient-to-b from-[#2b2620] to-[#15120f]">
        {/* a floor, so the dog isn't levitating */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[#3a3229]" />
        <div className="absolute inset-0 p-[4%]">
          <DogSubject />
        </div>

        {!scanned && (
          <div className="zm-scan absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-[#008CFF]/30 to-transparent" />
        )}

        {/* Vision's joint targets */}
        {scanned &&
          JOINTS.map((j, i) => {
            const emoji = placed[j.id];
            return (
              <div
                key={j.id}
                className="absolute"
                style={{
                  left: `${j.x}%`,
                  top: `${j.y}%`,
                  transform: "translate(-50%,-50%)",
                }}
              >
                {emoji ? (
                  <button
                    onClick={() => setOpen(open === j.id ? null : j.id)}
                    className="zm-pop text-2xl drop-shadow-lg sm:text-3xl"
                    aria-label={`${j.label}: ${emoji}`}
                  >
                    {emoji}
                  </button>
                ) : (
                  <button
                    onClick={() => setOpen(open === j.id ? null : j.id)}
                    aria-label={`Add an emoji at ${j.label}`}
                    className="zm-joint grid h-6 w-6 place-items-center rounded-full border-2 transition-transform hover:scale-125 active:scale-95"
                    style={{
                      animationDelay: `${i * 55}ms`,
                      borderColor: RING.wags.color,
                      background: "rgba(0,140,255,.22)",
                      boxShadow: `0 0 12px ${RING.wags.color}66`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </button>
                )}

                {open === j.id && (
                  <div
                    // Kept inside the frame: joints near an edge anchor to it
                    // rather than centring and hanging off the photo.
                    className={`absolute z-20 w-[196px] rounded-2xl border border-white/10 bg-[#1a1a1c]/95 p-2 shadow-2xl backdrop-blur ${
                      j.y > 68 ? "bottom-8" : "top-8"
                    } ${
                      j.x < 24
                        ? "left-0"
                        : j.x > 76
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <p className="px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">
                      {j.label}
                    </p>
                    <div className="grid grid-cols-5 gap-1">
                      {EMOJI_PALETTE.map((e) => (
                        <button
                          key={e}
                          onClick={() => {
                            setPlaced((p) => ({ ...p, [j.id]: e }));
                            setOpen(null);
                          }}
                          className="grid h-8 place-items-center rounded-lg text-lg transition-colors hover:bg-white/10"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    {emoji && (
                      <button
                        onClick={() => {
                          setPlaced((p) => {
                            const next = { ...p };
                            delete next[j.id];
                            return next;
                          });
                          setOpen(null);
                        }}
                        className="mt-1 w-full rounded-lg py-1 text-[11px] text-white/45 hover:bg-white/5"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur">
          <Camera className="h-3 w-3" />
          {scanned
            ? `${JOINTS.length} joints detected`
            : "Detecting animal body pose…"}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[26px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-4">
        <div>
          <p className="text-sm font-bold text-[var(--zm-text)]">Photo Wag</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--zm-faint)]">
            Vision finds the joints. You decide what goes on them. Both the
            emoji and the note are optional — save at any point.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--zm-inset)] p-3">
          <p className="font-mono text-3xl font-bold" style={{ color: RING.wags.ink }}>
            {count}
            <span className="ml-1 text-sm text-[var(--zm-faint)]">
              {count === 1 ? "wag" : "wags"}
            </span>
          </p>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Add a note…"
          className="resize-none rounded-xl border border-[var(--zm-line)] bg-[var(--zm-inset)] p-3 text-sm text-[var(--zm-text)] placeholder:text-[var(--zm-dim)] focus:border-[var(--zm-line)] focus:outline-none"
        />

        <button
          onClick={() => {
            setPlaced({});
            setNote("");
            setOpen(null);
          }}
          className="mt-auto flex items-center justify-center gap-2 rounded-full border border-[var(--zm-line)] py-2.5 text-sm font-semibold text-[var(--zm-muted)] transition-colors hover:bg-[var(--zm-hover)]"
        >
          <RotateCcw className="h-4 w-4" />
          Start over
        </button>
      </div>
    </div>
  );
}
