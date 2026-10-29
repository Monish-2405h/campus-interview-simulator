import { notFound } from "next/navigation";
import { fetchQuestionById } from "@/lib/api";
import { QuestionPracticeClient } from "@/components/QuestionPracticeClient";

// Data comes from a live backend/CSV, not a build-time array, so this
// route is rendered fresh on every request rather than statically.
export const dynamic = "force-dynamic";

interface QuestionPageProps {
  params: { id: string };
  searchParams: { reveal?: string };
}

export default async function QuestionPage({
  params,
  searchParams,
}: QuestionPageProps) {
  const question = await fetchQuestionById(params.id);

  if (!question) {
    notFound();
  }

  return (
    <QuestionPracticeClient
      question={question}
      initialReveal={searchParams.reveal === "1"}
    />
  );
}
