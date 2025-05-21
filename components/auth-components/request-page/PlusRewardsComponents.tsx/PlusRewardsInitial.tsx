'use client';

// Images
import { ImagePlusRewards } from '../ImagePlusRewards';

// Hooks
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Actions
import { getDiscounts } from '@/actions/discounts/discounts.action';
import { getUserStarsAndAmount } from '@/actions/userStarsAndAmount/userStarsAndAmount.action';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

// Components
import VerifyAccount from './VerifyAccount';
import PopUpSessionExpire from './PopUpSessionExpire';
import WelcomeReward from './WelcomeReward';
import UserVerifiedWithoutTransactions from './UserVerifiedWithoutTransactions';
import HasGanadoDiezDolares from './HasGanadoDiezDolares';
import AmountTransactions from '../AmountTransactions';
import UncompleteRewardText from './UncompleteRewardText';

interface IStarsAndAmount {
  data: {
    quantity: string;
    stars: string;
  };
}

export default function PlusRewardInitial() {
  const { data: session, status } = useSession();

  const [discounts, setDiscounts] = useState<IDiscountsObject | null>(null);
  const [stars, setStars] = useState<number>(0);
  // Cantidad de dinero en total por las transacciones
  const [amountTransactions, setAmountTransactions] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      if (!session?.accessToken) return;

      try {
        const discountsData = await getDiscounts(session.accessToken);
        setDiscounts(discountsData);
      } catch (error) {
        console.error(error);
      }

      try {
        const starsAndAmountData: IStarsAndAmount = await getUserStarsAndAmount(session.accessToken);
        setStars(Number(starsAndAmountData.data.stars));
        setAmountTransactions(Number(starsAndAmountData.data.quantity));
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [session]);

  // Pantalla de carga mientras se obtiene la session
  if (status === 'loading') {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  // Session expirada
  // TODO: mostrar el popup, a los 5seg se hace un logout, cuando sale del popup tambien, o si acepta con un boton
  // ! No se probó la funcionalidad del popup
  if (!session || !session.accessToken) {
    return <PopUpSessionExpire />;
  }

  console.log(session, discounts);

  const isUserVerified: null | true = session?.user.userVerification;

  // Los descuentos vienen con un campo is_used, pero la api solo devuelve aquellos descuentos que no han sido usados
  const userHave3Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '3');
  const userHave5Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '5');

  // Evaluar si requisitos para el premio
  const haveEnoughStars: boolean = stars >= 5;
  const haveEnoughAmount: boolean = amountTransactions >= 500;

  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="mx-auto flex w-full max-w-md flex-col justify-center rounded-lg p-6 font-light text-lightText dark:text-custom-whiteD xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs-phone:mb-8 lg:justify-between">
          <div className="ml-24 xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>

          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>

            {session?.user.id ? (
              <h2 className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
                {session.user.id.toUpperCase()}
              </h2>
            ) : (
              // Loader mientras carga el id del usuario
              <div className="ml-auto mt-2 flex h-4 w-[70%] animate-pulse overflow-hidden rounded-full bg-gray-300 p-3 md:h-8"></div>
            )}
          </article>
        </article>

        {
          // Revisar si el usuario NO está verificado y si tiene descuentos
          !isUserVerified ? (
            userHave3Discount ? (
              // CASE: Usuario no verificado con descuento de 3USD
              <div className="flex w-[388px] flex-col items-center gap-[19px]">
                <WelcomeReward />
                <VerifyAccount />
              </div>
            ) : (
              // CASE: Usuario no verificado y sin descuentos
              <VerifyAccount />
            )
          ) : // Revisar si el usuario tiene descuentos
          userHave3Discount || userHave5Discount ? (
            // CASE: Usuario verificado con alguno de los descuentos (3USD y 5USD)
            <div className="flex w-[388px] flex-col items-center gap-9">
              <UserVerifiedWithoutTransactions userHave3Discount={userHave3Discount} />
              <AmountTransactions amountTotal={0} totalTransactions={0} />
            </div>
          ) : // TODO: Revisar si tiene las transacciones y estrellas requeridas para el premio
          haveEnoughStars && haveEnoughAmount ? (
            // CASE: Usuario verificado, sin descuentos y con transacciones y estrellas requeridas para el premio
            <HasGanadoDiezDolares />
          ) : (
            // CASE: Usuario verificado, sin descuentos y con transacciones o estrellas menores a las requeridas para el premio
            <div className="flex w-[388px] flex-col items-center gap-9">
              <UncompleteRewardText stars={stars} quantity={amountTransactions} />
              <AmountTransactions amountTotal={amountTransactions} totalTransactions={stars} />
            </div>
          )
        }
      </section>
    </section>
  );
}
