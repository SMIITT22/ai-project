import { useState } from "react";
import Heading from "./HeroSectionUserParts/Heading";
import PromptInputSection from "./HeroSectionUserParts/PromptInputSection";
import TextInputSection from "./HeroSectionUserParts/TextInputSection";
import Notification from "../../../common/Notification";
import GeneratedOutput from "./HeroSectionUserParts/GeneratedOutput";

const HeroSectionUser = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [activeTab, setActiveTab] = useState("prompt");
  const [transitioning, setTransitioning] = useState(false);

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  const handleTabSwitch = (tab) => {
    if (tab !== activeTab) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 mt-8 transition-colors duration-300">
      {notification.message && (
        <Notification
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}

      {/* Main layout with two columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Heading and Input Sections */}
        <div className="flex-[1] flex flex-col items-center lg:items-start lg:max-w-full">
          <Heading currentPhrase={"Generate Your Custom Questions!"} />

          {/* Tab Navigation */}
          <div className="flex justify-center mb-4 w-full max-w-sm lg:max-w-none">
            <div className="relative flex rounded-full bg-gray-200 dark:bg-gray-800 p-0.5 shadow-md w-full">
              {/* Sliding background for the active tab */}
              <div
                className={`absolute top-0 left-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-500 ease-in-out ${
                  activeTab === "text" ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>

              <button
                onClick={() => handleTabSwitch("prompt")}
                className={`relative z-10 w-1/2 flex items-center justify-center px-4 py-1 font-poppins font-extralight text-sm rounded-full transition-colors duration-300 ${
                  activeTab === "prompt"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                } focus:outline-none`}
              >
                Prompt Input
              </button>
              <button
                onClick={() => handleTabSwitch("text")}
                className={`relative z-10 w-1/2 flex items-center justify-center px-4 py-1 font-poppins font-extralight text-sm rounded-full transition-colors duration-300 ${
                  activeTab === "text"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                } focus:outline-none`}
              >
                Text Input
              </button>
            </div>
          </div>

          {/* Input Section with Transition */}
          <div
            className={`border border-gray-300 dark:border-gray-700 rounded-lg p-3 pt-8 shadow-sm transform transition-all duration-500 ease-in-out w-full ${
              transitioning
                ? "opacity-0 translate-y-5"
                : "opacity-100 translate-y-0"
            }`}
          >
            {activeTab === "prompt" ? (
              <PromptInputSection
                key="prompt-input"
                setNotification={setNotification}
              />
            ) : (
              <TextInputSection
                key="text-input"
                setNotification={setNotification}
              />
            )}
          </div>
        </div>

        {/* Right Section: Fixed Height Generated Output */}
        <div className="flex-[1] h-[600px] ">
          <GeneratedOutput setNotification={setNotification} />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionUser;
