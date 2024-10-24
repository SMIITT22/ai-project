import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchLatestGeneratedQuestions,
  selectQuestions,
  selectLoading,
  selectError,
} from "../../redux/questionsSlice";

const SkeletonLoader = () => (
  <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 px-4">
    <div className="border border-gray-300 rounded-lg bg-white p-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-8 pb-8 border-b border-gray-300">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
      setNotification({ message: error, type: "error" });
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
    // Always show the SkeletonLoader during the loading phase
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        An error occurred while fetching questions.
      </div>
    );
  }

  if (questions && questions.length > 0) {
    // Render the questions list
    return (
      <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 px-4">
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

const EditQuestion = ({
  questionText,
  options,
  setQuestionText,
  setOptions,
}) => (
  <>
    <label className="block text-black text-sm font-bold mb-2">Question</label>
    <input
      type="text"
      value={questionText}
      onChange={(e) => setQuestionText(e.target.value)}
      className="w-full mb-4 p-2 border border-gray-300 rounded text-sm sm:text-base"
    />
    <label className="block text-black text-sm font-bold">Options</label>
    <ul className="list-none pl-0 mt-2">
      {options.map((option, idx) => (
        <li key={idx} className="mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const updatedOptions = [...options];
              updatedOptions[idx] = e.target.value;
              setOptions(updatedOptions);
            }}
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
          />
        </li>
      ))}
    </ul>
  </>
);

const DisplayQuestion = ({
  index,
  question,
  options,
  handleEdit,
  handleDelete,
  optionLabels,
}) => (
  <>
    <div className="flex items-start justify-between w-full">
      <p className="font-poppins text-base sm:text-lg text-black mb-2 flex-grow">
        {index + 1}. {question.question_text || question.question}
      </p>
      <div className="ml-2">
        <Menu placement="bottom-end">
          <MenuHandler>
            <div className="cursor-pointer">
              <BsThreeDotsVertical size={20} />
            </div>
          </MenuHandler>
          <MenuList className="bg-white text-black border-gray-300 shadow-md rounded-lg">
            <MenuItem onClick={() => handleEdit(index)}>Edit</MenuItem>
            <hr className="border-t border-gray-300 my-1" />
            <MenuItem onClick={() => handleDelete(index)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
    {options && options.length > 0 && (
      <ul className="list-none pl-0 mt-4">
        {options.map((option, idx) => (
          <li key={idx} className="mb-2">
            <div className="p-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition">
              <span className="font-bold mr-2">
                {question.question_type === "True/False"
                  ? ""
                  : `${optionLabels[idx]}.`}
              </span>
              {option}
            </div>
          </li>
        ))}
      </ul>
    )}
  </>
);

export default GeneratedOutput;
