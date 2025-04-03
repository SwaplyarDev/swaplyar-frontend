import WhyChooseSwaplyar from '@/components/info/whyChooseSwaplyar/WhyChooseSwaplyar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '¿Por qué usar SwaplyAr? | Rápido, seguro y sin complicaciones',
  description:
    'Descubrí por qué SwaplyAr es la mejor opción para enviar y cambiar dinero. Con tarifas competitivas y sin complicaciones facilitamos tus transacciones',
  openGraph: {
    title: '¿Por qué elegir Swaplyar?',
    description: 'Te ofrecemos soluciones financieras confiables, rápidas y adaptadas a tus necesidades. Conócenos.',
    url: 'https://www.swaplyar.com/info/why-choose-swaplyar',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149051/18_aqoxuw.png',
        width: 1200,
        height: 630,
        alt: '¿Por qué elegir Swaplyar?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Por qué elegir Swaplyar?',
    description: 'Te ofrecemos soluciones financieras confiables, rápidas y adaptadas a tus necesidades. Conócenos.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149051/18_aqoxuw.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      <WhyChooseSwaplyar />
    </>
  );
};

export default page;
