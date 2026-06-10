import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold">
          College Compass
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/colleges">Colleges</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
