import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';
import PlusRewardSection from './PlusRewardsComponents.tsx/PlusRewardsInitial';

const RequestPage = () => {
  return (
    <div className="mx-auto mb-24 flex w-full max-w-[1000px] flex-col gap-4 p-6 xs:mb-0 sm:my-6 lg:flex-row-reverse">
      <PlusRewardSection />
      <TransactionCalculator />
    </div>
  );
};

export default RequestPage;
