import React from 'react';
import AplicationStateCard from './AplicationStateCard';
import { useVerificationStore } from '../../../store/useVerificationStore';

const AplicationStateContainer = ({ showRejectedMessage }: { showRejectedMessage: boolean }) => {
  const { status: verifiedStatus, showApprovedMessage } = useVerificationStore();
  return (
    <div>
      {verifiedStatus === 'PENDIENTE' ? (
        <AplicationStateCard
          className="mb-[-46px] mt-12 bg-[#F0B232] text-[#252526]"
          colorSVG="#252526"
          text1="Verificación en Revisión"
          text2={`Hemos recibido los datos que enviaste para el programa de recompensas SwaplyAr Plus Rewards.\nNuestro equipo está revisando la información proporcionada.\n¡Gracias por tu participación!`}
        />
      ) : verifiedStatus === 'APROBADO' && showApprovedMessage ? (
        <AplicationStateCard
          className="mb-[-46px] mt-12 bg-[#0B5300] text-[#EBE7E0]"
          colorSVG="#EBE7E0"
          text1="Verificación Aprobada con Exito"
          text2=""
        />
      ) : verifiedStatus === 'RECHAZADO' && showRejectedMessage ? (
        <AplicationStateCard
          className="mb-[-46px] mt-12 bg-[#CE1818] text-[#EBE7E0]"
          colorSVG="#EBE7E0"
          text1="Verificación Rechazada"
          text2={`Tu documentacion fue rechazada,\npor favor proporcione nuevamente.`}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AplicationStateContainer;
