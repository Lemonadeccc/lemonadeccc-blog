import Image from "next/image";
import type { WorkItem } from "@/lib/work-items";

const TYPE_BADGE: Record<string, string> = {
  blog: "Essay",
  resource: "Resource",
};

export function WorkCard({ item }: { item: WorkItem }) {
  const isExternal = item.type === "resource" && item.resourceUrl;
  const href = isExternal ? item.resourceUrl! : item.slug;

  return (
    /*
     * thumbnails-pad equivalent: padding 0.1rem.
     * On hover, background → white (original: #fff).
     * We use white/15 to adapt to dark theme — gives a thin luminous frame.
     */
    <article
      className={`
        group
        self-start
        p-[2px]
        bg-transparent hover:bg-white
        transition-colors duration-200
        ${item.span === 2 ? "col-span-1 sm:col-span-2" : "col-span-1"}
      `}
    >
      <a
        href={href}
        className="image-link block"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {/* thumb_image — padding-bottom 61.5258% aspect ratio */}
        <div
          className="relative w-full overflow-hidden bg-[#181818]"
          style={{ paddingBottom: "61.5258%" }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />

          {/* Type badge */}
          {item.type !== "project" && (
            <div className="absolute top-3 left-3">
              <span className="rounded-sm border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm transition-colors duration-200 group-hover:border-black/15 group-hover:bg-white/85 group-hover:text-black">
                {TYPE_BADGE[item.type]}
                {item.resourceType === "video" && " ▶"}
              </span>
            </div>
          )}
        </div>

        {/* title — inside <a>, just like original */}
        <div className="title mt-2.5 px-0.5">
          <span className="text-sm font-extrabold leading-snug text-white/90 transition-colors duration-200 group-hover:text-black">
            {item.title}
          </span>
        </div>
      </a>

      {/* tags — outside <a>, just like original */}
      <div className="tags mt-0.5 mb-2 px-0.5">
        <span className="text-xs tracking-wide text-white/35 transition-colors duration-200 group-hover:text-black">
          {item.dateLabel}
        </span>
      </div>
    </article>
  );
}
