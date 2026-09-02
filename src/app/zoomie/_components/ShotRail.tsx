import Image from "next/image";

const SHOTS = [
  { n: 1, caption: "Summary — three rings, ground covered, recent playtime" },
  { n: 6, caption: "The rings, drilled into — bar chart and 12-week heat map" },
  { n: 3, caption: "Playtime, sorted into Everyday, High Energy and Rest" },
  { n: 4, caption: "Tug of war, mid-session, with the live control bar" },
  { n: 5, caption: "Quick actions — bark, potty, pulled, treat, photo, note" },
  { n: 7, caption: "Every session, logged, down to the paws" },
  { n: 2, caption: "Siri, answering with the actual rings" },
  { n: 8, caption: "First Zoomie — the treat for closing all three" },
];

export function ShotRail() {
  return (
    <div className="-mx-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
      <div className="flex w-max snap-x snap-mandatory gap-4 px-3">
        {SHOTS.map(({ n, caption }) => (
          <figure key={n} className="w-[220px] shrink-0 snap-start sm:w-[250px]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src={`/zoomie/shot-${n}.jpeg`}
                alt={caption}
                width={250}
                height={542}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-2 text-[11px] leading-snug text-white/35">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
