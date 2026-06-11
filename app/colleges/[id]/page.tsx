import { notFound } from "next/navigation";
import { CompareToggle } from "@/components/compare-toggle";
import { prisma } from "@/lib/prisma";

async function getCollege(id: string) {
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      reviews: { include: { user: { select: { name: true, avatarUrl: true } } } },
    },
  });

  if (!college) return null;
  return college;
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await getCollege(id);
  if (!college) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">{college.name}</h1>
            <p className="mt-2 text-slate-500">
              {college.city}, {college.state} · {college.type}
            </p>
          </div>
          <CompareToggle id={college.id} />
        </div>
        <p className="mt-6 text-slate-600">{college.overview}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Metric label="Tuition" value={`₹${college.tuition.toLocaleString()}`} />
          <Metric label="Rating" value={college.rating.toFixed(1)} />
          <Metric label="Acceptance" value={`${college.acceptanceRate}%`} />
          <Metric
            label="Average package"
            value={college.averagePackage ? `₹${college.averagePackage.toFixed(1)} LPA` : "-"}
          />
          <Metric
            label="Highest package"
            value={college.highestPackage ? `₹${college.highestPackage.toFixed(1)} LPA` : "-"}
          />
          <Metric
            label="Placement rate"
            value={college.placementRate ? `${college.placementRate.toFixed(0)}%` : "-"}
          />
        </div>

        {college.courses.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold">Courses offered</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {college.courses.map((course: { id: string; name: string; duration: string; degree: string; seatCount: number }) => (
                <div key={course.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">{course.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{course.degree} · {course.duration}</p>
                  <p className="mt-2 text-sm text-slate-500">Seats: {course.seatCount}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}
