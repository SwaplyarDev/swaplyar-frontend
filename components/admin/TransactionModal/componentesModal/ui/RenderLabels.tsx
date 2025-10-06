import { TransactionV2 } from '@/types/transactions/transactionsType';

export const getReceiverLabels = (transaction: TransactionV2) => {
  const receiverInfo = transaction.receiverAccount;
  const paymentMethod = transaction.receiverAccount?.paymentMethod;
  const walletType = paymentMethod?.method;

  if (!receiverInfo || !paymentMethod) {
    return [
      { label: 'Método de pago', value: walletType ?? 'No disponible' },
      { label: 'Error', value: 'Faltan datos del receptor o método de pago' },
    ];
  }

  switch (walletType) {
    case 'wise':
      return [
        
        { label: 'Email a realizar el pago', value: paymentMethod.sendMethodValue ?? 'No disponible' },
      ];

    case 'receiver_crypto':
      return [
       
        { label: 'Dirección USDT', value: paymentMethod.wallet ?? 'No disponible' },
        { label: 'RED', value: paymentMethod.network },
      ];

    case 'bank':
      return [
      
        { label: 'CBU', value: paymentMethod.sendMethodValue ?? 'No disponible' },
        { label: 'Banco', value: paymentMethod.bankName ?? 'No disponible' },
        { label: 'DNI', value: paymentMethod.documentValue ?? 'No disponible' },
      ];

    case 'pix':
      return [
        
        { label: 'Telefono/Email de Pix', value: paymentMethod.pixValue ?? 'No disponible' },
        { label: 'CPF', value: paymentMethod.cpf ?? 'No disponible' },
      ];

    default:
      return [
        { label: 'Método de pago', value: paymentMethod.type ?? 'Desconocido' },
        { label: 'Email', value: paymentMethod.emailAccount ?? 'No disponible' },
        { label: 'Codigo de Transferencia', value: paymentMethod.transferCode },
      ];
  }
};

export const renderLabels = (label: string, text: string, text2?: string, text3?: string, key?: number) => (
  <article key={key || 0} className="flex w-full justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
    <p className="text-base text-gray-700 dark:text-white">
      {text} {text2} {text3}
    </p>
  </article>
);
