import { PiSpinnerBold } from "react-icons/pi";

const SkeletonLoader = () => (
  <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 px-4">
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 h-[600px] flex items-center justify-center">
      <PiSpinnerBold className="text-gray-600 dark:text-gray-300 animate-spin text-4xl" />
    </div>
  </div>
);

export default SkeletonLoader;
