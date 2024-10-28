import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import PromptExamples from "./components/PromptsExample/PromptExamples";
import SuggesionFlow from "./components/SuggesionFlow/SuggesionFlow";
import QuestionsSection from "./components/QuestionsSection/QuestionsSection";
import Footer from "./components/Footer/Footer";
import Login from "./auth/Login/Login";
import SignUp from "./auth/Signup/Signup";
import Genrations from "./components/ProfileMenuItems/Genrations/Genrations";
import Pricing from "./components/ProfileMenuItems/Pricing/Pricing";
import Settings from "./components/ProfileMenuItems/Settings/Settings";
import Support from "./components/ProfileMenuItems/Support/Support";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "./auth/authSlice";
import { selectIsAuthenticated, selectLoading } from "./auth/authSlice";
import LoadingScreen from "./common/LoadingScreen";
import { useLocation } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserStatus());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Header />
      <main className="flex-grow pt-14 sm:pt-14 lg:pt-[4.5rem]">
        {loading && <LoadingScreen message="Loading..." />}{" "}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection
                  scrollToQuestions={() => {
                    document
                      .getElementById("sample-questions-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                <PromptExamples />
                {!isAuthenticated && <SuggesionFlow />}
                {!isAuthenticated && <QuestionsSection />}
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/generations"
            element={
              <PrivateRoute>
                <Genrations />
              </PrivateRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/*"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <Support />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
