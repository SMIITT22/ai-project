import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";
import { useState, useEffect } from "react";
import ProfileSettings from "./SettingsPart/ProfileSettings";
import BillingSettings from "./SettingsPart/BillingSettings";
import ThemeSettings from "./SettingsPart/ThemeSettings";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active tab based on the URL path
  const getActiveTab = () => {
    if (location.pathname.endsWith("/billing")) return "billing";
    if (location.pathname.endsWith("/theme")) return "theme";
    return "profile";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab);

  // Update the active tab whenever the path changes
  useEffect(() => {
    setActiveTab(getActiveTab);
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/settings/${tab}`);
  };

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-100 ease-in-out">
      <ProfileMenuScreensHeader
        heading="Settings"
        subHeading="Manage and customize your application preferences."
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 p-4">
        <div className="flex flex-col md:flex-row mt-4">
          <div className="flex md:flex-col md:w-1/4 md:pr-4 md:border-r border-gray-200 dark:border-gray-800 transition-colors duration-100 ease-in-out">
            <button
              onClick={() => handleTabChange("profile")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "profile" ? "bg-gray-200 dark:bg-gray-800" : ""
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange("billing")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "billing" ? "bg-gray-200 dark:bg-gray-800" : ""
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => handleTabChange("theme")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "theme" ? "bg-gray-200 dark:bg-gray-800" : ""
              }`}
            >
              Theme
            </button>
          </div>

          {/* Right Content Area with Nested Routes */}
          <div className="w-full md:w-3/4 p-4 md:p-6 md:pl-6 mt-4 md:mt-0 bg-white dark:bg-gray-900 rounded-md transition-colors duration-100 ease-in-out">
            <Routes>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="billing" element={<BillingSettings />} />
              <Route path="theme" element={<ThemeSettings />} />
              {/* Redirect /settings to /settings/profile by default */}
              <Route path="" element={<Navigate to="profile" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
