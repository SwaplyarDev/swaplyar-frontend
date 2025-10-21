import React from 'react';
import { solicitudImage } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

export default function WelcomeReward() {
  return (
    <article className="flex flex-col xs-mini-phone:flex-row">
      <p className="max-w-[165px] text-sm xs-mini-phone2:text-base">
        <span>La recompensa de </span>
        <span className="whitespace-nowrap text-lg font-bold text-custom-blue-800 dark:text-custom-whiteD xs-phone:text-xl">
          Bienvenida Express
        </span>
        <span> de </span>
        <span className="titleFon align-sub text-xl font-bold text-custom-blue-800 dark:text-custom-whiteD xs-mini-phone2:text-2xl xs-phone:text-3xl">
          $3 USD
        </span>
        <span> se aplica automáticamente en tu</span>
        <span className="whitespace-nowrap"> solicitud.</span>
      </p>

      <div className="overflow-hidden max-h-[120px] xs-mini-phone:max-h-[100px] md-phone:max-h-[130px]">
        <Image
          src={solicitudImage}
          alt="Rewards Character"
          width={197}
          height={145}
          className="object-fill md-phone:w-[240px] lg:w-[260px] translate-y-[-40px] scale-75"
        />
      </div>
    </article>
  );
}
