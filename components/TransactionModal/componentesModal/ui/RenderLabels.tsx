import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

export const getReceiverLabels = (transaction: TransactionTypeSingle) => {
  const { payment_method, receiver } = transaction?.transaction;
  const walletType = payment_method?.receiver.value;

  switch (walletType) {
    case 'Wise':
      return [
        { label: 'Nombre y Apellidos', value: `${receiver.first_name} ${receiver.last_name}` },
        { label: 'Email a realizar el pago', value: payment_method.receiver.details.sender_method_value },
      ];
    case 'crypto':
      return [
        { label: 'Dirección USDT', value: payment_method?.receiver?.details.wallet },
        { label: 'RED', value: payment_method?.receiver?.details.network },
      ];
    case 'ars':
      return [
        { label: 'CBU', value: payment_method.receiver.details.sender_method_value },
        { label: 'Banco', value: payment_method.receiver.details.bank_name },
        { label: 'DNI', value: payment_method.receiver.details.document_value },
      ];
    case 'pix':
      return [
        { label: 'Telefono', value: payment_method.receiver.details.pix_value },
        { label: 'CPF', value: payment_method.receiver.details.cpf },
      ];
    default:
      return [
        { label: 'Método de pago', value: walletType },
        { label: 'Detalle', value: payment_method.receiver.details.sender_method_value },
      ];
  }
};

export const renderLabels = (label: string, text: string, text2?: string, text3?: string, key?: number) => (
  <article key={key || 0} className="flex w-[100%] flex-col items-start">
    <p>{label}</p>
    <p>
      {text} {text2} {text3}
    </p>
  </article>
);
