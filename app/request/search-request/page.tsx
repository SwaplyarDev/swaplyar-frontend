import SearchRequest from '@/components/searchRequest/SearchRequest';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Estado de tu Solicitud - Swaplyar',
  description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
  openGraph: {
    title: 'Estado de tu Solicitud - Swaplyar',
    description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
    url: 'https://www.swaplyar.com/request/search-request',
    type: 'website',
    images: [{ url: '/images/homeOG.png', width: 1200, height: 630, alt: 'Estado de tu Solicitud - Swaplyar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estado de tu Solicitud - Swaplyar',
    description: 'Consulta el estado de tu solicitud en Swaplyar y obtén actualizaciones en tiempo real.',
    images: ['/images/homeOG.png'],
    site: '@Swaplyar',
  },
};

const SearchRequestPage = () => {
  return <SearchRequest />;
};

export default SearchRequestPage;
