import LoyaltyProgram from '@/components/info/loyaltyProgram/LoyaltyProgram';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swaplyar Plus Rewards | Ganá Beneficios por cada transacción',
  description:
    'Únete al programa de fidelización de SwaplyAr y disfruta de descuentos exclusivos, recompensas acumulables y beneficios únicos en cada transacción. Únete al Programa de Fidelización de Swaplyar y obtén recompensas por cada transacción. Descubre cómo ser parte de este beneficio exclusivo.',
};

const page = () => {
  return (
    <>
      <LoyaltyProgram />
    </>
  );
};

export default page;
