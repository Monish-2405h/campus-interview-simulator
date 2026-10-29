import { cn } from "@/lib/utils";

/** Skeleton card matching the QuestionCard footprint, shown while data "loads". */
export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-card border border-slate-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <Bar className="h-3 w-14" />
            <Bar className="h-5 w-16 rounded-full" />
          </div>
          <div className="mt-4 flex gap-2">
            <Bar className="h-5 w-20 rounded-full" />
            <Bar className="h-5 w-20 rounded-full" />
          </div>
          <Bar className="mt-5 h-4 w-full" />
          <Bar className="mt-2 h-4 w-5/6" />
          <Bar className="mt-2 h-4 w-2/3" />
          <div className="mt-6 flex gap-3">
            <Bar className="h-9 w-full rounded-full" />
            <Bar className="h-9 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded bg-slate-border/70", className)} />;
}
