import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSettings = () => {
  // Initialize theme based on local storage or default to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme on mount and whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div>
      <h2 className="font-semibold text-xl mb-2">Theme Settings</h2>
      <p className="mb-4">
        Switch between light and dark mode to customize the app’s appearance.
      </p>

      {/* Dark Mode Toggle */}
      <div className="flex items-center mb-6">
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <div
            className={`w-11 h-6 rounded-full transition-colors ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
              isDarkMode ? "transform translate-x-6" : "translate-x-1"
            }`}
          ></div>
        </label>
        <span className="ml-2 font-semibold text-gray-700 dark:text-gray-300">
          {isDarkMode ? "Dark Mode Active" : "Light Mode Active"}
        </span>
      </div>
    </div>
  );
};

export default ThemeSettings;
