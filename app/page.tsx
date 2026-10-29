import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { fetchAllQuestions } from "@/lib/api";
import { InterviewQuestion } from "@/types/question";

// Counts and the hero's featured question come from the live backend,
// so render this page fresh on every request instead of at build time.
export const dynamic = "force-dynamic";

const steps = [
  {
    label: "Pick a question",
    description:
      "Filter the question bank by company, role, topic, or difficulty until you find the one you need to rehearse.",
  },
  {
    label: "Write your answer",
    description:
      "Open the practice page and write a real answer in your own words, the way you'd actually say it out loud.",
  },
  {
    label: "Compare & improve",
    description:
      "Reveal the sample answer and mock feedback to see what a strong response looks like next to yours.",
  },
];

const features = [
  {
    eyebrow: "By company",
    title: "Company-specific interview questions",
    description:
      "Questions are tagged to the company that asked them, so you can prep for the exact drive you're walking into.",
  },
  {
    eyebrow: "By role",
    title: "Role-based filtering",
    description:
      "Software engineer, analyst, or PM — filter the bank down to the questions your role actually gets asked.",
  },
  {
    eyebrow: "By difficulty",
    title: "Difficulty-based practice",
    description:
      "Warm up on Easy questions, then work up to the Hard ones that separate shortlisted candidates from the rest.",
  },
  {
    eyebrow: "By example",
    title: "Sample-answer learning",
    description:
      "Every question ships with a sample answer, so you always have a benchmark to measure your own response against.",
  },
];

export default async function HomePage() {
  let questions: InterviewQuestion[] = [];
  let backendError: string | null = null;

  try {
    questions = await fetchAllQuestions();
  } catch (err) {
    backendError =
      err instanceof Error ? err.message : "Failed to load questions.";
  }

  const companyCount = new Set(questions.map((q) => q.company)).size;

  return (
    <>
      <HeroSection
        questions={questions}
        backendError={backendError}
      />

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-wide text-indigo">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            Three steps, no login required
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.label} className="relative">
              <span className="font-mono text-4xl font-semibold text-slate-border">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-border bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-wide text-indigo">
              What's inside
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              Built around a real question bank
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-muted">
              {backendError
                ? "Question counts will appear here once the backend is running."
                : `${questions.length} questions across ${companyCount} companies, spanning technical, behavioral, coding, resume, and HR rounds.`}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-slate-border bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Your next interview is already in the bank.
            </h2>
            <p className="mt-2 max-w-md text-sm text-paper/70">
              Start with any question, or filter down to the exact company
              and role you're preparing for.
            </p>
          </div>
          <Link
            href="/questions"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Open the question bank
          </Link>
        </div>
      </section>
    </>
  );
}
