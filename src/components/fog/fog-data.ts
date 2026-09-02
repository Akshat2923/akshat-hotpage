//
//  fog-data.ts
//  The page's copy, stored the way the app stores it.
//
//  Every claim this page makes is a note. That is the whole conceit: to read about Fog you
//  use Fog. Bodies are short for the same reason the app's are — a note that needs three
//  paragraphs is two notes.
//

export type NoteSeed = {
  id: string;
  title: string;
  snippet: string;
  body: string[];
  tags: string[];
  date: string;
  folderId: string | null;
  pinEmoji?: string;
  /// Points at something on this page the reader can actually do.
  hint?: string;
  /// `copy: true` marks the address that is copied to the clipboard rather than linked —
  /// see CopyEmail for why a mailto: is not enough on its own.
  links?: { label: string; href?: string; external?: boolean; copy?: boolean }[];
  /// What the ✦ button offers instead. Cycled, never applied on its own.
  alternates?: string[];
};

export type FolderSeed = {
  id: string;
  name: string;
  summary: string;
  tags: string[];
};

export const FOLDERS: FolderSeed[] = [
  {
    id: "what-fog-does",
    name: "What Fog Does",
    summary:
      "A title Fog proposes and you keep, folders whose contents you choose, an answer when search comes up empty, and Siri in your own words.",
    tags: ["titles", "folders", "search", "siri"],
  },
  {
    id: "under-the-hood",
    name: "Under the Hood",
    summary:
      "Everything runs on the device: Apple's Foundation Models do the writing, SwiftData holds it, your own iCloud syncs it. Spotlight, widgets and Siri are wired in through App Intents.",
    tags: ["on-device", "swiftui", "privacy"],
  },
];

