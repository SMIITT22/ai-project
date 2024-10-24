import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionMetadata } from "../../ProfileMenuItems/Genrations/redux/questionsMetaDataSlice";
import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";
import GenerationBox from "./parts/GenerationBox";
import NoGenerations from "./parts/NoGenerations";

const Generations = () => {
  const dispatch = useDispatch();

  const {
    data: generatedSets,
    loading: isLoading,
    error,
  } = useSelector((state) => state.metadata);

  useEffect(() => {
    dispatch(fetchQuestionMetadata());
  }, [dispatch]);

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
        ) : error ? (
          <p className="text-red-500">
            {typeof error === "object" && error !== null
              ? error.detail || "An unknown error occurred."
              : error}
          </p>
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
