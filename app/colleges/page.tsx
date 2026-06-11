import { CollegeCard } from "@/components/college-card";
import { CollegeSearch } from "@/components/college-search";
import { Pagination } from "@/components/pagination";
import { collegeQuerySchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";
import type { CollegeCardData } from "@/components/college-card";

function normalizeQueryParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() === "" ? undefined : raw;
}

async function getColleges(searchParams: Record<string, string | string[] | undefined>) {
  const parsed = collegeQuerySchema.safeParse({
    search: normalizeQueryParam(searchParams.search) ?? "",
    city: normalizeQueryParam(searchParams.city) ?? "",
    type: normalizeQueryParam(searchParams.type),
    minRating: normalizeQueryParam(searchParams.minRating),
    page: normalizeQueryParam(searchParams.page) ?? "1",
    limit: normalizeQueryParam(searchParams.limit) ?? "12",
    sort: normalizeQueryParam(searchParams.sort) ?? "rating",
  });

  const { search, city, type, minRating, page, limit, sort } =
    parsed.success
      ? parsed.data
      : {
          search: "",
          city: "",
          type: undefined,
          minRating: undefined,
          page: 1,
          limit: 12,
          sort: "rating" as const,
        };

  const where = {
    ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
    ...(city ? { city: { contains: city, mode: "insensitive" as const } } : {}),
    ...(type ? { type } : {}),
    ...(minRating ? { rating: { gte: minRating } } : {}),
  };

  const orderBy =
    sort === "tuition"
      ? { tuition: "asc" as const }
      : sort === "ranking"
        ? { ranking: "asc" as const }
        : sort === "recent"
          ? { createdAt: "desc" as const }
          : { rating: "desc" as const };

  const [total, colleges] = await Promise.all([
    prisma.college.count({ where }),
    prisma.college.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { courses: true, reviews: true },
    }),
  ]);

  return {
    data: colleges,
    meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
    filters: { search: search ?? "", city: city ?? "", type: type ?? "" },
  };
}

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const data = await getColleges(params);
  const searchValue = data.filters.search;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <CollegeSearch
        search={data.filters.search}
        city={data.filters.city}
        type={data.filters.type}
      />
      {data.data.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-xl font-semibold text-slate-900">No colleges found</p>
          <p className="mt-2 text-slate-500">
            {searchValue
              ? `No colleges matched "${searchValue}". Try a different name or clear filters.`
              : "No colleges match the current filters. Try changing your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.data.map((college: CollegeCardData) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
      <Pagination page={data.meta.page} totalPages={data.meta.totalPages} searchParams={params} />
    </main>
  );
}
