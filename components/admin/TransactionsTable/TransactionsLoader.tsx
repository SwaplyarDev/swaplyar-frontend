'use client';
import { getAllTransactions } from '@/actions/transactions/transactions.action';
import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable/TransactionsTable';
import { TransactionArray } from '@/types/transactions/transactionsType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface TransactionsLoaderProps {
  currentPage: number;
}

const TransactionsLoader: React.FC<TransactionsLoaderProps> = ({ currentPage }) => {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState<TransactionArray | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      if (!session?.decodedToken?.token) return;

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getAllTransactions(currentPage, session.decodedToken.token);
        setTransactions(data);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      }
    };

    if (status === 'authenticated') {
      getTransactions();
    }
  }, [currentPage, session, status]);

  if (status === 'loading') return <>Cargando sesión...</>;
  if (!transactions) return <>Cargando transacciones...</>;

  return <TransactionsTable transactions={transactions} currentPage={currentPage} />;
};

export default TransactionsLoader;
