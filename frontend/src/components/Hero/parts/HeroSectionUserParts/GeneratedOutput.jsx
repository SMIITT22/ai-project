import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  fetchLatestGeneratedQuestions,
  selectQuestions,
  selectLoading,
  selectError,
} from "../../redux/questionsSlice";
import getFriendlyErrorMessage from "../../../../utils/errorHandler";
import EditQuestion from "./GeneratedOutputParts/EditQuestion";
import DisplayQuestion from "./GeneratedOutputParts/DisplayQuestion";
import SkeletonLoader from "./GeneratedOutputParts/SkeletonLoader";

const GeneratedOutput = ({ setNotification }) => {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [editIndex, setEditIndex] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchData = () => {
      setIsLoadingComplete(false);
      dispatch(fetchLatestGeneratedQuestions());
      setTimeout(() => setIsLoadingComplete(true), 200);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const friendlyMessage = getFriendlyErrorMessage(error);
      setNotification({ message: friendlyMessage, type: "error" });
    }
  }, [error, setNotification]);

  const handleEdit = (index) => {
    setEditIndex(index);
    const question = questions[index];
    setEditedQuestionText(question.question_text || question.question);
    setEditedOptions(getOptions(question));
  };

  const handleSave = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question_text: editedQuestionText,
      options: editedOptions,
    };
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    console.log(`Delete question at index ${index}`);
  };

  const getOptions = (question) => {
    if (
      question.question_type === "True/False" ||
      question.type === "True/False"
    ) {
      return ["True", "False"];
    }
    if (Array.isArray(question.options)) {
      return question.options;
    }
    return [];
  };

  if (loading || !isLoadingComplete) {
    return <SkeletonLoader />;
  }

  if (questions && questions.length > 0) {
    // Render the questions list
    return (
      <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mb-8 px-4">
        <div className="border border-gray-300 rounded-lg bg-white">
          <div className="p-6">
            {questions.map((q, index) => {
              const options = getOptions(q);

              return (
                <div
                  key={index}
                  className="relative mb-8 border-b border-gray-300 pb-8"
                >
                  <div className="flex flex-col">
                    {editIndex === index ? (
                      <EditQuestion
                        questionText={editedQuestionText}
                        options={editedOptions}
                        setQuestionText={setEditedQuestionText}
                        setOptions={setEditedOptions}
                      />
                    ) : (
                      <DisplayQuestion
                        index={index}
                        question={q}
                        options={options}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        optionLabels={optionLabels}
                      />
                    )}
                  </div>
                  {editIndex === index && (
                    <div className="flex justify-end mt-4 gap-2">
                      <Button
                        variant="text"
                        size="sm"
                        className="whitespace-nowrap bg-gray-300"
                        onClick={() => handleSave(index)}
                      >
                        <span>Save</span>
                      </Button>
                      <Button
                        variant="gradient"
                        size="sm"
                        color="black"
                        className="whitespace-nowrap"
                        onClick={handleCancel}
                      >
                        <span>Cancel</span>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Display this if there are no questions after loading is complete
  return (
    <div className="flex flex-col items-center justify-center mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-black font-poppins">
        <span role="img" aria-label="info">
          📄
        </span>
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-black font-poppins mb-2 text-center">
        No Questions Generated Yet
      </h2>
      <p className="text-sm sm:text-base text-black font-poppins mb-3 sm:mb-4 text-center">
        Try generating some questions by using prompts!
      </p>
    </div>
  );
};

export default GeneratedOutput;
