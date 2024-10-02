import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import SampleQuestionsSection from "./components/SampleQuestionsSection/SampleQuestionsSection";
import QuestionsSection from "./components/QuestionsSection/QuestionsSection";
import Footer from "./components/Footer/Footer";
import Login from "./auth/Login/Login";
import SignUp from "./auth/Signup/Signup";

const App = () => {
  const scrollToSampleQuestions = () => {
    const section = document.getElementById("sample-questions-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection scrollToQuestions={scrollToSampleQuestions} />
              <SampleQuestionsSection />
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
