import { Suspense, lazy } from 'react';
import TransactionsStatus from '@/components/admin/TransactionsTable/Status/StatusSection';
import SkeletonTable from '@/components/admin/TransactionsTable/SkeletonTble/SkeletonTable';

const UsersLoader = lazy(() => import('@/components/admin/UsersTable/UsersLoader'));

interface TransactionPageProps {
  searchParams: { page?: string };
}

export default function UsersPage({ searchParams }: TransactionPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-200">Clientes Verificados</h1>
        {/* Aquí podrías agregar botones de acción si es necesario */}
      </div>

      <div className="flex flex-col gap-6">
        {/* Panel de estado - responsive */}
        <div className="w-full shrink-0">
          <TransactionsStatus />
        </div>

        {/* Tabla de transacciones - toma el espacio restante */}
        <div className="w-full flex-1 overflow-hidden">
          <Suspense fallback={<SkeletonTable />}>
            <UsersLoader currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
