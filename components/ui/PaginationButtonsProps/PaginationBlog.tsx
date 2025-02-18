'use client';

import React from 'react';
import useQuestionStore from '@/store/useQuestion.store';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;

  isLoading: boolean; // Agregar esta propiedad
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages, isLoading }) => {
  const { currentPage, setCurrentPage } = useQuestionStore();
  let pageButtons: (number | string)[] = [];

  if (currentPage <= 2) {
    pageButtons = [1, 2, 3, '...', totalPages];
  } else if (currentPage >= totalPages - 2) {
    pageButtons = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageButtons = [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        className={`h-10 w-10 cursor-pointer rounded-full border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1 || isLoading} // Deshabilitar durante la carga
      >
        &lt;
      </button>

      {pageButtons.map((pageNumber, index) =>
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className={`h-10 w-10 rounded-full border transition ${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white'
                : isLoading
                  ? 'cursor-pointer bg-gray-200'
                  : 'bg-white text-black'
            }`}
            onClick={() => !isLoading && setCurrentPage(pageNumber)} // Evitar cambios si está cargando
            disabled={isLoading} // Deshabilitar si está cargando
          >
            {pageNumber}
          </button>
        ) : (
          <span key={index} className="flex h-10 w-10 items-center justify-center text-gray-500">
            ...
          </span>
        ),
      )}

      <button
        className={`h-10 w-10 rounded-full border ${
          currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || isLoading} // Deshabilitar durante la carga
      >
        <div className="cursor-pointer"> &gt;</div>
      </button>
    </div>
  );
};

export default PaginationButtons;
