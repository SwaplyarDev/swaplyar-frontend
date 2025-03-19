import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from './ui/RenderLabels';
import type React from 'react';
import { ExternalLink, User } from 'lucide-react';

interface DetailTransProps {
  isLoading: boolean;
  transaction: TransactionTypeSingle;
}

const TransactionDetail: React.FC<DetailTransProps> = ({ transaction, isLoading }) => {
  if (isLoading) return null;

  const { sender, payment_method, amounts, proof_of_payment } = transaction;

  // Helper function to format currency values
  const formatCurrency = (amount: string | number, currency: string) => {
    return `${amount} ${currency}`;
  };

  // Helper function to truncate URLs
  const truncateUrl = (url: string, maxLength = 24) => {
    if (!url) return '';
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <section className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sender Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-3 flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300">
              <User size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Datos del Solicitante</h3>
          </div>

          <div className="space-y-3">
            <div className="border-b border-gray-200 pb-2 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Nombre y Apellido</p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {sender?.first_name ? `${sender.first_name} ${sender.last_name || ''}` : 'No disponible'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-2 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{sender?.email || 'No disponible'}</p>
            </div>
          </div>
        </div>

        {/* Receiver Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Datos del Destinatario</h3>

          <div className="space-y-3">
            {getReceiverLabels(transaction).map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-2 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{item.value || 'No disponible'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Datos del Pago</h3>

          <div className="space-y-3">
            <div className="border-b border-gray-200 pb-2 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Monto a Transferir</p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {amounts?.sent
                  ? `${amounts.sent.amount} / ${payment_method?.sender.value || ''} / ${amounts.sent.currency}`
                  : 'No disponible'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-2 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Monto a recibir</p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {amounts?.received
                  ? `${amounts.received.amount} / ${payment_method?.receiver.value || ''} / ${amounts.received.currency}`
                  : 'No disponible'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Link del comprobante</p>
              {proof_of_payment?.img_transaction ? (
                <a
                  href={proof_of_payment.img_transaction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label="Ver comprobante de pago"
                >
                  <span>{truncateUrl(proof_of_payment.img_transaction)}</span>
                  <ExternalLink size={14} className="ml-1" />
                </a>
              ) : (
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">No disponible</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionDetail;
