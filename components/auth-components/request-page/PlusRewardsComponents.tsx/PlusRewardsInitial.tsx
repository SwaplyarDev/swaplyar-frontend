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
import UserWinPlusReward from './UserWinPlusReward';
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

  if (status === 'loading') {
    return (
      <div className="flex h-[331px] w-full animate-pulse items-center justify-center rounded-2xl bg-gray-200 lg:h-[623px]"></div>
    );
  }

  // TODO: mostrar el popup, a los 5seg se hace un logout, cuando sale del popup tambien, o si acepta con un boton
  // ! No se probó la funcionalidad del popup
  if (!session || !session.accessToken) {
    return <PopUpSessionExpire />;
  }

  const isUserVerified: null | true = session?.user.userVerification;

  // Los descuentos vienen con un campo is_used, pero la api solo devuelve aquellos descuentos que no han sido usados
  const userHave3Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '3');
  const userHave5Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '5');

  const haveEnoughStars: boolean = stars >= 5;
  const haveEnoughAmount: boolean = amountTransactions >= 500;

  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="flex w-full flex-col justify-center rounded-lg font-light text-lightText dark:text-custom-whiteD xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs:mx-auto xs:w-[388px] xs-phone:mb-8 lg:justify-between">
          <div className="xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 md:w-full lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>

          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <h2 className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              {session.user.id.toUpperCase()}
            </h2>
          </article>
        </article>

        {!isUserVerified ? (
          userHave3Discount ? (
            <div className="flex w-full flex-col items-center gap-[19px]">
              <WelcomeReward />
              <VerifyAccount />
            </div>
          ) : (
            <VerifyAccount />
          )
        ) : userHave5Discount ? (
          <div className="flex w-full flex-col items-center gap-9">
            <UserVerifiedWithoutTransactions userHave3Discount={userHave3Discount} />
            <AmountTransactions amountTotal={0} totalTransactions={0} />
          </div>
        ) : haveEnoughAmount && haveEnoughStars ? (
          <UserWinPlusReward />
        ) : (
          <div className="flex w-full flex-col items-center gap-9">
            <UncompleteRewardText stars={stars} quantity={amountTransactions} />
            <AmountTransactions amountTotal={amountTransactions} totalTransactions={stars} />
          </div>
        )}
      </section>
    </section>
  );
}
