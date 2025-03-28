'use client';
import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';
import PlusRewardSection from './PlusRewardsComponents.tsx/PlusRewardsInitial';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

const RequestPage = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <AnimatedBlurredCircles tope="top-[200]" />
      <PlusRewardSection />
      <TransactionCalculator />
    </div>
  );
};

export default RequestPage;
