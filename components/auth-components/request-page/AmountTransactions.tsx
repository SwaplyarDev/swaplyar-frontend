import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { star } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useTransactions } from '@/components/historial/use-transactions';
function AmountTransactions() {
  const { transactions } = useTransactions();
  const arrayStars = [star, star, star, star, star];
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-[113px] w-[326px]">
      <div className="flex h-[50px] w-full justify-center gap-4">
        {arrayStars.map((star, index) => (
          <Image key={index} width={50} height={50} src={star} alt="Star" />
        ))}
      </div>
      <div className="flex h-[59px] items-end">
        <Slider
          className="mt-2 h-[13px] w-full"
          defaultValue={amount}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={500}
        />
      </div>
    </div>
  );
}

export default AmountTransactions;
