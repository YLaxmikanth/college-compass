import { notFound } from "next/navigation";
import { CompareToggle } from "@/components/compare-toggle";

async function getCollege(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/colleges/${id}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load college");
  return res.json();
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getCollege(id);
  if (!data) notFound();
  const college = data.data;

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
        </div>
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
