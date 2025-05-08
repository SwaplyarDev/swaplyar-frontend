import React from 'react';
import Slider from '@mui/material/Slider';
import { star, yellowStar } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

function AmountTransactions({ amountTotal, totalTransactions }: { amountTotal: number; totalTransactions: number }) {
  const arrayStars = [star, star, star, star, star];
  const yellowStarsCount = Math.min(totalTransactions, 5);

  // Asegurarnos que amountTotal es un número válido
  const safeAmountTotal = Number.isFinite(amountTotal) ? Math.min(amountTotal, 500) : 0;

  return (
    <div className="h-[113px] w-[326px]">
      <div className="flex h-[50px] w-full justify-center gap-4">
        {arrayStars.map((star, index) => (
          <Image key={index} src={index < yellowStarsCount ? yellowStar : star} alt="Star" width={50} height={50} />
        ))}
      </div>
      <div className="flex h-[59px] items-end">
        <Slider
          value={safeAmountTotal}
          max={500}
          aria-label="Transaction amount slider"
          valueLabelDisplay="on"
          componentsProps={{
            valueLabel: {
              style: {
                backgroundColor: '#C2D4FF',
                color: '#012A8E',
              },
            },
          }}
          sx={{
            '& .MuiSlider-rail': {
              backgroundColor: '#C2D4FF',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#012A8E',
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#012A8E',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: 'none',
              },
            },
            '& .MuiSlider-valueLabel': {
              // Selector adicional para asegurar el estilo
              backgroundColor: '#C2D4FF',
              color: '#012A8E',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

export default AmountTransactions;
