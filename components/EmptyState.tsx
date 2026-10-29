interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No questions match these filters",
  message = "Try clearing a filter or searching a different keyword.",
  actionLabel = "Clear all filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-slate-border bg-card px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper font-mono text-lg text-slate-muted">
        Ø
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-muted">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
