import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestions,
  selectLoading as selectQuestionsLoading,
} from "../../redux/questionsSlice";
import getFriendlyErrorMessage from "../../../../utils/errorHandler";

const TextInputSection = ({ setNotification }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectQuestionsLoading);
  const [text, setText] = useState("");

  const handleGenerate = () => {
    if (!text) {
      setNotification({
        message: "Please paste some text to generate questions.",
        type: "error",
      });
      return;
    }

    const requestData = {
      prompt: text,
      question_format: "Only MCQs",
      num_questions: 10,
    };

    setNotification({ message: "", type: "" });

    dispatch(generateQuestions(requestData))
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
      <div className="relative w-full bg-black dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl transition duration-300">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full h-36 max-h-48 bg-black dark:bg-gray-900 border-none text-white dark:text-gray-200 rounded-xl font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm md:text-base lg:text-lg resize-none"
          placeholder="Paste your text here..."
        />
        <div className="absolute bottom-3 right-3">
          <button
            className="bg-white text-black dark:bg-white dark:text-black rounded-full p-3 transition duration-300 ease-in-out shadow-md"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="h-5 w-5 animate-spin" />
            ) : (
              <AiOutlineArrowRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInputSection;
