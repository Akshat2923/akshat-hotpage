// Ported from the Zoomie iOS app so this page and the app can't drift apart.
//
// Colours are the asset-catalog values verbatim. Names, taglines, quick
// actions and effort ratings come straight out of PlaytimeType.swift; the
// commentary lines are lifted from the SpriteKit scenes that narrate a live
// session. Nothing here is invented marketing copy — if it reads oddly, it
// reads oddly in the app too.

export type RingKey = "paws" | "playtime" | "wags";

/**
 * `color` is the brand hue and is used for anything painted — gauges, bars,
 * the play button. `ink` is the same hue conditioned for type: identical in
 * dark mode, darkened in light, where #00EC4B on white is unreadable.
 */
export const RING: Record<
  RingKey,
  { label: string; color: string; ink: string; unit: string; blurb: string }
> = {
  // AccentColor.colorset
  paws: {
    label: "Paws",
    color: "#FF8100",
    ink: "var(--zm-paws-ink, #FF8100)",
    unit: "PAWS",
    blurb: "Steps and ground covered, off the pedometer.",
  },
  // Spring.colorset
  playtime: {
    label: "Playtime",
    color: "#00EC4B",
    ink: "var(--zm-playtime-ink, #00EC4B)",
    unit: "MIN",
    blurb: "Minutes of actual, logged play.",
  },
  // Blueberry.colorset
  wags: {
    label: "Wags",
    color: "#008CFF",
    ink: "var(--zm-wags-ink, #008CFF)",
    unit: "WAGS",
    blurb: "Moments worth marking. Tapped, not measured.",
  },
};

export const RING_ORDER: RingKey[] = ["wags", "playtime", "paws"]; // outer → inner

// MARK: - Wags

export type WagKey =
  | "bark"
  | "potty"
  | "pulled"
  | "treat"
  | "fetched"
  | "dropped"
  | "zoomies"
  | "sleepy"
  | "bellyRub"
  | "caught"
  | "nailedIt"
  | "distracted"
  | "brushed"
  | "found"
  | "legKick"
  | "photo"
  | "note";

/** `icon` names a lucide-react export; see WagIcon in the console component. */
export const WAGS: Record<WagKey, { label: string; icon: string }> = {
  bark: { label: "Bark", icon: "Volume2" },
  potty: { label: "Potty", icon: "Droplet" },
  pulled: { label: "Pulled", icon: "MoveHorizontal" },
  treat: { label: "Treat", icon: "Carrot" },
  fetched: { label: "Fetched", icon: "Circle" },
  dropped: { label: "Dropped", icon: "ArrowDownCircle" },
  zoomies: { label: "Zoomies", icon: "Zap" },
  sleepy: { label: "Sleepy", icon: "MoonStar" },
  bellyRub: { label: "Belly Rub", icon: "Hand" },
  caught: { label: "Caught", icon: "Sparkles" },
  nailedIt: { label: "Nailed It", icon: "BadgeCheck" },
  distracted: { label: "Distracted", icon: "MessageCircleQuestion" },
  brushed: { label: "Brushed", icon: "Brush" },
  found: { label: "Found It", icon: "Search" },
  legKick: { label: "Leg Kick", icon: "Activity" },
  photo: { label: "Photo", icon: "Camera" },
  note: { label: "Note", icon: "MessageSquare" },
};

// MARK: - Playtime

export type Category = "Everyday" | "High Energy" | "Rest & Chill";
export type Effort = "gentle" | "moderate" | "vigorous";
/** Which backdrop the live session paints behind itself. */
export type Stage = "outdoor" | "field" | "floor" | "couch";

export type PlaytimeType = {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  verb: string;
  stage: Stage;
  tracksPaws: boolean;
  recordsLocation: boolean;
  dogEffort: Effort;
  ownerEffort: Effort;
  quickActions: WagKey[];
  /** Ring minutes-per-real-second while this type is running, roughly. */
  lines: string[];
};

