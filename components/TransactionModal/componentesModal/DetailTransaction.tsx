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
    <section className="w-full">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Detalles de la Transacción</h3>

        {/* Sender Information */}
        <div className="mb-4 space-y-2">
          <div className="mb-2 flex items-center">
            <span className="font-medium">Datos del Solicitante</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Nombre y Apellido:</span>
            <span className="font-medium">
              {sender?.first_name ? `${sender.first_name} ${sender.last_name || ''}` : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Email:</span>
            <span className="font-medium">{sender?.email || 'No disponible'}</span>
          </div>
        </div>

        {/* Receiver Information */}
        <div className="mb-4 space-y-2">
          <div className="mb-2 font-medium">Datos del Destinatario</div>
          {getReceiverLabels(transaction).map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm text-gray-600">{item.label}:</span>
              <span className="font-medium">{item.value || 'No disponible'}</span>
            </div>
          ))}
        </div>

        {/* Payment Information */}
        <div className="space-y-2">
          <div className="mb-2 font-medium">Datos del Pago</div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Monto a Transferir:</span>
            <span className="font-medium">
              {amounts?.sent
                ? `${amounts.sent.amount} / ${payment_method?.sender.value || ''} / ${amounts.sent.currency}`
                : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Monto a recibir:</span>
            <span className="font-medium">
              {amounts?.received
                ? `${amounts.received.amount} / ${payment_method?.receiver.value || ''} / ${amounts.received.currency}`
                : 'No disponible'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Link del comprobante:</span>
            {proof_of_payment?.img_transaction ? (
              <a
                href={proof_of_payment.img_transaction}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                aria-label="Ver comprobante de pago"
              >
                <span>{truncateUrl(proof_of_payment.img_transaction)}</span>
                <ExternalLink size={14} className="ml-1 inline" />
              </a>
            ) : (
              <span className="font-medium">No disponible</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionDetail;
