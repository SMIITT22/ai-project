import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestions,
  selectLoading as selectQuestionsLoading,
} from "../../redux/questionsSlice";
import {
  selectIsSubscribed,
  selectFreeGenerationCount,
} from "../../../../auth/authSlice";
import getFriendlyErrorMessage from "../../../../utils/errorHandler";
import { FaPen, FaListUl, FaQuestion, FaFileAlt } from "react-icons/fa";

const PromptInputSection = ({ setNotification }) => {
  const [prompt, setPrompt] = useState("");
  const [testPattern, setTestPattern] = useState("Only MCQs");
  const [numQuestions, setNumQuestions] = useState("10");
  const [questionSetName, setQuestionSetName] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);
  const isSubscribed = useSelector(selectIsSubscribed);
  const freeGenerationCount = useSelector(selectFreeGenerationCount);

  console.log(freeGenerationCount);

  const handleGenerate = () => {
    if (!prompt) {
      setNotification({
        message: "Please enter a prompt.",
        type: "error",
      });
      return;
    }

    if (!questionSetName.trim()) {
      setNotification({
        message: "Please enter a name for the question set.",
        type: "error",
      });
      return;
    }

    const numQuestionsInt = parseInt(numQuestions, 10);

    if (!isSubscribed && (numQuestionsInt !== 10 || freeGenerationCount >= 2)) {
      setNotification({
        message: "Free users can generate only 10 questions, up to 2 times.",
        type: "error",
      });
      return;
    }

    const requestData = {
      question_format: testPattern,
      num_questions: numQuestionsInt,
      prompt: prompt,
      question_set_name: questionSetName,
    };

    setNotification({ message: "", type: "" });

    dispatch(generateQuestions(requestData))
      .unwrap()
      .then(() => {
        setNotification({
          message: "Questions generated successfully!",
          type: "success",
        });
        resetForm();
      })
      .catch((error) => {
        const friendlyMessage = getFriendlyErrorMessage(error);
        setNotification({
          message: friendlyMessage,
          type: "error",
        });
      });
  };

  const resetForm = () => {
    setPrompt("");
    setTestPattern("Only MCQs");
    setNumQuestions("10");
    setQuestionSetName("");
  };

  const handleHeadingChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 15) {
      setQuestionSetName(e.target.value);
    } else {
      setNotification({
        message: "Question set heading cannot exceed 15 words.",
        type: "error",
      });
    }
  };

  return (
    <div className="relative mt-3 w-full max-w-full sm:max-w-3xl mx-auto mb-3 px-4">
      {/* Question Set Heading Section */}
      <div className="flex-grow relative mb-4">
        <label className="font-poppins text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
          <FaPen className="mr-2 text-blue-500 dark:text-blue-400" /> Question
          Set Heading
        </label>
        <input
          type="text"
          value={questionSetName}
          onChange={handleHeadingChange}
          placeholder="Ex: Maths Quiz"
          className="font-poppins block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 sm:py-3 sm:px-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 shadow-sm hover:shadow-lg"
        />
      </div>

      {/* Select Question Type and Number of Questions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-grow relative">
          <label className="font-poppins text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <FaListUl className="mr-2 text-green-500 dark:text-green-400" />{" "}
            Select Question Type
          </label>
          <select
            value={testPattern}
            onChange={(e) => setTestPattern(e.target.value)}
            className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 sm:py-3 sm:px-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 shadow-sm hover:shadow-lg"
          >
            <option value="Only MCQs">Only MCQs</option>
            <option value="Only True/False">Only True/False</option>
            <option value="Both MCQs and True/False">
              Both MCQs and True/False
            </option>
          </select>
        </div>

        <div className="flex-grow relative">
          <label className="font-poppins text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <FaQuestion className="mr-2 text-purple-500 dark:text-purple-400" />{" "}
            How many Questions?
          </label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 sm:py-3 sm:px-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 shadow-sm hover:shadow-lg"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Prompt Text Input Section */}
      <div className="relative w-full bg-black dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl transition duration-300 p-4">
        <label className="font-poppins text-xs sm:text-sm font-medium text-white dark:text-gray-300 mb-1 flex items-center">
          <FaFileAlt className="mr-2 text-teal-500 dark:text-teal-400" /> Enter
          Prompt
        </label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full bg-black dark:bg-gray-900 border-none text-white dark:text-gray-200 rounded-full font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 pr-12 sm:pr-16 text-xs sm:text-sm md:text-base lg:text-lg resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-2">
        <button
          className="bg-white text-black dark:bg-white dark:text-black rounded-full p-3 transition duration-300 ease-in-out shadow-md"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="h-5 w-5 animate-spin" />
          ) : (
            <AiOutlineArrowRight className="h-3 w-3 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInputSection;
