import React from 'react';
import { EB_Garamond } from 'next/font/google';
import { AlertsProps } from '@/types/repentance/repentance';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
const WarningIcon: React.FC<AlertsProps> = ({ isDark }) => {
  return (
    <div className='flex flex-col items-center pt-1 mb-9'>
    <div className="relative h-0 w-0 border-b-[153px] border-l-[98px] border-r-[98px] border-b-red-500 border-l-transparent border-r-transparent">
      <div
        className={`absolute left-[-75px] top-[25px] h-0 w-0 border-b-[115px] border-l-[75px] border-r-[75px] 
          ${isDark ? 'border-b-[#454545]' : 'border-b-white'} border-l-transparent border-r-transparent`}
      >
        <span className={`absolute left-[-16px] top-[-3px] text-9xl text-yellow-200 ${ebGaramond.className}`}>
          !
        </span>
      </div>
    </div>
    </div>
  );
};

export default WarningIcon;
