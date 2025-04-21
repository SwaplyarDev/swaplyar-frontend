import { Metadata } from 'next';
import HelpCenterPageAuth from '@/components/auth/info/helpCenterPage/HelpCenterPageAuth';

export const metadata: Metadata = {
  title: 'Centro de Ayuda SwaplyAr | Soluciones y Respuestas Rápidas',
  description:
    'Cancela, busca o edita una transacción en el Centro de Ayuda de SwaplyAr. ¿Necesitas comunicarte con atención al cliente? ¡Contáctanos y resolveremos tus dudas!',
  openGraph: {
    title: 'Centro de Ayuda - Swaplyar',
    description: 'Encuentra respuestas a tus preguntas y obtén asistencia en nuestro Centro de Ayuda.',
    url: 'https://www.swaplyar.com/es/auth/centro-de-ayuda',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740148903/5_iilirg.png',
        width: 1200,
        height: 630,
        alt: 'Centro de Ayuda - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro de Ayuda - Swaplyar',
    description: 'Encuentra respuestas a tus preguntas y obtén asistencia en nuestro Centro de Ayuda.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740148903/5_iilirg.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      <HelpCenterPageAuth />
    </>
  );
};

export default page;
