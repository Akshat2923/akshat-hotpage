import Image from "next/image";
import zoomieIcon from "@/assets/images/ZoomieSpike-watchOS-Default-1088@1x.png";
import { APP_STORE_URL, RING, type RingKey } from "../_lib/zoomie-data";

// A day worth showing off: the numbers from the App Store screenshots.
const DAY = {
  paws: { current: 6400, target: 8000 },
  playtime: { current: 37, target: 45 },
  wags: { current: 4, target: 4 },
};

export function Hero() {
  return (
    <section className="flex flex-col items-center py-10 text-center lg:py-16">
      <Image
        src={zoomieIcon}
        alt="Zoomie app icon"
        width={200}
        height={200}
        priority
        className="animate-float h-[130px] w-[130px] drop-shadow-2xl sm:h-[170px] sm:w-[170px] lg:h-[200px] lg:w-[200px]"
      />

      <h1 className="mt-8 text-[13vw] font-black leading-[0.88] tracking-[-0.04em] text-[var(--zm-text)] sm:text-[64px] lg:text-[76px]">
        Close
        <br />
        your dog&apos;s
        <br />
        <span style={{ color: RING.paws.ink }}>rings.</span>
      </h1>

      <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--zm-muted)]">
        Zoomie is Apple Fitness for a dog who has never once considered their
        step count. Three rings — Paws, Playtime, Wags — and a great deal of
        fuss about closing them.
      </p>

      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block transition-transform hover:-translate-y-0.5 active:scale-95"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1774396800"
            alt="Download Zoomie on the App Store"
            width={200}
            height={67}
            className="h-[58px] w-auto object-contain dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
            alt=""
            aria-hidden="true"
            width={200}
            height={67}
            className="hidden h-[58px] w-auto object-contain dark:block"
          />
      </a>

      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {(Object.keys(RING) as RingKey[]).map((key) => (
          <div key={key}>
            <p
              className="font-mono text-lg font-bold leading-none tabular-nums"
              style={{ color: RING[key].ink }}
            >
              {DAY[key].current.toLocaleString()}
              <span className="text-[var(--zm-dim)]">/{DAY[key].target}</span>
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--zm-dim)]">
              {RING[key].label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
