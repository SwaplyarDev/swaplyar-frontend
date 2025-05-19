import React from 'react';
import { solicitudImage } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

export default function WelcomeReward() {
  return (
    <article className={`flex`}>
      <p className="text-sm xs-mini-phone:text-base">
        <span>La recompensa de </span>
        <span className="whitespace-nowrap text-lg font-bold text-custom-blue-800 dark:text-custom-whiteD xs-phone:text-xl">
          Bienvenida Express
        </span>
        <span className="whitespace-nowrap"> de </span>
        <br></br>
        <span className="titleFon align-sub text-xl font-bold text-custom-blue-800 dark:text-custom-whiteD xs-mini-phone:text-2xl xs-phone:text-3xl">
          $3 USD
        </span>
        <span> se aplica automáticamente en tu</span>
        <br></br>
        <span className="whitespace-nowrap"> solicitud.</span>
      </p>

      <Image
        src={solicitudImage}
        alt="Rewards Character"
        width={395}
        height={290}
        className="object-cover xs-mini-phone:w-[220px] md-phone:w-[240px] lg:w-[260px]"
      />
    </article>
  );
}
