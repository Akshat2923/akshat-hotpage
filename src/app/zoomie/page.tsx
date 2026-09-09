import type { Metadata } from "next";
import Link from "next/link";
import { Nunito } from "next/font/google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { CopyEmail } from "@/components/CopyEmail";

import { APP_STORE_URL, RING, SIRI_PHRASES, type RingKey } from "./_lib/zoomie-data";
import { ZoomieFx } from "./_components/ZoomieFx";
import { Hero } from "./_components/Hero";
import { PawRings } from "./_components/PawRings";
import { SessionConsole } from "./_components/SessionConsole";
import { WagPhotoEditor } from "./_components/WagPhotoEditor";
import { ShotRail } from "./_components/ShotRail";
import { TreatVault } from "./_components/TreatVault";
import { Insights } from "./_components/Insights";

// The App Store screenshots are set in a heavy rounded geometric face; the
// page follows them rather than the site's body font.
const display = Nunito({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Zoomie",
  description:
    "Zoomie is a dog activity tracker built around three rings — Paws, Playtime and Wags. Close your dog's rings.",
};

/**
 * Sections carry their own full-width ground rather than sitting in one
 * uniform column. Alternating `plain` / `band` / `deep` is what gives the page
 * a rhythm — without it every section reads at the same altitude no matter
 * what's inside it.
 */
function Section({
  tone = "plain",
  eyebrow,
  title,
  lede,
  accent = "paws",
  wide = false,
  children,
}: {
  tone?: "plain" | "band" | "deep";
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  accent?: RingKey;
  /** Drop the reading-width cap — for sections that are mostly media. */
  wide?: boolean;
  children: React.ReactNode;
}) {
  const ground =
    tone === "deep"
      ? "bg-[var(--zm-deep)]"
      : tone === "band"
        ? "bg-[var(--zm-band)]"
        : "";

  return (
    <section className={ground}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        {(eyebrow || title) && (
          <header className={wide ? "" : "max-w-2xl"}>
            {eyebrow && (
              <p
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: RING[accent].ink }}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-[clamp(30px,4.6vw,50px)] font-black leading-[1.03] tracking-[-0.035em] text-[var(--zm-text)]">
                {title}
              </h2>
            )}
            {lede && (
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--zm-muted)]">
                {lede}
              </p>
            )}
          </header>
        )}
        <div className={eyebrow || title ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

const STACK = [
  ["Swift", "SwiftUI", "SwiftData"],
  ["HealthKit", "CoreMotion", "WeatherKit"],
  ["WidgetKit", "ActivityKit", "App Intents"],
  ["Vision", "SpriteKit", "Core Location"],
];

const LINKS = [
  { label: "Github", href: "https://github.com/Akshat2923", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akshatsaladi/",
    Icon: LinkedInIcon,
  },
];

const DAY = { paws: 6400 / 8000, playtime: 37 / 45, wags: 1 };

export default function ZoomiePage() {
  return (
    <ZoomieFx>
      <div
        className={`${display.className} relative z-10 overflow-x-clip bg-[var(--zm-bg)]`}
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="bg-[var(--zm-deep)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Hero />
          </div>
        </section>

        {/* ── The idea, told with the thing itself ──────────────────── */}
        <Section
          eyebrow="The whole idea"
          title={<>A paw, filled like a glass of water.</>}
        >
          <div className="grid items-center gap-12 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-16">
            <PawRings progress={DAY} size={260} className="mx-auto shrink-0" />

            <div className="space-y-8">
              {(Object.keys(RING) as RingKey[]).map((key) => (
                <div key={key} className="flex gap-4">
                  <span
                    className="mt-1.5 h-6 w-1 shrink-0 rounded-full"
                    style={{ background: RING[key].color }}
                  />
                  <div>
                    <p
                      className="text-lg font-extrabold leading-none"
                      style={{ color: RING[key].ink }}
                    >
                      {RING[key].label}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--zm-muted)]">
                      {RING[key].blurb}
                    </p>
                  </div>
                </div>
              ))}
              <p className="border-t border-[var(--zm-line-soft)] pt-6 text-[15px] leading-relaxed text-[var(--zm-faint)]">
                Zoomie doesn&apos;t draw arcs. It draws a paw and fills it, and
                the water line stays level even while the paw is spinning. The
                colours never move either — orange is Paws in the app, in the
                widget, on the Lock Screen and on a treat badge.
              </p>
            </div>
          </div>
        </Section>

        {/* ── The console ───────────────────────────────────────────── */}
        <Section
          tone="band"
          eyebrow="Try it — it actually runs"
          title="A live session, in your browser."
          lede="Nine kinds of playtime across three moods. Pick one, press play, and the rings fill for real. Every line of commentary is lifted straight out of the scene that narrates that session in the app. Tap a quick action and you'll log a wag. Close all three and the zoomies get out."
          accent="playtime"
        >
          <SessionConsole />
        </Section>

        {/* ── Every screen ──────────────────────────────────────────── */}
        <Section
          tone="deep"
          eyebrow="Shipping now"
          title="Every screen, as it ships."
          accent="wags"
          wide
        >
          <ShotRail />
        </Section>

        {/* ── Wags ──────────────────────────────────────────────────── */}
        <Section
          eyebrow="Wags"
          title="Tapped, not measured."
          lede="Paws come off a pedometer and Playtime comes off a clock, but the third ring is entirely manual — seventeen kinds of moment worth marking, from Bark and Potty to Nailed It and Leg Kick. The photo wag is the strange one: the app runs Vision over a still of your dog, finds the joints, and lets you hang emoji off them."
          accent="wags"
        >
          <WagPhotoEditor />
        </Section>

        {/* ── Treats ────────────────────────────────────────────────── */}
        <Section
          tone="band"
          eyebrow="Treats"
          title="Good dogs get treats."
          lede="Close rings, keep streaks, walk a mile, log a session before 7am. Each award is tinted by the ring it measures, so an orange one is about distance and a three-colour one is about the whole Zoomie."
        >
          <TreatVault />
        </Section>

        {/* ── Insights ──────────────────────────────────────────────── */}
        <Section
          eyebrow="Insights"
          title="Then it stops being cute."
          lede="Underneath the emoji and the tennis balls it's a real tracker: hour-by-hour distribution, twelve-week heat maps, ring completion over time, and every session logged down to the paw."
        >
          <Insights />
        </Section>

        {/* ── Siri ──────────────────────────────────────────────────── */}
        <Section tone="band" title="Hands full of tennis balls." wide>
          <div className="relative overflow-hidden py-2">
            <style>{`
              @keyframes zm-marquee { to { transform: translateX(-50%); } }
              .zm-marquee { animation: zm-marquee 34s linear infinite; }
              @media (prefers-reduced-motion: reduce) { .zm-marquee { animation: none } }
            `}</style>
            <div className="zm-marquee flex w-max gap-3">
              {[...SIRI_PHRASES, ...SIRI_PHRASES].map((p, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-full bg-[var(--zm-card)] px-5 py-2.5 text-[15px] font-medium text-[var(--zm-muted)] ring-1 ring-[var(--zm-line)]"
                >
                  &ldquo;{p}&rdquo;
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--zm-band)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--zm-band)] to-transparent" />
          </div>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-[var(--zm-muted)]">
            Ten shortcut families, and Siri answers with the actual rings rather
            than a sentence about them.
          </p>
        </Section>

        {/* ── Under the hood ────────────────────────────────────────── */}
        <Section
          title="Apple-first, all the way down."
          lede="One codebase across the app, a widget extension and a shared framework — with a Live Activity that survives the app being closed and an onboarding flow that is, for no defensible reason, a small 2D RPG."
          accent="playtime"
        >
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.flat().map((t) => (
              <p
                key={t}
                className="border-b border-[var(--zm-line-soft)] py-2.5 text-[15px] font-semibold text-[var(--zm-muted)]"
              >
                {t}
              </p>
            ))}
          </div>
        </Section>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <section className="bg-[var(--zm-deep)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[clamp(30px,4.6vw,50px)] font-black leading-none tracking-[-0.035em] text-[var(--zm-text)]">
                Go close some rings.
              </p>
              <p className="mt-3 text-[15px] text-[var(--zm-faint)]">
                Zoomie — Dog Activity Tracker. Built by Akshat Saladi.
              </p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1774396800"
                  alt="Download Zoomie on the App Store"
                  width={180}
                  height={60}
                  className="h-[54px] w-auto object-contain dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
                  alt=""
                  aria-hidden="true"
                  width={180}
                  height={60}
                  className="hidden h-[54px] w-auto object-contain dark:block"
                />
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--zm-line)] px-4 py-2 text-sm font-semibold text-[var(--zm-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--zm-hover)] hover:text-[var(--zm-text)] active:scale-95"
                >
                  {label}
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <CopyEmail
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--zm-line)] px-4 py-2 text-sm font-semibold text-[var(--zm-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--zm-hover)] hover:text-[var(--zm-text)] active:scale-95"
                icon={<EmailIcon className="h-4 w-4" />}
              />
              <Link
                href="/zoomie/privacy"
                className="inline-flex items-center rounded-full border border-[var(--zm-line)] px-4 py-2 text-sm font-semibold text-[var(--zm-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--zm-hover)] hover:text-[var(--zm-text)] active:scale-95"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ZoomieFx>
  );
}
