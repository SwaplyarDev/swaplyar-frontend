import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RepentanceForm from '@/components/repentance/Repentance';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancelación y Reembolso | SwaplyAr - Proceso Transparente',
  description:
    'Descubre cómo cancelar transacciones y solicitar reembolsos con SwaplyAr. Proceso claro, rápido y transparente. Contacta al soporte si necesitas ayuda',
};

const Page: React.FC = () => {
  return (
    <>
      <div className="flex-column flex w-full flex-wrap items-center justify-center lg:px-10">
        <RepentanceForm />
      </div>
      <FlyerTrabajo
        imageSrc={FlyerGif}
        title="¿Nuevo en SwaplyAr?"
        description="Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma sencilla y segura."
        nameButton="¡Empieza ahora!"
      />
    </>
  );
};

export default Page;
