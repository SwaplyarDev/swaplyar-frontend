import React from 'react';
import MaintenancePage from '@/components/maintenance/maintenance';

interface MaintenanceProps {
  params: {
    section: string;
  };
}

const MaintenanceIndexPage: React.FC<MaintenanceProps> = ({ params }) => {
  return <MaintenancePage params={params} />;
};

export default MaintenanceIndexPage;
