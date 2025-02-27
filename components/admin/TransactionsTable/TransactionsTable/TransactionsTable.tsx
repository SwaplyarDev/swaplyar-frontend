'use client';
import { useState } from 'react';
import TransactionModal from '@/components/TransactionModal/transactionModal';
import { TransactionArray, TransactionTypeAll } from '@/types/transactions/transactionsType';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { SessionProvider } from 'next-auth/react';

interface TransactionsTableProps {
  transactions: TransactionArray;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const MySwal = withReactContent(Swal);
  const [transId, setTransId] = useState<string>('');

  const handleModal = (id: string) => {
    setTransId(id);
    MySwal.fire({
      html: <div className="display-hidden"></div>,
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      width: '0px',
      customClass: {
        popup: 'bg-transparent shadow-none',
        container: 'bg-transparent',
      },
      hideClass: {
        popup: 'swal2-hide-custom',
      },
    });
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
      className={`h-8 border border-white ${index % 2 === 0 ? 'bg-[#B1BFDF] dark:bg-dark-blue' : ''} px-4 dark:border-lightText`}
    >
      {item} {item2}
    </td>
  );

  return (
    <table className={`w-full ${transactions.data.length >= 10 ? 'h-[25rem]' : ''} cursor-pointer`}>
      <thead>
        <tr className="text-left">
          <th className="px-4 font-normal"></th>
          <th className="px-4 font-normal">Fecha</th>
          <th className="px-4 font-normal">Transaction ID</th>
          <th className="px-4 font-normal">Nombre/Email</th>
          <th className="px-4 font-normal">Billetera a recibir</th>
          <th className="px-4 font-normal">Destinatario</th>
          <th className="px-4 font-normal">Billetera a Pagar</th>
          <th className="px-4 font-normal"></th>
        </tr>
      </thead>
      <tbody className="table-fixed">
        {transactions.data.length > 0 ? (
          transactions.data.map((transaction: TransactionTypeAll, index: number) => (
            <tr key={index}>
              <td className="bg-transparen pl-2 pr-2">
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
              <td
                className={`items-end border border-white ${index % 2 === 0 ? 'bg-[#B1BFDF] dark:bg-dark-blue' : ''} pl-5 dark:border-lightText`}
              >
                <span
                  className={`flex h-5 w-5 rounded-full ${transaction.transaction.regret_id ? 'bg-[#530000] outline outline-1 outline-offset-2 outline-[#CE1818]' : transaction.transaction.note_id ? 'bg-[#6a3718] outline outline-1 outline-offset-2 outline-[#ff6200]' : 'invisible'}`}
                ></span>
              </td>
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
  );
};

export default TransactionsTable;
