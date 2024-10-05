import { useState } from "react";
import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";
import { AiOutlineArrowRight, AiOutlineDownload } from "react-icons/ai";

const GenrateQuestions = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGeneratedVisible, setIsGeneratedVisible] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setIsGeneratedVisible(true);

    // Simulate an API request
    setTimeout(() => {
      setGeneratedOutput(
        `Generated questions based on the prompt: "${prompt}"`
      );
      setLoading(false); // Stop loading after fetching data
    }, 3000); // Simulated delay for loading
  };

  return (
    <div>
      {/* Header Section */}
      <ProfileMenuScreensHeader
        heading="Generate Questions"
        subHeading="Easily generate your questions or exam papers"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Input Section (Initially on top) */}
        <div
          className={`max-w-full sm:max-w-3xl mx-auto mb-6 transition-all duration-500 ease-in-out ${
            isGeneratedVisible ? "mt-10" : ""
          }`}
        >
          <div className="relative">
            <div className="w-full flex items-center bg-white shadow-lg border border-gray-300 rounded-full transition duration-300">
              <input
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                className="w-full bg-transparent border-none rounded-full focus:outline-none px-4 py-2 sm:px-6 sm:py-4 pr-12 sm:pr-16"
                placeholder="Write your creative prompt here..."
              />
              <div className="pr-2">
                <button
                  className="bg-green-500 text-white rounded-full p-2 transition duration-300 ease-in-out"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader border-t-transparent border-white border-4 rounded-full w-5 h-5 sm:w-6 sm:h-6 block animate-spin"></span>
                  ) : (
                    <AiOutlineArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Suggestion 1", "Suggestion 2", "Suggestion 3"].map(
              (suggestion, index) => (
                <button
                  key={index}
                  className="rounded-full border border-gray-300 text-sm sm:text-base text-gray-700 px-3 py-1 bg-white hover:bg-green-100 hover:border-green-400 transition duration-200 ease-in-out shadow-sm whitespace-nowrap"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Generated Output Section (Appears below input when visible) */}
        {isGeneratedVisible && (
          <div
            className={`max-w-full sm:max-w-3xl mx-auto mt-8 mb-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0`}
          >
            {/* Outer container with gray border */}
            <div className="border border-gray-300 rounded-lg p-2">
              {/* Skeleton Loader for Header and Content */}
              {loading ? (
                <div className="animate-pulse">
                  {/* Skeleton Header */}
                  <div className="bg-white rounded-t-lg border-b border-gray-300 p-2 sm:p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded-full w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded-full w-8"></div>
                  </div>

                  {/* Skeleton Body */}
                  <div className="bg-gray-100 rounded-b-lg h-64 sm:h-80 md:h-96 p-4">
                    <div className="h-6 bg-gray-300 rounded-full w-1/2 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Output Header (White background) */}
                  <div className="bg-white rounded-t-lg border-b border-gray-300">
                    <div className="flex justify-between items-center p-2 sm:p-4 font-poppins rounded-t-lg">
                      <span className="text-base sm:text-lg font-semibold flex-grow text-gray-900 sm:whitespace-nowrap sm:truncate">
                        {prompt}
                      </span>
                      <button
                        onClick={() => console.log("Download triggered")}
                        className="flex-none"
                      >
                        <AiOutlineDownload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-blue-500 transition duration-200" />
                      </button>
                    </div>
                  </div>

                  {/* Generated Content */}
                  <div className="bg-gray-100 rounded-b-lg h-64 sm:h-80 md:h-96 flex flex-col p-4">
                    <div className="overflow-auto flex-grow">
                      <pre className="text-gray-800 whitespace-pre-wrap font-poppins">
                        {generatedOutput}
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrateQuestions;
