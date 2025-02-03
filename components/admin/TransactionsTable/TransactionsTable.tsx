'use client';
import { useEffect, useState } from 'react';
import FiltersTable from './Filters/FiltersTable';
import { TransactionType } from '@/types/transactions/transactionsType';

const TransactionsTable = () => {
  const [stateTrans, setStateTrans] = useState<TransactionType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://apiswaplyar.vercel.app/api/v1/transactions');
        if (!response.ok) throw new Error('Failed to fetch transactions');

        const data: TransactionType[] = await response.json();
        setStateTrans(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#000C29] outline-offset-2 outline outline-1  outline-[#012A8E]';
      case 'rejected':
        return 'bg-[#530000] outline-offset-2 outline outline-1  outline-[#CE1818]';
      case 'accepted':
        return 'bg-[#002C00] outline-offset-2 outline outline-1  outline-[#18CE18]';
      default:
        return 'bg-gray-500';
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = stateTrans.slice(indexOfFirstItem, indexOfLastItem);

  const trStyle = 'border border-white dark:border-lightText px-4';

  return (
    <main className="flex w-full flex-row items-center justify-center gap-6 pt-10">
      <div className="flex w-[90%] flex-row gap-4 divide-x-2 overflow-x-auto">
        <FiltersTable />

        <div className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 font-normal"></th>
              <th className="px-4 font-normal">Fecha</th>
              <th className="px-4 font-normal">Transaction ID</th>
              <th className="px-4 font-normal">Nombre/Email</th>
              <th className="px-4 font-normal">Billetera a recibir</th>
              <th className="px-4 font-normal">Destinatario</th>
              <th className="px-4 font-normal">Billetera a Pagar</th>
              <th className="px-4 font-normal">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#B1BFDF] dark:bg-dark-blue' : ''}`}>
                <td className="bg-transparent px-3">
                  <span className={`flex h-5 w-5 rounded-full ${getStatusColor(transaction.status)}`}></span>
                </td>
                <td className={trStyle}>{new Date(transaction.transaction.created_at).toLocaleDateString()}</td>
                <td className={trStyle}>{transaction.transaction.transaction_id}</td>
                <td className={trStyle}>
                  {transaction.sender.first_name} {transaction.sender.last_name}
                </td>

                <td className={trStyle}>{transaction.payment_method.sender.value}</td>
                <td className={trStyle}>
                  {transaction.receiver.first_name} {transaction.receiver.last_name}
                </td>
                <td className={trStyle}>{transaction.payment_method.receiver.value}</td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </main>
  );
};

export default TransactionsTable;
