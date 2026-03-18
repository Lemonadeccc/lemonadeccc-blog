"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  getLocaleFromPathname,
  localizeHref,
  stripLocalePrefix,
} from "@/lib/site-locale";

function LangToggleInner({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLang = getLocaleFromPathname(pathname);
  const nextLang = currentLang === "zh" ? "en" : "zh";

  function toggle() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lang");
    const targetPath = localizeHref(stripLocalePrefix(pathname), nextLang);
    const qs = params.toString();
    router.push(qs ? `${targetPath}?${qs}` : targetPath);
  }

  return (
    <button
      onClick={toggle}
      className={
        className ??
        "cursor-pointer text-sm tracking-[0.18em] uppercase text-white/45 transition-colors hover:text-white hover:underline"
      }
    >
      {currentLang === "zh" ? "EN" : "中文"}
    </button>
  );
}

export function LangToggle({ className }: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <LangToggleInner className={className} />
    </Suspense>
  );
}
