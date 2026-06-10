"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl p-8">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-neutral-600">{error.message}</p>
      <button className="mt-4 rounded-xl bg-black px-4 py-2 text-white" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
