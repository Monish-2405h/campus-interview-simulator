import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-border bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink text-paper">
            <span className="font-mono text-[11px] leading-none">Q:</span>
          </span>
          <p className="font-display text-sm font-semibold">
            Campus Interview Simulator
          </p>
        </div>

        <p className="text-sm text-slate-muted">
          Built for practicing campus placement interviews. Mock data
          only — no answers are scored by a real model yet.
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-ink/70">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <Link href="/questions" className="hover:text-ink">
            Question Bank
          </Link>
        </div>
      </div>
    </footer>
  );
}
