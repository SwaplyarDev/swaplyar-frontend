import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from './ui/RenderLabels';
import type { TransactionV2 } from '@/types/transactions/transactionsType';

interface ReceiverDataProps {
  trans: TransactionV2;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ trans }) => {

  return (
    <article className={`${trans.regret?.id ? 'hidden' : 'inline-flex'} w-[100%] flex-col gap-2`}>
      <article className="divide-b-2 flex flex-col items-start gap-3">
        <h3 className="text-xl font-semibold">Datos del Destinatario</h3>
        <div className="flex w-full flex-col gap-3">
          {getReceiverLabels(trans).map((item, index) => (
            <article key={index} className="flex w-full justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.label}</p>
              <p className="text-base text-gray-700 dark:text-white">
                {item.value || 'No disponible'}
              </p>
            </article>
          ))}
        </div>
      </article>
    </article>
  );
};

export default ReceiverData;