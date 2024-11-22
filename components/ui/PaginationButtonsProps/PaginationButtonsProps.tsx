'use client';

import React from 'react';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, totalPages, handlePageChange }) => {
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
        className={`h-10 w-10 rounded-full border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageButtons.map((pageNumber, index) =>
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className={`h-10 w-10 rounded-full border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(pageNumber)}
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
        className={`h-10 w-10 rounded-full border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationButtons;
