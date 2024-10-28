import { Typography } from "@material-tailwind/react";
import { FaKeyboard, FaCog, FaFilePdf } from "react-icons/fa";
import Divider from "../../common/Divider";

const SuggesionFlow = () => {
  return (
    <>
      <Divider />
      <div className="bg-gradient-to-r from-white via-white to-white dark:from-gray-950 dark:via-black dark:to-gray-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-20 pb-20 transition-colors duration-300">
          <Typography
            variant="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black dark:text-white font-bold mb-6"
          >
            How It Works: Generate Custom Questions with AI
          </Typography>
          <Typography
            variant="lead"
            className="text-base sm:text-lg md:text-xl font-gloria text-gray-700 dark:text-gray-400 mb-10 max-w-3xl"
          >
            Create personalized questions in three simple steps. Just enter a
            prompt, and our AI will do the rest! Download your questions as a
            PDF instantly.
          </Typography>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8">
            <div className="flex flex-col items-center">
              <FaKeyboard className="text-black dark:text-white w-16 h-16 mb-4" />
              <Typography
                variant="h6"
                className="font-poppins text-black dark:text-white font-semibold mb-2"
              >
                Input a Prompt
              </Typography>
              <Typography className="text-gray-700 dark:text-gray-400 font-poppins text-sm sm:text-base">
                Tell the AI what you need. For example, &quot;Generate 15
                physics questions on electricity for Grade 10.&quot;
              </Typography>
            </div>
            <Typography
              variant="h2"
              className="hidden sm:block text-4xl lg:text-5xl font-gloria text-black dark:text-white"
            >
              →
            </Typography>
            <div className="flex flex-col items-center">
              <FaCog className="text-black dark:text-white w-16 h-16 mb-4" />
              <Typography
                variant="h6"
                className="font-poppins text-black dark:text-white font-semibold mb-2"
              >
                AI Generates Questions
              </Typography>
              <Typography className="text-gray-700 dark:text-gray-400 font-poppins text-sm sm:text-base">
                The AI creates custom questions based on your input. You can
                generate as many questions as you need.
              </Typography>
            </div>
            <Typography
              variant="h2"
              className="hidden sm:block text-4xl lg:text-5xl font-gloria text-black dark:text-white"
            >
              →
            </Typography>
            <div className="flex flex-col items-center">
              <FaFilePdf className="text-black dark:text-white w-16 h-16 mb-4" />
              <Typography
                variant="h6"
                className="font-poppins text-black dark:text-white font-semibold mb-2"
              >
                Download as PDF
              </Typography>
              <Typography className="text-gray-700 dark:text-gray-400 font-poppins text-sm sm:text-base">
                Once your questions are ready, download them instantly as a
                ready-to-use PDF.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggesionFlow;