export const PLAYTIMES: PlaytimeType[] = [
  {
    id: "walk",
    name: "Walk",
    tagline: "Paws, distance and fresh air",
    category: "Everyday",
    verb: "Walking",
    stage: "outdoor",
    tracksPaws: true,
    recordsLocation: true,
    dogEffort: "moderate",
    ownerEffort: "moderate",
    quickActions: ["bark", "potty", "pulled", "treat"],
    lines: [
      "Out the door. Nose already working.",
      "Look at those paws go!",
      "Steady pace. Both of you.",
      "A stop. Something here is very important.",
      "Lamppost. Full report.",
      "Back on the move.",
      "Tongue out. Tank's running low.",
      "Halfway. Turning for home.",
    ],
  },
  {
    id: "fetch",
    name: "Fetch",
    tagline: "Sprint, retrieve, repeat",
    category: "High Energy",
    verb: "Playing fetch with",
    stage: "field",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "vigorous",
    ownerEffort: "gentle",
    quickActions: ["fetched", "dropped", "zoomies", "treat"],
    lines: [
      "Here it goes!",
      "And it's away!",
      "Full sprint, no hesitation.",
      "One slobbery ball, retrieved.",
      "Dropped right at your feet.",
      "Delivered. Slightly damper than before.",
      "And there go the zoomies.",
      "No ball involved. Pure zoomies.",
      "A quick breather, then back at it.",
      "Tongue out. Tank's running low.",
    ],
  },
  {
    id: "cuddle",
    name: "Cuddle",
    tagline: "Quiet time on the couch",
    category: "Rest & Chill",
    verb: "Cuddling",
    stage: "couch",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "gentle",
    ownerEffort: "gentle",
    quickActions: ["sleepy", "bellyRub", "treat"],
    lines: [
      "Making room on the couch.",
      "Cushion claimed.",
      "Adjusting. Somehow now closer.",
      "Belly up. Optimal.",
      "Belly to the ceiling. Peak trust.",
      "Ear up. Still there? Good.",
      "A quick check that you haven't moved.",
      "Full extension. Then nothing.",
      "Gravity wins.",
      "Just breathing now.",
    ],
  },
  {
    id: "chase",
    name: "Chase",
    tagline: "You run, they catch you",
    category: "High Energy",
    verb: "Playing chase with",
    stage: "field",
    tracksPaws: true,
    recordsLocation: false,
    dogEffort: "vigorous",
    ownerEffort: "vigorous",
    quickActions: ["caught", "zoomies", "bark", "treat"],
    lines: [
      "Neither of you is moving. Yet.",
      "No warning. Just gone.",
      "And they're off!",
      "Go, go, go!",
      "Straight across the field.",
      "Cornered, and delighted.",
      "Caught. Obviously.",
      "You were never going to win that.",
      "Caught, and thrilled about it.",
      "Both of you need a second.",
    ],
  },
  {
    id: "tug",
    name: "Tug of War",
    tagline: "Pull, hold, never let go",
    category: "High Energy",
    verb: "Playing tug with",
    stage: "floor",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "vigorous",
    ownerEffort: "moderate",
    quickActions: ["pulled", "dropped", "bark", "treat"],
    lines: [
      "Offering the rope. It will not be refused.",
      "Both ends committed.",
      "One rope. Two strong opinions.",
      "Neither of you is giving an inch.",
      "All grip, no give.",
      "Tongue out. Still not letting go.",
      "A rare win for you.",
      "You got it back. Briefly.",
      "And it's gone. Well pulled.",
      "A pause. The rope stays exactly where it is.",
    ],
  },
  {
    id: "training",
    name: "Training",
    tagline: "Five minutes of sit, stay, good",
    category: "Everyday",
    verb: "Training",
    stage: "floor",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "gentle",
    ownerEffort: "gentle",
    quickActions: ["nailedIt", "distracted", "treat", "bark"],
    lines: [
      "Sit. Waiting.",
      "Good. Very good.",
      "Nailed it.",
      "Two seconds. A personal best, arguably.",
      "Confident. Wrong, but confident.",
      "Not the one. Full marks for commitment.",
      "Couldn't hold it.",
      "Something moved outside. We've lost them.",
      "Brains are tiring. Break time.",
      "That's enough thinking for now.",
    ],
  },
  {
    id: "brushing",
    name: "Brushing",
    tagline: "Fur everywhere, dog delighted",
    category: "Rest & Chill",
    verb: "Brushing",
    stage: "floor",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "gentle",
    ownerEffort: "gentle",
    quickActions: ["brushed", "bellyRub", "sleepy", "treat"],
    lines: [
      "Standing perfectly still. For now.",
      "Long strokes, with the coat.",
      "Fur is coming off in clouds.",
      "There is so much more of this than expected.",
      "Eyes shut. Still upright, technically.",
      "This has stopped being grooming.",
      "One shake. All of it, everywhere.",
      "And that's undone.",
    ],
  },
  {
    id: "scent",
    name: "Scent Work",
    tagline: "Hide it, watch them find it",
    category: "Everyday",
    verb: "Scenting with",
    stage: "floor",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "gentle",
    ownerEffort: "gentle",
    quickActions: ["found", "distracted", "treat", "bark"],
    lines: [
      "Hidden. Nose down.",
      "First one, straight away.",
      "Got it. Nose never lifted.",
      "Found one.",
      "And another.",
      "A pass, and back again.",
      "And the last one.",
      "That's the lot.",
      "Ten minutes of that beats an hour of anything else.",
    ],
  },
  {
    id: "massage",
    name: "Massage",
    tagline: "Slow hands, melted dog",
    category: "Rest & Chill",
    verb: "Massaging",
    stage: "floor",
    tracksPaws: false,
    recordsLocation: false,
    dogEffort: "gentle",
    ownerEffort: "gentle",
    quickActions: ["legKick", "bellyRub", "sleepy", "treat"],
    lines: [
      "Down on the rug. Both of you.",
      "Floor level. This is going to take a while.",
      "Working down from the shoulders.",
      "Slow circles, along the spine.",
      "Found the spot. The back leg is going.",
      "There it is. The leg.",
      "Involuntary. Entirely involuntary.",
      "Nothing quick about any of this.",
      "That's it. That's the whole dog.",
      "Out. You're not moving either.",
    ],
  },
];

