import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ data: saved });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const collegeId = String(body.collegeId ?? "");
  if (!collegeId) return Response.json({ message: "collegeId required" }, { status: 400 });

  const saved = await prisma.savedCollege.upsert({
    where: {
      userId_collegeId: { userId: session.user.id, collegeId },
    },
    update: {},
    create: { userId: session.user.id, collegeId },
  });

  return Response.json({ data: saved }, { status: 201 });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const collegeId = url.searchParams.get("collegeId");
  if (!collegeId) return Response.json({ message: "collegeId required" }, { status: 400 });

  await prisma.savedCollege.deleteMany({
    where: { userId: session.user.id, collegeId },
  });

  return Response.json({ ok: true });
}
