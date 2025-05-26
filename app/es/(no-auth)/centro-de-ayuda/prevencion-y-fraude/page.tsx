import FraudPrevention from '@/components/info/terms/fraud-prevention/FraudPrevention';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
  description:
    'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
  openGraph: {
    title: 'Prevención y Fraude - SwaplyAr',
    description:
      'Aprende a identificar y prevenir fraudes en línea con la guía de SwaplyAr. Información esencial para proteger tus transacciones.',
    url: 'https://www.swaplyar.com/es/centro-de-ayuda/prevencion-y-fraude',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149010/6_xisubx.png',
        width: 1200,
        height: 630,
        alt: 'Prevención y Fraude - SwaplyAr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prevención y Fraude - SwaplyAr',
    description:
      'Aprende a identificar y prevenir fraudes en línea con la guía de SwaplyAr. Información esencial para proteger tus transacciones.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149010/6_xisubx.png'],
    site: '@Swaplyar',
  },
};

const Page = () => {
  return (
    <>
      <FraudPrevention />
    </>
  );
};

export default Page;
