import React from 'react';
import AplicationStateCard from './AplicationStateCard';

type Props = {
  verifiedStatus: string;
};
const AplicationStateContainer = ({ verifiedStatus }: Props) => {
  return (
    <div>
      {verifiedStatus === 'pendiente' ? (
        <AplicationStateCard
          className="bg-[#F0B232] text-[#252526]"
          colorSVG="#252526"
          text1="Verificación en Revisión"
          text2="Hemos recibido los datos que enviaste para el programa de recompensas SwaplyAr Plus Rewards. Nuestro equipo está revisando la información proporcionada ¡Gracias por tu participación!"
        />
      ) : verifiedStatus === 'aprobado' ? (
        <AplicationStateCard
          className="bg-[#0B5300] text-[#EBE7E0]"
          colorSVG="#EBE7E0"
          text1="Verificación Aprobada con Exito"
          text2=""
        />
      ) : verifiedStatus === 'rechazado' ? (
        <AplicationStateCard
          className="bg-[#CE1818] text-[#EBE7E0]"
          colorSVG="#EBE7E0"
          text1="Solicitud Cancelada."
          text2="Puedes crear una nueva, y si tienes alguna pregunta o necesitas ayuda, estamos aquí para ti."
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AplicationStateContainer;
