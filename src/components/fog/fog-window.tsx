"use client";

//
//  fog-window.tsx
//  Fog, running in a browser.
//
//  Not a screenshot and not a mockup: the sections collapse, the search field searches, Ask
//  answers, Select groups notes into a folder that Fog then names, and the mesh behind the
//  page winds up while any of that is happening — the same 0.45s up, 1.1s down the app uses.
//
//  What is faked is named on the page: the answers and the folder names come from a lookup
//  rather than from a model, because a browser has no Foundation Models to ask.
//

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Folder as FolderIcon,
  Layers,
  Pin,
  Search,
  Settings,
  Sparkle,
  SquarePen,
  X,
} from "lucide-react";
import {
  ACCENTS,
  AccentKey,
  FONT_STACKS,
  FontDesign,
  GREETINGS,
  PERSONALITY_LABELS,
  Personality,
  useFog,
} from "./fog-context";
import { FOLDERS, FolderSeed, NOTES, NoteSeed, answerFor, nameFolder } from "./fog-data";
import { CopyEmail } from "@/components/CopyEmail";
import { cn } from "@/lib/utils";

// The rows are damped almost flat on purpose: a bouncing *list* is what reads as slow,
// because every row carries the wobble. The personality lives on the header and the chevron.
const ROW_SPRING = { type: "spring" as const, stiffness: 385, damping: 32 };
const CHEVRON_SPRING = { type: "spring" as const, stiffness: 584, damping: 24 };
const PUSH_SPRING = { type: "spring" as const, stiffness: 420, damping: 38 };

type Note = NoteSeed & { pinned: boolean; isNew?: boolean; text?: string };
type View =
  | { kind: "list" }
  | { kind: "note"; id: string }
  | { kind: "folder"; id: string };

type SectionKey = "forecast" | "pinned" | "folders" | "unfiled";

// MARK: - Small parts

function BlinkingCursor() {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] rounded-full bg-current align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
    />
  );
}

