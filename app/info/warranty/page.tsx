import Warranty from '@/components/info/Warranty/Warranty';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'Garantía SwaplyAr | Protección y Seguridad en Transacciones',
  description:
    'Descubre la garantía de SwaplyAr: transacciones seguras, rápidas y respaldadas. Protegemos tu dinero y te ofrecemos tranquilidad en cada operación digital',
});

const page = () => {
  return (
    <>
      <Warranty />
    </>
  );
};

export default page;
