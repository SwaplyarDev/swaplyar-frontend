import FraudPreventionAuth from '@/components/info/terms/fraud-prevention/FraudPreventionAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
  description:
    'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
  openGraph: {
    title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
    description:
      'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
    url: 'http://www.swaplyar.com/es/auth/centro-de-ayuda/prevencion-y-fraude',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149014/8_kzkkwu.png',
        width: 1200,
        height: 630,
        alt: 'Prevención y Fraude - SwaplyAr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
    description:
      'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149014/8_kzkkwu.png'],
    site: '@Swaplyar',
  },
};
// agregar despcription
const Page = () => {
  return (
    <>
      <FraudPreventionAuth />
    </>
  );
};

export default Page;
