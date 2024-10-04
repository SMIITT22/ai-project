import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import PromptExamples from "./components/PromptsExample/PromptExamples";
import SuggesionFlow from "./components/SuggesionFlow/SuggesionFlow";
import QuestionsSection from "./components/QuestionsSection/QuestionsSection";
import Footer from "./components/Footer/Footer";
import Login from "./auth/Login/Login";
import SignUp from "./auth/Signup/Signup";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
