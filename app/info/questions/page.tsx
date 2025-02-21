import Questions from '@/components/info/questions/Questions';
import React, { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Resuelve tus Dudas de SwaplyAr',
  description:
    'Encuentra respuestas a las preguntas más comunes sobre SwaplyAr. Aprende sobre nuestras transacciones, seguridad, y servicios adicionales.',
  openGraph: {
    title: 'Preguntas Frecuentes - Swaplyar',
    description: 'Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios financieros.',
    url: 'https://www.swaplyar.com/info/questions',
    type: 'website',
    images: [
      { url: '/images/frequentlyQuestionsOG.png', width: 1200, height: 630, alt: 'Preguntas Frecuentes - Swaplyar' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes - Swaplyar',
    description: 'Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios financieros.',
    images: ['/images/frequentlyQuestionsOG.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      {' '}
      <Suspense>
        <Questions />
      </Suspense>
    </>
  );
};

export default page;
