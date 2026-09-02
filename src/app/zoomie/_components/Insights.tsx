"use client";

import * as React from "react";
import { RING, type RingKey } from "../_lib/zoomie-data";

// Hour-by-hour bars and a twelve-week heat map, the two charts the app's
// progress detail screen is built out of. Data is seeded rather than random
// so the server and the client draw the same dog's week.

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOURS = (() => {
  const rand = mulberry32(26);
  // Dogs are busy in the morning and again after work; the middle of the day
  // is a nap.
  const shape = [
    0, 0, 0, 0, 0, 0.1, 0.5, 0.95, 0.7, 0.25, 0.15, 0.2, 0.25, 0.2, 0.15, 0.2,
    0.35, 0.6, 0.8, 0.55, 0.3, 0.15, 0.05, 0,
  ];
  return shape.map((s) => Math.round(s * 6000 * (0.75 + rand() * 0.5)));
})();

const WEEKS = 12;
const HEAT = (() => {
  const rand = mulberry32(7);
  return Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: WEEKS }, (_, week) => {
      // The habit builds: early weeks are patchy, recent ones are solid.
      const ramp = week / (WEEKS - 1);
      const weekend = day === 0 || day === 6 ? 0.2 : 0;
      const v = rand() * 0.34 + ramp * 0.82 + weekend;
      return Math.max(0, Math.min(v, 1));
    }),
  );
})();

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Panel({
  title,
  sub,
  value,
  ring,
  children,
}: {
  title: string;
  sub: string;
  value: string;
  ring: RingKey;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#0c0c0e] p-5">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-xs text-white/40">{sub}</p>
      <p
        className="mt-1 font-mono text-3xl font-bold tabular-nums"
        style={{ color: RING[ring].color }}
      >
        {value}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Insights() {
  const max = Math.max(...HOURS);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Hour by Hour" sub="Paws, today" value="6,400" ring="paws">
        <div className="flex h-32 items-end gap-[3px]">
          {HOURS.map((h, i) => (
            <div
              key={i}
              className="group relative flex-1 rounded-sm transition-opacity hover:opacity-100"
              style={{
                height: `${Math.max((h / max) * 100, 2)}%`,
                background: RING.paws.color,
                opacity: h === 0 ? 0.12 : 0.55 + (h / max) * 0.45,
              }}
              title={`${i}:00 — ${h.toLocaleString()} paws`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-white/30">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
        </div>
      </Panel>

      <Panel
        title="Last 12 Weeks"
        sub="Ring completion"
        value="68%"
        ring="paws"
      >
        <div className="flex gap-1.5">
          <div className="flex flex-col justify-between py-[1px] text-[9px] leading-none text-white/30">
            {DAYS.map((d) => (
              <span key={d} className="h-[14px] leading-[14px]">
                {d}
              </span>
            ))}
          </div>
          <div className="flex-1 space-y-[3px]">
            {HEAT.map((row, r) => (
              <div key={r} className="flex gap-[3px]">
                {row.map((v, c) => (
                  <div
                    key={c}
                    className="h-[14px] flex-1 rounded-[3px]"
                    style={{
                      background: RING.paws.color,
                      opacity: 0.08 + v * 0.92,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between pl-6 text-[10px] text-white/30">
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
        </div>
      </Panel>
    </div>
  );
}
