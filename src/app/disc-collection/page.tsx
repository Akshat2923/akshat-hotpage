import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { CopyEmail } from "@/components/CopyEmail";
import icon from "@/assets/Disc-Collection/Disc Collection-iOS-Default-1024@1x.png";

import { DiscPalette } from "./_components/DiscPalette";
import { CaseStage } from "./_components/CaseStage";
import {
  APP_STORE_URL,
  GAME_CASES,
  MOVIE_CASES,
  STACK,
  STEPS,
  type CaseFamily,
} from "./_lib/disc-data";

// Heavy, slightly wide grotesque: the lettering on a case's spine.
const display = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Disc Collection",
  description:
    "A photo is flat. Your case isn't. Take two pictures of a game or movie you own and turn it into a 3D case you can open, with your copy's art on it.",
};

function Section({
  tone = "plain",
  eyebrow,
  title,
  lede,
  children,
}: {
  tone?: "plain" | "band" | "deep";
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ground =
    tone === "deep" ? "bg-[var(--dc-deep)]" : tone === "band" ? "bg-[var(--dc-band)]" : "";
  return (
    <section className={ground}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <header className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--dc-ink)]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-[clamp(30px,4.6vw,50px)] font-black leading-[1.03] tracking-[-0.035em] text-[var(--dc-text)]">
              {title}
            </h2>
          )}
          {lede && (
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--dc-muted)]">{lede}</p>
          )}
        </header>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

function AppStoreBadge({ height = 54 }: { height?: number }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block shrink-0 transition-transform hover:-translate-y-0.5 active:scale-95"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1774396800"
        alt="Download Disc Collection on the App Store"
        width={180}
        height={60}
        style={{ height }}
        className="w-auto object-contain dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
        alt=""
        aria-hidden="true"
        width={180}
        height={60}
        style={{ height }}
        className="hidden w-auto object-contain dark:block"
      />
    </a>
  );
}

function Swatches({ label, cases }: { label: string; cases: CaseFamily[] }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--dc-faint)]">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {cases.map(({ name, plastic, translucent }) => (
          <span
            key={name}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--dc-card)] px-3.5 py-2 text-[14px] font-semibold text-[var(--dc-muted)] ring-1 ring-[var(--dc-line)]"
          >
            <span
              className="h-3.5 w-3.5 rounded-full ring-1 ring-[var(--dc-line)]"
              style={{
                background: translucent
                  ? `linear-gradient(135deg, ${plastic}cc, ${plastic}66)`
                  : plastic,
              }}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** One post as the Gallery sets it: who, the case, the name and stars, when. */
function GalleryPost({
  collector,
  caseNumber,
  title,
  stars,
  when,
  colors,
}: {
  collector: number;
  caseNumber: number;
  title: string;
  stars: number;
  when: string;
  colors: [string, string];
}) {
  return (
    <figure className="overflow-hidden rounded-[22px] bg-[var(--dc-card)] ring-1 ring-[var(--dc-line)]">
      <figcaption className="px-4 pb-2 pt-3.5 text-[12px] font-semibold text-[var(--dc-faint)]">
        Collector #{collector}, Case #{caseNumber}
      </figcaption>
      <div
        className="flex aspect-[4/5] items-center justify-center"
        style={{ background: `radial-gradient(circle at 50% 40%, ${colors[0]}, ${colors[1]})` }}
      >
        <div
          className="h-[58%] w-[46%] rounded-[6px] shadow-2xl"
          style={{
            background: `linear-gradient(160deg, ${colors[0]}, ${colors[1]} 70%)`,
            boxShadow: "0 0 0 5px rgba(41,128,255,.85), 0 30px 50px rgba(0,0,0,.45)",
            transform: "perspective(600px) rotateY(-16deg)",
          }}
        />
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[15px] font-bold text-[var(--dc-text)]">{title}</p>
        <p className="mt-0.5 text-[12px] tracking-[0.15em] text-[#f5a623]">
          {"★".repeat(stars)}
          <span className="text-[var(--dc-line)]">{"★".repeat(5 - stars)}</span>
        </p>
        <p className="mt-2 text-[12px] text-[var(--dc-faint)]">Displayed {when}</p>
      </div>
    </figure>
  );
}

const LINKS = [
  { label: "Github", href: "https://github.com/Akshat2923", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatsaladi/", Icon: LinkedInIcon },
];

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--dc-line)] px-4 py-2 text-sm font-semibold text-[var(--dc-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text)] active:scale-95";

