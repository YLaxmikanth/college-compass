import { prisma } from "@/lib/prisma";
import { compareSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = compareSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Compare requires 1 to 3 college ids" }, { status: 400 });
  }

  const colleges = await prisma.college.findMany({
    where: { id: { in: parsed.data.ids } },
    include: { courses: true, reviews: true },
  });

  return Response.json({ data: colleges });
}
