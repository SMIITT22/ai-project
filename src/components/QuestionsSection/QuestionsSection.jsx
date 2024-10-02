import { Typography, Card } from "@material-tailwind/react";
import Divider from "../../common/Divider";

const QuestionsSection = () => {
  return (
    <>
      <Divider />
      <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-white text-center pt-20 pb-10">
        <Typography
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black font-bold mb-6"
        >
          Why Use AI-Generated NEET Practice Questions?
        </Typography>
        <Typography
          variant="lead"
          className="text-base sm:text-lg md:text-xl text-center font-gloria text-gray-700 mb-10"
        >
          Discover why AI-generated NEET questions give you the best preparation
          edge.
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {/* Card 1 */}
          <Card className="p-6 shadow-lg border border-gray-300 bg-white rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black"
              >
                Practice Real-Exam Questions
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black font-poppins mb-4"
            >
              Our AI generates questions similar to the actual NEET exam,
              helping you prepare more effectively for the real challenge.
            </Typography>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 shadow-lg border border-gray-300 bg-white rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black"
              >
                Get Fresh and Unique Questions Every Time
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black font-poppins mb-4"
            >
              Generate new and unique questions with every click. You&apos;ll
              never run out of practice material.
            </Typography>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 shadow-lg border border-gray-300 bg-white rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black"
              >
                Simulate Full NEET Exam Papers
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black font-poppins mb-4"
            >
              Create a full 180-question NEET exam paper and simulate the real
              exam experience under timed conditions.
            </Typography>
          </Card>

          {/* Card 4 */}
          <Card className="p-6 shadow-lg border border-gray-300 bg-white rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black"
              >
                Adapted for Your Needs
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black font-poppins mb-4"
            >
              Our AI adapts to your study focus, generating questions based on
              Chemistry, Physics, or Biology to match your preparation needs.
            </Typography>
          </Card>
        </div>
      </div>
    </>
  );
};

export default QuestionsSection;
