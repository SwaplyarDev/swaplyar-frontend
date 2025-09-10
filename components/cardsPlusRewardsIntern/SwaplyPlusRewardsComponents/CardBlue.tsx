import React from 'react';
import Image from 'next/image';
import { plusRewardsCard } from '@/utils/assets/imgDatabaseCloudinary';

const CardBlue = ({ memberCode }: { memberCode: string }) => {
  return (
    <>
      <div className="relative mx-auto mb-20 flex h-[210px] max-h-[288px] max-w-[358px] overflow-hidden rounded-[16px] bg-opacity-60 font-textFont text-[#000] sm:h-[288px] sm:w-[490px] sm:max-w-[490px]">
        <div
          className="absolute -top-[225px] -z-10 h-[700px] w-[540px] rotate-[80deg] rounded-[240px]"
          style={{ background: ' linear-gradient(19deg, #011B5B 0%, #D0D0D0 34.33%, #011B5B 100%)', opacity: '0.6' }}
        ></div>

        <div
          className="absolute right-10 top-[72px] -z-10 h-[700px] w-[540px] rotate-[60deg] rounded-[240px]"
          style={{ background: 'linear-gradient(19deg, #7800AD 0%, #1B7A7E 60%, #7800AD 100%)', opacity: '0.1' }}
        ></div>

        <div
          className="absolute right-7 top-[80px] h-[700px] w-[540px] rotate-[60deg] rounded-[240px] sm:top-[130px]"
          style={{ background: 'linear-gradient(19deg, #7800AD 0%, #1B7A7E 60%, #7800AD 100%)', opacity: '0.6' }}
        ></div>

        <div className="absolute m-[14px] h-full">
          <Image 
            src={plusRewardsCard} 
            alt="Plus Rewards Card Logo" 
            width={250} 
            height={250} 
            className="w-[182px] sm:w-[250px]" 
          />
        </div>

        <div className="absolute bottom-0 right-0 mx-4 gap-1 text-[#EBE7E0]">
          <p className="text-[20px] font-light text-end">Tu Codigo de Miembro:</p>
          <p className="text-end text-[13px] sm:text-[22px]">{memberCode}</p>
        </div>
      </div>
    </>
  );
};

export default CardBlue;
