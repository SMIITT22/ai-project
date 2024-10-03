import { Typography, Button } from "@material-tailwind/react";
import { BsStars } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const HeroSection = ({ scrollToQuestions }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-8 bg-white text-center -mt-8"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundColor: "#ffffff",
      }}
    >
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
    </div>
  );
};

export default HeroSection;
