import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { AiOutlineArrowRight, AiOutlineDownload } from "react-icons/ai";
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
            className="rounded-full border border-gray-300 text-xs sm:text-sm md:text-base text-gray-700 px-3 py-1 bg-white hover:text-white hover:bg-black hover:border-black transition duration-200 ease-in-out shadow-sm whitespace-nowrap"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

// Generated Output Component
const GeneratedOutput = ({ loading, generatedOutput, prompt }) => (
  <div
    className={`max-w-full sm:max-w-3xl mx-auto mt-8 mb-8 transition-all duration-500 ease-in-out`}
  >
    <div className="border border-white rounded-lg p-1 bg-black">
      {loading ? (
        <div className="animate-pulse">
          <div className="bg-gray-800 rounded-t-lg border-b border-white p-2 sm:p-4 flex justify-between items-center">
            <div className="h-6 bg-gray-600 rounded-full w-1/2"></div>
            <div className="h-6 bg-gray-600 rounded-full w-8"></div>
          </div>
          <div className="bg-gray-700 rounded-b-lg h-64 sm:h-80 md:h-96 p-4">
            <div className="h-6 bg-gray-600 rounded-full w-1/2 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-600 rounded w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-900 rounded-t-lg border-b border-gray-500">
            <div className="flex justify-between items-center p-2 sm:p-4 font-poppins rounded-t-lg">
              <span className="text-sm sm:text-base font-semibold flex-grow text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {prompt}
              </span>
              <button
                onClick={() => console.log("Download triggered")}
                className="flex-none"
              >
                <AiOutlineDownload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-blue-500 transition duration-200" />
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-b-lg h-64 sm:h-80 md:h-96 flex flex-col p-4">
            <div className="overflow-auto flex-grow max-h-full">
              <pre className="text-gray-200 whitespace-pre-wrap font-poppins text-sm sm:text-base">
                {generatedOutput}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
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
