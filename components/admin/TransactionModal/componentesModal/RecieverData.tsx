import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';

interface ReceiverDataProps {
  trans: TransactionTypeSingle;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ trans }) => {
  return (
    <article className={`${trans.transaction.regret_id ? 'hidden' : 'inline-flex'} w-[100%] flex-col gap-2`}>
      <article className="divide-b-2 flex flex-col items-start gap-3">
        <div className="flex w-full flex-col bg-[#F1EDE6]">
          {getReceiverLabels(trans).map((item) => renderLabels(item.label, item.value))}
        </div>
      </article>
    </article>
  );
};
export default ReceiverData;
