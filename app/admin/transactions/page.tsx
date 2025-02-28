import { Suspense, lazy } from 'react';
import StatusSection from '@/components/admin/TransactionsTable/Status/StatusSection';
import SkeletonTable from '@/components/admin/TransactionsTable/SkeletonTble/SkeletonTable';

const TransactionsLoader = lazy(() => import('@/components/admin/TransactionsTable/TransactionsLoader'));

interface TransactionPageProps {
  searchParams: { page?: string };
}

export default function Page({ searchParams }: TransactionPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <main className="flex w-full flex-col items-center justify-center pt-2">
      <section className="flex w-[100%] flex-row justify-between">
        <h1 className="pl-44 font-titleFont text-lg font-normal">Transacciones</h1>{' '}
      </section>
      <div className="flex w-[95%] flex-row items-start gap-2 overflow-x-auto">
        <StatusSection />
        <div className="ml-5 mt-4 h-[25rem] w-1 border-l-[1px] border-black"></div>
        <Suspense fallback={<SkeletonTable />}>
          <TransactionsLoader currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
