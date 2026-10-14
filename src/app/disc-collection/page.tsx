import type { Metadata } from "next";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { CopyEmail } from "@/components/CopyEmail";

import { DiscPalette } from "./_components/DiscPalette";
import { CaseStory } from "./_components/CaseStory";
import { APP_STORE_URL, GAME_CASES, MOVIE_CASES, STACK, type CaseFamily } from "./_lib/disc-data";

export const metadata: Metadata = {
  title: "Disc Collection",
  description:
    "A photo is flat. Your case isn't. Take two pictures of a game or movie you own and turn it into a 3D case you can open, with your copy's art on it.",
};

function AppStoreBadge({ tone }: { tone?: "black" }) {
  const badge = (color: "black" | "white") =>
    `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/${color}/en-us?releaseDate=1774396800`;
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block shrink-0 transition-transform hover:-translate-y-0.5 active:scale-95"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badge("black")}
        alt="Download Disc Collection on the App Store"
        width={180}
        height={60}
        className={`h-[54px] w-auto object-contain ${tone ? "" : "dark:hidden"}`}
      />
      {!tone && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={badge("white")}
          alt=""
          aria-hidden="true"
          width={180}
          height={60}
          className="hidden h-[54px] w-auto object-contain dark:block"
        />
      )}
    </a>
  );
}

/** A page of the booklet: printed paper, which doesn't change in Dark Mode. */
function BookletPage({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[4px] bg-white p-7 text-black shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)] ring-1 ring-black/5 sm:p-9">
      <p className="text-[11px] font-bold tracking-[0.3em]">{heading}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Plastics({ label, cases }: { label: string; cases: CaseFamily[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] tracking-[0.2em] text-black/50">{label}</p>
      <ul className="space-y-1.5 text-[13px]">
        {cases.map(({ name, plastic, translucent }) => (
          <li key={name} className="flex items-center gap-3">
            <span
              className="h-3.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-black/15"
              style={{
                background: translucent ? `linear-gradient(135deg, ${plastic}e6, ${plastic}80)` : plastic,
              }}
            />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const LINKS = [
  { label: "Github", href: "https://github.com/Akshat2923", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatsaladi/", Icon: LinkedInIcon },
];

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--dc-line)] px-4 py-2 text-[13px] font-medium text-[var(--dc-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text)] active:scale-95";

export default function DiscCollectionPage() {
  return (
    <>
      <DiscPalette />
      <div
        className="relative z-10 -mt-10 overflow-x-clip bg-[var(--dc-bg)] [font-family:var(--dc-mono)]"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <h1 className="sr-only">Disc Collection</h1>

        {/* ── The case tells it ────────────────────────────────────────── */}
        <CaseStory cta={<AppStoreBadge tone="black" />} />

        {/* ── Liner notes: the booklet, opened flat ────────────────────── */}
        <section className="bg-[var(--dc-band)]">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28">
            <p className="text-[11px] tracking-[0.3em] text-[var(--dc-faint)]">LINER NOTES</p>
            <h2 className="mt-3 max-w-xl text-[clamp(24px,3.6vw,34px)] font-bold leading-tight tracking-[-0.02em] text-[var(--dc-text)]">
              The small print, for anyone who reads the booklet.
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-0">
              <div className="md:origin-right md:[transform:perspective(2200px)_rotateY(4deg)]">
                <BookletPage heading="THE CASES">
                  <p className="mb-6 text-[13px] leading-relaxed text-black/70">
                    Each platform and format gets the case it ships in: its size, its thickness, its
                    plastic, translucent or solid. Even the disc&apos;s rainbow changes between DVD
                    and Blu-ray.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <Plastics label="GAMES" cases={GAME_CASES} />
                    <Plastics label="MOVIES" cases={MOVIE_CASES} />
                  </div>
                </BookletPage>
              </div>
              <div className="md:origin-left md:[transform:perspective(2200px)_rotateY(-4deg)]">
                <BookletPage heading="CREDITS">
                  <p className="mb-6 text-[13px] leading-relaxed text-black/70">
                    Apple frameworks, end to end. No accounts, no ads, no analytics, no third-party
                    code.
                  </p>
                  <dl className="space-y-3">
                    {STACK.map(([name, purpose]) => (
                      <div key={name}>
                        <dt className="text-[13px] font-bold">{name}</dt>
                        <dd className="text-[12px] leading-snug text-black/60">{purpose}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-8 border-t border-black/10 pt-4 text-[11px] tracking-[0.1em] text-black/50">
                    DESIGNED AND BUILT BY AKSHAT SALADI
                  </p>
                </BookletPage>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <section className="bg-[var(--dc-deep)]">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-20 sm:px-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[clamp(26px,4vw,40px)] font-bold leading-none tracking-[-0.03em] text-[var(--dc-text)]">
                Put your shelf on display.
              </p>
              <p className="mt-3 text-[13px] text-[var(--dc-faint)]">
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
          <p className="mx-auto max-w-5xl px-5 pb-10 text-[11px] leading-relaxed text-[var(--dc-faint)] sm:px-6">
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
