import { getAllTransactions } from '@/actions/transactions/transactions.action';
import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable/TransactionsTable';
import UsersTable from './UsersTable';

interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {
  /* await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await getAllTransactions(currentPage);
  
    if (!data) {
      throw new Promise(() => {});
    } */

  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      status: 'active',
      date_subscription: '2021-01-01',
      date_verification: '2021-01-01',
      code: '1234567890',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      status: 'active',
      date_subscription: '2021-01-01',
      date_verification: '2021-01-01',
      code: '1234567890',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ];

  return <UsersTable users={data} currentPage={currentPage} />;
};

export default UsersLoader;
