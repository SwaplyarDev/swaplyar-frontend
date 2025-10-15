'use client';
import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
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
import { getAdminTransactionsFiltered } from '@/actions/transactions/admin-transaction';

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
  country?: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, currentPage }) => {
  const { data: session } = useSession();
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<TransactionArrayV2>(transactions);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    stock_status: [],
    wallet_status: [],
    min_date: null,
    max_date: null,
    orderby: 'date',
    order: 'desc',
    search: '',
    country: '',
  });
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const router = useRouter();

const fetchFilteredTransactions = useCallback(async (page = 1) => {
  try {
    setIsLoading(true);
    const params = new URLSearchParams();


    if (filters.status.length > 0) params.append('status', filters.status.join(','));
    if (filters.min_date) params.append('from', filters.min_date);
    if (filters.max_date) params.append('to', filters.max_date);
    if (filters.search) params.append('search', filters.search);
    if (filters.country) params.append('country', filters.country);

    params.append('page', String(page));
    params.append('perPage', '12');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        cache: 'no-store',
      }
    );
    if (!response.ok) throw new Error('Error al obtener transacciones');
    const data = await response.json();
    setTransactionsData(data);
  } catch (err) {
    console.error('❌ Error en fetchFilteredTransactions:', err);
  } finally {
    setIsLoading(false);
  }
}, [filters, session?.accessToken]);

  useEffect(() => {
    fetchFilteredTransactions(1);
  }, [filters, fetchFilteredTransactions]);

  useEffect(() => {
    fetchFilteredTransactions(currentPage);
  }, [currentPage, fetchFilteredTransactions]);

  useEffect(() => {
    if (transactions) setTransactionsData(transactions);
  }, [transactions]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePopover]);

  const togglePopover = (name: string) => {
    setActivePopover(activePopover === name ? null : name);
  };

  const handleStatusFilterChange = (status: string) => {
    setFilters({
      ...filters,
      status: filters.status.includes(status) ? [] : [status],
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
        label: 'Revisión',
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
        label: 'Stop / Discrepancia',
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
        label: 'En tránsito',
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
        className={`inline-flex min-w-[110px] items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
      new Date(dateString)
    );

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full">
            <thead className="bg-[#012a8d] text-left text-white">
              <tr>
                {/* ESTADO */}
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="relative flex cursor-pointer items-center" onClick={() => togglePopover('status')}>
                    Estado
                    <ChevronDown size={16} className="ml-1" />
                    {activePopover === 'status' && (
                      <div
                        ref={(el) => {
                          popoverRefs.current['status'] = el;
                        }}
                        className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por estado</div>
                          <div className="space-y-2">
                            {[
                              { key: 'pending', label: 'Pendiente' },
                              { key: 'completed', label: 'Finalizado' },
                              { key: 'rejected', label: 'Rechazado' },
                              { key: 'refunded', label: 'Reembolsado' },
                              { key: 'approved', label: 'Aprobado' },
                              { key: 'discrepancy', label: 'Stop/Discrepancia' },
                              { key: 'modified', label: 'Modificado' },
                              { key: 'in_transit', label: 'En Transito' },
                              { key: 'canceled', label: 'Cancelada' },
                            ].map((status) => (
                              <label key={status.key} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <input
                                  type="checkbox"
                                  className="mr-2 h-4 w-4"
                                  checked={filters.status.includes(status.key)}
                                  onChange={() => handleStatusFilterChange(status.key)}
                                />
                                {status.label}
                              </label>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-end border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                {/* FECHA */}
                <th className="px-4 py-3 text-sm font-medium">
                  <div className="relative flex cursor-pointer items-center" onClick={() => togglePopover('date')}>
                    Fecha
                    <ChevronDown size={16} className="ml-1" />
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
                              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Desde:</label>
                              <input
                                type="date"
                                value={filters.min_date || ''}
                                onChange={(e) => handleDateChange('min', e.target.value)}
                                className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Hasta:</label>
                              <input
                                type="date"
                                value={filters.max_date || ''}
                                onChange={(e) => handleDateChange('max', e.target.value)}
                                className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700"
                              />
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={clearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">ID</th>
                {/* REMITENTE */}
                <th className="px-4 py-3 text-sm font-medium">
                  <div
                    className="relative flex cursor-pointer items-center"
                    onClick={() => togglePopover('sender')}
                  >
                    Remitente
                    <ChevronDown size={16} className="ml-1" />
                    {activePopover === 'sender' && (
                      <div
                        ref={(el) => {
                          popoverRefs.current['sender'] = el;
                        }}
                        className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                            Buscar por remitente o mensaje
                          </div>
                          <input
                            type="text"
                            value={filters.search}
                            onChange={(e) =>
                              setFilters((prev) => ({ ...prev, search: e.target.value }))
                            }
                            placeholder="Ej: Juan Pérez o referencia..."
                            className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          />
                          <div className="mt-3 flex justify-end border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-red-600 dark:text-red-400"
                              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                            >
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">Monto</th>
                {/* PAÍS */}
                <th className="px-4 py-3 text-sm font-medium">
                  <div
                    className="relative flex cursor-pointer items-center"
                    onClick={() => togglePopover('country')}
                  >
                    País
                    <ChevronDown size={16} className="ml-1" />
                    {activePopover === 'country' && (
                      <div
                        ref={(el) => {
                          popoverRefs.current['country'] = el;
                        }}
                        className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                            Buscar por país
                          </div>
                          <input
                            type="text"
                            value={filters.country}
                            onChange={(e) =>
                              setFilters((prev) => ({ ...prev, country: e.target.value }))
                            }
                            placeholder="Ej: Argentina, Brasil..."
                            className="w-full rounded border border-gray-300 p-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          />
                          <div className="mt-3 flex justify-end border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-red-600 dark:text-red-400"
                              onClick={() => setFilters((prev) => ({ ...prev, country: '' }))}
                            >
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    Cargando transacciones...
                  </td>
                </tr>
              ) : transactionsData.data.length > 0 ? (
                transactionsData.data.map((transaction: TransactionV2) => (
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
                      {transaction.amount.amountSent} {transaction.amount.currencySent} →{' '}
                      {transaction.amount.amountReceived} {transaction.amount.currencyReceived}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.countryTransaction || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.message || '—'}
                    </td>
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
        {/* PAGINACIÓN */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <PaginationButtons
            route="/es/admin/transactions"
            totalPages={transactionsData.meta.totalPages}
            currentPage={transactionsData.meta.page}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
