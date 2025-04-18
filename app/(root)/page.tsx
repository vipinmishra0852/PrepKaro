import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col-reverse sm:flex-row items-center justify-between py-12 px-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl shadow-lg">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-4xl font-semibold">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback to boost
            your skills.
          </p>

          <Button asChild className="btn-primary w-full sm:w-auto">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <div className="hidden sm:block">
          <Image
            src="/robot.png"
            alt="robo-dude"
            width={400}
            height={400}
            className="rounded-full shadow-xl"
          />
        </div>
      </section>

      {/* Past Interviews Section */}
      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-3xl font-semibold text-center">Your Interviews</h2>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              You haven't taken any interviews yet.
            </p>
          )}
        </div>
      </section>

      {/* Upcoming Interviews Section */}
      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-3xl font-semibold text-center">Take Interviews</h2>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              There are no interviews available.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
