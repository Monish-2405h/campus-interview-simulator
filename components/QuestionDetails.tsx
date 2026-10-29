import { InterviewQuestion } from "@/types/question";
import { Badge } from "@/components/Badge";
import { difficultyStyles, questionTypeStyles, displayCase } from "@/lib/utils";

interface QuestionDetailsProps {
  question: InterviewQuestion;
}

export function QuestionDetails({ question }: QuestionDetailsProps) {
  return (
    <div className="rounded-card border border-slate-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-slate-muted">
          {question.question_id}
        </span>
        <div className="flex flex-wrap gap-2">
          <Badge className={questionTypeStyles(question.question_type)}>
            {displayCase(question.question_type)}
          </Badge>
          <Badge className={difficultyStyles(question.difficulty)}>
            {displayCase(question.difficulty)}
          </Badge>
        </div>
      </div>

      <h1 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.65rem]">
        {question.question_text}
      </h1>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-border pt-6 sm:grid-cols-3">
        <Field label="Company" value={question.company} />
        <Field label="Role" value={question.role} />
        <Field label="Topic" value={question.topic} />
      </dl>

      {question.source_note && (
        <p className="mt-6 rounded-[10px] bg-paper px-4 py-3 font-mono text-xs leading-relaxed text-slate-muted">
          Source note: {question.source_note}
        </p>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wide text-slate-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}
