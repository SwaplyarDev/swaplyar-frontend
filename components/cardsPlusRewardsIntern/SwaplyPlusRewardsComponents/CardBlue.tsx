import React from 'react';
import Image from 'next/image';
import { plusRewardsCard } from '@/utils/assets/imgDatabaseCloudinary';

const CardBlue = ({ memberCode }: { memberCode: string }) => {
  return (
    <div
      className="
        relative 
        w-[340px] h-[200px]
        rounded-[11px]
        overflow-hidden
        font-textFont text-white
      "
    >
      {/* FONDOS DECORATIVOS */}
      <div
        className="absolute -top-[225px] -z-10 h-[700px] w-[540px] rotate-[80deg] rounded-[240px]"
        style={{
          background: 'linear-gradient(19deg, #011B5B 0%, #D0D0D0 34.33%, #011B5B 100%)',
          opacity: '0.6',
        }}
      ></div>

      <div
        className="absolute right-[70px] top-[50px] -z-10 h-[700px] w-[540px] rotate-[48deg] rounded-[240px]"
        style={{
          background: 'linear-gradient(19deg, #7800AD 0%, #1B7A7E 60%, #7800AD 100%)',
          opacity: '0.3',
        }}
      ></div>

      <div
        className="absolute right-[76px] top-[55px] -z-0 h-[700px] w-[540px] rotate-[60deg] rounded-[240px]"
        style={{
          background: 'linear-gradient(19deg, #7800AD 0%, #1B7A7E 60%, #7800AD 100%)',
          opacity: '0.6',
        }}
      ></div>

      {/* LOGO */}
      <div className="absolute left-[14px] top-[8px]">
        <Image
          src={plusRewardsCard}
          alt="Plus Rewards Card Logo"
          width={173}
          height={83}
          className="w-[173px] h-[83px] object-contain"
        />
      </div>

      {/* TEXTO CÓDIGO */}
      <div className="absolute bottom-[20px] right-[14px] text-right">
        <p className="text-[13px] font-light">Tu Código de Miembro:</p>
        <p className="text-[20px] font-semibold">{memberCode}</p>
      </div>
    </div>
  );
};

export default CardBlue;
