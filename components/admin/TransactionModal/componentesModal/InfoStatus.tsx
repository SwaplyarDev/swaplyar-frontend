import type React from 'react';

import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertCircle, AlertTriangle, CheckCircle, Clock, Search, Undo2, XCircle } from 'lucide-react';
import BackButton from '../../Sidebar/componentsSidebar/Navigation/BackButto';
import { TransactionV2 } from '@/types/transactions/transactionsType';

interface InfoStatusProps {
  trans: TransactionV2;
  transId: string;
}

const InfoStatus: React.FC<InfoStatusProps> = ({ trans, transId }) => {
  const { finalStatus: status } = trans;

  const { data: session } = useSession();
  const userName = session?.user?.fullName;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Clock className="mr-1.5 h-4 w-4" />,
        label: 'En Proceso',
        ariaLabel: 'Estado: En Proceso',
      },
      'review_payment': {
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-800 dark:text-purple-300',
        borderColor: 'border-purple-200 dark:border-purple-800',
        icon: <Search size={14} className="mr-1" />,
        label: 'Review',
        ariaLabel: 'Estado: Review',
      },
      'approved': {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle className="mr-1.5 h-4 w-4" />,
        label: 'Aceptada',
        ariaLabel: 'Estado: Aprobada',
      },
      'rejected': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1" />,
        label: 'Rechazada',
        ariaLabel: 'Estado: Rechazada',
      },
      'discrepancy': {
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        textColor: 'text-amber-800 dark:text-amber-300',
        borderColor: 'border-amber-200 dark:border-amber-800',
        icon: <AlertCircle className="mr-1" />,
        label: 'Stop',
        ariaLabel: 'Estado: Stop',
      },
      'canceled': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1.5 h-4 w-4" />,
        label: 'Cancelada',
        ariaLabel: 'Estado: Cancelada',
      },
      'refunded': {
        bgColor: 'bg-rose-100 dark:bg-rose-900/30',
        textColor: 'text-rose-800 dark:text-rose-300',
        borderColor: 'border-rose-200 dark:border-rose-800',
        icon: <Undo2 size={14} className="mr-1" />,
        label: 'Reembolsada',
        ariaLabel: 'Estado: Reembolsada',
      },
      'completed': {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle className="mr-1.5 h-4 w-4" />,
        label: 'Finalizada',
        ariaLabel: 'Estado: Completada',
      },
      default: {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        borderColor: 'border-gray-200 dark:border-gray-700',
        icon: <AlertCircle className="mr-1.5 h-4 w-4" />,
        label: 'Desconocido',
        ariaLabel: 'Estado: Desconocido',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.default;

    return (
      <div
        className={`flex items-center justify-center ${config.bgColor} ${config.textColor} border ${config.borderColor} rounded-full px-4 py-1 shadow-sm`}
        role="status"
        aria-label={config.ariaLabel}
      >
        <span className="flex items-center text-sm font-medium sm:text-base">
          {config.icon}
          {config.label}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-lg border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
        <BackButton />
        <div className="flex w-full items-center justify-between gap-x-4 pl-2">
          <div>{getStatusBadge(status)}</div>

          <div className="flex items-center justify-center gap-4 text-xl text-gray-800 dark:text-gray-100">
            Solicitud <span className="font-bold">#{transId}</span>
          </div>

          <div className="flex flex-col items-end text-lightText dark:text-gray-300">
            <time dateTime={trans.createdAt}>
              {trans.createdAt ? formatDate(trans.createdAt) : 'Fecha no disponible'}
            </time>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 sm:text-base">{userName || 'Usuario'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoStatus;
