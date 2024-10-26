import { Typography, Button } from "@material-tailwind/react";
import { BsStars } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeroSectionGuest = ({ scrollToQuestions }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10">
      <Typography
        variant="h1"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins text-black dark:text-white font-bold mb-5 text-center"
      >
        Generate Custom Question Sets Instantly with AI!
      </Typography>
      <Typography
        variant="lead"
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-gloria text-gray-700 dark:text-gray-300 mb-8 max-w-3xl text-center"
      >
        For teachers creating exams or students practicing, our AI generates
        personalized questions for any subject. Download your questions
        instantly as a PDF!
      </Typography>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-screen-lg justify-center">
        <Button
          variant="outlined"
          size="lg"
          className="transition-transform text-black dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-700 font-poppins flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto md:min-w-[250px] lg:min-w-[300px] py-3"
          onClick={scrollToQuestions}
        >
          Explore Prompts
          <BsStars size={24} />
        </Button>
        <Button
          variant="gradient"
          color="black"
          size="lg"
          className="transition-transform text-white dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-700 font-poppins flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto md:min-w-[250px] lg:min-w-[300px] py-3"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
          <IoIosLock size={24} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSectionGuest;
