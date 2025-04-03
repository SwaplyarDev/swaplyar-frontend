'use client';

import { useTransactions } from '@/components/historial/use-transactions';
import { TransactionCard } from '@/components/historial/transaction-card';
import { Pagination } from '@/components/historial/pagination';
import { LoadingState } from '@/components/historial/loading-state';
import { ErrorState } from '@/components/historial/error-state';
import { EmptyState } from '@/components/historial/empty-state';

export default function HistorialTransacciones() {
  const { transactions, loading, error, currentPage, totalPages, totalItems, setCurrentPage, refetch } =
    useTransactions();

  if (loading) {
    return (
      <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
        <ErrorState message={error} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>

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
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
