// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";
// import { BsThreeDotsVertical } from "react-icons/bs";

const DisplayQuestion = ({
  index,
  question,
  options,
  // handleEdit,
  // handleDelete,
  optionLabels,
}) => (
  <>
    <div className="flex items-start justify-between w-full">
      <p className="font-poppins text-base sm:text-lg text-black dark:text-gray-200 mb-2 flex-grow">
        {index + 1}. {question.question_text || question.question}
      </p>
      <div className="ml-2">
        {/* <Menu placement="bottom-end">
          <MenuHandler>
            <div className="cursor-pointer text-black dark:text-gray-200">
              <BsThreeDotsVertical size={20} />
            </div>
          </MenuHandler>
          <MenuList className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-gray-300 dark:border-gray-700 shadow-md rounded-lg">
            <MenuItem
              onClick={() => handleEdit(index)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit
            </MenuItem>
            <hr className="border-t border-gray-300 dark:border-gray-700 my-1" />
            <MenuItem
              onClick={() => handleDelete(index)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu> */}
      </div>
    </div>
    {options && options.length > 0 && (
      <ul className="list-none pl-0 mt-4">
        {options.map((option, idx) => (
          <li key={idx} className="mb-2">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <span className="font-extralight font-poppins mr-2">
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

export default DisplayQuestion;
