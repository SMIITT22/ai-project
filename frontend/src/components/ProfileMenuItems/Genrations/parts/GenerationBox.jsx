import { Tooltip } from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

const GenerationBox = ({ generation, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300 animate-pulse">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div className="h-6 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded"></div>
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
    prompt = "No prompt provided",
    question_format: format = "Unknown format",
  } = generation;

  // Convert the date and time from UTC to the local time
  const utcDateTime = new Date(`${date}T${time}Z`); // Combine date and time and assume UTC ('Z' at the end)
  const localDateTime = formatDistanceToNow(utcDateTime, { addSuffix: true }); // Convert to human-readable format

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-300 cursor-pointer sm:hover:bg-black sm:hover:text-white transition-all duration-100 ease-in-out relative group">
      <div className="flex justify-between items-center mb-1 sm:mb-2">
        <h3 className="font-bold font-poppins text-base sm:text-lg transition-colors duration-100 ease-in-out">
          {heading}
        </h3>
        <div className="ml-4">
          <Tooltip
            content={localDateTime}
            placement="top"
            className="bg-gray-300 text-black rounded-md p-2 text-xs sm:text-sm md:text-base"
          >
            <span className="flex items-center">
              <AiOutlineInfoCircle className="text-black sm:group-hover:text-white transition-colors duration-100 ease-in-out" />
            </span>
          </Tooltip>
        </div>
      </div>

      <p className="font-poppins text-xs sm:text-sm mb-1 sm:mb-2 transition-colors duration-100 ease-in-out">
        <span className="font-semibold">Prompt:</span> {prompt}
      </p>
      <p className="font-poppins text-xs sm:text-sm mb-1 sm:mb-2 transition-colors duration-100 ease-in-out">
        <span className="font-semibold">Questions:</span> {numberOfQuestions}
      </p>
      <p className="font-poppins text-xs sm:text-sm transition-colors duration-100 ease-in-out">
        <span className="font-semibold">Format:</span> {format}
      </p>
    </div>
  );
};

export default GenerationBox;
