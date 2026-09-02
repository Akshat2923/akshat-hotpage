"use client";

//
//  /fog
//  The page is the app.
//
//  The mesh behind it is Fog's own background, ported; the window below the title is Fog
//  itself, wired up; the copy is stored as notes because reading about the app should mean
//  using it. What the page cannot do — run Apple's on-device model — it says so plainly
//  rather than pretending.
//

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import { FogProvider } from "@/components/fog/fog-context";
import { MeshField } from "@/components/fog/mesh-field";
import { FogWindow, SectionBody, SectionHeader } from "@/components/fog/fog-window";
import { CopyEmail } from "@/components/CopyEmail";
import fogIcon from "@/assets/images/FogIcon-watchOS-Default-1088x1088@1x.png";
import screen1 from "@/assets/fog/screen-1.jpeg";
import screen2 from "@/assets/fog/screen-2.jpeg";
import screen3 from "@/assets/fog/screen-3.jpeg";
import screen4 from "@/assets/fog/screen-4.jpeg";

const ROUNDED = 'ui-rounded, "SF Pro Rounded", Avenir, system-ui, sans-serif';

const SCREENS = [
  { src: screen1, alt: "The Fog list: Forecast, Pinned, Folders and Unfiled sections" },
  { src: screen2, alt: "A note in Fog with its suggested title and the note menu open" },
  { src: screen3, alt: "Selecting notes and grouping them into a new folder" },
  { src: screen4, alt: "A folder with a generated summary and its notes below" },
];

const STACK = [
  ["SwiftUI", "Every screen, and the mesh gradient behind them"],
  ["SwiftData", "Notes and folders, stored on the device"],
  ["CloudKit", "Sync between your own devices, through your own iCloud"],
  ["Foundation Models", "Titles, folder names, summaries, answers — all local"],
  ["App Intents", "Apple's notes schema, which is how Siri already understands"],
  ["Core Spotlight", "Notes findable by text, title, or a tag you never typed"],
  ["WidgetKit", "The latest note and folder, in the colour you picked"],
];

/// The landing screen's reveal, compressed. The app spends 3.4 seconds on this because it
/// only happens once ever; a web page does not get that kind of patience.
function Reveal({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function FogPage() {
  const [screensOpen, setScreensOpen] = React.useState(true);
  const [stackOpen, setStackOpen] = React.useState(true);

  return (
    <FogProvider>
      <MeshField />

      <div className="space-y-12">
        {/* MARK: Landing */}
        <section className="pt-2 text-center">
          <Reveal delay={0.05}>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/45">
              iPhone &amp; iPad · Free
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Image
              src={fogIcon}
              alt="Fog app icon"
              width={132}
              height={132}
              priority
              className="animate-float mx-auto mt-6 rounded-[28px] shadow-[0_24px_48px_-18px_rgba(0,0,0,0.45)]"
            />
          </Reveal>

          <Reveal delay={0.4}>
            <h1
              style={{ fontFamily: ROUNDED }}
              className="mt-6 text-6xl font-bold tracking-tight sm:text-7xl"
            >
              Fog
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p
              style={{ fontFamily: ROUNDED }}
              className="mx-auto mt-3 max-w-sm text-[19px] leading-snug text-foreground/60"
            >
              A notes app where you <span className="font-bold text-foreground">remember</span>{" "}
              what you wrote.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
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
                width={202}
                height={67}
                className="max-h-[67px] w-auto object-contain dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
                alt="Download on the App Store"
                width={202}
                height={67}
                className="hidden max-h-[67px] w-auto object-contain dark:block"
              />
            </a>
          </Reveal>
        </section>

        {/* MARK: The app, running here */}
        <section>
          <Reveal delay={1}>
            <p className="mb-3 px-1 text-center text-[13px] text-foreground/50">
              This is Fog, running in your browser. Collapse a section, pin a note, group two
              of them, or ask it something.
            </p>
            <FogWindow />
            <p className="mt-3 px-1 text-center text-[12px] leading-relaxed text-foreground/40">
              The layout, the motion and the flows are the app&apos;s. The answers and folder
              names here come from a lookup — a browser has no on-device model to ask, and the
              honest version of this demo says so.
            </p>
          </Reveal>
        </section>

        {/* MARK: Screens */}
        <section>
          <SectionHeader
            title="Screens"
            count={SCREENS.length}
            expanded={screensOpen}
            onToggle={() => setScreensOpen((open) => !open)}
          />
          <SectionBody show={screensOpen}>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto p-3">
              {SCREENS.map((screen) => (
                <Image
                  key={screen.alt}
                  src={screen.src}
                  alt={screen.alt}
                  placeholder="blur"
                  sizes="220px"
                  className="w-[200px] shrink-0 snap-center rounded-[18px] transition duration-300 hover:-translate-y-1 sm:w-[220px]"
                />
              ))}
            </div>
          </SectionBody>
        </section>

        {/* MARK: Built on */}
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
                className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3 ${
                  index === 0 ? "" : "border-t border-black/[0.06] dark:border-white/[0.07]"
                }`}
              >
                <span className="w-[9.5rem] shrink-0 text-[15px] font-semibold">{name}</span>
                <span className="text-[13px] text-foreground/55">{purpose}</span>
              </div>
            ))}
          </SectionBody>
          <p className="px-2 pt-3 text-[13px] leading-relaxed text-foreground/50">
            No third-party dependencies. Everything the model does happens on the phone — and
            where a phone has no model, the buttons that would have suggested something are
            absent rather than greyed out.
          </p>
        </section>

        {/* MARK: Footer */}
        <section className="border-t border-white/40 pt-6 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <Link href="/fog/privacy" className="font-medium hover:underline">
              Privacy Policy
            </Link>
            <a
              href="https://github.com/Akshat2923"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshatsaladi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:underline"
            >
              LinkedIn
            </a>
            <CopyEmail
              className="text-foreground/60 transition hover:text-foreground hover:underline"
              copiedLabel="Copied to clipboard"
            />
          </div>
          <p className="pt-3 text-[12px] text-foreground/40">
            Fog — a side project by Akshat Saladi. SwiftUI, on-device, offline-first.
          </p>
        </section>
      </div>
    </FogProvider>
  );
}
