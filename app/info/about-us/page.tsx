import AboutUs from '@/components/about-us/AboutUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SwaplyAr | Nuestra misión: Simplificar tus transferencias',
  description:
    'En Swaplyar trabajamos para ofrecerte soluciones confiables y accesibles para enviar, recibir y manejar tu dinero. Descubre nuestra historia y misión.',
  openGraph: {
    title: 'Quiénes Somos - Swaplyar',
    description: 'Conoce la historia, valores y misión de Swaplyar, tu aliado en soluciones financieras innovadoras.',
    url: 'https://www.swaplyar.com/info/about-us',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740148898/3_mdvm8d.png',
        width: 1200,
        height: 630,
        alt: 'Quiénes Somos - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiénes Somos - Swaplyar',
    description: 'Conoce la historia, valores y misión de Swaplyar, tu aliado en soluciones financieras innovadoras.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740148898/3_mdvm8d.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default page;
