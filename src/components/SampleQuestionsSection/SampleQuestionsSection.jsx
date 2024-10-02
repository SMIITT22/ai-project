import { Typography } from "@material-tailwind/react";
import { chemisteryGIF, physicsGIF, bioGIF, neetGIF } from "../../assets/index";

const SampleQuestionsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 bg-white text-center lg:pt-20 pb-10">
      <Typography
        variant="h2"
        className="text-2xl sm:text-3xl md:text-4xl font-poppins text-black font-bold mb-6"
      >
        Explore AI-Generated NEET Questions
      </Typography>
      <Typography
        variant="lead"
        className="text-base sm:text-lg md:text-xl font-gloria text-gray-700 mb-10 max-w-3xl"
      >
        Get a sneak peek of AI-generated NEET questions for Chemistry, Physics,
        and Biology. Start preparing for your exam with sample questions
        designed to help you excel.
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="flex flex-col items-center">
          <img
            src={chemisteryGIF}
            alt="View Chemistry Questions"
            className="w-24 h-24 object-contain mb-4"
          />
          <a href="/chemistry-questions" className="group">
            <Typography
              variant="h6"
              className="font-poppins text-black underline hover:no-underline group-hover:text-green-500"
              style={{
                textDecorationThickness: "1.5px",
                textUnderlineOffset: "3px",
              }}
            >
              Chemistry Questions
            </Typography>
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={physicsGIF}
            alt="View Physics Questions"
            className="w-24 h-24 object-contain mb-4"
          />
          <a href="/physics-questions" className="group">
            <Typography
              variant="h6"
              className="font-poppins text-black underline hover:no-underline group-hover:text-green-500"
              style={{
                textDecorationThickness: "1.5px",
                textUnderlineOffset: "3px",
              }}
            >
              Physics Questions
            </Typography>
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={bioGIF}
            alt="View Biology Questions"
            className="w-24 h-24 object-contain mb-4"
          />
          <a href="/biology-questions" className="group">
            <Typography
              variant="h6"
              className="font-poppins text-black underline hover:no-underline group-hover:text-green-500"
              style={{
                textDecorationThickness: "1.5px",
                textUnderlineOffset: "3px",
              }}
            >
              Biology Questions
            </Typography>
          </a>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={neetGIF}
            alt="View NEET Paper"
            className="w-24 h-24 object-contain mb-4"
          />
          <a href="/full-neet-paper" className="group">
            <Typography
              variant="h6"
              className="font-poppins text-black underline hover:no-underline group-hover:text-green-500"
              style={{
                textDecorationThickness: "1.5px",
                textUnderlineOffset: "3px",
              }}
            >
              Full NEET Paper
            </Typography>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SampleQuestionsSection;
