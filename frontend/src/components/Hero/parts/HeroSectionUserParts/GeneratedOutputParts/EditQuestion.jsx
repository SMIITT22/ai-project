import { AiOutlineEdit } from "react-icons/ai";

const EditQuestion = ({
  questionText,
  options,
  setQuestionText,
  setOptions,
}) => (
  <>
    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <AiOutlineEdit className="text-black dark:text-gray-200 mr-2" />
        <span className="text-base font-medium text-black dark:text-gray-200">
          Edit Question
        </span>
      </div>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-2 bg-white dark:bg-gray-900 text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
      />
    </div>

    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <AiOutlineEdit className="text-black dark:text-gray-200 mr-2" />
        <span className="text-base font-medium text-black dark:text-gray-200">
          Edit Options
        </span>
      </div>
      <ul className="list-none pl-0">
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
              placeholder={`Option ${idx + 1}`}
              className="w-full p-2 bg-white dark:bg-gray-900 text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
            />
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default EditQuestion;
