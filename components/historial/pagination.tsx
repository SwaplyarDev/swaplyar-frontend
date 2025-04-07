'use client';

import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalItems, itemsCount, onPageChange }: PaginationProps) {
  // Eliminamos esta condición para que siempre se muestre la paginación
  // if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Mostrar números de página */}
        {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => {
          // Lógica para mostrar páginas alrededor de la actual
          let pageToShow;
          if (totalPages <= 5) {
            pageToShow = i + 1;
          } else if (currentPage <= 3) {
            pageToShow = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageToShow = totalPages - 4 + i;
          } else {
            pageToShow = currentPage - 2 + i;
          }

          // Solo mostrar si está en rango
          if (pageToShow > 0 && pageToShow <= totalPages) {
            return (
              <Button
                key={pageToShow}
                variant={currentPage === pageToShow ? 'default' : 'outline'}
                onClick={() => goToPage(pageToShow)}
                className="h-8 w-8 px-0"
              >
                {pageToShow}
              </Button>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Información de paginación */}
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Mostrando {itemsCount} de {totalItems} transacciones | Página {currentPage} de {Math.max(1, totalPages)}
      </div>
    </>
  );
}
