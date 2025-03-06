'use client';
import { arrowBackIosLeft, arrowBackIosLeft1, arrow_back_iosr, arrow_forward_iosrr } from '@/utils/assets/img-database';
import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import useQuestionStore from '@/store/useQuestion.store';
import useBlogStore from '@/store/useBlogStore';

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
  const { setBlogs } = useBlogStore();

  const changePage = (newPage: number) => {
    setIsLoading(true);
    router.push(`${route}?page=${newPage}`);
  };

  let pageButtons: (number | string)[] = [];

  // if (totalPages <= 2) {
  //   pageButtons = [1, 2, '...', totalPages];
  // } else if (currentPage >= totalPages - 2) {
  //   pageButtons = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  // } else if (currentPage === 1) {
  //   pageButtons = [currentPage, currentPage + 1, '...', totalPages];
  // } else {
  //   pageButtons = [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  // }
  if (totalPages === 1) {
    pageButtons = [1];
  } else if (totalPages === 2) {
    pageButtons = [1, 2];
  } else if (totalPages === 3) {
    pageButtons = [1, 2, 3];
  } else if (totalPages === 4) {
    pageButtons = [1, 2, '...', 4];
    if (currentPage === 2 || currentPage === 3) {
      pageButtons = [1, 2, 3, 4];
    } else if (currentPage === 4) {
      pageButtons = [1, '...', 3, 4];
    }
  } else if (totalPages === 5) {
    pageButtons = [1, 2, '...', 5];
    if (currentPage === 2) {
      pageButtons = [1, 2, 3, '...', 5];
    } else if (currentPage === 3) {
      pageButtons = [1, 2, 3, 4, 5];
    } else if (currentPage === 4) {
      pageButtons = [1, '...', 3, 4, 5];
    } else if (currentPage === 5) {
      pageButtons = [1, '...', 4, 5];
    }
  } else if (totalPages === 6) {
    pageButtons = [1, 2, '...', 6];
    if (currentPage === 2) {
      pageButtons = [1, 2, 3, '...', 6];
    } else if (currentPage === 3) {
      pageButtons = [1, 2, 3, 4, '...', 6];
    } else if (currentPage === 4) {
      pageButtons = [1, '...', 3, 4, 5, 6];
    } else if (currentPage === 5) {
      pageButtons = [1, '...', 4, 5, 6];
    } else if (currentPage === 6) {
      pageButtons = [1, '...', 5, 6];
    }
  } else if (totalPages >= 7) {
    pageButtons = [1, 2, '...', totalPages];
    if (currentPage === 2) {
      pageButtons = [1, 2, 3, '...', totalPages];
    } else if (currentPage === 3) {
      pageButtons = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= 4 && currentPage < totalPages - 2) {
      pageButtons = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    } else if (currentPage === totalPages - 2) {
      pageButtons = [1, '...', currentPage - 1, currentPage, currentPage + 1, totalPages];
    } else if (currentPage === totalPages - 1) {
      pageButtons = [1, '...', currentPage - 1, currentPage, totalPages];
    } else if (currentPage === totalPages) {
      pageButtons = [1, '...', totalPages - 1, totalPages];
    }
  }

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
