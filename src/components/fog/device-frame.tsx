"use client";

//
//  device-frame.tsx
//  The hardware the app runs on.
//
//  Without it the demo reads as a card with an app inside; with it, it reads as the app.
//  The frame is deliberately quiet — no reflections, no gloss, no drop shadow theatre —
//  because it is a container, not the subject. What it buys is a silhouette the eye already
//  knows, which is what lets the screen inside be taken literally.
//
//  Fluid rather than fixed: the app in here is real HTML, so it reflows on a narrow screen
//  the way it would on a smaller phone. A scaled screenshot could not do that.
//

import * as React from "react";

export function DeviceFrame({ children }: { children: React.ReactNode }) {
  const [time, setTime] = React.useState("");

  // The status bar reads the real clock — the one detail that says "now" rather than
  // "mockup". Set after mount: a server-rendered clock is the server's timezone.
  React.useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, ""),
      );
    tick();
    const timer = window.setInterval(tick, 20_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[372px]">
      {/* Side buttons. Four small details doing most of the work of "this is a phone". */}
      <span className="absolute -left-[3px] top-[112px] h-8 w-[3px] rounded-l-sm bg-neutral-700 dark:bg-neutral-600" />
      <span className="absolute -left-[3px] top-[164px] h-14 w-[3px] rounded-l-sm bg-neutral-700 dark:bg-neutral-600" />
      <span className="absolute -left-[3px] top-[232px] h-14 w-[3px] rounded-l-sm bg-neutral-700 dark:bg-neutral-600" />
      <span className="absolute -right-[3px] top-[196px] h-24 w-[3px] rounded-r-sm bg-neutral-700 dark:bg-neutral-600" />

      <div
        className="relative rounded-[54px] p-[11px]"
        style={{
          background: "linear-gradient(160deg, #4a4a4f 0%, #232326 28%, #1a1a1c 62%, #3a3a3f 100%)",
          boxShadow:
            "0 2px 3px rgba(255,255,255,0.16) inset, 0 -2px 3px rgba(0,0,0,0.5) inset, 0 40px 80px -32px rgba(0,0,0,0.55), 0 8px 24px -12px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative flex h-[724px] flex-col overflow-hidden rounded-[44px] bg-[var(--fog-page)] sm:h-[764px]">
          {/* Status bar */}
          <div className="relative z-30 flex h-[46px] shrink-0 items-center justify-between px-7 pt-2 text-[13px] font-semibold text-[var(--fog-label)]">
            <span className="tabular-nums">{time || " "}</span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                <rect x="0" y="7.5" width="3" height="3.5" rx="1" />
                <rect x="4.6" y="5.5" width="3" height="5.5" rx="1" />
                <rect x="9.2" y="3" width="3" height="8" rx="1" />
                <rect x="13.8" y="0" width="3" height="11" rx="1" />
              </svg>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                <path d="M8 10.6 6.1 8.5a2.8 2.8 0 0 1 3.8 0L8 10.6Z" />
                <path
                  d="M3.6 6.1a6.6 6.6 0 0 1 8.8 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M1 3.3a10.4 10.4 0 0 1 14 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" opacity="0.35" />
                <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
                <path d="M23 4v4a2.1 2.1 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
              </svg>
            </span>
          </div>

          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-[11px] z-40 h-[31px] w-[112px] -translate-x-1/2 rounded-full bg-black" />

          <div className="relative min-h-0 flex-1">{children}</div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-40 h-[5px] w-[132px] -translate-x-1/2 rounded-full bg-[var(--fog-label)] opacity-30" />
        </div>
      </div>
    </div>
  );
}
