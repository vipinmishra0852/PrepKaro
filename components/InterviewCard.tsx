import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-pink-600",
      Mixed: "bg-yellow-500",
      Technical: "bg-blue-800",
    }[normalizedType] || "bg-green-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-[360px] max-sm:w-full min-h-96 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white shadow-2xl rounded-xl hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden transform-gpu">
      <div className="p-6">
        {/* Type Badge */}
        <div
          className={cn(
            "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg font-semibold text-white text-sm",
            badgeColor
          )}
        >
          <p>{normalizedType}</p>
        </div>

        {/* Cover Image */}
        <div className="flex justify-center mt-6">
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover border-4 border-[#1abc9c] shadow-xl transition-all duration-500 ease-in-out transform hover:rotate-[15deg]"
          />
        </div>

        {/* Interview Role */}
        <h3 className="mt-5 capitalize text-3xl font-extrabold hover:text-[#1abc9c] transition-all duration-300">
          {role} Interview
        </h3>

        {/* Date & Score */}
        <div className="flex flex-row gap-5 mt-4 text-gray-300">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/calendar.svg"
              width={22}
              height={22}
              alt="calendar"
              className="text-teal-400"
            />
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        {/* Feedback or Placeholder Text */}
        <p className="line-clamp-3 mt-5 text-gray-300">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Tech Icons */}
        <div className="mt-4 flex gap-3">
          <DisplayTechIcons techStack={techstack} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row justify-between mt-5">
          <Button className="btn-primary py-3 px-6 rounded-full bg-[#1abc9c] hover:bg-[#16a085] text-white shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
