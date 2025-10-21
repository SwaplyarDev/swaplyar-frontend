'use client';

import { useState } from 'react';
import Image from 'next/image';
import { coupon, couponDark } from '@/utils/assets/imgDatabaseCloudinary';
import { useRewardsStore } from '@/store/useRewardsStore';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

export default function ManualCouponInput() {
  const [inputValue, setInputValue] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const setCouponInstance = useRewardsStore((state) => state.setCouponInstance);
  const markManualUsed = useRewardsStore((state) => state.markManualUsed);
  const { isDark } = useDarkTheme();
  
  const handleApplyCoupon = () => {
    const code = inputValue.trim().toLowerCase();

    if (code === 'semana santa') {
      setCouponInstance('MANUAL');
      markManualUsed();
      setIsLocked(true);
    }
  };

  return (
    <div className="flex items-start max-h-[42px]">
      <p className="mb-1 text-center text-xs text-lightText dark:text-darkText dark:bg-darkText">
        {isLocked ? 'Cupón aplicado' : ''}
      </p>
      <div className="relative">
        <Image
          src={`${isDark ? couponDark : coupon}`}
          alt="Cupón"
          width={22}
          height={22}
          className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform duration-100 hover:scale-110"
        />
        <input
          type="text"
          value={isLocked ? 'semana santa' : inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleApplyCoupon();
          }}
          disabled={isLocked}
          className={`w-full dark:bg-custom-grayD-800 placeholder:text-violet-700 dark:placeholder-darkText rounded-2xl border p-2 pl-10 text-xs sm:text-base focus:border-violet-600 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 ${
            isLocked
              ? 'border-violet-600 font-bold uppercase text-violet-700 dark:text-violet-400'
              : 'border-violet-600 text-darkLight '
          }`}
          placeholder="Ingrese el cupón acá"
        />
      </div>
    </div>
  );
}