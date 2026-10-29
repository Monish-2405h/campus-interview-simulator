interface SampleAnswerCardProps {
  sampleAnswer: string;
}

export function SampleAnswerCard({ sampleAnswer }: SampleAnswerCardProps) {
  return (
    <div className="animate-in rounded-card border border-indigo/30 bg-indigo-light p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo font-mono text-[11px] text-white">
          A
        </span>
        <h2 className="font-display text-lg font-semibold text-ink">
          Sample Answer
        </h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/85">
        {sampleAnswer}
      </p>
      <p className="mt-4 text-xs text-indigo-dark">
        Use this as a benchmark, not a script — the strongest answers still
        sound like you.
      </p>
    </div>
  );
}
