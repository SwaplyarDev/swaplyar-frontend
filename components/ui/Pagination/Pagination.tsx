import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageButtons: (number | string)[];
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, pageButtons, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        className={`h-10 w-10 rounded-full border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageButtons.map((pageNumber, index) =>
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className={`w-10 h-10 border rounded-full ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ) : (
          <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
        )
      )}

      <button
        className={`w-10 h-10 border rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationControls;