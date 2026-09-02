"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { RING, TREATS, type Treat } from "../_lib/zoomie-data";

// Treats are the app's achievements, and they're rendered as liquid-metal
// coins tinted by whichever ring they're measuring — a treat about Paws comes
// out orange, one about the whole Zoomie comes out all three at once. The
// blob is deliberately not a circle; neither is the app's.

function coinBackground(treat: Treat) {
  const stops = treat.rings.map((r) => RING[r].color);
  const wheel =
    stops.length === 1
      ? [stops[0], "#ffffff", stops[0], "#6b6b6b", stops[0]]
      : [...stops, ...stops, stops[0]];
  return `conic-gradient(from 210deg, ${wheel.join(", ")})`;
}

function TreatCoin({ treat }: { treat: Treat }) {
  return (
    <div
      className={`group relative flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition-colors ${
        treat.earned ? "hover:bg-white/[0.04]" : ""
      }`}
    >
      <div className="relative h-24 w-24">
        <div
          className={`zm-coin absolute inset-0 transition-all duration-500 ${
            treat.earned
              ? "opacity-100 group-hover:scale-110"
              : "opacity-40 grayscale"
          }`}
          style={{ background: coinBackground(treat) }}
        />
        {/* inner face */}
        <div
          className="zm-coin absolute inset-[22%] grid place-items-center backdrop-blur-sm"
          style={{
            background: treat.earned
              ? "rgba(255,255,255,.28)"
              : "rgba(255,255,255,.06)",
          }}
        >
          {treat.earned ? (
            <span className="text-2xl drop-shadow">⭐️</span>
          ) : (
            <Lock className="h-5 w-5 text-white/40" />
          )}
        </div>
      </div>

      <div>
        <p
          className={`text-sm font-bold ${
            treat.earned ? "text-white" : "text-white/40"
          }`}
        >
          {treat.name}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-white/40">
          {treat.description}
        </p>
      </div>
    </div>
  );
}

export function TreatVault() {
  const [showLocked, setShowLocked] = React.useState(true);
  const shown = showLocked ? TREATS : TREATS.filter((t) => t.earned);

  return (
    <div>
      <style>{`
        .zm-coin {
          border-radius: 46% 54% 52% 48% / 50% 44% 56% 50%;
          animation: zm-morph 9s ease-in-out infinite;
          filter: blur(.2px);
        }
        @keyframes zm-morph {
          0%,100% { border-radius: 46% 54% 52% 48% / 50% 44% 56% 50%; transform: rotate(0deg) }
          50% { border-radius: 54% 46% 45% 55% / 44% 56% 44% 56%; transform: rotate(8deg) }
        }
        @media (prefers-reduced-motion: reduce) { .zm-coin { animation: none } }
      `}</style>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/45">
          <span className="font-bold text-white">
            {TREATS.filter((t) => t.earned).length}
          </span>{" "}
          of {TREATS.length} shown here — the full catalog runs to about thirty,
          across Streaks, Firsts, Totals, Overachiever and Variety.
        </p>
        <button
          onClick={() => setShowLocked((s) => !s)}
          className="shrink-0 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/5"
        >
          {showLocked ? "Earned only" : "Show locked"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((t) => (
          <TreatCoin key={t.name} treat={t} />
        ))}
      </div>
    </div>
  );
}
