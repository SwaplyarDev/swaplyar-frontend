// StepIndicator.tsx
import Tick from '@/components/ui/Tick/Tick';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: boolean[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, completedSteps }) => {
  const { isDark } = useDarkTheme();
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        currentStep === 1 ? 'sm:absolute' : 'relative sm:absolute md-tablet:relative',
      )}
    >
      {completedSteps.map((completed, index) => (
        <React.Fragment key={index}>
          {index < currentStep ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick color={isDark ? '#414244' : '#FCFBFA'} />
            </div>
          ) : (
            <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
          )}
          {index < completedSteps.length - 1 && <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
