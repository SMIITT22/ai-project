import { useSelector } from "react-redux";
import { useState } from "react";
import Heading from "./HeroSectionUserParts/Heading";
import InputSection from "./HeroSectionUserParts/InputSection";
import GeneratedOutput from "./HeroSectionUserParts/GeneratedOutput";
import Notification from "../../../common/Notification";
import {
  selectQuestions,
  selectLoading,
  selectError,
} from "../redux/questionsSlice";

const HeroSectionUser = () => {
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
      <Heading currentPhrase={"Generate Your Custom Questions!"} />
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <InputSection setNotification={setNotification} />
      <div className="mt-6">
        <GeneratedOutput
          loading={loading}
          questions={questions}
          error={error}
          setNotification={setNotification}
        />
      </div>
    </div>
  );
};

export default HeroSectionUser;
