'use client';

import { useTransactions } from '@/components/historial/use-transactions';
import { TransactionCard } from '@/components/historial/transaction-card';
import { Pagination } from '@/components/historial/pagination';
import { LoadingState } from '@/components/historial/loading-state';
import { ErrorState } from '@/components/historial/error-state';
import { EmptyState } from '@/components/historial/empty-state';
import { TransactionData } from '@/components/historial/transaction';

export default function HistorialTransacciones() {
  // const {
  //   // transactions,
  //   loading,
  //   error,
  //   // currentPage,
  //   // totalPages,
  //   // totalItems,
  //   // setCurrentPage,
  //   refetch
  // } = useTransactions();

  const transactions: TransactionData[] = [
    {
      transaction: {
        transaction_id: 'TXN001',
        sender_accounts_id: 'ACC001',
        receiver_accounts_id: 'ACC002',
        country_transaction: 'AR',
        message: '',
        created_at: '2025-06-05T14:20:00Z',
        user_id: 'USR001',
        status: 'Completed',
        idAdmin: null,
        regret_id: null,
        note_id: null,
      },
      sender: {
        first_name: 'Lucía',
        last_name: 'Fernández',
        identification: '30111222',
        phone_number: '+5491123456789',
        email: 'lucia@example.com',
        payment_method_id: 'paypal',
      },
      receiver: {
        first_name: 'Carlos',
        last_name: 'Ruiz',
        payment_method_id: 'wise',
      },
      payment_method: {
        sender: {
          value: 'PayPal',
          details: {
            email_account: 'lucia@example.com',
            transfer_code: 'PAYPAL-123456',
          },
        },
        receiver: {
          value: 'Wise',
          details: {
            bank_name: 'Banco Nación',
            sender_method_key: 'email',
            sender_method_value: 'carlos.ruiz@example.com',
            document_type: 'DNI',
            document_value: '20333444',
          },
        },
      },
      amounts: {
        sent: { amount: '200', currency: 'USD' },
        received: { amount: '185', currency: 'EUR' },
      },
      status: 'Completed',
      proof_of_payment: {
        img_transaction: 'https://via.placeholder.com/300x200.png?text=Comprobante+1',
      },
    },
    {
      transaction: {
        transaction_id: 'TXN002',
        sender_accounts_id: 'ACC003',
        receiver_accounts_id: 'ACC004',
        country_transaction: 'BR',
        message: 'Fondos insuficientes',
        created_at: '2025-06-04T10:00:00Z',
        user_id: 'USR002',
        status: 'RECHAZADA',
        idAdmin: null,
        regret_id: null,
        note_id: null,
      },
      sender: {
        first_name: 'Martín',
        last_name: 'López',
        identification: '40111222',
        phone_number: '+5491176543210',
        email: 'martin@example.com',
        payment_method_id: 'virtualBank',
      },
      receiver: {
        first_name: 'Ana',
        last_name: 'Silva',
        payment_method_id: 'pix',
      },
      payment_method: {
        sender: {
          value: 'Transferencia',
          details: {
            email_account: 'martin@example.com',
            transfer_code: 'BANK-ABC123',
          },
        },
        receiver: {
          value: 'PIX',
          details: {
            bank_name: 'Itaú',
            sender_method_key: 'pix',
            sender_method_value: 'ana.silva@pix.com.br',
            document_type: 'CPF',
            document_value: '123.456.789-00',
          },
        },
      },
      amounts: {
        sent: { amount: '300', currency: 'USD' },
        received: { amount: '280', currency: 'BRL' },
      },
      status: 'RECHAZADA',
      proof_of_payment: {
        img_transaction: 'https://via.placeholder.com/300x200.png?text=Comprobante+2',
      },
    },
  ];

  const currentPage = 1;
  const totalPages = 1;
  const totalItems = transactions.length;
  const setCurrentPage = () => {};

  // if (loading) {
  //   return (
  //     <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
  //       <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
  //       <LoadingState />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
  //       <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
  //       <ErrorState message={error} onRetry={() => refetch()} />
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto mb-24 mt-8 w-full max-w-[1000px] rounded-xl p-6 sm:my-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <TransactionCard key={transaction.transaction.transaction_id} transaction={transaction} index={index} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsCount={transactions.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

// 'use client';

// import { useTransactions } from '@/components/historial/use-transactions';
// import { TransactionCard } from '@/components/historial/transaction-card';
// import { Pagination } from '@/components/historial/pagination';
// import { LoadingState } from '@/components/historial/loading-state';
// import { ErrorState } from '@/components/historial/error-state';
// import { EmptyState } from '@/components/historial/empty-state';

// export default function HistorialTransacciones() {
//   const {
//     transactions,
//     loading,
//     error,
//     currentPage,
//     totalPages,
//     totalItems,
//     setCurrentPage,
//     refetch,
//   } = useTransactions();

//   if (loading) {
//     return (
//       <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
//         <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
//         <LoadingState />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
//         <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
//         <ErrorState message={error} onRetry={refetch} />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto mb-24 mt-8 w-full max-w-[1000px] rounded-xl p-6 sm:my-6">
//       <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>

//       {transactions.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <>
//           <div className="space-y-4">
//             {transactions.map((transaction, index) => (
//               <TransactionCard
//                 key={transaction.transaction.transaction_id}
//                 transaction={transaction}
//                 index={index}
//               />
//             ))}
//           </div>

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalItems={totalItems}
//             itemsCount={transactions.length}
//             onPageChange={setCurrentPage}
//           />
//         </>
//       )}
//     </div>
//   );
// }
