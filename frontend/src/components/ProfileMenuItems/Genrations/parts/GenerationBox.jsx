import { Tooltip } from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

const GenerationBox = ({ generation, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 animate-pulse">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>{" "}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>{" "}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>{" "}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>{" "}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>{" "}
        </div>
      </div>
    );
  }

  if (!generation) {
    return null;
  }

  const {
    heading = "Untitled",
    date = "N/A",
    time = "N/A",
    numberOfQuestions = "Not specified",
    question_format: format = "Unknown format",
    type = "prompt",
  } = generation;

  const utcDateTime = new Date(`${date}T${time}Z`);
  const localDateTime = formatDistanceToNow(utcDateTime, { addSuffix: true });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer transition-all duration-150 ease-in-out">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-1 sm:mb-2">
        <h3 className="font-bold font-poppins text-base sm:text-lg text-black dark:text-gray-100">
          {heading}
        </h3>
        <Tooltip
          content={localDateTime}
          placement="top"
          className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white rounded-md p-2 text-xs sm:text-sm"
        >
          <span className="flex items-center">
            <AiOutlineInfoCircle className="text-black dark:text-gray-300" />
          </span>
        </Tooltip>
      </div>
      <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
        <span className="font-semibold">Type:</span>{" "}
        {type === "prompt" ? "Prompt-based" : "Text-based"}
      </p>
      <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
        <span className="font-semibold">Questions:</span> {numberOfQuestions}
      </p>
      <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Format:</span> {format}
      </p>
    </div>
  );
};

export default GenerationBox;
