import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";

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

export default DisplayQuestion;
