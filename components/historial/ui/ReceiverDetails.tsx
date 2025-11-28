import { TransactionData } from "@/types/transaction";
import LabelValueRow from "./LabelValueRow";

const ReceiverDetails = ({ transaction }: { transaction: TransactionData }) => {
  const pm = transaction.receiverAccount.paymentMethod;
  const tipo = pm.tipo;

  if (tipo === 'Pix') {
    return (
      <>
        <LabelValueRow label="Método de Recepción" value={pm.tipo} />
        <LabelValueRow label="CPF" value={pm.cpf} />
        <LabelValueRow label="Email" value={pm.valor} />
      </>
    );
  }

  if (tipo === 'Cripto') {
    return (
      <>
        <LabelValueRow label="Método de Recepción" value={`Red ${pm.red}`} />
        <LabelValueRow label="Dirección de Billetera" value={pm.wallet} />
      </>
    );
  }

  return (
    <>
      <LabelValueRow label="Método de Recepción" value={pm.tipo} />
      <LabelValueRow
        label={tipo === 'Banco Virtual' ? 'Código de Transferencia' : 'CBU/CVU/ALIAS'}
        value={pm.cuenta || pm.codigoTransferencia}
      />
      <LabelValueRow
        label={tipo === 'Banco Virtual' ? 'Email' : 'DNI/CUIT/CUIL'}
        value={tipo === 'Banco Virtual' ? pm.email : pm.documento}
      />
    </>
  );
};

export default ReceiverDetails;