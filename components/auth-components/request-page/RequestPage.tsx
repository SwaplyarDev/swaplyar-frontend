import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';
import PlusRewardSection from './PlusRewardsComponents.tsx/PlusRewardsInitial';

const RequestPage = () => {
  return (
    <div className="mx-auto mb-24 w-full max-w-[1000px] p-6 xs:mb-0 sm:my-6">
      <h1 className="mb-6 text-4xl font-medium xs:mb-10">
        Envía y recibe dinero de billeteras virtuales y criptomonedas
      </h1>
      <section className="flex flex-col gap-4 lg:flex-row-reverse">
        <PlusRewardSection />
        <TransactionCalculator />
      </section>
    </div>
  );
};

export default RequestPage;
