import React from 'react';
import MaintenancePage from '@/components/maintenance/maintenance';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mantenimiento en Proceso. Volvemos Pronto | SwaplyAr',
  description:
    'SwaplyAr está mejorando sus servicios. Volveremos pronto con un sitio optimizado. ¡Gracias por tu comprensión y paciencia. Te invitamos regresar a la Home!',
};

interface MaintenanceProps {
  params: {
    section: string;
  };
}

const MaintenanceIndexPage: React.FC<MaintenanceProps> = ({ params }) => {
  return <MaintenancePage params={params} />;
};

export default MaintenanceIndexPage;
