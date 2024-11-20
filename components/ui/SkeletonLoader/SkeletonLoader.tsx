import useBlogStore from '@/store/useBlogStore';
import React, { useEffect, useState } from 'react';

const SkeletonLoader = () => (
  <div className="grid gap-4" style={{
    gridTemplateColumns: 'repeat(3, 400px)', // Centra las columnas en el contenedor
  }}> {/* Define 3 columnas con un espacio entre ellas */}
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg animate-pulse"
      >
        <div className="h-40 bg-gray-300"></div> {/* Simula la imagen */}
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-300 rounded"></div> {/* Simula el título */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Simula el texto */}
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mt-4"></div> {/* Simula la fecha */}
        </div>
      </div>
    ))}
  </div>
);


export default SkeletonLoader;