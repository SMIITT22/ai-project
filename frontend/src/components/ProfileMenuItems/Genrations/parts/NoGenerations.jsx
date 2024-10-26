const NoGenerations = () => (
  <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300 ease-in-out">
    <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-black dark:text-gray-100 font-poppins">
      <span role="img" aria-label="info">
        📄
      </span>
    </div>
    <h2 className="text-lg font-semibold text-black dark:text-gray-100 mb-2 text-center font-poppins">
      No Question Sets Generated
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-poppins">
      Start by generating your first set of questions to see them listed here.
    </p>
  </div>
);

export default NoGenerations;
