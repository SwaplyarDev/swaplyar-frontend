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
  //session en request page
  console.log('🟩 Session en RequestPage:', session);
  let discountsData: AdminDiscountsResponse = { data: [] };
  let starsData: UserStarsAndAmount = { data: { quantity: 0, stars: 0 } };
  let errors: string[] = [];

  if (!session || !session.accessToken) {
    errors.push('No se ha podido obtener el usuario.');
  } else {
    try {
      discountsData = await getDiscounts(session.accessToken);
      starsData = await getUserStarsAndAmount(session.accessToken);
      console.log('🟦 Server discounts: en request page', discountsData);
      console.log('🟨 Server stars/amount en request page:', starsData);
      console.log('--- Datos de descuentos recibidos en RequestPage:', JSON.stringify(discountsData, null, 2));
    } catch (error) {
      console.log('🟥 Error en RequestPage:', error);
      const errorMessage = 'No se han podido obtener los descuentos del usuario';
      errors.push(errorMessage);
    }
  }

  return (
    <div className="mx-auto mb-20 max-h-[1680px] w-full max-w-[1200px] p-6 xs:mb-0 sm:my-6">
      <h1 className="mb-6 pt-10 text-[34px] font-bold text-gray-800 dark:text-darkText xs:mb-8">
        Envía y recibe dinero de billeteras virtuales y criptomonedas
      </h1>
      <section className="flex flex-col gap-6 lg:flex-row-reverse">
        <Suspense
          fallback={
            <div className="flex h-[331px] w-full animate-pulse items-center justify-center rounded-2xl bg-gray-200 dark:bg-custom-grayD-700 lg:h-[623px]"></div>
          }
        >
          <PlusRewardInitial
            discounts={discountsData}
            // errors={errors}
            userId={session?.user.id ?? ''}
            userVerification={session?.user.userValidated ? true : null}
            accessToken={session?.accessToken ?? ''}
          />
        </Suspense>
        {/* // TODO: Se le deben pasar los errores (si existen) */}
        <TransactionCalculatorInternal discounts={discountsData} stars={starsData} errors={errors} />
      </section>
    </div>
  );
}
