import {
  ALL_FILTER_VALUE,
  Difficulty,
  InterviewQuestion,
  MockFeedback,
  QuestionFilters,
  QuestionType,
} from "@/types/question";

/** Combine class names conditionally without pulling in a dependency. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Apply the dashboard's search + filter state to the mock dataset.
 * Search matches against question_text, company, role, and topic.
 */
export function filterQuestions(
  questions: InterviewQuestion[],
  filters: QuestionFilters
): InterviewQuestion[] {
  const query = filters.search.trim().toLowerCase();

  return questions.filter((q) => {
    if (filters.company !== ALL_FILTER_VALUE && q.company !== filters.company) {
      return false;
    }
    if (filters.role !== ALL_FILTER_VALUE && q.role !== filters.role) {
      return false;
    }
    if (filters.topic !== ALL_FILTER_VALUE && q.topic !== filters.topic) {
      return false;
    }
    if (
      filters.difficulty !== ALL_FILTER_VALUE &&
      q.difficulty !== filters.difficulty
    ) {
      return false;
    }
    if (
      filters.question_type !== ALL_FILTER_VALUE &&
      q.question_type !== filters.question_type
    ) {
      return false;
    }
    if (query.length > 0) {
      const haystack =
        `${q.question_text} ${q.company} ${q.role} ${q.topic}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export function difficultyStyles(difficulty: Difficulty): string {
  switch (difficulty.trim().toLowerCase()) {
    case "easy":
      return "bg-success-light text-success";
    case "medium":
      return "bg-amber-light text-amber-dark";
    case "hard":
      return "bg-rose-light text-rose";
    default:
      return "bg-slate-border text-ink";
  }
}

export function questionTypeStyles(type: QuestionType): string {
  switch (type.trim().toLowerCase()) {
    case "technical":
      return "bg-indigo-light text-indigo-dark";
    case "behavioral":
      return "bg-amber-light text-amber-dark";
    case "coding":
      return "bg-ink text-paper";
    case "hr":
      return "bg-success-light text-success";
    case "resume":
      return "bg-rose-light text-rose";
    default:
      return "bg-slate-border text-ink";
  }
}

/**
 * Deterministic mock feedback generator.
 * Scores are derived from the length and word variety of the answer so the
 * UI feels responsive without needing a real model call. Replace this with
 * a Claude API request once the backend is connected.
 */
export function generateMockFeedback(answerText: string): MockFeedback {
  const trimmed = answerText.trim();

  if (trimmed.length === 0) {
    return {
      technical_accuracy: 0,
      clarity: 0,
      relevance: 0,
      confidence: 0,
      overall_score: 0,
      summary: "Write an answer above to see mock feedback here.",
    };
  }

  const words = trimmed.split(/\s+/);
  const wordCount = words.length;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const lengthScore = Math.min(100, Math.round((wordCount / 90) * 100));
  const varietyScore = Math.min(
    100,
    Math.round((uniqueWords / Math.max(wordCount, 1)) * 130)
  );

  const technical_accuracy = clampScore(60 + lengthScore * 0.25);
  const clarity = clampScore(55 + varietyScore * 0.35);
  const relevance = clampScore(65 + lengthScore * 0.2);
  const confidence = clampScore(50 + lengthScore * 0.3 + varietyScore * 0.1);
  const overall_score = clampScore(
    (technical_accuracy + clarity + relevance + confidence) / 4
  );

  return {
    technical_accuracy,
    clarity,
    relevance,
    confidence,
    overall_score,
    summary:
      overall_score >= 80
        ? "Strong answer. Structure and detail come through clearly."
        : overall_score >= 60
        ? "Solid start. Add a concrete example to strengthen this further."
        : "This is a rough draft. Try expanding your reasoning and using specific examples.",
  };
}

/** Capitalize the first letter for nicer badge display (data itself stays lowercase). */
export function displayCase(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
