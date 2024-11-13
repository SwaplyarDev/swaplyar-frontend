import React from 'react';

interface WarningIconProps {
  isDark: boolean;
}

const WarningIcon: React.FC<WarningIconProps> = ({ isDark }) => {
  return (
    <div className="relative h-0 w-0 border-b-[120px] border-l-[90px] border-r-[90px] border-b-red-500 border-l-transparent border-r-transparent">
      <div
        className={`absolute left-[-62px] top-[25px] h-0 w-0 border-b-[82px] border-l-[62px] border-r-[62px] 
          ${isDark ? 'border-b-gray-600' : 'border-b-white'} border-l-transparent border-r-transparent`}
      >
        <span className="absolute left-[-16px] top-[-3px] text-8xl text-yellow-200 font-playfair">
          !
        </span>
      </div>
    </div>
  );
};

export default WarningIcon;
