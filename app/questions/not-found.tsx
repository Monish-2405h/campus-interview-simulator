import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card font-mono text-lg text-slate-muted shadow-card">
        ?
      </span>
      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">
        This question isn't in the bank
      </h1>
      <p className="mt-2 text-sm text-slate-muted">
        The question you're looking for may have been removed or the link is
        incorrect.
      </p>
      <Link
        href="/questions"
        className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90"
      >
        Back to question bank
      </Link>
    </div>
  );
}
