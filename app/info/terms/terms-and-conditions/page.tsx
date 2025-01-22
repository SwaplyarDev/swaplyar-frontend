import TermsAndConditions from '@/components/info/terms/terms-and-conditions';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones SwaplyAr | Uso Seguro y Eficiente',
  description:
    'Conoce los Términos y Condiciones de SwaplyAr. Infórmate sobre el uso seguro de nuestros servicios digitales, tus derechos y nuestras políticas como usuario',
};

const page = () => {
  return (
    <>
      <TermsAndConditions />
    </>
  );
};

export default page;
