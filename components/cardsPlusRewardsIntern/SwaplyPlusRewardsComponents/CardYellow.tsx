'use client';

import React from 'react';
import Image from 'next/image';
import type { ModalProps } from '@/components/cardsPlusRewardsIntern/modals/ModalVerify';
import { ButtonCustom } from '@/components/ui/ButtonCustom/ButtonCustom';
import AlertIcon from '@/components/ui/AlertIcon/AlertIcon';
import { plusRewardsCard } from '@/utils/assets/imgDatabaseCloudinary';

const CardYellow: React.FC<ModalProps> = ({ showVerify, setShowVerify, verifiedStatus }) => {
  const isPending = verifiedStatus.toUpperCase() === 'PENDIENTE';

  return (
    <div className="relative mx-auto mb-20 flex h-[210px] max-h-[288px] max-w-[358px] overflow-hidden rounded-[16px] bg-opacity-60 font-textFont text-[#000] xs:h-[230px] sm:h-[288px] sm:w-[490px] sm:max-w-[490px]">
      <div
        className="absolute -top-[225px] -z-10 h-[700px] w-[540px] rotate-[80deg] rounded-[240px]"
        style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #DF0 100%)', opacity: '0.6' }}
      ></div>

      <div
        className="absolute right-[70px] top-[42px] -z-10 h-[700px] w-[540px] rotate-[48deg] rounded-[240px]"
        style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
      ></div>

      <div
        className="absolute right-[76px] top-[43px] -z-0 h-[700px] w-[540px] rotate-[60deg] rounded-[240px] opacity-60"
        style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
      ></div>

      <div className="absolute m-[14px]">
        <Image 
          src={plusRewardsCard} 
          alt="Plus Rewards Card Logo" 
          width={250} 
          height={250} 
          className="w-[130px] sm:w-[250px] md:w-[250px]" 
        />
      </div>

      <div className="absolute right-[12px] top-[20px] text-right text-[13px] sm:right-0 sm:top-[30px] sm:mx-[14px] sm:text-left">
        <p className="text-[13px] font-light sm:mr-2 sm:text-[16px]">Tu Código de Miembro:</p>
        <p className="text-end text-[15px] sm:mr-2 sm:text-[21px]">2448XPAR</p>
      </div>

      <div className="align-center absolute right-0 top-[90px] flex w-full justify-center px-4 text-[#CE1818] xs:top-[115px] sm:top-[172.5px] sm:gap-[10px]">
        <AlertIcon />
        <div className="flex flex-col justify-center text-center">
          {isPending ? (
            <>
              <p className="text-[13px] font-semibold sm:text-[18px]">EN PROCESO DE REVISIÓN</p>
              <p className="text-[10px] sm:text-[12px]">Estamos revisando la información enviada</p>
            </>
          ) : (
            <>
              <p className="text-[12px] font-semibold sm:text-[18px]">TU CUENTA NO ESTÁ VERIFICADA</p>
              <p className="text-[10px] sm:text-[12px]">Necesitas cargar la documentación para la verificación</p>
            </>
          )}
        </div>
      </div>

      <div
        className={`absolute bottom-3 left-1/2 box-border -translate-x-1/2 rounded-[40px] border-[2px] border-transparent p-[2px] ${isPending ? '' : 'hover:border-2 hover:border-buttonsLigth'}`}
      >
        <ButtonCustom
          setShowVerify={setShowVerify}
          verifiedStatus={verifiedStatus.toUpperCase()}
          className="rounded-3sm flex h-[30px] w-[120px] justify-center rounded-[40px] font-titleFont text-sm font-semibold text-white sm:h-[40px] sm:w-[177px] sm:text-lg"
          title="Verificar ahora"
          onClick={() => setShowVerify(true)}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default CardYellow;
