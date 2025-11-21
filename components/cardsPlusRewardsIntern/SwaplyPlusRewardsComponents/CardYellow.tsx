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
   <div
  className="
    relative 
    w-[340px] h-[200px]
    rounded-[11px]
    overflow-hidden
    font-textFont text-black
  "
>
  {/* Fondos decorativos */}
  <div
    className="absolute -top-[225px] -z-10 h-[700px] w-[540px] rotate-[80deg] rounded-[240px]"
    style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #DF0 100%)', opacity: '0.6' }}
  ></div>

  <div
    className="absolute right-[70px] top-[42px] -z-10 h-[700px] w-[540px] rotate-[48deg] rounded-[240px]"
    style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
  ></div>

  <div
    className="absolute right-[76px] top-[43px] -z-0 h-[700px] w-[540px] rotate-[60deg] rounded-[240px]"
    style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
  ></div>

  {/* Logo */}
  <div className="absolute left-[14px] top-[8px]">
    <Image
      src={plusRewardsCard}
      alt="Plus Rewards"
      width={173}
      height={83}
      className="w-[173px] h-[83px] object-contain"
    />
  </div>

  {/* Código de miembro */}
  <div className="absolute right-[14px] top-[20px] text-right">
    <p className="text-[13px] font-light">Tu Código de Miembro:</p>
    <p className="text-[15px] font-semibold">2448XPAR</p>
  </div>

  {/* Mensaje alerta */}
  <div className="absolute top-[106px] left-1/2 -translate-x-1/2 flex items-center gap-[5px] text-[#CE1818] w-[233px] justify-center text-center h-[35px]">

    <AlertIcon />
    <div className='w-full'>
      {isPending ? (
        <>
          <p className="text-[12px] font-semibold">EN PROCESO DE REVISIÓN</p>
          <p className="text-[10px]">Estamos revisando la información enviada</p>
        </>
      ) : (
        <>
          <p className="text-[12px] font-semibold">TU CUENTA NO ESTÁ VERIFICADA</p>
          <p className="text-[10px]">Necesitas cargar la documentación para la verificación</p>
        </>
      )}
    </div>
  </div>

 {/* Botón */}
<div className="absolute top-[150px] left-1/2 -translate-x-1/2">
  <ButtonCustom
    setShowVerify={setShowVerify}
    verifiedStatus={verifiedStatus.toUpperCase()}
    className="
      w-[145px] h-[38px]
      rounded-[50px]
      flex items-center justify-center
      font-titleFont text-[14px] font-semibold text-white
    "
    title="Verificar ahora"
    onClick={() => setShowVerify(true)}
    disabled={isPending}
  />
</div>

</div>

  );
};

export default CardYellow;
