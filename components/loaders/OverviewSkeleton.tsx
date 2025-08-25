const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 h-32 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-10 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="w-3/5 h-7 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="w-2/5 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Monthly Usage Chart */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4 sm:p-6 h-72 sm:h-80"></div>

      {/* Activity Log */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-36 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex space-x-2">
            <div className="w-7 h-7 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-7 h-7 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="grid grid-cols-4 gap-4 bg-gray-300 dark:bg-gray-600 rounded-lg p-3"
            >
              <div className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;