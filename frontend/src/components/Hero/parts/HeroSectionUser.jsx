import { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { AiOutlineArrowRight, AiOutlineMore } from "react-icons/ai";
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

  const handleGenerate = () => {
    if (prompt) {
      setLoading(true);
      onGenerate(prompt);
      setPrompt("");
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className="max-w-full sm:max-w-3xl mx-auto mb-6">
      <div className="relative">
        <div className="w-full flex items-center bg-black shadow-lg border border-gray-300 rounded-full transition duration-300">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-black border-none text-white rounded-full font-poppins focus:outline-none px-4 py-2 sm:px-6 sm:py-4 pr-12 sm:pr-16 text-xs sm:text-sm md:text-base lg:text-lg"
            placeholder="Enter your prompt here..."
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
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          "Std 8th Biology questions without options",
          "45 Chemistry MCQs from Std 11th syllabus",
          "Physics MCQs for Std 10th",
        ].map((suggestion, index) => (
          <button
            key={index}
            className="rounded-full border font-poppins border-gray-300 text-xs sm:text-sm md:text-base text-gray-700 px-3 py-1 bg-white hover:text-white hover:bg-black hover:border-black transition duration-200 ease-in-out shadow-sm whitespace-nowrap"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

const GeneratedOutput = ({ loading, generatedOutput, prompt }) => {
  const handleDownloadPDF = () => {
    console.log("Download as PDF triggered");
  };

  return (
    <div
      className={`max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 transition-all duration-500 ease-in-out`}
    >
      <div className="border border-gray-500 rounded-lg bg-white">
        {loading ? (
          <div className="animate-pulse">
            {/* Skeleton for Header */}
            <div className="bg-gray-300 rounded-t-lg border-b border-gray-500 p-2 flex justify-between items-center">
              <div className="h-6 bg-gray-400 rounded-full w-1/2"></div>
              <div className="h-6 bg-gray-400 rounded-full w-8"></div>
            </div>
            {/* Skeleton for Content */}
            <div className="bg-gray-200 rounded-b-lg h-80 sm:h-96 lg:h-[30rem] xl:h-[36rem] p-6">
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
          <>
            <div className="bg-gray-300 rounded-t-lg border-b border-gray-500">
              <div className="flex justify-between items-center p-2 px-3 font-poppins rounded-t-lg">
                <span className="text-xs sm:text-sm md:text-base flex-grow text-black whitespace-nowrap overflow-hidden text-ellipsis">
                  {prompt}
                </span>
                <Menu>
                  <MenuHandler>
                    <Button variant="text" className="flex-none text-black p-1">
                      <AiOutlineMore className="h-6 w-6" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-0 bg-white border border-gray-50 w-32 sm:w-40 lg:w-56">
                    <MenuItem
                      onClick={handleDownloadPDF}
                      className="bg-white text-black text-xs sm:text-sm lg:text-base font-poppins px-1 sm:px-4 lg:px-6 p-2 sm:py-2 lg:py-3"
                    >
                      Download as PDF
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>

            <div className="bg-gray-200 rounded-b-lg h-80 sm:h-96 lg:h-[30rem] xl:h-[36rem] flex flex-col px-3 py-2">
              <div className="overflow-auto flex-grow max-h-full">
                <pre className="text-black whitespace-pre-wrap font-poppins text-xs sm:text-sm md:text-base">
                  {generatedOutput}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main Component
const HeroSectionUser = () => {
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGeneratedVisible, setIsGeneratedVisible] = useState(false);

  const handleGenerate = (prompt) => {
    setLoading(true);
    setIsGeneratedVisible(true);

    setTimeout(() => {
      setGeneratedOutput(`${prompt}`);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
      <Heading currentPhrase={"Generate Your Custom Questions!"} />
      <InputSection onGenerate={handleGenerate} />
      {isGeneratedVisible && (
        <GeneratedOutput
          prompt={generatedOutput}
          loading={loading}
          generatedOutput={generatedOutput}
        />
      )}
    </div>
  );
};

export default HeroSectionUser;
