'use client';

import React from 'react';
import Image from 'next/image';
import Image1 from '@/public/images/plus-rewards-logo.png';
import type { ModalProps } from '@/components/cardsPlusRewardsIntern/modals/ModalVerify';
import { ButtonCustom } from '@/components/ui/ButtonCustom/ButtonCustom';
import AlertIcon from '@/components/ui/AlertIcon/AlertIcon';

const CardYellow: React.FC<ModalProps> = ({ showVerify, setShowVerify, verifiedStatus }) => {
  const isPending = verifiedStatus.toUpperCase() === 'PENDIENTE';

  return (
    <div className="relative z-10 mx-auto flex h-[240px] max-h-[288px] max-w-[358px] overflow-hidden rounded-[16px] bg-opacity-60 font-textFont text-[#000] xs:h-[230px] sm:h-[288px] sm:w-[490px] sm:max-w-[490px]">
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
        <Image src={Image1} alt="Logo" className="w-[182px] sm:w-[250px]" />
      </div>

      <div className="absolute top-[106px] mx-[14px] flex flex-row gap-1 xs:right-0 xs:top-0 xs:m-[14px] xs:flex-col">
        <p className="text-[13px] font-light sm:text-[18px]">Tu Código de Miembro:</p>
        <p className="text-end text-[15px] sm:text-[21px]">2448XPAR</p>
      </div>

      <div className="align-center absolute right-0 top-[130px] flex w-full justify-center gap-[7px] text-[#CE1818] xs:top-[115px] sm:top-[172.5px]">
        <AlertIcon />
        <div className="flex flex-col justify-center px-2 text-center">
          {isPending ? (
            <>
              <p className="text-[13px] font-semibold sm:text-[18px]">EN PROCESO DE REVISIÓN</p>
              <p className="text-[10px] sm:text-[12px]">Estamos revisando la información enviada</p>
            </>
          ) : (
            <>
              <p className="text-[13px] font-semibold sm:text-[18px]">TU CUENTA NO ESTÁ VERIFICADA</p>
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
          className="rounded-3sm flex h-[40px] w-[177px] justify-center rounded-[40px] font-titleFont font-semibold text-white"
          title="Verificar ahora"
          onClick={() => setShowVerify(true)}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default CardYellow;
