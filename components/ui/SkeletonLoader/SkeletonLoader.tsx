import React from 'react';

const SkeletonLoader = () => (
  <div className="w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
    <div className="h-40 w-full bg-gray-300"></div>
    <div className="space-y-3 p-4">
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      <div className="mt-4 h-4 w-2/3 rounded bg-gray-300"></div>
    </div>
  </div>
);
export default SkeletonLoader;
