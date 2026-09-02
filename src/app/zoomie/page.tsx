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

function Section({
  eyebrow,
  title,
  lede,
  accent = "paws",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  accent?: RingKey;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--zm-line-soft)] py-14 sm:py-20">
      <p
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: RING[accent].ink }}
      >
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-[var(--zm-text)] sm:text-[42px]">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--zm-muted)]">
          {lede}
        </p>
      )}
      <div className="mt-8">{children}</div>
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Hero />

          {/* ── Three rings ─────────────────────────────────────────── */}
          <Section
            eyebrow="The whole idea"
            title="Three rings, and a paw instead of a circle."
            lede="Zoomie doesn't draw arcs. It draws a paw and fills it up like a glass of water — and the water line stays level even while the paw is spinning. Three of them, nested, one per metric."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(RING) as RingKey[]).map((key) => (
                <div
                  key={key}
                  className="rounded-[22px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-5"
                >
                  <div
                    className="mb-3 h-1 w-10 rounded-full"
                    style={{ background: RING[key].color }}
                  />
                  <p
                    className="text-xl font-extrabold"
                    style={{ color: RING[key].ink }}
                  >
                    {RING[key].label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--zm-muted)]">
                    {RING[key].blurb}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--zm-dim)]">
              The colours never move. Orange is Paws in the app, in the widget,
              on the Lock Screen, in the Dynamic Island and on a treat badge —
              so a glance is enough.
            </p>
          </Section>

          {/* ── The console ─────────────────────────────────────────── */}
          <Section
            eyebrow="Try it — it actually runs"
            title="A live session, in your browser."
            lede="Nine kinds of playtime across three moods. Pick one, press play, and the rings fill for real. The commentary underneath is the app's own — every line here is lifted straight out of the scene that narrates that session. Tap a quick action and you'll log a wag. Close all three and the zoomies get out."
            accent="playtime"
          >
            <SessionConsole />
          </Section>

          {/* ── Wags ────────────────────────────────────────────────── */}
          <Section
            eyebrow="Wags"
            title="Tapped, not measured."
            lede="Paws come off a pedometer and Playtime comes off a clock, but the third ring is entirely manual — seventeen kinds of moment worth marking, from Bark and Potty to Nailed It and Leg Kick. The photo wag is the strange one: the app runs Vision over a still of your dog, finds the joints, and lets you hang emoji off them."
            accent="wags"
          >
            <WagPhotoEditor />
          </Section>

          {/* ── Screenshots ─────────────────────────────────────────── */}
          <Section
            eyebrow="The real thing"
            title="Shipping on the App Store."
            lede="Everything above is a re-creation. This is the app."
            accent="wags"
          >
            <ShotRail />
          </Section>

          {/* ── Treats ──────────────────────────────────────────────── */}
          <Section
            eyebrow="Treats"
            title="Good dogs get treats."
            lede="Close rings, keep streaks, walk a mile, log a session before 7am. Each award is tinted by the ring it measures, so an orange one is about distance and a three-colour one is about the whole Zoomie."
          >
            <TreatVault />
          </Section>

          {/* ── Insights ────────────────────────────────────────────── */}
          <Section
            eyebrow="Insights"
            title="Then it stops being cute."
            lede="Underneath the emoji and the tennis balls it's a real tracker: hour-by-hour distribution, twelve-week heat maps, ring completion over time, and every session logged down to the paw."
          >
            <Insights />
          </Section>

          {/* ── Siri ────────────────────────────────────────────────── */}
          <Section
            eyebrow="App Intents"
            title="Hands full of tennis balls."
            lede="Ten shortcut families, and Siri answers with the actual rings rather than a sentence about them."
            accent="wags"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-[var(--zm-line)] bg-[var(--zm-card)] py-6">
              <style>{`
                @keyframes zm-marquee { to { transform: translateX(-50%); } }
                .zm-marquee { animation: zm-marquee 34s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .zm-marquee { animation: none } }
              `}</style>
              <div className="zm-marquee flex w-max gap-3">
                {[...SIRI_PHRASES, ...SIRI_PHRASES].map((p, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap rounded-full bg-[var(--zm-active)] px-5 py-2.5 text-sm font-medium text-[var(--zm-muted)]"
                  >
                    &ldquo;{p}&rdquo;
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--zm-card)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--zm-card)] to-transparent" />
            </div>
          </Section>

          {/* ── Under the hood ──────────────────────────────────────── */}
          <Section
            eyebrow="Under the hood"
            title="Apple-first, all the way down."
            lede="One codebase across the app, a widget extension and a shared framework — with a Live Activity that survives the app being closed and an onboarding flow that is, for no defensible reason, a small 2D RPG."
            accent="playtime"
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {STACK.map((group, i) => (
                <div
                  key={i}
                  className="rounded-[22px] border border-[var(--zm-line)] bg-[var(--zm-card)] p-4"
                >
                  {group.map((t) => (
                    <p
                      key={t}
                      className="py-1 text-sm font-semibold text-[var(--zm-muted)]"
                    >
                      {t}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          {/* ── Footer ──────────────────────────────────────────────── */}
          <section className="border-t border-[var(--zm-line-soft)] py-14">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-3xl font-black tracking-tight text-[var(--zm-text)]">
                  Go close some rings.
                </p>
                <p className="mt-2 max-w-sm text-sm text-[var(--zm-faint)]">
                  Zoomie — Dog Activity Tracker. Built by Akshat Saladi.
                </p>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block transition-transform hover:-translate-y-0.5 active:scale-95"
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
      </div>
    </ZoomieFx>
  );
}
