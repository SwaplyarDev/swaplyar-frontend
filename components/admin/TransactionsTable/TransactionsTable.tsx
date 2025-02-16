'use client';
import { useEffect, useState } from 'react';
import StatusSection from './Status/StatusSection';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import useQuestionStore from '@/store/useQuestion.store';
import TransactionModal from '@/components/TransactionModal/transactionModal';
import { getAllTransactions } from '@/actions/transactions/transactions.action';
import { TransactionArray, TransactionTypeAll, emptyTransactionArray } from '@/types/transactions/transactionsType';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { SessionProvider } from 'next-auth/react';
import CloseButton from '@/components/TransactionModal/componentesModal/ui/CloseButton';

const TransactionsTable = () => {
  const { currentPage, setCurrentPage } = useQuestionStore();
  const MySwal = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState(false);
  const [transId, setTransId] = useState<string>('');
  const [stateTrans, setStateTrans] = useState<TransactionArray>(emptyTransactionArray);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionArray>(emptyTransactionArray);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const trans = await getAllTransactions(currentPage);
        console.log(trans);
        if (trans) {
          setStateTrans(trans);
          setFilteredTransactions(trans);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  const handleModal = (id: string) => {
    setTransId(id);
    MySwal.fire({
      html: (
        <div className="flex h-[200px] w-[400px] items-center justify-center opacity-0 transition-opacity duration-500">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500">
            cargando...
          </span>
        </div>
      ),
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      width: '100vw',
      customClass: {
        popup: 'bg-transparent shadow-none',
        container: 'bg-transparent',
      },
    });

    // Después de 500ms, actualiza el contenido con el modal real y lo hace visible
    setTimeout(() => {
      MySwal.update({
        html: (
          <SessionProvider>
            <TransactionModal transId={id} />
          </SessionProvider>
        ),
      });

      document.querySelector('.swal2-html-container')?.classList.remove('opacity-0');
    }, 500);
  };
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

  const renderTr = (handler: any, item: string, index: number, id: string, item2?: string) => (
    <td
      onClick={() => handler(id)}
      className={`border border-white ${index % 2 === 0 ? 'bg-[#B1BFDF] dark:bg-dark-blue' : ''} px-4 dark:border-lightText`}
    >
      {item} {item2}
    </td>
  );

  return (
    <main className="flex w-full flex-col items-center justify-center pt-2">
      <section className="flex w-[100%] flex-row justify-between">
        <h1 className="pl-44 font-titleFont text-lg font-normal">Transacciones</h1>{' '}
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
            {filteredTransactions.data.length > 0 ? (
              filteredTransactions.data.map((transaction: TransactionTypeAll, index: number) => (
                <tr key={index}>
                  <td className="bg-transparent pl-3">
                    <span className={`flex h-5 w-5 rounded-full ${getStatusColor(transaction.status)}`}></span>
                  </td>
                  {renderTr(
                    handleModal,
                    new Date(transaction.transaction.created_at).toLocaleDateString(),
                    index,
                    transaction.transaction.transaction_id,
                  )}
                  {renderTr(
                    handleModal,
                    transaction.transaction.transaction_id,
                    index,
                    transaction.transaction.transaction_id,
                  )}
                  {renderTr(
                    handleModal,
                    transaction.sender.first_name,
                    index,
                    transaction.transaction.transaction_id,
                    transaction.sender.last_name,
                  )}
                  {renderTr(
                    handleModal,
                    transaction.payment_method.sender.value,
                    index,
                    transaction.transaction.transaction_id,
                  )}
                  {renderTr(
                    handleModal,
                    transaction.receiver.first_name,
                    index,
                    transaction.transaction.transaction_id,
                    transaction.receiver.last_name,
                  )}
                  {renderTr(
                    handleModal,
                    transaction.payment_method.receiver.value,
                    index,
                    transaction.transaction.transaction_id,
                  )}
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
      <PaginationButtons
        totalPages={filteredTransactions.meta.totalPages}
        currentPage={filteredTransactions.meta.page}
        isLoading={isLoading}
      />
    </main>
  );
};

export default TransactionsTable;
