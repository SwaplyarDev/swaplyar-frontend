import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';

interface ReceiverDataProps {
  trans: TransactionTypeSingle;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ trans }) => {
  return (
    <article className={`${trans.transaction.regret_id ? 'hidden' : 'inline-flex'} w-[100%] flex-col gap-2`}>
      <article className="divide-b-2 flex flex-col items-start gap-3">
        <h3 className="text-xl font-semibold">Datos del Destinatario</h3>
        <div className="grid w-full grid-cols-3 gap-3">
          {getReceiverLabels(trans).map((item, index) => renderLabels(item.label, item.value))}
        </div>
      </article>
    </article>
  );
};
export default ReceiverData;
