const NoGenerations = () => (
  <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-100 rounded-lg border border-gray-200">
    <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-black font-poppins">
      <span role="img" aria-label="info">
        📄
      </span>
    </div>
    <h2 className="text-lg font-semibold text-black mb-2 text-center font-poppins">
      No Question Sets Generated
    </h2>
    <p className="text-sm text-gray-600 text-center font-poppins">
      Start by generating your first set of questions to see them listed here.
    </p>
  </div>
);

export default NoGenerations;
