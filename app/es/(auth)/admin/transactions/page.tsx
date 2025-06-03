import { Suspense, lazy } from 'react';
import TransactionsStatus from '@/components/admin/TransactionsTable/Status/StatusSection';
import SkeletonTable from '@/components/admin/TransactionsTable/SkeletonTble/SkeletonTable';

const TransactionsLoader = lazy(() => import('@/components/admin/TransactionsTable/TransactionsLoader'));

interface TransactionPageProps {
  searchParams: { page?: string };
}

export default function TransactionsPage({ searchParams }: TransactionPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-200">Transacciones</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full shrink-0">
          <TransactionsStatus />
        </div>

        <div className="w-full flex-1 overflow-hidden">
          <Suspense fallback={<SkeletonTable />}>
            <TransactionsLoader currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
