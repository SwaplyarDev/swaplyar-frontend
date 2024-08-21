// components/skeleton/SkeletonLogin.tsx

import React from 'react';

const SkeletonLogin = () => {
  return (
    <div className="loader loaderLogin flex flex-col bg-white p-8 dark:bg-gray-800">
      <div className="wrapper">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-4"></div>
        <div className="line-5"></div>
        <div className="line-6"></div>
      </div>
    </div>
  );
};

export default SkeletonLogin;
