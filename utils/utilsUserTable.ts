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

export const ordenarCampoDate = (users: User[], order: string, orderby: string) => {
  if (orderby === 'validatedAt' || orderby === 'createdAt') {
    if (order === 'asc')
      users.sort((a, b) => new Date(formatDate(a[orderby])).getTime() - new Date(formatDate(b[orderby])).getTime());
    if (order === 'desc')
      users.sort((a, b) => new Date(formatDate(b[orderby])).getTime() - new Date(formatDate(a[orderby])).getTime());
  }
};
