'use client';
import { arrowBackIosLeft, arrowBackIosLeft1, arrow_back_iosr, arrow_forward_iosrr } from '@/utils/assets/img-database';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  route: string;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalPages,
  isLoading,
  setIsLoading,
  currentPage,
  route,
}) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    setIsLoading(true);
    router.push(`${route}?page=${newPage}`);
  };

  const getPageButtons = (totalPages: number, currentPage: number): (number | string)[] => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | string)[] = [1];

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  const pageButtons = getPageButtons(totalPages, currentPage);

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 dark:disabled:opacity-50"
      >
        <Image src={arrowBackIosLeft} alt="Ir al inicio" width={24} height={24} className="opacity-100 dark:invert" />
      </button>
      <button
        className="disabled:opacity-50 dark:disabled:opacity-50"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        <Image src={arrowBackIosLeft1} alt="Anterior" width={24} height={24} className="opacity-100 dark:invert" />
      </button>

      {pageButtons.map((pageNumber, index) =>
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
              currentPage === pageNumber
                ? 'bg-white text-black shadow-lg dark:bg-lightText dark:text-darkText dark:shadow-white/50'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => changePage(pageNumber)}
            disabled={isLoading}
          >
            {pageNumber}
          </button>
        ) : (
          <span key={index} className="flex h-10 w-10 items-center justify-center text-gray-400">
            ...
          </span>
        ),
      )}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 dark:disabled:opacity-50"
      >
        <Image src={arrow_back_iosr} alt="Siguiente" width={24} height={24} className="opacity-50 dark:invert" />
      </button>

      <button
        onClick={() => changePage(totalPages)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 dark:disabled:opacity-50"
      >
        <Image src={arrow_forward_iosrr} alt="Ir al final" width={24} height={24} className="opacity-50 dark:invert" />
      </button>
    </div>
  );
};

export default PaginationButtons;
