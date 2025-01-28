import Questions from '@/components/info/questions/Questions';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Resuelve tus Dudas de SwaplyAr',
  description:
    'Encuentra respuestas a las preguntas más comunes sobre SwaplyAr. Aprende sobre nuestras transacciones, seguridad, y servicios adicionales.',
};

const page = () => {
  return (
    <>
      <Questions />
    </>
  );
};

export default page;
