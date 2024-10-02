import { Typography } from "@material-tailwind/react";
import { chemisteryGIF, physicsGIF, bioGIF, neetGIF } from "../../assets/index";

const SampleQuestionsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 bg-white text-center lg:pt-20">
      <Typography
        variant="h2"
        className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black font-bold mb-6"
      >
        Explore AI-Generated NEET Questions
      </Typography>
      <Typography
        variant="lead"
        className="text-base sm:text-lg md:text-xl font-gloria text-black mb-10 max-w-3xl"
      >
        Get a sneak peek of AI-generated NEET questions for Chemistry, Physics,
        and Biology. Start preparing for your exam with sample questions
        designed to help you excel.
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <a
          href="/chemistry-questions"
          className="group flex flex-col items-center"
        >
          <img
            src={chemisteryGIF}
            alt="View Chemistry Questions"
            className="w-24 h-24 object-contain mb-4 transform transition-transform group-hover:scale-105"
          />
          <Typography variant="h6" className="font-poppins text-black">
            Chemistry Questions
          </Typography>
        </a>
        <a
          href="/physics-questions"
          className="group flex flex-col items-center"
        >
          <img
            src={physicsGIF}
            alt="View Physics Questions"
            className="w-24 h-24 object-contain mb-4 transform transition-transform group-hover:scale-105"
          />
          <Typography variant="h6" className="font-poppins text-black">
            Physics Questions
          </Typography>
        </a>
        <a
          href="/biology-questions"
          className="group flex flex-col items-center"
        >
          <img
            src={bioGIF}
            alt="View Biology Questions"
            className="w-24 h-24 object-contain mb-4 transform transition-transform group-hover:scale-105"
          />
          <Typography variant="h6" className="font-poppins text-black">
            Biology Questions
          </Typography>
        </a>
        <a
          href="/full-neet-paper"
          className="group col-span-1 flex flex-col items-center"
        >
          <img
            src={neetGIF}
            alt="View NEET Paper"
            className="w-24 h-24 object-contain mb-4 transform transition-transform group-hover:scale-105"
          />
          <Typography variant="h6" className="font-poppins text-black">
            Full NEET Paper
          </Typography>
        </a>
      </div>
    </div>
  );
};

export default SampleQuestionsSection;
