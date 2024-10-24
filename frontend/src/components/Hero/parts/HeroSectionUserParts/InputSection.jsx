import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestions,
  selectLoading as selectQuestionsLoading,
} from "../../redux/questionsSlice";

const InputSection = ({ setNotification }) => {
  const [prompt, setPrompt] = useState("");
  const [testPattern, setTestPattern] = useState("Only MCQs");
  const [numQuestions, setNumQuestions] = useState("10");
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);

  const handleGenerate = () => {
    if (prompt) {
      const requestData = {
        question_type: testPattern,
        num_questions: parseInt(numQuestions, 10),
        prompt: prompt,
      };

      // Reset notification before generating
      setNotification({ message: "", type: "" });

      dispatch(generateQuestions(requestData))
        .unwrap()
        .then(() => {
          // Show success notification
          setNotification({
            message: "Questions generated successfully!",
            type: "success",
          });
          // Clear form fields after success
          resetForm();
        })
        .catch((error) => {
          // Show error notification
          setNotification({
            message:
              error?.detail || "An error occurred while generating questions.",
            type: "error",
          });
        });
    } else {
      // Show error notification if prompt is empty
      setNotification({
        message: "Please enter a prompt.",
        type: "error",
      });
    }
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
          color="black"
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
          color="black"
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
