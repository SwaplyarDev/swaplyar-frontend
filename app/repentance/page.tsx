import RepentanceForm from '@/components/repentance/Repentance';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Cancelación y Reembolso | SwaplyAr - Proceso Transparente',
  description:
    ' Descubre cómo cancelar transacciones y solicitar reembolsos con SwaplyAr. Proceso claro, rápido y transparente. Contacta al soporte si necesitas ayuda',
};

const Page: React.FC = () => {
  return (
    <div className="flex-column flex w-full flex-wrap items-center justify-center lg:px-10">
      <RepentanceForm />
    </div>
  );
};

export default Page;
