// The page's own palette, mounted only while the page is, the way Zoomie's is. Dark
// is the app's studio: near-black with the softbox falling on the case. Light is the
// same room with the lights up.

const PALETTE = `
  :root {
    --dc-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
    --dc-bg: #f2f3f6;
    --dc-deep: #ffffff;
    --dc-band: #e9ebf0;
    --dc-card: #ffffff;
    --dc-line: rgba(0,0,0,.10);
    --dc-line-soft: rgba(0,0,0,.07);
    --dc-text: #0a0a0c;
    --dc-muted: rgba(0,0,0,.62);
    --dc-faint: rgba(0,0,0,.45);
    --dc-hover: rgba(0,0,0,.05);
    --dc-glass: rgba(255,255,255,.6);
    --dc-shadow: rgba(0,0,0,.22);
    --dc-spot: rgba(41,128,255,.16);
    --dc-ink: #0a5fd6;
    --dc-gold: #c99a06;
  }
  .dark {
    --dc-bg: #060709;
    --dc-deep: #000000;
    --dc-band: #0c0d11;
    --dc-card: #101116;
    --dc-line: rgba(255,255,255,.10);
    --dc-line-soft: rgba(255,255,255,.06);
    --dc-text: #ffffff;
    --dc-muted: rgba(255,255,255,.60);
    --dc-faint: rgba(255,255,255,.42);
    --dc-hover: rgba(255,255,255,.07);
    --dc-glass: rgba(255,255,255,.06);
    --dc-shadow: rgba(0,0,0,.8);
    --dc-spot: rgba(41,128,255,.22);
    --dc-ink: #5ea0ff;
    --dc-gold: #fad02e;
  }
  .light-background, .dark-background { display: none !important; }
  body { background: var(--dc-bg); }
`;

export function DiscPalette() {
  return <style dangerouslySetInnerHTML={{ __html: PALETTE }} />;
}
