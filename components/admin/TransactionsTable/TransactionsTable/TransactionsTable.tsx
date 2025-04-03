'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AlertCircle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import type { TransactionArray, TransactionTypeAll } from '@/types/transactions/transactionsType';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import TransactionModal from '@/components/TransactionModal/transactionModal';
import { useRouter } from 'next/navigation';

interface TransactionsTableProps {
  transactions: TransactionArray;
  currentPage: number;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, currentPage }) => {
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transId, setTransId] = useState<string>('');
  const [filters, setFilters] = useState({
    status: [],
    stock_status: [],
    wallet_status: [],
    min_date: null,
    max_date: null,
    orderby: 'date',
    order: 'desc',
    search: '',
  });

  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        activePopover &&
        popoverRefs.current[activePopover] &&
        !popoverRefs.current[activePopover]?.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopover]);

  const togglePopover = (name: string) => {
    setActivePopover(activePopover === name ? null : name);
  };

  const handleStatusFilterChange = (status: string) => {
    /* @ts-expect-error */
    const newStatusFilters = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    setFilters({
      ...filters,
      /* @ts-expect-error */
      status: newStatusFilters,
    });
  };

  const handleSortChange = (field: string) => {
    setFilters({
      ...filters,
      orderby: field,
      order: filters.orderby === field && filters.order === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleWalletFilterChange = (type: 'origin' | 'destination', value: string) => {
    const fieldName = type === 'origin' ? 'stock_status' : 'wallet_status';
    const currentValues = filters[fieldName] as string[];

    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setFilters({
      ...filters,
      [fieldName]: newValues,
    });
  };

  const handleDateChange = (type: 'min' | 'max', value: string) => {
    setFilters({
      ...filters,
      [type === 'min' ? 'min_date' : 'max_date']: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      stock_status: [],
      wallet_status: [],
      min_date: null,
      max_date: null,
      orderby: 'date',
      order: 'desc',
      search: '',
    });
  };

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
            {/* @ts-expect-error */}
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

  useEffect(() => {
    console.log('Current filters:', filters);
  }, [filters]);

  const router = useRouter();

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {/* Tabla de transacciones */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#012a8d] text-left text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="relative flex cursor-pointer items-center" onClick={() => togglePopover('status')}>
                    Estado
                    {filters.orderby === 'status' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {activePopover === 'status' && (
                      <div
                        /* @ts-expect-error */
                        ref={(el) => (popoverRefs.current['status'] = el)}
                        className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por estado</div>
                          <div className="space-y-2">
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('pending')}
                                onChange={() => handleStatusFilterChange('pending')}
                              />
                              En Proceso
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('canceled')}
                                onChange={() => handleStatusFilterChange('canceled')}
                              />
                              Cancelada
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('accepted')}
                                onChange={() => handleStatusFilterChange('accepted')}
                              />
                              Finalizada
                            </label>
                          </div>
                          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-blue-600 dark:text-blue-400"
                              onClick={() => handleSortChange('status')}
                            >
                              {filters.orderby === 'status' && filters.order === 'asc' ? 'Ordenar Z-A' : 'Ordenar A-Z'}
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="relative flex cursor-pointer items-center" onClick={() => togglePopover('date')}>
                    Fecha
                    {filters.orderby === 'date' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {activePopover === 'date' && (
                      <div
                        /* @ts-expect-error */
                        ref={(el) => (popoverRefs.current['date'] = el)}
                        className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por fecha</div>
                          <div className="space-y-2">
                            <div>
                              <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Desde:</label>
                              <input
                                type="date"
                                className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700"
                                value={filters.min_date || ''}
                                onChange={(e) => handleDateChange('min', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Hasta:</label>
                              <input
                                type="date"
                                className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700"
                                value={filters.max_date || ''}
                                onChange={(e) => handleDateChange('max', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-blue-600 dark:text-blue-400"
                              onClick={() => handleSortChange('date')}
                            >
                              {filters.orderby === 'date' && filters.order === 'asc' ? 'Más recientes' : 'Más antiguos'}
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('id')}>
                    ID
                    {filters.orderby === 'id' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('sender')}>
                    Remitente
                    {filters.orderby === 'sender' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div
                    className="relative flex cursor-pointer items-center"
                    onClick={() => togglePopover('origin_wallet')}
                  >
                    Billetera Origen
                    {filters.orderby === 'origin_wallet' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {activePopover === 'origin_wallet' && (
                      <div
                        /* @ts-expect-error */
                        ref={(el) => (popoverRefs.current['origin_wallet'] = el)}
                        className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por billetera</div>
                          <div className="space-y-2">
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.stock_status.includes('payoneer')}
                                onChange={() => handleWalletFilterChange('origin', 'payoneer')}
                              />
                              Payoneer
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.stock_status.includes('paypal')}
                                onChange={() => handleWalletFilterChange('origin', 'paypal')}
                              />
                              PayPal
                            </label>
                          </div>
                          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-blue-600 dark:text-blue-400"
                              onClick={() => handleSortChange('origin_wallet')}
                            >
                              {filters.orderby === 'origin_wallet' && filters.order === 'asc'
                                ? 'Ordenar Z-A'
                                : 'Ordenar A-Z'}
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('recipient')}>
                    Destinatario
                    {filters.orderby === 'recipient' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div
                    className="relative flex cursor-pointer items-center"
                    onClick={() => togglePopover('dest_wallet')}
                  >
                    Billetera Destino
                    {filters.orderby === 'dest_wallet' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {activePopover === 'dest_wallet' && (
                      <div
                        /* @ts-expect-error */
                        ref={(el) => (popoverRefs.current['dest_wallet'] = el)}
                        className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por billetera</div>
                          <div className="space-y-2">
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.wallet_status?.includes('payoneer')}
                                onChange={() => handleWalletFilterChange('destination', 'payoneer')}
                              />
                              Payoneer
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.wallet_status?.includes('paypal')}
                                onChange={() => handleWalletFilterChange('destination', 'paypal')}
                              />
                              PayPal
                            </label>
                          </div>
                          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-blue-600 dark:text-blue-400"
                              onClick={() => handleSortChange('dest_wallet')}
                            >
                              {filters.orderby === 'dest_wallet' && filters.order === 'asc'
                                ? 'Ordenar Z-A'
                                : 'Ordenar A-Z'}
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('client_action')}>
                    Acción Cliente
                    {filters.orderby === 'client_action' ? (
                      filters.order === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.data.length > 0 ? (
                transactions.data.map((transaction: TransactionTypeAll, index: number) => (
                  <tr
                    key={transaction.transaction.transaction_id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => router.push(`/es/admin/transactions/${transaction.transaction.transaction_id}`)}
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
            route="/es/admin/transactions"
            totalPages={transactions.meta.totalPages}
            currentPage={transactions.meta.page}
            isLoading={isLoading}
            /* @ts-ignore */
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
    </div>
  );
};

export default TransactionsTable;
