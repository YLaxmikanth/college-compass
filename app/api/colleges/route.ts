import { prisma } from "@/lib/prisma";
import { collegeQuerySchema } from "@/lib/validators";

function normalizeQueryParam(value: string | null) {
  return value?.trim() === "" ? undefined : value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = collegeQuerySchema.safeParse({
    search: normalizeQueryParam(url.searchParams.get("search")) ?? "",
    city: normalizeQueryParam(url.searchParams.get("city")) ?? "",
    type: normalizeQueryParam(url.searchParams.get("type")),
    minRating: normalizeQueryParam(url.searchParams.get("minRating")),
    page: normalizeQueryParam(url.searchParams.get("page")) ?? "1",
    limit: normalizeQueryParam(url.searchParams.get("limit")) ?? "12",
    sort: normalizeQueryParam(url.searchParams.get("sort")) ?? "rating",
  });

  if (!parsed.success) {
    return Response.json({ message: "Invalid query" }, { status: 400 });
  }

  const { search, city, type, minRating, page, limit, sort } = parsed.data;
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

  return Response.json({
    data: colleges,
    meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
  });
}