export const CATEGORY_ORDER: Category[] = [
  "Everyday",
  "High Energy",
  "Rest & Chill",
];

// MARK: - Treats

export type Treat = {
  name: string;
  description: string;
  group: string;
  rings: RingKey[];
  earned: boolean;
};

export const TREATS: Treat[] = [
  {
    name: "First Zoomie",
    description: "Close all three rings for the first time.",
    group: "Firsts",
    rings: ["paws", "playtime", "wags"],
    earned: true,
  },
  {
    name: "On a Roll",
    description: "Close your Zoomie 3 days in a row.",
    group: "Streaks",
    rings: ["paws", "playtime", "wags"],
    earned: true,
  },
  {
    name: "Say Cheese",
    description: "Log your first photo wag.",
    group: "Firsts",
    rings: ["wags"],
    earned: true,
  },
  {
    name: "Going the Distance",
    description: "Log a walk of at least a mile.",
    group: "Totals",
    rings: ["paws"],
    earned: true,
  },
  {
    name: "Week Streak",
    description: "Close your Zoomie 7 days in a row.",
    group: "Streaks",
    rings: ["paws", "playtime", "wags"],
    earned: true,
  },
  {
    name: "Early Bird",
    description: "Start a playtime before 7am.",
    group: "Variety",
    rings: ["playtime"],
    earned: true,
  },
  {
    name: "Rain or Shine",
    description: "Log a walk in the rain or snow.",
    group: "Variety",
    rings: ["paws"],
    earned: false,
  },
  {
    name: "Night Owl",
    description: "Start a playtime at 10pm or later.",
    group: "Variety",
    rings: ["playtime"],
    earned: false,
  },
  {
    name: "Well-Rounded",
    description: "Log every kind of playtime at least once.",
    group: "Variety",
    rings: ["playtime"],
    earned: false,
  },
  {
    name: "Shutterbug",
    description: "Log 100 photo wags.",
    group: "Totals",
    rings: ["wags"],
    earned: false,
  },
  {
    name: "Month Streak",
    description: "Close your Zoomie 30 days in a row.",
    group: "Streaks",
    rings: ["paws", "playtime", "wags"],
    earned: false,
  },
  {
    name: "Perfect Month",
    description: "Close your Zoomie every single day of a calendar month.",
    group: "Streaks",
    rings: ["paws", "playtime", "wags"],
    earned: false,
  },
];

// MARK: - Siri

export const SIRI_PHRASES = [
  "Start a playtime in Zoomie",
  "How is Percy doing in Zoomie",
  "Start a walk for Percy in Zoomie",
  "Check my dog's rings in Zoomie",
  "What did we do last in Zoomie",
  "Open the wag camera in Zoomie",
  "Finish the walk in Zoomie",
  "Show progress for Paws in Zoomie",
];

// MARK: - Wag photo joints
//
// Roughly where VNDetectAnimalBodyPoseRequest puts them on a standing dog,
// mapped onto the silhouette this page draws. Percentages of the frame.

export const JOINTS: { id: string; label: string; x: number; y: number }[] = [
  { id: "nose", label: "Nose", x: 20, y: 40 },
  { id: "leftEar", label: "Left Ear", x: 30, y: 24 },
  { id: "rightEar", label: "Right Ear", x: 38, y: 22 },
  { id: "neck", label: "Neck", x: 40, y: 42 },
  { id: "leftFrontElbow", label: "Front Elbow", x: 39, y: 66 },
  { id: "leftFrontPaw", label: "Front Paw", x: 37, y: 86 },
  { id: "spine", label: "Spine", x: 58, y: 46 },
  { id: "leftBackElbow", label: "Back Elbow", x: 73, y: 66 },
  { id: "leftBackPaw", label: "Back Paw", x: 76, y: 86 },
  { id: "tailBottom", label: "Tail", x: 82, y: 40 },
];

export const EMOJI_PALETTE = [
  "🎾",
  "❤️",
  "⭐️",
  "🦴",
  "🔥",
  "😴",
  "🥕",
  "✨",
  "👑",
  "🐾",
];

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/zoomie-dog-activity-tracker/id6761315454";
