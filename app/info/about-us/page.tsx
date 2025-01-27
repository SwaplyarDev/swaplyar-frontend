import AboutUs from '@/components/about-us/AboutUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SwaplyAr | Nuestra misión: Simplificar tus transferencias',
  description:
    'En Swaplyar trabajamos para ofrecerte soluciones confiables y accesibles para enviar, recibir y manejar tu dinero. Descubre nuestra historia y misión.',
};

const page = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default page;
