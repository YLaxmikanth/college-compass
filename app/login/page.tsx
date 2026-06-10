"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <form
        className="space-y-4 rounded-3xl border bg-white p-8"
        onSubmit={(e) => {
          e.preventDefault();
          void signIn("credentials", { email, password, callbackUrl: "/colleges" });
        }}
      >
        <h1 className="text-2xl font-bold">Sign in</h1>
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white">Sign in</button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
