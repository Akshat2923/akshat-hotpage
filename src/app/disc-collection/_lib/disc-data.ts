// The facts the page states about the app, in one place, so the copy and the app
// can't drift apart quietly. Plastic colors are the app's own (`CasePlastic`).

/** Placeholder until the listing is live: swap in the App Store link. */
export const APP_STORE_URL = "#";

export type CaseFamily = {
  name: string;
  plastic: string;
  /** Translucent plastics tint what's behind them; solid ones don't. */
  translucent?: boolean;
};

export const GAME_CASES: CaseFamily[] = [
  { name: "PlayStation 5", plastic: "#2980FF", translucent: true },
  { name: "PlayStation 4", plastic: "#2980FF", translucent: true },
  { name: "PlayStation 3", plastic: "#cfd8e3", translucent: true },
  { name: "PlayStation 2", plastic: "#0B0B0B" },
  { name: "Xbox Series X|S", plastic: "#107C10", translucent: true },
  { name: "Xbox One", plastic: "#107C10", translucent: true },
  { name: "Xbox 360", plastic: "#6CC24A", translucent: true },
  { name: "Xbox", plastic: "#7DBF2D" },
  { name: "Wii U", plastic: "#1DACD6" },
  { name: "Wii", plastic: "#EDEDED" },
  { name: "GameCube", plastic: "#0B0B0B" },
  { name: "PC", plastic: "#0B0B0B" },
];

export const MOVIE_CASES: CaseFamily[] = [
  { name: "DVD", plastic: "#0B0B0B" },
  { name: "Blu-ray", plastic: "#4D9EFF", translucent: true },
  { name: "4K Ultra HD", plastic: "#0B0B0B" },
];

export const STACK = [
  ["RealityKit", "The case, the studio it stands in, and offscreen renders for sharing"],
  ["Metal", "A shader for the rainbow a disc throws when light crosses it"],
  ["VisionKit", "The document camera that finds a case's corners"],
  ["Vision + Core Image", "Reading the print, and flattening photos to millimeter layouts"],
  ["SwiftData", "The collection, on the device"],
  ["CloudKit", "Private sync, the public Gallery, and heart notifications with no server of my own"],
  ["SensitiveContentAnalysis", "An on-device check before a photo goes public"],
  ["WidgetKit", "Your shelf on the Home Screen: covers, spines or open cases"],
  ["SwiftUI", "Everything else, with Liquid Glass"],
];
