import { useState, useEffect } from "react";
import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";
import GenerationBox from "./parts/GenerationBox";
import NoGenerations from "./parts/NoGenerations";

const Generations = () => {
  const [generatedSets, setGeneratedSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGeneratedSets([
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
        {
          id: 1,
          heading: "Math Test",
          date: "2024-10-23",
          time: "14:30",
          numberOfQuestions: 20,
          prompt: "Generate a set of math questions",
          format: "Multiple Choice",
        },
        {
          id: 2,
          heading: "Science Quiz",
          date: "2024-10-22",
          time: "09:00",
          numberOfQuestions: 15,
          prompt: "Generate science quiz for class 8",
          format: "Short Answer",
        },
      ]);
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <ProfileMenuScreensHeader
        heading="Generations"
        subHeading="See your generated question sets"
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <GenerationBox key={index} isLoading />
            ))}
          </div>
        ) : generatedSets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedSets.map((set) => (
              <GenerationBox key={set.id} generation={set} />
            ))}
          </div>
        ) : (
          <NoGenerations />
        )}
      </div>
    </div>
  );
};

export default Generations;
