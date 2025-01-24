import AboutUs from '@/components/about-us/AboutUs';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'SwaplyAr | Nuestra misión: Simplificar tus transferencias',
  description:
    'En Swaplyar trabajamos para ofrecerte soluciones confiables y accesibles para enviar, recibir y manejar tu dinero. Descubre nuestra historia y misión.',
});

const page = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default page;
