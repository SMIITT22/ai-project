import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../auth/authSlice";
import "./PromptExamples.css";

const PromptExamples = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const row1Content = [
    "Create questions on the skeletal system in human anatomy",
    "Generate questions covering Newton's laws in mechanics",
    "Questions about photosynthesis in plant physiology, without options",
    "Prepare MCQs related to hydrocarbons in organic chemistry",
    "Practice questions on magnetic fields and forces in electromagnetism",
  ];

  const row2Content = [
    "Draft questions on the digestive system in human anatomy",
    "Create questions related to trends in the periodic table in chemistry",
    "Provide questions focusing on the laws of thermodynamics in physics",
    "Revision questions about cell structure in biology",
    "Practice MCQs on acids, bases, and salts in chemistry",
  ];

  const row3Content = [
    "Create questions on electricity and circuits in physics",
    "Generate questions on genetics and heredity in biology",
    "Prepare MCQs related to chemical bonding in chemistry",
    "Questions about motion and kinematics in physics",
    "Draft practice questions on ecosystems and biodiversity in biology",
  ];

  const handlePromptClick = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  const duplicateContent = (contentArray) => {
    return [...contentArray, ...contentArray];
  };

  const renderMarqueeItems = (contentArray) => {
    return contentArray.map((text, index) => (
      <div
        key={index}
        onClick={() => handlePromptClick(text)}
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-md mr-1 cursor-pointer prompt-item dark:text-gray-300"
      >
        <Typography className="text-gray-700 dark:text-gray-300 font-poppins text-sm">
          {text}
        </Typography>
      </div>
    ));
  };

  return (
    <div
      id="sample-questions-section"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-gradient-to-tr dark:from-black dark:via-black dark:to-gray-950 text-center pt-20 pb-20 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center">
        <Typography
          variant="h4"
          className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black dark:text-white font-bold mb-6"
        >
          See examples
        </Typography>
        <Typography
          variant="lead"
          className="text-base sm:text-lg md:text-xl font-gloria text-gray-700 dark:text-gray-400 mb-10 max-w-3xl text-center"
        >
          You can see more examples. Select one of the prompts below.
        </Typography>
        <div className="marquee-row row1">
          <div className="marquee-content">
            {renderMarqueeItems(duplicateContent(row1Content))}
          </div>
        </div>
        <div className="marquee-row row2 mt-2">
          <div className="marquee-content">
            {renderMarqueeItems(duplicateContent(row2Content))}
          </div>
        </div>
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
