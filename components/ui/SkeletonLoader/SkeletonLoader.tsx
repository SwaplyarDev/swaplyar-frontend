import useBlogStore from '@/store/useBlogStore';
import React, { useEffect, useState } from 'react';

const SkeletonLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { blogs } = useBlogStore();
    useEffect(() => {
        if (blogs.length > 0) {
          setIsLoading(false); // Finaliza la carga cuando los blogs estén disponibles
        }
      }, [blogs]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg w-[300px]">
      <div className="animate-pulse">
        {/* Esqueleto de la imagen */}
        <div className="bg-gray-300 h-48 w-full"></div>

        {/* Esqueleto del contenido */}
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-300 rounded"></div> {/* Título */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Texto */}
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mt-4"></div> {/* Fecha */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;