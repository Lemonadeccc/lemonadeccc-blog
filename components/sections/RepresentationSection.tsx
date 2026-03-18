import type { RepresentationColumn } from "@/lib/types";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function RepresentationSection({
  title,
  columns,
}: {
  title: string;
  columns: RepresentationColumn[];
}) {
  return (
    <section className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <div className="mb-12 h-px bg-white/20" />

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, i) => (
            <AnimateIn key={col.title} delay={i * 80}>
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-white">
                  {col.title}
                </h3>
                <div className="mb-6 h-px bg-white/20" />

                {col.regions.map((region) => (
                  <div key={region.name} className="mb-7">
                    {/* Region name(s) as links */}
                    <p className="mb-3 text-xs text-white/40">
                      {region.name.split(" + ").map((part, pi, arr) => (
                        <span key={part}>
                          <span className="text-white/70 hover:text-white cursor-default">
                            {part}
                          </span>
                          {pi < arr.length - 1 && (
                            <span className="text-white/30"> + </span>
                          )}
                        </span>
                      ))}
                    </p>

                    {region.contacts.map((contact) => (
                      <div key={contact.name} className="mb-4">
                        {contact.agencyUrl ? (
                          <a
                            href={contact.agencyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm font-bold text-white transition-opacity hover:opacity-60"
                          >
                            {contact.agency}
                          </a>
                        ) : (
                          <span className="block text-sm font-bold text-white">
                            {contact.agency}
                          </span>
                        )}
                        <div className="mt-1 text-xs leading-relaxed text-white/50">
                          <span className="font-medium text-white/70">
                            {contact.name}
                          </span>
                          {" — "}
                          {contact.role}
                          <span className="block">{contact.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
