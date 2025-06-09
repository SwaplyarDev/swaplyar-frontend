import auth from '@/auth';

// Actions
import { getDiscounts } from '@/actions/Discounts/discounts.action';

// Components
import InternalTransactionCalculator from './InternalTransactionCalculator/InternalTransactionCalculator';
import PlusRewardsInitial from './PlusRewardsComponents.tsx/PlusRewardsInitial';
import { Suspense } from 'react';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

export default async function RequestPage() {
  const session = await auth();

  let discountsData: IDiscountsObject | null = null;
  let errors: string[] = [];

  if (!session || !session.accessToken) {
    errors.push('No se ha podido obtener el usuario.');
  } else {
    try {
      discountsData = await getDiscounts(session.accessToken);
    } catch (error) {
      console.log(error);
      const errorMessage = 'No se han podido obtener los descuentos del usuario';
      errors.push(errorMessage);
    }
  }

  return (
    <div className="mx-auto mb-24 w-full max-w-[1000px] p-6 xs:mb-0 sm:my-6">
      <h1 className="mb-6 text-4xl font-medium xs:mb-10">
        Envía y recibe dinero de billeteras virtuales y criptomonedas
      </h1>
      <section className="flex flex-col gap-4 lg:flex-row-reverse">
        <Suspense
          fallback={
            <div className="flex h-[331px] w-full animate-pulse items-center justify-center rounded-2xl bg-gray-200 dark:bg-custom-grayD-700 lg:h-[623px]"></div>
          }
        >
          <PlusRewardsInitial
            discounts={discountsData}
            errors={errors}
            userId={session?.user.id}
            userVerification={session?.user.userVerification}
            accessToken={session?.accessToken}
          />
        </Suspense>
        {/* // TODO: Se le deben pasar los errores (si existen) */}
        <InternalTransactionCalculator />
      </section>
    </div>
  );
}
