import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string" && value) params.set(key, value);
  });
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);
  return (
    <div className="flex items-center justify-between">
      <Link href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(prev) })}`} className="rounded-full border px-4 py-2">
        Previous
      </Link>
      <span className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </span>
      <Link href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(next) })}`} className="rounded-full border px-4 py-2">
        Next
      </Link>
    </div>
  );
}
