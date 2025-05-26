import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

export const getReceiverLabels = (transaction: TransactionTypeSingle) => {
  const { payment_method, receiver } = transaction;
  const walletType = payment_method?.receiver?.value;
  const details = payment_method?.receiver?.details || {};

  switch (walletType) {
    case 'wise':
      return [
        { label: 'Nombre y Apellidos', value: `${receiver?.first_name ?? ''} ${receiver?.last_name ?? ''}`.trim() },
        { label: 'Email a realizar el pago', value: details.sender_method_value ?? 'No disponible' },
      ];
    case 'crypto':
      return [
        { label: 'Dirección USDT', value: details.wallet ?? 'No disponible' },
        { label: 'RED', value: details.network ?? 'No disponible' },
      ];
    case 'ars':
      return [
        { label: 'CBU', value: details.sender_method_value ?? 'No disponible' },
        { label: 'Banco', value: details.bank_name ?? 'No disponible' },
        { label: 'DNI', value: details.document_value ?? 'No disponible' },
      ];
    case 'pix':
      return [
        { label: 'Telefono/Email de Pix', value: details.pix_value ?? 'No disponible' },
        { label: 'CPF', value: details.cpf ?? 'No disponible' },
      ];
    default:
      return [
        { label: 'Método de pago', value: walletType ?? 'Desconocido' },
        { label: 'Detalle', value: details.sender_method_value ?? 'No disponible' },
        { label: 'Error', value: 'No hay información o no es correcta' },
      ];
  }
};

export const renderLabels = (label: string, text: string, text2?: string, text3?: string, key?: number) => (
  <article key={key || 0} className="flex w-full flex-col gap-1 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
    <p className="text-base text-gray-700 dark:text-white">
      {text} {text2} {text3}
    </p>
  </article>
);
