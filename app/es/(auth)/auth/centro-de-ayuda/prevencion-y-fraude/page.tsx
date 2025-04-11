import FraudPreventionAuth from '@/components/info/terms/fraud-prevention/FraudPreventionAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
  description:
    'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
};

const Page = () => {
  return (
    <>
      <FraudPreventionAuth />
    </>
  );
};

export default Page;
