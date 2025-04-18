import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="section-feedback px-10 py-20 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 text-white">
      <div className="flex flex-row justify-center mb-8">
        <h1 className="text-5xl font-extrabold text-shadow-lg">
          Feedback on the Interview -{" "}
          <span className="capitalize text-teal-300">{interview.role}</span>{" "}
          Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center mb-6">
        <div className="flex flex-row gap-5 text-lg font-semibold">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={26} height={26} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-yellow-400 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/calendar.svg" width={26} height={26} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-white mb-6" />

      <p className="text-xl font-semibold">{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-extrabold text-teal-300">
          Breakdown of the Interview:
        </h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <p className="text-lg font-bold text-purple-500">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p className="text-gray-700">{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold text-orange-400">Strengths</h3>
        <ul className="list-disc pl-5 text-lg text-gray-200">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold text-red-400">
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-5 text-lg text-gray-200">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row justify-center gap-6 mt-8">
        <Button className="btn-primary py-3 px-6 rounded-full shadow-xl hover:bg-teal-600 transform transition-transform duration-200 ease-in-out">
          <Link
            href="/"
            className="flex w-full justify-center text-lg font-bold"
          >
            Back to Dashboard
          </Link>
        </Button>

        <Button className="btn-secondary py-3 px-6 rounded-full shadow-xl hover:bg-orange-600 transform transition-transform duration-200 ease-in-out">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center text-lg font-bold"
          >
            Retake Interview
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
