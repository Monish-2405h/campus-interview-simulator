"use client";

interface AnswerBoxProps {
  value: string;
  onChange: (value: string) => void;
  onShowSample: () => void;
  onReset: () => void;
  onMarkPracticed: () => void;
  sampleRevealed: boolean;
  practiced: boolean;
}

export function AnswerBox({
  value,
  onChange,
  onShowSample,
  onReset,
  onMarkPracticed,
  sampleRevealed,
  practiced,
}: AnswerBoxProps) {
  const wordCount = value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;

  return (
    <div className="rounded-card border border-slate-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">
          Your Answer
        </h2>
        <span className="font-mono text-xs text-slate-muted">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={9}
        placeholder="Speak it in your head first, then write your answer here as if you were in the interview room..."
        className="mt-4 w-full resize-y rounded-[10px] border border-slate-border bg-paper p-4 text-sm leading-relaxed text-ink placeholder:text-slate-muted focus:border-indigo focus:outline-none"
      />

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onShowSample}
          className="rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-dark"
        >
          {sampleRevealed ? "Sample Answer Shown" : "Show Sample Answer"}
        </button>
        <button
          onClick={onMarkPracticed}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            practiced
              ? "bg-success-light text-success"
              : "border border-slate-border text-ink hover:border-ink"
          }`}
        >
          {practiced ? "Marked as Practiced ✓" : "Mark as Practiced"}
        </button>
        <button
          onClick={onReset}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-muted transition-colors hover:text-rose"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
