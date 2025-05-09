import type React from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import BackButton from '../../Sidebar/componentsSidebar/Navigation/BackButto';

interface InfoStatusProps {
  trans: TransactionTypeSingle;
  transId: string;
}

const InfoStatus: React.FC<InfoStatusProps> = ({ trans, transId }) => {
  const { transaction } = trans;
  const { status } = transaction;
  const { data: session } = useSession();
  const userName = session?.user?.fullName;

  // Format date with better localization
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  // Get status badge based on current status
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      '1': {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Clock className="mr-1.5 h-4 w-4" />,
        label: 'En Proceso',
        ariaLabel: 'Estado: En Proceso',
      },
      '3': {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle className="mr-1.5 h-4 w-4" />,
        label: 'Aceptada',
        ariaLabel: 'Estado: Aceptada',
      },
      '7': {
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        textColor: 'text-amber-800 dark:text-amber-300',
        icon: <AlertCircle size={14} className="mr-1" />,
        label: 'Stop',
        ariaLabel: 'Estado: Stop',
      },
      '8': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1.5 h-4 w-4" />,
        label: 'Rechazada',
        ariaLabel: 'Estado: Rechazada',
      },
      '9': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1.5 h-4 w-4" />,
        label: 'Cancelada',
        ariaLabel: 'Estado: Cancelada',
      },
      '11': {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1.5 h-4 w-4" />,
        label: 'Rechazada',
        ariaLabel: 'Estado: Rechazada',
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

    // @ts-ignore
    const config = status ? statusConfig[status] : statusConfig.default;

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
            <time dateTime={transaction?.created_at} className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              {transaction?.created_at ? formatDate(transaction.created_at) : 'Fecha no disponible'}
            </time>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 sm:text-base">{userName || 'Usuario'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoStatus;
