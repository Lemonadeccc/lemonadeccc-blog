"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  buildWidthMap,
  DESKTOP_ROW_LAYOUT,
  splitIntoRows,
  TABLET_ROW_LAYOUT,
} from "@/lib/archive-media-layout";
import type { PortfolioItem } from "@/lib/portfolio-items";

type Props = { items: PortfolioItem[] };
const SINGLE_PORTFOLIO_ITEM_WIDTH = "calc(50% - 0.2rem)";

export function PortfolioList({ items }: Props) {
  const desktopRows = splitIntoRows(items, DESKTOP_ROW_LAYOUT);
  const tabletWidthMap = buildWidthMap(items, TABLET_ROW_LAYOUT);
  const desktopWidthMap = buildWidthMap(items, DESKTOP_ROW_LAYOUT);

  return (
    <div className="py-5">
      <div className="portfolio-wall" data-thumbnails="justify">
        {desktopRows.flatMap((row) =>
          row.map((item) => {
            const isLoneItemRow = row.length === 1;
            const style = {
              "--portfolio-width-sm": isLoneItemRow
                ? SINGLE_PORTFOLIO_ITEM_WIDTH
                : tabletWidthMap.get(item.href),
              "--portfolio-width-lg": isLoneItemRow
                ? SINGLE_PORTFOLIO_ITEM_WIDTH
                : desktopWidthMap.get(item.href),
              "--portfolio-aspect-ratio": item.aspectRatio,
            } as CSSProperties;

            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-thumbnail group"
                style={style}
              >
                <div className="portfolio-thumbnail-media">
                  <Image
                    src={item.image}
                    alt={item.project}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="portfolio-thumbnail-copy">
                  <p className="portfolio-thumbnail-title">{item.project}</p>
                  <p className="portfolio-thumbnail-meta">
                    {item.label} {"\u2014"}
                  </p>
                </div>
              </a>
            );
          }),
        )}
      </div>
    </div>
  );
}
