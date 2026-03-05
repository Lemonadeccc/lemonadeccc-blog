import Link from "next/link";

export const metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">You are offline</h1>
      <p className="mt-4 text-lg text-neutral-400">
        It looks like you have lost your internet connection. Previously visited
        pages may still be available.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
      >
        Go to Home
      </Link>
    </section>
  );
}
