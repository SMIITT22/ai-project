import { AiOutlineEdit } from "react-icons/ai";

const EditQuestion = ({
  questionText,
  options,
  setQuestionText,
  setOptions,
}) => (
  <>
    <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-3">
        <AiOutlineEdit className="text-black mr-2" />
        <span className="text-base font-medium text-black">Edit Question</span>
      </div>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>

    <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-3">
        <AiOutlineEdit className="text-black mr-2" />
        <span className="text-base font-medium text-black">Edit Options</span>
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
              className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default EditQuestion;
