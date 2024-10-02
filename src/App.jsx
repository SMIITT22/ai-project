import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import SampleQuestionsSection from "./components/SampleQuestionsSection/SampleQuestionsSection";
import QuestionsSection from "./components/QuestionsSection/QuestionsSection";
import Footer from "./components/Footer/Footer";
import Login from "./auth/Login/Login";
import SignUp from "./auth/Signup/Signup";

const App = () => {
  return (
    <>
      {/* Always render the Header */}
      <Header />

      {/* Define the app routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <SampleQuestionsSection />
              <QuestionsSection />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* Render Footer on all routes */}
      <Footer />
    </>
  );
};

export default App;
