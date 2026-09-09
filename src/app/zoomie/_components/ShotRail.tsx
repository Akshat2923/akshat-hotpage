import { DeviceShot } from "./DeviceShot";

const SHOTS = [
  { n: 1, caption: "Summary — rings, ground covered, recent playtime" },
  { n: 6, caption: "The rings, drilled into" },
  { n: 3, caption: "Playtime, sorted into three moods" },
  { n: 4, caption: "A live session, and a mapped walk" },
  { n: 5, caption: "Quick actions" },
  { n: 7, caption: "Every session, logged" },
  { n: 2, caption: "Siri, answering with the rings" },
  { n: 8, caption: "Treats" },
];

export function ShotRail() {
  return (
    // Runs off both edges of the reading column so the rail reads as a strip
    // that continues past the page rather than a boxed-in carousel.
    <div className="-mx-5 overflow-x-auto pb-6 sm:-mx-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-5 px-5 sm:px-6">
        {SHOTS.map(({ n, caption }) => (
          <figure key={n} className="shrink-0">
            <DeviceShot n={n} w={228} alt={caption} className="shadow-xl" />
            <figcaption className="mt-4 max-w-[228px] text-[13px] font-semibold leading-snug text-[var(--zm-faint)]">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
