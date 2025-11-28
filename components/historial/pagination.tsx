'use client';

import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalItems, itemsCount, onPageChange }: PaginationProps) {
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }

    return pages.filter((p) => p >= 1 && p <= totalPages);
  };

  return (
    <>
      <div className="mt-6 flex items-center justify-evenly gap-2">
        <button
          type='button'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="size-8 md:size-10 rounded-full border border-gray-300 bg-custom-whiteD-500 dark:bg-custom-grayD-300 dark:text-black justify-items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => goToPage(page)}
            className={`size-8 md:size-10 rounded-full bg-custom-whiteD-500 dark:bg-custom-grayD-300 justify-items-center cursor-pointer ${currentPage === page ? 'bg-blue-light-50 text-blue-light-700 dark:text-black' : ''}`}
          >
            {page}
          </button>
        ))}


        <button
          type='button'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="size-8 md:size-10 rounded-full border border-gray-300 bg-custom-whiteD-500 dark:bg-custom-grayD-300 dark:text-black justify-items-center cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Mostrando {itemsCount} de {totalItems} transacciones | Página {currentPage} de {Math.max(1, totalPages)}
      </p>
    </>
  );
}
