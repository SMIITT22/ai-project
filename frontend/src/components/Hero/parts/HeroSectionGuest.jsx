import { Typography, Button } from "@material-tailwind/react";
import { BsStars } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeroSectionGuest = ({ scrollToQuestions }) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h1"
        className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins text-black font-bold mb-10"
      >
        Generate Custom Question Sets Instantly with AI!
      </Typography>
      <Typography
        variant="lead"
        className="text-base sm:text-lg md:text-xl lg:text-2xl font-gloria text-gray-700 mb-10 max-w-3xl"
      >
        For teachers creating exams or students practicing, our AI generates
        personalized questions for any subject. Download your questions
        instantly as a PDF!
      </Typography>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outlined"
          size="lg"
          className="transition-transform text-black bg-gray-300 border-gray-400 font-poppins flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto md:min-w-[300px]"
          onClick={scrollToQuestions}
        >
          Explore Prompts
          <BsStars size={24} />
        </Button>
        <Button
          variant="gradient"
          color="green"
          size="lg"
          className="transition-transform text-white font-poppins flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto md:min-w-[300px]"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
          <IoIosLock size={24} />
        </Button>
      </div>
    </>
  );
};

export default HeroSectionGuest;
