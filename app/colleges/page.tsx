import { CollegeCard } from "@/components/college-card";
import { CollegeSearch } from "@/components/college-search";
import { Pagination } from "@/components/pagination";
import { collegeQuerySchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";
import type { CollegeCardData } from "@/components/college-card";

async function getColleges(searchParams: Record<string, string | string[] | undefined>) {
  const normalize = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const parsed = collegeQuerySchema.parse({
    search: normalize(searchParams.search) ?? "",
    city: normalize(searchParams.city) ?? "",
    type: normalize(searchParams.type) ?? undefined,
    minRating: normalize(searchParams.minRating) ?? undefined,
    page: normalize(searchParams.page) ?? "1",
    limit: normalize(searchParams.limit) ?? "12",
    sort: normalize(searchParams.sort) ?? "rating",
  });

  const { search, city, type, minRating, page, limit, sort } = parsed;

  const where = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { city: { contains: search, mode: "insensitive" as const } },
              { category: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {},
      city ? { city: { contains: city, mode: "insensitive" as const } } : {},
      type ? { type } : {},
      minRating ? { rating: { gte: minRating } } : {},
    ],
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
  };
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
