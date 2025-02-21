import HelpCenterPage from '@/components/info/helpCenterPage/HelpCenterPage';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centro de Ayuda SwaplyAr | Soluciones y Respuestas Rápidas',
  description:
    'Cancela, busca o edita una transacción en el Centro de Ayuda de SwaplyAr. ¿Necesitas comunicarte con atención al cliente? ¡Contáctanos y resolveremos tus dudas!',
  openGraph: {
    title: 'Centro de Ayuda - Swaplyar',
    description: 'Encuentra respuestas a tus preguntas y obtén asistencia en nuestro Centro de Ayuda.',
    url: 'https://www.swaplyar.com/info/help-center',
    type: 'website',
    images: [{ url: '/images/homeOG.png', width: 1200, height: 630, alt: 'Centro de Ayuda - Swaplyar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro de Ayuda - Swaplyar',
    description: 'Encuentra respuestas a tus preguntas y obtén asistencia en nuestro Centro de Ayuda.',
    images: ['/images/homeOG.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <div>
      <HelpCenterPage />
    </div>
  );
};

export default page;