export const NOTES: NoteSeed[] = [
  {
    id: "thesis",
    title: "Fog helps, you decide",
    snippet: "Fog does the tedious part and leaves every call to you.",
    body: [
      "Fog does the tedious part — reading a note and proposing a title, naming a folder, writing a summary — and leaves every call to you.",
      "Automatic and helpful are not the same thing. Taking the work away is not the same as taking the friction away.",
    ],
    tags: ["thesis", "fog"],
    date: "Sep 2",
    folderId: null,
    pinEmoji: "📌",
    alternates: ["The point of the app", "Suggested, not decided"],
  },
  {
    id: "titles",
    title: "Titles, suggested",
    snippet: "Fog reads the note and proposes a title, so you never stare at Untitled.",
    body: [
      "Fog reads the note and proposes a title, so you never stare at Untitled. Keep it, type your own, or ask for another.",
      "Once a title is yours, nothing overwrites it — not an edit, not a re-tag, not a later suggestion.",
    ],
    tags: ["titles", "suggestions"],
    date: "Sep 1",
    folderId: "what-fog-does",
    hint: "The ✦ button up there suggests one. Nothing changes until you say so.",
    alternates: ["Never Untitled again", "A title you can ignore", "Proposed, then yours"],
  },
  {
    id: "folders",
    title: "Folders, your way",
    snippet: "You pick what belongs together. Fog names it and writes the summary.",
    body: [
      "You pick what belongs together. Select a few notes, tap New Folder, and Fog names it and summarizes what is inside.",
      "Or make an empty one and name it yourself. Notes move by drag, swipe, selection or Siri — never on their own.",
    ],
    tags: ["folders", "grouping"],
    date: "Sep 1",
    folderId: "what-fog-does",
    hint: "Tap Select, choose two notes, then New Folder. It works here.",
    alternates: ["Grouping, on your terms", "You choose, Fog names"],
  },
  {
    id: "ask",
    title: "Ask anything",
    snippet: "When search finds nothing, ask instead.",
    body: [
      "Search matches titles, text, tags and folder names. When nothing matches, ask instead — Fog reads what you have written and answers in a sentence or two.",
      "No index is uploaded and no question leaves the phone. The model that answers is the one already on it.",
    ],
    tags: ["search", "ask"],
    date: "Aug 31",
    folderId: "what-fog-does",
    hint: "The field at the bottom is live. Try typing privacy.",
    alternates: ["Search that answers back", "When search comes up empty"],
  },
  {
    id: "siri",
    title: "Siri, in plain English",
    snippet: "Jot down in Fog. Add to my dentist note. Move groceries to Errands.",
    body: [
      "Jot down in Fog. Add to my dentist note. Move groceries to Errands.",
      "Fog adopts Apple's notes schema, so Siri already knows what a note and a folder are. Two phrases are registered by hand; every other way of saying it comes free with the domain.",
    ],
    tags: ["siri", "app intents"],
    date: "Aug 30",
    folderId: "what-fog-does",
    alternates: ["Your words, not mine", "No phrases to memorize"],
  },
  {
    id: "on-device",
    title: "Nothing leaves the device",
    snippet: "On-device models, local storage, your own iCloud. Works on a plane.",
    body: [
      "Apple's Foundation Models run locally. No server, no API call, no account, no analytics.",
      "Notes are stored on the device with SwiftData and synced between your own devices through your own iCloud. It works on a plane.",
    ],
    tags: ["privacy", "on-device"],
    date: "Aug 29",
    folderId: "under-the-hood",
    alternates: ["No server, no account", "Offline by construction"],
  },
  {
    id: "every-iphone",
    title: "Every iPhone",
    snippet: "Apple Intelligence is not required. You just name things yourself.",
    body: [
      "Apple Intelligence is not required. Every part of the app works without it — you name things yourself.",
      "Where there is no model, the controls that would have suggested something are absent rather than greyed out. A disabled button is a promise the app cannot keep.",
    ],
    tags: ["availability"],
    date: "Aug 29",
    folderId: "under-the-hood",
    alternates: ["Works without the model", "No hardware requirement"],
  },
  {
    id: "built-on",
    title: "Built on Apple's frameworks",
    snippet: "SwiftUI, SwiftData, CloudKit, Foundation Models, App Intents, Spotlight, WidgetKit.",
    body: [
      "SwiftUI · SwiftData · CloudKit · Foundation Models · App Intents · Core Spotlight · WidgetKit.",
      "No third-party dependencies. The newest piece is App Intents: adopting Apple's notes schema is what lets Siri understand phrasings the app never wrote down.",
    ],
    tags: ["swiftui", "swiftdata", "app intents"],
    date: "Aug 28",
    folderId: "under-the-hood",
    alternates: ["Apple-first, all the way down", "The stack"],
  },
  {
    id: "spotlight",
    title: "Findable everywhere",
    snippet: "Notes surface in Spotlight — by text, title, or a tag you never typed.",
    body: [
      "Notes are indexed in Spotlight: by their text, by their title, or by a tag Fog gave them that you never typed.",
      "A widget keeps the most recent note and folder on the Home Screen, in the colour you picked for the app.",
    ],
    tags: ["spotlight", "widgets"],
    date: "Aug 28",
    folderId: "under-the-hood",
    alternates: ["Spotlight and widgets", "Outside the app"],
  },
  {
    id: "theme",
    title: "Rich text, and a field of your own",
    snippet: "Bold, italic, bullets — and a mesh gradient built from a colour you choose.",
    body: [
      "Bold, italic, underline, strikethrough, headings, bullets that continue themselves.",
      "The background is a live mesh gradient built from a colour you pick. Two more colours if you want them, an intensity slider if you do not, and Rainbow Rave for the days restraint is not the goal.",
    ],
    tags: ["formatting", "themes"],
    date: "Aug 27",
    folderId: null,
    hint: "The gear knows. This page obeys the same settings.",
    alternates: ["Make it yours", "Formatting and colour"],
  },
  {
    id: "author",
    title: "Who made this",
    snippet: "A side project by Akshat Saladi. SwiftUI, on-device, offline-first.",
    body: [
      "Fog is a side project by Akshat Saladi — written in SwiftUI, run on the device, built offline-first.",
      "This page is the app again, in a browser.",
    ],
    tags: ["akshat", "side project"],
    date: "Aug 26",
    folderId: null,
    links: [
      { label: "GitHub", href: "https://github.com/Akshat2923", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatsaladi/", external: true },
      { label: "Email", copy: true },
    ],
    alternates: ["The author", "Akshat Saladi"],
  },
  {
    id: "privacy",
    title: "Privacy, in one word",
    snippet: "None. Fog collects nothing, transmits nothing, and shares nothing.",
    body: [
      "None. Fog collects no personal information, transmits nothing, and shares nothing. There is no account to make and no analytics to opt out of.",
      "The long version says the same thing with more paragraphs.",
    ],
    tags: ["privacy", "policy"],
    date: "Aug 26",
    folderId: null,
    links: [{ label: "Read the privacy policy", href: "/fog/privacy" }],
    alternates: ["Nothing collected", "The short policy"],
  },
];

/// Canned, and labelled as such on the page. In the app these come from the on-device model
/// reading your actual notes; here they are a lookup, because inventing an answer the app
/// would not have given is the one dishonest thing this page could do.
const ANSWERS: { match: string[]; answer: string }[] = [
  {
    match: ["privacy", "private", "data", "collect", "track", "account"],
    answer:
      "Nothing leaves the device. The model runs locally, notes are stored on the phone, and sync goes through your own iCloud — so there is no server of mine for anything to leak from.",
  },
  {
    match: ["siri", "voice", "shortcut", "speak"],
    answer:
      "Say jot down in Fog, or add to my dentist note. Fog adopts Apple's notes schema, so Siri understands phrasings the app never wrote down.",
  },
  {
    match: ["folder", "group", "organiz", "organis", "file"],
    answer:
      "Select two or more notes and tap New Folder. Fog names the folder and summarizes what is inside — you decide what goes in it.",
  },
  {
    match: ["title", "name", "untitled"],
    answer:
      "Fog proposes a title once, and you keep it, edit it, or ask for another. Nothing overwrites a title you chose.",
  },
  {
    match: ["price", "cost", "free", "pay", "subscription"],
    answer: "Free on the App Store. No subscription, no account, nothing to unlock.",
  },
  {
    match: ["ipad", "mac", "watch", "device", "iphone"],
    answer:
      "iPhone and iPad. On iPad it is a three-column layout — sidebar, notes, editor — and the same app underneath.",
  },
  {
    match: ["offline", "plane", "internet", "network"],
    answer: "All of it works offline. There is no network call to make.",
  },
  {
    match: ["ai", "model", "intelligence", "foundation", "llm"],
    answer:
      "Apple's on-device Foundation Models. If a device does not have them, Fog still works — you just name things yourself.",
  },
  {
    match: ["widget", "spotlight", "search"],
    answer:
      "Notes are indexed in Spotlight by text, title and tag, and a widget keeps the latest note and folder on the Home Screen.",
  },
];

export function answerFor(query: string): string {
  const q = query.trim().toLowerCase();
  const hit = ANSWERS.find((entry) => entry.match.some((term) => q.includes(term)));
  if (hit) return hit.answer;
  return `Nothing in these notes mentions ${query.trim()} yet. In the app, Fog would read what you had actually written and answer in a sentence or two.`;
}

/// Names a folder from what the selection has in common, then falls back to what it is.
/// The app hands this to the model; the page cannot, so it says so in the caption.
export function nameFolder(notes: NoteSeed[]): { name: string; summary: string } {
  const counts = new Map<string, number>();
  notes.forEach((note) => note.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  const shared = Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const titleCase = (value: string) =>
    value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const name = shared.length
    ? titleCase(shared.slice(0, 2).join(" & "))
    : titleCase(notes[0].tags[0] ?? "Notes");

  const titles = notes.map((note) => note.title);
  const summary =
    titles.length === 2
      ? `${titles[0]} and ${titles[1]} — two notes that turned out to be about the same thing.`
      : `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]} — ${titles.length} notes grouped here.`;

  return { name, summary };
}
