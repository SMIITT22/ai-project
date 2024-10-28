const SkeletonLoader = () => (
  <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 mb-8 px-4">
    {/* Navbar Skeleton with Border */}
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 animate-pulse">
      <div className="sticky top-0 p-3 sm:p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          {/* Simulated edit button */}
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          {/* Simulated time display */}
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          {/* Simulated info button */}
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-700"
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
