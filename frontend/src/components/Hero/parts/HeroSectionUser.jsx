import { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Select,
  Option,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

// Heading Component
const Heading = ({ currentPhrase }) => (
  <div className="text-center mb-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Typography
        variant="h1"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins text-black"
      >
        {currentPhrase}
      </Typography>
    </motion.div>
  </div>
);

// Input Section Component
const InputSection = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [testPattern, setTestPattern] = useState("Only MCQs");
  const [numQuestions, setNumQuestions] = useState(10);
  const [isTestPatternOpen, setIsTestPatternOpen] = useState(false);
  const [isNumQuestionsOpen, setIsNumQuestionsOpen] = useState(false);

  const handleGenerate = () => {
    if (prompt) {
      setLoading(true);

      // Create an object representing the data to be sent to the backend
      const requestData = {
        testPattern,
        numQuestions,
        prompt,
      };

      // Log the data to the console
      console.log("Request Data to Backend:", requestData);

      const fullPrompt = `Pattern: ${testPattern}, Number of Questions: ${numQuestions}, Subject & Topic: ${prompt}`;
      onGenerate(fullPrompt);
      setPrompt("");
      setTimeout(() => setLoading(false), 3000);
    }
  };

  const handleTestPatternChange = (value) => {
    setTestPattern(value);
    setIsTestPatternOpen(false); // Close the dropdown
  };

  const handleNumQuestionsChange = (value) => {
    setNumQuestions(value);
    setIsNumQuestionsOpen(false); // Close the dropdown
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
          open={isTestPatternOpen}
          onOpen={() => setIsTestPatternOpen(true)}
          onClose={() => setIsTestPatternOpen(false)}
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
          open={isNumQuestionsOpen}
          onOpen={() => setIsNumQuestionsOpen(true)}
          onClose={() => setIsNumQuestionsOpen(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          className="flex-grow"
        >
          <Option value={10}>10</Option>
          <Option value={25}>25</Option>
          <Option value={50}>50</Option>
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

// Main Component
const HeroSectionUser = () => {
  const [loading, setLoading] = useState(false);
  const [isGeneratedVisible, setIsGeneratedVisible] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setIsGeneratedVisible(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
      <Heading currentPhrase={"Generate Your Custom Questions!"} />
      <InputSection onGenerate={handleGenerate} />
      {isGeneratedVisible && <GeneratedOutput loading={loading} />}
    </div>
  );
};

export default HeroSectionUser;
