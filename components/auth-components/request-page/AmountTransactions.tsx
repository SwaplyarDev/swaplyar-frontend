import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { star, yellowStar } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useTransactions } from '@/components/historial/use-transactions';
function AmountTransactions({ amountTotal, cantTransactions }: { amountTotal: number; cantTransactions: number }) {
  const arrayStars = [star, star, star, star, star];
  const yellowStarsCount = Math.min(cantTransactions, 5);

  return (
    <div className="h-[113px] w-[326px]">
      <div className="flex h-[50px] w-full justify-center gap-4">
        {arrayStars.map((star, index) => {
          return (
            <Image key={index} src={index < yellowStarsCount ? yellowStar : star} alt="Star" width={50} height={50} />
          );
        })}
      </div>
      <div className="flex h-[59px] items-end">
        <Slider
          className="mt-2 h-[13px] w-full"
          defaultValue={amountTotal}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={500}
        />
      </div>
    </div>
  );
}

export default AmountTransactions;
