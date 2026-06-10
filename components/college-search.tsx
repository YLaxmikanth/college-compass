export function CollegeSearch() {
  return (
    <form action="/colleges" method="get" className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <input name="search" placeholder="Search colleges" className="rounded-xl border px-4 py-3" />
      <input name="city" placeholder="City" className="rounded-xl border px-4 py-3" />
      <select name="type" className="rounded-xl border px-4 py-3">
        <option value="">All types</option>
        <option value="PUBLIC">Public</option>
        <option value="PRIVATE">Private</option>
        <option value="DEEMED">Deemed</option>
      </select>
      <button className="rounded-xl bg-slate-900 px-4 py-3 text-white">Search</button>
    </form>
  );
}
