// components/skeleton/SkeletonLogin.tsx

import React from 'react';

const SkeletonLogin = () => {
  return (
    <div className="loader loaderLogin flex flex-col bg-[#e6e8ef62] p-8 dark:bg-calculatorDark">
      <div className="wrapper">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-2"></div>
        <div className="line-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLogin;
