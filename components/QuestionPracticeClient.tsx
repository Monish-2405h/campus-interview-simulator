"use client";

import { useState } from "react";
import Link from "next/link";
import { InterviewQuestion } from "@/types/question";
import { QuestionDetails } from "@/components/QuestionDetails";
import { AnswerBox } from "@/components/AnswerBox";
import { SampleAnswerCard } from "@/components/SampleAnswerCard";
import { FeedbackCard } from "@/components/FeedbackCard";
import { generateMockFeedback } from "@/lib/utils";
import { MockFeedback } from "@/types/question";

interface QuestionPracticeClientProps {
  question: InterviewQuestion;
  initialReveal: boolean;
}

export function QuestionPracticeClient({
  question,
  initialReveal,
}: QuestionPracticeClientProps) {
  const [answer, setAnswer] = useState("");
  const [sampleRevealed, setSampleRevealed] = useState(initialReveal);
  const [practiced, setPracticed] = useState(false);
  const [feedback, setFeedback] = useState<MockFeedback | null>(null);

  function handleShowSample() {
    setSampleRevealed(true);
  }

  function handleReset() {
    setAnswer("");
    setSampleRevealed(false);
    setPracticed(false);
    setFeedback(null);
  }

  function handleMarkPracticed() {
    setPracticed(true);
    setFeedback(generateMockFeedback(answer));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/questions"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-muted hover:text-ink"
      >
        ← Back to question bank
      </Link>

      <div className="mt-5 space-y-6">
        <QuestionDetails question={question} />

        <AnswerBox
          value={answer}
          onChange={setAnswer}
          onShowSample={handleShowSample}
          onReset={handleReset}
          onMarkPracticed={handleMarkPracticed}
          sampleRevealed={sampleRevealed}
          practiced={practiced}
        />

        {sampleRevealed && (
          <SampleAnswerCard sampleAnswer={question.sample_answer} />
        )}

        {feedback && <FeedbackCard feedback={feedback} />}
      </div>
    </div>
  );
}
