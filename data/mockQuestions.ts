import { InterviewQuestion } from "@/types/question";
import rawQuestions from "./questions.json";

export const mockQuestions: InterviewQuestion[] = rawQuestions as unknown as InterviewQuestion[];

export const companies: string[] = Array.from(
  new Set(mockQuestions.map((q) => q.company))
).sort();

export const roles: string[] = Array.from(
  new Set(mockQuestions.map((q) => q.role))
).sort();

export const topics: string[] = Array.from(
  new Set(mockQuestions.map((q) => q.topic))
).sort();

export const difficulties: string[] = Array.from(
  new Set(mockQuestions.map((q) => q.difficulty))
).sort();

export const questionTypes: string[] = Array.from(
  new Set(mockQuestions.map((q) => q.question_type))
).sort();
