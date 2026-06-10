"use client";

import { useCompareStore } from "@/store/compare-store";

export function CompareToggle({ id }: { id: string }) {
  const { ids, toggle } = useCompareStore();
  const active = ids.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      className={`rounded-full px-3 py-1 text-sm ${active ? "bg-slate-900 text-white" : "bg-slate-100"}`}
    >
      {active ? "Selected" : "Compare"}
    </button>
  );
}
