"use client";

//
//  fog-context.tsx
//  The page's Settings, which are the app's Settings.
//
//  Everything the gear button changes lives here: the colour the mesh is built from, how
//  loud it is, the typeface, and the voice the Forecast line is written in. The app stores
//  these in @AppStorage; the page keeps them for the length of a visit and no longer —
//  there is nothing here worth putting in someone's browser storage.
//

import * as React from "react";

export type AccentKey =
  | "blue"
  | "indigo"
  | "violet"
  | "pink"
  | "orange"
  | "green"
  | "graphite";

/// SwiftUI's own system colours, so the page and the app are built from the same swatches.
export const ACCENTS: Record<AccentKey, { label: string; hex: string }> = {
  blue: { label: "Blue", hex: "#007AFF" },
  indigo: { label: "Indigo", hex: "#5856D6" },
  violet: { label: "Violet", hex: "#AF52DE" },
  pink: { label: "Pink", hex: "#FF2D55" },
  orange: { label: "Orange", hex: "#FF8822" },
  green: { label: "Green", hex: "#34C759" },
  graphite: { label: "Graphite", hex: "#6E7A8A" },
};

export type FontDesign = "default" | "rounded" | "mono" | "serif";

export const FONT_STACKS: Record<FontDesign, string> = {
  default: "",
  rounded: 'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", Avenir, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  serif: 'ui-serif, Georgia, "Iowan Old Style", "Times New Roman", serif',
};

export type Personality = "none" | "warm" | "funny" | "poetic" | "stoic";

/// Straight out of `AppPersonality.preview` — the same five voices, saying the same kind of
/// thing they say in the picker.
export const GREETINGS: Record<Personality, string> = {
  none: "Twelve notes. Two folders. Three of them unfiled.",
  warm: "Some of your best ideas seem to arrive late — good thing you wrote them down.",
  funny: "Your notes called. They want to be summarized.",
  poetic: "Ideas drift like weather; let us name them before they pass.",
  stoic: "Twelve notes. Two folders. Proceed.",
};

export const PERSONALITY_LABELS: Record<Personality, string> = {
  none: "None",
  warm: "Warm",
  funny: "Funny",
  poetic: "Poetic",
  stoic: "Stoic",
};

type FogSettings = {
  accent: AccentKey;
  setAccent: (a: AccentKey) => void;
  rave: boolean;
  setRave: (r: boolean) => void;
  /// 0 – 2, matching the app's Background Intensity slider.
  intensity: number;
  setIntensity: (i: number) => void;
  fontDesign: FontDesign;
  setFontDesign: (f: FontDesign) => void;
  personality: Personality;
  setPersonality: (p: Personality) => void;
  /// How many things are generating right now. The mesh reads this every frame and winds
  /// itself up; a ref rather than state because a re-render per frame is not the point.
  activity: React.MutableRefObject<number>;
  /// Call at the start of a piece of work; call the returned function when it lands.
  beginWork: () => () => void;
};

const FogContext = React.createContext<FogSettings | null>(null);

export function useFog(): FogSettings {
  const value = React.useContext(FogContext);
  if (!value) throw new Error("useFog must be used inside <FogProvider>");
  return value;
}

export function FogProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = React.useState<AccentKey>("blue");
  const [rave, setRave] = React.useState(false);
  const [intensity, setIntensity] = React.useState(1);
  const [fontDesign, setFontDesign] = React.useState<FontDesign>("default");
  const [personality, setPersonality] = React.useState<Personality>("warm");
  const activity = React.useRef(0);

  const beginWork = React.useCallback(() => {
    activity.current += 1;
    let ended = false;
    return () => {
      if (ended) return;
      ended = true;
      activity.current = Math.max(0, activity.current - 1);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      accent,
      setAccent,
      rave,
      setRave,
      intensity,
      setIntensity,
      fontDesign,
      setFontDesign,
      personality,
      setPersonality,
      activity,
      beginWork,
    }),
    [accent, rave, intensity, fontDesign, personality, beginWork],
  );

  return (
    <FogContext.Provider value={value}>
      <div
        style={{
          ["--fog-accent" as string]: ACCENTS[accent].hex,
          fontFamily: FONT_STACKS[fontDesign] || undefined,
        }}
        className="contents"
      >
        {children}
      </div>
    </FogContext.Provider>
  );
}
