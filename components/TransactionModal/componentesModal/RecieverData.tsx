import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';

interface ReceiverDataProps {
  trans: TransactionTypeSingle;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ trans }) => {
  return (
    <article className="inline-flex w-[100%] flex-col gap-2">
      <article className="flex w-[70%] flex-col items-start divide-y-2 self-center">
        <h3 className="text-xl font-semibold">Datos del Destinatario</h3>
        {getReceiverLabels(trans).map((item, index) => renderLabels(item.label, item.value))}
      </article>
    </article>
  );
};
export default ReceiverData;
