import { Typography, Button } from "@material-tailwind/react";

const SampleQuestionsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 bg-white text-center lg:pt-20">
      <Typography
        variant="h2"
        className="text-2xl sm:text-3xl md:text-4xl font-gloria text-black font-bold mb-6"
      >
        Explore Sample AI-Generated NEET Questions
      </Typography>

      <Typography
        variant="lead"
        className="text-base sm:text-lg md:text-xl font-poppins text-black mb-10 max-w-3xl"
      >
        Take a look at sample AI-generated NEET questions for Chemistry,
        Physics, and Biology. These examples give you a glimpse of the question
        types you’ll be working with when you generate full exam papers.
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4">
        <Button
          variant="outlined"
          size="lg"
          className="text-black border-gray-400 font-poppins"
        >
          View Chemistry Questions
        </Button>

        <Button
          variant="outlined"
          size="lg"
          className="text-black border-gray-400 font-poppins"
        >
          View Physics Questions
        </Button>

        <Button
          variant="outlined"
          size="lg"
          className="text-black border-gray-400 font-poppins"
        >
          View Biology Questions
        </Button>

        <Button
          variant="gradient"
          color="green"
          size="lg"
          className="text-white font-poppins"
        >
          Preview Full NEET Paper
        </Button>
      </div>
    </div>
  );
};

export default SampleQuestionsSection;
