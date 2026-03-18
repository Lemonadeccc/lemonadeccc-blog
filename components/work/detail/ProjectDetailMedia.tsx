import Image from "next/image";
import type { CSSProperties } from "react";

export type DetailMediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      type: "video";
      src: string;
      title: string;
      width: number;
      height: number;
    };

export type DetailGalleryRowItem = Extract<DetailMediaItem, { type: "image" }> & {
  basis: number;
};

export type DetailWallImageOrientation = "landscape" | "portrait" | "wide";

export type DetailWallImage = {
  src: string;
  alt: string;
  orientation: DetailWallImageOrientation;
};

const wallImageSizes = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 900, height: 1350 },
  wide: { width: 1600, height: 900 },
};

function DetailMedia({ item }: { item: DetailMediaItem }) {
  return (
    <div
      className="overflow-hidden bg-[#0b0b0b]"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      {item.type === "video" ? (
        <iframe
          src={item.src}
          title={item.title}
          className="h-full w-full"
          style={{ border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="block h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export function DetailMediaStrip({
  items,
  className = "",
}: {
  items: DetailMediaItem[];
  className?: string;
}) {
  return (
    <section className={`px-4 sm:px-8 lg:px-[7rem] ${className}`.trim()}>
      <div className="-m-0.5 md:flex">
        {items.map((item) => (
          <div key={item.src} className="w-full p-0.5 md:w-1/3">
            <DetailMedia item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function DetailJustifiedGallery({
  rows,
  className = "",
}: {
  rows: DetailGalleryRowItem[][];
  className?: string;
}) {
  return (
    <section className={`px-4 sm:px-8 lg:px-[7rem] ${className}`.trim()}>
      <div className="space-y-0">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="-m-0.5 md:flex">
            {row.map((item) => (
              <div
                key={item.src}
                className="w-full p-0.5 md:shrink-0 md:[width:var(--gallery-item-width)]"
                style={
                  {
                    "--gallery-item-width": `${item.basis}%`,
                  } as CSSProperties
                }
              >
                <DetailMedia item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function DetailDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`px-4 sm:px-8 lg:px-[7rem] ${className}`.trim()}>
      <hr className="border-white/80" />
    </div>
  );
}

export function DetailImageWall({
  images,
  className = "",
  wallClassName = "",
}: {
  images: DetailWallImage[];
  className?: string;
  wallClassName?: string;
}) {
  return (
    <section className={`px-4 sm:px-8 lg:px-[7rem] ${className}`.trim()}>
      <div
        className={`columns-1 gap-1 sm:columns-2 lg:columns-4 ${wallClassName}`.trim()}
        style={{ columnGap: "0.25rem" }}
      >
        {images.map((image) => {
          const size = wallImageSizes[image.orientation];

          return (
            <div
              key={image.src}
              className="mb-1 break-inside-avoid overflow-hidden bg-[#181818]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={size.width}
                height={size.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="block h-auto w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
