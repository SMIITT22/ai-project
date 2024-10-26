import { Tooltip } from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const GeneratedOutputNavbar = () => {
  return (
    <div className="sticky top-0 bg-gray-100 p-3 sm:p-4 border-b border-gray-300 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition duration-150"
          onClick={() => {
            console.log("Redirect to edit page");
          }}
        >
          <FiEdit className="sm:text-base text-sm" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip
          content="Here you will see the latest generated question set. To see all question sets, go to Generations."
          placement="top"
          className="bg-black text-white font-poppins rounded-md p-2"
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
        >
          <button className="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition duration-150">
            <AiOutlineInfoCircle className="sm:text-base text-sm" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default GeneratedOutputNavbar;
