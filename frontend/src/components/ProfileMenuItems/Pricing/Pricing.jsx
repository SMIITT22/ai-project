import ProfileMenuScreensHeader from "../../../common/ProfileMenuScreensHeader";

const Pricing = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-100 ease-in-out">
      <ProfileMenuScreensHeader
        heading="Pricing"
        subHeading="Explore our plans and find the best option for your needs."
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 p-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">Content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
