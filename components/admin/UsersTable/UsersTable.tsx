'use client';

import type React from 'react';
import { useState, useRef, useEffect, use } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AlertCircle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { useSelectedStatusFilter } from '@/hooks/admin/usersPageHooks/useSelectedStatusFilter';
import { formatDate } from '@/utils/utils';

interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
}
interface filterUsers {
  min_date: string | null;
  max_date: string | null;
  orderby: string;
  order: string;
  search: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, currentPage, totalPages }) => {
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>(users);
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
    const filteredList = filtrarUsers(users, selectedItem, filters);
    if (filters.orderby === 'email') ordenarCampoString(filteredList, filters.order, 'email');
    if (filters.orderby === 'name') ordenarCampoString(filteredList, filters.order, 'firstName');
    if (filters.orderby === 'identification') ordenarCampoNumber(filteredList, filters.order, 'identification');
    if (filters.orderby === 'phone') ordenarCampoNumber(filteredList, filters.order, 'phone');
    if (filters.orderby === 'verification') ordenarCampoDate(filteredList, filters.order, 'verification');

    setUser(filteredList);
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
    setUser(users);
    clearSelectedItems();
  };

  // Función para abrir el modal de usuario
  const handleOpenModal = (user: User) => {
    UserProfilePopover(user, MySwal, router);
  };

  // Función para obtener el badge de estado
  const getStatusBadge = (status: boolean | null) => {
    const statusConfig = {
      verified: {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        icon: <CheckCircle size={14} className="mr-1" />,
        label: 'Verificado',
      },
      inprogress: {
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-800 dark:text-yellow-300',
        icon: <Clock size={14} className="mr-1" />,
        label: 'En Progreso',
      },
      rejected: {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        icon: <XCircle size={14} className="mr-1" />,
        label: 'Rechazado',
      },
      default: {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        icon: <AlertCircle size={14} className="mr-1" />,
        label: 'Desconocido',
      },
    };

    //const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.default;
    const config = statusConfig[status === null ? 'default' : status ? 'verified' : 'rejected'];

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const states = [
    {
      id: 'verified',
      label: 'Verificado',
    },
    {
      id: 'inprogress',
      label: 'En Progreso',
    },
    {
      id: 'rejected',
      label: 'Rechazado',
    },
  ];

  const boardheaders = [
    {
      id: 'identification',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Nombre',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'phone',
      label: 'Teléfono',
    },
    {
      id: 'verification',
      label: 'Verificación',
    },
  ];

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
                  <div className="relative flex cursor-pointer items-center" onClick={() => togglePopover('date')}>
                    Fecha Registro
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
                        className="absolute left-0 top-full z-[100] mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
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
                            <button className="text-xs text-red-600 dark:text-red-400" onClick={handleClearFilters}>
                              Limpiar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                {boardheaders.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-sm font-medium">
                    <div className="flex cursor-pointer items-center" onClick={() => handleSortChange(header.id)}>
                      {header.label}
                      {filters.orderby === header.id ? (
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
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {user.length > 0 ? (
                <>
                  {user.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => handleOpenModal(u)}
                      /* onClick={() => router.push(`/es/admin/users/${u.id}`)} */
                      className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3 text-sm">{getStatusBadge(u.isValidated)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.createdAt ? formatDate(u.createdAt) : 'No disponible'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.profile?.identification}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.profile?.firstName} {u.profile?.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.profile?.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.profile?.phone}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {u.validatedAt ? formatDate(u.validatedAt) : 'No verificado'}
                      </td>
                    </tr>
                  ))}

                  {/* Filas vacías para mantener espacio cuando hay menos de 5 usuarios */}
                  {users.length < 5 &&
                    Array(5 - users.length)
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
            totalPages={totalPages}
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

const filtrarUsers = (users: User[], selectedItem: string[], filters: filterUsers): User[] => {
  return users.filter((user) => {
    const matchesStatus =
      selectedItem.length === 0 || selectedItem.includes(user.isValidated ? 'verified' : 'rejected');
    const matchesMinDate = !filters.min_date || new Date(user.createdAt) >= new Date(filters.min_date);
    const matchesMaxDate = !filters.max_date || new Date(user.createdAt) <= new Date(filters.max_date);

    return matchesStatus && matchesMinDate && matchesMaxDate;
  });
};

const ordenarCampoString = (users: User[], order: string, orderby: string) => {
  if (order === 'asc') users.sort((a, b) => String(a.profile[orderby]).localeCompare(String(b.profile[orderby])));
  if (order === 'desc') users.sort((a, b) => String(b.profile[orderby]).localeCompare(String(a.profile[orderby])));
};
const ordenarCampoNumber = (users: User[], order: string, orderby: string) => {
  if (order === 'asc') users.sort((a, b) => Number(a.profile[orderby]) - Number(b.profile[orderby]));
  if (order === 'desc') users.sort((a, b) => Number(b.profile[orderby]) - Number(a.profile[orderby]));
};
const ordenarCampoDate = (users: User[], order: string, orderby: string) => {
  if (orderby === 'validatedAt' || orderby === 'createdAt') {
    if (order === 'asc')
      users.sort((a, b) => new Date(formatDate(a[orderby])).getTime() - new Date(formatDate(b[orderby])).getTime());
    if (order === 'desc')
      users.sort((a, b) => new Date(formatDate(b[orderby])).getTime() - new Date(formatDate(a[orderby])).getTime());
  }
};

function UserProfilePopover(user: User, MySwal: any, router: any) {
  // Primero mostramos un modal vacío para la transición
  MySwal.fire({
    html: (
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">
          Usuario {user.profile.firstName} {user.profile.lastName}
        </h2>
        <div className="mb-4 flex flex-row items-stretch justify-between gap-5">
          <p>ID:</p>
          <p>{user.id}</p>
        </div>
        <div className="mb-4 flex flex-row items-stretch justify-between gap-5">
          <p>Email:</p>
          <p>{user.profile.email}</p>
        </div>
        <div className="mb-4 flex flex-row items-stretch justify-between gap-5">
          <p>N° documento:</p>
          <p>{user.profile.identification}</p>
        </div>
        <div className="mb-4 flex flex-row items-stretch justify-between gap-5">
          <p>Role:</p>
          <p>{user.role}</p>
        </div>
      </div>
    ),
    width: 'auto',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      container: '',
    },
    confirmButtonText: 'Ver Perfil Completo',
    showCancelButton: true,
    cancelButtonText: 'Cerrar',
  }).then((result: any) => {
    if (result.isConfirmed) {
      router.push(`/es/admin/users/${user.id}`);
    }
  });

  document.querySelector('.swal2-html-container')?.classList.remove('opacity-0');
}
