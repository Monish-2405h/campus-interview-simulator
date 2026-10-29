import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-ink text-paper">
            <span className="font-mono text-[13px] leading-none">Q:</span>
          </span>
          <span className="font-display text-[15px] font-semibold leading-tight tracking-tight sm:text-base">
            Campus Interview
            <span className="text-indigo"> Simulator</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            Home
          </Link>
          <Link
            href="/questions"
            className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            Question Bank
          </Link>
        </nav>

        <Link
          href="/questions"
          className="inline-flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-indigo-dark"
        >
          Start Practicing
        </Link>
      </div>
    </header>
  );
}
