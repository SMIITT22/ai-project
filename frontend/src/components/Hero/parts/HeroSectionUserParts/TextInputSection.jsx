import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestionsFromText, // Use the text-based generation action
  selectLoading as selectQuestionsLoading,
} from "../../redux/questionsSlice";
import getFriendlyErrorMessage from "../../../../utils/errorHandler";

const TextInputSection = ({ setNotification }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);
  const [text, setText] = useState("");

  const MIN_WORDS = 50;
  const MAX_WORDS = 500;

  const countWords = (str) => {
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleGenerate = () => {
    const wordCount = countWords(text);

    if (!text) {
      setNotification({
        message: "Please paste some text to generate questions.",
        type: "error",
      });
      return;
    }

    if (wordCount < MIN_WORDS) {
      setNotification({
        message: `Please enter at least ${MIN_WORDS} words. You have entered only ${wordCount}.`,
        type: "error",
      });
      return;
    }

    if (wordCount > MAX_WORDS) {
      setNotification({
        message: `Please limit your input to ${MAX_WORDS} words. You have entered ${wordCount}.`,
        type: "error",
      });
      return;
    }

    const requestData = {
      text: text,
      question_format: "Only MCQs",
      num_questions: 10,
    };

    setNotification({ message: "", type: "" });

    dispatch(generateQuestionsFromText(requestData))
      .unwrap()
      .then(() => {
        setNotification({
          message: "Questions generated successfully!",
          type: "success",
        });
      })
      .catch((error) => {
        const friendlyMessage = getFriendlyErrorMessage(error);
        setNotification({
          message: friendlyMessage,
          type: "error",
        });
      });
  };

  return (
    <div className="relative mt-6 w-full">
      <div className="relative w-full bg-black dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl transition duration-300 p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full h-36 max-h-48 bg-black dark:bg-gray-900 border-none text-white dark:text-gray-200 rounded-xl font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm md:text-base lg:text-lg resize-none"
          placeholder="Paste your text here..."
        />
      </div>
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

export default TextInputSection;
