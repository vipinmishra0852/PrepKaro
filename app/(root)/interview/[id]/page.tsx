import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-6 justify-between py-8 px-5 bg-gradient-to-br from-blue-400 via-purple-400 to-teal-400 rounded-xl shadow-lg mb-8">
        <div className="flex flex-row gap-6 items-center max-sm:flex-col">
          {/* Interview Info */}
          <div className="flex flex-row gap-6 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={50}
              height={50}
              className="rounded-full object-cover size-[50px] transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-extrabold text-white capitalize">
              {interview.role} Interview
            </h3>
          </div>

          {/* Tech Stack Icons */}
          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        {/* Interview Type Badge */}
        <p className="bg-yellow-400 px-5 py-2 rounded-lg text-white font-bold text-lg h-fit transform transition-all duration-200 hover:bg-yellow-500">
          {interview.type}
        </p>
      </div>

      {/* Agent Interaction Section */}
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
