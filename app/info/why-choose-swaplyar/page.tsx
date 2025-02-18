import WhyChooseSwaplyar from '@/components/info/whyChooseSwaplyar/WhyChooseSwaplyar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '¿Por qué usar SwaplyAr? | Rápido, seguro y sin complicaciones',
  description:
    'Descubrí por qué SwaplyAr es la mejor opción para enviar y cambiar dinero. Con tarifas competitivas y sin complicaciones facilitamos tus transacciones',
};

const page = () => {
  return (
    <>
      <WhyChooseSwaplyar />
    </>
  );
};

export default page;
