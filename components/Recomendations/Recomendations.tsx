import React from 'react';
import CardRecomendation from './CardRecomendation/CardRecomendation';
import recomendationsData from '@/data/recomendationsData';

export const Recommendations: React.FC = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10">
      {/* Encabezado con texto dinámico según el tema */}
      <h2 className="font-textFont text-center text-4xl text-lightText dark:text-darkText">
        Que dicen nuestros clientes de SwaplyAr
      </h2>
      {/* Contenedor de tarjetas con desplazamiento horizontal */}
      <CardRecomendation items={recomendationsData} />
    </section>
  );
};

export default Recommendations;
