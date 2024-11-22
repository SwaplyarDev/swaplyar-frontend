import useBlogStore from '@/store/useBlogStore';
import React, { useEffect, useState } from 'react';

const SkeletonLoader = () => (
  <div
    className="grid gap-4"
    style={{
      gridTemplateColumns: 'repeat(3, 400px)', // Centra las columnas en el contenedor
    }}
  >
    {' '}
    {/* Define 3 columnas con un espacio entre ellas */}
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="h-40 bg-gray-300"></div> {/* Simula la imagen */}
        <div className="space-y-3 p-4">
          <div className="h-6 rounded bg-gray-300"></div> {/* Simula el título */}
          <div className="h-4 w-3/4 rounded bg-gray-300"></div> {/* Simula el texto */}
          <div className="h-4 w-5/6 rounded bg-gray-300"></div>
          <div className="mt-4 h-4 w-2/3 rounded bg-gray-300"></div> {/* Simula la fecha */}
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
