"use client";

//
//  /fog
//  The app is the subject; the page is the room it stands in.
//
//  Composition rather than a stack: the field runs full bleed, the device sits in it, and
//  the words are set beside the device instead of centred above it. Everything below the
//  fold returns to the reading column, because that is where reading happens.
//
//  Materials come from `.fog-surface` in globals.css — content opaque, chrome glass, three
//  text roles. Nothing here invents a surface of its own.
//

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FogProvider } from "@/components/fog/fog-context";
import { MeshField } from "@/components/fog/mesh-field";
import { DeviceFrame } from "@/components/fog/device-frame";
import { FogWindow, SectionBody, SectionHeader } from "@/components/fog/fog-window";
import { CopyEmail } from "@/components/CopyEmail";
import fogIcon from "@/assets/images/FogIcon-watchOS-Default-1088x1088@1x.png";
import screen1 from "@/assets/fog/screen-1.jpeg";
import screen2 from "@/assets/fog/screen-2.jpeg";
import screen3 from "@/assets/fog/screen-3.jpeg";
import screen4 from "@/assets/fog/screen-4.jpeg";

const SCREENS = [
  { src: screen1, alt: "The Fog list: Forecast, Pinned, Folders and Unfiled" },
  { src: screen2, alt: "A note with its suggested title and the note menu open" },
  { src: screen3, alt: "Selecting notes and grouping them into a new folder" },
  { src: screen4, alt: "A folder with a generated summary and its notes" },
];

const STACK: [string, string][] = [
  ["SwiftUI", "Every screen, and the mesh gradient behind them"],
  ["SwiftData", "Notes and folders, stored on the device"],
  ["CloudKit", "Sync between your own devices, through your own iCloud"],
  ["Foundation Models", "Titles, folder names, summaries, answers — all local"],
  ["App Intents", "Apple's notes schema, which is how Siri already understands"],
  ["Core Spotlight", "Findable by text, title, or a tag you never typed"],
  ["WidgetKit", "The latest note and folder, in the colour you picked"],
];

function Reveal({
  delay,
  children,
  className = "",
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    // Hidden tab: skip the entrance entirely and render at rest. Arriving later to a page
    // that never faded in is fine; arriving to a blank one is not.
    if (document.visibilityState === "visible") setAnimate(true);
  }, []);

  return (
    <div
      className={animate ? `fog-rise ${className}` : className}
      style={animate ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export default function FogPage() {
  const [screensOpen, setScreensOpen] = React.useState(true);
  const [stackOpen, setStackOpen] = React.useState(true);

  return (
    <FogProvider>
      <MeshField />

      <div className="fog-surface text-[var(--fog-label)]">
        {/* MARK: Hero — breaks the reading column so the field has room to be a field */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 px-5 sm:px-8">
          <div className="mx-auto grid max-w-[420px] items-center gap-12 lg:max-w-5xl lg:grid-cols-[minmax(0,26rem)_auto] lg:gap-20">
            <div className="min-w-0 pt-2 lg:pt-0">
              <Reveal delay={0.05}>
                <div className="flex items-center gap-3">
                  <Image src={fogIcon} alt="" width={44} height={44} priority className="shrink-0" />
                  <span className="text-[13px] font-medium text-[var(--fog-secondary)]">
                    iPhone and iPad · Free
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="mt-6 text-[64px] font-bold leading-[0.9] tracking-[-0.04em] sm:text-[76px]">
                  Fog
                </h1>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="mt-5 max-w-sm text-[21px] leading-snug tracking-[-0.01em]">
                  A notes app where you remember what you wrote.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--fog-secondary)]">
                  Fog reads a note and proposes a title, names your folders and writes the
                  summaries — then leaves every call to you.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <a
                  href="https://apps.apple.com/us/app/fog/id6760272134?itscg=30200&itsct=apps_box_badge&mttnsubad=6760272134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-block transition active:scale-95"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1774396800"
                    alt="Download on the App Store"
                    width={180}
                    height={60}
                    className="max-h-[60px] w-auto object-contain dark:hidden"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
                    alt="Download on the App Store"
                    width={180}
                    height={60}
                    className="hidden max-h-[60px] w-auto object-contain dark:block"
                  />
                </a>
              </Reveal>

              <Reveal delay={0.55}>
                <div className="mt-8 max-w-sm border-t border-[var(--fog-separator)] pt-5">
                  <p className="text-[15px] font-semibold">The phone is not a picture.</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--fog-secondary)]">
                    It is the app, running here. Collapse a section, pin a note, group two of
                    them, or ask it something.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="min-w-0">
              <DeviceFrame>
                <FogWindow />
              </DeviceFrame>
              <p className="mx-auto mt-5 max-w-[372px] text-[12px] leading-relaxed text-[var(--fog-tertiary)]">
                The layout, the motion and the flows are the app&apos;s. Answers and folder
                names here come from a lookup: a browser has no on-device model to ask.
              </p>
            </Reveal>
          </div>
        </section>

        {/* MARK: Everything below returns to the reading column */}
        <div className="mt-20 space-y-14">
          <section>
            <SectionHeader
              title="Screens"
              count={SCREENS.length}
              expanded={screensOpen}
              onToggle={() => setScreensOpen((open) => !open)}
            />
            <SectionBody show={screensOpen}>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-4">
                {SCREENS.map((screen) => (
                  <Image
                    key={screen.alt}
                    src={screen.src}
                    alt={screen.alt}
                    placeholder="blur"
                    sizes="200px"
                    className="w-[176px] shrink-0 snap-center rounded-[12px] sm:w-[196px]"
                  />
                ))}
              </div>
            </SectionBody>
          </section>

          <section>
            <SectionHeader
              title="Built On"
              count={STACK.length}
              expanded={stackOpen}
              onToggle={() => setStackOpen((open) => !open)}
            />
            <SectionBody show={stackOpen}>
              {STACK.map(([name, purpose], index) => (
                <div
                  key={name}
                  className={`flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4 ${
                    index === 0 ? "" : "border-t border-[var(--fog-separator)]"
                  }`}
                >
                  <span className="w-[10rem] shrink-0 text-[15px] font-semibold">{name}</span>
                  <span className="text-[14px] text-[var(--fog-secondary)]">{purpose}</span>
                </div>
              ))}
            </SectionBody>
            <p className="px-1.5 pt-4 text-[14px] leading-relaxed text-[var(--fog-secondary)]">
              No third-party dependencies. Everything the model does happens on the phone —
              and where a phone has no model, the buttons that would have suggested something
              are absent rather than greyed out.
            </p>
          </section>

          <footer className="border-t border-[var(--fog-separator)] px-1.5 pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
              <Link href="/fog/privacy" className="font-medium hover:underline">
                Privacy Policy
              </Link>
              <a
                href="https://github.com/Akshat2923"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fog-secondary)] transition hover:text-[var(--fog-label)]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akshatsaladi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fog-secondary)] transition hover:text-[var(--fog-label)]"
              >
                LinkedIn
              </a>
              <CopyEmail
                className="text-[var(--fog-secondary)] transition hover:text-[var(--fog-label)]"
                copiedLabel="Copied to clipboard"
              />
            </div>
            <p className="pt-3 text-[13px] text-[var(--fog-tertiary)]">
              Fog — a side project by Akshat Saladi. SwiftUI, on-device, offline-first.
            </p>
          </footer>
        </div>
      </div>
    </FogProvider>
  );
}
