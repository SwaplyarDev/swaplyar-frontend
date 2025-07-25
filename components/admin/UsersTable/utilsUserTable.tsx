import type React from 'react';
import { User } from '@/types/user';
import { formatDate } from '@/utils/utils';

export interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
}
export interface filterUsers {
  min_date: string | null;
  max_date: string | null;
  orderby: string;
  order: string;
  search: string;
}

export const states = [
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

export const boardheaders = [
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

export const filtrarUsers = (users: User[], selectedItem: string[], filters: filterUsers): User[] => {
  return users.filter((user) => {
    const matchesStatus =
      selectedItem.length === 0 || selectedItem.includes(user.isValidated ? 'verified' : 'rejected');
    const matchesMinDate = !filters.min_date || new Date(user.createdAt) >= new Date(filters.min_date);
    const matchesMaxDate = !filters.max_date || new Date(user.createdAt) <= new Date(filters.max_date);

    return matchesStatus && matchesMinDate && matchesMaxDate;
  });
};

export const ordenarCampoString = (users: User[], order: string, orderby: string) => {
  if (order === 'asc') users.sort((a, b) => String(a.profile[orderby]).localeCompare(String(b.profile[orderby])));
  if (order === 'desc') users.sort((a, b) => String(b.profile[orderby]).localeCompare(String(a.profile[orderby])));
};

export const ordenarCampoNumber = (users: User[], order: string, orderby: string) => {
  if (order === 'asc') users.sort((a, b) => Number(a.profile[orderby]) - Number(b.profile[orderby]));
  if (order === 'desc') users.sort((a, b) => Number(b.profile[orderby]) - Number(a.profile[orderby]));
};

export const ordenarCampoDate = (users: User[], order: string, orderby: string) => {
  if (orderby === 'validatedAt' || orderby === 'createdAt') {
    if (order === 'asc')
      users.sort((a, b) => new Date(formatDate(a[orderby])).getTime() - new Date(formatDate(b[orderby])).getTime());
    if (order === 'desc')
      users.sort((a, b) => new Date(formatDate(b[orderby])).getTime() - new Date(formatDate(a[orderby])).getTime());
  }
};

export function UserProfilePopover(user: User, MySwal: any, router: any) {
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
