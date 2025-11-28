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
import {  useSession } from 'next-auth/react';

interface Props {
  discounts: AdminDiscountsResponse;
  memberCode: string;
  accessToken: string;
}

export default function PlusRewardInitial({ discounts, memberCode, accessToken }: Props) {
  const { stars, quantity, loading, error, setData, setLoading, setError } = useRewardsStore();
  const { data: session } = useSession();
  
  console.log('🟪 Session in PlusRewardInitial:', session);

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
      <div className="mx-auto flex h-[600px] w-full max-w-[388px] animate-pulse flex-col justify-between rounded-xl bg-gray-100 p-5 dark:bg-custom-grayD-800">
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

 const isUserVerified = session?.user?.userValidated ?? null;

  return (
    <section className="relative flex w-full lg:max-w-[388px] items-center lg:items-start">
      <section className="flex w-full flex-col gap-2 justify-center rounded-lg font-light text-lightText dark:text-custom-whiteD">
        <article className="flex flex-col md-phone:flex-row justify-between items-center lg:justify-center md-phone:gap-7">
          <div className="w-[187.5px]">
            <ImagePlusRewards />
          </div>

          <article className="text-center md-phone:text-end">
            <p className="align-text-top text-center text-base font-light">Tu Código de Miembro:</p>
            <p className="font-textFont text-4xl">
              {memberCode.toUpperCase()}
            </p>
          </article>
        </article>

        {!isUserVerified ? (
          userHave3Discount ? (
            <div className="flex w-full flex-col gap-[19px]">
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
