import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-r from-teal-400 to-blue-500 text-white py-10 px-4 rounded-xl shadow-xl mb-8">
        {/* Heading Section */}
        <h3 className="text-3xl font-semibold text-center mb-6">
          Interview Generation
        </h3>

        {/* Agent Component */}
        <Agent
          userName={user?.name!}
          userId={user?.id}
          profileImage={user?.profileURL}
          type="generate"
        />
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold transition-all duration-200 hover:bg-green-600 transform hover:scale-105">
          Generate New Interview
        </button>
      </div>
    </>
  );
};

export default Page;
