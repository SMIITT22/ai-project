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
    <div
      className="flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-8 bg-white"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundColor: "#ffffff",
      }}
    >
      {isAuthenticated ? (
        <HeroSectionUser />
      ) : (
        <HeroSectionGuest scrollToQuestions={scrollToQuestions} />
      )}
    </div>
  );
};

export default HeroSection;
