import { MockFeedback } from "@/types/question";

interface FeedbackCardProps {
  feedback: MockFeedback;
}

const METRICS: { key: keyof MockFeedback; label: string }[] = [
  { key: "technical_accuracy", label: "Technical Accuracy" },
  { key: "clarity", label: "Clarity" },
  { key: "relevance", label: "Relevance" },
  { key: "confidence", label: "Confidence" },
];

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="rounded-card border border-slate-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">
          Mock Feedback
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-wide text-slate-muted">
          static preview · not real scoring
        </span>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-[10px] bg-paper p-4">
        <ScoreRing score={feedback.overall_score} />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate-muted">
            Overall Score
          </p>
          <p className="text-sm text-ink/80">{feedback.summary}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {METRICS.map((metric) => (
          <MetricBar
            key={metric.key}
            label={metric.label}
            value={feedback[metric.key] as number}
          />
        ))}
      </div>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-ink/80">{label}</span>
        <span className="font-mono text-slate-muted">{value}/100</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-border">
        <div
          className="h-full rounded-full bg-indigo transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
      <circle
        cx="28"
        cy="28"
        r="20"
        fill="none"
        stroke="#DEE1E8"
        strokeWidth="6"
      />
      <circle
        cx="28"
        cy="28"
        r="20"
        fill="none"
        stroke="#3454D1"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 28 28)"
      />
      <text
        x="28"
        y="32"
        textAnchor="middle"
        className="fill-ink font-mono text-[13px] font-semibold"
      >
        {score}
      </text>
    </svg>
  );
}
