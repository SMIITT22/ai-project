import Divider from "./Divider";

const ProfileMenuScreensHeader = ({ heading, subHeading }) => {
  return (
    <div>
      <Divider />
      <header className="bg-gray-200 dark:bg-gray-800 py-6 transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out">
            {heading}
          </h1>
          {subHeading && (
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-md lg:text-lg mt-1 font-poppins transition-colors duration-300 ease-in-out">
              {subHeading}
            </p>
          )}
        </div>
      </header>
      <Divider />
    </div>
  );
};

export default ProfileMenuScreensHeader;
