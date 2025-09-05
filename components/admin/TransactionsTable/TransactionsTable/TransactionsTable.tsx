'use client';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Edit,
  Undo2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import type { TransactionArrayV2, TransactionV2 } from '@/types/transactions/transactionsType';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import TransactionModal from '@/components/admin/TransactionModal/transactionModal';
import { useRouter } from 'next/navigation';

interface TransactionsTableProps {
  transactions: TransactionArrayV2;
  currentPage: number;
}

interface FilterState {
  status: string[];
  stock_status: string[];
  wallet_status: string[];
  min_date: string | null;
  max_date: string | null;
  orderby: string;
  order: string;
  search: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, currentPage }) => {
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transId, setTransId] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
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
    const newStatusFilters = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    setFilters({
      ...filters,
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
            <TransactionModal />
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      {
        bgColor: string;
        textColor: string;
        icon: React.ReactNode;
        label: string;
        borderColor?: string;
      }
    > = {
      pending: {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        icon: <Clock size={14} className="mr-1" />,
        label: 'Pendiente',
      },
      review_payment: {
        bgColor: 'bg-purple-300 dark:bg-purple-900/30',
        textColor: 'text-purple-800 dark:text-purple-300',
        icon: <Search size={14} className="mr-1" />,
        label: 'Review',
      },
      accepted: {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle size={14} className="mr-1.5 h-4 w-4" />,
        label: 'Aceptada',
      },
      approved: {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle size={14} className="mr-1.5 h-4 w-4" />,
        label: 'Aprobada',
      },
      rejected: {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        icon: <XCircle size={14} className="mr-1" />,
        label: 'Rechazada',
      },
      discrepancy: {
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        textColor: 'text-amber-800 dark:text-amber-300',
        icon: <AlertTriangle size={14} className="mr-1" />,
        label: 'Stop',
      },
      canceled: {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        icon: <XCircle size={14} className="mr-1" />,
        label: 'Cancelada',
      },
      modified: {
        bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
        textColor: 'text-cyan-800 dark:text-cyan-300',
        icon: <Edit size={14} className="mr-1" />,
        label: 'Modificada',
      },
      refunded: {
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-800 dark:text-orange-300',
        icon: <Undo2 size={14} className="mr-1" />,
        label: 'Reembolsada',
      },
      completed: {
        bgColor: 'bg-teal-100 dark:bg-teal-900/30',
        textColor: 'text-teal-800 dark:text-teal-300',
        icon: <CheckCircle size={14} className="mr-1" />,
        label: 'Finalizada',
      },

      in_transit: {
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
        textColor: 'text-indigo-800 dark:text-indigo-300',
        icon: <ArrowRight className="mr-1.5 h-4 w-4" />,
        label: 'En Camino',
      },
      default: {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        icon: <AlertCircle size={14} className="mr-1" />,
        label: 'Desconocido',
      },
    };

    const config = status ? statusConfig[status] || statusConfig.default : statusConfig.default;
    return (
      <span
        className={`inline-flex min-w-[100px] items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
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

  useEffect(() => {
    // console.log('Current filters:', filters);
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
                        ref={(el) => {
                          popoverRefs.current['status'] = el;
                        }}
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
                                checked={filters.status.includes('pending')}
                                onChange={() => handleStatusFilterChange('pending')}
                              />
                              Pendiente
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                checked={filters.status.includes('canceled')}
                                onChange={() => handleStatusFilterChange('canceled')}
                              />
                              Cancelada
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                checked={filters.status.includes('accepted')}
                                onChange={() => handleStatusFilterChange('accepted')}
                              />
                              Aceptada
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                checked={filters.status.includes('completed')}
                                onChange={() => handleStatusFilterChange('completed')}
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
                        ref={(el) => {
                          popoverRefs.current['date'] = el;
                        }}
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
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('amount')}>
                    Monto
                    {filters.orderby === 'amount' ? (
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
                <th className="px-4 py-3 text-sm font-medium">País</th>
                <th className="px-4 py-3 text-sm font-medium">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.data.length > 0 ? (
                transactions.data.map((transaction: TransactionV2, index: number) => (
                  <tr
                    key={transaction.id}
                    className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => router.push(`/es/admin/transactions/${transaction.id}`)}
                  >
                    <td className="px-4 py-3 text-sm">{getStatusBadge(transaction.finalStatus)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-700 dark:text-gray-300">
                      {transaction.id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.senderAccount.firstName} {transaction.senderAccount.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.receiverAccount.firstName} {transaction.receiverAccount.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.amount.amountSent} {transaction.amount.currencySent} →{' '}
                      {transaction.amount.amountReceived} {transaction.amount.currencyReceived}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.countryTransaction}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{transaction.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
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
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
