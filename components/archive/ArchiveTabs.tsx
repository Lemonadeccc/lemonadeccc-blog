"use client";

import { Suspense, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

type Tab = "posts" | "portfolio" | "replica" | "liked" | "inspiration";

function ArchiveTabsInner({ locale }: { locale: SiteLocale }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const copy = getSiteCopy(locale);

  const tabs: { id: Tab; label: string }[] = [
    { id: "posts", label: copy.archive.tabs.posts },
    { id: "portfolio", label: copy.archive.tabs.portfolio },
    { id: "replica", label: copy.archive.tabs.replica },
    { id: "liked", label: copy.archive.tabs.liked },
    { id: "inspiration", label: copy.archive.tabs.inspiration },
  ];

  const activeTab = (searchParams.get("tab") as Tab | null) ?? "posts";

  const setTab = useCallback(
    (tab: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "posts") {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return (
    <div className="mt-10 text-[1.05rem] leading-[1.4] sm:text-[1.1rem] lg:mt-14">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-10 lg:gap-x-0">
        <div className="hidden lg:block lg:col-span-5" />
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold leading-[1.4]">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`cursor-pointer transition-colors ${
                  activeTab === id ? "text-white" : "text-[#565656e6] hover:text-[#8a8a8ae6]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArchiveTabs({ locale }: { locale: SiteLocale }) {
  return (
    <Suspense fallback={null}>
      <ArchiveTabsInner locale={locale} />
    </Suspense>
  );
}
