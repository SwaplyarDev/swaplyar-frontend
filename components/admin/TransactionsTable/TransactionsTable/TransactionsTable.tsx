'use client';

import type React from 'react';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Eye, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { TransactionArray, TransactionTypeAll } from '@/types/transactions/transactionsType';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import TransactionModal from '@/components/TransactionModal/transactionModal';

interface TransactionsTableProps {
  transactions: TransactionArray;
  currentPage: number;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, currentPage }) => {
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transId, setTransId] = useState<string>('');

  // Función para abrir el modal de transacción
  const handleOpenModal = (id: string) => {
    setTransId(id);

    // Primero mostramos un modal vacío para la transición
    MySwal.fire({
      html: <div className="display-hidden"></div>,
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      width: '0px',
      backdrop: true,
      customClass: {
        popup: 'bg-transparent shadow-none',
        container: 'bg-transparent',
        backdrop: 'backdrop-blur-sm',
      },
      hideClass: {
        popup: 'swal2-hide-custom',
      },
    });

    // Después de un breve retraso, actualizamos el contenido
    setTimeout(() => {
      MySwal.update({
        html: (
          <SessionProvider>
            <TransactionModal transId={id} />
          </SessionProvider>
        ),
        width: 'auto',
        customClass: {
          popup: 'rounded-lg shadow-xl',
          container: '',
        },
      });

      document.querySelector('.swal2-html-container')?.classList.remove('opacity-0');
    }, 300);
  };

  // Función para obtener el badge de estado
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        icon: <Clock size={14} className="mr-1" />,
        label: 'En Proceso',
      },
      canceled: {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        icon: <XCircle size={14} className="mr-1" />,
        label: 'Cancelada',
      },
      accepted: {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        icon: <CheckCircle size={14} className="mr-1" />,
        label: 'Finalizada',
      },
      default: {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        icon: <AlertCircle size={14} className="mr-1" />,
        label: 'Desconocido',
      },
    };

    const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.default;

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Función para obtener el indicador de cliente
  const getClientIndicator = (transaction: TransactionTypeAll) => {
    if (transaction.transaction.regret_id) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <XCircle size={14} className="mr-1" />
          Cancelación
        </span>
      );
    } else if (transaction.transaction.note_id) {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          <AlertCircle size={14} className="mr-1" />
          Edición
        </span>
      );
    }
    return null;
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  console.log();

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {/* Tabla de transacciones */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#012a8d] text-left text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">Estado</th>
                <th className="px-4 py-3 text-sm font-medium">Fecha</th>
                <th className="px-4 py-3 text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-sm font-medium">Remitente</th>
                <th className="px-4 py-3 text-sm font-medium">Billetera Origen</th>
                <th className="px-4 py-3 text-sm font-medium">Destinatario</th>
                <th className="px-4 py-3 text-sm font-medium">Billetera Destino</th>
                <th className="px-4 py-3 text-sm font-medium">Acción Cliente</th>
                {/* <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.data.length > 0 ? (
                transactions.data.map((transaction: TransactionTypeAll, index: number) => (
                  <tr
                    key={transaction.transaction.transaction_id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => handleOpenModal(transaction.transaction.transaction_id)}
                  >
                    <td className="px-4 py-3 text-sm">{getStatusBadge(transaction.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(transaction.transaction.created_at)}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-700 dark:text-gray-300">
                      {transaction.transaction.transaction_id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.sender.first_name} {transaction.sender.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.payment_method.sender.value}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.receiver.first_name} {transaction.receiver.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.payment_method.receiver.value}
                    </td>
                    <td className="px-4 py-3 text-sm">{getClientIndicator(transaction)}</td>
                    {/* <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleOpenModal(transaction.transaction.transaction_id)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 text-blue-600 dark:text-blue-400"
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                        <span className="sr-only">Ver detalles</span>
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No se encontraron transacciones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <PaginationButtons
            route="/admin/transactions"
            totalPages={transactions.meta.totalPages}
            currentPage={transactions.meta.page}
            isLoading={isLoading}
            /* @ts-ignore */
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
};

export default TransactionsTable;
