import { CollegeCard } from "@/components/college-card";
import { CollegeSearch } from "@/components/college-search";
import { Pagination } from "@/components/pagination";
import type { CollegeCardData } from "@/components/college-card";

async function getColleges(searchParams: Record<string, string | string[] | undefined>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const url = new URL("/api/colleges", baseUrl);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string" && value) url.searchParams.set(key, value);
  });
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load colleges");
  return res.json();
}

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const data = await getColleges(params);
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <CollegeSearch />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((college: CollegeCardData) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
      <Pagination page={data.meta.page} totalPages={data.meta.totalPages} searchParams={params} />
    </main>
  );
}
