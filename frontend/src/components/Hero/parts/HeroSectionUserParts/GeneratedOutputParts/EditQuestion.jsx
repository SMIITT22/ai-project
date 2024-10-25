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

export default EditQuestion;
