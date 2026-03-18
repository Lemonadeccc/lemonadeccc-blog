"use client";

import { useState, useMemo } from "react";
import type { WorkCategory } from "@/lib/work-items";
import { workItems, FILTER_TABS } from "@/lib/work-items";
import { WorkCard } from "./WorkCard";

export function WorkGrid() {
  const [active, setActive] = useState<WorkCategory>("everything");

  const filtered = useMemo(
    () =>
      active === "everything"
        ? workItems
        : workItems.filter((item) => item.categories.includes(active)),
    [active]
  );

  return (
    <div className="px-4 sm:px-10 lg:px-[93px]">
      {/* ── Filter tabs ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-8 lg:mb-12">
        <div className="hidden lg:block" />
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`text-base transition-colors duration-200 cursor-pointer ${
              active === tab.key
                ? "text-white font-medium"
                : "text-white/30 hover:text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
        </nav>
      </div>

      {/* ── Masonry grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {filtered.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
