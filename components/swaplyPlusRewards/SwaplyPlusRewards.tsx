import React from 'react';
import { Cards } from '@/components/cardPlusRewards/CardPlusRewards';
import swaplyPlusRewards from '@/public/images/swaplyPlusRewards.png';
import Image from 'next/image';

const SwaplyPlusRewards = () => {
  const user = false;

  return (
    <div className="mx-auto flex max-w-[1000px] flex-col font-textFont xl:flex-row">
      <div className="mx-auto pr-5 xl:mx-0">
        <h1 className="mb-10 text-[40px] font-medium">SwaplyAr Plus Rewards</h1>
        <p>Consigue beneficios exclusivos cada vez que realices transacciones</p>
        <p>SwaplyAr Plus Rewards.</p>
        <div>
          <div className="flex flex-col">
            <Image
              src={swaplyPlusRewards}
              alt="swaplyPlusRewards"
              width={486}
              height={404}
              className="w-[356px] sm:w-[486px]"
            />
            <p>Fecha de inscripción: 14 jun 2020</p>
            <p>Recompensas que obtuviste en nov: 0</p>
            <p>Recompensas que obtuviste en 2024: 4</p>
            <p className="ml-[280px] justify-center font-semibold underline">Ver detalles</p>
          </div>
        </div>
      </div>
      <div className="my-auto items-center">
        <Cards user={user} memberCode="2448XPAR" />
      </div>
    </div>
  );
};

export default SwaplyPlusRewards;
