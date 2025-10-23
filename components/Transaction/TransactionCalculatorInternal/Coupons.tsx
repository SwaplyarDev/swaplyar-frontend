'use client';

import { useRewardsStore } from '@/store/useRewardsStore';

import Image from 'next/image';
import { yellowStar } from '@/utils/assets/imgDatabaseCloudinary';
import { IconTrophy } from '@/components/ui/IconTrophy/IconTrophy';
import CouponCard from './CouponCard';
import ManualCouponInput from './ManualCouponInput';

interface IProps {
  balance: number;
  receivingCoin?: string;
  children?: React.ReactNode;
}

export default function Coupons({ balance, receivingCoin, children }: IProps) {
  const {
    couponInstance,
    loading
  } = useRewardsStore();
  
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
    <div className="relative flex w-full xs:flex-row gap-2 sm:gap-6 items-center">
      <div className="min-w-[122px] md:min-w-[180px] flex w-full flex-col items-end sm:items-center gap-2 xs:items-end">
        <p className="text-end text-[10px] sm:text-xs text-lightText dark:text-darkText">Saldo sin Cupón</p>
        <p className="w-full text-end text-lg sm:text-2xl font-light text-lightText dark:text-darkText">
          {balance.toFixed(2)}
          <span className="text-custom-blue-800 dark:text-darkText">{receivingCoin}</span>
          <span className="ml-auto block h-[2px] w-full bg-buttonsLigth dark:bg-darkText"></span>
        </p>
      </div>
      {children}
      <div className="flex w-full flex-col items-center gap-3">
        {couponInstance === 'TEN' && (
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex items-center gap-1 w-full">
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
            <div className="flex h-[41px] w-full items-center justify-center gap-4 rounded-lg border border-[#FCC21B] bg-[#FFFFF8] px-[10px] py-2">
              <IconTrophy className="transition-transform duration-100 hover:scale-110" />
              <p className="text-lg font-normal text-lightText">+10 USD</p>
            </div>
          </div>
        )}
        {couponInstance === 'THREE' && <CouponCard label="+3 USD" amount={3} />}
        {couponInstance === 'FIVE' && <CouponCard label="+5 USD" amount={5} />}
        {couponInstance === 'COMBINED' && <CouponCard label="+3 USD + 5 USD" amount={8} />}
        {couponInstance === 'MANUAL' && <ManualCouponInput />}
      </div>
    </div>
  );
}