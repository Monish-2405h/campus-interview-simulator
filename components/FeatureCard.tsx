interface FeatureCardProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function FeatureCard({ eyebrow, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-card border border-slate-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <span className="font-mono text-xs uppercase tracking-wide text-indigo">
        {eyebrow}
      </span>
      <h3 className="mt-3 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-muted">
        {description}
      </p>
    </div>
  );
}
