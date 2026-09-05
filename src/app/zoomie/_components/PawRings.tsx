import pawprint from "@/assets/zoomie/pawprint@10x.png";
import { RING, RING_ORDER, type RingKey } from "../_lib/zoomie-data";

// The rings are the app's own `pawprint` SF Symbol, exported at @10x and used
// here as a CSS mask rather than re-traced by hand — same glyph on the page as
// on the phone.
//
// Progress is not an arc sweep. The app paints the glyph twice and reveals the
// coloured copy with a rising water line, so a ring at 60% is a paw filled
// six-tenths of the way up. The clip sits on a wrapper *around* the masked
// element, so the water line stays level and the mask stays put.
//
// The export is cropped tight to the ink (measured: the glyph spans 0–1015 of
// 1020 across and 0–998 of 1010 down), so `contain` inside a square box leaves
// about half a percent of slack top and bottom — close enough that the fill
// percentage maps straight onto the paw with no correction.
const MASK = {
  WebkitMaskImage: `url(${pawprint.src})`,
  maskImage: `url(${pawprint.src})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

export function PawGauge({
  progress,
  color,
  fillMs = 1600,
  className,
}: {
  progress: number;
  color: string;
  fillMs?: number;
  className?: string;
}) {
  const p = Math.min(Math.max(progress, 0), 1);

  return (
    <div className={className} style={{ position: "relative" }}>
      {/* Track — stands in for the app's .thinMaterial. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          opacity: "var(--zm-gauge-track, .17)",
          ...MASK,
        }}
      />

      {/* Fill, revealed from the bottom up. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(${(1 - p) * 100}% 0% 0% 0%)`,
          transition: `clip-path ${fillMs}ms cubic-bezier(.22,1,.36,1)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            ...MASK,
          }}
        />
      </div>
    </div>
  );
}

/** Three nested paws — Wags outside, then Playtime, then Paws. */
export function PawRings({
  progress,
  size = 340,
  fillMs = 1600,
  className,
}: {
  progress: Record<RingKey, number>;
  size?: number;
  fillMs?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        filter: "var(--zm-ring-shadow, drop-shadow(0 2px 10px rgba(0,0,0,.55)))",
      }}
    >
      {RING_ORDER.map((key, i) => {
        const scale = [1, 0.875, 0.75][i];
        return (
          <div
            key={key}
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
          >
            <PawGauge
              progress={progress[key]}
              color={RING[key].color}
              fillMs={fillMs}
              className="h-full w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
