import Link from "next/link";
import { Badge } from "@/components/Badge";
import { InterviewQuestion } from "@/types/question";
import { difficultyStyles, questionTypeStyles, displayCase } from "@/lib/utils";

interface HeroSectionProps {
  questions: InterviewQuestion[];
  backendError: string | null;
}

export function HeroSection({ questions, backendError }: HeroSectionProps) {
  const questionCount = questions.length;
  const companyCount = new Set(questions.map((q) => q.company)).size;
  // Pick a question roughly a third of the way in so the hero doesn't
  // always show Q001; falls back gracefully if the list is short.
  const featured = questions[Math.min(19, questions.length - 1)];

  return (
    <section className="relative overflow-hidden bg-dot-grid">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28">
        {/* Left: thesis */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-border bg-card px-3 py-1 font-mono text-xs text-slate-muted">
            {backendError
              ? "backend offline · showing setup preview"
              : `${questionCount} questions · ${companyCount} companies · live from CSV`}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Rehearse the question
            <br />
            before the interviewer
            <br />
            <span className="text-indigo">asks it first.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-muted sm:text-lg">
            Browse real campus interview questions by company, role, and
            topic. Write your own answer, then hold it up against a sample
            response before the real thing happens in the room.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/questions"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
            >
              Browse the question bank
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-slate-border bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right: signature flashcard stack */}
        <div className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[380px]">
          <div className="absolute inset-x-6 top-8 h-full rotate-[6deg] rounded-card border border-slate-border bg-card/70" />
          <div className="absolute inset-x-3 top-4 h-full -rotate-[4deg] rounded-card border border-slate-border bg-card/90" />

          <div className="group absolute inset-0 rounded-card border border-slate-border bg-card p-6 shadow-card-hover transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
            {featured ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-muted">
                    {featured.question_id}
                  </span>
                  <Badge className={difficultyStyles(featured.difficulty)}>
                    {displayCase(featured.difficulty)}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-paper text-ink border border-slate-border">
                    {featured.company}
                  </Badge>
                  <Badge className="bg-paper text-ink border border-slate-border">
                    {featured.role}
                  </Badge>
                  <Badge className={questionTypeStyles(featured.question_type)}>
                    {displayCase(featured.question_type)}
                  </Badge>
                </div>

                <p className="mt-5 line-clamp-4 font-display text-lg font-medium leading-snug text-ink">
                  {featured.question_text}
                </p>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-dashed border-slate-border pt-4">
                  <span className="text-xs text-slate-muted">
                    Topic: {featured.topic}
                  </span>
                  <span className="font-mono text-xs text-indigo">
                    practice →
                  </span>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-mono text-xs text-slate-muted">
                  Ø no preview available
                </p>
                <p className="mt-2 max-w-[220px] text-sm text-slate-muted">
                  Start the FastAPI backend to see a live question here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
