'use client';
import { useEffect, useState } from 'react';
import SearchBarTable from './SearchBarTable/SearchBarTable';
import StatusSection from './Status/StatusSection';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import useQuestionStore from '@/store/useQuestion.store';
import { TransactionType } from '@/types/transactions/transactionsType';

const TransactionsTable = () => {
  const { currentPage, setCurrentPage } = useQuestionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [stateTrans, setStateTrans] = useState<TransactionType[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>([]);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://apiswaplyar.vercel.app/api/v1/transactions');
        if (!response.ok) throw new Error('Failed to fetch transactions');

        const data: TransactionType[] = await response.json();
        setFilteredTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#000C29] outline-offset-2 outline outline-1 outline-[#012A8E]';
      case 'rejected':
        return 'bg-[#530000] outline-offset-2 outline outline-1 outline-[#CE1818]';
      case 'accepted':
        return 'bg-[#002C00] outline-offset-2 outline outline-1 outline-[#18CE18]';
      default:
        return 'bg-gray-500';
    }
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const renderTr = (item: any, index: number, item2?: any) => (
    <td
      className={`border border-white ${index % 2 === 0 ? 'bg-[#B1BFDF] dark:bg-dark-blue' : ''} px-4 dark:border-lightText`}
    >
      {item} {item2}
    </td>
  );

  return (
    <main className="flex w-full flex-col items-center justify-center pt-2">
      <section className="flex w-[100%] flex-row justify-between">
        <h1 className="pl-44 font-titleFont text-lg font-normal">Transacciones</h1>{' '}
        <SearchBarTable
          stateTrans={stateTrans}
          setCurrentPage={setCurrentPage}
          setFilteredTransactions={setFilteredTransactions}
        />
      </section>

      <div className="flex w-[95%] flex-row gap-4 divide-x-[1px] divide-black overflow-x-auto">
        <StatusSection />

        <table className="w-full">
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
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction: TransactionType, index: number) => (
                <tr key={index}>
                  <td className="bg-transparent pl-3">
                    <span className={`flex h-5 w-5 rounded-full ${getStatusColor(transaction.status)}`}></span>
                  </td>
                  {renderTr(new Date(transaction.transaction.created_at).toLocaleDateString(), index)}
                  {renderTr(transaction.transaction.transaction_id, index)}
                  {renderTr(transaction.sender.first_name, index, transaction.sender.last_name)}
                  {renderTr(transaction.payment_method.sender.value, index)}
                  {renderTr(transaction.receiver.first_name, index, transaction.receiver.last_name)}
                  {renderTr(transaction.payment_method.receiver.value, index)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} isLoading={isLoading} />
    </main>
  );
};

export default TransactionsTable;
