import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}

/**
 * Generic pill badge. Pass a color className (e.g. from difficultyStyles)
 * to theme it; defaults to a neutral slate look.
 */
export function Badge({ children, className, mono = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        mono && "font-mono tracking-tight",
        className ?? "bg-slate-border text-ink"
      )}
    >
      {children}
    </span>
  );
}
