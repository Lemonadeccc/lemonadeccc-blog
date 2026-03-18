import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = {
  title: "Work | GMUNK",
  description: "The complete creative grid — 1999 to 2026",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0d0d0d] text-white">

        {/* ── Intro ─────────────────────────────────────────────────── */}
        <div className="px-4 sm:px-10 lg:px-[93px] pt-24 lg:pt-32 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: empty */}
            <div className="hidden lg:block" />

            {/* Right: title block */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none">
                  Munky&rsquo;s Grid.
                </h1>
                <p className="mt-2 text-sm text-white/40 tracking-widest">
                  1999 &ndash;&ndash; 2026
                </p>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-white/55 max-w-md">
                <p>
                  The Grid is a mosaic of the creative profile. It is the
                  flowchart of output — the pulse of pursuit. Each entry is a
                  memory, an arc of emotion; a creative fulfillment with vivid
                  learnings and an enduring imprint.
                </p>
                <p>The Grid is the totality of the flow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────────────────── */}
        <div className="pb-24">
          <WorkGrid />
        </div>

      </main>
      <Footer />
    </>
  );
}
