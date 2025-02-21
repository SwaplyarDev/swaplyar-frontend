import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable';

interface TransactionPageProps {
  searchParams: { page?: string }; // Captura ?page=2
}

export default function Page({ searchParams }: TransactionPageProps) {
  const currentPage = Number(searchParams.page) || 1; // Si no hay `?page=`, usa 1 por defecto

  return (
    <>
      <TransactionsTable currentPage={currentPage} />
    </>
  );
}
