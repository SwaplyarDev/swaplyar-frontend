'use client';

import { Suspense } from 'react';
import { HistorialContent } from '@/components/historial/HistorialContent';

export default function HistorialTransacciones() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando historial...</div>}>
      <HistorialContent />
    </Suspense>
  );
}
