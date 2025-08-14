import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import Warranty from '@/components/info/Warranty/Warranty';
import { FlyerTrabajoImg } from '@/utils/assets/imgDatabaseCloudinary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garantía SwaplyAr | Protección y Seguridad en Transacciones',
  description:
    'Descubre la garantía de SwaplyAr: transacciones seguras, rápidas y respaldadas. Protegemos tu dinero y te ofrecemos tranquilidad en cada operación digital',
};

const page = () => {
  return (
    <>
      <Warranty />
      <FlyerTrabajo href="" imageSrc={FlyerTrabajoImg} />
    </>
  );
};

export default page;
