'use client';
import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';
import PlusRewardSection from './PlusRewardsComponents.tsx/PlusRewardsInitial';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

const RequestPage = () => {
  return (
    <div className="mx-auto mt-24 flex w-full max-w-[1000px] flex-col gap-4 p-6 sm:my-6 lg:flex-row-reverse">
      <PlusRewardSection />
      <TransactionCalculator />
    </div>
  );
};

export default RequestPage;
