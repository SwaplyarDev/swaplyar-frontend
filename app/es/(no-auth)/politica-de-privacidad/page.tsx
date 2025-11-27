import PrivacyPolicy from '@/components/info/privacy-policy/PrivacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - SwaplyAr',
  description:
    'Consulta la Política de Privacidad de SwaplyAr. Descubre cómo protegemos tus datos personales y garantizamos tu privacidad.',
};

const page = () => {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
};

export default page;