export default function DiscCollectionPage() {
  return (
    <>
      <DiscPalette />
      <div
        className={`${display.className} relative z-10 overflow-x-clip bg-[var(--dc-bg)]`}
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        {/* ── Hero: the studio, with the case standing in the light ─────── */}
        <section
          className="bg-[var(--dc-deep)]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 55% at 70% 45%, var(--dc-spot), transparent 70%)",
          }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:py-20">
            <div className="text-center lg:text-left">
              <Image
                src={icon}
                alt=""
                width={120}
                height={120}
                priority
                className="mx-auto h-16 w-16 rounded-[18px] shadow-lg lg:mx-0"
              />
              <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--dc-faint)]">
                Disc Collection · iPhone and iPad
              </p>
              <h1 className="mt-3 text-[clamp(46px,10vw,84px)] font-black leading-[0.9] tracking-[-0.045em] text-[var(--dc-text)]">
                Your shelf,
                <br />
                <span className="text-[var(--dc-ink)]">up close.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-[var(--dc-muted)] lg:mx-0">
                <span className="font-bold text-[var(--dc-text)]">
                  A photo is flat. Your case isn&apos;t.
                </span>{" "}
                Take two pictures of it and it comes back 3D: turn it over, open it, see the
                spine and the inside, with your copy&apos;s art on it.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <AppStoreBadge />
              </div>
            </div>

            <div>
              <CaseStage />
              <p className="mx-auto mt-4 max-w-sm text-center text-[12px] leading-relaxed text-[var(--dc-faint)]">
                Drag it, tap it. This one is CSS with made-up art. The app&apos;s is RealityKit,
                lit in a studio, wearing your photos.
              </p>
            </div>
          </div>
        </section>

        {/* ── Capture ──────────────────────────────────────────────────── */}
        <Section
          eyebrow="Capture"
          title="Two photos of your copy."
          lede="The launch edition, the slipcover, the inside art, the sticker from the shop you bought it at. It's all in the photos, so it's all on the case."
        >
          <div className="grid gap-10 sm:grid-cols-3">
            {STEPS.map(({ n, title, body }) => (
              <div key={n} className="border-t border-[var(--dc-line)] pt-6">
                <p className="font-mono text-[13px] font-bold text-[var(--dc-ink)]">{n}</p>
                <p className="mt-3 text-[22px] font-extrabold tracking-[-0.02em] text-[var(--dc-text)]">
                  {title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--dc-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Cases ────────────────────────────────────────────────────── */}
        <Section
          tone="band"
          eyebrow="Every case its own plastic"
          title="Blue for PlayStation. Green for Xbox. Black for DVD."
          lede="Each platform and format gets the case it actually ships in: its size, its thickness, its plastic, translucent or solid. Even the disc's rainbow spacing changes between DVD and Blu-ray."
        >
          <div className="space-y-10">
            <Swatches label="Games" cases={GAME_CASES} />
            <Swatches label="Movies" cases={MOVIE_CASES} />
          </div>
        </Section>

        {/* ── The log ──────────────────────────────────────────────────── */}
        <Section
          eyebrow="The log"
          title="What you own, what you finished, what you thought."
          lede="See your whole shelf without pulling a single case off it. Rating, hours played, finished or not; runtime, director, watched. A review in your own words. Numbered as you add them — Case #1, Case #2 — gaps and all, like a real catalog. It syncs between your devices through your own iCloud."
        />

        {/* ── Gallery ──────────────────────────────────────────────────── */}
        <Section
          tone="deep"
          eyebrow="The Gallery"
          title="Everyone's cases. Nobody's names."
          lede="Put a case on display and it joins one timeline, newest first. Rare editions turn up here. No usernames, no follows, no profiles — just Collector #4821 and the case they love. Your review never leaves your phone."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <GalleryPost
              collector={4821}
              caseNumber={14}
              title="A Launch Edition"
              stars={5}
              when="2 hours ago"
              colors={["#e1525a", "#2a1446"]}
            />
            <GalleryPost
              collector={377}
              caseNumber={203}
              title="A Boutique 4K"
              stars={4}
              when="5 hours ago"
              colors={["#2a9d8f", "#0b1f2a"]}
            />
            <GalleryPost
              collector={9012}
              caseNumber={3}
              title="A Childhood Favorite"
              stars={5}
              when="yesterday"
              colors={["#ffb057", "#4b1d6b"]}
            />
          </div>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--dc-faint)]">
            Report or block from any post. Both take effect at once, on all your devices.
          </p>
        </Section>

        {/* ── Under the hood ───────────────────────────────────────────── */}
        <Section
          tone="band"
          title="Apple frameworks, end to end."
          lede="No accounts, no ads, no analytics, no third-party code. The collection is SwiftData in your private iCloud; the Gallery is CloudKit's public database, read without signing in."
        >
          <div className="grid gap-x-10 sm:grid-cols-2">
            {STACK.map(([name, purpose]) => (
              <div
                key={name}
                className="flex flex-col gap-0.5 border-b border-[var(--dc-line-soft)] py-3.5"
              >
                <span className="text-[15px] font-bold text-[var(--dc-text)]">{name}</span>
                <span className="text-[14px] text-[var(--dc-muted)]">{purpose}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <section className="bg-[var(--dc-deep)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[clamp(30px,4.6vw,50px)] font-black leading-none tracking-[-0.035em] text-[var(--dc-text)]">
                Put your shelf on display.
              </p>
              <p className="mt-3 text-[15px] text-[var(--dc-faint)]">
                A hobby project by Akshat Saladi. Feedback welcome, good or bad.
              </p>
              <div className="mt-7">
                <AppStoreBadge />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {LINKS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={pill}>
                  {label}
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <CopyEmail className={pill} icon={<EmailIcon className="h-4 w-4" />} />
              <Link href="/disc-collection/privacy" className={pill}>
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="mx-auto max-w-6xl px-5 pb-10 text-[12px] leading-relaxed text-[var(--dc-faint)] sm:px-6">
            Disc Collection isn&apos;t affiliated with or endorsed by any game publisher, film
            studio or platform maker. The app ships with no cover art: every case shows photos its
            owner took of their own copy, and the artwork in them belongs to its copyright
            holders. PlayStation, Xbox, Wii, GameCube, Blu-ray, DVD and other names are
            trademarks of their owners, used only to identify what a case is.
          </p>
        </section>
      </div>
    </>
  );
}
