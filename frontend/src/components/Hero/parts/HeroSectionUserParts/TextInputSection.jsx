import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner, FaPen, FaFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestionsFromText,
  selectLoading as selectQuestionsLoading,
} from "../../redux/questionsSlice";
import {
  selectIsSubscribed,
  selectFreeGenerationCount,
} from "../../../../auth/authSlice";
import getFriendlyErrorMessage from "../../../../utils/errorHandler";

const TextInputSection = ({ setNotification }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);
  const isSubscribed = useSelector(selectIsSubscribed);
  const freeGenerationCount = useSelector(selectFreeGenerationCount);
  const [text, setText] = useState("");
  const [questionSetName, setQuestionSetName] = useState("");

  const MIN_WORDS = 50;
  const MAX_WORDS = 500;
  const MAX_HEADING_WORDS = 10;

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
        message: "Please enter at least 50 words.",
        type: "error",
      });
      return;
    }

    if (wordCount > MAX_WORDS) {
      setNotification({
        message: "Please reduce the text size.",
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

    // Subscription validation
    if (!isSubscribed && freeGenerationCount >= 2) {
      setNotification({
        message:
          "Free users can generate up to 2 question sets. Please subscribe for unlimited access.",
        type: "error",
      });
      return;
    }

    const requestData = {
      text,
      question_set_name: questionSetName,
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

  const handleHeadingChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= MAX_HEADING_WORDS) {
      setQuestionSetName(e.target.value);
    } else {
      setNotification({
        message: `Heading cannot exceed ${MAX_HEADING_WORDS} words.`,
        type: "error",
      });
    }
  };

  const resetForm = () => {
    setText("");
    setQuestionSetName("");
  };

  return (
    <div className="relative mt-3 w-full max-w-full sm:max-w-3xl mx-auto mb-3 px-4">
      <div className="flex-grow relative mb-4">
        <label className="font-poppins text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
          <FaPen className="mr-2 text-blue-500 dark:text-blue-400" /> Question
          Set Heading
        </label>
        <input
          type="text"
          value={questionSetName}
          onChange={handleHeadingChange}
          placeholder="Ex: Biology Test"
          className="font-poppins block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-900 dark:text-gray-300 rounded-lg py-2 px-3 sm:py-3 sm:px-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 shadow-sm hover:shadow-lg"
        />
      </div>

      <div className="relative w-full bg-black dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl transition duration-300 p-4">
        <label className="font-poppins text-xs sm:text-sm font-medium text-white dark:text-gray-300 mb-1 flex items-center">
          <FaFileAlt className="mr-2 text-purple-500 dark:text-purple-400" />{" "}
          Text Content
        </label>
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
