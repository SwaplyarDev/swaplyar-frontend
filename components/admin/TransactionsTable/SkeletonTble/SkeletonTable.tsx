const SkeletonTable = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#012a8d] text-left text-white">
              <tr>
                <th className="px-4 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-14 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-8 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="w-22 h-4 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/20"></div>
                </th>
                <th className="px-4 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/20"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Array.from({ length: 12 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="mr-1 h-4 w-4 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600"></div>
                      <div className="h-5 w-20 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="h-8 w-64 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