/// Types a string out one character at a time, the way the app streams a model response.
function useTypewriter(text: string, active: boolean, speed = 14) {
  const [shown, setShown] = React.useState("");
  React.useEffect(() => {
    if (!active) {
      setShown("");
      return;
    }
    setShown("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, active, speed]);
  return shown;
}

function GlassButton({
  children,
  onClick,
  label,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-white/60 text-foreground/70 shadow-sm backdrop-blur transition active:scale-90 dark:border-white/10 dark:bg-white/10 dark:text-foreground/80",
        className,
      )}
    >
      {children}
    </button>
  );
}

/// ⚠️ Composed with `cn`, not string interpolation.
///
/// Two utilities from the same group have equal specificity, so the one that wins is
/// whichever Tailwind emits later — not whichever the caller wrote last. `px-0` from a call
/// site lost to the `px-4` below, and inside a `w-10` button that padding shrank the grid's
/// content box until the auto column overflowed to the right, putting the icon off centre.
function ProminentButton({
  children,
  onClick,
  disabled,
  className = "",
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{ background: "var(--fog-accent)" }}
      className={cn(
        "grid place-items-center rounded-full px-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition active:scale-90 disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

/// A section header that owns its own disclosure — chevron, count and all.
///
/// Squash and stretch rather than a uniform pulse, and pointed the way the rows are going:
/// the header flattens and spreads as they collapse into it, and draws up narrow as they
/// spring back out. Same trick as any bouncing ball.
export function SectionHeader({
  title,
  count,
  expanded,
  onToggle,
}: {
  title: string;
  count?: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const controls = useAnimationControls();

  const toggle = () => {
    controls.start({
      scaleX: [1, expanded ? 1.03 : 0.99, 1],
      scaleY: [1, expanded ? 0.93 : 1.07, 1],
      y: [0, expanded ? 2.5 : -2.5, 0],
      transition: { duration: 0.31, times: [0, 0.29, 1], ease: "easeOut" },
    });
    onToggle();
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      animate={controls}
      style={{ originX: 0 }}
      className="flex w-full items-baseline gap-1.5 px-1.5 pb-2 pt-4 text-left"
    >
      <span className="text-[19px] font-bold tracking-tight">{title}</span>
      {count !== undefined ? (
        <span className="font-mono text-[13px] tabular-nums text-foreground/45">{count}</span>
      ) : null}
      <span className="flex-1" />
      <motion.span
        animate={{ rotate: expanded ? 90 : 0 }}
        transition={CHEVRON_SPRING}
        className="text-foreground/40"
      >
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
      </motion.span>
    </motion.button>
  );
}

export function SectionBody({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={ROW_SPRING}
          className="overflow-hidden"
        >
          <div className="overflow-hidden rounded-[20px] border border-white/50 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function RowShell({
  children,
  onClick,
  first,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  first?: boolean;
}) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      className={`group flex items-center gap-3 px-4 py-3 transition-colors ${
        first ? "" : "border-t border-black/[0.06] dark:border-white/[0.07]"
      } ${onClick ? "cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.04]" : ""}`}
    >
      {children}
    </div>
  );
}

function NoteRow({
  note,
  first,
  folderName,
  onOpen,
  onTogglePin,
  selecting,
  selected,
  onToggleSelect,
}: {
  note: Note;
  first?: boolean;
  folderName?: string;
  onOpen: () => void;
  onTogglePin: () => void;
  selecting: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <RowShell first={first} onClick={selecting ? onToggleSelect : onOpen}>
      <AnimatePresence initial={false}>
        {selecting ? (
          <motion.span
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: 22, opacity: 1, marginRight: 2 }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={ROW_SPRING}
            className="grid shrink-0 place-items-center"
          >
            <span
              style={selected ? { background: "var(--fog-accent)", borderColor: "transparent" } : undefined}
              className="grid h-[22px] w-[22px] place-items-center rounded-full border-[1.5px] border-foreground/25"
            >
              {selected ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} /> : null}
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {note.pinned && note.pinEmoji ? <span className="text-[15px]">{note.pinEmoji}</span> : null}
          <span className="truncate text-[15px] font-semibold">{note.title}</span>
        </div>
        <p className="truncate text-[13px] text-foreground/55">{note.snippet}</p>
        <p className="mt-0.5 text-[11px] text-foreground/35">
          {folderName ? `${note.date} · ${folderName}` : note.date}
        </p>
      </div>

      {!selecting ? (
        <button
          type="button"
          aria-label={note.pinned ? "Unpin" : "Pin"}
          onClick={(event) => {
            event.stopPropagation();
            onTogglePin();
          }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-foreground/40 opacity-50 transition hover:bg-black/5 group-hover:opacity-100 dark:hover:bg-white/10 sm:opacity-0"
          style={note.pinned ? { color: "var(--fog-accent)", opacity: 1 } : undefined}
        >
          <Pin className="h-4 w-4" fill={note.pinned ? "currentColor" : "none"} />
        </button>
      ) : null}
      <ChevronRight className="h-4 w-4 shrink-0 text-foreground/25" strokeWidth={2.5} />
    </RowShell>
  );
}

function FolderRow({
  folder,
  count,
  first,
  onOpen,
}: {
  folder: FolderSeed;
  count: number;
  first?: boolean;
  onOpen: () => void;
}) {
  return (
    <RowShell first={first} onClick={onOpen}>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate text-[15px] font-semibold">{folder.name}</span>
          <span className="font-mono text-[12px] tabular-nums text-foreground/40">{count}</span>
        </div>
        <p className="truncate text-[13px] text-foreground/45">{folder.tags.join(" · ")}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-foreground/25" strokeWidth={2.5} />
    </RowShell>
  );
}

// MARK: - The window

export function FogWindow() {
  const fog = useFog();
  const {
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
    beginWork,
  } = fog;

  const [notes, setNotes] = React.useState<Note[]>(() =>
    NOTES.map((note) => ({ ...note, pinned: Boolean(note.pinEmoji) })),
  );
  const [folders, setFolders] = React.useState<FolderSeed[]>(FOLDERS);
  const [stack, setStack] = React.useState<View[]>([{ kind: "list" }]);
  const [direction, setDirection] = React.useState(1);
  const [expanded, setExpanded] = React.useState<Set<SectionKey>>(
    () => new Set<SectionKey>(["forecast", "pinned", "folders", "unfiled"]),
  );
  const [flat, setFlat] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [asking, setAsking] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  const [selecting, setSelecting] = React.useState(false);
  const [selection, setSelection] = React.useState<Set<string>>(new Set());
  const [busy, setBusy] = React.useState<null | "folder" | "title">(null);
  const [created, setCreated] = React.useState<{ name: string; count: number; id: string } | null>(null);
  const [proposal, setProposal] = React.useState<{ noteId: string; title: string } | null>(null);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [today, setToday] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const alternateIndex = React.useRef<Map<string, number>>(new Map());

  const view = stack[stack.length - 1];
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [stack.length, view.kind]);

  // Formatted after mount: a date rendered on the server is a date in the server's timezone,
  // and the mismatch is a hydration error rather than a cosmetic one.
  React.useEffect(() => {
    setToday(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    );
  }, []);

  const push = (next: View) => {
    setDirection(1);
    setStack((current) => [...current, next]);
  };
  const back = () => {
    setDirection(-1);
    setStack((current) => (current.length > 1 ? current.slice(0, -1) : current));
  };

  const toggleSection = (key: SectionKey) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const pinned = notes.filter((note) => note.pinned);
  const unfiled = notes.filter((note) => !note.pinned && !note.folderId);
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return notes.filter((note) => {
      const folderName = folders.find((folder) => folder.id === note.folderId)?.name ?? "";
      return (
        note.title.toLowerCase().includes(q) ||
        note.body.join(" ").toLowerCase().includes(q) ||
        note.tags.some((tag) => tag.includes(q)) ||
        folderName.toLowerCase().includes(q)
      );
    });
  }, [query, notes, folders]);

  const streamedAnswer = useTypewriter(answer, asking && answer.length > 0);
  const answerDone = streamedAnswer.length === answer.length;

  React.useEffect(() => {
    if (!asking || !answer) return;
    const end = beginWork();
    const timer = window.setTimeout(end, answer.length * 14 + 400);
    return () => {
      window.clearTimeout(timer);
      end();
    };
  }, [asking, answer, beginWork]);

  const runAsk = () => {
    setAnswer(answerFor(query));
    setAsking(true);
  };

  const togglePin = (id: string) =>
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned, pinEmoji: note.pinEmoji ?? "📌" }
          : note,
      ),
    );

  const toggleSelection = (id: string) =>
    setSelection((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /// Two or more notes carry enough signal to name a folder. One does not — which is why the
  /// button below stays disabled until there are two.
  const createFolder = () => {
    const chosen = notes.filter((note) => selection.has(note.id));
    if (chosen.length < 2) return;
    const end = beginWork();
    setBusy("folder");
    setSelecting(false);
    window.setTimeout(() => {
      const { name, summary } = nameFolder(chosen);
      const id = `made-${Date.now()}`;
      const tags = Array.from(new Set(chosen.flatMap((note) => note.tags))).slice(0, 4);
      setFolders((current) => [{ id, name, summary, tags }, ...current]);
      setNotes((current) =>
        current.map((note) =>
          selection.has(note.id) ? { ...note, folderId: id, pinned: false } : note,
        ),
      );
      setSelection(new Set());
      setBusy(null);
      setCreated({ name, count: chosen.length, id });
      end();
    }, 1600);
  };

  const titleFromText = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).slice(0, 5);
    if (!words.length) return "Untitled";
    const phrase = words.join(" ").replace(/[.,;:!?]$/, "");
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  };

  /// Suggests, and only suggests. A note that already has a title gets a proposal it can
  /// refuse; a note with none gets the first one Fog offers, which it can then rename.
  const suggestTitle = (note: Note) => {
    const end = beginWork();
    setBusy("title");
    window.setTimeout(() => {
      const options = note.alternates ?? [];
      const index = alternateIndex.current.get(note.id) ?? 0;
      const suggestion = note.isNew
        ? titleFromText(note.text ?? draft)
        : options[index % Math.max(options.length, 1)] ?? titleFromText(note.body[0]);
      alternateIndex.current.set(note.id, index + 1);
      if (note.isNew || !note.title) {
        setNotes((current) =>
          current.map((item) => (item.id === note.id ? { ...item, title: suggestion } : item)),
        );
      } else {
        setProposal({ noteId: note.id, title: suggestion });
      }
      setBusy(null);
      end();
    }, 1100);
  };

  const compose = () => {
    const id = `new-${Date.now()}`;
    setDraft("");
    setNotes((current) => [
      {
        id,
        title: "",
        snippet: "",
        body: [],
        tags: [],
        date: "Today",
        folderId: null,
        pinned: false,
        isNew: true,
        text: "",
      },
      ...current,
    ]);
    push({ kind: "note", id });
  };

  const commitDraft = (note: Note) => {
    const text = (note.text ?? "").trim();
    if (!text) return;
    setNotes((current) =>
      current.map((item) =>
        item.id === note.id
          ? { ...item, isNew: false, snippet: text.slice(0, 90), body: [text] }
          : item,
      ),
    );
    suggestTitle({ ...note, isNew: true, text });
  };

  const resetDemo = () => {
    setNotes(NOTES.map((note) => ({ ...note, pinned: Boolean(note.pinEmoji) })));
    setFolders(FOLDERS);
    setStack([{ kind: "list" }]);
    setSelection(new Set());
    setSelecting(false);
    setQuery("");
    setAsking(false);
    setProposal(null);
  };

  const activeNote = view.kind === "note" ? notes.find((note) => note.id === view.id) : undefined;
  const activeFolder = view.kind === "folder" ? folders.find((folder) => folder.id === view.id) : undefined;
  const searching = query.trim().length > 0;

  // MARK: Header

  const header = (() => {
    if (view.kind === "note" && activeNote) {
      return (
        <div className="flex items-center gap-2">
          <GlassButton label="Back" onClick={back}>
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </GlassButton>
          <div
            style={{ background: "var(--fog-accent)" }}
            className="flex min-w-0 items-center gap-2 rounded-full px-4 py-1.5 text-[15px] font-bold text-white shadow-sm"
          >
            {busy === "title" && !activeNote.title ? (
              <BlinkingCursor />
            ) : (
              <span className="truncate">
                {activeNote.isNew ? "New Note" : activeNote.title || "Untitled"}
              </span>
            )}
          </div>
          <span className="flex-1" />
          {activeNote.isNew ? (
            <ProminentButton
              label="Save note"
              className="h-9"
              disabled={!(activeNote.text ?? "").trim()}
              onClick={() => commitDraft(activeNote)}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </ProminentButton>
          ) : (
            <GlassButton label="Suggest a title" onClick={() => suggestTitle(activeNote)}>
              <Sparkle className="h-4 w-4" />
            </GlassButton>
          )}
        </div>
      );
    }

    if (view.kind === "folder" && activeFolder) {
      return (
        <div className="flex items-center gap-2">
          <GlassButton label="Back" onClick={back}>
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </GlassButton>
          <div
            style={{ background: "var(--fog-accent)" }}
            className="min-w-0 rounded-full px-4 py-1.5 text-[15px] font-bold text-white shadow-sm"
          >
            <span className="truncate">{activeFolder.name}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="min-w-0">
          <h3 className="text-[22px] font-bold leading-tight tracking-tight">
            {searching ? "Ask Anything" : flat ? "All Notes" : "Fog"}
          </h3>
          <p className="text-[12px] text-foreground/45">
            {flat ? `${notes.length} notes` : today || " "}
          </p>
        </div>
        <span className="flex-1" />
        <GlassButton label="Settings" onClick={() => setSettingsOpen(true)}>
          <Settings className="h-4 w-4" />
        </GlassButton>
        {selecting ? (
          <ProminentButton
            label="Leave select mode"
            className="h-9 w-9 px-0"
            onClick={() => {
              setSelecting(false);
              setSelection(new Set());
            }}
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </ProminentButton>
        ) : (
          <ProminentButton className="h-9" onClick={() => setSelecting(true)}>
            Select
          </ProminentButton>
        )}
      </div>
    );
  })();

  // MARK: Views

  const listView = (
    <div className="px-1 pb-32">
      {searching ? (
        results.length ? (
          <>
            <SectionHeader
              title="Results"
              count={results.length}
              expanded
              onToggle={() => undefined}
            />
            <SectionBody show>
              {results.map((note, index) => (
                <NoteRow
                  key={note.id}
                  note={note}
                  first={index === 0}
                  folderName={folders.find((folder) => folder.id === note.folderId)?.name}
                  onOpen={() => push({ kind: "note", id: note.id })}
                  onTogglePin={() => togglePin(note.id)}
                  selecting={selecting}
                  selected={selection.has(note.id)}
                  onToggleSelect={() => toggleSelection(note.id)}
                />
              ))}
            </SectionBody>
          </>
        ) : (
          <div className="space-y-3 pt-6">
            <div className="rounded-[28px] border border-white/50 bg-white/70 p-7 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]">
              <Search className="mx-auto h-5 w-5 text-foreground/40" />
              <p className="mt-3 text-[15px] font-semibold">No Results</p>
              <p className="mt-1 text-[13px] text-foreground/55">
                Nothing matched {`"${query.trim()}"`} in your notes.
              </p>
            </div>

            {asking ? (
              <div className="rounded-[28px] border border-white/50 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]">
                <p className="text-[15px] leading-relaxed">
                  {streamedAnswer}
                  {!answerDone ? <BlinkingCursor /> : null}
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <ProminentButton className="h-10 gap-2" onClick={runAsk}>
                  <span className="flex items-center gap-2">
                    <Sparkle className="h-4 w-4" /> Ask
                  </span>
                </ProminentButton>
              </div>
            )}
          </div>
        )
      ) : flat ? (
        <>
          <SectionHeader title="All Notes" count={notes.length} expanded onToggle={() => undefined} />
          <SectionBody show>
            {notes.map((note, index) => (
              <NoteRow
                key={note.id}
                note={note}
                first={index === 0}
                folderName={folders.find((folder) => folder.id === note.folderId)?.name}
                onOpen={() => push({ kind: "note", id: note.id })}
                onTogglePin={() => togglePin(note.id)}
                selecting={selecting}
                selected={selection.has(note.id)}
                onToggleSelect={() => toggleSelection(note.id)}
              />
            ))}
          </SectionBody>
        </>
      ) : (
        <>
          <SectionHeader
            title="Forecast"
            expanded={expanded.has("forecast")}
            onToggle={() => toggleSection("forecast")}
          />
          <SectionBody show={expanded.has("forecast")}>
            <div className="px-4 py-3.5">
              <p className="text-[15px] italic text-foreground/70">{GREETINGS[personality]}</p>
            </div>
          </SectionBody>

          {pinned.length ? (
            <>
              <SectionHeader
                title="Pinned"
                count={pinned.length}
                expanded={expanded.has("pinned")}
                onToggle={() => toggleSection("pinned")}
              />
              <SectionBody show={expanded.has("pinned")}>
                {pinned.map((note, index) => (
                  <NoteRow
                    key={note.id}
                    note={note}
                    first={index === 0}
                    folderName={folders.find((folder) => folder.id === note.folderId)?.name}
                    onOpen={() => push({ kind: "note", id: note.id })}
                    onTogglePin={() => togglePin(note.id)}
                    selecting={selecting}
                    selected={selection.has(note.id)}
                    onToggleSelect={() => toggleSelection(note.id)}
                  />
                ))}
              </SectionBody>
            </>
          ) : null}

          <SectionHeader
            title="Folders"
            count={folders.length}
            expanded={expanded.has("folders")}
            onToggle={() => toggleSection("folders")}
          />
          <SectionBody show={expanded.has("folders")}>
            {folders.map((folder, index) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                first={index === 0}
                count={notes.filter((note) => note.folderId === folder.id).length}
                onOpen={() => push({ kind: "folder", id: folder.id })}
              />
            ))}
          </SectionBody>

          <SectionHeader
            title="Unfiled"
            count={unfiled.length}
            expanded={expanded.has("unfiled")}
            onToggle={() => toggleSection("unfiled")}
          />
          <SectionBody show={expanded.has("unfiled")}>
            {unfiled.map((note, index) => (
              <NoteRow
                key={note.id}
                note={note}
                first={index === 0}
                folderName={folders.find((folder) => folder.id === note.folderId)?.name}
                onOpen={() => push({ kind: "note", id: note.id })}
                onTogglePin={() => togglePin(note.id)}
                selecting={selecting}
                selected={selection.has(note.id)}
                onToggleSelect={() => toggleSelection(note.id)}
              />
            ))}
          </SectionBody>
        </>
      )}
    </div>
  );

  const noteView = activeNote ? (
    <div className="px-3 pb-32 pt-4">
      {activeNote.isNew ? (
        <textarea
          autoFocus
          value={activeNote.text ?? ""}
          onChange={(event) => {
            const text = event.target.value;
            setDraft(text);
            setNotes((current) =>
              current.map((item) => (item.id === activeNote.id ? { ...item, text } : item)),
            );
          }}
          placeholder="Write something. Fog will offer a title when you are done."
          className="h-56 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-foreground/35"
        />
      ) : (
        <>
          {activeNote.body.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-[15px] leading-relaxed">
              {paragraph}
            </p>
          ))}

          {activeNote.links?.length ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {activeNote.links.map((link) => {
                const pill =
                  "rounded-full border border-white/50 bg-white/60 px-3 py-1.5 text-[13px] font-medium backdrop-blur transition hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20";
                if (link.copy) {
                  return <CopyEmail key={link.label} className={pill} />;
                }
                if (!link.href) return null;
                return link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pill}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className={pill}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ) : null}

          {activeNote.tags.length ? (
            <p className="text-[12px] text-foreground/40">{activeNote.tags.join(" · ")}</p>
          ) : null}

          {activeNote.hint ? (
            <p className="mt-6 border-l-2 pl-3 text-[13px] italic text-foreground/45"
               style={{ borderColor: "var(--fog-accent)" }}>
              {activeNote.hint}
            </p>
          ) : null}

          <AnimatePresence>
            {proposal?.noteId === activeNote.id ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={ROW_SPRING}
                className="mt-6 rounded-[22px] border border-white/50 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]"
              >
                <p className="text-[12px] uppercase tracking-wide text-foreground/40">
                  Fog suggests
                </p>
                <p className="mt-1 text-[15px] font-semibold">{proposal.title}</p>
                <div className="mt-3 flex gap-2">
                  <ProminentButton
                    className="h-8 text-[13px]"
                    onClick={() => {
                      setNotes((current) =>
                        current.map((item) =>
                          item.id === activeNote.id ? { ...item, title: proposal.title } : item,
                        ),
                      );
                      setProposal(null);
                    }}
                  >
                    Use it
                  </ProminentButton>
                  <button
                    type="button"
                    onClick={() => setProposal(null)}
                    className="h-8 rounded-full border border-white/50 bg-white/60 px-4 text-[13px] font-medium backdrop-blur dark:border-white/10 dark:bg-white/10"
                  >
                    Keep mine
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  ) : null;

  const folderView = activeFolder ? (
    <div className="px-1 pb-32">
      <SectionHeader title="Summary" expanded onToggle={() => undefined} />
      <SectionBody show>
        <div className="px-4 py-3.5">
          <p className="text-[15px] leading-relaxed">{activeFolder.summary}</p>
        </div>
      </SectionBody>
      <p className="px-4 pb-1 pt-2 text-[12px] text-foreground/40">{activeFolder.tags.join(" · ")}</p>

      <SectionHeader
        title="Notes"
        count={notes.filter((note) => note.folderId === activeFolder.id).length}
        expanded
        onToggle={() => undefined}
      />
      <SectionBody show>
        {notes
          .filter((note) => note.folderId === activeFolder.id)
          .map((note, index) => (
            <NoteRow
              key={note.id}
              note={note}
              first={index === 0}
              onOpen={() => push({ kind: "note", id: note.id })}
              onTogglePin={() => togglePin(note.id)}
              selecting={false}
              selected={false}
              onToggleSelect={() => undefined}
            />
          ))}
      </SectionBody>
    </div>
  ) : null;

  // MARK: Chrome

  return (
    <div
      style={{ fontFamily: FONT_STACKS[fontDesign] || undefined }}
      className="relative overflow-hidden rounded-[34px] border border-white/50 bg-white/45 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
    >
      <div className="px-4 pb-1 pt-4 sm:px-5">{header}</div>

      {/* No exit animation, and no AnimatePresence. A push that waits for the outgoing
          screen to finish leaving is a push that shows nothing at all if the animation is
          paused — which is exactly what a background tab does to it. The new screen mounts
          immediately and slides in over nothing. */}
      <div
        ref={scrollRef}
        className="relative h-[540px] overflow-y-auto overflow-x-hidden px-2 sm:h-[620px] sm:px-3"
      >
        <motion.div
          key={view.kind + (view.kind === "list" ? "" : view.id)}
          initial={{ x: direction * 36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={PUSH_SPRING}
        >
          {view.kind === "list" ? listView : view.kind === "note" ? noteView : folderView}
        </motion.div>
      </div>

      {/* Bottom bar. Select owns it while it is on: the only action there is the one
          selection exists for. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-white/70 via-white/45 to-transparent px-4 pb-4 pt-12 dark:from-neutral-950/70 dark:via-neutral-950/40 sm:px-5">
        <div className="pointer-events-auto flex w-full items-center gap-2">
          {selecting ? (
            <>
              <span className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-[13px] font-medium backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                <FolderIcon className="h-4 w-4 opacity-50" />
                {selection.size === 0
                  ? "Pick two notes"
                  : `${selection.size} selected`}
              </span>
              <span className="flex-1" />
              <ProminentButton
                className="h-10"
                disabled={selection.size < 2 || busy === "folder"}
                onClick={createFolder}
              >
                {busy === "folder" ? (
                  <span className="flex items-center gap-2">
                    Naming
                    <BlinkingCursor />
                  </span>
                ) : (
                  "New Folder"
                )}
              </ProminentButton>
            </>
          ) : view.kind === "list" ? (
            <>
              <GlassButton
                label="Filter by notes"
                onClick={() => setFlat((current) => !current)}
              >
                <Layers className="h-4 w-4" style={flat ? { color: "var(--fog-accent)" } : undefined} />
              </GlassButton>
              <label className="flex h-10 flex-1 items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                <Search className="h-4 w-4 shrink-0 text-foreground/40" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setAsking(false);
                    setAnswer("");
                  }}
                  placeholder="Ask anything"
                  className="w-full bg-transparent text-[15px] outline-none placeholder:text-foreground/40"
                />
                {query ? (
                  <button type="button" aria-label="Clear" onClick={() => setQuery("")}>
                    <X className="h-4 w-4 text-foreground/40" />
                  </button>
                ) : null}
              </label>
              <ProminentButton label="New note" className="h-10 w-10 px-0" onClick={compose}>
                <SquarePen className="h-4 w-4" />
              </ProminentButton>
            </>
          ) : (
            <>
              <span className="flex-1" />
              <button
                type="button"
                onClick={back}
                className="h-10 rounded-full border border-white/50 bg-white/60 px-5 text-[14px] font-medium backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
              >
                Back to notes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Name in the title, count in the message — "Folder created" told you nothing you did
          not already know. */}
      <AnimatePresence>
        {created ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 grid place-items-center bg-black/20 px-6 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={ROW_SPRING}
              className="w-full max-w-xs overflow-hidden rounded-[28px] border border-white/50 bg-white/85 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/85"
            >
              <div className="px-5 py-5">
                <p className="text-[16px] font-bold">{created.name} Folder Created</p>
                <p className="mt-1 text-[13px] text-foreground/55">
                  {created.count} notes added to {created.name}
                </p>
              </div>
              <div className="flex gap-2 border-t border-black/10 p-3 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setCreated(null)}
                  className="h-9 flex-1 rounded-full bg-black/5 text-[14px] font-medium dark:bg-white/10"
                >
                  Stay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    push({ kind: "folder", id: created.id });
                    setCreated(null);
                  }}
                  style={{ background: "var(--fog-accent)" }}
                  className="h-9 flex-1 rounded-full text-[14px] font-semibold text-white"
                >
                  Go There
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Settings, at a medium detent, holding the same switches the app holds. */}
      <AnimatePresence>
        {settingsOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="absolute inset-0 z-30 bg-black/25 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={PUSH_SPRING}
              className="absolute inset-x-0 bottom-0 z-40 max-h-[86%] overflow-y-auto rounded-t-[34px] border-t border-white/50 bg-white/85 px-5 pb-6 pt-3 backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/85"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-foreground/20" />
              <div className="mb-4 flex items-center">
                <h4 className="text-[17px] font-bold">Settings</h4>
                <span className="flex-1" />
                <GlassButton label="Close settings" onClick={() => setSettingsOpen(false)}>
                  <X className="h-4 w-4" />
                </GlassButton>
              </div>

              <SettingsGroup title="Appearance">
                <SettingsRow label="Primary Color">
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {(Object.keys(ACCENTS) as AccentKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        aria-label={ACCENTS[key].label}
                        onClick={() => {
                          setAccent(key);
                          setRave(false);
                        }}
                        style={{ background: ACCENTS[key].hex }}
                        className={`h-6 w-6 rounded-full transition ${
                          accent === key && !rave
                            ? "ring-2 ring-foreground/70 ring-offset-2 ring-offset-transparent"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </SettingsRow>
                <SettingsRow label="Rainbow Rave">
                  <Switch on={rave} onChange={() => setRave(!rave)} />
                </SettingsRow>
                <SettingsRow label={`Background Intensity  ${Math.round(intensity * 100)}%`}>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.05}
                    value={intensity}
                    onChange={(event) => setIntensity(Number(event.target.value))}
                    className="w-40 accent-[var(--fog-accent)]"
                  />
                </SettingsRow>
              </SettingsGroup>

              <SettingsGroup title="Typography">
                <Segmented
                  value={fontDesign}
                  onChange={(value) => setFontDesign(value as FontDesign)}
                  options={[
                    { value: "default", label: "Default" },
                    { value: "mono", label: "Mono" },
                    { value: "rounded", label: "Rounded" },
                    { value: "serif", label: "Serif" },
                  ]}
                />
              </SettingsGroup>

              <SettingsGroup title="Personality">
                <Segmented
                  value={personality}
                  onChange={(value) => setPersonality(value as Personality)}
                  options={(Object.keys(PERSONALITY_LABELS) as Personality[]).map((key) => ({
                    value: key,
                    label: PERSONALITY_LABELS[key],
                  }))}
                />
                <p className="px-1 pt-2 text-[12px] text-foreground/45">
                  Changes the voice of the Forecast line, the way it changes every generated
                  line in the app.
                </p>
              </SettingsGroup>

              <SettingsGroup title="Data">
                <button
                  type="button"
                  onClick={() => {
                    resetDemo();
                    setSettingsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-[15px] font-medium text-red-500"
                >
                  Reset This Demo
                </button>
              </SettingsGroup>

              <p className="px-1 pt-4 text-[12px] leading-relaxed text-foreground/45">
                The app keeps these in AppStorage and syncs them to the widget. This page keeps
                them until you close the tab.
              </p>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// MARK: - Settings parts

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="px-1 pb-1.5 text-[12px] font-semibold uppercase tracking-wide text-foreground/45">
        {title}
      </p>
      <div className="overflow-hidden rounded-[20px] border border-white/50 bg-white/60 dark:border-white/10 dark:bg-white/[0.06]">
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3 last:border-b-0 dark:border-white/[0.07]">
      <span className="text-[15px]">{label}</span>
      <span className="flex-1" />
      {children}
    </div>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      style={on ? { background: "var(--fog-accent)" } : undefined}
      className={`h-[30px] w-[50px] rounded-full p-[3px] transition ${on ? "" : "bg-foreground/20"}`}
    >
      <motion.span
        layout
        transition={CHEVRON_SPRING}
        className="block h-6 w-6 rounded-full bg-white shadow"
        style={{ marginLeft: on ? 20 : 0 }}
      />
    </button>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex gap-1 p-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          style={value === option.value ? { background: "var(--fog-accent)" } : undefined}
          className={`flex-1 rounded-full px-2 py-1.5 text-[13px] font-medium transition ${
            value === option.value ? "text-white shadow" : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/10"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
