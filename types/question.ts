/**
 * Core data model for the Campus Interview Simulator.
 *
 * This type mirrors the CSV schema exactly so the mock data,
 * filters, cards, and detail views all speak the same language.
 * When a real backend (FastAPI) and database replace the mock
 * data file, this interface is the contract to keep.
 */
export interface InterviewQuestion {
  question_id: string;
  company: string;
  role: string;
  topic: string;
  difficulty: Difficulty;
  question_type: QuestionType;
  question_text: string;
  sample_answer: string;
  source_note: string;
}

/**
 * These come straight from the real CSV, so they're kept as plain
 * strings rather than a strict union — the dataset owns the source of
 * truth, not the frontend. Known values as of the current CSV:
 * difficulty: "easy" | "medium" | "hard"
 * question_type: "technical" | "behavioral" | "coding" | "resume" | "HR"
 */
export type Difficulty = string;

export type QuestionType = string;

/**
 * Shape of the filter state used on the dashboard.
 * "All" means the filter is inactive for that field.
 */
export interface QuestionFilters {
  search: string;
  company: string;
  role: string;
  topic: string;
  difficulty: string;
  question_type: string;
}

export const ALL_FILTER_VALUE = "All";

export const DEFAULT_FILTERS: QuestionFilters = {
  search: "",
  company: ALL_FILTER_VALUE,
  role: ALL_FILTER_VALUE,
  topic: ALL_FILTER_VALUE,
  difficulty: ALL_FILTER_VALUE,
  question_type: ALL_FILTER_VALUE,
};

/**
 * Mock feedback shown on the practice page after a user answers.
 * Replace with a real Claude API scoring call later.
 */
export interface MockFeedback {
  technical_accuracy: number;
  clarity: number;
  relevance: number;
  confidence: number;
  overall_score: number;
  summary: string;
}
