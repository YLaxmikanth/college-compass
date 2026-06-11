"use client";

import { useEffect, useMemo, useState } from "react";
import { useCompareStore } from "@/store/compare-store";
import type { CollegeCardData } from "@/components/college-card";

export default function ComparePage() {
  const ids = useCompareStore((state) => state.ids);
  const clear = useCompareStore((state) => state.clear);
  const [data, setData] = useState<CollegeCardData[]>([]);

  useEffect(() => {
    if (!ids.length) {
      queueMicrotask(() => setData([]));
      return;
    }

    fetch("/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((json) => setData(json.data ?? []));
  }, [ids]);

  const orderedData = useMemo(
    () => ids.map((id) => data.find((college) => college.id === id)).filter(Boolean) as CollegeCardData[],
    [data, ids],
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compare Colleges</h1>
          <p className="mt-2 text-slate-500">Select up to 3 colleges from the list to compare them here.</p>
        </div>
        {ids.length > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Clear Comparison
          </button>
        ) : null}
      </div>

      <div className="mt-8">
        {ids.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
            Add colleges from the list to see a table-style comparison here.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50 text-left text-sm text-slate-500">
                <tr>
                  <th className="px-4 py-4 font-medium">Metric</th>
                  {orderedData.map((college) => (
                    <th key={college.id} className="px-4 py-4 font-medium text-center">
                      {college.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left font-semibold">Location</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.city}, {college.state}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-left font-semibold">Type</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.type}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left font-semibold">Rating</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.rating.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-left font-semibold">Tuition</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      ₹{college.tuition.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left font-semibold">Acceptance</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.acceptanceRate?.toFixed(1) ?? "-"}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-left font-semibold">Average package</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.averagePackage ? `₹${college.averagePackage.toFixed(1)} LPA` : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left font-semibold">Highest package</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.highestPackage ? `₹${college.highestPackage.toFixed(1)} LPA` : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-left font-semibold">Placement rate</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center">
                      {college.placementRate ? `${college.placementRate.toFixed(0)}%` : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50">
                  <th className="px-4 py-4 text-left font-semibold">Overview</th>
                  {orderedData.map((college) => (
                    <td key={college.id} className="px-4 py-4 text-center text-slate-600">
                      {college.overview}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
