'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AlertCircle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import PaginationButtons from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import { useRouter } from 'next/navigation';

interface Profile {
  age: string;
  birthdate: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  fullName: string;
  gender: string;
  identification: string;
  phone: string;
  users_id: string;
  social_id: string;
  img_url: string;
  location_id: string;
  last_activity: string;
}

interface User {
  jh: string;
  fullName: string;
  email: string;
  created_at: string;
  rol: string;
  isActive: boolean;
  terms: boolean;
  validation_at: string | null;
  profile?: Profile;
}
interface UsersTableProps {
  users: User[];
  currentPage: number;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, currentPage }) => {
  const MySwal: any = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [filters, setFilters] = useState({
    status: [],
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

  const handleDateChange = (type: 'min' | 'max', value: string) => {
    setFilters({
      ...filters,
      [type === 'min' ? 'min_date' : 'max_date']: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      min_date: null,
      max_date: null,
      orderby: 'date',
      order: 'desc',
      search: '',
    });
  };

  // Función para abrir el modal de usuario
  const handleOpenModal = (id: number) => {
    setUserId(id.toString());

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
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Detalles del Usuario</h2>
            <p>ID: {id}</p>
            {/* Aquí puedes agregar más detalles del usuario */}
          </div>
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
    console.log('Current filters:', filters);
  }, [filters]);

  console.log('Users:', users);

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
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('verified')}
                                onChange={() => handleStatusFilterChange('verified')}
                              />
                              Verificado
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('inprogress')}
                                onChange={() => handleStatusFilterChange('inprogress')}
                              />
                              En Progreso
                            </label>
                            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                /* @ts-expect-error */
                                checked={filters.status.includes('rejected')}
                                onChange={() => handleStatusFilterChange('rejected')}
                              />
                              Rechazado
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
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('name')}>
                    Nombre
                    {filters.orderby === 'name' ? (
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
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('email')}>
                    Email
                    {filters.orderby === 'email' ? (
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
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('phone')}>
                    Teléfono
                    {filters.orderby === 'phone' ? (
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
                  <div className="flex cursor-pointer items-center" onClick={() => handleSortChange('verification')}>
                    Verificación
                    {filters.orderby === 'verification' ? (
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
              {users.length > 0 ? (
                <>
                  {users.map((user) => (
                    <tr
                      key={user.jh}
                      onClick={() => router.push(`/es/admin/users/${user.jh}`)}
                      className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3 text-sm">{user.isActive ? 'Activo' : 'Inactivo'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {user.created_at ? formatDate(user.created_at) : 'No disponible'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.jh}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.fullName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {user?.profile?.email ? user?.profile?.email : 'No disponible'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {user?.profile?.phone ? user?.profile?.phone : 'No disponible'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {user.validation_at ? formatDate(user.validation_at) : 'No verificado'}
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
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
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
            route="/admin/users"
            totalPages={10} // Actualizar con el número real de páginas
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
