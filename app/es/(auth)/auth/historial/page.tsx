'use client';

import { useTransactions } from '@/components/historial/useTransactions';
import { TransactionCard } from '@/components/historial/transactionCard';
import { Pagination } from '@/components/historial/pagination';
import { LoadingState } from '@/components/historial/loadingState';
import { ErrorState } from '@/components/historial/errorState';
import { EmptyState } from '@/components/historial/emptyState';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HistorialTransacciones() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageFromURL = pageParam ? parseInt(pageParam, 10) : 1;
  const router = useRouter();

  const { transactions, loading, error, currentPage, totalPages, totalItems, setCurrentPage, refetch } =
    useTransactions(pageFromURL);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [searchParams, currentPage, setCurrentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <LoadingState />
      </div>
    );
  }

  if (error === 'No se encontraron transacciones para este usuario') {
    return (
      <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 text-center sm:my-6">
        <h1 className="mb-4 mt-10 text-3xl font-bold">Historial de Transacciones</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Aún no realizaste ninguna transacción. Cuando lo hagas, aparecerán aquí.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <h1 className="mb-8 mt-1 text-center text-3xl font-bold">Historial de Transacciones</h1>
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="mx-auto mb-24 mt-10 w-full max-w-[1000px] rounded-xl p-6 sm:my-6">
      <h1 className="mb-8 mt-10 text-start text-3xl font-bold">Historial de Transacciones</h1>

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <TransactionCard key={transaction.transaction.transaction_id} transaction={transaction} index={index} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsCount={transactions.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
