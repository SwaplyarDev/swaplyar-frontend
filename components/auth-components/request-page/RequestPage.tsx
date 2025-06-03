'use client';

// Hooks
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Actions
import { getDiscounts } from '@/actions/Discounts/discounts.action';

// Components
import InternalTransactionCalculator from './InternalTransactionCalculator/InternalTransactionCalculator';
import PlusRewardSection from './PlusRewardsComponents.tsx/PlusRewardsInitial';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

export default function RequestPage() {
  const { data: session, status } = useSession();

  const [discounts, setDiscounts] = useState<IDiscountsObject | null>(null);

  useEffect(() => {
    async function getData() {
      if (!session?.accessToken) return;

      try {
        const discountsData = await getDiscounts(session.accessToken);
        setDiscounts(discountsData);
      } catch (error) {
        console.error('Error al cargar los descuentos:', error);
      }
    }

    getData();
  }, [session]);

  return (
    <div className="mx-auto mb-24 w-full max-w-[1000px] p-6 xs:mb-0 sm:my-6">
      <h1 className="mb-6 text-4xl font-medium xs:mb-10">
        Envía y recibe dinero de billeteras virtuales y criptomonedas
      </h1>
      <section className="flex flex-col gap-4 lg:flex-row-reverse">
        <PlusRewardSection discounts={discounts} />
        <InternalTransactionCalculator />
      </section>
    </div>
  );
}
