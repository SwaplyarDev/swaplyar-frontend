import React from 'react';

const SkeletonQuestions = () => (
  <div className="grid max-w-[716px] animate-pulse gap-6 max-lg:mx-10">
    {Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="h-12 w-full animate-pulse rounded-lg bg-gray-300"></div>
    ))}
  </div>
);

export default SkeletonQuestions;
