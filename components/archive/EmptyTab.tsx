"use client";

export function EmptyTab({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-white/20">{label}</p>
      <p className="mt-3 text-xs text-white/15 tracking-widest uppercase">{description}</p>
    </div>
  );
}
