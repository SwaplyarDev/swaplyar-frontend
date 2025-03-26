import SearchRequest from '@/components/searchRequest/SearchRequest';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Estado de tu Solicitud - Swaplyar',
  description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
  openGraph: {
    title: 'Estado de tu Solicitud - Swaplyar',
    description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
    url: 'https://www.swaplyar.com/es/centro-de-ayuda/estado-de-solicitud',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149012/7_hiziaz.png',
        width: 1200,
        height: 630,
        alt: 'Estado de tu Solicitud - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estado de tu Solicitud - Swaplyar',
    description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149012/7_hiziaz.png'],
    site: '@Swaplyar',
  },
};

const SearchRequestPage = () => {
  return <SearchRequest />;
};

export default SearchRequestPage;
