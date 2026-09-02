"use client";

import * as React from "react";

// The app's landing screen rains dogs and paws, and winding the rings up far
// enough lets a pack loose from the middle of the screen. Both are here. The
// onboarding's first line — "Huh... why was it raining dogs and paws?" — is
// the app explaining this to itself, so it seemed only fair to keep it.

const AMBIENT = ["🐾", "🐾", "🐾", "🐕", "🐶"];
const BURST = ["🐕", "🐶", "🐾", "🦴", "🎾", "⚡️"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  glyph: string;
  alpha: number;
  ambient: boolean;
};

export type RainHandle = { unleash: () => void };

export const RainingDogs = React.forwardRef<RainHandle, { density?: number }>(
  function RainingDogs({ density = 13 }, ref) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const parts = React.useRef<Particle[]>([]);
    const raf = React.useRef<number | null>(null);

    const spawnAmbient = (w: number, h: number, atTop = false): Particle => ({
      x: Math.random() * w,
      y: atTop ? -40 : Math.random() * h,
      vx: (Math.random() - 0.5) * 14,
      vy: 26 + Math.random() * 40,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 1.1,
      size: 16 + Math.random() * 20,
      glyph: AMBIENT[(Math.random() * AMBIENT.length) | 0],
      alpha: 0.07 + Math.random() * 0.1,
      ambient: true,
    });

    React.useImperativeHandle(ref, () => ({
      unleash() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        for (let i = 0; i < 34; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 260 + Math.random() * 460;
          parts.current.push({
            x: w / 2,
            y: h * 0.42,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 180,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 9,
            size: 22 + Math.random() * 30,
            glyph: BURST[(Math.random() * BURST.length) | 0],
            alpha: 0.95,
            ambient: false,
          });
        }
      },
    }));

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let w = 0;
      let h = 0;
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      if (!reduce) {
        parts.current = Array.from({ length: density }, () =>
          spawnAmbient(w, h),
        );
      }

      let prev = performance.now();
      const tick = (now: number) => {
        const dt = Math.min((now - prev) / 1000, 1 / 20);
        prev = now;
        ctx.clearRect(0, 0, w, h);

        parts.current = parts.current.filter((p) => {
          p.vy += (p.ambient ? 40 : 900) * dt; // gravity
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vrot * dt;
          if (!p.ambient) p.alpha -= dt * 0.34;

          if (p.ambient && p.y > h + 60) {
            Object.assign(p, spawnAmbient(w, h, true));
          }
          if (!p.ambient && (p.y > h + 80 || p.alpha <= 0)) return false;

          ctx.save();
          ctx.globalAlpha = Math.max(p.alpha, 0);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.font = `${p.size}px system-ui, "Apple Color Emoji", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.glyph, 0, 0);
          ctx.restore();
          return true;
        });

        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener("resize", resize);
        if (raf.current !== null) cancelAnimationFrame(raf.current);
      };
    }, [density]);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] h-full w-full"
      />
    );
  },
);
