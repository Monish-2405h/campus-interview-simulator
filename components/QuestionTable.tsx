import Link from "next/link";
import { InterviewQuestion } from "@/types/question";
import { Badge } from "@/components/Badge";
import { difficultyStyles, questionTypeStyles, displayCase } from "@/lib/utils";

interface QuestionTableProps {
  questions: InterviewQuestion[];
}

export function QuestionTable({ questions }: QuestionTableProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-slate-border bg-card shadow-card">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-border bg-paper/60 text-xs uppercase tracking-wide text-slate-muted">
            <th className="px-4 py-3 font-mono font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Question</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Difficulty</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr
              key={q.question_id}
              className="border-b border-slate-border last:border-0 hover:bg-paper/60"
            >
              <td className="px-4 py-3 font-mono text-xs text-slate-muted">
                {q.question_id}
              </td>
              <td className="max-w-[280px] px-4 py-3 text-ink">
                <span className="line-clamp-2">{q.question_text}</span>
              </td>
              <td className="px-4 py-3 text-ink/80">{q.company}</td>
              <td className="px-4 py-3 text-ink/80">{q.role}</td>
              <td className="px-4 py-3">
                <Badge className={questionTypeStyles(q.question_type)}>
                  {displayCase(q.question_type)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={difficultyStyles(q.difficulty)}>
                  {displayCase(q.difficulty)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/questions/${q.question_id}`}
                    className="rounded-full bg-indigo px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-dark"
                  >
                    Practice
                  </Link>
                  <Link
                    href={`/questions/${q.question_id}?reveal=1`}
                    className="rounded-full border border-slate-border px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
                  >
                    Answer
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
