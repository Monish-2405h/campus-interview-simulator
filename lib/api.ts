import { InterviewQuestion } from "@/types/question";
import fallbackQuestions from "@/data/questions.json";

/**
 * Base URL of the FastAPI backend. Override by setting
 * NEXT_PUBLIC_API_URL in a .env.local file if the backend runs
 * somewhere other than localhost:8000.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface QuestionsResponse {
  count: number;
  questions: InterviewQuestion[];
}

export interface FiltersResponse {
  company: string[];
  role: string[];
  topic: string[];
  difficulty: string[];
  question_type: string[];
}

/**
 * Fetch the full question list from the backend (no query params).
 * If the backend is offline or unreachable, falls back to the local
 * dataset so the app stays functional.
 */
export async function fetchAllQuestions(): Promise<InterviewQuestion[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/questions`, { cache: "no-store" });
    if (res.ok) {
      const data: QuestionsResponse = await res.json();
      return data.questions;
    }
  } catch {
    // Backend offline; use local data
  }

  return fallbackQuestions as unknown as InterviewQuestion[];
}

/** Fetch a single question by ID. Returns null on a 404 (not found). */
export async function fetchQuestionById(
  id: string
): Promise<InterviewQuestion | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/questions/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline; search local data
  }

  const match = (fallbackQuestions as unknown as InterviewQuestion[]).find(
    (q) => q.question_id.toLowerCase() === id.toLowerCase()
  );

  return match ?? null;
}

/** Fetch the distinct filter values (company/role/topic/difficulty/type). */
export async function fetchFilters(): Promise<FiltersResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/filters`, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline; derive from local data
  }

  const questions = fallbackQuestions as unknown as InterviewQuestion[];
  return {
    company: Array.from(new Set(questions.map((q) => q.company))).sort(),
    role: Array.from(new Set(questions.map((q) => q.role))).sort(),
    topic: Array.from(new Set(questions.map((q) => q.topic))).sort(),
    difficulty: Array.from(new Set(questions.map((q) => q.difficulty))).sort(),
    question_type: Array.from(new Set(questions.map((q) => q.question_type))).sort(),
  };
}
