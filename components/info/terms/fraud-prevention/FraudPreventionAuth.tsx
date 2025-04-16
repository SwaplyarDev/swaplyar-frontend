'use client';
import FraudDesktop from './desktop/FrausDesktop';
import FraudMobile from './mobile/FraudMobile';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useState } from 'react';

const FraudPreventionAuth = () => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = (key: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTextIndex(key);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="flex w-full flex-col items-center gap-10 pb-16 pt-16">
      <AnimatedBlurredCircles tope="top-[40px]" />
      <h1 className="self-center text-center text-4xl font-medium">Concientización sobre el fraude</h1>

      <section className="flex min-h-[100vh] w-[80%] max-w-[60.375rem] flex-col gap-2 lg:flex-row lg:gap-20">
        <FraudMobile
          isAnimating={isAnimating}
          selectedTextIndex={selectedTextIndex}
          handleButtonClick={handleButtonClick}
        />

        <FraudDesktop
          isAnimating={isAnimating}
          selectedTextIndex={selectedTextIndex}
          handleButtonClick={handleButtonClick}
        />
      </section>
    </section>
  );
};

export default FraudPreventionAuth;
