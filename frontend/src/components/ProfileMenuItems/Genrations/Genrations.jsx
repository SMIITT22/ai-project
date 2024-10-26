import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionMetadata } from "../../ProfileMenuItems/Genrations/redux/questionsMetaDataSlice";
import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";
import GenerationBox from "./parts/GenerationBox";
import NoGenerations from "./parts/NoGenerations";
import Notification from "../../../common/Notification";

const Generations = () => {
  const dispatch = useDispatch();

  const {
    data: generatedSets,
    loading: isLoading,
    error,
  } = useSelector((state) => state.metadata);

  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });

  useEffect(() => {
    dispatch(fetchQuestionMetadata());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setNotification({
        message:
          typeof error === "object" && error !== null
            ? error.detail || "An unknown error occurred."
            : error,
        visible: true,
      });
    }
  }, [error]);

  const handleCloseNotification = () => {
    setNotification({ message: "", visible: false });
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300 ease-in-out">
        <ProfileMenuScreensHeader
          heading="Generations"
          subHeading="See your generated question sets"
        />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <GenerationBox key={index} isLoading />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300 ease-in-out">
      <ProfileMenuScreensHeader
        heading="Generations"
        subHeading="See your generated question sets"
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 p-4">
        {generatedSets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedSets.map((set) => (
              <GenerationBox key={set.id} generation={set} />
            ))}
          </div>
        ) : (
          <NoGenerations />
        )}
      </div>

      {notification.visible && (
        <Notification
          message={notification.message}
          onClose={handleCloseNotification}
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />
      )}
    </div>
  );
};

export default Generations;
