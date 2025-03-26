import React, { Suspense } from 'react';
import SolicitudFinalizada from '@/components/SolicitudFinalizada/SolicitudFinalizada';

const page = () => {
  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={<div>Cargando...</div>}>
        <SolicitudFinalizada />
      </Suspense>
    </main>
  );
};

export default page;
