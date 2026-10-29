import Link from "next/link";
import { InterviewQuestion } from "@/types/question";
import { Badge } from "@/components/Badge";
import { difficultyStyles, questionTypeStyles, displayCase } from "@/lib/utils";

interface QuestionCardProps {
  question: InterviewQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="flex flex-col rounded-card border border-slate-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-slate-muted">
          {question.question_id}
        </span>
        <Badge className={difficultyStyles(question.difficulty)}>
          {displayCase(question.difficulty)}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge className="border border-slate-border bg-paper text-ink">
          {question.company}
        </Badge>
        <Badge className="border border-slate-border bg-paper text-ink">
          {question.role}
        </Badge>
        <Badge className={questionTypeStyles(question.question_type)}>
          {displayCase(question.question_type)}
        </Badge>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 font-display text-[15px] font-medium leading-snug text-ink">
        {question.question_text}
      </p>

      <p className="mt-3 font-mono text-xs text-slate-muted">
        Topic: {question.topic}
      </p>

      <div className="mt-5 flex gap-2.5">
        <Link
          href={`/questions/${question.question_id}`}
          className="flex-1 rounded-full bg-indigo px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-dark"
        >
          Practice Question
        </Link>
        <Link
          href={`/questions/${question.question_id}?reveal=1`}
          className="flex-1 rounded-full border border-slate-border px-3 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          View Answer
        </Link>
      </div>
    </div>
  );
}
