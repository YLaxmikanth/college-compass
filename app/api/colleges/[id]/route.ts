import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      reviews: { include: { user: { select: { name: true, avatarUrl: true } } } },
    },
  });

  if (!college) {
    return Response.json({ message: "College not found" }, { status: 404 });
  }

  return Response.json({ data: college });
}
