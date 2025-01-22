import SaprTermsConditions from '@/components/info/terms/sapr-terms-conditions/SaprTermsConditions';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones del Programa de Fidelización SwaplyAr',
  description:
    'Consulta los Términos y Condiciones de SwaplyAr Plus Rewards - Programa de Fidelización. Descubre cómo disfrutar de tus beneficios con total seguridad.',
};

const page = () => {
  return (
    <>
      <SaprTermsConditions />
    </>
  );
};

export default page;
