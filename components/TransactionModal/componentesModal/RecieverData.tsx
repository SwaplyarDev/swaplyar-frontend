import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';

interface ReceiverDataProps {
  trans: TransactionTypeSingle;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ trans }) => {
  return (
    <article className="inline-flex w-[50%] flex-col items-start justify-center gap-2">
      <article className="flex flex-col divide-y-2">
        <h3 className="text-xl font-semibold">Datos del Destinatario</h3>
        {getReceiverLabels(trans).map((item, index) => renderLabels(item.label, item.value))}
      </article>
    </article>
  );
};
export default ReceiverData;
