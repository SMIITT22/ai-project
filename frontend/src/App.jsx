import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import PromptExamples from "./components/PromptsExample/PromptExamples";
import SuggesionFlow from "./components/SuggesionFlow/SuggesionFlow";
import QuestionsSection from "./components/QuestionsSection/QuestionsSection";
import Footer from "./components/Footer/Footer";
import Login from "./auth/Login/Login";
import SignUp from "./auth/Signup/Signup";
import GenerateQuestions from "./components/ProfileMenuItems/GenrateQuestionsPage/GenrateQuestions";
import Pricing from "./components/ProfileMenuItems/Pricing/Pricing";
import Settings from "./components/ProfileMenuItems/Settings/Settings";
import Support from "./components/ProfileMenuItems/Support/Support";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserStatus } from "./auth/authSlice";

const App = () => {
  const scrollToSampleQuestions = () => {
    const section = document.getElementById("sample-questions-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserStatus());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection scrollToQuestions={scrollToSampleQuestions} />
              <PromptExamples />
              <SuggesionFlow />
              <QuestionsSection />
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
          path="/generate-questions"
          element={
            <PrivateRoute>
              <GenerateQuestions />
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
          path="/settings"
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
      <Footer />
    </>
  );
};

export default App;
