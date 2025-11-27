import auth from '@/auth';
import PlusRewardInitial from './PlusRewardsComponents.tsx/PlusRewardsInitial';
import TransactionCalculatorInternal from '@/components/Transaction/TransactionCalculatorInternal/TransactionCalculatorInternal';
import { IDiscountsObject } from '@/types/discounts/discounts';
import { getDiscounts } from '@/actions/Discounts/discounts.action';
import { Suspense } from 'react';
import { AdminDiscountsResponse, UserStarsAndAmount } from '@/types/discounts/adminDiscounts';
import { star } from '@/utils/assets/imgDatabaseCloudinary';
import { getUserStarsAndAmount } from '@/actions/Discounts/userStarsAndAmount.action';

export default async function RequestPage() {
  const session = await auth();
  let discountsData: AdminDiscountsResponse = { data: [] };
  let starsData: UserStarsAndAmount = { data: { quantity: 0, stars: 0 } };
  let errors: string[] = [];

  if (!session || !session.accessToken) {
    errors.push('No se ha podido obtener el usuario.');
  } else {
    try {
      discountsData = await getDiscounts(session.accessToken);
      starsData = await getUserStarsAndAmount(session.accessToken);
    } catch (error) {
      const errorMessage = 'No se han podido obtener los descuentos del usuario';
      errors.push(errorMessage);
    }
  }

  return (
    <div className="mx-auto mb-20 max-h-[1680px] w-full max-w-[1000px] container-spacing !px-8 lg:!px-0 ">
      <h1 className="text-4xl !text-[40px] mb-10 font-bold text-gray-800 dark:text-darkText">
        Nueva Solicitud
      </h1>
      <section className="flex flex-col gap-6 lg:flex-row">
        {/* // TODO: Se le deben pasar los errores (si existen) */}
        <TransactionCalculatorInternal discounts={discountsData} stars={starsData} errors={errors} />
        <Suspense
          fallback={
            <div className="flex h-[331px] w-full animate-pulse items-center justify-center rounded-2xl bg-gray-200 dark:bg-custom-grayD-700 lg:h-[623px]"></div>
          }
        >
          <PlusRewardInitial
            discounts={discountsData}
            // errors={errors}
            memberCode={session?.user.memberCode ?? ''}
            accessToken={session?.accessToken ?? ''}
          />
        </Suspense>
      </section>
    </div>
  );
}
