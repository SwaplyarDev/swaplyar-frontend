import { User } from '@/types/user';
import { VerificationItem, VerificationStatus } from '@/types/verifiedUsers';
import { formatDate } from '@/utils/utils';

export interface UsersTableProps {
  users: VerificationItem[];
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
interface IStates {
  id: VerificationStatus;
  label: string;
}

export const states: IStates[] = [
  {
    id: 'verified',
    label: 'Verificado',
  },
  {
    id: 'pending',
    label: 'En Progreso',
  },
  {
    id: 'rejected',
    label: 'Rechazado',
  },
  {
    id: 'resend-data',
    label: 'Reenviar Datos',
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

export const filtrarUsers = (users: VerificationItem[], selectedItem: string[], filters: filterUsers): VerificationItem[] => {
  return users.filter((user) => {
    const matchesStatus =
      selectedItem.length === 0 || selectedItem.includes(user.verification_status);
    const matchesMinDate = !filters.min_date || new Date(user.created_at) >= new Date(filters.min_date);
    const matchesMaxDate = !filters.max_date || new Date(user.created_at) <= new Date(filters.max_date);

    return matchesStatus && matchesMinDate && matchesMaxDate;
  });
};

export const ordenarCampoDate = (users: VerificationItem[], order: string, orderby: string) => {
  if (orderby === 'created_at' || orderby === 'verified_at') {
    if (order === 'asc')
      users.sort((a, b) => new Date(formatDate(a[orderby] || "")).getTime() - new Date(formatDate(b[orderby] || "")).getTime());
    if (order === 'desc')
      users.sort((a, b) => new Date(formatDate(b[orderby] || "")).getTime() - new Date(formatDate(a[orderby] || "")).getTime());
  }
};

