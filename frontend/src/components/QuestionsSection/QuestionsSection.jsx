import { Typography, Card } from "@material-tailwind/react";
import Divider from "../../common/Divider";

const QuestionsSection = () => {
  return (
    <>
      <Divider />
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 md:px-20 lg:px-32 bg-white dark:bg-black text-center pt-20 pb-20 transition-colors duration-300">
        <Typography
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black dark:text-white font-bold mb-6"
        >
          Why Use Our AI-Generated Question Platform?
        </Typography>
        <Typography
          variant="lead"
          className="text-base sm:text-lg md:text-xl text-center font-gloria text-gray-700 dark:text-gray-400 mb-10"
        >
          See how we stand out when it comes to generating and downloading
          custom question sets.
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4 md:px-12">
          <Card className="p-6 shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black dark:text-white"
              >
                Generate Multiple Questions in One Go
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black dark:text-gray-300 font-poppins mb-4"
            >
              Unlike other platforms that limit how many questions you can
              create at once, we let you generate as many questions as you need
              with a single prompt. No limits, no restrictions.
            </Typography>
          </Card>
          <Card className="p-6 shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black dark:text-white"
              >
                Instant PDF Download
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black dark:text-gray-300 font-poppins mb-4"
            >
              Get all your generated questions in a clean, ready-to-use PDF
              format instantly. No additional formatting required—just download
              and start using.
            </Typography>
          </Card>
          <Card className="p-6 shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black dark:text-white"
              >
                Tailored to Your Exact Needs
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black dark:text-gray-300 font-poppins mb-4"
            >
              Whether you need exam questions or practice materials, our AI
              creates custom questions based on your specific prompts, saving
              you time and effort.
            </Typography>
          </Card>
          <Card className="p-6 shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">
              <Typography
                variant="h6"
                className="text-lg font-semibold font-poppins text-black dark:text-white"
              >
                Always Fresh, Never Repeated
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="text-sm text-black dark:text-gray-300 font-poppins mb-4"
            >
              Each time you generate questions, our AI provides new, unique
              content, ensuring you always have fresh material to work with,
              without worrying about duplicates.
            </Typography>
          </Card>
        </div>
      </div>
    </>
  );
};

export default QuestionsSection;
