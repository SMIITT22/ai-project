import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
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

    // Check if the user is allowed to generate the selected number of questions
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

    // Reset notification before generating
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
        // Use the error handler utility
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

  const handleTestPatternChange = (value) => {
    setTestPattern(value);
  };

  const handleNumQuestionsChange = (value) => {
    setNumQuestions(value);
  };

  return (
    <div className="max-w-full sm:max-w-3xl mx-auto mb-6 px-4">
      {/* Dropdowns in one line */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Select
          value={testPattern}
          label="Select Question Type"
          onChange={(value) => handleTestPatternChange(value)}
          color="gray"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          className="flex-grow"
        >
          <Option value="Only MCQs">Only MCQs</Option>
          <Option value="Only True/False">Only True/False</Option>
          <Option value="Both MCQs and True/False">
            Both MCQs and True/False
          </Option>
        </Select>
        <Select
          value={numQuestions}
          onChange={(value) => handleNumQuestionsChange(value)}
          label="How many Questions?"
          color="gray"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          className="flex-grow"
        >
          <Option value="10">10</Option>
          <Option value="25">25</Option>
          <Option value="50">50</Option>
        </Select>
      </div>
      {/* Prompt Input Field */}
      <div className="relative">
        <div className="w-full flex items-center bg-black shadow-lg border border-gray-300 rounded-full transition duration-300">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-black border-none text-white rounded-full font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 pr-12 sm:pr-16 text-xs sm:text-sm md:text-base lg:text-lg"
            placeholder="Enter Subject & Topic..."
          />
          <div className="pr-1 sm:pr-2">
            <button
              className="bg-white text-black rounded-full p-2 transition duration-300 ease-in-out"
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
            className="rounded-full border font-poppins border-gray-300 text-xs sm:text-sm md:text-base text-gray-700 px-3 py-1 bg-white hover:text-white hover:bg-black hover:border-black transition duration-200 ease-in-out shadow-sm w-full sm:w-auto"
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
