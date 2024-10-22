import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const GeneratedOutput = ({ loading }) => {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "NaCl"],
      correctAnswer: "H2O",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);

  const optionLabels = ["A", "B", "C", "D"];

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuestion(questions[index].question);
    setEditedOptions([...questions[index].options]);
  };

  const handleSave = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: editedQuestion,
      options: editedOptions,
    };
    setQuestions(updatedQuestions);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 px-4">
      <div className="border border-gray-300 rounded-lg bg-white">
        {loading ? (
          <div className="animate-pulse p-6">
            {/* Skeleton for loading state */}
            <div className="bg-gray-300 rounded-lg p-6">
              <div className="h-6 bg-gray-400 rounded-full w-1/2 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-400 rounded w-full"></div>
                <div className="h-4 bg-gray-400 rounded w-full"></div>
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="relative mb-8 border-b border-gray-300 pb-8"
              >
                <div className="flex flex-col">
                  {editIndex === index ? (
                    <>
                      {/* Display the label above the input field */}
                      <label className="block text-black text-sm font-bold mb-2">
                        Question
                      </label>
                      <input
                        type="text"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded text-sm sm:text-base"
                      />
                    </>
                  ) : (
                    <div className="flex items-start justify-between w-full">
                      <p className="font-poppins text-base sm:text-lg text-black mb-2 flex-grow">
                        {index + 1}. {q.question}
                      </p>
                      {/* Three-dot menu for edit/delete actions */}
                      <div className="ml-2">
                        <Menu placement="bottom-end">
                          <MenuHandler>
                            <div className="cursor-pointer">
                              <BsThreeDotsVertical size={20} />
                            </div>
                          </MenuHandler>
                          <MenuList className="bg-white text-black border-gray-300 shadow-md rounded-lg">
                            <MenuItem onClick={() => handleEdit(index)}>
                              Edit
                            </MenuItem>
                            <hr className="border-t border-gray-300 my-1" />
                            <MenuItem onClick={() => handleDelete(index)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>

                <ul className="list-none pl-0 mt-4">
                  {editIndex === index && (
                    <label className="block text-black text-sm font-bold mb-1">
                      Options
                    </label>
                  )}
                  {q.options.map((option, idx) => (
                    <li key={idx} className="mb-2">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedOptions[idx]}
                          onChange={(e) => {
                            const updatedOptions = [...editedOptions];
                            updatedOptions[idx] = e.target.value;
                            setEditedOptions(updatedOptions);
                          }}
                          className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                        />
                      ) : (
                        <div className="p-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition">
                          <span className="font-bold mr-2">
                            {optionLabels[idx]}.
                          </span>
                          {option}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* Save and Cancel buttons at the bottom right */}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedOutput;
