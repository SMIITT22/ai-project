import { useState } from "react";
import Heading from "./HeroSectionUserParts/Heading";
import InputSection from "./HeroSectionUserParts/InputSection";
import GeneratedOutput from "./HeroSectionUserParts/GeneratedOutput";

// Main Component
const HeroSectionUser = () => {
  const [loading, setLoading] = useState(false);
  const [isGeneratedVisible, setIsGeneratedVisible] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setIsGeneratedVisible(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
      <Heading currentPhrase={"Generate Your Custom Questions!"} />
      <InputSection onGenerate={handleGenerate} />
      {isGeneratedVisible && <GeneratedOutput loading={loading} />}
    </div>
  );
};

export default HeroSectionUser;
