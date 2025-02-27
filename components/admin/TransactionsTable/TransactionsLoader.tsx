import { getAllTransactions } from '@/actions/transactions/transactions.action';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable/TransactionsTable';

interface TransactionsLoaderProps {
  currentPage: number;
}

const TransactionsLoader: React.FC<TransactionsLoaderProps> = async ({ currentPage }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await getAllTransactions(currentPage);

  if (!data) {
    throw new Promise(() => {});
  }

  return (
    <div className="flex w-[80%] flex-col">
      <TransactionsTable transactions={data} />
      <PaginationButtons
        route="/admin/transactions"
        totalPages={data.meta.totalPages}
        currentPage={currentPage}
        isLoading={false}
      />
    </div>
  );
};

export default TransactionsLoader;
