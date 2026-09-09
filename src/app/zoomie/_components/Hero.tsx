import Image from "next/image";
import zoomieIcon from "@/assets/images/ZoomieSpike-watchOS-Default-1088@1x.png";
import { APP_STORE_URL, RING, type RingKey } from "../_lib/zoomie-data";
import { DeviceShot } from "./DeviceShot";

// A day worth showing off: the numbers from the App Store screenshots.
const DAY = {
  paws: { current: 6400, target: 8000 },
  playtime: { current: 37, target: 45 },
  wags: { current: 4, target: 4 },
};

export function Hero() {
  return (
    <section className="grid items-center gap-14 py-14 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-8 xl:py-24">
      <div className="text-center xl:text-left">
        <Image
          src={zoomieIcon}
          alt=""
          width={120}
          height={120}
          priority
          className="mx-auto h-14 w-14 rounded-2xl shadow-lg xl:mx-0"
        />

        <h1 className="mt-6 text-[clamp(44px,11vw,84px)] font-black leading-[0.9] tracking-[-0.045em] text-[var(--zm-text)]">
          Close your
          <br />
          dog&apos;s{" "}
          <span style={{ color: RING.paws.ink }}>rings.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-[var(--zm-muted)] xl:mx-0">
          Apple Fitness for a dog who has never once considered their step
          count. Three rings — Paws, Playtime, Wags — and a great deal of fuss
          about closing them.
        </p>

        <div className="mt-8 flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-9 xl:items-start xl:justify-start">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1774396800"
              alt="Download Zoomie on the App Store"
              width={200}
              height={67}
              className="h-[54px] w-auto object-contain dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1774396800"
              alt=""
              aria-hidden="true"
              width={200}
              height={67}
              className="hidden h-[54px] w-auto object-contain dark:block"
            />
          </a>

          <div className="flex gap-7">
            {(Object.keys(RING) as RingKey[]).map((key) => (
              <div key={key}>
                <p
                  className="font-mono text-[17px] font-bold leading-none tabular-nums"
                  style={{ color: RING[key].ink }}
                >
                  {DAY[key].current.toLocaleString()}
                  <span className="text-[var(--zm-dim)]">
                    /{DAY[key].target}
                  </span>
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--zm-dim)]">
                  {RING[key].label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The listing itself. The lead plate is largest and the rest trail off
          the right edge rather than being politely contained — the point is
          that there is more app than fits. The page clips the overflow, so
          nothing scrolls sideways. */}
      <div className="flex items-center justify-center gap-5 xl:-mr-48 xl:justify-start">
        <DeviceShot
          n={1}
          w={244}
          alt="Zoomie's Summary screen"
          priority
          className="shrink-0 shadow-2xl"
        />
        <DeviceShot
          n={6}
          w={196}
          alt="Percy's rings, drilled into"
          className="hidden shrink-0 translate-y-10 shadow-2xl sm:block"
        />
        <DeviceShot
          n={3}
          w={196}
          alt="The Playtime tab"
          className="hidden shrink-0 translate-y-10 shadow-2xl lg:block"
        />
      </div>
    </section>
  );
}
