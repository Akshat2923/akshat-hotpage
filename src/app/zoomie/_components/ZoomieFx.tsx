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

/**
 * Paints the page's own black ground, keeps the raining dogs canvas alive
 * above it, and hands every island on the page one shared way to let the
 * zoomies out — the rings when you wind them up, the console when all three
 * rings close.
 */
export function ZoomieFx({ children }: { children: React.ReactNode }) {
  const rain = React.useRef<RainHandle>(null);
  const value = React.useMemo(
    () => ({ unleash: () => rain.current?.unleash() }),
    [],
  );

  return (
    <FxContext.Provider value={value}>
      {/* Zoomie is an OLED-black app, so the page takes the whole surface in
          both themes: the site's two fixed gradient layers stand down, the
          body goes black, and the navbar gets its contrast back on light. */}
      <style>{`
        .light-background, .dark-background { display: none !important; }
        body { background: #050506; }
        html:not(.dark) header a,
        html:not(.dark) header button { color: #fff; }
        html:not(.dark) header a:hover,
        html:not(.dark) header button:hover { background: rgba(255,255,255,.08); }
      `}</style>

      <BodyPortal>
        <RainingDogs ref={rain} />
      </BodyPortal>

      {children}
    </FxContext.Provider>
  );
}
