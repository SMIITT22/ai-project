import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "./PromptExamples.css";

const PromptExamples = () => {
  const navigate = useNavigate();

  const row1Content = [
    "Create a full NEET paper",
    "90 Physics questions for Class 12th",
    "Std 8th Biology questions without options",
    "45 Chemistry MCQs from Std 11th syllabus",
    "Physics MCQs with for Std 10th",
  ];

  const row2Content = [
    "NEET Biology paper with 90 questions",
    "100 random Chemistry questions for NEET",
    "60 Physics questions",
    "Revision questions for Std 9th Biology",
  ];

  const row3Content = [
    "Mock test for NEET Physics",
    "Science questions for Std 10th",
    "Std 8th Biology questions with answers",
    "Practice MCQs for Std 11th Chemistry",
  ];

  const handlePromptClick = () => {
    navigate("/signup");
  };

  // Function to duplicate content to prevent gaps
  const duplicateContent = (contentArray) => {
    return [...contentArray, ...contentArray];
  };

  // Function to render marquee items
  const renderMarqueeItems = (contentArray) => {
    return contentArray.map((text, index) => (
      <div
        key={index}
        onClick={handlePromptClick}
        className="border border-gray-300 p-3 rounded-md mr-1 cursor-pointer prompt-item"
      >
        <Typography className="text-black font-poppins text-sm">
          {text}
        </Typography>
      </div>
    ));
  };

  return (
    <div
      id="sample-questions-section"
      className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-20 xl:px-32 bg-white text-center pt-20 pb-10"
    >
      {/* Container with white-smoke background on left and right */}
      <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center">
        <Typography
          variant="h4"
          className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black font-bold mb-6"
        >
          See examples
        </Typography>
        <Typography
          variant="lead"
          className="text-base sm:text-lg md:text-xl font-gloria text-gray-700 mb-10 max-w-3xl text-center"
        >
          You can see more examples. Select one of the prompts below.
        </Typography>
        {/* Row 1 */}
        <div className="marquee-row row1">
          <div className="marquee-content">
            {renderMarqueeItems(duplicateContent(row1Content))}
          </div>
        </div>
        {/* Row 2 */}
        <div className="marquee-row row2 mt-2">
          <div className="marquee-content">
            {renderMarqueeItems(duplicateContent(row2Content))}
          </div>
        </div>
        {/* Row 3 */}
        <div className="marquee-row row3 mt-2">
          <div className="marquee-content">
            {renderMarqueeItems(duplicateContent(row3Content))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptExamples;
