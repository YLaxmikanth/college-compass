"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.message ?? "Registration failed. Please try again.");
      return;
    }

    router.push("/login");
  };

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <form className="space-y-4 rounded-3xl border bg-white p-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Create account</h1>
        {error ? <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}
