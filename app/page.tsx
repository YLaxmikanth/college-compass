import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">
            College Discovery Platform
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Find the right college, compare options, and save the ones worth revisiting.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Search a live PostgreSQL-backed catalog, inspect college details, compare up to three
            colleges, and save favorites after signing in.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/colleges" className="rounded-full bg-slate-900 px-5 py-3 text-white">
            Browse colleges
          </Link>
          <Link href="/compare" className="rounded-full border border-slate-300 px-5 py-3">
            Compare colleges
          </Link>
          <Link href="/login" className="rounded-full border border-slate-300 px-5 py-3">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
