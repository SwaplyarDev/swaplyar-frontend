'use client';

import type React from 'react';
import { useState, useRef, useEffect, use } from 'react';
import { AlertCircle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import { useRouter } from 'next/navigation';
import { useSelectedStatusFilter } from '@/hooks/admin/usersPageHooks/useSelectedStatusFilter';
import { formatDate } from '@/utils/utils';
import {
  UsersTableProps,
  filterUsers,
  filtrarUsers,
  ordenarCampoDate,
  states,
  boardheaders,
} from '@/utils/utilsUserTable';
import { VerificationStatus } from '@/types/verifiedUsers';
import { useUserVerifyList } from '@/hooks/admin/usersPageHooks/useUserVerifyListState';

const UsersTable: React.FC<UsersTableProps> = ({ currentPage }) => {
  const{ verificationList, verificationListFiltered, setVerificationListFiltered, updateVerificationList } = useUserVerifyList();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedItem, handleSelect, clearSelectedItems } = useSelectedStatusFilter();
  const [filters, setFilters] = useState<filterUsers>({
    min_date: null,
    max_date: null,
    orderby: 'date',
    order: 'desc',
    search: '',
  });

  const router = useRouter();
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await updateVerificationList(currentPage, 10);
      } catch (error) {
        console.error('Error fetching verification list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filteredList = filtrarUsers(verificationList.data, selectedItem, filters);
    if (filters.orderby === 'verification') ordenarCampoDate(filteredList, filters.order, 'verification');

    setVerificationListFiltered(filteredList);
  }, [filters, selectedItem]);

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

  const handleSortChange = (field: string) => {
    setFilters({
      ...filters,
      orderby: field,
      order: filters.orderby === field && filters.order === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleDateChange = (type: 'min' | 'max', value: string) => {
    setFilters({
      ...filters,
      [type === 'min' ? 'min_date' : 'max_date']: value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      min_date: null,
      max_date: null,
      orderby: 'date',
      order: 'desc',
      search: '',
    });
    setVerificationListFiltered(verificationList.data);
    clearSelectedItems();
  };

  // Función para obtener el badge de estado
  const getStatusBadge = (status: VerificationStatus) => {
    const statusConfig = {
      'verified': {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        icon: <CheckCircle size={14} className="mr-1" />,
        label: 'Verificado',
      },
      'pending': {
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-800 dark:text-yellow-300',
        icon: <Clock size={14} className="mr-1" />,
        label: 'En Progreso',
      },
      'rejected': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        icon: <XCircle size={14} className="mr-1" />,
        label: 'Rechazado',
      },
      'resend-data': {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        icon: <AlertCircle size={14} className="mr-1" />,
        label: 'Reenviar Datos',
      },
    };

    const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig['resend-data'];
    //const config = statusConfig[status === null ? 'default' : status ? 'verified' : 'rejected'];

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="w-full">
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {/* Tabla de usuarios */}
        <div className="overflow-visible overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-[#012a8d] text-left text-white">
              <tr className="rounded-lg">
                <th className="relative px-4 py-3 text-sm font-medium">
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
                        className="absolute left-0 top-full z-[100] mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">Filtrar por estado</div>
                          <div className="space-y-2">
                            {states.map((state) => (
                              <label
                                key={state.id}
                                className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                              >
                                <input
                                  type="checkbox"
                                  className="mr-2 h-4 w-4"
                                  checked={selectedItem.includes(state.id)}
                                  onChange={() => handleSelect(state.id)}
                                />
                                {state.label}
                              </label>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                            <button
                              className="text-xs text-blue-600 dark:text-blue-400"
                              onClick={() => handleSortChange('name')}
                            >
                              {filters.orderby === 'name' && filters.order === 'asc' ? 'Ordenar A-Z' : 'Ordenar Z-A'}
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={handleClearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="relative px-4 py-3 text-sm font-medium">
                  <div className="relative flex items-center" onClick={() => togglePopover('date')}>
                    Fecha Registro
                  </div>
                </th>
                {boardheaders.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-sm font-medium">
                    <div
                      className="flex items-center"
                      style={header.id === 'verification' ? { cursor: 'pointer' } : {}}
                      onClick={() => header.id === 'verification' && handleSortChange(header.id)}
                    >
                      {header.label}
                      {header.id === 'verification' ? (
                        filters.orderby === header.id ? (
                          filters.order === 'asc' ? (
                            <ChevronUp size={16} className="ml-1" />
                          ) : (
                            <ChevronDown size={16} className="ml-1" />
                          )
                        ) : (
                          <ChevronDown size={16} className="ml-1" />
                        )
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {verificationListFiltered.length > 0 ? (
                <>
                  {verificationListFiltered.map((u) => (
                    <tr
                      key={u.verification_id}
                      onClick={() => router.push(`/es/admin/users/${u.verification_id}`)}
                      className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3 text-sm">{getStatusBadge(u.verification_status)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.created_at ? formatDate(u.created_at) : 'No disponible'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.users_id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.user.firstName} {u.user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.user.phone || "No disponible"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.verification_status === 'verified' ? (u.verified_at ? formatDate(u.verified_at) : "Fecha sin especificar") : 'No verificado'}
                      </td>
                    </tr>
                  ))}

                  {/* Filas vacías para mantener espacio cuando hay menos de 5 usuarios */}
                  {verificationListFiltered.length < 5 &&
                    Array(5 - verificationListFiltered.length)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={`empty-${index}`} className="pointer-events-none">
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                          <td className="h-[52px] px-4 py-3 text-sm"></td>
                        </tr>
                      ))}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={7} className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                      No se encontraron usuarios
                    </td>
                  </tr>
                  {/* Filas vacías cuando no hay usuarios */}
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={`empty-${index}`} className="pointer-events-none">
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                        <td className="h-[52px] px-4 py-3 text-sm"></td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <PaginationButtons
            route="/es/admin/users"
            totalPages={verificationList.totalPages}
            currentPage={currentPage}
            isLoading={isLoading}
            /* @ts-expect-error */
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
