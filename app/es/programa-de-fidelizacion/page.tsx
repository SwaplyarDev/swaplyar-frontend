import LoyaltyProgram from '@/components/info/loyaltyProgram/LoyaltyProgram';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swaplyar Plus Rewards | Ganá Beneficios por cada transacción',
  description:
    'Únete al programa de fidelización de SwaplyAr y disfruta de descuentos exclusivos, recompensas acumulables y beneficios únicos en cada transacción. Únete al Programa de Fidelización de Swaplyar y obtén recompensas por cada transacción. Descubre cómo ser parte de este beneficio exclusivo.',
  openGraph: {
    title: 'Programa de Fidelización - Swaplyar',
    description: 'Gana beneficios exclusivos con nuestro Programa de Fidelización. Únete y disfruta de recompensas.',
    url: 'https://www.swaplyar.com/es/programa-de-fidelizacion',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740148901/4_u0nljk.png',
        width: 1200,
        height: 630,
        alt: 'Programa de Fidelización - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Fidelización - Swaplyar',
    description: 'Gana beneficios exclusivos con nuestro Programa de Fidelización. Únete y disfruta de recompensas.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740148901/4_u0nljk.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      <LoyaltyProgram />
    </>
  );
};

export default page;
