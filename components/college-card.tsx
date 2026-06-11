"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compare-store";

export type CollegeCardData = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  tuition: number;
  acceptanceRate?: number;
  averagePackage?: number;
  highestPackage?: number;
  placementRate?: number;
  overview: string;
};

export function CollegeCard({ college }: { college: CollegeCardData }) {
  const { ids, toggle } = useCompareStore();

  const selected = ids.includes(college.id);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{college.name}</h3>
          <p className="text-sm text-slate-500">
            {college.city}, {college.state} · {college.type}
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          {college.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-slate-600">
        {college.overview}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span>Tuition: ₹{college.tuition.toLocaleString()}</span>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => toggle(college.id)}
            className={`rounded-lg px-3 py-1 text-sm font-medium ${
              selected
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {selected ? "Remove" : "Compare"}
          </button>

          <Link
            href={`/colleges/${college.id}`}
            className="font-medium text-indigo-600"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}