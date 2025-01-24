import FraudPrevention from '@/components/info/terms/fraud-prevention/FraudPrevention';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'Prevención y Fraude | Seguridad Financiera en SwaplyAr',
  description:
    'Descubre cómo SwaplyAr te informa sobre cómo aprender a identificar y prevenir fraudes en línea. Te invitamos a leer los diferentes recursos para evitar estafas.',
});

const Page = () => {
  return (
    <>
      <FraudPrevention />
    </>
  );
};

export default Page;
