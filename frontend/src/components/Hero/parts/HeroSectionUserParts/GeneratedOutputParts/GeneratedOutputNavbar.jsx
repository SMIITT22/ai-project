// import { useState, useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
// import { formatDistanceToNow } from "date-fns";

const GeneratedOutputNavbar = () => {
  // const [timeAgo, setTimeAgo] = useState("");

  // useEffect(() => {
  //   const updateRelativeTime = () => {
  //     if (requestTime) {
  //       const utcDateTime = new Date(`${requestTime}Z`);
  //       setTimeAgo(formatDistanceToNow(utcDateTime, { addSuffix: true }));
  //     }
  //   };

  //   updateRelativeTime();
  //   const intervalId = setInterval(updateRelativeTime, 60000);
  //   return () => clearInterval(intervalId);
  // }, [requestTime]);

  return (
    <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between rounded-t-lg">
      <div className="flex items-center gap-2">
        <button
          className="bg-black dark:bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-150"
          onClick={() => {
            console.log("Redirect to edit page");
          }}
        >
          <FiEdit className="sm:text-base text-sm" />
        </button>
        {/* {timeAgo && (
          <div className="text-sm text-gray-600 dark:text-gray-400 font-poppins">
            Generated {timeAgo}
          </div>
        )} */}
      </div>
      <div className="flex items-center gap-2">
        <Tooltip
          content="Here you will see the latest generated question set. To see all question sets, go to Generations."
          placement="top"
          className="bg-black dark:bg-gray-700 text-white font-poppins rounded-md p-2"
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
        >
          <button className="bg-black dark:bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-150">
            <AiOutlineInfoCircle className="sm:text-base text-sm" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default GeneratedOutputNavbar;
