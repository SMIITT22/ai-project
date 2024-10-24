import Divider from "./Divider";

const ProfileMenuScreensHeader = ({ heading, subHeading }) => {
  return (
    <div>
      <Divider />
      <header className="bg-gray-200 py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poppins">
            {heading}
          </h1>
          {subHeading && (
            <p className="text-gray-600 text-sm md:text-md lg:text-lg mt-1 font-poppins">
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
