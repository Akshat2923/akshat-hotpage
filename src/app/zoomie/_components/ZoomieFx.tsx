"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { RainingDogs, type RainHandle } from "./RainingDogs";

const FxContext = React.createContext<{ unleash: () => void }>({
  unleash: () => {},
});

export const useZoomieFx = () => React.useContext(FxContext);

/**
 * Renders into document.body rather than in place.
 *
 * The site wraps every page in a framer-motion div, and a transformed
 * ancestor becomes the containing block for `position: fixed` descendants —
 * so a "fixed" backdrop here would size itself against a 7,000px-tall page
 * instead of the viewport. Portalling out sidesteps that entirely.
 */
function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// The page's own palette. Defined here rather than in globals.css because
// these only exist while this page is mounted — the style element goes with
// it. Dark is Zoomie's own OLED black; light borrows the soft grey the App
// Store screenshots are set on.
//
// Ring hues split in two: `--zm-*-fill` is the brand colour and is used for
// anything painted (gauges, bars, the play button), while `--zm-*-ink` is the
// same hue darkened enough to read as text. #00EC4B on white is about 1.7:1,
// which is unreadable, so light mode can't use the fill colour for type.
const PALETTE = `
  :root {
    --zm-bg: #f5f5f7;
    --zm-card: #ffffff;
    --zm-inset: #ececef;
    --zm-line: rgba(0,0,0,.10);
    --zm-line-soft: rgba(0,0,0,.07);
    --zm-text: #0a0a0b;
    --zm-muted: rgba(0,0,0,.60);
    --zm-faint: rgba(0,0,0,.45);
    --zm-dim: rgba(0,0,0,.30);
    --zm-track: rgba(0,0,0,.10);
    --zm-hover: rgba(0,0,0,.04);
    --zm-active: rgba(0,0,0,.06);
    --zm-chip: #e4e6ea;
    --zm-chip-hover: #d6d9df;
    --zm-chip-ink: #3a4750;
    --zm-ring-shadow: drop-shadow(0 2px 10px rgba(0,0,0,.14));
    --zm-gauge-track: .3;
    --zm-paws-ink: #b35600;
    --zm-playtime-ink: #007a35;
    --zm-wags-ink: #0064c8;
  }
  .dark {
    --zm-bg: #050506;
    --zm-card: #0c0c0e;
    --zm-inset: #161618;
    --zm-line: rgba(255,255,255,.10);
    --zm-line-soft: rgba(255,255,255,.06);
    --zm-text: #ffffff;
    --zm-muted: rgba(255,255,255,.55);
    --zm-faint: rgba(255,255,255,.42);
    --zm-dim: rgba(255,255,255,.28);
    --zm-track: rgba(255,255,255,.10);
    --zm-hover: rgba(255,255,255,.05);
    --zm-active: rgba(255,255,255,.07);
    --zm-chip: #3a4750;
    --zm-chip-hover: #4a5b66;
    --zm-chip-ink: #ffffff;
    --zm-ring-shadow: drop-shadow(0 2px 10px rgba(0,0,0,.55));
    --zm-gauge-track: .17;
    --zm-paws-ink: #ff8100;
    --zm-playtime-ink: #00ec4b;
    --zm-wags-ink: #008cff;
  }
  /* The page owns the whole surface in both themes, so the site's two fixed
     gradient layers stand down and the body takes the page's ground. */
  .light-background, .dark-background { display: none !important; }
  body { background: var(--zm-bg); }
`;

/**
 * Paints the page's own ground, keeps the raining dogs canvas alive above it,
 * and hands every island on the page one shared way to let the zoomies out.
 */
export function ZoomieFx({ children }: { children: React.ReactNode }) {
  const rain = React.useRef<RainHandle>(null);
  const value = React.useMemo(
    () => ({ unleash: () => rain.current?.unleash() }),
    [],
  );

  return (
    <FxContext.Provider value={value}>
      <style>{PALETTE}</style>

      <BodyPortal>
        <RainingDogs ref={rain} />
      </BodyPortal>

      {children}
    </FxContext.Provider>
  );
}
