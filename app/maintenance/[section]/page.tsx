import MaintenancePage from '@/components/maintenance/maintenance';
import React from 'react';

interface MaintenanceProps {
  params: {
    section: string;
  };
}

const page = ({ params }: MaintenanceProps) => {
  return (
    <main>
      <MaintenancePage params={params} />
    </main>
  );
};

export default page;
