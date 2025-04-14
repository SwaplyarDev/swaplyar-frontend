import type React from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface InfoStatusProps {
  trans: TransactionTypeSingle;
  transId: string;
}

const InfoStatus: React.FC<InfoStatusProps> = ({ trans, transId }) => {
  const { status, transaction } = trans;
  const { data: session } = useSession();
  const userName = session?.decodedToken.fullName;

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
      pending: {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Clock className="mr-1.5" />,
        label: 'En Proceso',
        ariaLabel: 'Estado: En Proceso',
      },
      canceled: {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="mr-1.5" />,
        label: 'Rechazada',
        ariaLabel: 'Estado: Rechazada',
      },
      accepted: {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle className="mr-1.5" />,
        label: 'Aceptada',
        ariaLabel: 'Estado: Aceptada',
      },
      default: {
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-800 dark:text-gray-300',
        borderColor: 'border-gray-200 dark:border-gray-700',
        icon: <AlertCircle className="mr-1.5" />,
        label: 'Desconocido',
        ariaLabel: 'Estado: Desconocido',
      },
    };

    const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.default;

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
      <div className="flex w-full items-center justify-between rounded-lg border border-black p-6">
        <div className="flex w-full items-center justify-between gap-x-4">
          <div>{getStatusBadge(status)}</div>

          <div className="flex items-center justify-center gap-4 text-xl">
            Solicitud <span className="font-bold">#{transId}</span>
          </div>

          <div className="flex flex-col items-end text-lightText">
            <time dateTime={transaction?.created_at} className="text-xs dark:text-white sm:text-sm">
              {transaction?.created_at ? formatDate(transaction.created_at) : 'Fecha no disponible'}
            </time>
            <p className="text-sm font-medium dark:text-white sm:text-base">{userName || 'Usuario'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoStatus;
