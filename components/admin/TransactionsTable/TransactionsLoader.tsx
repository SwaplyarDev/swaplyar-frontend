import { getAllTransactions } from '@/actions/transactions/transactions.action';
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

  return <TransactionsTable transactions={data} currentPage={currentPage} />;
};

export default TransactionsLoader;
