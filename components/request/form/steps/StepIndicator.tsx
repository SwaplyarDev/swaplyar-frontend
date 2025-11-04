// StepIndicator.tsx
import Tick from '@/components/ui/Tick/Tick';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: boolean[];
  className: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, completedSteps, className }) => {
  const { isDark } = useDarkTheme();
  return (
    <div
      className={clsx(
        'flex items-center justify-end mb-1.5',
      )}
    >
      {completedSteps.map((completed, index) => (
        <React.Fragment key={index}>
          {index < currentStep ? (
            <div className="flex h-5 w-5 sm:h-[30px] sm:w-[30px] items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick color={isDark ? '#414244' : '#FCFBFA'} className='h-3 w-3 sm:h-5 sm:w-5' />
            </div>
          ) : (
            <div className={`${className} rounded-full border border-1 ${isDark ? 'border-darkText' : 'border-lightText'}`}></div>
          )}
          {index < completedSteps.length - 1 && <div className="h-[1px] w-6 mx-0.5 bg-lightText dark:bg-darkText"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
