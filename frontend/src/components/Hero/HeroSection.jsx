import { useSelector } from "react-redux";
import HeroSectionUser from "./parts/HeroSectionUser";
import HeroSectionGuest from "./parts/HeroSectionGuest";
import LoadingScreen from "../../common/LoadingScreen";
import { selectIsAuthenticated, selectLoading } from "../../auth/authSlice";

const HeroSection = ({ scrollToQuestions }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <div className="min-h-[90vh] w-full transition-colors duration-300">
      {isAuthenticated ? (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-950  min-h-[90vh] px-4 md:px-8">
          <HeroSectionUser />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-950 min-h-[90vh] px-4 md:px-8">
          <HeroSectionGuest scrollToQuestions={scrollToQuestions} />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
