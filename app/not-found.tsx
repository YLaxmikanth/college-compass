import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <h2 className="text-2xl font-semibold">College not found</h2>
      <p className="mt-2 text-sm text-neutral-600">The page you requested does not exist.</p>
      <Link href="/" className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-white">
        Back home
      </Link>
    </div>
  );
}
