import Image from "next/image";

// The App Store screenshots, shown whole. They're composed plates — phone,
// headline and all — so cropping to the device fought the composition and
// clipped phones that already run off their own bottom edge. Given room they
// read as what they are: the listing.

const SRC_W = 1290;
const SRC_H = 2796;

export function DeviceShot({
  n,
  w,
  alt = "",
  priority = false,
  className,
}: {
  n: number;
  /** Rendered width in px. */
  w: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ width: w, borderRadius: 18, overflow: "hidden" }}
    >
      <Image
        src={`/zoomie/shot-${n}.jpeg`}
        alt={alt}
        width={SRC_W}
        height={SRC_H}
        priority={priority}
        sizes={`${w}px`}
        className="h-auto w-full"
      />
    </div>
  );
}
