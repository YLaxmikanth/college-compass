"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <form
        className="space-y-4 rounded-3xl border bg-white p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
        }}
      >
        <h1 className="text-2xl font-bold">Create account</h1>
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white">Register</button>
      </form>
    </main>
  );
}
