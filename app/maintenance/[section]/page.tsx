import React from 'react';
import MaintenancePage from '@/components/maintenance/maintenance';

interface MaintenanceProps {
  params: {
    section: string;
  };
}

const Page = ({ params }: MaintenanceProps) => {
  return (
    <main>
      <MaintenancePage params={params} />
    </main>
  );
};

export default Page;
