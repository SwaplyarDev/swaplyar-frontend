import React from 'react';
import { solicitudImage } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

export default function WelcomeReward() {
  return (
    <article className="flex flex-col xs-mini-phone:flex-row justify-between">
      <p className="max-w-[150px] md-phone:max-w-[400px] lg:max-w-[170px] content-center text-base font-light font-textFont">
        <span>La recompensa de </span>
        <span className="whitespace-nowrap font-semibold text-custom-blue-800 dark:text-custom-whiteD">
          Bienvenida Express
        </span>
        <span > de </span>
        <span className="align-sub text-xl font-bold text-custom-blue-800 dark:text-custom-whiteD xs-mini-phone2:text-2xl xs-phone:text-3xl">
          $3 USD
        </span>
        <span> se aplica automáticamente en tu</span>
        <span className="whitespace-nowrap"> solicitud.</span>
      </p>

      <div className="overflow-hidden max-h-[145px]">
        <Image
          src={solicitudImage}
          alt="Rewards Character"
          width={197}
          height={145}
          className="object-fill"
        />
      </div>
    </article>
  );
}
