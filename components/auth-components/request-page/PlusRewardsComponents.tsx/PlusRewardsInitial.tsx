'use client';

import { useEffect } from 'react';

// Images
import { ImagePlusRewards } from '../ImagePlusRewards';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

// Components
import VerifyAccount from './VerifyAccount';
import WelcomeReward from './WelcomeReward';
import UserVerifiedWithoutTransactions from './UserVerifiedWithoutTransactions';
import UserWinPlusReward from './UserWinPlusReward';
import AmountTransactions from '../AmountTransactions';
import UncompleteRewardText from './UncompleteRewardText';

// Actions
import { getUserStarsAndAmount } from '@/actions/Discounts/userStarsAndAmount.action';

// Store
import { useRewardsStore } from '@/store/useRewardsStore';
import ErrorComponent from '../ErrorComponent';
import { AdminDiscountsResponse } from '@/types/discounts/adminDiscounts';

interface Props {
  discounts: AdminDiscountsResponse;
  userVerification: null | true;
  userId: string;
  accessToken: string;
}

export default function PlusRewardInitial({ discounts, userVerification, userId, accessToken }: Props) {
  const { stars, quantity, loading, error, setData, setLoading, setError } = useRewardsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getUserStarsAndAmount(accessToken);
        // console.log('🟪 Respuesta de getUserStarsAndAmount en PlusRewardsInitial:', res);
        setData(Number(res.data.stars), Number(res.data.quantity));
      } catch (e) {
        console.error('Error en PlusRewardsInitial:', e);
        setError('Error al cargar recompensas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, setData, setError, setLoading]);

  if (loading) {
    return (
      <div className="mx-auto flex h-[600px] w-[80%] max-w-xl animate-pulse flex-col justify-between rounded-xl bg-gray-100 p-5 dark:bg-custom-grayD-800">
        <div className="mb-6 h-32 w-52 rounded bg-[#C2D4FF] dark:bg-custom-grayD-500" />

        <div className="flex flex-col items-end">
          <div className="mb-2 h-10 w-1/3 rounded bg-[#C2D4FF] dark:bg-custom-grayD-500" />
          <div className="mb-6 h-16 w-1/2 rounded bg-[#C2D4FF] dark:bg-custom-grayD-500" />
        </div>

        <div className="mt-6 h-24 rounded bg-[#C2D4FF] dark:bg-custom-grayD-500" />

        <div className="mt-auto">
          <div className="mb-6 flex space-x-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-10 rounded-full bg-[#C2D4FF] dark:bg-custom-grayD-500" />
            ))}
          </div>

          <div className="h-3 w-full rounded bg-[#C2D4FF] dark:bg-custom-grayD-500"></div>
        </div>
      </div>
    );
  }

  if (error) return <ErrorComponent errors={[error]} />;

  const userHave3Discount = discounts?.data.some((d) => d.discountCode.value === 3);
  const userHave5Discount = discounts?.data.some((d) => d.discountCode.value === 5);
  const haveEnoughStars = stars >= 5;
  const haveEnoughAmount = quantity >= 500;

  const isUserVerified: null | true = userVerification;

  return (
    <section className="relative m-auto flex w-[80%] max-w-7xl items-center">
      <section className="flex w-full flex-col justify-center rounded-lg font-light text-lightText dark:text-custom-whiteD xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs:mx-auto xs:w-[388px] xs-phone:mb-8 lg:justify-between">
          <div className="xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 md:w-full lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>

          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <p className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              {userId.toUpperCase()}
            </p>
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
        ) : haveEnoughStars && haveEnoughAmount ? (
          <UserWinPlusReward />
        ) : (
          <div className="flex w-full flex-col items-center gap-9">
            <UncompleteRewardText stars={stars} quantity={quantity} />
            <AmountTransactions amountTotal={quantity} totalTransactions={stars} />
          </div>
        )}
      </section>
    </section>
  );
}
