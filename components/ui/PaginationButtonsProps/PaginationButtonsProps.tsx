'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
  route: string;
  className?: string;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalPages,
  currentPage,
  isLoading = false,
  onLoadingChange,
  route,
  className,
}) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    onLoadingChange?.(true);
    router.push(`${route}?page=${newPage}`);
  };

  const getPageButtons = (totalPages: number, currentPage: number): (number | string)[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | string)[] = [1];

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageButtons = getPageButtons(totalPages, currentPage);

  return (
    <div className={`flex items-center justify-center gap-1 md:gap-2 ${className || ''}`}>
      <button
        onClick={() => changePage(1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Go to first page"
        className="hidden h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 sm:flex"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Go to previous page"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1 md:gap-2">
        {pageButtons.map((pageNumber, index) =>
          typeof pageNumber === 'number' ? (
            <button
              key={index}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === pageNumber
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
              } disabled:cursor-not-allowed disabled:opacity-50`}
              onClick={() => changePage(pageNumber)}
              disabled={isLoading || currentPage === pageNumber}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={index} className="flex h-8 w-8 items-center justify-center text-gray-500 dark:text-gray-400">
              &#8230;
            </span>
          ),
        )}
      </div>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Go to next page"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <button
        onClick={() => changePage(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Go to last page"
        className="hidden h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 sm:flex"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PaginationButtons;
