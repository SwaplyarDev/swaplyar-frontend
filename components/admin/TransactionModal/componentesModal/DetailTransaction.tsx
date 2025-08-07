import type { TransactionV2 } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from './ui/RenderLabels';
import type React from 'react';
import { ExternalLink } from 'lucide-react';
import ClientMessage from './ui/ClientMessage';

interface DetailTransProps {
  isLoading: boolean;
  transaction: TransactionV2;
}

const TransactionDetail: React.FC<DetailTransProps> = ({ transaction, isLoading }) => {
  if (isLoading) return null;

  const { senderAccount, receiverAccount, amount, proofOfPayment } = transaction;

  const formatCurrency = (amount: string | number, currency: string) => {
    return `${amount} ${currency}`;
  };

  const truncateUrl = (url: string, maxLength = 24) => {
    if (!url) return '';
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <section className="w-full">
      <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">Detalles de la Transacción</h3>

        <div className="mb-4 space-y-2">
          <div className="mb-2 flex items-center">
            <span className="font-medium dark:text-gray-200">Datos del Solicitante</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Nombre y Apellido:</span>
            <span className="font-medium dark:text-gray-200">
              {senderAccount?.firstName ? `${senderAccount.firstName} ${senderAccount.lastName || ''}` : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
            <span className="font-medium dark:text-gray-200">{senderAccount?.email || 'No disponible'}</span>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="mb-2 font-medium dark:text-gray-200">Datos del Destinatario</div>
          {getReceiverLabels(transaction).map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</span>
              <span className="font-medium dark:text-gray-200">{item.value || 'No disponible'}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="mb-2 font-medium dark:text-gray-200">Datos del Pago</div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Monto a Transferir:</span>
            <span className="font-medium dark:text-gray-200">
              {amount?.amountSent
                ? `${amount.amountSent} / ${receiverAccount?.paymentMethod?.method || ''} / ${amount.currencySent}`
                : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Monto a recibir:</span>
            <span className="font-medium dark:text-gray-200">
              {amount?.amountReceived
                ? `${amount.amountReceived} / ${receiverAccount?.paymentMethod?.method || ''} / ${amount.currencyReceived}`
                : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Link del comprobante:</span>
            {proofOfPayment?.imgUrl ? (
              <a
                href={proofOfPayment.imgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                aria-label="Ver comprobante de pago"
              >
                <span>{truncateUrl(proofOfPayment.imgUrl)}</span>
                <ExternalLink size={14} className="ml-1 inline" />
              </a>
            ) : (
              <span className="font-medium dark:text-gray-200">No disponible</span>
            )}
          </div>
          <ClientMessage
            message={transaction.message}
            headerMessage="Mensaje del cliente"
            classnames="min-h-[4.25rem] border"
          />
        </div>
      </div>
    </section>
  );
};

export default TransactionDetail;