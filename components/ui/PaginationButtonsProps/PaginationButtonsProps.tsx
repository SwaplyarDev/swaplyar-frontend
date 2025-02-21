'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useQuestionStore from '@/store/useQuestion.store';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  route: string;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages, isLoading, currentPage, route }) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    router.push(`${route}?page=${newPage}`);
  };

  let pageButtons: (number | string)[] = [];

  if (currentPage < 2) {
    pageButtons = [1, '...', totalPages];
  } else if (currentPage >= totalPages - 2) {
    pageButtons = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageButtons = [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        className={`h-10 w-10 cursor-pointer rounded-full border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        &lt;
      </button>

      {pageButtons.map((pageNumber, index) =>
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className={`h-10 w-10 rounded-full border transition ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
            onClick={() => changePage(pageNumber)}
            disabled={isLoading}
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
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationButtons;
