"use client";

import { useEffect, useMemo, useState } from "react";
import { InterviewQuestion, DEFAULT_FILTERS, QuestionFilters } from "@/types/question";
import { filterQuestions } from "@/lib/utils";
import { fetchAllQuestions } from "@/lib/api";
import { SearchAndFilterBar } from "@/components/SearchAndFilterBar";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionTable } from "@/components/QuestionTable";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function QuestionsPage() {
  const [filters, setFilters] = useState<QuestionFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the full dataset from the backend once. Filtering below happens
  // client-side against this list, same UX as before — only the source
  // changed from a local mock array to a live API call.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllQuestions();
        if (!cancelled) setQuestions(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load questions."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter option lists derived from whatever the backend actually
  // returned, so the dropdowns always match the real CSV's values.
  const companies = useMemo(
    () => Array.from(new Set(questions.map((q) => q.company))).sort(),
    [questions]
  );
  const roles = useMemo(
    () => Array.from(new Set(questions.map((q) => q.role))).sort(),
    [questions]
  );
  const topics = useMemo(
    () => Array.from(new Set(questions.map((q) => q.topic))).sort(),
    [questions]
  );
  const difficulties = useMemo(
    () => Array.from(new Set(questions.map((q) => q.difficulty))).sort(),
    [questions]
  );
  const questionTypes = useMemo(
    () => Array.from(new Set(questions.map((q) => q.question_type))).sort(),
    [questions]
  );

  const filtered = useMemo(
    () => filterQuestions(questions, filters),
    [questions, filters]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wide text-indigo">
          Question bank
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
          Find the question you need to practice
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          Search by keyword or narrow down by company, role, topic,
          difficulty, and question type.
        </p>
      </div>

      <div className="mt-8">
        <SearchAndFilterBar
          filters={filters}
          onChange={setFilters}
          companies={companies}
          roles={roles}
          topics={topics}
          difficulties={difficulties}
          questionTypes={questionTypes}
          resultCount={filtered.length}
          totalCount={questions.length}
          view={view}
          onViewChange={setView}
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <div className="rounded-card border border-rose/30 bg-rose-light px-6 py-10 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Couldn't reach the backend
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
              {error}
            </p>
            <p className="mt-3 font-mono text-xs text-slate-muted">
              Run: uvicorn app.main:app --reload --port 8000
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState onAction={() => setFilters(DEFAULT_FILTERS)} />
        ) : view === "cards" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((question) => (
              <QuestionCard key={question.question_id} question={question} />
            ))}
          </div>
        ) : (
          <QuestionTable questions={filtered} />
        )}
      </div>
    </div>
  );
}
