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

const InputSection = ({ setNotification }) => {
  const [prompt, setPrompt] = useState("");
  const [testPattern, setTestPattern] = useState("Only MCQs");
  const [numQuestions, setNumQuestions] = useState("10");
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);
  const isSubscribed = useSelector(selectIsSubscribed);
  const freeGenerationCount = useSelector(selectFreeGenerationCount);

  const handleGenerate = () => {
    if (!prompt) {
      setNotification({
        message: "Please enter a prompt.",
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
  };

  return (
    <div className="max-w-full sm:max-w-3xl mx-auto mb-6 px-4">
      {/* Dropdowns in one line */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Custom Select for Test Pattern */}
        <div className="flex-grow relative">
          <label className="font-poppins block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Question Type
          </label>
          <select
            value={testPattern}
            onChange={(e) => setTestPattern(e.target.value)}
            className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 transition duration-200 ease-in-out focus:outline-none"
          >
            <option value="Only MCQs">Only MCQs</option>
            <option value="Only True/False">Only True/False</option>
            <option value="Both MCQs and True/False">
              Both MCQs and True/False
            </option>
          </select>
        </div>

        {/* Custom Select for Number of Questions */}
        <div className="flex-grow relative">
          <label className="font-poppins block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How many Questions?
          </label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 transition duration-200 ease-in-out focus:outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Prompt Input Field */}
      <div className="relative">
        <div className="w-full flex items-center bg-black dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-full transition duration-300">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-black dark:bg-gray-900 border-none text-white dark:text-gray-200 rounded-full font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 pr-12 sm:pr-16 text-xs sm:text-sm md:text-base lg:text-lg"
            placeholder="Enter Subject & Topic..."
          />
          <div className="pr-1 sm:pr-2">
            <button
              className="bg-white text-black dark:bg-white dark:text-black rounded-full p-2 transition duration-300 ease-in-out"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="h-3 w-3 sm:h-6 sm:w-6 animate-spin" />
              ) : (
                <AiOutlineArrowRight className="h-3 w-3 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mt-6">
        {[
          "Prepare questions on work, energy, and power in physics",
          "Draft questions about the nervous system in human anatomy",
          "Practice questions on chemical reactions and equations",
        ].map((suggestion, index) => (
          <button
            key={index}
            className="rounded-full border font-poppins border-gray-300 dark:border-gray-700 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 px-3 py-1 bg-white dark:bg-gray-800 hover:text-white hover:bg-black hover:border-black dark:hover:bg-gray-700 transition duration-200 ease-in-out shadow-sm w-full sm:w-auto"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputSection;
