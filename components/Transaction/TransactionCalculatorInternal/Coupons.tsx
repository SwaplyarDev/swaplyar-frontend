'use client';

import { useEffect } from 'react';
import { useRewardsStore } from '@/store/useRewardsStore';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { yellowStar } from '@/utils/assets/imgDatabaseCloudinary';
import { IconTrophy } from '@/components/ui/IconTrophy/IconTrophy';
import CouponCard from './CouponCard';
import ManualCouponInput from './ManualCouponInput';

interface IProps {
  balance: number;
  isVerified: boolean;
  receivingCoin?: string;
}

export default function Coupons({ balance, isVerified, receivingCoin }: IProps) {
  const {
    couponInstance,
    loading,
    setData,
    setLoading,
    setError,
    calculateCouponInstance,
    markUsed,
    // resetUsed,
  } = useRewardsStore();

  const { data: session } = useSession();
  const userVerification = session?.user.userVerification;

  useEffect(() => {
    const mockStars = 4; // 5
    const mockQuantity = 500; // 500

    setLoading(true);
    setTimeout(() => {
      // resetUsed();
      setData(mockStars, mockQuantity);

      markUsed(3); // Uso 3 USD
      markUsed(5); // Uso 5 USD

      // calculateCouponInstance(false);
      calculateCouponInstance(isVerified);
      setLoading(false);
    }, 100);
  }, [setData, setLoading, calculateCouponInstance, isVerified, session, userVerification, markUsed]);

  const handleRedeem = (amount: 3 | 5 | 'BOTH') => {
    if (amount === 'BOTH') {
      markUsed(3);
      markUsed(5);
    } else {
      markUsed(amount);
    }
    setTimeout(() => {
      calculateCouponInstance(isVerified);
    }, 50);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60px] w-full animate-pulse flex-col gap-6 xs:flex-row xs:gap-8">
        <div className="xs:w-180px flex w-full flex-col items-center gap-2 xs:items-end">
          <div className="h-[20px] w-[100px] rounded bg-gray-200" />
          <div className="h-[30px] w-[180px] rounded bg-gray-200" />
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <div className="h-[55px] min-w-[180px] max-w-[100px] rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 xs:flex-row xs:gap-8">
      <div className="xs:w-180px flex w-full flex-col items-center gap-2 xs:items-end">
        <p className="text-end text-xs text-lightText dark:text-darkText">Saldo sin Cupón</p>
        <p className="text-end text-2xl font-light text-lightText dark:text-darkText">
          {balance.toFixed(2)}
          <span className="text-custom-blue-800 dark:text-darkText"> {receivingCoin}</span>
          <span className="ml-auto block h-[2px] w-[180px] bg-buttonsLigth dark:bg-darkText"></span>
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        {couponInstance === 'TEN' && (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-lightText dark:text-darkText">Plus Reward</p>
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, index) => (
                  <Image
                    src={yellowStar}
                    alt="Star"
                    key={index}
                    width={16}
                    height={16}
                    className="transition-transform duration-200 hover:scale-125"
                  />
                ))}
              </div>
            </div>
            <div className="flex h-[41px] min-w-[180px] max-w-[190px] items-center justify-center gap-4 rounded-2xl border border-[#FCC21B] bg-[#FFFFF8] px-[10px] py-2">
              <IconTrophy className="transition-transform duration-100 hover:scale-110" />
              <p className="text-lg font-normal text-lightText">+10 USD</p>
            </div>
          </div>
        )}
        {couponInstance === 'THREE' && <CouponCard label="+3 USD" amount={3} onRedeem={() => handleRedeem(3)} />}
        {couponInstance === 'FIVE' && <CouponCard label="+5 USD" amount={5} onRedeem={() => handleRedeem(5)} />}
        {couponInstance === 'THREE_FIVE' && (
          <CouponCard label="+3USD +5USD" amount={8} onRedeem={() => handleRedeem('BOTH')} />
        )}
        {couponInstance === 'MANUAL' && <ManualCouponInput />}
      </div>
    </div>
  );
}